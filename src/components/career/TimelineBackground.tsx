
import React from 'react';

interface TimelineBackgroundProps {
  scrollY: number;
}

const TimelineBackground: React.FC<TimelineBackgroundProps> = ({ scrollY }) => {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.10) 0%, transparent 80%)', // Reduced opacity
          // Removed transform to prevent the background from moving with scroll
        }}
      />
      <div 
        className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #4338ca11 1px, transparent 1px), linear-gradient(to bottom, #4338ca11 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          // Removed transform to prevent the background from moving with scroll
        }}
      />
      <div className="fixed inset-0 grain-texture opacity-20 pointer-events-none z-0"></div>
    </>
  );
};

export default TimelineBackground;
