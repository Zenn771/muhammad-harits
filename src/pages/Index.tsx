
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import StatusBadge from '@/components/StatusBadge';
import ClientLogos from '@/components/ClientLogos';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll effect for navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY;
      
      const sections = ['home', 'works', 'about', 'faq'];
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
      
      {/* HOME SECTION */}
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
              
              {/* Updated main headline with personal greeting */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-fade-in">
                <span className="text-white">Hi everyone,</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 animate-pulse-slow">
                  my name is Harits
                </span>
              </h1>
              
              {/* Updated subtitle with professional information */}
              <div className="space-y-4 mb-14">
                <p className="text-xl md:text-2xl text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-accent to-amber-100">
                    AI & Electrical Engineer
                  </span>
                </p>
                <p className="text-lg md:text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Passionate about creating intelligent systems and innovative solutions.
                </p>
              </div>
              
              {/* Enhanced CTA buttons with improved contrast */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button className="bg-accent text-black hover:bg-amber-300 hover:text-black transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                  👋 Let's talk
                </Button>
                <Button variant="outline" className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-6 text-base font-medium">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced footer with client logos */}
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

      {/* WORKS SECTION - with vintage effect */}
      <section id="works" className="min-h-screen w-full py-32 px-4 bg-black vintage-effect">
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-amber-100/90 vintage-text">
            Selected Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="vintage-card group relative overflow-hidden transition-all hover:transform hover:scale-[1.02]"
              >
                <div className="aspect-[4/3] bg-amber-900/10 rounded-md overflow-hidden border border-amber-200/20">
                  <div className="h-full w-full flex items-center justify-center text-amber-200/60 text-2xl font-bold">
                    Project {item}
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-amber-100/80 group-hover:text-amber-100 transition-colors">
                    Project Title {item}
                  </h3>
                  <p className="mt-2 text-amber-200/50 text-sm group-hover:text-amber-200/70 transition-colors">
                    AI & Electrical Engineering
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Button variant="outline" className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-3 text-base font-medium">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - with vintage effect */}
      <section id="about" className="min-h-screen w-full py-32 px-6 bg-black vintage-effect">
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-amber-100/90 vintage-text">
            About Me
          </h2>
          
          <div className="space-y-8 text-amber-200/70 text-lg">
            <p>
              I am a passionate AI and electrical engineer with over 5 years of experience creating intelligent systems and solutions. My work spans across various industries, helping organizations leverage cutting-edge technology to solve complex problems.
            </p>
            
            <p>
              My approach combines deep technical knowledge with practical implementation skills, ensuring that every project not only meets technical specifications but also delivers exceptional value and performance.
            </p>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-100/80 vintage-text">Core Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Machine Learning Systems", 
                  "Neural Networks", 
                  "Electrical System Design", 
                  "Computer Vision",
                  "Natural Language Processing", 
                  "Hardware Integration"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center vintage-skill">
                    <span className="w-2 h-2 rounded-full bg-amber-400/50 mr-3"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - with vintage effect */}
      <section id="faq" className="min-h-screen w-full py-32 px-6 bg-black vintage-effect">
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-amber-100/90 vintage-text">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-amber-200/20 last:border-b-0"
                >
                  <AccordionTrigger className="text-amber-100/80 hover:text-amber-100 text-left py-6 vintage-text">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-amber-200/60 pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-amber-200/60 mb-6">
              Still have questions? Feel free to reach out directly.
            </p>
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-900/20 hover:bg-amber-900/30 text-amber-200 border border-amber-400/30 rounded-full transition-all hover:scale-105"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
