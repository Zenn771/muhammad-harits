
import { Briefcase, GraduationCap } from "lucide-react";

export interface TimelineItem {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  iconType: "briefcase" | "graduation-cap"; // Changed from icon: React.ReactNode
  type: "work" | "education";
  color: string;
}

// Career timeline data
export const careerData: TimelineItem[] = [
  {
    id: 1,
    year: "2023 - Present",
    role: "Senior AI Research Engineer",
    company: "Future Tech Labs",
    description: "Leading research in advanced neural networks and machine learning algorithms for next-generation AI applications. Specializing in natural language processing and computer vision integration.",
    skills: ["Machine Learning", "Neural Networks", "Computer Vision", "Research Leadership"],
    iconType: "briefcase", // Changed from JSX to string identifier
    type: "work",
    color: "from-blue-900/30 to-cyan-900/10",
  },
  {
    id: 2,
    year: "2021 - 2023",
    role: "AI Developer & Electrical Engineer",
    company: "Innovate Systems",
    description: "Developed integrated solutions combining electrical engineering expertise with AI capabilities. Created smart systems with embedded machine learning for industrial applications.",
    skills: ["Embedded Systems", "AI Integration", "Circuit Design", "IoT"],
    iconType: "briefcase",
    type: "work",
    color: "from-purple-900/30 to-indigo-900/10",
  },
  {
    id: 3,
    year: "2020",
    role: "Advanced Certification",
    company: "AI Institute",
    description: "Received specialized certification in Deep Learning and Neural Network Architectures, focusing on practical applications in real-world scenarios.",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch"],
    iconType: "graduation-cap",
    type: "education",
    color: "from-amber-900/30 to-yellow-900/10",
  },
  {
    id: 4,
    year: "2018 - 2021",
    role: "Electrical Systems Engineer",
    company: "PowerTech Solutions",
    description: "Designed and implemented electrical systems for commercial and industrial applications. Led a team of junior engineers in creating innovative power management solutions.",
    skills: ["Electrical Design", "Project Management", "Team Leadership", "Power Systems"],
    iconType: "briefcase",
    type: "work",
    color: "from-green-900/30 to-emerald-900/10",
  },
  {
    id: 5,
    year: "2014 - 2018",
    role: "B.S. Electrical Engineering & Computer Science",
    company: "Tech University",
    description: "Dual degree program with focus on electrical engineering fundamentals and advanced computer science concepts. Graduated with honors.",
    skills: ["Electrical Engineering", "Computer Science", "Algorithm Design", "Circuit Theory"],
    iconType: "graduation-cap",
    type: "education",
    color: "from-orange-900/30 to-red-900/10",
  }
];
