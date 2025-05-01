
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';

// Project data
const projects = [
  {
    id: 1,
    title: "AI Neural Interface",
    category: "Machine Learning / Neural Networks",
    image: "/project1.jpg",
  },
  {
    id: 2,
    title: "Quantum Computing UI",
    category: "UI Design / Quantum Systems",
    image: "/project2.jpg",
  },
  {
    id: 3,
    title: "Smart Grid Integration",
    category: "Electrical Engineering / IoT",
    image: "/project3.jpg",
  },
  {
    id: 4,
    title: "Renewable Energy Dashboard",
    category: "Data Visualization / Clean Tech",
    image: "/project4.jpg",
  }
];

const ProjectsSection = () => {
  return (
    <section id="works" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-black vintage-effect">
      <div className="max-w-6xl mx-auto relative">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-10 md:mb-16 text-center text-amber-100/90 vintage-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Project Showcase
        </motion.h2>
        
        {/* Board background with subtle texture */}
        <div className="relative mb-16">
          {/* Pin board background */}
          <div className="absolute -inset-6 md:-inset-12 -z-10 rounded-2xl bg-gradient-to-br from-amber-950/30 to-black/50 border border-amber-900/10"></div>
          
          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-16 p-4 md:p-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                index={index}
                className={index % 2 === 0 ? "rotate-1" : "-rotate-1"}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 md:mt-20 text-center">
          <Button 
            variant="outline" 
            className="border-amber-400/30 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400 transition-all hover:scale-105 px-8 py-3 text-base font-medium"
          >
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
