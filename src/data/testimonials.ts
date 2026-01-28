export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
}

export const testimonials: Testimonial[] = [
    {
        id: "testimonial-1",
        name: "Sarah Chen",
        role: "CEO",
        company: "TechVentures",
        quote: "They transformed our digital presence completely. The 3D experience they created for our product launch exceeded all expectations.",
        avatar: "/images/avatars/avatar-1.jpg"
    },
    {
        id: "testimonial-2",
        name: "Michael Torres",
        role: "Creative Director",
        company: "Luxe Brands",
        quote: "Working with this team was seamless. They understood our vision immediately and delivered beyond our wildest dreams.",
        avatar: "/images/avatars/avatar-2.jpg"
    },
    {
        id: "testimonial-3",
        name: "Emma Watson",
        role: "Founder",
        company: "InnovateCo",
        quote: "The ROI from their digital campaign was incredible. Professional, creative, and results-driven.",
        avatar: "/images/avatars/avatar-3.jpg"
    }
];
