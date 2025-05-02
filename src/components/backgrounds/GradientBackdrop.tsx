
import React from 'react';
import { motion } from 'framer-motion';

interface GradientBackdropProps {
  className?: string;
  opacity?: number;
  intensity?: number;
}

const GradientBackdrop: React.FC<GradientBackdropProps> = ({ 
  className = '', 
  opacity = 0.2,
  intensity = 1
}) => {
  // Create more complex and dynamic movement for the gradients
  const primaryGradientVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 20% 20%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 50% 30%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 80% 20%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 80% 50%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 80% 80%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 50% 80%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 20% 80%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 20% 50%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-gradient(circle at 20% 20%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
      ]
    }
  };
  
  const secondaryGradientVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 80% 30%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        'radial-gradient(circle at 70% 60%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        'radial-gradient(circle at 30% 70%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        'radial-gradient(circle at 20% 40%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        'radial-gradient(circle at 40% 20%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        'radial-gradient(circle at 80% 30%, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
      ]
    }
  };

  // NEW: Additional accent gradient with different timing
  const accentGradientVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 30% 40%, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 60%)',
        'radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 60%)',
        'radial-gradient(circle at 60% 70%, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 60%)',
        'radial-gradient(circle at 30% 40%, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 60%)',
      ]
    }
  };
  
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
          background: 'radial-gradient(circle at 20% 20%, rgba(30, 15, 60, 0.4) 0%, rgba(0, 0, 0, 0) 70%)' 
        }}
        variants={primaryGradientVariants}
        animate="animate"
        transition={{
          duration: 40 * (2 - intensity), // Adjust speed based on intensity
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Secondary subtle gradient accents with improved motion */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        variants={secondaryGradientVariants}
        animate="animate"
        transition={{
          duration: 20 * (2 - intensity),
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* NEW: Tertiary accent gradient with different timing */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        variants={accentGradientVariants}
        animate="animate"
        transition={{
          duration: 15 * (2 - intensity),
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Subtle gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-amber-900/10 to-transparent" />
      
      {/* Subtle gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-purple-900/10 to-transparent" />
    </motion.div>
  );
};

export default GradientBackdrop;
