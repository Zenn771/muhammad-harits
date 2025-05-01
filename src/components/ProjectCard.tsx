
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: {
    company: string;
    year: string;
    title: string;
    results: { title: string }[];
    link: string;
    image?: string;
  };
  index: number;
  scrollY: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, scrollY }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate parallax and rotation effects based on scroll position
  const rotation = Math.min(scrollY * 0.03 * (index + 1), 25);
  const yOffset = Math.min(scrollY * 0.5 * (index + 1), 100);
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "w-full relative mb-10 mx-auto",
        "grain-effect vintage-card",
        "bg-[#221F26] border border-white/5 rounded-xl overflow-hidden",
        "transform transition-all duration-500 ease-out",
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation}deg) translateY(${yOffset}px)`,
        zIndex: 10 - index,
        maxHeight: '650px',
      }}
    >
      <div className="absolute inset-0 grain-effect opacity-20"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Project details */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <span className="text-amber-200/80">{project.company}</span>
            <span className="text-white/30">&bull;</span>
            <span className="text-white/60">{project.year}</span>
          </div>
          
          <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          
          <hr className="border-t border-white/10 my-6" />
          
          <ul className="space-y-3 mb-8">
            {project.results.map((result, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70">
                <CheckCircle className="h-5 w-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span>Visit Project</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        
        {/* Project image */}
        <div className="relative h-[200px] md:h-auto overflow-hidden rounded-lg">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white/30">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#221F26]/80 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
