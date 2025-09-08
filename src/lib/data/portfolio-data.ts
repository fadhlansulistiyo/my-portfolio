import { ProjectData } from "@/components/portfolio/project-card"
import { SkillData } from "@/components/portfolio/skill-badge"
import { TimelineData } from "@/components/portfolio/timeline-item"

// Personal Information
export const personalInfo = {
  name: "Your Name",
  title: "Full-Stack Developer",
  subtitle: "Passionate about creating innovative digital experiences",
  location: "Your City, Country",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  summary: `Experienced full-stack developer with 5+ years of building scalable web applications. 
    Passionate about clean code, user experience, and staying current with emerging technologies. 
    Strong background in both frontend and backend development with a focus on modern web technologies.`,
  
  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourusername",
    portfolio: "https://yourportfolio.com",
    resume: "/resume.pdf"
  }
}

// Skills Data
export const skillsData: SkillData[] = [
  // Frontend Technologies
  {
    name: "React",
    category: "frontend",
    proficiency: 5,
    experience: "4 years",
    description: "Advanced React development with hooks, context, and modern patterns",
    projects: 15
  },
  {
    name: "Next.js",
    category: "frontend", 
    proficiency: 5,
    experience: "3 years",
    description: "Full-stack React framework with SSR, SSG, and API routes",
    projects: 10
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 4,
    experience: "3 years",
    description: "Type-safe JavaScript with advanced typing patterns",
    projects: 12
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 5,
    experience: "5 years",
    description: "Modern ES6+ JavaScript with functional programming concepts",
    projects: 20
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 5,
    experience: "2 years",
    description: "Utility-first CSS framework for rapid UI development",
    projects: 8
  },
  {
    name: "HTML/CSS",
    category: "frontend",
    proficiency: 5,
    experience: "5 years",
    description: "Semantic HTML and modern CSS with animations and responsive design",
    projects: 25
  },

  // Backend Technologies
  {
    name: "Node.js",
    category: "backend",
    proficiency: 4,
    experience: "4 years",
    description: "Server-side JavaScript with Express, Koa, and serverless functions",
    projects: 12
  },
  {
    name: "Python",
    category: "backend",
    proficiency: 4,
    experience: "3 years",
    description: "Backend development with Django, FastAPI, and data processing",
    projects: 8
  },
  {
    name: "GraphQL",
    category: "backend",
    proficiency: 3,
    experience: "2 years",
    description: "API development with Apollo Server and client-side integration",
    projects: 5
  },
  {
    name: "REST APIs",
    category: "backend",
    proficiency: 5,
    experience: "4 years",
    description: "RESTful API design, documentation, and best practices",
    projects: 15
  },

  // Database Technologies
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 4,
    experience: "3 years",
    description: "Relational database design, optimization, and complex queries",
    projects: 10
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 3,
    experience: "2 years",
    description: "NoSQL document database with aggregation pipelines",
    projects: 6
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 3,
    experience: "2 years",
    description: "Caching, session storage, and real-time features",
    projects: 7
  },

  // DevOps & Tools
  {
    name: "Docker",
    category: "devops",
    proficiency: 4,
    experience: "3 years",
    description: "Containerization, multi-stage builds, and orchestration",
    projects: 10
  },
  {
    name: "AWS",
    category: "devops",
    proficiency: 3,
    experience: "2 years",
    description: "Cloud services including EC2, S3, Lambda, and RDS",
    projects: 6
  },
  {
    name: "Git",
    category: "tools",
    proficiency: 5,
    experience: "5 years",
    description: "Version control, branching strategies, and collaboration workflows",
    projects: 25
  },
  {
    name: "Figma",
    category: "tools",
    proficiency: 3,
    experience: "2 years",
    description: "UI/UX design, prototyping, and design system creation",
    projects: 8
  }
]

