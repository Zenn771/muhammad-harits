
import { 
  Code2, 
  Cpu, 
  Book, 
  Music, 
  Zap, 
  Lightbulb,
  Rocket
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
    gradient: "from-blue-900/30 to-cyan-900/10",
    delay: 0,
    sizeClasses: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    title: "Electrical Engineering",
    description: "Designing and optimizing electrical systems with precision and innovation. I love working with hardware components and creating integrated solutions.",
    icon: Zap,
    gradient: "from-amber-900/30 to-yellow-900/10",
    delay: 1,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Innovation",
    description: "Always seeking creative solutions to complex problems. I believe in thinking outside the box and challenging conventional approaches.",
    icon: Lightbulb,
    gradient: "from-yellow-900/30 to-amber-900/10",
    delay: 2,
    sizeClasses: "col-span-1 row-span-1"
  },
  {
    title: "Programming",
    description: "From embedded systems to high-level applications, I enjoy the creative process of coding and bringing ideas to life through software development and algorithm optimization.",
    icon: Code2,
    gradient: "from-green-900/30 to-emerald-900/10",
    delay: 3,
    sizeClasses: "col-span-1 md:col-span-1 row-span-1 md:row-span-2"
  },
  {
    title: "Reading",
    description: "I'm an avid reader with a particular interest in books about science, philosophy, history, and finance/investment. Reading helps me gain new perspectives and insights applicable to my work and life.",
    icon: Book,
    gradient: "from-purple-900/30 to-indigo-900/10",
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
    gradient: "from-purple-900/30 to-indigo-900/10",
    delay: 5,
    sizeClasses: "col-span-1 row-span-1"
  },
  {
    title: "Future Tech",
    description: "Exploring emerging technologies and envisioning how they'll shape our future. I'm particularly interested in sustainable tech solutions and their real-world applications.",
    icon: Rocket,
    gradient: "from-sky-900/30 to-blue-900/10",
    delay: 6,
    sizeClasses: "col-span-1 md:col-span-3 row-span-1"
  }
];
