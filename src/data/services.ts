export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export const services: Service[] = [
    {
        id: "web",
        title: "Web Development",
        description: "High-performance websites and web applications with cutting-edge technologies and seamless user experiences.",
        icon: "🌐"
    },
    {
        id: "3d",
        title: "3D & Motion",
        description: "Immersive 3D visualizations, product configurators, and cinematic motion graphics that captivate audiences.",
        icon: "🎮"
    },
    {
        id: "ads",
        title: "Digital Ads",
        description: "Data-driven advertising campaigns across all platforms, optimized for maximum ROI and brand impact.",
        icon: "📈"
    },
    {
        id: "creative",
        title: "Creative Design",
        description: "Brand identity, UI/UX design, and visual systems that communicate your unique story effectively.",
        icon: "✨"
    }
];
