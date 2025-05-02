
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  magneticIntensity?: number;
  glint?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  magneticIntensity = 0.3,
  glint = true,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glintPosition, setGlintPosition] = useState(-100);
  const [isHovering, setIsHovering] = useState(false);

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
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Trigger glint effect on hover
    if (glint) {
      setGlintPosition(-100);
      setTimeout(() => {
        setGlintPosition(100);
      }, 10);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering, magneticIntensity]);

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      <Button
        ref={buttonRef}
        className={cn("relative overflow-hidden", className)}
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
            <div className="w-12 h-full rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-0" />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};

export default MagneticButton;
