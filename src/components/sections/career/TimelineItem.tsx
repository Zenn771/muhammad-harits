
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { TimelineItem as TimelineItemType } from '@/data/timelineData';
import TimelineCard from './TimelineCard';
import TimelineNode from './TimelineNode';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
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
        <TimelineNode item={item} isEven={isEven} />
        <TimelineCard item={item} isEven={isEven} />
      </div>
    </motion.div>
  );
};

export default TimelineItem;
