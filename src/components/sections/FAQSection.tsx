
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQSection: React.FC = () => {
  return (
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
  );
};

export default FAQSection;
