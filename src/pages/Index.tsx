
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import StatusBadge from '@/components/StatusBadge';
import ClientLogos from '@/components/ClientLogos';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative grain-effect">
      {/* Enhanced background particles with more density */}
      <ParticleEffect count={100} />
      
      {/* Navigation with scroll effect */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-lg bg-black/70' : 'py-5'}`}>
        <Navbar className={scrolled ? 'scale-95' : ''} />
      </div>
      
      {/* Enhanced circle stack with more depth */}
      <CircleStack />
      
      {/* Main content positioned in the center with enhanced spotlight effect */}
      <div className="relative h-screen flex flex-col items-center justify-center z-10">
        <div className="text-center max-w-3xl px-6">
          <div className="relative spotlight-enhanced">
            {/* Status badge with animation */}
            <div className="mb-10 flex justify-center animate-fade-in">
              <StatusBadge status="available" />
            </div>
            
            {/* Updated main headline with personal greeting */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-fade-in">
              <span className="text-white">Hi everyone,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 animate-pulse-slow">
                my name is Harits
              </span>
            </h1>
            
            {/* Updated subtitle with professional information */}
            <div className="space-y-4 mb-14">
              <p className="text-xl md:text-2xl text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-accent to-amber-100">
                  AI & Electrical Engineer
                </span>
              </p>
              <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Passionate about creating intelligent systems and innovative solutions.
              </p>
            </div>
            
            {/* Enhanced CTA buttons with improved contrast */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button className="bg-accent text-black hover:bg-amber-300 hover:text-black transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                👋 Let's talk
              </Button>
              <Button variant="outline" className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced footer with client logos */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <ClientLogos />
      </div>
      
      {/* Enhanced glowing stars/particles */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const top = Math.random() * 80 + 10;
        const left = Math.random() * 80 + 10;
        const opacity = Math.random() * 0.5 + 0.2;
        const delay = i * 0.3;
        
        return (
          <div
            key={`star-${i}`}
            className="absolute animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              background: 'radial-gradient(circle, rgba(250,204,21,0.8) 0%, rgba(250,204,21,0) 70%)',
              borderRadius: '50%',
              filter: 'blur(1px)',
              animationDelay: `${delay}s`,
              boxShadow: '0 0 10px 2px rgba(250,204,21,0.3)',
            }}
          />
        );
      })}
    </div>
  );
};

export default Index;
