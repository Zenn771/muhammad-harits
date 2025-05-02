
import React from 'react';
import { 
  Brain, 
  Network, 
  Camera, 
  Microscope,
  Database, 
  Cpu, 
  Zap, 
  Layers, 
  Settings, 
  Code, 
  FileCode,
  Wind,
  Hammer,
  Server,
  Workflow
} from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'ai' | 'electrical' | 'web';
  icon: React.ElementType;
  iconColor?: string;
}

export const skills: Skill[] = [
  // AI Skills
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    level: 90,
    category: 'ai',
    icon: Brain,
    iconColor: '#9b87f5'
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    level: 85,
    category: 'ai',
    icon: Network,
    iconColor: '#D946EF'
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    level: 80,
    category: 'ai',
    icon: Camera,
    iconColor: '#0EA5E9'
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    level: 75,
    category: 'ai',
    icon: FileCode,
    iconColor: '#F97316'
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    level: 65,
    category: 'ai',
    icon: Workflow,
    iconColor: '#8B5CF6'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    level: 85,
    category: 'ai',
    icon: Database,
    iconColor: '#33C3F0'
  },
  
  // Electrical Engineering Skills
  {
    id: 'circuit-design',
    name: 'Circuit Design',
    level: 85,
    category: 'electrical',
    icon: Cpu,
    iconColor: '#ea384c'
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    level: 80,
    category: 'electrical',
    icon: Microscope,
    iconColor: '#7E69AB'
  },
  {
    id: 'signal-processing',
    name: 'Signal Processing',
    level: 75,
    category: 'electrical',
    icon: Zap,
    iconColor: '#F97316'
  },
  {
    id: 'power-electronics',
    name: 'Power Electronics',
    level: 70,
    category: 'electrical',
    icon: Zap,
    iconColor: '#FEC6A1'
  },
  {
    id: 'control-systems',
    name: 'Control Systems',
    level: 80,
    category: 'electrical',
    icon: Settings,
    iconColor: '#0FA0CE'
  },
  {
    id: 'pcb-design',
    name: 'PCB Design',
    level: 75,
    category: 'electrical',
    icon: Layers,
    iconColor: '#6E59A5'
  },
  
  // Web Programming Skills
  {
    id: 'react',
    name: 'React',
    level: 90,
    category: 'web',
    icon: Code,
    iconColor: '#61DAFB'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    level: 85,
    category: 'web',
    icon: Wind,
    iconColor: '#38BDF8'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 80,
    category: 'web',
    icon: Server,
    iconColor: '#000000'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 85,
    category: 'web',
    icon: Code,
    iconColor: '#3178C6'
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    level: 95,
    category: 'web',
    icon: FileCode,
    iconColor: '#E34F26'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 80,
    category: 'web',
    icon: Hammer,
    iconColor: '#339933'
  }
];
