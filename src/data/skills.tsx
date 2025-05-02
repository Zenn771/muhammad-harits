
import React from 'react';
import { Brain, Cpu, Zap, Layers, Code } from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'ai' | 'electrical' | 'web';
  icon: React.ElementType;
}

export const skills = [
  // AI Skills
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    level: 90,
    category: 'ai',
    icon: Brain
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    level: 85,
    category: 'ai',
    icon: Brain
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    level: 80,
    category: 'ai',
    icon: Brain
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    level: 75,
    category: 'ai',
    icon: Brain
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    level: 65,
    category: 'ai',
    icon: Brain
  },
  
  // Electrical Engineering Skills
  {
    id: 'circuit-design',
    name: 'Circuit Design',
    level: 85,
    category: 'electrical',
    icon: Cpu
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    level: 80,
    category: 'electrical',
    icon: Cpu
  },
  {
    id: 'signal-processing',
    name: 'Signal Processing',
    level: 75,
    category: 'electrical',
    icon: Zap
  },
  {
    id: 'power-electronics',
    name: 'Power Electronics',
    level: 70,
    category: 'electrical',
    icon: Zap
  },
  {
    id: 'control-systems',
    name: 'Control Systems',
    level: 80,
    category: 'electrical',
    icon: Layers
  },
  
  // Web Programming Skills - New Category
  {
    id: 'react',
    name: 'React',
    level: 90,
    category: 'web',
    icon: Code
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    level: 85,
    category: 'web',
    icon: Code
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 80,
    category: 'web',
    icon: Code
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 85,
    category: 'web',
    icon: Code
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    level: 95,
    category: 'web',
    icon: Code
  }
];
