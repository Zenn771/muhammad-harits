
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Award, ChevronRight, GraduationCap } from "lucide-react";

// Career timeline data
const careerData = [
  {
    id: 1,
    year: "2023 - Present",
    role: "Senior AI Research Engineer",
    company: "Future Tech Labs",
    description: "Leading research in advanced neural networks and machine learning algorithms for next-generation AI applications. Specializing in natural language processing and computer vision integration.",
    skills: ["Machine Learning", "Neural Networks", "Computer Vision", "Research Leadership"],
    icon: <Briefcase className="h-5 w-5" />,
    type: "work",
    color: "from-blue-900/30 to-cyan-900/10",
  },
  {
    id: 2,
    year: "2021 - 2023",
    role: "AI Developer & Electrical Engineer",
    company: "Innovate Systems",
    description: "Developed integrated solutions combining electrical engineering expertise with AI capabilities. Created smart systems with embedded machine learning for industrial applications.",
    skills: ["Embedded Systems", "AI Integration", "Circuit Design", "IoT"],
    icon: <Briefcase className="h-5 w-5" />,
    type: "work",
    color: "from-purple-900/30 to-indigo-900/10",
  },
  {
    id: 3,
    year: "2020",
    role: "Advanced Certification",
    company: "AI Institute",
    description: "Received specialized certification in Deep Learning and Neural Network Architectures, focusing on practical applications in real-world scenarios.",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch"],
    icon: <Award className="h-5 w-5" />,
    type: "education",
    color: "from-amber-900/30 to-yellow-900/10",
  },
  {
    id: 4,
    year: "2018 - 2021",
    role: "Electrical Systems Engineer",
    company: "PowerTech Solutions",
    description: "Designed and implemented electrical systems for commercial and industrial applications. Led a team of junior engineers in creating innovative power management solutions.",
    skills: ["Electrical Design", "Project Management", "Team Leadership", "Power Systems"],
    icon: <Briefcase className="h-5 w-5" />,
    type: "work",
    color: "from-green-900/30 to-emerald-900/10",
  },
  {
    id: 5,
    year: "2014 - 2018",
    role: "B.S. Electrical Engineering & Computer Science",
    company: "Tech University",
    description: "Dual degree program with focus on electrical engineering fundamentals and advanced computer science concepts. Graduated with honors.",
    skills: ["Electrical Engineering", "Computer Science", "Algorithm Design", "Circuit Theory"],
    icon: <GraduationCap className="h-5 w-5" />,
    type: "education",
    color: "from-orange-900/30 to-red-900/10",
  }
];

const Career: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Background elements with parallax effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.15) 0%, transparent 80%)',
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      />
      <div 
        className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #4338ca11 1px, transparent 1px), linear-gradient(to bottom, #4338ca11 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <div className="fixed inset-0 grain-effect opacity-20 pointer-events-none z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar activeSection="career" scrollBased={true} className="sticky top-0 z-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 vintage-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Career Timeline
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A journey through my professional experiences and academic achievements
            </motion.p>
          </div>
          
          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Vertical line */}
            <div 
              className="absolute left-4 sm:left-1/2 sm:-ml-0.5 w-1 bg-white/10 h-full"
              style={{ 
                transform: `translateY(${scrollY * 0.01}px)`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
              }}
            ></div>
            
            <div className="space-y-16 relative">
              {careerData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={item.id}
                    className={cn(
                      "relative",
                      isEven ? "sm:pr-8 sm:pl-0" : "sm:pl-8 sm:pr-0"
                    )}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div 
                      className={cn(
                        "flex flex-col sm:items-center sm:flex-row sm:gap-8",
                        isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                      )}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1 z-10">
                        <motion.div 
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-lg"
                          whileHover={{ scale: 1.2 }}
                          style={{ 
                            transform: `translateY(${scrollY * 0.03 * (index + 1)}px)` 
                          }}
                        >
                          <span className="text-accent">{item.icon}</span>
                        </motion.div>
                      </div>
                      
                      {/* Timeline Card */}
                      <motion.div 
                        className={cn(
                          "relative flex-1 ml-12 sm:ml-0",
                          isEven ? "sm:text-right" : "sm:text-left",
                        )}
                        whileHover={{ translateY: -5 }}
                        style={{ 
                          perspective: '1000px',
                          transform: `translateY(${scrollY * 0.02 * (index % 3)}px)` 
                        }}
                      >
                        <div 
                          className="vintage-card p-6 md:p-8 rounded-xl bg-gradient-to-br border border-white/10 backdrop-blur-sm shadow-xl"
                          style={{
                            background: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgb(var(--"))}, ${item.color.split(" ")[1].replace("to-", "rgb(var(--"))})`
                          }}
                        >
                          {/* Content */}
                          <div className="absolute inset-0 grain-effect opacity-10 rounded-xl"></div>
                          <div className="flex items-center mb-3 gap-2">
                            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {item.year}
                              </span>
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white">
                              {item.type === "work" ? "Work" : "Education"}
                            </div>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.role}</h3>
                          <p className="text-white/80 font-medium mb-4">{item.company}</p>
                          
                          <p className="text-white/70 text-sm md:text-base mb-6">
                            {item.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                              <span 
                                key={i}
                                className="vintage-skill px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <motion.div
                            className="absolute bottom-5 right-5 opacity-30 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="w-20 h-20 border border-white/5 rounded-full"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Year on opposite side for larger screens */}
                      <div className={cn(
                        "hidden sm:block sm:w-1/2 relative",
                        isEven ? "sm:text-right" : "sm:text-left"
                      )}>
                        <motion.div 
                          className="absolute top-0 px-4 py-2"
                          style={{ 
                            [isEven ? 'right' : 'left']: '0',
                            transform: `translateY(${scrollY * 0.04 * (index % 2 + 1)}px)` 
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="vintage-text text-white/40 text-sm">
                            {item.type === "work" 
                              ? <Briefcase className="h-3 w-3 inline mr-1" />
                              : <GraduationCap className="h-3 w-3 inline mr-1" />
                            }
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom section */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              This journey represents my growth and expertise in electrical engineering, AI research, and system development. Each role has shaped my approach to solving complex problems and creating innovative solutions.
            </p>
            <div className="flex justify-center">
              <a 
                href="#works" 
                className="flex items-center gap-2 text-accent hover:text-white transition-colors duration-300"
              >
                <span>View My Projects</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Career;
