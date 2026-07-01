import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import nodemailer from "nodemailer";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function writeToLogFile(source: string, entries: unknown[]) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");
}

function vitePluginLocalLogCollector(): Plugin {
  return {
    name: "local-log-collector",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__local__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__local__/logs", (req, res, next) => {
        if (req.method !== "POST") return next();

        const handlePayload = (payload: any) => {
          if (payload.consoleLogs?.length > 0) writeToLogFile("browserConsole", payload.consoleLogs);
          if (payload.networkRequests?.length > 0) writeToLogFile("networkRequests", payload.networkRequests);
          if (payload.sessionEvents?.length > 0) writeToLogFile("sessionReplay", payload.sessionEvents);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try { handlePayload(reqBody); } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", () => {
          try { handlePayload(JSON.parse(body)); } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function contactApiPlugin(): Plugin {
  return {
    name: "contact-api-middleware",
    configureServer(_server: ViteDevServer) {
      const envPath = path.join(PROJECT_ROOT, ".env");
      const envVars: Record<string, string> = {};
      try {
        const envContent = fs.readFileSync(envPath, "utf-8");
        envContent.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) return;
          const eq = trimmed.indexOf("=");
          if (eq > 0) envVars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
        });
      } catch (e) {
        console.warn("[contact-api] Could not read .env:", envPath, e);
      }

      const transporter = nodemailer.createTransport({
        host: envVars.SMTP_HOST || process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(envVars.SMTP_PORT || process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: envVars.SMTP_USER || process.env.SMTP_USER,
          pass: envVars.SMTP_PASS || process.env.SMTP_PASS,
        },
      });

      _server.middlewares.use("/api/contact", async (req, res) => {
        if ((req.method || "").toUpperCase() !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          const chunks: Uint8Array[] = [];
          for await (const chunk of req as any) chunks.push(chunk);
          const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, string>;
          const { name, email, subject, message } = body;

          if (!name || !email || !subject || !message) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "All fields are required" }));
            return;
          }

          const info = await transporter.sendMail({
            from: `Riya Panwar <${envVars.SMTP_FROM || process.env.SMTP_FROM || envVars.SMTP_USER || process.env.SMTP_USER}>`,
            to: envVars.CONTACT_EMAIL || process.env.CONTACT_EMAIL || "riyapanwar0307@gmail.com",
            subject: `[Contact] ${subject}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          });

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: "Message sent successfully", id: info.messageId }));
        } catch (error: any) {
          console.error("Contact form error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error?.message || "Failed to send message", details: error }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginLocalLogCollector(), contactApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});