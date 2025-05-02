
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCharactersProps {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightIndices?: number[];
  animationIntensity?: number;
}

const FloatingCharacters: React.FC<FloatingCharactersProps> = ({ 
  text, 
  className = "", 
  highlightClassName = "text-amber-300",
  highlightIndices = [],
  animationIntensity = 1
}) => {
  const characters = text.split('');
  
  // Pre-calculated animation patterns to improve rendering performance
  const animationPatterns = [
    {
      y: [0, -3 * animationIntensity, 0],
      duration: 1.5,
      delay: 0.2,
    },
    {
      y: [0, -2 * animationIntensity, 0],
      duration: 2.3,
      delay: 0.5,
    },
    {
      y: [0, -2.5 * animationIntensity, 0],
      duration: 1.8,
      delay: 0.8,
    },
    {
      y: [0, -3.5 * animationIntensity, 0],
      duration: 2.1,
      delay: 0.3,
    }
  ];
  
  return (
    <span className={className}>
      {characters.map((char, index) => {
        // Skip animating spaces
        if (char === ' ') {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }
        
        const isHighlighted = highlightIndices.includes(index);
        const pattern = animationPatterns[index % 4];
        
        return (
          <motion.span
            key={index}
            className={`inline-block ${isHighlighted ? highlightClassName : ""}`}
            animate={{ y: pattern.y }}
            transition={{
              duration: pattern.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: pattern.delay,
            }}
            style={{ 
              display: 'inline-block', 
              willChange: 'transform', 
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
};

export default FloatingCharacters;
