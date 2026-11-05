export const listingStatuses = {
  published: { label: "Đang hiển thị", tone: "success" },
  draft: { label: "Bản nháp", tone: "neutral" },
  pending_review: { label: "Chờ duyệt", tone: "warning" },
  hidden: { label: "Tạm ẩn", tone: "neutral" },
  needs_update: { label: "Cần cập nhật", tone: "error" },
} as const;

export const propertyKinds = ["Phòng trọ", "Studio", "Căn hộ mini", "Căn hộ"];
export const listingAmenities = ["Máy lạnh", "Nội thất", "Chỗ để xe", "Giờ giấc tự do", "Máy giặt", "Ban công", "Thang máy", "Không chung chủ", "Wifi", "Bếp riêng"];
// This small address catalog belongs to the mock UI, not a nationwide address service.
export const mockLocations: Record<string, string[]> = {
  "TP. Hồ Chí Minh": ["Phường Thạnh Mỹ Tây", "Phường Diên Hồng", "Phường Bình Thạnh", "Phường Bến Thành"],
  "Hà Nội": ["Phường Ba Đình", "Phường Cầu Giấy", "Phường Đống Đa"],
  "Đà Nẵng": ["Phường Hải Châu", "Phường Sơn Trà", "Phường An Hải"],
};

export const formatMoney = (value: number | string) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(Number(value) || 0);