// Timeline Data
export const timelineData: TimelineData[] = [
  {
    id: "current-role",
    title: "Senior Full-Stack Developer",
    company: "Tech Company Inc.",
    location: "San Francisco, CA",
    type: "work",
    startDate: new Date("2022-01-15"),
    endDate: "present",
    current: true,
    description: "Leading development of scalable web applications serving 100K+ users. Architecting microservices and implementing modern development practices.",
    highlights: [
      "Led migration from monolith to microservices architecture, improving system scalability by 300%",
      "Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes",
      "Mentored 3 junior developers and established code review processes",
      "Designed and built real-time analytics dashboard processing 1M+ events daily"
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    url: "https://techcompany.com"
  },
  {
    id: "mid-level",
    title: "Full-Stack Developer",
    company: "StartupCorp",
    location: "Austin, TX",
    type: "work",
    startDate: new Date("2020-03-01"),
    endDate: new Date("2021-12-31"),
    description: "Developed customer-facing web applications and internal tools. Collaborated with design team to create responsive user interfaces.",
    highlights: [
      "Built e-commerce platform handling $2M+ in annual transactions",
      "Optimized application performance resulting in 40% faster load times",
      "Integrated third-party APIs for payment processing and inventory management",
      "Contributed to open-source projects and internal component library"
    ],
    skills: ["React", "Python", "Django", "PostgreSQL", "Redis", "Stripe API"],
    url: "https://startupcorp.com"
  },
  {
    id: "junior-dev",
    title: "Junior Web Developer",
    company: "Digital Agency",
    location: "Remote",
    type: "work", 
    startDate: new Date("2019-06-01"),
    endDate: new Date("2020-02-28"),
    description: "Created responsive websites and web applications for various clients. Gained experience with modern web technologies and agile development practices.",
    highlights: [
      "Delivered 15+ client projects on time and within budget",
      "Improved website performance scores by average of 25 points",
      "Collaborated with designers to pixel-perfect implementations",
      "Learned modern JavaScript frameworks and development workflows"
    ],
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "MySQL"]
  },
  {
    id: "education",
    title: "Bachelor of Science in Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    type: "education",
    startDate: new Date("2015-09-01"),
    endDate: new Date("2019-05-31"),
    description: "Comprehensive computer science education with focus on software engineering, algorithms, and data structures. Graduated Cum Laude with 3.7 GPA.",
    highlights: [
      "Dean's List for 6 consecutive semesters",
      "Led university hackathon team to 2nd place finish",
      "Teaching Assistant for Data Structures and Algorithms course",
      "Senior capstone project on machine learning applications"
    ],
    skills: ["Java", "C++", "Python", "Algorithms", "Data Structures", "Mathematics"]
  }
]

