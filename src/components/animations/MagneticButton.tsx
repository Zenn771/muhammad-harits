
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  magneticIntensity?: number;
  glint?: boolean;
  energyTrail?: boolean;
  pulseOnHover?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  magneticIntensity = 0.3,
  glint = true,
  energyTrail = true,
  pulseOnHover = true,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glintPosition, setGlintPosition] = useState(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [trailParticles, setTrailParticles] = useState<{ x: number, y: number, size: number, opacity: number }[]>([]);
  const [clickEffect, setClickEffect] = useState(false);

  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current || !isHovering) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate the distance from the mouse to the center of the button
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate the magnetic pull (stronger when closer to the center)
    const magneticPullX = distanceX * magneticIntensity;
    const magneticPullY = distanceY * magneticIntensity;
    
    setPosition({ x: magneticPullX, y: magneticPullY });
    
    // Add energy trail particles on hover
    if (energyTrail && isHovering && Math.random() > 0.8) {
      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;
      
      setTrailParticles(prev => [...prev, {
        x: relativeX * 100,
        y: relativeY * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.2
      }].slice(-10)); // Keep only the last 10 particles for performance
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Trigger glint effect on hover
    if (glint) {
      setGlintPosition(-100);
      setTimeout(() => {
        setGlintPosition(200);
      }, 10);
    }
    
    // Reset trail particles
    setTrailParticles([]);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
    
    // Fade out trail particles
    setTimeout(() => {
      setTrailParticles([]);
    }, 500);
  };
  
  const handleClick = () => {
    // Show click effect
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 500);
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering, magneticIntensity]);
  
  // Clean up trail particles regularly
  useEffect(() => {
    if (!energyTrail) return;
    
    const cleanup = setInterval(() => {
      setTrailParticles(prev => {
        if (prev.length > 0 && !isHovering) {
          return prev.slice(1); // Remove oldest particle
        }
        return prev;
      });
    }, 300);
    
    return () => clearInterval(cleanup);
  }, [energyTrail, isHovering]);

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        scale: clickEffect ? 0.95 : (pulseOnHover && isHovering ? [1, 1.02, 1] : 1)
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
        scale: { duration: 0.4, repeat: pulseOnHover && isHovering ? Infinity : 0, repeatType: "reverse" }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      <Button
        ref={buttonRef}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        
        {/* Glint effect */}
        {glint && isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-12 h-full rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-0" />
          </motion.div>
        )}
        
        {/* Energy trail particles */}
        {energyTrail && trailParticles.map((particle, index) => (
          <motion.div
            key={`particle-${index}-${particle.x}-${particle.y}`}
            className="absolute pointer-events-none rounded-full bg-amber-300"
            initial={{ opacity: particle.opacity, width: particle.size, height: particle.size }}
            animate={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Click ripple effect */}
        {clickEffect && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl bg-amber-300/20"
            initial={{ opacity: 0.8, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default MagneticButton;
