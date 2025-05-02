
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
        
        // Don't add any animations or highlight classes in this component
        // Just render the characters normally
        return (
          <span
            key={index}
            className="inline-block"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default FloatingCharacters;
