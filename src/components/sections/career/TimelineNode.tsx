
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from "lucide-react";
import { TimelineItem } from '@/data/timelineData';

interface TimelineNodeProps {
  item: TimelineItem;
  isEven: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ item, isEven }) => {
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
    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1 z-10">
      <motion.div 
        className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="text-accent">{renderIcon()}</span>
      </motion.div>
    </div>
  );
};

export default TimelineNode;
