import type {
  HeroData,
  AboutData,
  EducationItem,
  ExperienceItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  MedalItem,
  ContactData,
} from "./types";

export const fallbackHero: HeroData = {
  title: "Satyam Chandra",
  subtitle: "Full-Stack Developer & Competitive Programmer",
  description:
    "Building high-performance web applications and solving complex algorithmic challenges. Passionate about clean code, system design, and pushing the boundaries of what's possible on the web.",
  ctaText: "View My Work",
  ctaLink: "#projects",
  resumeUrl: "#",
};

export const fallbackAbout: AboutData = {
  bio: "I'm a passionate full-stack developer with expertise in building scalable web applications using modern technologies. My journey in tech started with competitive programming, which honed my problem-solving skills and algorithmic thinking. Today, I combine that analytical mindset with creative frontend development and robust backend architecture to deliver exceptional digital experiences.",
  details: [
    "Experienced in React, Next.js, Node.js, and cloud technologies",
    "Active competitive programmer with strong DSA fundamentals",
    "Open source contributor and tech community enthusiast",
    "Constantly learning and adapting to new technologies",
  ],
};

export const fallbackEducation: EducationItem[] = [
  {
    id: "1",
    institution: "National Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2021 - 2025",
    description:
      "Focused on algorithms, data structures, system design, and full-stack development. Active in coding clubs and hackathons.",
    grade: "8.5 CGPA",
    order: 0,
  },
  {
    id: "2",
    institution: "Senior Secondary School",
    degree: "Higher Secondary (PCM + CS)",
    period: "2019 - 2021",
    description:
      "Mathematics and Computer Science stream. National-level science olympiad participant.",
    grade: "95%",
    order: 1,
  },
];

export const fallbackExperience: ExperienceItem[] = [
  {
    id: "1",
    company: "Tech Startup Inc.",
    role: "Full-Stack Developer Intern",
    period: "Jun 2024 - Aug 2024",
    description:
      "Built and deployed microservices architecture for the core product. Improved API response times by 40% through query optimization and caching strategies. Collaborated with a team of 8 engineers using agile methodology.",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    order: 0,
  },
  {
    id: "2",
    company: "Open Source Project",
    role: "Core Contributor",
    period: "Jan 2024 - Present",
    description:
      "Contributing to major open-source projects in the JavaScript ecosystem. Implemented new features, fixed bugs, and improved documentation for community tools used by thousands of developers.",
    techStack: ["TypeScript", "Next.js", "GraphQL", "CI/CD"],
    order: 1,
  },
];

export const fallbackSkills: SkillCategory[] = [
  {
    id: "1",
    category: "Frontend",
    items: [
      { name: "React / Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Tailwind CSS", proficiency: 92 },
      { name: "Three.js / R3F", proficiency: 75 },
      { name: "Framer Motion", proficiency: 80 },
    ],
    order: 0,
  },
  {
    id: "2",
    category: "Backend",
    items: [
      { name: "Node.js / Express", proficiency: 88 },
      { name: "Python / FastAPI", proficiency: 80 },
      { name: "PostgreSQL", proficiency: 82 },
      { name: "MongoDB", proficiency: 78 },
      { name: "Firebase", proficiency: 85 },
    ],
    order: 1,
  },
  {
    id: "3",
    category: "DevOps & Tools",
    items: [
      { name: "Git / GitHub", proficiency: 90 },
      { name: "Docker", proficiency: 75 },
      { name: "AWS / Vercel", proficiency: 80 },
      { name: "Linux", proficiency: 78 },
      { name: "CI/CD", proficiency: 72 },
    ],
    order: 2,
  },
  {
    id: "4",
    category: "Competitive Programming",
    items: [
      { name: "Data Structures", proficiency: 92 },
      { name: "Algorithms", proficiency: 88 },
      { name: "C++ / STL", proficiency: 90 },
      { name: "Problem Solving", proficiency: 95 },
    ],
    order: 3,
  },
];

export const fallbackProjects: ProjectItem[] = [
  {
    id: "1",
    title: "AI-Powered Code Reviewer",
    description:
      "A web application that uses large language models to review code, suggest improvements, and detect potential bugs. Features real-time collaboration and GitHub integration.",
    techStack: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    order: 0,
  },
  {
    id: "2",
    title: "Real-Time Chat Platform",
    description:
      "End-to-end encrypted chat application with video calling, file sharing, and group channels. Built with WebSocket for real-time communication.",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    order: 1,
  },
  {
    id: "3",
    title: "Algorithm Visualizer",
    description:
      "Interactive visualization tool for sorting algorithms, pathfinding, and graph traversals. Helps students understand complex algorithms through animation.",
    techStack: ["React", "D3.js", "TypeScript", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    order: 2,
  },
  {
    id: "4",
    title: "Cloud-Native Task Manager",
    description:
      "A microservices-based task management platform with Kanban boards, time tracking, and team collaboration features deployed on AWS.",
    techStack: ["Next.js", "Go", "gRPC", "Redis", "Docker", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    order: 3,
  },
];

export const fallbackCertifications: CertificationItem[] = [
  {
    id: "1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    order: 0,
  },
  {
    id: "2",
    title: "Meta Frontend Developer Professional",
    issuer: "Meta / Coursera",
    date: "2024",
    credentialUrl: "#",
    order: 1,
  },
  {
    id: "3",
    title: "Google Data Analytics",
    issuer: "Google / Coursera",
    date: "2023",
    credentialUrl: "#",
    order: 2,
  },
];

export const fallbackMedals: MedalItem[] = [
  {
    id: "1",
    platform: "LeetCode",
    achievement: "Knight Badge",
    description: "Top 5% globally with 500+ problems solved",
    color: "#fbbf24",
    order: 0,
  },
  {
    id: "2",
    platform: "CodeChef",
    achievement: "5-Star Coder",
    description: "Rating 2100+ with consistent performance in rated contests",
    color: "#8b5cf6",
    order: 1,
  },
  {
    id: "3",
    platform: "Codeforces",
    achievement: "Expert",
    description: "Rating 1600+ achieved through competitive programming contests",
    color: "#06b6d4",
    order: 2,
  },
  {
    id: "4",
    platform: "HackerRank",
    achievement: "Gold Badge",
    description: "Gold badges in Problem Solving, C++, and Python domains",
    color: "#22c55e",
    order: 3,
  },
  {
    id: "5",
    platform: "GitHub",
    achievement: "Arctic Code Vault",
    description: "Contributor to the Arctic Code Vault with active open source contributions",
    color: "#e2e8f0",
    order: 4,
  },
];

export const fallbackContact: ContactData = {
  email: "satyam@example.com",
  phone: "+91-XXXXXXXXXX",
  location: "India",
  socials: {
    github: "https://github.com/satyamchandra",
    linkedin: "https://linkedin.com/in/satyamchandra",
    twitter: "https://twitter.com/satyamchandra",
    leetcode: "https://leetcode.com/satyamchandra",
    codechef: "https://codechef.com/users/satyamchandra",
    codeforces: "https://codeforces.com/profile/satyamchandra",
  },
};
