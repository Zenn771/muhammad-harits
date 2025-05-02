
import React from 'react';
import TimelineItem from './TimelineItem';
import { TimelineItem as TimelineItemType } from '@/data/timelineData';

interface TimelineProps {
  data: TimelineItemType[];
  scrollY: number;
  timelineRef: React.RefObject<HTMLDivElement>;
}

const Timeline: React.FC<TimelineProps> = ({ data, scrollY, timelineRef }) => {
  return (
    <div className="relative" ref={timelineRef}>
      {/* Vertical line */}
      <div 
        className="absolute left-4 sm:left-1/2 sm:-ml-0.5 w-1 bg-white/10 h-full"
        style={{ 
          transform: `translateY(${scrollY * 0.01}px)`,
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
        }}
      ></div>
      
      <div className="space-y-16 relative">
        {data.map((item, index) => (
          <TimelineItem 
            key={item.id}
            item={item} 
            index={index} 
            scrollY={scrollY}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
