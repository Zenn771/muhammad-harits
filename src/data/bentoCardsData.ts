import { 
  Code2, 
  Cpu, 
  Book, 
  Zap, 
  Sprout
} from 'lucide-react';

export interface BentoCardData {
  title: string;
  description: string;
  icon: typeof Code2;
  gradient: string;
  delay: number;
  sizeClasses: string;
  quote?: {
    text: string;
    author: string;
    source: string;
  };
}

export const bentoCardsData: BentoCardData[] = [
  {
    title: "I Build Smart Systems",
    description: "I focus on building intelligent systems, particularly in model training and NLP, to solve real-world problems through automation and decision-making.",
    icon: Cpu,
    gradient: "from-violet-900/40 to-indigo-900/20",
    delay: 0,
    sizeClasses: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    title: "I Spark Physical Solutions",
    description: "I’m passionate about hands-on work with microcontrollers, sensors, schematics, and PCB design to create functional systems that interact with the physical world.",
    icon: Zap,
    gradient: "from-amber-800/40 to-orange-700/20",
    delay: 1,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "I Create with Code",
    description: "Coding is how I bring ideas to life, whether for automation, data processing, or interactive systems.",
    icon: Code2,
    gradient: "from-emerald-800/40 to-green-900/20",
    delay: 2,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "I Find Inspiration in Books",
    description: "Books inspire me, especially Man’s Search for Meaning by Viktor E. Frankl, which deepened my understanding of purpose and perseverance.",
    icon: Book,
    gradient: "from-purple-800/40 to-fuchsia-900/20",
    delay: 3,
    sizeClasses: "col-span-1 md:col-span-3 row-span-1",
    quote: {
      text: "The most important investment you can make is in yourself.",
      author: "Warren Buffett",
      source: "The Essays of WarrenBuffett"
    }
  },
  {
    title: "I Want to Change the World",
    description: "I aspire to build technology that makes a difference. From AI-driven tools for education to sustainable engineering solutions, my goal is to create projects that solve real problems and improve lives.",
    icon: Sprout,
    gradient: "from-cyan-800/40 to-blue-900/20",
    delay: 4,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1"
  }
];