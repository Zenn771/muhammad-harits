
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, FolderOpen } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import ClientLogos from '@/components/ClientLogos';
import TypewriterText from '@/components/animations/TypewriterText';
import AnimatedGradientText from '@/components/animations/AnimatedGradientText';
import FloatingCharacters from '@/components/animations/FloatingCharacters';
import GridBackground from '@/components/backgrounds/GridBackground';
import GradientBackdrop from '@/components/backgrounds/GradientBackdrop';
import TextureOverlay from '@/components/backgrounds/TextureOverlay';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Transform values for parallax layers
  const gridX = useTransform(smoothMouseX, [-500, 500], [50, -50]);
  const gridY = useTransform(smoothMouseY, [-500, 500], [25, -25]);
  const particlesX = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const particlesY = useTransform(smoothMouseY, [-500, 500], [10, -10]);
  const circlesX = useTransform(smoothMouseX, [-500, 500], [10, -10]);
  const circlesY = useTransform(smoothMouseY, [-500, 500], [5, -5]);
  
  // Handle mouse movement for spotlight and parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      // Get container dimensions and position
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to center
      const relativeX = e.clientX - centerX;
      const relativeY = e.clientY - centerY;
      
      // Update motion values for parallax
      mouseX.set(relativeX);
      mouseY.set(relativeY);
      
      // Update spotlight position
      if (spotlightRef.current) {
        const spotlightRect = spotlightRef.current.getBoundingClientRect();
        const x = e.clientX - spotlightRect.left;
        const y = e.clientY - spotlightRect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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

  // Multiple texts for the typewriter effect
  const typewriterTexts = [
    "Passionate about creating intelligent systems and innovative solutions.",
    "Dedicated to solving complex problems with elegant engineering.",
    "Focusing on the intersection of AI and electrical engineering.",
    "Turning ambitious ideas into practical technological applications."
  ];

  return (
    <section id="home" className="min-h-screen w-full overflow-hidden bg-black relative" ref={containerRef}>
      {/* Background layers with parallax effect */}
      <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 z-0">
        <GridBackground color="rgba(250, 204, 21, 0.05)" spacing={40} />
      </motion.div>
      
      {/* Gradient backdrop for depth */}
      <GradientBackdrop opacity={0.3} />
      
      {/* Enhanced particle effect with parallax */}
      <motion.div style={{ x: particlesX, y: particlesY }} className="absolute inset-0 z-1">
        <ParticleEffect count={25} />
      </motion.div>
      
      {/* Circle stack with parallax effect */}
      <motion.div style={{ x: circlesX, y: circlesY }} className="absolute inset-0 z-2">
        <CircleStack />
      </motion.div>
      
      {/* Texture overlay */}
      <TextureOverlay grainOpacity={0.03} noiseOpacity={0.02} />
      
      {/* Main content with spotlight effect */}
      <div className="relative h-screen flex flex-col items-center justify-center z-10">
        <div 
          ref={spotlightRef}
          className="text-center max-w-3xl px-6 relative"
        >
          {/* Enhanced spotlight effect that follows mouse movement */}
          <motion.div 
            className="absolute pointer-events-none"
            animate={{
              background: 'radial-gradient(circle at center, rgba(250,204,21,0.15) 0%, rgba(0,0,0,0) 70%)',
              width: '120%',
              height: '160%',
              top: '-30%',
              left: '-10%',
            }}
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: 0.8,
              zIndex: -1,
            }}
          />

          {/* Enhanced vignette effect around the edges */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)',
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
          
          {/* Updated subtitle with professional information and rotating typewriter texts */}
          <div className="space-y-4 mb-14">
            <p className="text-xl md:text-2xl text-amber-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              AI & Electrical Engineer
            </p>
            <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <TypewriterText 
                text={typewriterTexts}
                delay={1}
                speed={30}
                repeat={true}
              />
            </p>
          </div>
          
          {/* Enhanced CTA buttons with yellow to black gradient */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full px-4 sm:px-0">
            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection('contact', e)}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="bg-gradient-to-b from-amber-400 to-amber-700 hover:from-amber-500 hover:to-black text-black hover:text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-600/30 transition-all px-6 py-6 text-base rounded-xl w-full sm:w-auto border-0"
              >
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="bg-gradient-to-b from-amber-400/10 to-amber-900/10 hover:from-amber-400/20 hover:to-amber-900/20 border-2 border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 transition-all px-6 py-6 text-base font-medium rounded-xl w-full sm:w-auto"
              >
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
