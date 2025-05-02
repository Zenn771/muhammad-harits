
import React from 'react';
import { careerData } from '@/data/timelineData';
import SectionTitle from './career/SectionTitle';
import Timeline from './career/Timeline';
import TimelineFooter from './career/TimelineFooter';

const CareerSection: React.FC = () => {
  return (
    <section id="career" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle 
          title="Career Timeline" 
          subtitle="A journey through my professional experiences and academic achievements" 
        />
        
        {/* Timeline */}
        <Timeline items={careerData} />
        
        <TimelineFooter />
      </div>
    </section>
  );
};

export default CareerSection;
