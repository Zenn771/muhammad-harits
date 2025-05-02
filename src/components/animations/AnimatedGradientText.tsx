
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  duration?: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className = "",
  from = "from-amber-200",
  via = "via-yellow-400",
  to = "to-amber-200",
  duration = 4
}) => {
  return (
    <motion.span
      className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${from} ${via} ${to} ${className}`}
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedGradientText;
