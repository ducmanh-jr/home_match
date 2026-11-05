export type ContactTopic = "general" | "renter" | "owner" | "report";

export interface ContactTopicOption {
  value: ContactTopic;
  label: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  topic: ContactTopic;
  relatedUrl?: string;
  message: string;
  consent: boolean;
}

export interface ContactSubmissionResult {
  success: boolean;
  ticketId: string;
  submittedAt: string;
  topicLabel: string;
  formData: ContactFormData;
}

export const CONTACT_TOPICS: ContactTopicOption[] = [
  {
    value: "general",
    label: "Câu hỏi chung / Góp ý sản phẩm",
    description: "Hỏi đáp về nền tảng HomeMatch, phản hồi tính năng hoặc đề xuất cải tiến",
  },
  {
    value: "renter",
    label: "Hỗ trợ người tìm phòng",
    description: "Cần tư vấn khu vực thuê trọ, xác minh tin đăng hoặc hỗ trợ lịch hẹn xem phòng",
  },
  {
    value: "owner",
    label: "Hỗ trợ chủ nhà / Đối tác",
    description: "Đăng tin cho thuê, quản lý bất động sản hoặc hợp tác dịch vụ phòng trọ",
  },
  {
    value: "report",
    label: "Báo cáo tin đăng / Gian lận",
    description: "Tin đăng sai sự thật, thu phí cọc bất thường hoặc chủ nhà giả mạo",
  },
];

