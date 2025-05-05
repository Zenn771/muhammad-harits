
import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  glint?: boolean;
  variant?: 'default' | 'outline';
  magneticIntensity?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  glint = false,
  variant = 'default',
  magneticIntensity = 0.3,
  onClick,
  disabled,
  type = "button",
  ...otherProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glintPosition, setGlintPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Apply magnetic effect with intensity factor
    setPosition({
      x: distanceX * magneticIntensity,
      y: distanceY * magneticIntensity
    });
    
    // Update glint position if enabled
    if (glint) {
      const glintX = ((e.clientX - rect.left) / rect.width) * 100;
      const glintY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlintPosition({ x: glintX, y: glintY });
    }
  };

  const handleMouseLeave = () => {
    // Reset position on mouse leave
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      type={type}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {/* Glint effect */}
      {glint && (
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background: `radial-gradient(circle at ${glintPosition.x}% ${glintPosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            zIndex: 0
          }}
        />
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </motion.button>
  );
};

export default MagneticButton;
