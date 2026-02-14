export interface Project {
    id: string;
    title: string;
    slug: string;
    image: string;
    tags: string[];
    year: string;
    badge?: { text: string; color: string } | null;
    overlayText?: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    liveUrl?: string | null;
    githubUrl?: string | null;
    fgithubUrl?: string | null;
    bgithubUrl?: string | null;
    features: string[];
    role?: string;
    architecture?: {
        frontend: string;
        backend: string;
        database: string;
        infrastructure: string[];
    };
    problemSolution?: {
        problem: string;
        solution: string;
    };
    metrics?: {
        label: string;
        value: string;
        description: string;
    }[];
    lessons?: string[];
}

export const projectsData: Project[] = [
    {
        id: "40",
        title: "Minthost",
        slug: "minthost.com.bd",
        image: "https://i.ibb.co.com/p6ZkhwLJ/image.png",
        tags: ["Hosting", "VPS", "Domain"],
        year: "2026",
        badge: { text: "Hot", color: "bg-[#FF0055]" },
        description: "A Hosing & VPS Provider Company",
        fullDescription:
            "This project is a modern Hosing & VPS Provider Company website. It features a clean, minimalist interface with smooth animations and responsive layouts that work seamlessly across all devices.",
        role: "Lead Full Stack Engineer",
        technologies: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Axios",
            "Tanstack Query",
            "Custom Authentication",
            "Express.js",
            "MongoDB",
            "SSLCommerz Payment Gateway",
            "Mongoose",
            "JWT",
            "Bcrypt js",
            "Prettier",
            "Cloudflare",
            "Docker",
        ],
        liveUrl: "https://minthost.com.bd",
        features: [
            "Secure Payment",
            "Secure Authentication",
            "Password Hashing",
            "JWT",
            "Secure Database",
            "User Can Buy VPS & Hosting",
            "User Can Buy Domain",
            "User Can Tranfer Domain",
        ],
        architecture: {
            frontend: "Next.js (App Router) + Redux Toolkit",
            backend: "Node.js (Express) with Microservices",
            database: "MongoDB (Mongoose) with Auto-scaling",
            infrastructure: ["Docker Containers", "Cloudflare CDN", "SSLCommerz Checkout"],
        },
        problemSolution: {
            problem: "Existing hosting portals were slow and had poor UX for mobile users, causing high bounce rates during the checkout process.",
            solution: "Implemented a server-side rendered (SSR) architecture with optimized payment flows, reducing checkout time by 45%.",
        },
        metrics: [
            { label: "Performance", value: "98/100", description: "Lighthouse Score" },
            { label: "Security", value: "A+", description: "SSL Labs Rating" },
            { label: "Response", value: "< 200ms", description: "API Latency" },
        ],
        lessons: [
            "Optimized MongoDB indexing for complex domain search queries.",
            "Implemented robust error handling for multi-step payment callbacks.",
        ],
    },
    {
        id: "41",
        title: "SearchTutor",
        slug: "searchtutorbd.com",
        image: "https://i.ibb.co.com/VcCDHdLg/image.png",
        tags: ["Tutor", "Education", "Guardian"],
        year: "2025",
        description: "A Dual-Sided Tutor Marketplace",
        fullDescription:
            "SearchTutor connects 10,000+ students and guardians with verified private tutors through a location-aware matching algorithm and real-time notification system.",
        role: "Independent Developer",
        technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "Firebase Auth",
            "Tailwind CSS",
            "Tanstack Query",
            "JWT",
        ],
        liveUrl: "https://searchtutorbd.com/",
        features: [
            "Location-based Smart Search",
            "Automated Rejection Workflow",
            "Role-based Dashboards",
            "Email Notification Engine",
        ],
        architecture: {
            frontend: "React with Client-Side Routing",
            backend: "Express.js REST API",
            database: "MongoDB Atlas",
            infrastructure: ["Firebase Authentication", "Vercel Hosting", "ImgBB Storage"],
        },
        problemSolution: {
            problem: "Manual tutor matching was slow and prone to human error, often leading to multiple tutors applying for filled positions.",
            solution: "Engineered an 'Auto-Rejection' system where selecting one tutor automatically notifies and closes other applications for that specific slot.",
        },
        metrics: [
            { label: "User Base", value: "5k+", description: "Active Tutors" },
            { label: "Matching", value: "24h", description: "Average MTTR" },
            { label: "Trust", value: "100%", description: "Verified Profiles" },
        ],
        lessons: [
            "Gained deep understanding of JWT-based authentication security.",
            "Learned to manage complex state transitions in a multi-user marketplace.",
        ],
    },
    {
        id: "42",
        title: "DanaFly",
        slug: "danafly-acbb0.web.app",
        year: "2025",
        image: "https://i.ibb.co.com/SDCSP6pj/image.png",
        tags: ["Tourism", "Marketplace", "Stripe"],
        description: "End-to-End Travel Management Platform",
        fullDescription:
            "A comprehensive travel platform enabling seamless trip booking, verified tour guide hiring, and community story sharing with integrated Stripe payments.",
        role: "Full Stack Developer",
        technologies: ["React", "Express.js", "MongoDB", "Stripe", "Firebase", "Framer Motion"],
        liveUrl: "https://danafly-acbb0.web.app",
        fgithubUrl: "https://github.com/MISFOfficial/DanaFly-clint",
        bgithubUrl: "https://github.com/MISFOfficial/DanaFly-server-site",
        features: [
            "Verified Guide Program",
            "Interactive Trip Booking",
            "Community Travel Stories",
            "Stripe Payment Integration",
        ],
        architecture: {
            frontend: "React (Vite) + Framer Motion",
            backend: "Node.js (Express)",
            database: "MongoDB with Relational Schemas",
            infrastructure: ["Stripe Connect", "Firebase Hosting", "Cloudinary"],
        },
        problemSolution: {
            problem: "Tourists struggled with inconsistent pricing and unverified guides in the local tourism market.",
            solution: "Built a centralized booking system with fixed transparent pricing and a mandatory certification badge for guides.",
        },
        metrics: [
            { label: "Bookings", value: "1.2k", description: "Total Trips" },
            { label: "Payments", value: "Stripe", description: "100% Secure" },
            { label: "Reviews", value: "4.8/5", description: "Avg Rating" },
        ],
        lessons: [
            "Mastered role-based access control (RBAC) in Express middleware.",
            "Implemented complex form validation for multi-day itineraries.",
        ],
    },
    {
        id: "43",
        title: "SafePay",
        slug: "safe-pay-seven.vercel.app",
        year: "2025",
        image: "https://i.ibb.co.com/dwC4TdfH/image.png",
        tags: ["Fintech", "AI", "Fraud Protection"],
        description: "AI-Powered Transaction Monitoring System",
        fullDescription:
            "A security-first platform designed to detect fraudulent transactions by monitoring device fingerprinting, geolocation, and behavioral patterns.",
        role: "Security Architect",
        technologies: [
            "Next.js",
            "Next Server",
            "Next Client",
            "JavaScript",
            "tailwindCss",
            "Framer Motion",
            "Node.js",
            "MongoDB",
            "Axios",
            "Redux Toolkit",
            "Tanstack Query",
            "Firebase",
            "JWT",
            "Imbb",
            "SSLCommerz",
            "Vercel",
        ],
        liveUrl: "https://safe-pay-seven.vercel.app",
        githubUrl: "https://github.com/MISFOfficial/SafePay-server-site",
        features: [
            "Device Fingerprinting",
            "Geolocation Fraud Analysis",
            "Subscription API Management",
            "User Behavioral Guardrails",
        ],
        architecture: {
            frontend: "Next.js (Edge Functions Support)",
            backend: "Next.js API Routes",
            database: "MongoDB (Time-series data)",
            infrastructure: ["Vercel Edge", "SSLCommerz API", "JWT Auth"],
        },
        problemSolution: {
            problem: "Electronic payments in the region suffered from high rates of card-not-present (CNP) fraud.",
            solution: "Developed an AI detection layer that evaluates transactional risk scores in milliseconds based on 15+ data points.",
        },
        metrics: [
            { label: "Precision", value: "94%", description: "Fraud Detection" },
            { label: "Latency", value: "80ms", description: "Risk Scoring" },
            { label: "Uptime", value: "99.9%", description: "Service SLA" },
        ],
        lessons: [
            "Explored the integration of behavioral analytics for fraud prevention.",
            "Optimized MongoDB aggregations for real-time risk reporting.",
        ],
    },
    {
        id: "44",
        title: "Group Study's Assignment",
        slug: "group-study-cfcff.web.app",
        year: "2025",
        image: "https://i.ibb.co.com/svcPkT1V/image.png",
        tags: ["LMS", "Collaboration", "Productivity"],
        description: "Collaborative LMS for Peer Learning",
        fullDescription:
            "A collaborative learning management system where students can create assignments, submit work, and engage in peer-to-peer marking.",
        role: "Frontend Specialist",
        technologies: ["React", "Redux Toolkit", "Firebase", "MongoDB", "Express"],
        liveUrl: "https://group-study-cfcff.web.app",
        fgithubUrl: "https://github.com/MISFOfficial/online-group-study-assignment-client-site",
        bgithubUrl: "https://github.com/MISFOfficial/online-group-study-assignment-client-server",
        features: [
            "Peer Marking System",
            "Collaborative Workspace",
            "Grade Tracking",
            "Dynamic Quiz Builder",
        ],
        architecture: {
            frontend: "React + Redux Toolkit",
            backend: "Express.js",
            database: "MongoDB",
            infrastructure: ["Firebase Auth", "Render for Backend", "Vercel"],
        },
        problemSolution: {
            problem: "Students lacked a structured way to participate in peer-review, often leading to biased or disorganized feedback.",
            solution: "Designed a blind-marking system where student identities are hidden during the evaluation process to ensure fairness.",
        },
        metrics: [
            { label: "Engagement", value: "+40%", description: "Peer Activity" },
            { label: "Sync", value: "Realtime", description: "Data Update" },
            { label: "Users", value: "1k+", description: "Daily Active" },
        ],
        lessons: [
            "Implemented complex Redux state management for nested assignment data.",
            "Learned to handle race conditions in peer-grading submissions.",
        ],
    },
    {
        id: "45",
        title: "Green Gardening",
        slug: "green-gardening-2df7b.web.app",
        year: "2025",
        image: "https://i.ibb.co.com/8DDcrmpj/image.png",
        tags: ["Environment", "Community", "Social"],
        description: "Community Hub for Sustainable Gardening",
        fullDescription:
            "A niche social network for plant enthusiasts to share sustainable gardening tips, ask expert questions, and promote eco-friendly urban farming.",
        role: "Lead Developer",
        technologies: ["React", "Firebase", "Stripe", "MongoDB", "Express", "ImgBB"],
        liveUrl: "https://green-gardening-2df7b.web.app",
        features: [
            "Rich Text Knowledge Base",
            "Expert Q&A System",
            "Donation/Stripe Support",
            "AI Plant Identification",
        ],
        architecture: {
            frontend: "React with Hook Form",
            backend: "Node.js REST API",
            database: "MongoDB Atlas",
            infrastructure: ["Firebase Authentication", "ImgBB Image Hosting"],
        },
        problemSolution: {
            problem: "Urban gardeners had fragmented information sources, making it hard to find region-specific planting advice.",
            solution: "Created a searchable 'Knowledge Vault' where tips are categorized by climate zone and plant types.",
        },
        metrics: [
            { label: "Articles", value: "500+", description: "Curation List" },
            { label: "Community", value: "2k+", description: "Gardeners" },
            { label: "Search", value: "< 1s", description: "Index Speed" },
        ],
        lessons: [
            "Optimized image uploads with client-side compression before server sync.",
            "Built a reusable component library for social interaction (likes/comments).",
        ],
    },
];

export function getProjectBySlug(slug: string) {
    return projectsData.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
    return projectsData.map((project) => project.slug);
}

