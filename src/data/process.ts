export interface ProcessStep {
    id: number;
    title: string;
    description: string;
}

export const processSteps: ProcessStep[] = [
    {
        id: 1,
        title: "Khám Phá",
        description: "Chúng tôi tìm hiểu sâu về tầm nhìn, mục tiêu và thách thức của bạn để hiểu rõ định nghĩa thành công."
    },
    {
        id: 2,
        title: "Chiến Lược",
        description: "Đội ngũ của chúng tôi xây dựng phương pháp tiếp cận riêng biệt kết hợp sự sáng tạo với chuyên môn kỹ thuật."
    },
    {
        id: 3,
        title: "Sáng Tạo",
        description: "Chúng tôi hiện thực hóa ý tưởng qua quá trình thiết kế và phát triển lặp lại với các vòng phản hồi thường xuyên."
    },
    {
        id: 4,
        title: "Triển Khai",
        description: "Dự án của bạn được ra mắt với sự hỗ trợ toàn diện, tối ưu hóa và cải tiến liên tục từ chúng tôi."
    }
];
