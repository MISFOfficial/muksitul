export interface Design {
  id: string;
  title: string;
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
    title: "Serpolino",
    image:
      "https://i.ibb.co.com/ksGgf3sL/Screenshot-from-2026-04-02-13-24-43.png",
    tags: ["UI/UX", "SEO", "Web"],
    year: "2026",
    badge: { text: "Premium", color: "bg-[#FF5652]" },
    description:
      "A sleek, neumorphic design for a modern digital banking experience with high attention to tactile detail.",
    tools: ["Figma", "Adobe Illustrator"],
    figmaUrl:
      "https://www.figma.com/design/u9ycEsMQuiPG9lsJJLiL54/serpolino?node-id=0-1&t=wuMceKGa3eTXwBEE-1",
  },
  {
    id: "2",
    title: "HosingProvider",
    image: "https://i.ibb.co.com/XRxQp2Lh/image.png",
    tags: ["UI/UX", "Web", "Hosting", "Vps", "Cloude"],
    year: "2026",
    description:
      "An immersive travel booking platform focusing on transparency and accessibility through glassmorphic elements.",
    tools: ["Figma", "Lucide Icons"],
    behanceUrl: "https://behance.net",
  },
  {
    id: "3",
    title: "Biddaneer",
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

export function getDesignById(id: string) {
  return designsData.find((design) => design.id === id);
}
