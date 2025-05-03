
import { 
  Code2, 
  Cpu, 
  Book, 
  Music, 
  Zap, 
  Lightbulb,
  Github
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
    title: "AI & Machine Learning",
    description: "Passionate about developing intelligent systems and neural networks, constantly exploring the boundaries of what AI can achieve in solving complex real-world problems.",
    icon: Cpu,
    gradient: "from-violet-900/40 to-indigo-900/20",
    delay: 0,
    sizeClasses: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    title: "Electrical Engineering",
    description: "Designing and optimizing electrical systems with precision and innovation. I love working with hardware components and creating integrated solutions.",
    icon: Zap,
    gradient: "from-amber-800/40 to-orange-700/20",
    delay: 1,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Innovation",
    description: "Always seeking creative solutions to complex problems. I believe in thinking outside the box and challenging conventional approaches.",
    icon: Lightbulb,
    gradient: "from-yellow-700/40 to-amber-800/20",
    delay: 2,
    sizeClasses: "col-span-1 row-span-1"
  },
  {
    title: "Programming",
    description: "From embedded systems to high-level applications, I enjoy the creative process of coding and bringing ideas to life through software development and algorithm optimization.",
    icon: Code2,
    gradient: "from-emerald-800/40 to-green-900/20",
    delay: 3,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1 md:row-span-2"
  },
  {
    title: "Reading",
    description: "I'm an avid reader with a particular interest in books about science, philosophy, history, and finance/investment. Reading helps me gain new perspectives and insights applicable to my work and life.",
    icon: Book,
    gradient: "from-purple-800/40 to-fuchsia-900/20",
    delay: 4,
    sizeClasses: "col-span-1 md:col-span-2 row-span-1",
    quote: {
      text: "The most important investment you can make is in yourself.",
      author: "Warren Buffett",
      source: "The Essays of Warren Buffett"
    }
  },
  {
    title: "Music Appreciation",
    description: "A lifelong love for diverse musical genres helps me maintain creative balance. I find parallels between musical patterns and engineering systems.",
    icon: Music,
    gradient: "from-rose-800/40 to-pink-900/20",
    delay: 5,
    sizeClasses: "col-span-1 row-span-1"
  },
  {
    title: "GitHub Contributions",
    description: "A visual representation of my commitment to open-source projects and continuous development. Each contribution represents a step toward building better software.",
    icon: Github,
    gradient: "from-gray-700/40 to-gray-800/20",
    delay: 6,
    sizeClasses: "col-span-1 md:col-span-3 row-span-1"
  }
];
