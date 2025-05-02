
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCharactersProps {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightIndices?: number[];
}

const FloatingCharacters: React.FC<FloatingCharactersProps> = ({ 
  text, 
  className = "", 
  highlightClassName = "text-amber-300",
  highlightIndices = []
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
        
        return (
          <motion.span
            key={index}
            className={`inline-block ${isHighlighted ? highlightClassName : ""}`}
            animate={{
              y: [0, -3, 0],
              transition: {
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }
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
