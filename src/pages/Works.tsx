
import React from 'react';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';

const Works = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative">
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="pt-24">
        <SectionBackground pattern="diagonal" withGrain={true}>
          <ProjectsSection />
        </SectionBackground>
        
        <SectionBackground pattern="circuit" withGrain={true}>
          <SkillsSection />
        </SectionBackground>
        
        <SectionBackground pattern="flow" withGrain={true}>
          <TestimonialsSection />
        </SectionBackground>
      </div>
    </div>
  );
};

export default Works;
