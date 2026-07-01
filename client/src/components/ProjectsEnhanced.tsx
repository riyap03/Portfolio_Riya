import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    name: 'SkillSnap',
    tagline: 'AI-powered portfolio and roadmap generator',
    description: 'A platform that analyzes learning pace using AI and generates personalized career roadmaps and stunning portfolios.',
    tech: ['React', 'Fastify', 'PostgreSQL', 'AI APIs'],
    features: [
      'AI Roadmap Engine',
      'Portfolio Generator',
      'Resume Export',
      'Skill Analytics'
    ],
    github: 'https://github.com/riyap03/Skill-Snap.git',
    deployed: 'https://skill-snap-three.vercel.app/',
    color: 'from-cyan-400 to-blue-500',
    icon: '🧠'
  },
  {
    name: 'QueryChase AI',
    tagline: 'Document Query Platform (HackRx 6.0)',
    description: 'A web app for natural language queries on PDF documents with optimized file-handling backend.',
    tech: ['React', 'Node.js', 'Express', 'Multer'],
    features: [
      'Natural Language Queries',
      'PDF Processing',
      'Dynamic Responses',
      'File Handling'
    ],
    github: 'https://github.com/riyap03/Query-Chase-Clean.git',
    color: 'from-green-400 to-emerald-500',
    icon: '📄'
  },
  {
    name: 'Event Management System',
    tagline: 'Full-stack web application',
    description: 'A comprehensive CRUD system for events with real-time updates and secure authentication.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    features: [
      'Event Management',
      'Real-time Updates',
      'JWT Authentication',
      'Admin Dashboard'
    ],
    github: 'https://github.com/riyap03/Event_management_system.git',
    color: 'from-orange-400 to-red-500',
    icon: '📅'
  }
];

interface SectionProps {
  id?: string;
}

export default function ProjectsEnhanced({ id }: SectionProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id={id} className="py-12 md:py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-foreground">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* 3D perspective effect */}
                <motion.div
                  animate={{
                    rotateX: hoveredProject === index ? 5 : 0,
                    rotateY: hoveredProject === index ? -5 : 0,
                    z: hoveredProject === index ? 100 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 glow-hover">
                    {/* Gradient header */}
                    <div className={`h-24 bg-gradient-to-r ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300 relative overflow-hidden`}>
                      {/* Animated particles in header */}
                      {hoveredProject === index && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-primary rounded-full"
                              initial={{
                                x: Math.random() * 100,
                                y: Math.random() * 100,
                                opacity: 0
                              }}
                              animate={{
                                x: Math.random() * 300,
                                y: Math.random() * 300,
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 -mt-10 relative z-10">
                      {/* Icon and Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-3xl mb-2">{project.icon}</div>
                          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-primary font-semibold text-sm mb-4">
                        {project.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-foreground mb-3">Key Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((feature) => (
                            <motion.span
                              key={feature}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              viewport={{ once: true }}
                              className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold border border-primary/40 hover:border-primary/60 transition-all"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="mb-4 pb-4 border-b border-border/50">
                        <p className="text-sm font-semibold text-foreground mb-2">Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded text-xs bg-background text-muted-foreground font-mono border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-4">
                        {project.deployed && (
                          <a
                            href={project.deployed}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold group/link"
                          >
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            Live Demo
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold group/link"
                        >
                          <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          View on GitHub
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
