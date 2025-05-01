
import React from 'react';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';

const Works = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-dark relative grain-effect">
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="pt-24">
        <ProjectsSection />
        <SkillsSection />
      </div>
    </div>
  );
};

export default Works;
