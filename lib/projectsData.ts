export const projectsData = [
    {
        id: "40",
        title: "Minthost",
        slug: "minthost.com.bd",
        image: "https://i.ibb.co.com/p6ZkhwLJ/image.png",
        tags: ["Hosting", "VPS", "Domain"],
        year: "2026",
         badge: { text: "Hot", color: "bg-[#FF0055]" },
        description: "A Hosing & VPS Provider Company",
        fullDescription: "This project is a modern Hosing & VPS Provider Company website. It features a clean, minimalist interface with smooth animations and responsive layouts that work seamlessly across all devices.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Axios", "Tanstack Query", "Custom Authentication", "Express.js", "MongoDB", "SSLCommerz Payment Gateway", "Mongoose", "JWT", "Bcrypt js", "Prettier", "Cloudflare", "Docker",],
        liveUrl: "https://minthost.com.bd",
        features: [
            "Secure Payment",
            "Secure Authentication",
            "Password Hashing",
            "JWT",
            "Secure Database",
            "User Can Buy VPS & Hosting",
            "User Can Buy Domain",
            "User Can Tranfer Domain"
        ]
    },
    {
        id: "41",
        title: "SearchTutor",
        slug: "searchtutorbd.com",
        image: "https://i.ibb.co.com/VcCDHdLg/image.png",
        tags: ["Tutor", "Student", "Guardian"],
        description: "A Tutor Search Platform",
        fullDescription: "Built for security professionals, this platform provides comprehensive tools for vulnerability assessment and security consulting services.",
        technologies: ["React", "JavaScript", "tailwindCss", "Framer Motion", "Node.js", "MongoDB", "Express", "Axios", "Tanstack Query", "Firebase", "JWT", "Imbb",  "Prettier", 'Vercel'],
        liveUrl: "https://searchtutorbd.com/",
        year: "2025",
        features: [
            "Search Tutor By location",
            "Secure Authentication",
            "JWT",
            "Secure Database",
            "Student/Guardian Can Search Tutor",
            "Tutor Can apply for the tuition",
            "Secure Admin Panel",
            "Admin Can Assign Tuition at a time in one tutor ",
            "Once Selected turor other will auto rejections system",
            "Admin can Block User from the system",
            "Notification System",
            "Auto Email Notification System",  
        ]
    },
    {
        id: "42",
        title: "DanaFly",
        slug: "danafly-acbb0.web.app",
        year: "2025",
        image: "https://i.ibb.co.com/SDCSP6pj/image.png",
        tags: ["Tourist", "Tour Guide", "Tour Operator"],
        description: "A Travel and Tourism Management Platform",
        fullDescription: "DanaFly is a modern, full-featured travel and tourism management platform designed to connect tourists with verified tour guides, explore curated travel packages, book unforgettable trips, and share experiences through stories and photos. With secure user authentication, real-time bookings, role-based dashboards, and Stripe-powered payments, DanaFly offers a seamless and personalized travel planning experience for both travelers and tour operators.",
        technologies: ["React", "JavaScript", "tailwindCss", "Framer Motion", "Node.js", "MongoDB", "Express", "Axios", "Tanstack Query", "Firebase", "JWT", "Imbb",  "Prettier", 'Vercel'],
        liveUrl: "https://danafly-acbb0.web.app",
        fgithubUrl: "https://github.com/MISFOfficial/DanaFly-clint",
        bgithubUrl: "https://github.com/MISFOfficial/DanaFly-server-site",
        features: [
             "Secure Authentication",
             "JWT",
             "Secure Database",
            "User Can Hire Tour Guide",
            "Tour Guide Can Apply for the tour",
            "Tourist Can Book Tour",
            "Tour Guid Can Accept or Reject the tour",
            "Admin can Block User from the system",
            "Notification System",
            "Auto Email Notification System",  
        ]
    },
    {
        id: "43",
        title: "SafePay",
        slug: "safe-pay-seven.vercel.app",
        image: "https://i.ibb.co.com/dwC4TdfH/image.png",
        tags: ["Payment", "AI", "Fraud Detection", "Chatbot"],
        description: "Fraud Detections Provider Porwerd By AI System",
        fullDescription: "This project is a Next.js + MongoDB-based subscription and transaction management system designed to track user payments and detect fraudulent activities. It stores detailed transaction data — including amount, method, device, and location — and displays subscription info through a dynamic frontend powered by Redux Toolkit.",
        technologies: ["Next.js", "Next Server", "Next Client", "JavaScript",  "tailwindCss", "Framer Motion", "Node.js", "MongoDB", "Axios", "Redux Toolkit", "Tanstack Query", "Firebase", "JWT", "Imbb", 'Vercel'],
        liveUrl: "https://safe-pay-seven.vercel.app",
        githubUrl: "https://github.com/MISFOfficial/SafePay-server-site",
        features: [
             "Secure Authentication",
             "JWT",
             "Secure Database",
        ]
    },
    {
        id: "44",
        title: "Demo 44",
        slug: "demo-44",
        image: "/image.png",
        tags: ["Model", "Artist", "Consulter"],
        badge: { text: "Popular Item", color: "bg-[#6366f1]" },
        description: "Creative agency website template.",
        fullDescription: "A stunning website template for creative agencies, featuring bold typography, smooth animations, and a modern aesthetic.",
        technologies: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
        liveUrl: "https://example.com",
  fgithubUrl: "https://github.com/MISFOfficial/DanaFly-clint",
        bgithubUrl: "https://github.com/MISFOfficial/DanaFly-server-site",
        features: [
            "3D animations",
            "Interactive elements",
            "Case studies section",
            "Team showcase"
        ]
    },
    {
        id: "45",
        title: "Demo 45",
        slug: "demo-45",
        image: "/image.png",
        tags: ["HandyMan", "Plumber", "Cleaner"],
        badge: { text: "Coming Soon", color: "bg-[#FF0055]" },
        overlayText: "COMING SOON",
        description: "Service marketplace for home professionals.",
        fullDescription: "A comprehensive marketplace connecting homeowners with trusted service professionals including handymen, plumbers, and cleaners.",
        technologies: ["Next.js", "Firebase", "Stripe", "Google Maps API"],
        liveUrl: null,
        fgithubUrl: "https://github.com/MISFOfficial/DanaFly-clint",
        bgithubUrl: "https://github.com/MISFOfficial/DanaFly-server-site",
        features: [
            "Service booking",
            "Real-time tracking",
            "Payment processing",
            "Review system"
        ]
    }
];

export function getProjectBySlug(slug: string) {
    return projectsData.find(project => project.slug === slug);
}

export function getAllProjectSlugs() {
    return projectsData.map(project => project.slug);
}
