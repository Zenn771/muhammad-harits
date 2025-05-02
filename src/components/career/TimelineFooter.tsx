
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const TimelineFooter: React.FC = () => {
  return (
    <motion.div 
      className="mt-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <p className="text-white/60 mb-8 max-w-2xl mx-auto">
        This journey represents my growth and expertise in electrical engineering, AI research, and system development. Each role has shaped my approach to solving complex problems and creating innovative solutions.
      </p>
      <div className="flex justify-center">
        <a 
          href="#works" 
          className="flex items-center gap-2 text-accent hover:text-white transition-colors duration-300"
        >
          <span>View My Projects</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default TimelineFooter;
