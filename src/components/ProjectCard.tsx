
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Enhanced position calculation with improved stacking effect
  const scrollFactor = Math.min(scrollY * 0.002, 1);
  
  // Calculate offset with more pronounced stacking effect and different values for mobile
  const yOffset = isMobile 
    ? Math.min(40 * scrollFactor * (index + 1), 80) 
    : Math.min(70 * scrollFactor * (index + 1), 120);
  
  // Calculate scale with subtle reduction for better stacking appearance
  const scale = Math.max(1 - (index * 0.03 * scrollFactor), 0.9);
  
  return (
    <motion.div
      className={cn(
        "w-full mx-auto mb-12 md:mb-16",
        "bg-[#221F26] rounded-3xl overflow-hidden",
        "border border-white/10 shadow-xl",
        "transform transition-all duration-300"
      )}
      style={{
        transform: `translateY(-${yOffset}px) scale(${scale})`,
        zIndex: 10 - index,
        position: 'relative',
        transformOrigin: 'center bottom',
      }}
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-10 mix-blend-soft-light pointer-events-none rounded-3xl"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-6 md:p-8">
        {/* Project details */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 text-xs md:text-sm font-medium">
            <span className="text-amber-200">{project.company}</span>
            <span className="text-white/30">&bull;</span>
            <span className="text-white/70">{project.year}</span>
          </div>
          
          <h3 className="mt-3 md:mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          
          <hr className="border-t border-white/10 my-4 md:my-6" />
          
          <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {project.results.map((result, i) => (
              <li key={i} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-white/80">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <span>Visit Project</span>
              <ArrowUpRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        
        {/* Project image */}
        <div className="h-[200px] sm:h-[250px] md:h-full overflow-hidden rounded-lg relative">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#221F26]/80 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
