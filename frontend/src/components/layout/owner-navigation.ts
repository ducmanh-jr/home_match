import { Bell, Building2, CalendarDays, ChartNoAxesCombined, FilePlus2, FileText, House, LayoutDashboard, MessageSquare, Settings, Users, UsersRound, WalletCards } from "lucide-react";

export const ownerModules = [
  { id: "tong-quan", label: "Tổng quan", shortLabel: "Tổng quan", group: "Tổng quan", icon: LayoutDashboard, description: "Theo dõi nguồn cung, khách thuê và tình hình vận hành của bạn." },
  { id: "tin-bat-dong-san", label: "Tin bất động sản", shortLabel: "Tin đăng", group: "Nguồn cung", icon: House, description: "Quản lý tin cho thuê và theo dõi hiệu quả từng tin đăng." },
  { id: "tao-tin", label: "Tạo tin cho thuê", shortLabel: "Đăng tin", group: "Nguồn cung", icon: FilePlus2, description: "Chuẩn bị thông tin, giá thuê, hình ảnh và nội dung tin đăng." },
  { id: "can-ho-phong", label: "Căn hộ & phòng", shortLabel: "Phòng", group: "Nguồn cung", icon: Building2, description: "Quản lý tòa nhà, căn hộ, phòng và tình trạng khai thác." },
  { id: "nguoi-thue", label: "Người thuê", shortLabel: "Người thuê", group: "Vận hành thuê", icon: Users, description: "Theo dõi người thuê, phòng đang ở và hợp đồng liên quan." },
  { id: "hop-dong", label: "Hợp đồng thuê", shortLabel: "Hợp đồng", group: "Vận hành thuê", icon: FileText, description: "Quản lý kỳ thuê, giá thuê, tiền cọc và tiến trình hợp đồng." },
  { id: "thu-tien", label: "Thu tiền & công nợ", shortLabel: "Thu tiền", group: "Vận hành thuê", icon: WalletCards, description: "Theo dõi hóa đơn, khoản thu và công nợ theo từng kỳ." },
  { id: "khach-quan-tam", label: "Khách quan tâm", shortLabel: "Khách", group: "Khách hàng", icon: UsersRound, description: "Theo dõi khách hỏi thuê và căn phòng khách đang quan tâm." },
  { id: "tin-nhan", label: "Tin nhắn khách", shortLabel: "Tin nhắn", group: "Khách hàng", icon: MessageSquare, description: "Tiếp nhận và trả lời hội thoại với khách quan tâm." },
  { id: "lich-xem", label: "Lịch xem phòng", shortLabel: "Lịch xem", group: "Khách hàng", icon: CalendarDays, description: "Sắp xếp lịch hẹn dẫn khách đến xem phòng trực tiếp." },
  { id: "bao-cao", label: "Báo cáo & phân tích", shortLabel: "Báo cáo", group: "Phân tích", icon: ChartNoAxesCombined, description: "Theo dõi tỷ lệ lấp đầy, dòng tiền và hiệu quả cho thuê." },
  { id: "thong-bao", label: "Thông báo", shortLabel: "Thông báo", group: "Cài đặt", icon: Bell, description: "Các cập nhật về tin đăng, khách quan tâm, hợp đồng và lịch xem." },
  { id: "cai-dat", label: "Cài đặt", shortLabel: "Cài đặt", group: "Cài đặt", icon: Settings, description: "Hồ sơ tài khoản, bảo mật và thiết lập quản lý của bạn." },
] as const;

export type OwnerModule = (typeof ownerModules)[number];
export type OwnerModuleId = OwnerModule["id"];
export const ownerGroups = [...new Set(ownerModules.map(module => module.group))];

export function getOwnerModule(id?: string | null): OwnerModule {
  return ownerModules.find(module => module.id === id) ?? ownerModules[0];
}

export function ownerModuleHref(id: OwnerModuleId) {
  return `/owner/v2?m=${id}`;
}
