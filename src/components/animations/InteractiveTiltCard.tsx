
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareIntensity?: number;
  perspective?: number;
  enableGlare?: boolean;
}

const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children, 
  className = "", 
  intensity = 15, 
  glareIntensity = 0.15,
  perspective = 800,
  enableGlare = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  // Calculate card rotation based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * intensity;
    
    // Calculate glare position (inverted)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: (e.clientX - centerX) * 0.05, y: (e.clientY - centerY) * 0.05 });
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset rotation and position smoothly
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  // Subtle ambient animation when not hovering
  useEffect(() => {
    if (!isHovering && cardRef.current) {
      const intervalId = setInterval(() => {
        const ambientX = Math.sin(Date.now() * 0.001) * 2;
        const ambientY = Math.cos(Date.now() * 0.001) * 2;
        setRotation({ x: ambientX, y: ambientY });
      }, 50);
      
      return () => clearInterval(intervalId);
    }
  }, [isHovering]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        x: position.x,
        y: position.y,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
          mass: 1
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {enableGlare && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareIntensity}), transparent 70%)`,
            mixBlendMode: 'overlay',
            willChange: 'background',
          }}
          animate={{
            opacity: isHovering ? 1 : 0.3,
          }}
          transition={{
            opacity: { duration: 0.3 }
          }}
        />
      )}
      
      {/* Edge highlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          opacity: isHovering ? 1 : 0.3,
        }}
      />
    </motion.div>
  );
};

export default InteractiveTiltCard;
