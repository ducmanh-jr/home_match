import {
  Bell,
  Bot,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  FilePlus2,
  FileText,
  House,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Palette,
  Settings,
  Sparkles,
  Users,
  WalletCards,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface OwnerModuleDefinition {
  id: string;
  label: string;
  shortLabel: string;
  group: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
}

export const ownerModules: OwnerModuleDefinition[] = [
  // TỔNG QUAN
  {
    id: "tong-quan",
    label: "Tổng quan",
    shortLabel: "Tổng quan",
    group: "TỔNG QUAN",
    icon: LayoutDashboard,
    description: "Theo dõi nguồn cung, khách thuê và tình hình vận hành của bạn.",
  },
  {
    id: "tro-ly-cua-ban",
    label: "Trợ lý của bạn",
    shortLabel: "Trợ lý",
    group: "TỔNG QUAN",
    icon: Bot,
    description: "Trợ lý AI hỗ trợ tìm kiếm, so sánh và giải đáp thắc mắc.",
  },

  // NGUỒN CUNG
  {
    id: "tin-bat-dong-san",
    label: "Tin bất động sản",
    shortLabel: "Tin đăng",
    group: "NGUỒN CUNG",
    icon: House,
    description: "Quản lý tin cho thuê và theo dõi hiệu quả từng tin đăng.",
  },
  {
    id: "tao-tin",
    label: "Tạo tin cho thuê",
    shortLabel: "Đăng tin",
    group: "NGUỒN CUNG",
    icon: FilePlus2,
    description: "Chuẩn bị thông tin, giá thuê, hình ảnh và nội dung tin đăng.",
  },
  {
    id: "marketing",
    label: "Marketing tin đăng",
    shortLabel: "Marketing",
    group: "NGUỒN CUNG",
    icon: Megaphone,
    description: "Quảng bá tin đăng đa kênh để tiếp cận nhiều khách thuê hơn.",
    badge: "sắp có",
  },
  {
    id: "thiet-ke-home",
    label: "Thiết kế home",
    shortLabel: "Thiết kế",
    group: "NGUỒN CUNG",
    icon: Palette,
    description: "Tùy biến trang giới thiệu bất động sản của bạn.",
    badge: "sắp có",
  },
  {
    id: "can-ho-phong",
    label: "Căn hộ & phòng",
    shortLabel: "Phòng",
    group: "NGUỒN CUNG",
    icon: Building2,
    description: "Quản lý tòa nhà, căn hộ, phòng và tình trạng khai thác.",
  },

  // VẬN HÀNH THUÊ
  {
    id: "nguoi-thue",
    label: "Người thuê",
    shortLabel: "Người thuê",
    group: "VẬN HÀNH THUÊ",
    icon: Users,
    description: "Theo dõi người thuê, phòng đang ở và hợp đồng liên quan.",
  },
  {
    id: "hop-dong",
    label: "Hợp đồng thuê",
    shortLabel: "Hợp đồng",
    group: "VẬN HÀNH THUÊ",
    icon: FileText,
    description: "Quản lý kỳ thuê, giá thuê, tiền cọc và tiến trình hợp đồng.",
  },
  {
    id: "thu-tien",
    label: "Thu tiền & công nợ",
    shortLabel: "Thu tiền",
    group: "VẬN HÀNH THUÊ",
    icon: WalletCards,
    description: "Theo dõi hóa đơn, khoản thu và công nợ theo từng kỳ.",
  },
  {
    id: "bao-tri",
    label: "Bảo trì & sự cố",
    shortLabel: "Bảo trì",
    group: "VẬN HÀNH THUÊ",
    icon: Wrench,
    description: "Ghi nhận và điều phối giải quyết sự cố, bảo trì tài sản.",
    badge: "sắp có",
  },
  {
    id: "cong-viec",
    label: "Công việc & thông báo",
    shortLabel: "Công việc",
    group: "VẬN HÀNH THUÊ",
    icon: ClipboardList,
    description: "Danh sách công việc vận hành cần làm hằng ngày.",
    badge: "sắp có",
  },

  // KHÁCH HÀNG
  {
    id: "khach-quan-tam",
    label: "Khách quan tâm",
    shortLabel: "Khách",
    group: "KHÁCH HÀNG",
    icon: Users,
    description: "Theo dõi khách hỏi thuê và căn phòng khách đang quan tâm.",
  },
  {
    id: "lich-xem",
    label: "Lịch xem phòng",
    shortLabel: "Lịch xem",
    group: "KHÁCH HÀNG",
    icon: CalendarDays,
    description: "Sắp xếp lịch hẹn dẫn khách đến xem phòng trực tiếp.",
  },
  {
    id: "bao-cao",
    label: "Báo cáo & phân tích",
    shortLabel: "Báo cáo",
    group: "KHÁCH HÀNG",
    icon: ChartNoAxesCombined,
    description: "Theo dõi tỷ lệ lấp đầy, dòng tiền và hiệu quả cho thuê.",
  },
  {
    id: "agent-tu-dong-hoa",
    label: "Agent & tự động hóa",
    shortLabel: "Agent",
    group: "KHÁCH HÀNG",
    icon: Sparkles,
    description: "Các kịch bản tự động chăm sóc và phản hồi khách hàng.",
    badge: "sắp có",
  },

  // CÀI ĐẶT
  {
    id: "thong-bao",
    label: "Thông báo",
    shortLabel: "Thông báo",
    group: "CÀI ĐẶT",
    icon: Bell,
    description: "Các cập nhật về tin đăng, khách quan tâm, hợp đồng và lịch xem.",
  },
  {
    id: "cai-dat",
    label: "Cài đặt",
    shortLabel: "Cài đặt",
    group: "CÀI ĐẶT",
    icon: Settings,
    description: "Hồ sơ tài khoản, bảo mật và thiết lập quản lý của bạn.",
  },
];

export type OwnerModule = (typeof ownerModules)[number];
export type OwnerModuleId = OwnerModule["id"];
export const ownerGroups = [...new Set(ownerModules.map(module => module.group))];

export function getOwnerModule(id?: string | null): OwnerModule {
  return ownerModules.find(module => module.id === id) ?? ownerModules[0];
}

export function ownerModuleHref(id: string) {
  if (id === "tro-ly-cua-ban") return "/tro-ly-ai";
  return `/owner/v2?m=${id}`;
}
