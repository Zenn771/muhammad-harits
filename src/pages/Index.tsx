
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import BentoBox from '@/components/BentoGrid';

// Import all our extracted section components
import HeroSection from '@/components/sections/HeroSection';
import CareerSection from '@/components/sections/CareerSection';
import FAQSection from '@/components/sections/FAQSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll effect for navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY;
      
      const sections = ['home', 'about', 'career', 'works', 'faq', 'contact'];
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
    <div className="w-full overflow-x-hidden">
      {/* Navigation with scroll effect */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-lg bg-black/70' : 'py-5'}`}>
        <Navbar activeSection={activeSection} scrollBased={true} className={scrolled ? 'scale-95' : ''} />
      </div>
      
      {/* HOME SECTION */}
      <HeroSection />

      {/* ABOUT SECTION */}
      <SectionBackground pattern="hexagon" withTransition={true}>
        <section id="about" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8">
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-gray-100 vintage-text">
              About Me
            </h2>
            
            <div className="mb-12 max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-300/90">
                I'm a passionate AI and electrical engineer with over 5 years of experience creating intelligent systems and innovative solutions. My multidisciplinary approach combines technical expertise with creative problem-solving.
              </p>
            </div>
            
            <BentoBox />
          </div>
        </section>
      </SectionBackground>

      {/* CAREER SECTION */}
      <SectionBackground pattern="diagonal" accentColor="rgba(67, 56, 202, 0.1)" withTransition={true}>
        <CareerSection />
      </SectionBackground>

      {/* WORKS SECTION */}
      <SectionBackground pattern="diagonal">
        <ProjectsSection />
      </SectionBackground>
      
      {/* SKILLS SECTION */}
      <SectionBackground pattern="circuit" accentColor="rgba(56, 189, 248, 0.1)" withTransition={true}>
        <SkillsSection />
      </SectionBackground>

      {/* TESTIMONIALS SECTION */}
      <SectionBackground pattern="flow" accentColor="rgba(191, 219, 254, 0.1)" withTransition={true}>
        <TestimonialsSection />
      </SectionBackground>

      {/* FAQ SECTION */}
      <SectionBackground pattern="dots" accentColor="rgba(250, 204, 21, 0.1)" withTransition={true}>
        <FAQSection />
      </SectionBackground>

      {/* CONTACT SECTION */}
      <SectionBackground pattern="topo" accentColor="rgba(56, 189, 248, 0.08)" withTransition={true}>
        <ContactSection />
      </SectionBackground>
    </div>
  );
};

export default Index;
