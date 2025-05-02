
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Circle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TimelineItem } from '@/data/timelineData';

interface TimelineCardProps {
  item: TimelineItem;
  isEven: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isEven }) => {
  const getIconComponent = () => {
    if (item.iconType === "briefcase") {
      return <Briefcase className="h-5 w-5" />;
    } else if (item.iconType === "graduation-cap") {
      return <GraduationCap className="h-5 w-5" />;
    }
    return <Circle className="h-5 w-5" />;
  };

  return (
    <motion.div 
      className={cn(
        "relative flex-1 ml-12 sm:ml-0",
        isEven ? "sm:text-right" : "sm:text-left"
      )}
      whileHover={{ translateY: -5 }}
    >
      <div className="vintage-card rounded-xl overflow-hidden shadow-xl">
        {/* Macbook-like title bar */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow text-center text-xs text-gray-400 font-medium">
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
        
        {/* Bottom bar for macbook-like design */}
        <div className="bg-gray-800/80 h-2 w-full"></div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
