
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
    year: "Aug 2023 – Present",
    role: "B.Eng in Instrumentation and Control Engineering",
    company: "Universitas Gadjah Mada",
    description:
      "Sedang menempuh gelar sarjana dengan fokus pada sistem instrumentasi, otomasi, IoT, dan machine learning untuk aplikasi industri.",
    skills: ["Instrumentation", "Control Systems", "IoT", "Machine Learning"],
    iconType: "graduation-cap",
    type: "education",
    color: "from-green-900/30 to-emerald-900/10",
  },
  {
    id: 2,
    year: "Feb 2024 – May 2024",
    role: "Academic Development Specialist",
    company: "Candidate College (Remote)",
    description:
      "Meneliti 50+ program beasiswa global, membuat panduan, dan mengadakan workshop daring untuk 200+ peserta tentang penulisan aplikasi.",
    skills: ["Research", "Scholarship Mentoring", "Public Speaking", "Content Writing"],
    iconType: "briefcase",
    type: "work",
    color: "from-purple-900/30 to-indigo-900/10",
  },
  {
    id: 3,
    year: "Apr 2024 – May 2024",
    role: "Solar Energy Volunteer",
    company: "Energi untuk Desa",
    description:
      "Installed solar-powered water pumps for 20 households in a remote village, improving access to clean water. Trained locals to maintain the systems, empowering the community for sustainable impact.",
    skills: ["Renewable Energy", "Community Service", "Technical Training"],
    iconType: "briefcase",
    type: "work",
    color: "from-lime-900/30 to-green-900/10",
  }, 
  {
    id: 4,
    year: "May 2024 – Aug 2024",
    role: "Co-Facilitator",
    company: "Pionir Gadjah Mada (PPSMB UGM)",
    description:
      "Mengkoordinasikan 50+ peserta selama orientasi UGM dan merancang modul kepemimpinan serta pengembangan karakter.",
    skills: ["Facilitation", "Leadership", "Event Coordination"],
    iconType: "briefcase",
    type: "work",
    color: "from-amber-900/30 to-yellow-900/10",
  },
  {
    id: 5,
    year: "Nov 2024 – Dec 2024",
    role: "Smart Agriculture Innovator",
    company: "National Agritech Challenge",
    description:
      "Developed a soil moisture monitoring system integrated with a mobile app, helping farmers optimize irrigation and boost crop yield by 15% in a pilot test. My team advanced to the national finals.",
    skills: ["IoT", "Mobile App Development", "Agritech", "Data Visualization"],
    iconType: "briefcase",
    type: "work",
    color: "from-green-900/30 to-emerald-900/10",
  },
  {
    id: 6,
    year: "Jan 2025 – Present",
    role: "AI Vision Project Lead",
    company: "Independent Research",
    description:
      "Building an AI-powered waste sorting system using computer vision to identify recyclable materials. Early tests achieved 85% accuracy, with plans to pitch to local recycling startups by mid-2025.",
    skills: ["Computer Vision", "AI", "YOLO", "Project Management"],
    iconType: "briefcase",
    type: "work",
    color: "from-cyan-900/30 to-blue-900/10",
  },
  {
    id: 7,
    year: "2024 – 2025",
    role: "Certified in AI & Data Science",
    company: "IBM, University of Pennsylvania, Dicoding",
    description:
      "Memperoleh sertifikasi internasional di bidang AI, kalkulus, dan data science dari institusi ternama.",
    skills: ["AI", "Calculus", "Data Science", "TensorFlow"],
    iconType: "graduation-cap",
    type: "education",
    color: "from-orange-900/30 to-red-900/10",
  },
];
