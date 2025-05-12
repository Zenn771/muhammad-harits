
import React from 'react';
import { motion } from 'framer-motion';
import { careerData } from '@/data/timelineData';
import SectionTitle from './career/SectionTitle';
import Timeline from './career/Timeline';
import TimelineFooter from './career/TimelineFooter';

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
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-amber-900/20 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle 
          title="Career Timeline" 
          subtitle="A timeline of my academic and career development" 
        />
        
        {/* Timeline */}
        <Timeline items={careerData} />
        
        <TimelineFooter />
      </div>
    </section>
  );
};

export default CareerSection;
