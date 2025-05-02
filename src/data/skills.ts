
import React from "react";
import {
  Code,
  Cpu,
  Layers,
  Database,
  Eye,
  BarChart,
  Zap,
  Brain,
  CircuitBoard,
  FlaskRound,
  MessageSquareCode,
} from "lucide-react";

export interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "ai" | "electrical";
  proficiency: number; // 1-100
}

export const skills: Skill[] = [
  // AI Skills
  {
    name: "Python",
    icon: <Code className="h-6 w-6" />,
    category: "ai",
    proficiency: 90,
  },
  {
    name: "TensorFlow",
    icon: <Database className="h-6 w-6" />,
    category: "ai",
    proficiency: 85,
  },
  {
    name: "PyTorch",
    icon: <FlaskRound className="h-6 w-6" />,
    category: "ai",
    proficiency: 80,
  },
  {
    name: "NLP",
    icon: <MessageSquareCode className="h-6 w-6" />,
    category: "ai",
    proficiency: 75,
  },
  {
    name: "Computer Vision",
    icon: <Eye className="h-6 w-6" />,
    category: "ai",
    proficiency: 85,
  },
  {
    name: "Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    category: "ai",
    proficiency: 90,
  },

  // Electrical Engineering Skills
  {
    name: "Circuit Design",
    icon: <CircuitBoard className="h-6 w-6" />,
    category: "electrical",
    proficiency: 95,
  },
  {
    name: "PCB Layout",
    icon: <Layers className="h-6 w-6" />,
    category: "electrical",
    proficiency: 85,
  },
  {
    name: "Microcontrollers",
    icon: <Cpu className="h-6 w-6" />,
    category: "electrical",
    proficiency: 90,
  },
  {
    name: "Instrumentation",
    icon: <Code className="h-6 w-6" />,
    category: "electrical",
    proficiency: 80,
  },
  {
    name: "Signal Processing",
    icon: <BarChart className="h-6 w-6" />,
    category: "electrical",
    proficiency: 85,
  },
  {
    name: "Power Systems",
    icon: <Zap className="h-6 w-6" />,
    category: "electrical",
    proficiency: 90,
  },
];
