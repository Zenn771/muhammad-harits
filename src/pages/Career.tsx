
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/Navbar";
import { careerData } from '@/data/timelineData';
import TimelineBackground from '@/components/career/TimelineBackground';
import TimelineHeader from '@/components/career/TimelineHeader';
import TimelineFooter from '@/components/career/TimelineFooter';
import TimelineItem from '@/components/career/TimelineItem';

const Career: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Background elements with parallax effect */}
      <TimelineBackground scrollY={scrollY} />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar activeSection="career" scrollBased={true} className="sticky top-0 z-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <TimelineHeader />
          
          {/* Timeline */}
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
              {careerData.map((item, index) => (
                <TimelineItem 
                  key={item.id}
                  item={item} 
                  index={index} 
                  scrollY={scrollY}
                />
              ))}
            </div>
          </div>
          
          {/* Bottom section */}
          <TimelineFooter />
        </div>
      </div>
    </div>
  );
};

export default Career;
