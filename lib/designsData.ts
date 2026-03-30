export interface Design {
  id: string;
  title: string;
  slug: string;
  image: string;
  tags: string[];
  year: string;
  badge?: { text: string; color: string } | null;
  description: string;
  tools: string[];
  behanceUrl?: string | null;
  dribbbleUrl?: string | null;
  figmaUrl?: string | null;
}

export const designsData: Design[] = [
  {
    id: "1",
    title: "Finance App - Neumorphism",
    slug: "finance-app-ui",
    image: "https://i.ibb.co.com/84cCH7yv/image.png",
    tags: ["UI/UX", "Mobile", "Fintech"],
    year: "2026",
    badge: { text: "Premium", color: "bg-[#FF5652]" },
    description:
      "A sleek, neumorphic design for a modern digital banking experience with high attention to tactile detail.",
    tools: ["Figma", "Adobe Illustrator"],
    figmaUrl: "https://figma.com",
  },
  {
    id: "2",
    title: "Travel Platform - Glassmorphism",
    slug: "travel-platform-ui",
    image: "https://i.ibb.co.com/XRxQp2Lh/image.png",
    tags: ["UI/UX", "Web", "Travel"],
    year: "2026",
    description:
      "An immersive travel booking platform focusing on transparency and accessibility through glassmorphic elements.",
    tools: ["Figma", "Lucide Icons"],
    behanceUrl: "https://behance.net",
  },
  {
    id: "3",
    title: "Smart Home Control Dashboard",
    slug: "smart-home-ui",
    image: "https://i.ibb.co.com/LzMScntp/image.png",
    tags: ["UI/UX", "Desktop", "IoT"],
    year: "2025",
    badge: { text: "Featured", color: "bg-[#20255e]" },
    description:
      "A dark-themed home automation dashboard designed for clarity and rapid interaction in smart environments.",
    tools: ["Figma", "Framer"],
    dribbbleUrl: "https://dribbble.com",
  },
];

export function getDesignBySlug(slug: string) {
  return designsData.find((design) => design.slug === slug);
}
