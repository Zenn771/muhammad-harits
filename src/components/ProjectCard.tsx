import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
  const [showAllResults, setShowAllResults] = useState(true); // Default to showing all results
  
  // Calculate position based on scroll
  const scrollFactor = Math.min(scrollY * 0.0015, 1);
  const yOffset = Math.min(60 * scrollFactor * (index + 1), 100);
  
  // Animation values for subtle hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Smoother animation with springs
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  // Determine how many results to display initially based on screen size
  const initialResultsToShow = isMobile ? project.results.length : project.results.length;
  const hasMoreResults = project.results.length > initialResultsToShow;

  // Responsive attribute adjustments based on screen size
  const cardProps = {
    // Base styles with reduced margins on mobile
    className: cn(
      "w-full mx-auto mb-4 md:mb-16",
      "bg-[#221F26] rounded-2xl md:rounded-3xl overflow-hidden",
      "border border-white/10 shadow-xl",
      "transform transition-all duration-300"
    ),
    // Scroll animation and stacking effect
    style: {
      transform: `translateY(-${yOffset}px)`, // Upward movement
      zIndex: 10 - index,
    }
  };
  
  // Handle mouse move for hover effect (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip hover effect on mobile
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  // Toggle showing all results
  const toggleResults = () => {
    setShowAllResults(!showAllResults);
  };

  // Render the results based on mobile view and showAllResults state
  const renderResults = () => {
    if (isMobile) {
      // On mobile, we now show all results by default
      return (
        <>
          <ul className="space-y-1 md:space-y-4 mb-3">
            {project.results.map((result, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-2 text-white/80 text-xs md:text-base"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-3 w-3 md:h-5 md:w-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <span>{result.title}</span>
              </motion.li>
            ))}
          </ul>
        </>
      );
    }
    
    // On desktop, show all results
    return (
      <ul className="space-y-2 md:space-y-4 mb-6">
        {project.results.map((result, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-3 text-white/80 text-sm md:text-base"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
            viewport={{ once: true }}
          >
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-amber-200 flex-shrink-0 mt-0.5" />
            <span>{result.title}</span>
          </motion.li>
        ))}
      </ul>
    );
  };

  // Render mobile accordion card or regular card based on screen size
  if (isMobile) {
    return (
      <motion.div
        {...cardProps}
        whileInView={{ opacity: [0, 1], scale: [0.95, 1] }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Grain texture overlay */}
        <div className="absolute inset-0 bg-grain opacity-10 mix-blend-soft-light pointer-events-none rounded-2xl md:rounded-3xl"></div>
        
        <Accordion type="single" collapsible className="w-full border-white/0">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-4 px-6">
              <div className="text-left">
                <div className="flex items-center space-x-2 text-xs font-medium">
                  <span className="text-amber-200">{project.company}</span>
                  <span className="text-white/30">&bull;</span>
                  <span className="text-white/70">{project.year}</span>
                </div>
                <h3 className="mt-1 text-base md:text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-6 pb-4">
              <hr className="border-t border-white/10 mb-3" />
              
              {/* Project results with all results showing by default */}
              {renderResults()}
              
              {/* Project action */}
              <div>
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Visit Project</span>
                  <ArrowUpRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>
              
              {/* Project image with increased height */}
              <div className="h-[180px] sm:h-[220px] mt-4 overflow-hidden rounded-lg relative">
                {project.image ? (
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white/30">
                    No Image Available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#221F26]/80 to-transparent"></div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    );
  }

  // Original desktop design
  return (
    <motion.div
      {...cardProps}
      whileInView={{ opacity: [0, 1], scale: [0.95, 1] }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        ...cardProps.style,
        rotateX: springX,
        rotateY: springY
      }}
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-10 mix-blend-soft-light pointer-events-none rounded-2xl md:rounded-3xl"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-6 md:p-8">
        {/* Project details */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 text-xs md:text-sm font-medium">
            <span className="text-amber-200">{project.company}</span>
            <span className="text-white/30">&bull;</span>
            <span className="text-white/70">{project.year}</span>
          </div>
          
          <h3 className="mt-3 md:mt-4 text-xl md:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          
          <hr className="border-t border-white/10 my-4 md:my-6" />
          
          {renderResults()}
          
          <div className="mt-auto">
            <motion.a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Visit Project</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>
        
        {/* Project image with optimized sizing */}
        <div className="h-[200px] sm:h-[250px] md:h-full overflow-hidden rounded-lg relative">
          {project.image ? (
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
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