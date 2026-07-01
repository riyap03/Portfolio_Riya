import { motion } from 'framer-motion';
import { useState } from 'react';

interface PRSection {
  title: string;
  description: string;
  status: 'pending' | 'in-review' | 'approved' | 'merged';
  children?: React.ReactNode;
}

interface PullRequestJourneyProps {
  sections: PRSection[];
  currentSection?: number;
}

const statusColors = {
  pending: 'text-yellow-500',
  'in-review': 'text-blue-500',
  approved: 'text-green-500',
  merged: 'text-primary'
};

const statusIcons = {
  pending: '⏳',
  'in-review': '👀',
  approved: '✅',
  merged: '🚀'
};

export default function PullRequestJourney({
  sections,
  currentSection = 0
}: PullRequestJourneyProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PR Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 border border-primary/30 rounded-lg bg-background/50 backdrop-blur"
      >
        <h2 className="text-2xl font-bold text-primary mb-2">
          Pull Request: Life as Code
        </h2>
        <p className="text-muted-foreground">
          A journey from ideas to reality. Merging dreams into the future.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative space-y-6">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />

        {/* Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 top-6 w-16 h-16 flex items-center justify-center"
              animate={{
                scale: index <= currentSection ? 1.2 : 1,
                backgroundColor:
                  index <= currentSection
                    ? 'rgba(166, 204, 255, 0.2)'
                    : 'rgba(166, 204, 255, 0.05)'
              }}
              style={{ borderRadius: '50%', border: '2px solid rgba(166, 204, 255, 0.3)' }}
            >
              <span className="text-2xl">{statusIcons[section.status]}</span>
            </motion.div>

            {/* Content */}
            <motion.div
              className="ml-32 p-6 border border-primary/20 rounded-lg bg-background/30 backdrop-blur cursor-pointer hover:border-primary/50 transition-all"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
                <span className={`text-sm font-semibold ${statusColors[section.status]}`}>
                  {section.status.toUpperCase()}
                </span>
              </div>

              {/* Expanded content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: expandedIndex === index ? 1 : 0,
                  height: expandedIndex === index ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-primary/20 overflow-hidden"
              >
                {section.children}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
