
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
          
          {/* Enhanced CTA buttons with motion effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
            >
              <Button className="bg-white hover:bg-gray-100 text-gray-800 hover:text-black transition-all hover:scale-105 px-8 py-6 text-base font-medium group">
                <span className="relative overflow-hidden inline-block">
                  <span className="inline-block transition-transform group-hover:-translate-y-full duration-300">👋 Let's talk</span>
                  <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">👋 Contact me</span>
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={1}
            >
              <Button variant="outline" className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-6 text-base font-medium group">
                <span className="relative overflow-hidden inline-block">
                  <span className="inline-block transition-transform group-hover:-translate-y-full duration-300">View Projects</span>
                  <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">Explore Work</span>
                </span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scrolling soft skills */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <ClientLogos />
      </div>
    </section>
  );
};

export default HeroSection;
