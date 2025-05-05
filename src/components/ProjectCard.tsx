
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Result {
  title: string;
}

interface Project {
  company: string;
  year: string;
  title: string;
  results: Result[];
  link: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollY: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate staggered delay based on index
  const delay = index * 0.1;

  return (
    <motion.div
      className={cn(
        "absolute inset-0 w-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300",
        "card-hover glass-morphism border border-white/10 shadow-2xl"
      )}
      style={{ 
        zIndex: 10 - index,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        transform: `translateY(${index * 30}px) scale(${1 - index * 0.05}) perspective(1000px)`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: index * 30 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 md:p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm text-white/60">{project.company}</span>
            <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
            <span className="inline-block px-3 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full mt-2">
              {project.year}
            </span>
          </div>
          <div className="flex-shrink-0 ml-4">
            {/* Enhanced image with hover effect */}
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
                loading="lazy" 
              />
            </motion.div>
          </div>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3">
            {project.results.map((result, i) => (
              <motion.li 
                key={i}
                className="flex items-start gap-2 text-white/80"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + (i * 0.1), duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>{result.title}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Enhanced CTA link */}
        <motion.a
          href={project.link}
          className="mt-6 inline-flex items-center hover-link btn-press text-amber-400 font-medium text-sm"
          target="_blank"
          rel="noopener noreferrer"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          View Project
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.a>
      </div>
      
      {/* Gradient overlay that becomes more visible on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 bg-gradient-to-tr from-amber-600/20 to-blue-600/20 mix-blend-overlay"
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
