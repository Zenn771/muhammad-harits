
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';

const Works = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('works');
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY;
      
      const sections = ['works', 'skills', 'testimonials'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative">
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-lg bg-black/70' : 'py-5'}`}>
        <Navbar activeSection={activeSection} scrollBased={true} className={scrolled ? 'scale-95' : ''} />
      </div>
      
      <div className="pt-24">
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
