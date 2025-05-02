import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, ChevronRight, Circle } from 'lucide-react';
import { cn } from "@/lib/utils";

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
    icon: <GraduationCap className="h-5 w-5" />,
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

const CareerSection: React.FC = () => {
  return (
    <section id="career" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-gray-100 vintage-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Career Timeline
        </motion.h2>
        
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-lg text-gray-300/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A journey through my professional experiences and academic achievements
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-4 sm:left-1/2 sm:-ml-0.5 w-1 bg-white/10 h-full"
            style={{ 
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
                      >
                        <span className="text-accent">{item.icon}</span>
                      </motion.div>
                    </div>
                    
                    {/* Timeline Card */}
                    <motion.div 
                      className={cn(
                        "relative flex-1 ml-12 sm:ml-0",
                        isEven ? "sm:text-right" : "sm:text-left"
                      )}
                      whileHover={{ translateY: -5 }}
                    >
                      <div 
                        className="vintage-card rounded-xl overflow-hidden shadow-xl"
                      >
                        {/* Macbook-like title bar */}
                        <div className="bg-gray-800 px-4 py-2 flex items-center">
                          <div className="flex space-x-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-grow text-center text-xs text-gray-400 font-medium">
                            {item.year} · {item.type === "work" ? "Work Experience" : "Education"}
                          </div>
                        </div>
                        
                        {/* Card content with styled border */}
                        <div 
                          className="p-6 md:p-8 bg-gradient-to-br border-t-0 border border-white/10 backdrop-blur-sm"
                          style={{
                            backgroundImage: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgba(29, 78, 216, 0.15)")}, ${item.color.split(" ")[1].replace("to-", "rgba(8, 47, 73, 0.05)")})`
                          }}
                        >
                          {/* Content */}
                          <div className="absolute inset-0 grain-effect-subtle rounded-xl"></div>
                          
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
                        
                        {/* Bottom bar for macbook-like design */}
                        <div className="bg-gray-800/80 h-2 w-full"></div>
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
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a 
            href="#works" 
            className="flex items-center justify-center gap-2 text-accent hover:text-white transition-colors duration-300"
          >
            <span>View My Projects</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;
