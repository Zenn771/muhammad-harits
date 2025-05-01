
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Code, 
  Brush, 
  GraduationCap, 
  Music, 
  CircuitBoard,
  Book,
  Pencil,
  PencilRuler
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
  animationType: 'music' | 'tech' | 'creative' | 'education';
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  title, 
  skills, 
  icon, 
  animationType, 
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "h-full flex flex-col", 
        className
      )}
    >
      <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden group relative">
        {/* Background grain texture */}
        <div className="absolute inset-0 grain-texture opacity-20 pointer-events-none"></div>
        
        {/* Animated background effect based on type */}
        <AnimatedBackground type={animationType} />
        
        <CardContent className="p-5 relative z-10 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <motion.div 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
            <h3 className="ml-3 text-lg font-semibold text-white">{title}</h3>
          </div>
          
          <ul className="space-y-2 text-white/80 flex-grow">
            {skills.map((skill, idx) => (
              <motion.li 
                key={idx}
                className="flex items-center"
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
                viewport={{ once: true }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Different background animations based on card type
const AnimatedBackground: React.FC<{ type: 'music' | 'tech' | 'creative' | 'education' }> = ({ type }) => {
  switch (type) {
    case 'music':
      return (
        <div className="absolute bottom-0 left-0 right-0 h-14 flex items-end justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 mx-0.5 bg-accent rounded-t-full"
              animate={{
                height: [
                  `${5 + Math.sin(i * 1.3) * 4}px`, 
                  `${15 + Math.sin(i * 0.8) * 8}px`, 
                  `${7 + Math.cos(i * 1.5) * 5}px`,
                  `${12 + Math.sin(i * 1.1) * 6}px`,
                  `${5 + Math.sin(i * 1.3) * 4}px`
                ]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      );
    
    case 'tech':
      return (
        <div className="absolute top-0 right-0 bottom-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
            {[...Array(10)].map((_, i) => (
              [...Array(10)].map((_, j) => (
                <motion.div
                  key={`${i}-${j}`}
                  className="border-r border-b border-accent/30"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [
                      0.2, 
                      Math.random() > 0.7 ? 0.8 : 0.2, 
                      0.2
                    ] 
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: (i + j) * 0.05
                  }}
                />
              ))
            ))}
          </div>
        </div>
      );
      
    case 'creative':
      return (
        <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
              style={{
                width: 20 + i * 10,
                height: 20 + i * 10,
                top: 20 + i * 15,
                right: 20 + i * 10,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      );
      
    case 'education':
      return (
        <div className="absolute bottom-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
          <motion.div 
            className="w-12 h-14 border-r-2 border-b-2 border-t-2 border-accent rounded-tr-md rounded-br-md"
            animate={{ rotateY: [0, 40, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </div>
      );
  }
};

const AnimatedSkillCards: React.FC = () => {
  const designSkills = ["Brand Identity Design", "User Experience (UX)", "Visual Communication", "Color Theory"];
  const technicalSkills = ["User Interface (UI) Design", "Interactive Prototyping", "Design Systems", "Wireframing"];
  const creativeSkills = ["Motion Design", "Typography", "Illustration", "Creative Direction"];
  const industrySkills = ["Digital Marketing", "Trend Analysis", "Project Management", "Client Relations"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
      <SkillCard 
        title="Design Fundamentals" 
        skills={designSkills} 
        icon={<Brush className="h-5 w-5" />} 
        animationType="creative" 
      />
      
      <SkillCard 
        title="Technical Skills" 
        skills={technicalSkills} 
        icon={<CircuitBoard className="h-5 w-5" />} 
        animationType="tech" 
      />
      
      <SkillCard 
        title="Creative Process" 
        skills={creativeSkills} 
        icon={<PencilRuler className="h-5 w-5" />} 
        animationType="creative" 
      />
      
      <SkillCard 
        title="Industry Knowledge" 
        skills={industrySkills} 
        icon={<GraduationCap className="h-5 w-5" />} 
        animationType="education" 
      />

      <SkillCard 
        title="Music Appreciation" 
        skills={["Audio Editing", "Sound Design", "Rhythm Analysis", "Genre History"]} 
        icon={<Music className="h-5 w-5" />} 
        animationType="music" 
        className="sm:col-span-2 md:col-span-1"
      />
    </div>
  );
};

export default AnimatedSkillCards;
