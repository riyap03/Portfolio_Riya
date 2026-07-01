import { motion } from 'framer-motion';

const stats = [
  { label: 'Years Coding', value: '2+' },
  { label: 'Fastify PRs', value: '3+' },
  { label: 'DSA Progress', value: '100+ Questions' },
  { label: 'Internships', value: '2' }
];

const interests = [
  'AI',
  'Web Development',
  'Open Source',
  'Developer Tools',
];

const socialLinks = [
  { label: 'LeetCode', href: 'https://leetcode.com/u/riyap03/' },
  { label: 'GitHub', href: 'https://github.com/riyap03' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/riya-panwar-486845332/' },
];

const fragmentedText = [
  "I'm Riya,",
  "a Computer Science",
  "Engineering student",
  "from Engineering College",
  "Bikaner, Rajasthan, India."
];

interface SectionProps {
  id?: string;
}

export default function AboutEnhanced({ id }: SectionProps) {
  return (
    <section id={id} className="py-12 md:py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left column - Memory reconstruction */}
            <div className="space-y-4">
              {/* Fragmented text assembly */}
              <div className="space-y-2 mb-6">
                {fragmentedText.map((fragment, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: (index % 2 === 0 ? -40 : 40),
                      rotate: (index % 2 === 0 ? -5 : 5)
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      rotate: 0
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: 'spring' as const,
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className="text-base text-muted-foreground font-semibold inline-block mr-2"
                  >
                    {fragment}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-base text-muted-foreground leading-relaxed mb-3"
              >
                I come from a <span className="text-primary font-semibold">tier-3 college</span>, but I refuse to let geography define destiny.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-base text-muted-foreground leading-relaxed mb-3"
              >
                I believe great engineers are built through <span className="text-primary font-semibold">struggle, curiosity, discipline, and consistency</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-base text-muted-foreground leading-relaxed mb-3"
              >
                I love building products at the intersection of:
              </motion.p>

              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: 'spring' as const,
                      stiffness: 120
                    }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 rounded-full bg-primary/20 text-primary font-semibold text-xs border border-primary/40 hover:border-primary/80 hover:bg-primary/25 transition-all duration-200"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right column - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: 'spring' as const,
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg p-4 text-center glow-hover group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-2xl md:text-3xl font-display font-bold text-primary mb-1 group-hover:text-secondary transition-colors"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm md:text-base text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Poetry section */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-card/50 border border-primary/30 rounded-lg p-6 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 group"
          >
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed italic group-hover:text-primary/80 transition-colors"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Beyond code, I write <span className="text-secondary font-semibold">poetry and reflections</span> on my blog, <span className="text-secondary font-semibold">Ruemona</span>, where technology meets emotion.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
    );
  }
