
import React from 'react';
import { motion } from 'framer-motion';

interface GradientBackdropProps {
  className?: string;
  opacity?: number;
}

const GradientBackdrop: React.FC<GradientBackdropProps> = ({ 
  className = '', 
  opacity = 0.35 // Increased from 0.2 to 0.35 for more radiance
}) => {
  return (
    <motion.div 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: opacity }} // Start with the desired opacity immediately
      animate={{ opacity: opacity }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ 
          background: 'radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)' // Enhanced yellow light
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)', // Enhanced yellow light
            'radial-gradient(circle at 80% 20%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 80% 80%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 20% 80%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
          ]
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Enhanced gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-amber-900/20 to-transparent" />
      
      {/* Enhanced gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-purple-900/20 to-transparent" />
    </motion.div>
  );
};

export default GradientBackdrop;
