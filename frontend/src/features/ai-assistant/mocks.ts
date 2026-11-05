import type { AssistantReply, RoomListing } from "./types";

export const MOCK_LISTINGS: RoomListing[] = [
  {
    id: "hm_001",
    title: "Studio Full nội thất ban công thoáng gần ĐH Bách Khoa",
    priceNum: 5500000,
    priceStr: "5.500.000 đ/tháng",
    depositStr: "Cọc 1 tháng",
    address: "Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM",
    district: "Quận 10",
    areaM2: 28,
    floor: 3,
    roomType: "Studio",
    photos: [
      "/images/ai-assistant/room-1-1.jpg",
      "/images/ai-assistant/room-1-2.jpg",
    ],
    tags: ["Có máy lạnh", "Máy giặt riêng", "Gác lửng", "Khóa vân tay"],
    electricity: "3.800 đ/kWh",
    water: "100.000 đ/người",
    wifi: "Miễn phí",
    parking: "120.000 đ/xe",
    landlord: {
      name: "Cô Bích",
      phone: "0908 123 456",
    },
  },
  {
    id: "hm_002",
    title: "Phòng trọ cao cấp cửa sổ lớn gần trường ĐH Kinh Tế",
    priceNum: 4800000,
    priceStr: "4.800.000 đ/tháng",
    depositStr: "Cọc 1 tháng",
    address: "Nguyễn Tri Phương, Phường 5, Quận 10, TP.HCM",
    district: "Quận 10",
    areaM2: 24,
    floor: 2,
    roomType: "Phòng trọ",
    photos: [
      "/images/ai-assistant/room-2-1.jpg",
      "/images/ai-assistant/room-2-2.jpg",
    ],
    tags: ["Máy lạnh Inverter", "Giờ giấc tự do", "Camera 24/7", "Không chung chủ"],
    electricity: "3.500 đ/kWh",
    water: "80.000 đ/người",
    wifi: "Miễn phí",
    parking: "100.000 đ/xe",
    landlord: {
      name: "Anh Tuấn",
      phone: "0912 345 678",
    },
  },
  {
    id: "hm_003",
    title: "Căn hộ mini 1 phòng ngủ tách bếp riêng tại Bình Thạnh",
    priceNum: 6200000,
    priceStr: "6.200.000 đ/tháng",
    depositStr: "Cọc 1.5 tháng",
    address: "Điện Biên Phủ, Phường 15, Bình Thạnh, TP.HCM",
    district: "Bình Thạnh",
    areaM2: 35,
    floor: 4,
    roomType: "Căn hộ mini",
    photos: [
      "/images/ai-assistant/room-3-1.jpg",
      "/images/ai-assistant/room-3-2.jpg",
    ],
    tags: ["Bếp riêng", "Ban công", "Thang máy", "Nuôi thú cưng"],
    electricity: "4.000 đ/kWh",
    water: "120.000 đ/người",
    wifi: "100.000 đ/phòng",
    parking: "150.000 đ/xe",
    landlord: {
      name: "Chị Hạnh",
      phone: "0933 888 999",
    },
  },
  {
    id: "hm_004",
    title: "Phòng trọ sinh viên tiện nghi giá tốt sát ĐH Bách Khoa",
    priceNum: 3800000,
    priceStr: "3.800.000 đ/tháng",
    depositStr: "Cọc 1 tháng",
    address: "Tô Hiến Thành, Phường 13, Quận 10, TP.HCM",
    district: "Quận 10",
    areaM2: 20,
    floor: 2,
    roomType: "Phòng trọ",
    photos: [
      "/images/ai-assistant/room-4-1.jpg",
      "/images/ai-assistant/room-4-2.jpg",
    ],
    tags: ["Giá rẻ", "Gần bến xe buýt", "An ninh cao", "Wifi tốc độ cao"],
    electricity: "3.500 đ/kWh",
    water: "70.000 đ/người",
    wifi: "Miễn phí",
    parking: "Miễn phí 1 xe",
    landlord: {
      name: "Bác Hùng",
      phone: "0987 654 321",
    },
  },
];

// AI Reasoning simulation
export function createMockReply(query: string): AssistantReply {
  let text = `Mình đã nhận nhu cầu “${query}”. Bạn có thể xem các lựa chọn bên bảng kết quả, kiểm tra chi phí và hỏi thêm về tiện ích nhé.`;
  let comparisonIds: string[] | undefined;
  const normalized = query.toLocaleLowerCase("vi-VN");

  if (normalized.includes("bách khoa")) {
    text += " Mình ưu tiên khu vực Quận 10 để thuận tiện đi học.";
  } else if (normalized.includes("kinh tế")) {
    text += " Mình ưu tiên khu vực Nguyễn Tri Phương và những căn có máy lạnh.";
  } else if (normalized.includes("so sánh")) {
    text += " Mình đã mở bảng so sánh để bạn đối chiếu giá, diện tích và các khoản phí.";
    comparisonIds = [...MOCK_LISTINGS].sort((first, second) => first.priceNum - second.priceNum).slice(0, 2).map(listing => listing.id);
  }

  return {
    text,
    comparisonIds,
    suggestedPrompts: [
      "Phòng nào có giờ giấc tự do không chung chủ?",
      "Lọc căn có máy giặt riêng",
      "Tổng chi phí điện nước ước tính mỗi tháng là bao nhiêu?",
    ],
  };
}
