
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TimelineItem } from '@/data/timelineData';

interface TimelineCardProps {
  item: TimelineItem;
  isEven: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isEven }) => {
  return (
    <motion.div 
      className={cn(
        "relative flex-1 ml-12 sm:ml-0",
        isEven ? "sm:text-right" : "sm:text-left"
      )}
      whileHover={{ translateY: -5 }}
    >
      <div className="vintage-card rounded-xl overflow-hidden shadow-xl">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] -z-10"></div>
        
        {/* Enhanced title bar */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/80 px-4 py-3 flex items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(250,204,21,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
          </div>
          <div className="flex-grow text-center text-xs text-white/80 font-medium">
            {item.year} · {item.type === "work" ? "Work Experience" : "Education"}
          </div>
        </div>
        
        {/* Card content with styled border */}
        <div 
          className="p-6 md:p-8 bg-gradient-to-br border-t-0 border border-white/10 backdrop-blur-sm"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgba(29, 78, 216, 0.15)")}, ${item.color.split(" ")[1].replace("to-", "rgba(8, 47, 73, 0.05)")})`
          }}
        >
          {/* Content */}
          <div className="absolute inset-0 grain-effect-subtle rounded-xl"></div>
          
          <motion.div 
            className="flex items-center mb-4 gap-2"
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.year}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
              {item.type === "work" ? "Work" : "Education"}
            </div>
          </motion.div>
          
          <motion.h3 
            className="text-xl md:text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {item.role}
          </motion.h3>
          
          <motion.p 
            className="text-white/80 font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {item.company}
          </motion.p>
          
          <motion.p 
            className="text-white/70 text-sm md:text-base mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {item.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {item.skills.map((skill, i) => (
              <motion.span 
                key={i}
                className="vintage-skill px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            className="absolute bottom-5 right-5 opacity-30 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border border-white/5 rounded-full"></div>
          </motion.div>
        </div>
        
        {/* Reflective bottom bar */}
        <div className="h-2 w-full bg-gradient-to-b from-gray-800/80 to-gray-900/50"></div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
