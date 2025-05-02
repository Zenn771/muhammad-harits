
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
  highlightClassName = "text-accent",
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
            className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
            animate={{ y: isHighlighted ? [-2, 2, -2] : 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.05 % 0.5 // Staggered delay based on character position
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
