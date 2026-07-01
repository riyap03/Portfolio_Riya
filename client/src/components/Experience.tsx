import { motion } from 'framer-motion';

interface Project {
  title: string;
  url: string;
  description: string;
  contributions: string[];
}

interface ExperienceItem {
  company: string;
  url: string;
  role: string;
  duration: string;
  type: string;
  overview: string;
  projects: Project[];
  learnings: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'RJVertex',
    url: 'https://rjvertex.com/',
    role: 'Software Engineering Intern',
    duration: '1 Month',
    type: 'Paid',
    overview: 'Worked as an early engineering team member contributing across product development, infrastructure, deployment, and technical architecture for multiple startup products under RJVertex.',
    projects: [
      {
        title: 'OpenJobsIndia',
        url: 'https://aijobs.rjvertex.com/',
        description: 'Developed features for an AI-assisted hiring platform',
        contributions: [
          'Bulk apply + shortlist workflows for both recruiters and applicants',
          'Advanced applicant filtering system',
          'Worked across frontend (Next.js) and backend (FastAPI, PostgreSQL)'
        ]
      },
      {
        title: 'ABI Analytics',
        url: 'https://abi.rjvertex.com/',
        description: 'Helped build and deploy an AI-driven business intelligence platform',
contributions: [
          'Query-based analytics workflows',
          'Deployment & production debugging with Scalable analytics infrastructure'
        ]
      },
      {
        title: 'Platform Engineering & Infrastructure',
        url: 'https://rjvertex.com/',
        description: 'Managed cloud deployment, domain configuration, and technical architecture',
contributions: [
        
           'Handled environment variables and deployment pipelines',
           'Built the company main website'
         ]
      }
    ],
    learnings: [
      'Production debugging under real constraints',
      'Full-stack architecture and deployment workflows',
      'Backend-frontend integration',
      'Writing clean, maintainable engineering solutions'
    ]
  },
  {
    company: 'InAmigos Foundation',
    url: '#',
    role: 'Intern',
    duration: '2 Weeks',
    type: 'Volunteer',
    overview: 'Worked in a collaborative environment and contributed to organizational initiatives.',
    projects: [
      {
        title: 'Organizational Projects',
        url: '#',
        description: 'Contributed to various foundation initiatives',
        contributions: [
          'Assisted in project coordination and execution',
          'Collaborated with team members on deliverables',
          'Improved communication and workflow efficiency'
        ]
      }
    ],
    learnings: [
      'Team collaboration',
      'Professional communication',
      'Accountability',
      'Time management'
    ]
  }
];

interface SectionProps {
  id?: string;
}

export default function Experience({ id }: SectionProps) {
  return (
    <section id={id} className="py-12 md:py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-foreground">
            Work Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-5 md:p-6 glow-hover"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                      {exp.company}
                    </h3>
                    <p className="text-base text-primary font-semibold mb-1">
                      {exp.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exp.duration} • <span className="text-secondary">{exp.type}</span>
                    </p>
                  </div>
                </div>

                {/* Overview */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.overview}
                </p>

                {/* Projects */}
                <div className="space-y-6 mb-4">
                  {exp.projects.map((project, pIdx) => (
                    <div key={pIdx} className="border-l-2 border-primary/30 pl-4">
                      <div className="flex items-center gap-3 mb-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-primary hover:text-secondary transition-colors"
                        >
                          {project.title}
                        </a>
                        {project.url !== '#' && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors"
                          >
                            View Site
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <ul className="space-y-1">
                        {project.contributions.map((contrib, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span>{contrib}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Key Learnings */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Key Learnings:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.learnings.map((learning, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="px-2 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold border border-primary/40"
                      >
                        {learning}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}