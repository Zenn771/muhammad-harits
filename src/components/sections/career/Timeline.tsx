
import React from 'react';
import { TimelineItem as TimelineItemType } from '@/data/timelineData';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  items: TimelineItemType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div 
        className="absolute left-4 sm:left-1/2 sm:-ml-0.5 w-1 bg-white/10 h-full"
        style={{ 
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
        }}
      ></div>
      
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
