
import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Layers,
  Database,
  Eye,
  BarChart,
  Zap,
  Brain,
  CircuitBoard,
  FlaskRound,
  MessageSquareCode
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "ai" | "electrical";
  proficiency: number; // 1-100
}

const skills: Skill[] = [
  // AI Skills
  {
    name: "Python",
    icon: <Code className="h-6 w-6" />,
    category: "ai",
    proficiency: 90,
  },
  {
    name: "TensorFlow",
    icon: <Database className="h-6 w-6" />,
    category: "ai",
    proficiency: 85,
  },
  {
    name: "PyTorch",
    icon: <FlaskRound className="h-6 w-6" />,
    category: "ai",
    proficiency: 80,
  },
  {
    name: "NLP",
    icon: <MessageSquareCode className="h-6 w-6" />,
    category: "ai",
    proficiency: 75,
  },
  {
    name: "Computer Vision",
    icon: <Eye className="h-6 w-6" />,
    category: "ai",
    proficiency: 85,
  },
  {
    name: "Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    category: "ai",
    proficiency: 90,
  },

  // Electrical Engineering Skills
  {
    name: "Circuit Design",
    icon: <CircuitBoard className="h-6 w-6" />,
    category: "electrical",
    proficiency: 95,
  },
  {
    name: "PCB Layout",
    icon: <Layers className="h-6 w-6" />,
    category: "electrical",
    proficiency: 85,
  },
  {
    name: "Microcontrollers",
    icon: <Cpu className="h-6 w-6" />,
    category: "electrical",
    proficiency: 90,
  },
  {
    name: "Instrumentation",
    icon: <Code className="h-6 w-6" />,
    category: "electrical",
    proficiency: 80,
  },
  {
    name: "Signal Processing",
    icon: <BarChart className="h-6 w-6" />,
    category: "electrical",
    proficiency: 85,
  },
  {
    name: "Power Systems",
    icon: <Zap className="h-6 w-6" />,
    category: "electrical",
    proficiency: 90,
  },
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-black relative grain-effect">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
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
            My technical proficiencies in AI and Electrical Engineering
          </motion.p>
        </div>

        {/* Skills categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
          {/* AI Skills */}
          <SkillCategory title="AI & Machine Learning" skills={skills.filter(skill => skill.category === "ai")} />
          
          {/* Electrical Engineering Skills */}
          <SkillCategory title="Electrical Engineering" skills={skills.filter(skill => skill.category === "electrical")} />
        </div>
      </div>

      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 grid-background pointer-events-none"
        />
        
        {/* Top gradient fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/90 to-transparent z-10 pointer-events-none"
        />
        
        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none"
        />

        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-amber-900/20 blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
};

const SkillCategory: React.FC<{ title: string; skills: Skill[] }> = ({ title, skills }) => {
  return (
    <motion.div
      className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const SkillItem: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-3 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 mb-3">
        <span className="text-white">{skill.icon}</span>
      </div>
      <h4 className="text-sm font-medium text-white mb-2">{skill.name}</h4>
      <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export default SkillsSection;
