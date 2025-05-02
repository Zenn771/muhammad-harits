
import React, { useRef } from "react";
import { Skill } from "@/data/skills.tsx"; // Updated import with correct extension
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileSkillCard from "./MobileSkillCard";

interface MobileSkillsCarouselProps {
  category: "ai" | "electrical";
  skills: Skill[];
  activeCategory: "ai" | "electrical";
}

const MobileSkillsCarousel: React.FC<MobileSkillsCarouselProps> = ({
  category,
  skills,
  activeCategory,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll controls for horizontal carousel on mobile
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = 200; // Amount to scroll in pixels
    const currentScroll = carouselRef.current.scrollLeft;
    
    carouselRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className={`mb-8 ${activeCategory !== category ? "hidden" : ""}`}>
      <div className="relative">
        {/* Carousel navigation buttons */}
        <button 
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
        >
          <ChevronLeft className="h-5 w-5 text-white/80" />
        </button>
        
        <button 
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
        >
          <ChevronRight className="h-5 w-5 text-white/80" />
        </button>
        
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {skills
            .filter(skill => skill.category === category)
            .map((skill, index) => (
              <MobileSkillCard key={`${category}-${skill.name}`} skill={skill} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSkillsCarousel;
