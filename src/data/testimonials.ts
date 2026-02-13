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
        role: "Giám Đốc Điều Hành",
        company: "TechVentures",
        quote: "Họ đã thay đổi hoàn toàn diện mạo số của chúng tôi. Trải nghiệm 3D họ tạo ra cho buổi ra mắt sản phẩm đã vượt xa mọi kỳ vọng.",
        avatar: "/images/avatars/avatar-1.jpg"
    },
    {
        id: "testimonial-2",
        name: "Michael Torres",
        role: "Giám Đốc Sáng Tạo",
        company: "Luxe Brands",
        quote: "Làm việc với đội ngũ này thật suôn sẻ. Họ hiểu ngay tầm nhìn của chúng tôi và mang lại kết quả vượt ngoài mong đợi.",
        avatar: "/images/avatars/avatar-2.jpg"
    },
    {
        id: "testimonial-3",
        name: "Emma Watson",
        role: "Nhà Sáng Lập",
        company: "InnovateCo",
        quote: "ROI từ chiến dịch số của họ thật đáng kinh ngạc. Chuyên nghiệp, sáng tạo và luôn hướng đến hiệu quả.",
        avatar: "/images/avatars/avatar-3.jpg"
    }
];
