
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TimelineFooter: React.FC = () => {
  return (
    <motion.div 
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <a 
        href="#works" 
        className="flex items-center justify-center gap-2 text-accent hover:text-white transition-colors duration-300"
      >
        <span>View My Projects</span>
        <ChevronDown className="h-4 w-4" />
      </a>
    </motion.div>
  );
};

export default TimelineFooter;
