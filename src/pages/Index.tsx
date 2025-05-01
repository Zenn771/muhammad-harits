import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import StatusBadge from '@/components/StatusBadge';
import ClientLogos from '@/components/ClientLogos';
import BentoBox from '@/components/BentoGrid';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Calendar, Award, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll effect for navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY;
      
      const sections = ['home', 'about', 'career', 'works', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FAQs data
  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "I offer a range of AI and electrical engineering services including system design, intelligent automation solutions, neural network development, and electrical system integration."
    },
    {
      question: "How does your design process work?",
      answer: "My design process typically follows these steps: requirements gathering, system architecture design, prototyping, implementation, testing, and deployment. Throughout each phase, I maintain open communication to ensure your vision is achieved."
    },
    {
      question: "What is your typical timeline for projects?",
      answer: "Project timelines vary depending on scope and complexity. A simple automation project might take 2-3 weeks, while a comprehensive AI system could take 6-8 weeks. During our initial consultation, I'll provide a more accurate timeline based on your specific needs."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, I offer post-project support packages to ensure your systems continue to function optimally as your needs evolve. This can include regular maintenance, updates, and expansion of capabilities as needed."
    },
    {
      question: "How do you handle revisions to designs?",
      answer: "My project quotes include up to three rounds of revisions to ensure your complete satisfaction. Additional revision rounds can be arranged at an hourly rate if needed."
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Navigation with scroll effect */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-lg bg-black/70' : 'py-5'}`}>
        <Navbar activeSection={activeSection} scrollBased={true} className={scrolled ? 'scale-95' : ''} />
      </div>
      
      {/* HOME SECTION - Keep existing structure but enhance with transitions */}
      <section id="home" className="min-h-screen w-full overflow-hidden bg-black relative grain-effect">
        {/* Enhanced background particles with more density */}
        <ParticleEffect count={100} />
        
        {/* Enhanced circle stack with more depth */}
        <CircleStack />
        
        {/* Main content positioned in the center with enhanced spotlight effect */}
        <div className="relative h-screen flex flex-col items-center justify-center z-10">
          <div className="text-center max-w-3xl px-6">
            <div className="relative spotlight-enhanced">
              {/* Status badge with animation */}
              <div className="mb-10 flex justify-center animate-fade-in">
                <StatusBadge status="available" />
              </div>
              
              {/* Condensed main headline with personal greeting on a single line */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-fade-in text-white">
                Hi everyone, my name is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 animate-pulse-slow">Harits</span>
              </h1>
              
              {/* Updated subtitle with professional information */}
              <div className="space-y-4 mb-14">
                <p className="text-xl md:text-2xl text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-300 to-blue-300">
                    AI & Electrical Engineer
                  </span>
                </p>
                <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Passionate about creating intelligent systems and innovative solutions.
                </p>
              </div>
              
              {/* Enhanced CTA buttons with improved contrast */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button className="bg-white hover:bg-gray-100 text-gray-800 hover:text-black transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                  👋 Let's talk
                </Button>
                <Button variant="outline" className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scrolling soft skills */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <ClientLogos />
        </div>
        
        {/* Enhanced glowing stars/particles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const top = Math.random() * 80 + 10;
          const left = Math.random() * 80 + 10;
          const opacity = Math.random() * 0.5 + 0.2;
          const delay = i * 0.3;
          
          return (
            <div
              key={`star-${i}`}
              className="absolute animate-pulse-slow"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: opacity,
                background: 'radial-gradient(circle, rgba(250,204,21,0.8) 0%, rgba(250,204,21,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(1px)',
                animationDelay: `${delay}s`,
                boxShadow: '0 0 10px 2px rgba(250,204,21,0.3)',
              }}
            />
          );
        })}
      </section>

      {/* ABOUT SECTION - With new hexagon grid pattern */}
      <SectionBackground pattern="hexagon" withTransition={true}>
        <section id="about" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8">
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-gray-100 vintage-text">
              About Me
            </h2>
            
            <div className="mb-12 max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-300/90">
                I'm a passionate AI and electrical engineer with over 5 years of experience creating intelligent systems and innovative solutions. My multidisciplinary approach combines technical expertise with creative problem-solving.
              </p>
            </div>
            
            <BentoBox />
          </div>
        </section>
      </SectionBackground>

      {/* CAREER SECTION - With diagonal grid pattern */}
      <SectionBackground pattern="diagonal" accentColor="rgba(67, 56, 202, 0.1)" withTransition={true}>
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
                            className="vintage-card p-6 md:p-8 rounded-xl bg-gradient-to-br border border-white/10 backdrop-blur-sm shadow-xl"
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, ${item.color.split(" ")[0].replace("from-", "rgba(29, 78, 216, 0.15)")}, ${item.color.split(" ")[1].replace("to-", "rgba(8, 47, 73, 0.05)")})`
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
      </SectionBackground>

      {/* WORKS SECTION with existing ProjectsSection but wrapped in our background */}
      <SectionBackground pattern="diagonal">
        <ProjectsSection />
      </SectionBackground>
      
      {/* SKILLS SECTION - With circuit board pattern */}
      <SectionBackground pattern="circuit" accentColor="rgba(56, 189, 248, 0.1)" withTransition={true}>
        <SkillsSection />
      </SectionBackground>

      {/* TESTIMONIALS SECTION - With flow pattern */}
      <SectionBackground pattern="flow" accentColor="rgba(191, 219, 254, 0.1)" withTransition={true}>
        <TestimonialsSection />
      </SectionBackground>

      {/* FAQ SECTION - With dots pattern */}
      <SectionBackground pattern="dots" accentColor="rgba(250, 204, 21, 0.1)" withTransition={true}>
        <section id="faq" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8">
          <div className="max-w-3xl mx-auto relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 md:mb-16 text-center text-gray-100 vintage-text">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-b border-gray-200/20 last:border-b-0"
                  >
                    <AccordionTrigger className="text-gray-100/80 hover:text-gray-100 text-left py-6 vintage-text">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300/80 pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-300/80 mb-6">
                Still have questions? Feel free to reach out directly.
              </p>
              <a 
                href="mailto:contact@example.com" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-900/20 hover:bg-blue-900/30 text-blue-200 border border-blue-400/30 rounded-full transition-all hover:scale-105"
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>
      </SectionBackground>

      {/* CONTACT SECTION - With topographic pattern */}
      <SectionBackground pattern="topo" accentColor="rgba(56, 189, 248, 0.08)" withTransition={true}>
        <ContactSection />
      </SectionBackground>
    </div>
  );
};

export default Index;
