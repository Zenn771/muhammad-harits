
import React from 'react';
import { motion } from 'framer-motion';

const TimelineHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 vintage-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Career Timeline
      </motion.h1>
      <motion.p 
        className="mt-4 text-xl text-white/60 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        A journey through my professional experiences and academic achievements
      </motion.p>
    </div>
  );
};

export default TimelineHeader;
