export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  logo: string;
  // Detail fields
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  teamSize?: string;
  companyDescription?: string;
  companyWebsite?: string;
}

export const experienceData: Experience[] = [
  {
    id: "1",
    company: "Aviro Soft",
    role: "Jr. Software Engineer",
    duration: "1 December 2025 - 31 March 2026",
    location: "On-site",
    logo: "https://i.ibb.co.com/9xBGJpY/421388839-358339266988132-8703200930689574265-n.jpg",
    description:
      "Working as a Jr Software Engineer at Aviro Soft, contributing to full-stack web development projects. Involved in building scalable applications, collaborating with cross-functional teams, and implementing modern development practices to deliver high-quality software solutions.",
    responsibilities: [
      "Developing and maintaining full-stack web applications using modern frameworks",
      "Collaborating with designers and senior engineers to implement UI/UX designs",
      "Writing clean, maintainable, and well-documented code following best practices",
      "Participating in code reviews and contributing to team knowledge sharing",
      "Debugging and resolving complex technical issues across the stack",
      "Working with REST APIs and database design for application features",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Git",
      "REST APIs",
    ],
    achievements: [
      "Successfully delivered multiple client projects on schedule",
      "Improved application performance through code optimization",
      "Adopted modern development workflows and CI/CD practices",
    ],
    teamSize: "10+",
    companyDescription:
      "Aviro Soft is a software development company specializing in building innovative digital solutions for businesses. They focus on delivering high-quality web and mobile applications.",
    companyWebsite: "https://avirosoft.com",
  },
  {
    id: "2",
    company: "Serpolino",
    role: "Jr. Software Engineer",
    duration: "01-02-2026 - Present",
    location: "Part-time",

    logo: "https://i.ibb.co.com/67h8BLHC/5f74c517edafeabe7d0abfaef1ab0b64.webp",
    description:
      "Contributing as a part-time Junior Software Engineer at Serpolino, working on frontend and full-stack development tasks. Helping to build and enhance web products while balancing responsibilities with precision and efficiency.",
    responsibilities: [
      "Building responsive and interactive frontend interfaces",
      "Integrating APIs and managing application state",
      "Contributing to sprint planning and agile development processes",
      "Implementing pixel-perfect designs from Figma mockups",
      "Optimizing web performance and ensuring cross-browser compatibility",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Git",
    ],
    achievements: [
      "Delivered key frontend features ahead of deadlines",
      "Improved UI consistency across the product",
      "Enhanced user experience with smooth animations and transitions",
    ],
    teamSize: "5+",
    companyDescription:
      "Serpolino is a tech company focused on building modern web applications and digital products with a strong emphasis on design and user experience.",
    companyWebsite: "https://serpolino.com",
  },
];

export function getExperienceById(id: string): Experience | undefined {
  return experienceData.find((exp) => exp.id === id);
}
