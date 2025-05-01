import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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
  MessageSquareCode,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<"ai" | "electrical">("ai");
  const aiCarouselRef = useRef<HTMLDivElement>(null);
  const electricalCarouselRef = useRef<HTMLDivElement>(null);

  // Scroll controls for horizontal carousel on mobile
  const scrollCarousel = (direction: "left" | "right", category: "ai" | "electrical") => {
    const ref = category === "ai" ? aiCarouselRef : electricalCarouselRef;
    if (!ref.current) return;

    const scrollAmount = 200; // Amount to scroll in pixels
    const currentScroll = ref.current.scrollLeft;
    
    ref.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth"
    });
  };

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
            My technical proficiencies in AI and Electrical Engineering
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
            {/* AI Section */}
            <div className={`mb-8 ${activeCategory !== "ai" ? "hidden" : ""}`}>
              <div className="relative">
                {/* Carousel navigation buttons */}
                <button 
                  onClick={() => scrollCarousel("left", "ai")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
                >
                  <ChevronLeft className="h-5 w-5 text-white/80" />
                </button>
                
                <button 
                  onClick={() => scrollCarousel("right", "ai")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
                >
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </button>
                
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div 
                  ref={aiCarouselRef}
                  className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-6"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {skills
                    .filter(skill => skill.category === "ai")
                    .map((skill, index) => (
                      <MobileSkillCard key={`ai-${skill.name}`} skill={skill} index={index} />
                    ))}
                </div>
              </div>
            </div>

            {/* Electrical Section */}
            <div className={`mb-8 ${activeCategory !== "electrical" ? "hidden" : ""}`}>
              <div className="relative">
                {/* Carousel navigation buttons */}
                <button 
                  onClick={() => scrollCarousel("left", "electrical")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
                >
                  <ChevronLeft className="h-5 w-5 text-white/80" />
                </button>
                
                <button 
                  onClick={() => scrollCarousel("right", "electrical")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10"
                >
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </button>
                
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div 
                  ref={electricalCarouselRef}
                  className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-6"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {skills
                    .filter(skill => skill.category === "electrical")
                    .map((skill, index) => (
                      <MobileSkillCard key={`electrical-${skill.name}`} skill={skill} index={index} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Desktop grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
            {/* AI Skills */}
            <SkillCategory title="AI & Machine Learning" skills={skills.filter(skill => skill.category === "ai")} />
            
            {/* Electrical Engineering Skills */}
            <SkillCategory title="Electrical Engineering" skills={skills.filter(skill => skill.category === "electrical")} />
          </div>
        )}
      </div>
    </section>
  );
};

// Mobile optimized skill card component
const MobileSkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      className="flex-shrink-0 snap-center w-[180px] mr-4 last:mr-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      viewport={{ once: true }}
    >
      <div 
        className="bento-card p-4 h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-lg relative overflow-hidden"
      >
        {/* Removed grain texture */}
        {/* Glowing border effect on hover */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-700"></div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="p-2.5 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 mb-3">
            <span className="text-white">{skill.icon}</span>
          </div>
          
          <h4 className="text-sm font-medium text-white text-center mb-2.5">{skill.name}</h4>
          
          <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Desktop skill category component
const SkillCategory: React.FC<{ title: string; skills: Skill[] }> = ({ title, skills }) => {
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
      
      {/* Removed grain texture */}
      
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center relative z-10">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

// Desktop skill item component
const SkillItem: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      className="skill-card flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-4 relative group overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Interior glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-blue-500/0 opacity-0 group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-blue-500/10 transition-opacity duration-300"></div>
      
      {/* Removed grain texture */}
      
      <div className="p-3 rounded-full bg-gradient-to-br from-amber-500/20 to-blue-500/20 mb-3 relative z-10 skill-icon">
        <span className="text-white">{skill.icon}</span>
      </div>
      
      <h4 className="text-sm font-medium text-white mb-2 relative z-10">{skill.name}</h4>
      
      <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden relative z-10 skill-progress-bar">
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
