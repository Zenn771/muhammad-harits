
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedWords from '@/components/animations/AnimatedWords';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  // Letter animation for the title
  const letters = Array.from(title);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <motion.h2 
        className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-gray-100 vintage-text"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
      
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <AnimatedWords 
          text={subtitle}
          className="text-lg text-gray-300/90"
          delay={0.3}
        />
      </div>
    </>
  );
};

export default SectionTitle;
