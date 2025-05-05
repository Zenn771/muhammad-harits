
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressIndicatorProps {
  className?: string;
  color?: string;
  height?: number;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  className,
  color = "bg-gradient-to-r from-amber-400 to-blue-600",
  height = 3
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Determine if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount and window resize
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 origin-left z-50",
        color,
        className
      )}
      style={{ 
        scaleX, 
        height, 
        position: "fixed",
        top: isMobile ? "0px" : "0px",
      }}
    />
  );
};

export default ScrollProgressIndicator;
