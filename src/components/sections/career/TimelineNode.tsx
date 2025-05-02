
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TimelineItem } from '@/data/timelineData';

interface TimelineNodeProps {
  item: TimelineItem;
  isEven: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ item, isEven }) => {
  const getIconComponent = () => {
    if (item.iconType === "briefcase") {
      return <Briefcase className="h-5 w-5" />;
    } else if (item.iconType === "graduation-cap") {
      return <GraduationCap className="h-5 w-5" />;
    }
    return null;
  };

  return (
    <>
      {/* Timeline Node */}
      <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1 z-10">
        <motion.div 
          className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-lg"
          whileHover={{ scale: 1.2 }}
        >
          <span className="text-accent">{getIconComponent()}</span>
        </motion.div>
      </div>
      
      {/* Year on opposite side for larger screens */}
      <div className={cn(
        "hidden sm:block sm:w-1/2 relative",
        isEven ? "sm:text-right" : "sm:text-left"
      )}>
        <motion.div 
          className="absolute top-0 px-4 py-2"
          style={{ 
            [isEven ? 'right' : 'left']: '0',
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
    </>
  );
};

export default TimelineNode;
