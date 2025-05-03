
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedWords from './animations/AnimatedWords';
import AnimatedGradientText from './animations/AnimatedGradientText';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import ParticleEffect from './ParticleEffect';
import CircleStack from './CircleStack';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background circle animation */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <CircleStack />
        <ParticleEffect />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 relative text-center">
        <motion.div
          className="flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting text */}
          <p className="text-accent text-lg md:text-xl italic mb-0">Welcome to my portfolio</p>
          
          {/* Main heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <AnimatedWords 
              text="Hi, I'm" 
              className="block mb-2"
              delay={0.2} 
            />
            <AnimatedGradientText 
              text="Harits Adiyatma" 
              className="block text-5xl md:text-7xl lg:text-8xl font-extrabold"
            />
          </motion.h1>
          
          {/* Subheading text */}
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A specialist in <span className="text-accent font-medium">Artificial Intelligence</span>, <span className="text-accent font-medium">Web Development</span>, and <span className="text-accent font-medium">Electrical Engineering</span>
          </motion.p>
          
          {/* CTA Buttons - Fixed issue with disappearing buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ScrollLink to="contact" smooth={true} duration={500} offset={-100} className="inline-block">
              <Button 
                size="lg" 
                className="text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-none px-8 py-6 h-auto text-base transition-all hover:scale-[1.02]"
              >
                Let's Talk
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </ScrollLink>
            
            <Link to="/works" className="inline-block">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/20 hover:bg-white/10 px-8 py-6 h-auto text-base transition-all hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
