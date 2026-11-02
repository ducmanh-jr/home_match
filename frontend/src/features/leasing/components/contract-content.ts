import type { LeaseContract, ServiceTerms } from "../types";
import { formatMoney } from "@/features/listings/constants";

export interface ClauseItem {
  title: string;
  paragraphs: string[];
}

export function getElectricityClauseText(services: ServiceTerms): string {
  if (services.electricityType === "state_tiered") {
    return "Tính theo biểu giá bán lẻ điện sinh hoạt bậc thang do Nhà nước quy định theo chỉ số công tơ thực tế.";
  }
  const rate = services.electricityRate || 3500;
  return `Đơn giá cố định: ${formatMoney(rate)}/kWh tính theo chỉ số công tơ thực tế.`;
}

export function getWaterClauseText(services: ServiceTerms): string {
  if (services.waterType === "meter") {
    const rate = services.waterRate || 20000;
    return `Tính theo chỉ số đồng hồ đo nước thực tế: ${formatMoney(rate)}/m³.`;
  }
  const rate = services.waterRate || 100000;
  return `Khoán cố định theo đầu người: ${formatMoney(rate)}/người/tháng.`;
}

export function getOtherServicesClauseText(services: ServiceTerms): string {
  const parts: string[] = [];
  if (services.internetFee > 0) parts.push(`Internet (${formatMoney(services.internetFee)}/tháng)`);
  if (services.parkingFee > 0) parts.push(`Gửi xe (${formatMoney(services.parkingFee)}/tháng)`);
  if (services.serviceFee > 0) parts.push(`Phí dịch vụ chung (${formatMoney(services.serviceFee)}/tháng)`);

  if (parts.length === 0) {
    return "Các chi phí dịch vụ khác (nếu có) thu đúng theo thỏa thuận và niêm yết công khai tại cơ sở.";
  }
  return `Các chi phí dịch vụ khác: ${parts.join(", ")}.`;
}

export function getSpecificCategoryClauses(contract: LeaseContract): ClauseItem[] {
  const category = contract.propertyCategory || "room";
  const services = contract.serviceTerms;

  if (category === "room") {
    return [
      {
        title: "Điều 4. Giá điện, nước và chi phí dịch vụ",
        paragraphs: [
          `4.1. Tiền điện: ${getElectricityClauseText(services)}`,
          `4.2. Tiền nước sinh hoạt: ${getWaterClauseText(services)}`,
          `4.3. ${getOtherServicesClauseText(services)}`,
        ],
      },
      {
        title: "Điều 5. An toàn phòng cháy chữa cháy",
        paragraphs: [
          "5.1. Hai bên cam kết tuân thủ nghiêm ngặt Luật Phòng cháy và chữa cháy. Tuyệt đối không tích trữ chất dễ cháy nổ trong phòng.",
          "5.2. Bên cho thuê trang bị đầy đủ bình chữa cháy, tiêu lệnh PCCC và hướng dẫn lối thoát hiểm theo quy định.",
        ],
      },
      {
        title: "Điều 6. Đăng ký tạm trú và nội quy sinh hoạt",
        paragraphs: [
          "6.1. Bên cho thuê có trách nhiệm cung cấp giấy tờ và hướng dẫn Bên thuê thực hiện đăng ký tạm trú qua VNeID hoặc Công an địa phương theo Luật Cư trú.",
          "6.2. Bên thuê có trách nhiệm giữ gìn an ninh trật tự, vệ sinh chung và tuân thủ nội quy sinh hoạt tại nhà trọ.",
        ],
      },
    ];
  }

  if (category === "apartment") {
    return [
      {
        title: "Điều 4. Phí quản lý và dịch vụ toà nhà",
        paragraphs: [
          "4.1. Phí quản lý toà nhà hằng tháng do Bên thuê chi trả trực tiếp cho Ban quản lý toà nhà (hoặc thanh toán cùng tiền phòng theo thông báo của Ban quản lý).",
          "4.2. Phí gửi xe (ô tô, xe máy) và các tiện ích toà nhà tính theo quy định của Ban quản lý toà nhà.",
        ],
      },
      {
        title: "Điều 5. Thẻ cư dân, chỗ để xe và nội quy toà nhà",
        paragraphs: [
          "5.1. Bên cho thuê có trách nhiệm hỗ trợ làm thủ tục cấp thẻ cư dân và đăng ký vé gửi xe cho Bên thuê tại ban quản lý.",
          "5.2. Bên thuê cam kết tuân thủ đầy đủ Bản nội quy toà nhà và các quy chế vận hành chung cư.",
        ],
      },
      {
        title: "Điều 6. Cải tạo và lắp đặt trong căn hộ",
        paragraphs: [
          "6.1. Bên thuê không được tự ý khoan đục tường, thay đổi kết cấu kiến trúc hoặc hệ thống kỹ thuật của căn hộ.",
          "6.2. Mọi việc lắp đặt thêm thiết bị hoặc sửa chữa phải được sự đồng ý bằng văn bản của Bên cho thuê và Ban quản lý.",
        ],
      },
    ];
  }

  // House (nhà nguyên căn)
  return [
    {
      title: "Điều 4. Phân định sửa chữa lớn và sửa chữa nhỏ",
      paragraphs: [
        "4.1. Sửa chữa lớn (kết cấu tường, mái, móng, hệ thống cấp thoát nước chính): Do Bên cho thuê chịu trách nhiệm chi trả và tổ chức sửa chữa kịp thời.",
        "4.2. Sửa chữa nhỏ và hao mòn thông thường (thay bóng đèn, vòi nước, khóa cửa...): Do Bên thuê tự thực hiện và chịu chi phí.",
      ],
    },
    {
      title: "Điều 5. Hợp đồng điện, nước và các dịch vụ",
      paragraphs: [
        "5.1. Bên thuê trực tiếp sử dụng và thanh toán hóa đơn điện, nước, internet với nhà cung cấp dịch vụ trong suốt thời gian thuê.",
      ],
    },
    {
      title: "Điều 6. Sử dụng sân, khuôn viên và mặt tiền",
      paragraphs: [
        "6.1. Bên thuê được toàn quyền sử dụng khuôn viên nhà, sân trước, ban công đúng với mục đích ở và sinh hoạt đã thỏa thuận.",
      ],
    },
  ];
}

export function getGeneralClauses(contract: LeaseContract): {
  noticeDays: number;
  bankPaymentText: string;
  cycleText: string;
} {
  const terms = contract.rentalTerms;
  const landlord = contract.landlord;
  const noticeDays = terms.noticeDays ?? 30;

  let bankPaymentText = "";
  if (terms.paymentMethod === "transfer") {
    if (terms.bankInfo && terms.bankInfo.trim()) {
      bankPaymentText = terms.bankInfo.trim();
    } else if (landlord.bankAccount) {
      bankPaymentText = `${landlord.bankName ? landlord.bankName + " – " : ""}STK: ${landlord.bankAccount} – ${landlord.fullName}`;
    } else {
      bankPaymentText = "…………………………………………";
    }
  }

  const cycleText = terms.paymentCycleMonths === 1 ? "Hàng tháng" : `${terms.paymentCycleMonths} tháng / lần`;

  return {
    noticeDays,
    bankPaymentText,
    cycleText,
  };
}

