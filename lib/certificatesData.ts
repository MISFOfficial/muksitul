export interface Certificate {
    id: string;
    title: string;
    slug: string;
    image: string;
    provider: string;
    duration: string;
    timeTaken: string;
    challenges: string[];
    rating: number;
    description: string;
    fullDescription: string;
    skillsLearned: string[];
    certifiedAt: string;
    issueDate: string;
}

export const certificatesData: Certificate[] = [
    {
        id: "1",
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        image: "https://i.ibb.co.com/p6ZkhwLJ/image.png", // Using existing placeholder images for now
        provider: "Programming Hero",
        duration: "6 Months",
        timeTaken: "180 Days",
        challenges: [
            "Understanding Asynchronous JavaScript deeply",
            "Managing complex state with Redux Toolkit",
            "Securing REST APIs with JWT and specialized middleware"
        ],
        rating: 5,
        description: "Comprehensive boot camp covering MERN stack development.",
        fullDescription: "This intensive program focused on building industry-ready full-stack applications using MongoDB, Express, React, and Node.js. It emphasized clean code, design patterns, and scalable architecture.",
        skillsLearned: ["React", "Node.js", "Express", "MongoDB", "Redux"],
        certifiedAt: "December 2024",
        issueDate: "2024-12-15"
    },
    {
        id: "2",
        title: "Advanced Next.js & TypeScript",
        slug: "advanced-nextjs-typescript",
        image: "https://i.ibb.co.com/VcCDHdLg/image.png",
        provider: "Frontend Masters",
        duration: "2 Months",
        timeTaken: "60 Days",
        challenges: [
            "Mastering Server Components and Suspense",
            "Complex TypeScript generics for reusable components",
            "Optimizing Core Web Vitals with Next.js features"
        ],
        rating: 4.8,
        description: "Advanced patterns for modern web application development.",
        fullDescription: "Explored deep-level Next.js features including App Router, Server Actions, and advanced TypeScript integration for enterprise-level applications.",
        skillsLearned: ["Next.js", "TypeScript", "Tailwind CSS", "Server Actions"],
        certifiedAt: "January 2025",
        issueDate: "2025-01-20"
    },
    {
        id: "3",
        title: "UI/UX Design Essentials",
        slug: "ui-ux-design-essentials",
        image: "https://i.ibb.co.com/SDCSP6pj/image.png",
        provider: "Udemy",
        duration: "3 Months",
        timeTaken: "90 Days",
        challenges: [
            "Learning design principles like contrast and hierarchy",
            "Mastering Figma's auto-layout and prototyping",
            "Conducting effective user research and interviews"
        ],
        rating: 4.5,
        description: "Focusing on user-centric design and pixel-perfect interfaces.",
        fullDescription: "A practical course on modern UI/UX design, from wireframing and prototyping to final high-fidelity designs and user testing.",
        skillsLearned: ["Figma", "User Research", "Prototyping", "Design Systems"],
        certifiedAt: "November 2024",
        issueDate: "2024-11-10"
    },
    {
        id: "4",
        title: "Cloud Infrastructure Specialist",
        slug: "cloud-infrastructure-specialist",
        image: "https://i.ibb.co.com/dwC4TdfH/image.png",
        provider: "Google Cloud Skills Boost",
        duration: "4 Months",
        timeTaken: "120 Days",
        challenges: [
            "Understanding VPC and networking security",
            "Auto-scaling configurations for high traffic",
            "Cost management and resource optimization"
        ],
        rating: 4.9,
        description: "Building scalable and secure cloud infrastructure.",
        fullDescription: "Comprehensive training on Google Cloud Platform services, focusing on computing, storage, and networking aspects of modern infrastructure.",
        skillsLearned: ["GCP", "Kubernetes", "Docker", "Cloud Security"],
        certifiedAt: "February 2025",
        issueDate: "2025-02-05"
    },
    {
        id: "5",
        title: "Data Science with Python",
        slug: "data-science-python",
        image: "https://i.ibb.co.com/svcPkT1V/image.png",
        provider: "Coursera (IBM)",
        duration: "5 Months",
        timeTaken: "150 Days",
        challenges: [
            "Mathematical foundations of Machine Learning",
            "Data cleaning and preprocessing with Pandas",
            "Visualizing complex datasets effectively"
        ],
        rating: 4.7,
        description: "Exploring data analytics and machine learning models.",
        fullDescription: "Focused on using Python for data analysis, including statistical modeling, visualization, and building predictive models using Scikit-Learn.",
        skillsLearned: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
        certifiedAt: "October 2024",
        issueDate: "2024-10-30"
    },
    {
        id: "6",
        title: "Cybersecurity Professional",
        slug: "cybersecurity-professional",
        image: "https://i.ibb.co.com/8DDcrmpj/image.png",
        provider: "CompTIA",
        duration: "4 Months",
        timeTaken: "120 Days",
        challenges: [
            "Identifying sophisticated social engineering attacks",
            "Network penetration testing methodologies",
            "Implementing zero-trust architecture"
        ],
        rating: 4.6,
        description: "Mastering security protocols and threat mitigation.",
        fullDescription: "A deep dive into modern cybersecurity, covering network security, threat detection, and incident response strategies for organizations.",
        skillsLearned: ["Network Security", "Ethical Hacking", "Cryptography"],
        certifiedAt: "August 2024",
        issueDate: "2024-08-15"
    }
];

export function getCertificateBySlug(slug: string) {
    return certificatesData.find((cert) => cert.slug === slug);
}

export function getAllCertificateSlugs() {
    return certificatesData.map((cert) => cert.slug);
}