// Projects Data
export const projectsData: ProjectData[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    longDescription: `A comprehensive e-commerce platform built with modern web technologies. Features include 
      real-time inventory management, secure payment processing, order tracking, and a powerful admin dashboard. 
      The platform handles thousands of concurrent users and processes millions in transactions.`,
    image: "https://via.placeholder.com/600x400/1f2937/ffffff?text=E-Commerce+Platform",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "Docker"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
    category: "fullstack",
    status: "completed",
    year: 2023
  },
  {
    id: "task-management",
    title: "Project Management Tool",
    description: "Collaborative project management application with real-time updates, team chat, and analytics.",
    longDescription: `A modern project management tool designed for remote teams. Features real-time collaboration, 
      task tracking, time management, team communication, and detailed analytics. Built with focus on user 
      experience and performance.`,
    image: "https://via.placeholder.com/600x400/374151/ffffff?text=Project+Management+Tool", 
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT", "Tailwind CSS"],
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    featured: true,
    category: "fullstack",
    status: "completed",
    year: 2023
  },
  {
    id: "weather-app",
    title: "Weather Dashboard",
    description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.",
    longDescription: `A comprehensive weather dashboard featuring location-based forecasts, interactive weather maps, 
      historical data analysis, and weather alerts. Integrates with multiple weather APIs for accurate and 
      up-to-date information.`,
    image: "https://via.placeholder.com/600x400/4b5563/ffffff?text=Weather+Dashboard",
    technologies: ["React", "TypeScript", "Weather API", "Mapbox", "Chart.js", "PWA"],
    liveUrl: "https://weather-dashboard-demo.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    featured: false,
    category: "web",
    status: "completed",
    year: 2022
  },
  {
    id: "portfolio-v2",
    title: "Previous Portfolio Website",
    description: "My previous portfolio website built with Gatsby and featuring smooth animations and dark mode.",
    longDescription: `My previous portfolio website showcasing my work and skills. Built with Gatsby for optimal 
      performance, featuring smooth animations, dark mode support, and an integrated blog. Achieved perfect 
      Lighthouse scores across all metrics.`,
    image: "https://via.placeholder.com/600x400/6b7280/ffffff?text=Portfolio+Website",
    technologies: ["Gatsby", "React", "GraphQL", "Styled Components", "Framer Motion"],
    liveUrl: "https://portfolio-v2-demo.com",
    githubUrl: "https://github.com/yourusername/portfolio-v2",
    featured: false,
    category: "web",
    status: "completed",
    year: 2022
  },
  {
    id: "mobile-fitness",
    title: "Fitness Tracking App",
    description: "React Native mobile app for fitness tracking with workout plans, progress analytics, and social features.",
    longDescription: `A comprehensive fitness tracking mobile application built with React Native. Features include 
      personalized workout plans, progress tracking, nutrition logging, social challenges, and detailed analytics. 
      Available on both iOS and Android platforms.`,
    image: "https://via.placeholder.com/600x400/9ca3af/ffffff?text=Fitness+Tracking+App",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "TypeScript", "Push Notifications"],
    liveUrl: "https://fitness-app-demo.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    featured: false,
    category: "mobile",
    status: "in-progress",
    year: 2023
  },
  {
    id: "ai-chatbot",
    title: "AI Customer Support Bot",
    description: "Intelligent chatbot powered by OpenAI for automated customer support with conversation analytics.",
    longDescription: `An advanced AI-powered customer support chatbot that handles customer inquiries automatically. 
      Features natural language processing, conversation context awareness, escalation to human agents, and 
      detailed analytics dashboard for performance monitoring.`,
    image: "https://via.placeholder.com/600x400/d1d5db/000000?text=AI+Customer+Support+Bot",
    technologies: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL", "WebSocket"],
    githubUrl: "https://github.com/yourusername/ai-chatbot",
    featured: true,
    category: "fullstack",
    status: "completed",
    year: 2024
  }
]

// Filter categories for projects
export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Applications" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "desktop", label: "Desktop Apps" },
  { value: "other", label: "Other" }
]

// Skill categories for grouping
export const skillCategories = [
  { 
    key: "frontend" as const,
    label: "Frontend Development",
    skills: skillsData.filter(skill => skill.category === "frontend")
  },
  {
    key: "backend" as const, 
    label: "Backend Development",
    skills: skillsData.filter(skill => skill.category === "backend")
  },
  {
    key: "database" as const,
    label: "Databases",
    skills: skillsData.filter(skill => skill.category === "database")
  },
  {
    key: "devops" as const,
    label: "DevOps & Cloud",
    skills: skillsData.filter(skill => skill.category === "devops")
  },
  {
    key: "tools" as const,
    label: "Tools & Software",
    skills: skillsData.filter(skill => skill.category === "tools")
  }
]

// Hero section data
export const heroData = {
  greeting: "Hi, I'm",
  name: personalInfo.name,
  title: personalInfo.title,
  subtitle: personalInfo.subtitle,
  description: `I'm a passionate ${personalInfo.title.toLowerCase()} with ${timelineData.length}+ years of experience 
    creating exceptional digital experiences. I love turning complex problems into simple, beautiful, and intuitive solutions.`,
  
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies", value: `${skillsData.length}+` },
    { label: "Happy Clients", value: "50+" }
  ],

  cta: {
    primary: {
      text: "View My Work",
      href: "#projects"
    },
    secondary: {
      text: "Get In Touch",
      href: "#contact"
    }
  }
}