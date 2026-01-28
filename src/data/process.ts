export interface ProcessStep {
    id: number;
    title: string;
    description: string;
}

export const processSteps: ProcessStep[] = [
    {
        id: 1,
        title: "Discover",
        description: "We dive deep into your vision, goals, and challenges to understand what success looks like."
    },
    {
        id: 2,
        title: "Strategize",
        description: "Our team crafts a tailored approach combining creativity with technical excellence."
    },
    {
        id: 3,
        title: "Create",
        description: "We bring ideas to life through iterative design and development with regular feedback loops."
    },
    {
        id: 4,
        title: "Launch",
        description: "Your project goes live with our full support, optimization, and continuous improvement."
    }
];
