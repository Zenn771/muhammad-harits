
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
      question: "What is your area of expertise?",
      answer:
        "I'm currently studying Instrumentation and Control Engineering at Universitas Gadjah Mada, with strong interests in AI, IoT, embedded systems, and robotics. I often work on projects that involve computer vision, smart automation, and real-time data systems."
    },
    {
      question: "What kind of projects have you worked on?",
      answer:
        "I've developed several impactful projects including an AI-based sign language translator, smart waste management system, and a home automation system with voice control. I enjoy combining hardware and software to solve real-world problems."
    },
    {
      question: "Do you have experience working with teams or in organizations?",
      answer:
        "Yes! I've been actively involved in student organizations, volunteering, and event coordination. These experiences taught me how to collaborate, lead, and communicate effectively in both technical and non-technical teams."
    },
    {
      question: "What tools and technologies are you familiar with?",
      answer:
        "I work with Python (TensorFlow, OpenCV, PyTorch), microcontrollers (Arduino, ESP32), and development tools like Node-RED, MQTT, and Flutter. I also have experience in data science, circuit simulation, and web development using React & Next.js."
    },
    {
      question: "Are you open for collaborations or freelance work?",
      answer:
        "Definitely! I'm always excited to collaborate on innovative tech projects, especially those involving AI, automation, or sustainability. Feel free to reach out if you have something in mind!"
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
