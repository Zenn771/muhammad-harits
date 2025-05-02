
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineBackgroundProps {
  scrollY: number;
}

const TimelineBackground: React.FC<TimelineBackgroundProps> = ({ scrollY }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for enhanced interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events for better performance
      if (!handleMouseMove.timeout) {
        handleMouseMove.timeout = setTimeout(() => {
          setMousePosition({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
          });
          handleMouseMove.timeout = null;
        }, 50);
      }
    };
    
    // Add type to the function to allow the timeout property
    (handleMouseMove as any).timeout = null;
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout((handleMouseMove as any).timeout);
    };
  }, []);
  
  // Calculate dynamic parallax offsets based on mouse position and scroll
  const gridOffset = {
    x: scrollY * 0.05 + (mousePosition.x - 0.5) * 20,
    y: scrollY * 0.05 + (mousePosition.y - 0.5) * 20
  };
  
  const gradientOffset = {
    x: (mousePosition.x - 0.5) * 30,
    y: (mousePosition.y - 0.5) * 30 + scrollY * 0.02
  };
  
  return (
    <>
      {/* Enhanced radial gradient with subtle animation */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0" 
        animate={{
          background: [
            `radial-gradient(circle at ${50 + (mousePosition.x - 0.5) * 10}% ${50 + (mousePosition.y - 0.5) * 10}%, rgba(29, 78, 216, 0.15) 0%, transparent 80%)`,
            `radial-gradient(circle at ${55 + (mousePosition.x - 0.5) * 10}% ${45 + (mousePosition.y - 0.5) * 10}%, rgba(29, 78, 216, 0.15) 0%, transparent 80%)`,
            `radial-gradient(circle at ${50 + (mousePosition.x - 0.5) * 10}% ${50 + (mousePosition.y - 0.5) * 10}%, rgba(29, 78, 216, 0.15) 0%, transparent 80%)`
          ]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          transform: `translate(${gradientOffset.x}px, ${gradientOffset.y}px)`,
        }}
      />
      
      {/* Enhanced grid pattern with responsive movement */}
      <div 
        className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #4338ca11 1px, transparent 1px), linear-gradient(to bottom, #4338ca11 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`,
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />
      
      {/* Improved grain texture */}
      <div className="fixed inset-0 grain-texture opacity-20 pointer-events-none z-0">
        {/* Subtle animated noise overlay */}
        <motion.div
          className="absolute inset-0 bg-black/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Subtle accent glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + (mousePosition.x - 0.5) * 30}% ${50 + (mousePosition.y - 0.5) * 30}%, rgba(250, 204, 21, 0.1) 0%, transparent 60%)`,
          transform: `translateY(${scrollY * 0.03}px)`,
          transition: 'background 0.8s ease'
        }}
      />
    </>
  );
};

export default TimelineBackground;
