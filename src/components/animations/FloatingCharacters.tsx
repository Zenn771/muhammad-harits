
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCharactersProps {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightIndices?: number[];
  animationIntensity?: number;
  staggerDelay?: number;
  initiallyVisible?: boolean;
}

const FloatingCharacters: React.FC<FloatingCharactersProps> = ({ 
  text, 
  className = "", 
  highlightClassName = "text-amber-300",
  highlightIndices = [],
  animationIntensity = 1,
  staggerDelay = 0.03,
  initiallyVisible = true
}) => {
  const characters = text.split('');
  
  return (
    <span className={className}>
      {characters.map((char, index) => {
        const isHighlighted = highlightIndices.includes(index);
        
        // Skip animating spaces
        if (char === ' ') {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }
        
        // Optimize animation by reducing the need for unique animations
        // Group characters into animation patterns based on their index
        const animationGroup = index % 4;
        
        // Pre-calculated animation parameters for improved performance
        const animationParams = {
          0: {
            y: [0, -3 * animationIntensity, 0],
            duration: 1.5,
            delay: 0.2,
          },
          1: {
            y: [0, -2 * animationIntensity, 0],
            duration: 2.3,
            delay: 0.5,
          },
          2: {
            y: [0, -2.5 * animationIntensity, 0],
            duration: 1.8,
            delay: 0.8,
          },
          3: {
            y: [0, -3.5 * animationIntensity, 0],
            duration: 2.1,
            delay: 0.3,
          },
        }[animationGroup];
        
        return (
          <motion.span
            key={index}
            className={`inline-block ${isHighlighted ? highlightClassName : ""}`}
            initial={initiallyVisible ? {} : { opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: initiallyVisible ? 0 : index * staggerDelay
              }
            }}
            transition={{
              opacity: { duration: initiallyVisible ? 0 : 0.1 },
              y: { duration: initiallyVisible ? 0 : 0.2 }
            }}
          >
            <motion.span
              animate={{
                y: animationParams.y,
              }}
              transition={{
                duration: animationParams.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: animationParams.delay,
                // Optimize animations by using GPU acceleration
                willChange: "transform", 
              }}
              style={{ 
                display: 'inline-block', 
                willChange: 'transform', 
              }}
            >
              {char}
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
};

export default FloatingCharacters;
