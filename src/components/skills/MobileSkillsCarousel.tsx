
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/data/skills';

interface MobileSkillsCarouselProps {
  category: 'ai' | 'electrical' | 'web';
  skills: Skill[];
  activeCategory: string;
}

const MobileSkillsCarousel: React.FC<MobileSkillsCarouselProps> = ({ category, skills, activeCategory }) => {
  // Filter skills by category
  const categorySkills = skills.filter(skill => skill.category === category);
  
  // Only show if this is the active category
  if (activeCategory !== category) return null;
  
  // Get title based on category
  const getCategoryTitle = () => {
    switch (category) {
      case 'ai': return 'AI & Machine Learning';
      case 'electrical': return 'Electrical Engineering';
      case 'web': return 'Web Development';
      default: return '';
    }
  };
  
  // Get gradient based on category
  const getCategoryGradient = () => {
    switch (category) {
      case 'ai': return 'from-blue-900/40 to-purple-900/20';
      case 'electrical': return 'from-amber-900/30 to-red-900/20';
      case 'web': return 'from-blue-900/30 to-cyan-900/20';
      default: return '';
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      key={category}
    >
      <div className={`overflow-x-auto pb-6`}>
        <div className="flex gap-4 px-4 pb-1 min-w-max">
          {categorySkills.map((skill, index) => (
            <div 
              key={skill.id}
              className={`w-64 flex-shrink-0 bg-gradient-to-br ${getCategoryGradient()} border border-white/10 rounded-xl p-5`}
            >
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-white/10 mr-3">
                  <skill.icon className="h-5 w-5 text-white/80" />
                </div>
                <h4 className="font-medium text-white">{skill.name}</h4>
              </div>
              
              <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-200 to-amber-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              
              <div className="mt-2 flex justify-between">
                <span className="text-xs text-white/60">Proficiency</span>
                <span className="text-xs font-medium text-amber-200">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileSkillsCarousel;
