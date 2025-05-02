
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Skill } from "@/data/skills";
import SkillItem from "./SkillItem";

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm rounded-xl p-6 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7 }}
    >
      {/* Dynamic background glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-1000"></div>
      
      {/* Interior glowing border */}
      <div className="absolute inset-0 border border-white/5 rounded-xl"></div>
      
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center relative z-10">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
        {skills.map((skill, index) => (
          <SkillItem key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCategory;
