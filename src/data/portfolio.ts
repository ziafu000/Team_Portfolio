export interface PortfolioSubItem {
    id: string;
    title: string;
    image: string;
    video?: string;
    category?: string;
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
        title: "Bảng Điều Khiển Nexus",
        category: "Phát Triển Website",
        description: "Nền tảng phân tích doanh nghiệp với trực quan hóa dữ liệu thời gian thực và thông tin chi tiết được hỗ trợ bởi AI.",
        image: "/images/portfolio/project-1.jpg",
        tags: ["React", "Three.js", "AI"],
        subItems: [
            { id: "s1-1", title: "Sản Phẩm A", image: "/images/portfolio/placeholder.jpg", category: "Bảng Điều Khiển" },
            { id: "s1-2", title: "Sản Phẩm B", image: "/images/portfolio/placeholder.jpg", category: "Ứng Dụng Di Động" },
            { id: "s1-3", title: "Sản Phẩm C", image: "/images/portfolio/placeholder.jpg", category: "Bảng Điều Khiển" },
            { id: "s1-4", title: "Sản Phẩm D", image: "/images/portfolio/placeholder.jpg", category: "Phân Tích" },
        ]
    },
    {
        id: "project-3",
        title: "Chiến Dịch Thương Hiệu Horizon",
        category: "Thiết Kế Sáng Tạo",
        description: "Xây dựng trọn bộ nhận diện thương hiệu và chiến dịch số cho startup fintech, mang lại mức tăng trưởng 300%.",
        image: "/images/portfolio/project-3.jpg",
        tags: ["Thương Hiệu", "Chuyển Động", "Quảng Cáo"],
        subItems: [
            { id: "s3-1", title: "Phương Án 1", image: "/images/portfolio/placeholder.jpg", category: "Nhận Diện" },
            { id: "s3-2", title: "Phương Án 2", image: "/images/portfolio/placeholder.jpg", category: "Mạng Xã Hội" },
        ]
    },
    {
        id: "project-4",
        title: "Quảng Cáo Số Lumina",
        category: "Quảng Cáo Số",
        description: "Các chiến dịch quảng cáo video có tỷ lệ chuyển đổi cao cho nhà bán lẻ thời trang toàn cầu với tối ưu hóa sáng tạo dựa trên dữ liệu.",
        image: "/images/portfolio/project-3.jpg", // Using existing image as placeholder
        tags: ["Sản Xuất Video", "Mạng Xã Hội", "Phân Tích"],
        subItems: [
            {
                id: "s4-1",
                title: "Quảng Cáo Story Instagram",
                image: "/images/portfolio/placeholder.jpg",
                video: "https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4",
                category: "Mạng Xã Hội"
            },
            {
                id: "s4-2",
                title: "Chiến Dịch TikTok Viral",
                image: "/images/portfolio/placeholder.jpg",
                video: "https://videos.pexels.com/video-files/4496269/4496269-hd_1920_1080_25fps.mp4",
                category: "Mạng Xã Hội"
            },
            {
                id: "s4-3",
                title: "YouTube Pre-roll",
                image: "/images/portfolio/placeholder.jpg",
                video: "https://videos.pexels.com/video-files/5927897/5927897-hd_1920_1080_30fps.mp4",
                category: "TVC / Quảng Cáo"
            },
        ]
    },
    {
        id: "project-2",
        title: "Trưng Bày Sản Phẩm Aether",
        category: "3D & Chuyển Động",
        description: "Cấu hình sản phẩm 3D tương tác cho thương hiệu ô tô hạng sang với khả năng hiển thị chân thực như ảnh chụp.",
        image: "/images/portfolio/project-2.jpg",
        tags: ["WebGL", "3D", "Thương Mại Điện Tử"],
        subItems: [
            { id: "s2-1", title: "Tài Sản 3D 1", image: "/images/portfolio/placeholder.jpg", category: "Mô Hình Hóa" },
            { id: "s2-2", title: "Tài Sản 3D 2", image: "/images/portfolio/placeholder.jpg", category: "Kết Xuất" },
            { id: "s2-3", title: "Tài Sản 3D 3", image: "/images/portfolio/placeholder.jpg", category: "Hoạt Hình" },
        ]
    }
];
