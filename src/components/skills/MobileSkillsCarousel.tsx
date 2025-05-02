
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skill } from "@/data/skills";

interface MobileSkillsCarouselProps {
  category: "ai" | "web" | "electrical";
  skills: Skill[];
  activeCategory: string;
}

const MobileSkillsCarousel: React.FC<MobileSkillsCarouselProps> = ({
  category,
  skills,
  activeCategory,
}) => {
  const categorySkills = skills.filter((skill) => skill.category === category);

  return (
    <div
      className={cn(
        "overflow-x-auto scrollbar-none pb-6 transition-all duration-500", // Reduced bottom padding from pb-10 to pb-6
        activeCategory === category ? "block" : "hidden"
      )}
    >
      <motion.div 
        className="flex space-x-3 px-4 pt-4" // Reduced horizontal spacing from space-x-4 to space-x-3 and top padding from pt-6 to pt-4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categorySkills.map((skill) => (
          <motion.div
            key={skill.name}
            className="flex-shrink-0 w-[130px] vintage-card p-3 rounded-lg bg-gradient-to-br from-blue-900/10 to-purple-900/5 border border-white/10 backdrop-blur-sm" // Reduced width from 140px to 130px and padding from p-5 to p-3
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10 flex flex-col items-center">
              {/* Icon container with glowing effect matching desktop version - reduced size */}
              <div className="relative mb-2"> {/* Reduced margin from mb-4 to mb-2 */}
                {/* Outer glow effect */}
                <motion.div 
                  className={cn(
                    "absolute inset-0 rounded-full -z-10 blur-md opacity-50",
                    skill.color === "amber" && "bg-amber-500/30",
                    skill.color === "blue" && "bg-blue-500/30",
                    skill.color === "green" && "bg-green-500/30",
                    skill.color === "purple" && "bg-purple-500/30",
                    skill.color === "red" && "bg-red-500/30"
                  )}
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3], 
                    scale: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Icon background - smaller padding */}
                <div className={cn(
                  "p-2 rounded-full flex items-center justify-center", // Reduced padding from p-3 to p-2
                  skill.color === "amber" && "bg-amber-500/10 border border-amber-500/20",
                  skill.color === "blue" && "bg-blue-500/10 border border-blue-500/20", 
                  skill.color === "green" && "bg-green-500/10 border border-green-500/20",
                  skill.color === "purple" && "bg-purple-500/10 border border-purple-500/20",
                  skill.color === "red" && "bg-red-500/10 border border-red-500/20"
                )}>
                  {/* Slightly smaller icon */}
                  <skill.icon className={cn(
                    "h-5 w-5", // Reduced size from h-6 w-6 to h-5 w-5
                    skill.color === "amber" && "text-amber-400",
                    skill.color === "blue" && "text-blue-400",
                    skill.color === "green" && "text-green-400",
                    skill.color === "purple" && "text-purple-400",
                    skill.color === "red" && "text-red-400"
                  )} />
                </div>
              </div>
              
              <h4 className="text-center text-sm font-medium text-white">{skill.name}</h4>
              <p className="text-center text-xs text-white/50 mt-0.5">{skill.level}</p> {/* Reduced margin from mt-1 to mt-0.5 */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MobileSkillsCarousel;
