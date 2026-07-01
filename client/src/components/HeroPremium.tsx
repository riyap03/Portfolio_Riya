import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const VoiceprintText = ({ children, className = '' }: { children: string; className?: string }) => {
  const letters = children.split('');
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
      {letters.map((letter, index) => (
        <motion.span key={`${letter}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 + index * 0.05 }} className="inline-block">
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroPremium() {
  const [showContent, setShowContent] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    "Hi, I'm Riya.",
    "I build products.",
    "I solve problems.",
    "I keep becoming."
  ];

  const fullText = "Engineer. Builder. Dreamer.";
  const subtitle = "A passionate Computer Science student from India building AI products, contributing to open source, solving DSA, and chasing world-class engineering excellence.";

  useEffect(() => {
    if (!showContent) return;
    if (currentLine < lines.length) {
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLine, showContent]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/40" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
        {showContent && (
          <div className="mb-12 h-20 md:h-24 flex items-center justify-center">
            {currentLine < lines.length && (
              <motion.h2 key={currentLine} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-2xl md:text-4xl font-display font-semibold text-primary">
                {lines[currentLine]}
              </motion.h2>
            )}
          </div>
        )}
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <VoiceprintText className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-foreground leading-tight">
              {fullText}
            </VoiceprintText>
          </motion.div>
        )}
        {showContent && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </motion.p>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 transition-all duration-200">
            View Projects
          </button>

          <a href="/contact" className="px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-200">
            Contact Me
          </a>

          <a href="/Riyaresume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary/10 transition-all duration-200">
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}