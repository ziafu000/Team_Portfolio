export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export const services: Service[] = [
    {
        id: "web",
        title: "Phát Triển Website",
        description: "Phát triển đa dạng website: Landing Page, E-commerce, Web App với công nghệ hiện đại, tối ưu trải nghiệm người dùng và hiệu suất.",
        icon: "🌐"
    },
    {
        id: "3d",
        title: "3D & Chuyển Động",
        description: "Mô phỏng 3D sản phẩm, kiến trúc và sản xuất Motion Graphics chất lượng cao, tạo ra trải nghiệm thị giác sống động và thu hút.",
        icon: "🎮"
    },
    {
        id: "ads",
        title: "Quảng Cáo Số",
        description: "Triển khai chiến dịch quảng cáo đa kênh (Facebook, Google, TikTok) dựa trên dữ liệu, tối ưu hóa ngân sách và cam kết hiệu quả chuyển đổi.",
        icon: "📈"
    },
    {
        id: "creative",
        title: "Thiết Kế Sáng Tạo",
        description: "Giải pháp thiết kế sáng tạo đa dạng: Branding, UI/UX, Graphic Design mang đậm dấu ấn thương hiệu và truyền tải thông điệp mạnh mẽ.",
        icon: "✨"
    }
];
