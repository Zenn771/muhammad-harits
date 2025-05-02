
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
import SectionTitle from '@/components/ui/section-title';
import { motion } from 'framer-motion';

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
        
        {/* About Section with enhanced visual elements */}
        <SectionBackground 
          pattern="dots" 
          withGrain={true} 
          className="py-16 md:py-24 lg:py-32 relative"
          accentColor="rgba(250, 204, 21, 0.07)"
        >
          <section id="about" className="container mx-auto px-4 md:px-8 relative">
            <div className="max-w-6xl mx-auto">
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/5 blur-[70px] pointer-events-none"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/5 blur-[80px] pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              <SectionTitle 
                title="About Me"
                subtitle="Get to know more about my skills, experience and interests"
              />
              
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
        
        {/* Scroll-to-top button */}
        <motion.button
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gray-800/80 border border-white/10 text-white/80 shadow-lg backdrop-blur-sm z-50 hover:bg-gray-700/80 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 300 ? 1 : 0, y: scrollY > 300 ? 0 : 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      </main>
    </div>
  );
};

export default Index;
