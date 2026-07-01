import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border py-12 md:py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                Riya Panwar
              </h3>
              <p className="text-sm text-muted-foreground">
                Software Engineer • Open Source Contributor • AI Builder • Poet
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="https://leetcode.com/u/riyap03/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    LeetCode
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://github.com/riyap03" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/riya-panwar-486845332/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:riyapanwar0307@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://ruemona.blogspot.com/" className="text-muted-foreground hover:text-secondary transition-colors">
                    Ruemona Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 pt-8 mb-8" />

          {/* Bottom footer */}
          <div className="text-center space-y-4">
            <p className="text-lg font-display font-semibold text-foreground italic">
              Built with caffeine, chaos, and stubborn hope.
            </p>
            <p className="text-primary font-semibold text-lg">
              Still becoming.
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Riya Panwar. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
