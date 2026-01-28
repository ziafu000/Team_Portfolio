export interface PortfolioSubItem {
    id: string;
    title: string;
    image: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    subItems?: PortfolioSubItem[];
}

export const portfolioItems: PortfolioItem[] = [
    {
        id: "project-1",
        title: "Nexus Dashboard",
        category: "Web Development",
        description: "Enterprise analytics platform with real-time data visualization and AI-powered insights.",
        image: "/images/portfolio/project-1.jpg",
        tags: ["React", "Three.js", "AI"],
        subItems: [
            { id: "s1-1", title: "Product A", image: "/images/portfolio/placeholder.jpg" },
            { id: "s1-2", title: "Product B", image: "/images/portfolio/placeholder.jpg" },
            { id: "s1-3", title: "Product C", image: "/images/portfolio/placeholder.jpg" },
            { id: "s1-4", title: "Product D", image: "/images/portfolio/placeholder.jpg" },
        ]
    },
    {
        id: "project-2",
        title: "Aether Product Showcase",
        category: "3D & Motion",
        description: "Interactive 3D product configurator for luxury automotive brand with photorealistic rendering.",
        image: "/images/portfolio/project-2.jpg",
        tags: ["WebGL", "3D", "E-commerce"],
        subItems: [
            { id: "s2-1", title: "3D Asset 1", image: "/images/portfolio/placeholder.jpg" },
            { id: "s2-2", title: "3D Asset 2", image: "/images/portfolio/placeholder.jpg" },
            { id: "s2-3", title: "3D Asset 3", image: "/images/portfolio/placeholder.jpg" },
        ]
    },
    {
        id: "project-3",
        title: "Horizon Brand Campaign",
        category: "Creative Design",
        description: "Full brand identity and digital campaign for fintech startup, resulting in 300% growth.",
        image: "/images/portfolio/project-3.jpg",
        tags: ["Branding", "Motion", "Ads"],
        subItems: [
            { id: "s3-1", title: "Design Var 1", image: "/images/portfolio/placeholder.jpg" },
            { id: "s3-2", title: "Design Var 2", image: "/images/portfolio/placeholder.jpg" },
        ]
    }
];
