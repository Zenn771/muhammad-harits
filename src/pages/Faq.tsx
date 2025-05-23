
import React from 'react';
import Navbar from '@/components/Navbar';
import ParticleEffect from '@/components/ParticleEffect';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "I offer a range of design services including brand identity design, user experience (UX) design, user interface (UI) design, web design, interactive prototyping, and design systems creation."
    },
    {
      question: "How does your design process work?",
      answer: "My design process typically follows these steps: discovery and research, concept development, design exploration, refinement, and implementation support. Throughout each phase, I maintain open communication to ensure your vision is achieved."
    },
    {
      question: "What is your typical timeline for projects?",
      answer: "Project timelines vary depending on scope and complexity. A simple brand refresh might take 2-3 weeks, while a comprehensive website design could take 6-8 weeks. During our initial consultation, I'll provide a more accurate timeline based on your specific needs."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, I offer post-project support packages to ensure your design continues to serve your needs as your business evolves. This can include regular updates, refinements, and expansion of design elements as needed."
    },
    {
      question: "How do you handle revisions to designs?",
      answer: "My project quotes include up to three rounds of revisions to ensure your complete satisfaction. Additional revision rounds can be arranged at an hourly rate if needed."
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black relative">
      {/* Background particles with reduced count */}
      <ParticleEffect count={30} />
      
      {/* Navigation */}
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content with dots pattern */}
      <SectionBackground pattern="dots" withGrain={true}>
        <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto w-full relative spotlight-enhanced">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white text-center animate-fade-in">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-400 to-white">
                Frequently Asked Questions
              </span>
            </h1>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <AccordionTrigger className="text-white hover:text-amber-400 text-left py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-white/70 mb-6">
                Still have questions? Feel free to reach out directly.
              </p>
              <a 
                href="mailto:contact@example.com" 
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-full transition-all hover:scale-105"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </SectionBackground>
    </div>
  );
};

export default Faq;
