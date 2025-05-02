
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedWordsProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const AnimatedWords: React.FC<AnimatedWordsProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.05, 
  className = '', 
  once = true 
}) => {
  // Split the text into words
  const words = text.split(' ');
  
  // Animation variants for each word
  const container = {
    hidden: {},
    visible: (i = 1) => ({
      transition: { staggerChildren: duration, delayChildren: delay * i }
    })
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1 last:mr-0"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedWords;
