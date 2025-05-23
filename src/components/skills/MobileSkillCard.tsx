
import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface MobileSkillCardProps {
  skill: Skill;
  index: number;
}

const MobileSkillCard: React.FC<MobileSkillCardProps> = ({ skill, index }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div
      className="w-full" // Use full width of parent container
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      viewport={{ once: true }}
    >
      <div 
        className="bento-card p-4 h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-lg relative overflow-hidden"
        style={{
          width: "100%", // Ensure card uses full width
          display: "block" // Ensure block display
        }}
      >
        {/* Glowing border effect on hover */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-700"></div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="p-2.5 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 mb-3">
            <Icon className="text-white" />
          </div>
          
          <h4 className="text-sm font-medium text-white text-center mb-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full">{skill.name}</h4>
          
          <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileSkillCard;
