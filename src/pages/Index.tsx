
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import CareerSection from '@/components/sections/CareerSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/ContactSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import TimelineBackground from '@/components/career/TimelineBackground';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-black overflow-hidden">
      {/* Dynamic background that responds to scroll */}
      <TimelineBackground scrollY={scrollY} />
      
      {/* Updated Navbar with scrollBased set to true */}
      <Navbar scrollBased={true} />
      
      <main className="pt-16 relative z-10"> {/* Add padding to prevent content from being hidden under navbar */}
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <SectionBackground pattern="dots" withGrain={false} className="py-16 md:py-24 lg:py-32">
          <section id="about" className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-white">
                About Me
              </h2>
              
              <BentoGrid />
            </div>
          </section>
        </SectionBackground>
        
        {/* Keep existing code for other sections */}
        <CareerSection />
        <ProjectsSection />
        <SkillsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
