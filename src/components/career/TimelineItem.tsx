import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineItem as TimelineItemType } from '@/data/timelineData';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  scrollY: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, scrollY }) => {
  const isEven = index % 2 === 0;
  
  // Render the appropriate icon based on the iconType
  const renderIcon = () => {
    switch(item.iconType) {
      case "briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "graduation-cap":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "relative",
        isEven ? "sm:pr-8 sm:pl-0" : "sm:pl-8 sm:pr-0"
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div 
        className={cn(
          "flex flex-col sm:items-center sm:flex-row sm:gap-8",
          isEven ? "sm:flex-row" : "sm:flex-row-reverse"
        )}
      >
        {/* Timeline Node */}
        <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1 z-10">
          <motion.div 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-lg"
            whileHover={{ scale: 1.2 }}
            style={{ 
              transform: `translateY(${scrollY * 0.03 * (index + 1)}px)` 
            }}
          >
            <span className="text-accent">{renderIcon()}</span>
          </motion.div>
        </div>
        
        {/* Timeline Card */}
        <motion.div 
          className={cn(
            "relative flex-1 ml-12 sm:ml-0",
            isEven ? "sm:text-right" : "sm:text-left"
          )}
          whileHover={{ translateY: -5 }}
          style={{ 
            perspective: '1000px',
            transform: `translateY(${scrollY * 0.02 * (index % 3)}px)` 
          }}
        >
          <div 
            className="vintage-card p-6 md:p-8 rounded-xl bg-gradient-to-br border border-white/10 backdrop-blur-sm shadow-xl relative"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgba(29, 78, 216, 0.15)")}, ${item.color.split(" ")[1].replace("to-", "rgba(8, 47, 73, 0.05)")})`
            }}
          >
            {/* Content */}
            <div className="absolute inset-0 grain-effect-subtle rounded-xl"></div>
            <div className="flex items-center mb-3 gap-2">
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.year}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
                {item.type === "work" ? "Work" : "Education"}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.role}</h3>
            <p className="text-white/80 font-medium mb-4">{item.company}</p>
            
            {/* Simple paragraph instead of animated text */}
            <p className="text-white/70 text-sm md:text-base mb-6">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="vintage-skill px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white/60"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <motion.div
              className="absolute bottom-5 right-5 opacity-30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 border border-white/5 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Year on opposite side for larger screens */}
        <div className={cn(
          "hidden sm:block sm:w-1/2 relative",
          isEven ? "sm:text-right" : "sm:text-left"
        )}>
          <motion.div 
            className="absolute top-0 px-4 py-2"
            style={{ 
              [isEven ? 'right' : 'left']: '0',
              transform: `translateY(${scrollY * 0.04 * (index % 2 + 1)}px)` 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="vintage-text text-white/40 text-sm">
              {item.type === "work" 
                ? <Briefcase className="h-3 w-3 inline mr-1" />
                : <GraduationCap className="h-3 w-3 inline mr-1" />
              }
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
