
import React from 'react';
import { motion } from 'framer-motion';
import { careerData } from '@/data/timelineData';
import Timeline from './career/Timeline';
import TimelineFooter from './career/TimelineFooter';
import SectionTitle from '@/components/ui/section-title';

const CareerSection: React.FC = () => {
  return (
    <section id="career" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      {/* Animated grid effect */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      />
      
      {/* Enhanced ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-[120px] filter pointer-events-none animate-pulse" style={{animationDuration: '8s'}} />
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-amber-900/20 blur-[120px] filter pointer-events-none animate-pulse" style={{animationDuration: '12s'}} />
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle 
          title="Career Timeline" 
          subtitle="A journey through my professional experiences and academic achievements"
        />
        
        {/* Timeline */}
        <Timeline items={careerData} />
        
        <TimelineFooter />
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-400">
          <path fill="currentColor" d="M37.9,-65.7C46.1,-55.9,48.4,-40.6,55.6,-28C62.8,-15.4,75,-5.4,77.8,6.5C80.6,18.4,74,32.3,65.2,44.7C56.4,57.1,45.3,68.1,32.6,72.8C19.9,77.4,5.6,75.8,-10.3,75.2C-26.2,74.7,-43.8,75.1,-54.1,67C-64.3,58.8,-67.3,42.1,-69.4,26.9C-71.4,11.7,-72.6,-1.9,-69.2,-14.2C-65.8,-26.5,-57.8,-37.5,-47.7,-47C-37.5,-56.6,-25.1,-64.7,-11.5,-68.8C2.1,-72.9,16.6,-72.9,25.1,-69.2C33.6,-65.5,40.2,-58,46,-49.7Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-400">
          <path fill="currentColor" d="M47.7,-76.1C60.8,-71.9,69.8,-56.5,68.5,-42C67.2,-27.5,55.6,-14,55.5,0.1C55.5,14.1,66.9,28.3,66.9,41.2C66.9,54.2,55.5,65.9,42.3,70.9C29,76,14.5,74.3,-0.7,75.5C-16,76.7,-32,80.7,-45.1,75.6C-58.2,70.4,-68.5,56.1,-76.3,40.9C-84.2,25.7,-89.7,9.6,-87.8,-6C-85.9,-21.5,-76.5,-36.5,-64.7,-47.6C-52.9,-58.7,-38.6,-65.8,-24.8,-69.3C-11,-72.7,2.2,-72.5,16.2,-74.6C30.2,-76.7,45,-80,47.7,-76.1Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};

export default CareerSection;
