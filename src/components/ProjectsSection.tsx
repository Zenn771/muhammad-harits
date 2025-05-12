import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';

// Sample projects data
const portfolioProjects = [
  {
    company: "Independent Research in Power Quality",
    year: "2024",
    title: "Power Quality Classification Using Deep Learning",
    results: [
      { title: "Implemented a 2D CNN model to classify 7 types of power quality disturbances using STFT-transformed voltage signals" },
      { title: "Processed voltage data from IEEE DataPort into 2D STFT images compatible with CNN input format" },
      { title: "Integrated Squeeze-and-Excitation blocks as attention mechanisms to enhance feature extraction" },
      { title: "Applied data augmentation (frequency & time masking), early stopping, and class weighting to improve model robustness and generalization" },
      { title: "Achieved accurate multi-class classification with evaluation metrics including accuracy, precision, recall, F1-score, and confusion matrix visualization" }
    ],
    link: "https://github.com/Zenn711/power-quality-classification.git",
    image: "/project/portfolio4.png",
  },
  {
    company: "Applied Machine Learning Project",
    year: "2024",
    title: "LSTM Time Series Forecasting",
    results: [
      { title: "Developed a deep learning model using LSTM to forecast monthly airline passenger counts from 1949–1960" },
      { title: "Transformed univariate time series data into supervised learning format using a sliding window approach" },
      { title: "Applied data normalization with MinMaxScaler and reshaped input into [samples, time steps, features] format for LSTM compatibility" },
      { title: "Built and trained a sequential model with 1 LSTM layer (4 units) and 1 Dense output layer using Keras and TensorFlow" },
      { title: "Evaluated model with RMSE: ~22.68 (train), ~49.34 (test) and visualized predictions to assess trend and seasonality capture" }
    ],
    link: "https://github.com/Zenn711/time-series-forecasting.git",
    image: "/project/portfolio5.png",
  },
  {
    company: "Educational Tool Development",
    year: "2025",
    title: "Interactive Physics Simulation Platform",
    results: [
      { title: "Designed and developed a web-based platform to simulate physics concepts interactively" },
      { title: "Implemented real-time visualizations for topics like projectile motion, pendulum dynamics, and fluid flow" },
      { title: "Enabled parameter manipulation (gravity, viscosity, amplitude, etc.) with instant feedback" },
      { title: "Built using React, TypeScript, Tailwind CSS, and HTML5 Canvas with modular simulation components" },
      { title: "Created an engaging learning experience aimed at students, educators, and lifelong learners" }
    ],
    link: "https://github.com/Zenn711/physics-simulation-website.git",
    image: "/project/portfolio1.png",
  },
  {
    company: "Advanced Simulation Development",
    year: "2025",
    title: "Fuzzy Logic Simulation of Obstacle Car",
    results: [
      { title: "Developed a fuzzy logic controller to navigate dynamic environments using ultrasonic sensors" },
      { title: "Reduced collision rate by over 70% in indoor obstacle courses" },
      { title: "Integrated real-time PWM control for smooth motor actuation using Arduino" },
      { title: "Built an intuitive interface to tune fuzzy parameters and visualize rule outputs" }
    ],
    link: "https://fuzzy-logic-simulation.vercel.app/",
    image: "/project/portfolio2.png",
  },
  {
    company: "Prototype Development for Healthcare",
    year: "2025",
    title: "Disease Diagnosis System",
    results: [
      { title: "Developed neural network model for disease classification using synthetic data" },
      { title: "Achieved 90%+ accuracy across 5-fold cross-validation" },
      { title: "Built interactive GUI with Tkinter for user-friendly diagnosis flow" },
      { title: "Visualized training performance with real-time accuracy graphs" }
    ],
    link: "https://github.com/Zenn711/disease-diagnosis-system.git",
    image: "/project/portfolio3.png",
  },
];

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced scroll tracking for animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax values for different elements
  const opacityGradientTop = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacityGradientBottom = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section 
      id="works" 
      ref={sectionRef}
      className="py-12 md:py-24 lg:py-32 overflow-hidden relative" // Reduced padding on mobile
    >
      {/* White grid background */}
      <div className="absolute inset-0 z-0">
        {/* White grid pattern with higher contrast - now static (no scroll effect) */}
        <div className="absolute inset-0 pointer-events-none grid-background" />
        
        {/* Enhanced top gradient fade with smoother transition */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none fade-transition"
          style={{ opacity: opacityGradientTop }}
        />
        
        {/* Enhanced bottom gradient fade with smoother transition */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none fade-transition"
          style={{ opacity: opacityGradientBottom }}
        />

        {/* Ambient glow spots with enhanced visibility */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-900/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-blue-900/20 blur-[100px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16"> {/* Reduced margin on mobile */}
          <motion.p 
            className="text-xs md:text-sm uppercase tracking-widest text-amber-200 font-medium mb-1 md:mb-2" // Reduced size and margin on mobile
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Selected Projects
          </motion.p>
          
          <motion.h2 
            className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4" // Reduced size and margin on mobile
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Work
          </motion.h2>
          
          <motion.p 
            className="text-sm md:text-lg text-white/70" // Reduced size on mobile
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore my portfolio of innovative digital solutions designed for results
          </motion.p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Card container with stacking perspective */}
          <div 
            className="relative w-full mx-auto"
            style={{
              maxWidth: '1200px',
              minHeight: '500px', // Reduced height for better mobile display
              perspective: '1000px'
            }}
          >
            {/* Stacked cards with reversed order so first card appears at bottom */}
            {[...portfolioProjects].reverse().map((project, reversedIndex) => {
              // Calculate the original index (since we reversed the array)
              const originalIndex = portfolioProjects.length - 1 - reversedIndex;
              
              return (
                <ProjectCard 
                  key={originalIndex} 
                  project={project} 
                  index={reversedIndex}
                  scrollY={0} // Pass 0 as scrollY to make elements static
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;