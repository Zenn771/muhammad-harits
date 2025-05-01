
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';

// Sample projects data
const portfolioProjects = [
  {
    company: "Acme Corp",
    year: "2022",
    title: "Dark Saas Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://example.com/project1",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  },
  {
    company: "Innovative Co",
    year: "2021",
    title: "Light Saas Landing Page",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://example.com/project2",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://example.com/project3",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
];

const ProjectsSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced scroll tracking for parallax and animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax values for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityGradientTop = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacityGradientBottom = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Enhanced scroll handler with section-specific scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only count scroll when section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Calculate relative scroll position within the section
          const sectionScrollY = Math.max(0, -rect.top);
          setScrollY(sectionScrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="works" 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 overflow-hidden bg-black relative"
    >
      {/* Grid pattern background with fading gradients */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #4338ca11 1px, transparent 1px), linear-gradient(to bottom, #4338ca11 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        
        {/* Top gradient fade */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"
          style={{ opacity: opacityGradientTop }}
        />
        
        {/* Bottom gradient fade */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"
          style={{ opacity: opacityGradientBottom }}
        />

        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-900/10 blur-[100px] pointer-events-none" 
          style={{ transform: `translateY(${scrollY * -0.02}px)` }}/>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-blue-900/10 blur-[100px] pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}/>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.p 
            className="text-sm uppercase tracking-widest text-amber-200 font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Selected Projects
          </motion.p>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Work
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore my portfolio of innovative digital solutions designed for results
          </motion.p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Card container with stacking perspective */}
          <div 
            className="relative w-full mx-auto"
            style={{
              maxWidth: '1200px',
              minHeight: '600px', // Reduced height for better mobile display
              perspective: '1000px'
            }}
          >
            {/* Stacked cards with reversed order so first card appears at bottom */}
            {[...portfolioProjects].reverse().map((project, reversedIndex) => {
              // Calculate the original index (since we reversed the array)
              const originalIndex = portfolioProjects.length - 1 - reversedIndex;
              
              return (
                <ProjectCard 
                  key={originalIndex} 
                  project={project} 
                  index={reversedIndex}
                  scrollY={scrollY}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
