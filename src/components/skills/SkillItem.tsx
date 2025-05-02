
import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface SkillItemProps {
  skill: Skill;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div
      className="skill-card flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-5 relative group overflow-hidden border border-white/10 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Interior glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-blue-500/0 opacity-0 group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-blue-500/10 transition-opacity duration-300"></div>
      
      <div className="p-3 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 mb-3 relative z-10 skill-icon">
        <Icon className="text-white" />
      </div>
      
      <h4 className="text-sm font-medium text-white mb-2 relative z-10 text-center">{skill.name}</h4>
      
      <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden relative z-10 skill-progress-bar">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
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
