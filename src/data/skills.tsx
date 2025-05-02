
import { Activity, Brain, Chip, Code, Database, Flask, Hammer, LineChart, Layers, Radio, Network, Wrench, Cpu, Zap, Bot, Terminal } from 'lucide-react';

export type Skill = {
  name: string;
  icon: React.ElementType;
  level: string;
  category: "ai" | "web" | "electrical";
  color: "amber" | "blue" | "green" | "purple" | "red";
};

export const skills: Skill[] = [
  // AI & Machine Learning Skills
  {
    name: "Machine Learning",
    icon: Brain,
    level: "Expert",
    category: "ai",
    color: "purple"
  },
  {
    name: "Deep Learning",
    icon: Network,
    level: "Expert",
    category: "ai",
    color: "blue"
  },
  {
    name: "Computer Vision",
    icon: Activity,
    level: "Advanced",
    category: "ai",
    color: "amber"
  },
  {
    name: "NLP",
    icon: Terminal,
    level: "Advanced",
    category: "ai",
    color: "green"
  },
  {
    name: "TensorFlow",
    icon: Database,
    level: "Expert",
    category: "ai",
    color: "red"
  },
  {
    name: "PyTorch",
    icon: Flask,
    level: "Advanced",
    category: "ai",
    color: "amber"
  },
  
  // Web Development Skills
  {
    name: "React",
    icon: Code,
    level: "Expert",
    category: "web",
    color: "blue"
  },
  {
    name: "JavaScript",
    icon: Layers,
    level: "Expert",
    category: "web",
    color: "amber"
  },
  {
    name: "Node.js",
    icon: Terminal,
    level: "Advanced",
    category: "web",
    color: "green"
  },
  {
    name: "TypeScript",
    icon: Code,
    level: "Advanced",
    category: "web",
    color: "blue"
  },
  {
    name: "GraphQL",
    icon: Database,
    level: "Intermediate",
    category: "web",
    color: "purple"
  },
  {
    name: "Tailwind CSS",
    icon: Layers,
    level: "Advanced",
    category: "web",
    color: "blue"
  },
  
  // Electrical Engineering Skills
  {
    name: "PCB Design",
    icon: Chip,
    level: "Expert",
    category: "electrical",
    color: "green"
  },
  {
    name: "Microcontrollers",
    icon: Cpu,
    level: "Expert",
    category: "electrical",
    color: "blue"
  },
  {
    name: "Circuit Design",
    icon: Zap,
    level: "Advanced",
    category: "electrical",
    color: "amber"
  },
  {
    name: "Signal Processing",
    icon: LineChart,
    level: "Advanced",
    category: "electrical",
    color: "purple"
  },
  {
    name: "Embedded Systems",
    icon: Bot,
    level: "Expert",
    category: "electrical",
    color: "red"
  },
  {
    name: "Power Electronics",
    icon: Wrench,
    level: "Intermediate",
    category: "electrical",
    color: "amber"
  }
];
