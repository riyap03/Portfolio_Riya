import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroPremium from '@/components/HeroPremium';
import AboutEnhanced from '@/components/AboutEnhanced';
import SkillGalaxy from '@/components/SkillGalaxy';
import Experience from '@/components/Experience';
import OpenSource from '@/components/OpenSource';
import ProjectsEnhanced from '@/components/ProjectsEnhanced';
import Footer from '@/components/Footer';
import PullRequestJourney from '@/components/PullRequestJourney';

const TimeRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number; opacity: number; life: number; maxLife: number }>>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createRipple = (x: number, y: number) => ({
      x, y, radius: 0, maxRadius: Math.max(canvas.width, canvas.height), opacity: 0.6, life: 0, maxLife: 60
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.95) ripplesRef.current.push(createRipple(e.clientX, e.clientY));
    };
    const handleClick = (e: MouseEvent) => ripplesRef.current.push(createRipple(e.clientX, e.clientY));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((ripple: { x: number; y: number; radius: number; maxRadius: number; opacity: number; life: number; maxLife: number }) => {
        ripple.life += 1;
        ripple.radius = (ripple.life / ripple.maxLife) * ripple.maxRadius;
        ripple.opacity = Math.max(0, 0.6 * (1 - ripple.life / ripple.maxLife));
        ctx.strokeStyle = `rgba(166, 204, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(166, 204, 255, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        return ripple.life < ripple.maxLife;
      });
      if (ripplesRef.current.length > 0) animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(animate);
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-30 pointer-events-none" style={{ mixBlendMode: 'screen' }} />;
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('riyapanwar0307@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;

      setScrollProgress(progress);

      // Merge progress starts at 30% scroll and completes at 70% scroll
      if (progress < 0.3) {
        setMergeProgress(0);
      } else if (progress > 0.7) {
        setMergeProgress(1);
      } else {
        setMergeProgress((progress - 0.3) / 0.4);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prSections = [
    {
      title: 'init self',
      description: 'Beginning of a journey. A curious mind seeking excellence.',
      status: 'merged' as const,
      children: (
        <p className="text-muted-foreground">
          Started as a Computer Science student from India with a passion for building.
        </p>
      )
    },
    {
      title: 'learned the fundamentals',
      description: 'HTML, CSS, JavaScript. Building blocks of the web.',
      status: 'merged' as const,
      children: (
        <p className="text-muted-foreground">
          Mastered web development basics and started creating projects.
        </p>
      )
    },
    {
      title: 'contributed to Fastify',
      description: 'Open source. Making an impact on the ecosystem.',
      status: 'merged' as const,
      children: (
        <p className="text-muted-foreground">
          3 PRs merged into Fastify, contributing to a world-class framework.
        </p>
      )
    },
    {
      title: 'building AI products',
      description: 'Combining code with creativity. Engineering meets art.',
      status: 'in-review' as const,
      children: (
        <p className="text-muted-foreground">
          Creating intelligent systems that solve real problems.
        </p>
      )
    },
    {
      title: 'becoming whole',
      description: 'Engineer and poet. Code and dreams. One unified vision.',
      status: 'pending' as const,
      children: (
        <p className="text-muted-foreground">
          Merging all aspects of identity into a powerful force for change.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen text-foreground pt-20">
      <Navbar />
      <TimeRipple />
      <HeroPremium />
      <AboutEnhanced id="about" />
      <SkillGalaxy id="skills" />
      <Experience id="experience" />
      <OpenSource />
      <ProjectsEnhanced id="projects" />

      {/* Journey Section - Pull Request Journey */}
      <section className="relative min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-center mb-12"
          >
            Life as a Pull Request
          </motion.h2>

          <PullRequestJourney
            sections={prSections}
            currentSection={Math.floor(scrollProgress * 5)}
          />
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-primary"
          >
            Merged into Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Engineer and poet, code and dreams, logic and emotion—all merged into one unified vision
            of building a better future.
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition-all inline-block"
          >
            Let's Build Together
          </motion.a>
        </motion.div>
      </section>

      <section id="connect" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Let's Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={copyEmail} className="px-6 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 transition-all">{emailCopied ? 'Email Copied!' : 'Email Me'}</button>
            <a href="https://github.com/riyap03" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary/60 hover:text-primary transition-all">GitHub</a>
            <a href="https://www.linkedin.com/in/riya-panwar-486845332/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary/60 hover:text-primary transition-all">LinkedIn</a>
            <a href="/contact" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary/60 hover:text-primary transition-all">Contact Form</a>
            <a href="/Riyaresume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary/60 hover:text-primary transition-all">Resume</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}