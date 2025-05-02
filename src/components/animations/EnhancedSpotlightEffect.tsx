
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  className?: string;
  size?: number;
  intensity?: number;
  color?: string;
}

const EnhancedSpotlightEffect: React.FC<SpotlightProps> = ({
  className = "",
  size = 600,
  intensity = 0.2,
  color = "250, 204, 21" // Amber color (RGB values)
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });
  
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
          background: `radial-gradient(circle at center, rgba(${color}, ${intensity}) 0%, rgba(0,0,0,0) 70%)`,
          transition: { type: 'spring', stiffness: 400, damping: 30 }
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
          background: `radial-gradient(circle at center, rgba(${color}, ${intensity * 1.5}) 0%, rgba(0,0,0,0) 70%)`,
          transition: { type: 'spring', stiffness: 500, damping: 25 }
        }}
        style={{ willChange: 'left, top' }}
      />
    </div>
  );
};

export default EnhancedSpotlightEffect;
