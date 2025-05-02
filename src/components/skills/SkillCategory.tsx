
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skill } from "@/data/skills";

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <div className="vintage-card p-6 rounded-xl bg-gradient-to-br from-blue-900/10 to-purple-900/5 border border-white/10 backdrop-blur-sm">
      <motion.h3 
        className="text-xl font-semibold text-white mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      
      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="relative">
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
              
              {/* Icon background */}
              <div className={cn(
                "p-2 rounded-full flex items-center justify-center",
                skill.color === "amber" && "bg-amber-500/10 border border-amber-500/20",
                skill.color === "blue" && "bg-blue-500/10 border border-blue-500/20", 
                skill.color === "green" && "bg-green-500/10 border border-green-500/20",
                skill.color === "purple" && "bg-purple-500/10 border border-purple-500/20",
                skill.color === "red" && "bg-red-500/10 border border-red-500/20"
              )}>
                <skill.icon className={cn(
                  "h-5 w-5",
                  skill.color === "amber" && "text-amber-400",
                  skill.color === "blue" && "text-blue-400",
                  skill.color === "green" && "text-green-400",
                  skill.color === "purple" && "text-purple-400",
                  skill.color === "red" && "text-red-400"
                )} />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-white">{skill.name}</h4>
              <p className="text-xs text-white/50 mt-1">{skill.level}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
