
import React from 'react';
import { TimelineItem as TimelineItemType } from '@/data/timelineData';
import TimelineItem from './TimelineItem';
import { motion } from 'framer-motion';

interface TimelineProps {
  items: TimelineItemType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Enhanced vertical line with glow effect */}
      <motion.div 
        className="absolute left-4 sm:left-1/2 sm:-ml-0.5 w-1 bg-gradient-to-b from-blue-500/20 via-white/10 to-amber-500/20 h-full"
        style={{ 
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.15)'
        }}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "100%", opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      
      {/* Glowing dots along the timeline */}
      {[0.2, 0.4, 0.6, 0.8].map((position, i) => (
        <motion.div 
          key={i}
          className="absolute left-4 sm:left-1/2 sm:-ml-1 w-2 h-2 rounded-full bg-white/50"
          style={{ 
            top: `${position * 100}%`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.2 }}
          viewport={{ once: true }}
        />
      ))}
      
      <div className="space-y-16 relative">
        {items.map((item, index) => (
          <TimelineItem 
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
