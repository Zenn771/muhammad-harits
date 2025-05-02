
import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface SkillItemProps {
  skill: Skill;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const Icon = skill.icon;
  
  // Map color to corresponding hex color
  const getColorValue = (color: string) => {
    switch (color) {
      case "amber": return "#f59e0b";
      case "blue": return "#3b82f6";
      case "green": return "#10b981";
      case "purple": return "#8b5cf6";
      case "red": return "#ef4444";
      default: return "#f59e0b";
    }
  };
  
  const colorValue = getColorValue(skill.color);
  
  return (
    <motion.div
      className="skill-card flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 relative group overflow-hidden border border-white/10 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Interior glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-blue-500/0 opacity-0 group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-blue-500/10 transition-opacity duration-300"></div>
      
      {/* Colored icon background with radial gradient */}
      <div 
        className="p-2 rounded-full relative z-10 skill-icon"
        style={{
          background: `radial-gradient(circle, ${colorValue}30 0%, ${colorValue}10 70%)`,
          boxShadow: `0 0 10px ${colorValue}20`
        }}
      >
        <Icon 
          className="w-4 h-4" 
          style={{ color: colorValue || 'white' }} 
        />
      </div>
      
      <h4 className="text-xs font-medium text-white mb-2 relative z-10 text-center">{skill.name}</h4>
      
      <div className="w-full bg-gray-700/30 h-1 rounded-full overflow-hidden relative z-10 skill-progress-bar">
        <motion.div
          className="h-full"
          style={{ 
            background: `linear-gradient(to right, ${colorValue}, ${colorValue}80)` 
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export default SkillItem;
