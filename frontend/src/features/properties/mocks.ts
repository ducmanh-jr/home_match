import type { PropertyInventory, PropertyRoom } from "./types";

export const propertyInventory: PropertyInventory = {
  buildings: [
    { id: "building-01", name: "HomeMatch Bình Thạnh", address: "Điện Biên Phủ, TP.HCM", city: "TP. Hồ Chí Minh", ward: "Phường Thạnh Mỹ Tây" },
    { id: "building-02", name: "HomeMatch Quận 10", address: "Tô Hiến Thành, TP.HCM", city: "TP. Hồ Chí Minh", ward: "Phường Diên Hồng" },
  ],
  rooms: ([
    { id: "room-101", buildingId: "building-01", code: "BT.101", floor: 1, area: 25, monthlyRent: 4500000, status: "occupied" },
    { id: "room-102", buildingId: "building-01", code: "BT.102", floor: 1, area: 28, monthlyRent: 5200000, status: "available" },
    { id: "room-201", buildingId: "building-01", code: "BT.201", floor: 2, area: 30, monthlyRent: 5800000, status: "reserved" },
    { id: "room-301", buildingId: "building-02", code: "Q10.301", floor: 3, area: 22, monthlyRent: 3800000, status: "occupied" },
    { id: "room-302", buildingId: "building-02", code: "Q10.302", floor: 3, area: 26, monthlyRent: 4900000, status: "available" },
    { id: "room-401", buildingId: "building-02", code: "Q10.401", floor: 4, area: 32, monthlyRent: 6200000, status: "available" },
  ] satisfies Pick<PropertyRoom, "id" | "buildingId" | "code" | "floor" | "area" | "monthlyRent" | "status">[]).map((room, index) => ({
    ...room,
    deposit: "1 tháng",
    kind: index % 2 ? "Studio" : "Phòng trọ",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Máy lạnh", "Nội thất", "Chỗ để xe", "Giờ giấc tự do"],
    photos: [1, 2].map(photo => `/images/ai-assistant/room-${index % 4 + 1}-${photo}.jpg`),
    description: "Không gian sáng thoáng, có cửa sổ và khu bếp riêng. Phòng được trang bị nội thất cơ bản, thuận tiện sinh hoạt và đi lại. Thông tin trong khu quản trị này là dữ liệu mẫu để trải nghiệm giao diện.",
    availableFrom: "2026-11-01",
  })),
};
