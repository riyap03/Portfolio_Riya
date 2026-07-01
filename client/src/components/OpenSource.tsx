import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const contributions = [
  {
    project: 'Fastify',
    description: 'One of the fastest Node.js web frameworks',
    prs: [
      { number: 6269, title: 'ESLint improvements' },
      { number: 6275, title: 'Fixed printRoutes behavior' },
      { number: 6326, title: 'Benchmark contribution' }
    ],
    details: 'Worked with maintainers, handled code reviews, improved testing, and learned production-level engineering practices.'
  },
  {
    project: 'Microsoft Terminal',
    description: 'Modern terminal application',
    prs: [
      { number: null, title: 'Implemented dynamic WSL detection and environment change handling' }
    ],
    details: 'Contributed to improving terminal functionality and cross-platform compatibility.'
  },
  {
    project: 'Axios',
    description: 'Promise-based HTTP client',
    prs: [
      { number: null, title: 'Fixed bugs and improved performance' }
    ],
    details: 'Contributed to bug fixes and performance optimizations in the HTTP client library.'
  }
];

export default function OpenSource() {
  return (
    <section className="py-20 md:py-32 bg-card/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Open Source Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-16">
            Contributing to world-class projects and learning from the community
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {contributions.map((contrib, index) => (
              <motion.div
                key={contrib.project}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/50 border border-border rounded-lg p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {contrib.project}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {contrib.description}
                    </p>
                  </div>
                  <Github className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* PRs */}
                <div className="mb-6 space-y-2">
                  {contrib.prs.map((pr, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-primary font-bold mt-1">→</span>
                      <div>
                        {pr.number && (
                          <span className="text-primary font-semibold">PR #{pr.number}</span>
                        )}
                        <p className="text-muted-foreground">
                          {pr.title}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Details */}
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-6">
                  {contrib.details}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Passionate about open source and continuous learning. Always looking for new projects to contribute to.
            </p>
            <a
              href="https://github.com/riyap03"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 hover:border-primary/60 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              View My GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
