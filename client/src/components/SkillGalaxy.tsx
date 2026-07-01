import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'HTML/CSS', 'JavaScript']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Fastify', 'Express', 'Python', 'FastAPI', 'REST APIs']
  },
  {
    title: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL']
  },
  {
    title: 'CS Fundamentals',
    skills: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks']
  }
];

interface SkillNode {
  id: string;
  label: string;
  angle: number;
  radius: number;
  category: string;
}

interface SectionProps {
  id?: string;
}

export default function SkillGalaxy({ id }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [clickedSkill, setClickedSkill] = useState<SkillNode | null>(null);
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([]);

  useEffect(() => {
    const nodes: SkillNode[] = [];
    let skillIndex = 0;

    skillCategories.forEach((category, catIndex) => {
      const categoryRadius = 80 + catIndex * 60;
      const skillsPerCategory = category.skills.length;

      category.skills.forEach((skill, skillIdx) => {
        const angle = (skillIdx / skillsPerCategory) * Math.PI * 2;
        nodes.push({
          id: `${catIndex}-${skillIdx}`,
          label: skill,
          angle,
          radius: categoryRadius,
          category: category.title
        });
        skillIndex++;
      });
    });

    setSkillNodes(nodes);
  }, []);

  return (
    <section id={id} className="py-12 md:py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground text-center">
            Skill Galaxy
          </h2>
          <p className="text-base text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            A neural network of interconnected skills and expertise . Click on categories to get detail info about skills.
          </p>

          {/* Galaxy visualization */}
          <div
            ref={containerRef}
            className="relative w-full h-64 md:h-72 flex items-center justify-center"
          >
            {/* Central core */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(166, 204, 255, 0.5)' }}
            />

            {/* Orbital rings */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute border border-primary/20 rounded-full"
                style={{
                  width: `${ring * 56 * 2}px`,
                  height: `${ring * 56 * 2}px`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30 + ring * 10, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {/* Skill nodes */}
            {skillNodes.map((node, index) => {
              const x = Math.cos(node.angle) * node.radius;
              const y = Math.sin(node.angle) * node.radius;
              const isHovered = hoveredSkill === node.id;

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  animate={{
                    scale: isHovered ? 1.3 : 1,
                    filter: isHovered ? 'drop-shadow(0 0 20px rgba(166, 204, 255, 0.8))' : 'drop-shadow(0 0 5px rgba(166, 204, 255, 0.3))'
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredSkill(node.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setClickedSkill(node)}
                >
                  <div className="relative">
                    {/* Skill node */}
                    <motion.div
                      className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/60 text-primary font-semibold text-xs cursor-pointer hover:bg-primary/30 transition-colors whitespace-nowrap"
                      whileHover={{ scale: 1.1 }}
                    >
                      {node.label}
                    </motion.div>

                    {/* Energy rings on hover */}
                    {isHovered && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary"
                          initial={{ scale: 0.8, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-secondary"
                          initial={{ scale: 0.8, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Connecting lines between related skills */}
            {hoveredSkill && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {skillNodes.map((node) => {
                  if (node.id === hoveredSkill) {
                    return skillNodes
                      .filter((other) => other.category === node.category && other.id !== node.id)
                      .map((other) => {
                        const x1 = Math.cos(node.angle) * node.radius + window.innerWidth / 2;
                        const y1 = Math.sin(node.angle) * node.radius + window.innerHeight / 2;
                        const x2 = Math.cos(other.angle) * other.radius + window.innerWidth / 2;
                        const y2 = Math.sin(other.angle) * other.radius + window.innerHeight / 2;

                        return (
                          <motion.line
                            key={`line-${node.id}-${other.id}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(166, 204, 255, 0.3)"
                            strokeWidth="2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        );
                      });
                  }
                  return null;
                })}
              </svg>
            )}
          </div>

          {/* Skill preview modal */}
          <AnimatePresence>
            {clickedSkill && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setClickedSkill(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-card border border-border rounded-lg p-6 max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary">
                      {clickedSkill.label === clickedSkill.category ? clickedSkill.category + ' Skills' : clickedSkill.label}
                    </h3>
                    <button
                      onClick={() => setClickedSkill(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  {clickedSkill.label === clickedSkill.category && (
                    <p className="text-sm text-muted-foreground mb-3">Category: {clickedSkill.category}</p>
                  )}
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {clickedSkill.label === clickedSkill.category ? 'All skills:' : 'All skills in this category:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillCategories
                      .find((cat) => cat.title === clickedSkill.category)
                      ?.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-1 rounded-full text-xs ${
                            skill === clickedSkill.label || clickedSkill.label === clickedSkill.category
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setClickedSkill({ id: category.title, label: category.title, angle: 0, radius: 0, category: category.title })}
              >
                <p className="font-semibold text-primary mb-2">{category.title}</p>
                <p className="text-sm text-muted-foreground">{category.skills.length} skills</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}