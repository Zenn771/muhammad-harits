
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  className?: string;
  size?: number;
  intensity?: number;
  color?: string;
  colorVariations?: boolean;
  pulseEffect?: boolean;
}

const EnhancedSpotlightEffect: React.FC<SpotlightProps> = ({
  className = "",
  size = 600,
  intensity = 0.2,
  color = "250, 204, 21", // Amber color (RGB values)
  colorVariations = true,
  pulseEffect = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });
  const [currentColor, setCurrentColor] = useState(color);
  const [currentIntensity, setCurrentIntensity] = useState(intensity);
  
  // Color variations for dynamic spotlight effect
  const colorPalette = [
    "250, 204, 21", // Amber (default)
    "245, 158, 11", // Amber-orange
    "234, 88, 12",  // Burnt orange
    "217, 70, 239", // Purple (subtle variation)
    "79, 70, 229"   // Indigo (subtle variation)
  ];
  
  // Throttle function to limit mouse move event handling
  const throttle = <T extends (...args: any[]) => any>(
    func: T, 
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;
    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // Subtle color cycling effect
  useEffect(() => {
    if (!colorVariations) return;
    
    const interval = setInterval(() => {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      setCurrentColor(randomColor);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [colorVariations]);
  
  // Subtle intensity pulsing effect
  useEffect(() => {
    if (!pulseEffect) return;
    
    const interval = setInterval(() => {
      const pulseFactor = 0.05;
      const baseIntensity = intensity;
      const newIntensity = baseIntensity + (Math.random() * pulseFactor - pulseFactor/2);
      setCurrentIntensity(newIntensity);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [intensity, pulseEffect]);
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Throttled mouse move handler for better performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    }, 20); // Update at most every 20ms
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Initialize spotlight in center if no mouse movement yet
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      setMousePosition({
        x: windowDimensions.width / 2,
        y: windowDimensions.height / 2
      });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary spotlight */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          left: mousePosition.x - size / 2,
          top: mousePosition.y - size / 2,
          width: size,
          height: size,
          background: `radial-gradient(circle at center, rgba(${currentColor}, ${currentIntensity}) 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 30,
          background: { duration: 1.5 } 
        }}
        style={{ willChange: 'left, top' }}
      />
      
      {/* Secondary spotlight (smaller and more intense) */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          left: mousePosition.x - size / 4,
          top: mousePosition.y - size / 4,
          width: size / 2,
          height: size / 2,
          background: `radial-gradient(circle at center, rgba(${currentColor}, ${currentIntensity * 1.5}) 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 25,
          background: { duration: 1.5 }
        }}
        style={{ willChange: 'left, top' }}
      />

      {/* Tertiary spotlight (smaller and follows with delay for trail effect) */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          left: mousePosition.x - size / 6,
          top: mousePosition.y - size / 6,
          width: size / 3,
          height: size / 3,
          background: `radial-gradient(circle at center, rgba(${currentColor}, ${currentIntensity * 0.8}) 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 40,
          delay: 0.1,
          background: { duration: 1.5 }
        }}
        style={{ willChange: 'left, top' }}
      />
      
      {/* Ambient glow that stays relatively fixed */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.5,
          background: `radial-gradient(circle at ${mousePosition.x / windowDimensions.width * 100}% ${mousePosition.y / windowDimensions.height * 100}%, rgba(${currentColor}, 0.03) 0%, rgba(0,0,0,0) 70%)`,
        }}
        style={{ 
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          transition: 'background 2s ease',
          willChange: 'background' 
        }}
      />
    </div>
  );
};

export default EnhancedSpotlightEffect;
