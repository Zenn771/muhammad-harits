
import React, { useState, useEffect } from 'react';
import { useScroll } from "framer-motion";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ParticleEffect from '@/components/ParticleEffect';
import BentoGrid from '@/components/BentoGrid';
import CareerSection from '@/components/sections/CareerSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/ContactSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  // Track active section - removed as this is now handled in the Navbar component
  
  return (
    <div className="bg-black overflow-hidden">
      <Navbar scrollBased={true} />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <SectionBackground pattern="dots" withGrain={true} className="py-16 md:py-24 lg:py-32">
          <section id="about" className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-white">
                About Me
              </h2>
              
              <BentoGrid />
            </div>
          </section>
        </SectionBackground>
        
        {/* Career Section */}
        <CareerSection />
        
        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* FAQs */}
        <FAQSection />
        
        {/* Contact */}
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
