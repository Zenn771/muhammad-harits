
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Skill } from '@/data/skills';
import MobileSkillCard from './MobileSkillCard';

interface MobileSkillsCarouselProps {
  category: string;
  skills: Skill[];
  activeCategory: string;
}

const MobileSkillsCarousel: React.FC<MobileSkillsCarouselProps> = ({ 
  category, 
  skills,
  activeCategory
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  
  const filteredSkills = skills.filter(skill => skill.category === category);
  
  const checkScrollPosition = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Use passive event listener for better scroll performance
    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition(); // Initial check
    
    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
    };
  }, [activeCategory]);
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of visible width
    
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };
  
  // Touch handling for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    
    // Swipe threshold
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && canScrollRight) {
        handleScroll('right');
      } else if (deltaX < 0 && canScrollLeft) {
        handleScroll('left');
      }
    }
  };
  
  if (category !== activeCategory) return null;

  // Get the display title based on category
  const getCategoryTitle = () => {
    switch(category) {
      case 'ai':
        return 'AI & Machine Learning';
      case 'web':
        return 'Web Development';
      case 'electrical':
        return 'Electrical Engineering';
      default:
        return category;
    }
  };
  
  return (
    <div className="relative px-1 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          {getCategoryTitle()}
        </h3>
        
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 disabled:text-white/20 disabled:bg-white/5 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 disabled:text-white/20 disabled:bg-white/5 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform' // Hardware acceleration
        }}
        onScroll={checkScrollPosition}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fix: Changed from flex layout to grid layout with fixed width columns */}
        <div className="inline-flex gap-4 pb-4 will-change-transform" style={{ minWidth: 'max-content' }}>
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="flex-shrink-0 w-[140px] snap-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: idx * 0.05,
                ease: "easeOut"
              }}
              style={{ 
                contain: 'content',
                willChange: 'transform, opacity',
                flexShrink: 0, // Ensure cards don't shrink
                flexGrow: 0, // Ensure cards don't grow
                width: "140px" // Fixed width to prevent layout shifts
              }}
            >
              <MobileSkillCard skill={skill} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicators */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {canScrollLeft && <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>}
        <div className="h-1.5 w-3 rounded-full bg-white/40"></div>
        {canScrollRight && <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>}
      </div>
    </div>
  );
};

export default MobileSkillsCarousel;
