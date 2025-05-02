
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { skills } from "@/data/skills.tsx";
import SkillCategory from "./skills/SkillCategory";
import MobileSkillsCarousel from "./skills/MobileSkillsCarousel";

const SkillsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<"ai" | "electrical" | "web">("ai");

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-black relative">
      <div className="absolute inset-0 z-0">
        {/* Enhanced grid pattern with more visible texture */}
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        
        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-amber-900/20 blur-[100px] pointer-events-none" />
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.p
            className="text-sm uppercase tracking-widest text-amber-200 font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Expertise
          </motion.p>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Skills & Tools
          </motion.h2>

          <motion.p
            className="text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My technical proficiencies in AI, Web Development, and Electrical Engineering
          </motion.p>
        </div>

        {/* Mobile category tabs */}
        {isMobile && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-full">
              <button
                onClick={() => setActiveCategory("ai")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  activeCategory === "ai" 
                    ? "bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                )}
              >
                AI & ML
              </button>
              <button
                onClick={() => setActiveCategory("web")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  activeCategory === "web" 
                    ? "bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                )}
              >
                Web Dev
              </button>
              <button
                onClick={() => setActiveCategory("electrical")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  activeCategory === "electrical" 
                    ? "bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                )}
              >
                Electrical
              </button>
            </div>
          </div>
        )}

        {/* Skills container - different for mobile vs desktop */}
        {isMobile ? (
          // Mobile horizontal scrolling carousel view
          <div className="w-full">
            <MobileSkillsCarousel
              category="ai"
              skills={skills}
              activeCategory={activeCategory}
            />

            <MobileSkillsCarousel
              category="web"
              skills={skills}
              activeCategory={activeCategory}
            />

            <MobileSkillsCarousel
              category="electrical"
              skills={skills}
              activeCategory={activeCategory}
            />
          </div>
        ) : (
          // Desktop grid layout
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* AI Skills */}
            <SkillCategory 
              title="AI & Machine Learning" 
              skills={skills.filter(skill => skill.category === "ai")} 
            />
            
            {/* Web Development Skills */}
            <SkillCategory 
              title="Web Development" 
              skills={skills.filter(skill => skill.category === "web")} 
            />
            
            {/* Electrical Engineering Skills */}
            <SkillCategory 
              title="Electrical Engineering" 
              skills={skills.filter(skill => skill.category === "electrical")} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
