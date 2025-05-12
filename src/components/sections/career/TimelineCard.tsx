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
  // Define hover animations
  const cardVariants = {
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 10 
      } 
    }
  };

  // Define transition for staggered elements
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.2 + (custom * 0.1),
        ease: 'easeOut'
      }
    })
  };

  // Determine the icon based on item type
  const TypeIcon = item.type === "work" ? Briefcase : GraduationCap;

  return (
    <motion.div 
      className={cn(
        "relative flex-1 ml-12 sm:ml-0",
        "sm:text-left"
      )}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      // Add proper hover cursor and accessibility attributes
      style={{ cursor: 'default' }}
      aria-labelledby={`timeline-item-${item.id}-title`}
      role="article"
    >
      <div className="vintage-card rounded-xl overflow-hidden shadow-xl will-change-transform">
        {/* Enhanced glowing border effect with subtle pulsing */}
        <motion.div 
          className="absolute inset-0 rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] -z-10"
          animate={{ 
            boxShadow: ["0 0 15px rgba(255,255,255,0.03)", "0 0 15px rgba(255,255,255,0.08)", "0 0 15px rgba(255,255,255,0.03)"]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Enhanced title bar with better contrast */}
        <div className="bg-gradient-to-r from-gray-800/95 to-gray-700/85 px-4 py-3 flex items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(250,204,21,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
          </div>
          <div className="flex-grow text-center text-xs text-white/90 font-medium">
            {item.year} · {item.type === "work" ? "Work Experience" : "Education"}
          </div>
        </div>
        
        {/* Card content with improved visual styling */}
        <div 
          className="p-6 md:p-8 bg-gradient-to-br border-t-0 border border-white/10 backdrop-blur-sm"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgba(29, 78, 216, 0.15)")}, ${item.color.split(" ")[1].replace("to-", "rgba(8, 47, 73, 0.05)")})`
          }}
        >
          {/* Enhanced grain effect */}
          <div className="absolute inset-0 grain-effect-subtle rounded-xl opacity-[0.15] mix-blend-overlay"></div>
          
          {/* Top metadata with improved layout */}
          <motion.div 
            className="flex items-center mb-4 gap-2"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
          >
            {/* Year badge with improved visualization */}
            <div className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white shadow-inner shadow-white/5">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.year}
              </span>
            </div>
            
            {/* Type badge with icon */}
            <div className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white shadow-inner shadow-white/5">
              <span className="flex items-center">
                <TypeIcon className="h-3 w-3 mr-1" />
                {item.type === "work" ? "Work" : "Education"}
              </span>
            </div>
          </motion.div>
          
          {/* Role title with simple display instead of text reveal animation */}
          <motion.h3 
            id={`timeline-item-${item.id}-title`}
            className="text-xl md:text-2xl font-bold text-white mb-2"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={1}
          >
            {item.role}
          </motion.h3>
          
          {/* Company with enhanced styling */}
          <motion.p 
            className="text-white/80 font-medium mb-4 flex items-center gap-1"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={2}
          >
            {item.company}
          </motion.p>
          
          {/* Description with standard text instead of animated words */}
          <motion.p
            className="text-white/75 text-sm md:text-base mb-6 leading-relaxed"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={3}
          >
            {item.description}
          </motion.p>
          
          {/* Skills with enhanced visual style and staggered animation */}
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={3}
          >
            {item.skills.map((skill, i) => (
              <motion.span 
                key={i}
                className="vintage-skill px-3 py-1.5 bg-white/8 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 border border-white/10 shadow-inner shadow-white/5 transition-all duration-300 hover:text-white hover:bg-white/15 hover:shadow-white/10 hover:text-shine"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Decorative rotating circle with improved visual design */}
          <motion.div
            className="absolute bottom-5 right-5 opacity-20 pointer-events-none z-0 will-change-transform"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="w-20 h-20 border border-white/10 rounded-full"
              animate={{ 
                boxShadow: ["0 0 10px rgba(255,255,255,0.05)", "0 0 20px rgba(255,255,255,0.1)", "0 0 10px rgba(255,255,255,0.05)"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
        
        {/* Enhanced reflective bottom bar */}
        <div className="h-2 w-full bg-gradient-to-b from-gray-800/80 to-gray-900/50"></div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;