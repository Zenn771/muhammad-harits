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
import AnimatedWords from '@/components/animations/AnimatedWords';
import GridBackground from '@/components/backgrounds/GridBackground';
import GradientBackdrop from '@/components/backgrounds/GradientBackdrop';
import TextureOverlay from '@/components/backgrounds/TextureOverlay';
import InteractiveTiltCard from '@/components/animations/InteractiveTiltCard';
import EnhancedSpotlightEffect from '@/components/animations/EnhancedSpotlightEffect';
import MagneticButton from '@/components/animations/MagneticButton';
import ShootingStars from '@/components/animations/ShootingStars';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax effect - initialized with 0 to ensure immediate display
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Transform values for parallax layers - will use the spring values which are initialized
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
    "Bridging artificial intelligence with real-world applications",
    "Developing adaptive solutions for complex systems",
    "Integrating AI into control and instrumentation systems",
    "Passionate about creating intelligent systems and innovative solutions."
  ];

  // Card content for interactive card
  const cardContent = {
    title: "Innovation & Engineering",
    description: "Exploring the frontiers of technology with curiosity, creativity, and a hands-on mindset"
  };

  return (
    <section id="home" className="min-h-screen w-full overflow-hidden bg-black relative" ref={containerRef}>
      {/* Background layers with parallax effect - now with initial transforms to be visible immediately */}
      <motion.div 
        style={{ x: gridX, y: gridY }} 
        initial={{ opacity: 1 }} 
        className="absolute inset-0 z-0"
      >
        <GridBackground color="rgba(250, 204, 21, 0.05)" spacing={40} />
      </motion.div>
      
      {/* Gradient backdrop for depth */}
      <GradientBackdrop opacity={0.3} />
      
      {/* Enhanced particle effect with parallax */}
      <motion.div 
        style={{ x: particlesX, y: particlesY }}
        initial={{ opacity: 1 }}
        className="absolute inset-0 z-1"
      >
        <ParticleEffect count={25} />
      </motion.div>
      
      {/* NEW: Shooting stars effect */}
      <ShootingStars starCount={2} frequency={8000} />
      
      {/* Circle stack with parallax effect */}
      <motion.div 
        style={{ x: circlesX, y: circlesY }}
        initial={{ opacity: 1, x: 0, y: 0 }}
        className="absolute inset-0 z-[2]"
      >
        <CircleStack />
      </motion.div>
      
      {/* NEW: Enhanced spotlight effect */}
      <EnhancedSpotlightEffect size={800} intensity={0.3} />
      
      {/* Floating geometric shapes - keeping existing code */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Animated geometric shapes */}
        <motion.div 
          className="absolute w-16 h-16 rounded-full border border-amber-500/20"
          style={{ left: '15%', top: '20%' }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="absolute w-24 h-24 border border-amber-300/10"
          style={{ right: '10%', bottom: '30%', borderRadius: '30%' }}
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="absolute w-12 h-12 bg-gradient-to-br from-amber-500/5 to-purple-500/5"
          style={{ right: '25%', top: '15%', borderRadius: '20%' }}
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.2, 0.5, 0.2],
            rotate: [45, 0, -45, 0, 45]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
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

          {/* Animated glowing orb */}
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-gradient-radial from-amber-500/10 to-transparent"
            style={{ 
              left: '50%', 
              top: '40%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(40px)',
              zIndex: -1,
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-8 tracking-tight animate-fade-in text-white">
            Hi everyone, I’m <AnimatedGradientText text="Harits "/> 👋
          </h1>
          
          {/* Updated subtitle with professional information and rotating typewriter texts */}
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-amber-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Passionate Learner in AI & Electrical
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
          
          {/* NEW: Interactive 3D Card */}
          <div className="mb-10">
            <InteractiveTiltCard 
              className="w-full max-w-xs mx-auto bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden shadow-xl"
              intensity={10}
            >
              <Card className="bg-transparent border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-amber-300 mb-2">{cardContent.title}</h3>
                    <p className="text-white/80 text-sm">{cardContent.description}</p>
                  </div>
                </CardContent>
              </Card>
            </InteractiveTiltCard>
          </div>
          
          {/* NEW: Animated words element for added visual interest */}
          <div className="mb-8 opacity-90">
            <AnimatedWords 
              text="Innovation • Creativity • Growth" 
              className="text-sm text-amber-300/70 tracking-wider uppercase" 
              delay={2.5}
              once={true}
            />
          </div>
          
          {/* Enhanced CTA buttons with magnetic effect */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full px-4 sm:px-0">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
              className="w-full sm:w-auto"
            >
              <MagneticButton
                className="bg-gradient-to-b from-amber-400 to-amber-700 hover:from-amber-500 hover:to-black text-black hover:text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-600/30 transition-all px-6 py-6 text-base rounded-xl w-full sm:w-auto border-0"
                onClick={(e: React.MouseEvent) => scrollToSection('contact', e)}
                glint={true}
                magneticIntensity={0.2}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                <span>Let's Talk</span>
              </MagneticButton>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={1}
              className="w-full sm:w-auto"
            >
              <MagneticButton
                variant="outline"
                className="bg-gradient-to-b from-amber-400/10 to-amber-900/10 hover:from-amber-400/20 hover:to-amber-900/20 border-2 border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 transition-all px-6 py-6 text-base font-medium rounded-xl w-full sm:w-auto"
                onClick={(e: React.MouseEvent) => scrollToSection('works', e)}
                glint={true}
                magneticIntensity={0.2}
              >
                <FolderOpen className="mr-2 h-5 w-5" />
                <span>View Projects</span>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
