
import React from 'react';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import useActiveSection from '@/hooks/use-active-section';

const Works = () => {
  const sections = ['works', 'skills', 'testimonials'];
  const { activeSection, scrolled } = useActiveSection({ 
    sections: sections,
    offset: 100,
    threshold: 0.3
  });

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative">
      <div className="pt-24 mt-4">
        <Navbar activeSection={activeSection} scrollBased={true} className={scrolled ? 'backdrop-blur-lg bg-black/70' : ''} />
        
        <SectionBackground pattern="diagonal" withGrain={true}>
          <section id="works" className="min-h-screen py-16 md:py-24 lg:py-32 px-4 md:px-8">
            <ProjectsSection />
          </section>
        </SectionBackground>
        
        <SectionBackground pattern="circuit" withGrain={false}>
          <section id="skills" className="min-h-screen py-16 md:py-24 lg:py-32 px-4 md:px-8">
            <SkillsSection />
          </section>
        </SectionBackground>
        
        <SectionBackground pattern="flow" withGrain={false}>
          <section id="testimonials" className="min-h-screen py-16 md:py-24 lg:py-32 px-4 md:px-8">
            <TestimonialsSection />
          </section>
        </SectionBackground>
      </div>
    </div>
  );
};

export default Works;
