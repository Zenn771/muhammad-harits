import { Briefcase, GraduationCap } from "lucide-react";

export interface TimelineItem {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  iconType: "briefcase" | "graduation-cap";
  type: "work" | "education";
  color: string;
}

export const careerData: TimelineItem[] = [
  {
    id: 1,
    year: "Aug 2023 – Present",
    role: "B.Eng in Instrumentation and Control Engineering",
    company: "Universitas Gadjah Mada",
    description:
      "Pursuing a bachelor's degree with a focus on instrumentation systems, automation, IoT, and machine learning for industrial applications.",
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
      "Conducted research on over 50 global scholarship programs, developed guides, and facilitated online workshops for more than 200 participants on application writing.",
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
      "Installed solar-powered water pumps for 20 households in a remote village, enhancing access to clean water. Provided training to local residents on system maintenance, fostering sustainable community empowerment.",
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
      "Coordinated over 50 participants during UGM's orientation program and designed leadership and character development modules.",
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
      "Developed a soil moisture monitoring system integrated with a mobile application, enabling farmers to optimize irrigation and increase crop yield by 15% in a pilot test. Led the team to the national finals.",
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
      "Leading the development of an AI-powered waste sorting system using computer vision to identify recyclable materials, achieving 85% accuracy in early tests. Planning to pitch the solution to local recycling startups by mid-2025.",
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
      "Earned international certifications in AI, calculus, and data science from prestigious institutions.",
    skills: ["AI", "Calculus", "Data Science", "TensorFlow"],
    iconType: "graduation-cap",
    type: "education",
    color: "from-orange-900/30 to-red-900/10",
  },
];