
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, FolderOpen } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import ClientLogos from '@/components/ClientLogos';
import TypewriterText from '@/components/animations/TypewriterText';
import AnimatedGradientText from '@/components/animations/AnimatedGradientText';
import FloatingCharacters from '@/components/animations/FloatingCharacters';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        // Get the bounding rectangle of the element
        const rect = spotlightRef.current.getBoundingClientRect();
        
        // Calculate the mouse position relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants for buttons
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 2.0 + (custom * 0.2),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen w-full overflow-hidden bg-black relative">
      {/* Reduced particle count */}
      <ParticleEffect count={15} />
      
      {/* Simplified circle stack */}
      <CircleStack />
      
      {/* Main content with spotlight effect */}
      <div className="relative h-screen flex flex-col items-center justify-center z-10">
        <div 
          ref={spotlightRef}
          className="text-center max-w-3xl px-6 relative"
        >
          {/* Spotlight effect that follows mouse movement */}
          <div 
            className="absolute pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(250,204,21,0.15) 0%, rgba(0,0,0,0) 70%)',
              width: '120%',
              height: '160%',
              top: '-30%',
              left: '-10%',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`, // Reduced movement speed
              transition: 'transform 0.5s ease-out', // Smoother transition
              opacity: 0.8,
              zIndex: -1,
            }}
          />

          {/* Vignette effect around the edges */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
          
          {/* Status badge with animation */}
          <div className="mb-10 flex justify-center animate-fade-in">
            <StatusBadge status="available" />
          </div>
          
          {/* Enhanced main headline with personal greeting and animated name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-fade-in text-white">
            Hi everyone, my name is <AnimatedGradientText text="Harits" />
          </h1>
          
          {/* Updated subtitle with professional information and fixed text (no animations) */}
          <div className="space-y-4 mb-14">
            <p className="text-xl md:text-2xl text-amber-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              AI & Electrical Engineer
            </p>
            <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <TypewriterText 
                text="Passionate about creating intelligent systems and innovative solutions."
                delay={1}
                speed={30}
                repeat={true}
              />
            </p>
          </div>
          
          {/* Enhanced CTA buttons with motion effects and proper links */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full px-4 sm:px-0">
            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection('contact', e)}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
              className="w-full sm:w-auto"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-blue-900/20 transition-all hover:scale-105 px-6 py-6 text-base font-medium rounded-xl w-full sm:w-auto">
                <MessageSquare className="mr-2 h-5 w-5" />
                <span>Let's Talk</span>
              </Button>
            </motion.a>
            
            <motion.a
              href="#works"
              onClick={(e) => scrollToSection('works', e)}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={1}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 transition-all hover:scale-105 px-6 py-6 text-base font-medium rounded-xl w-full sm:w-auto">
                <FolderOpen className="mr-2 h-5 w-5" />
                <span>View Projects</span>
              </Button>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
