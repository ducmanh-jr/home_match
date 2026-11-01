import type { ListingFormValues, OwnerListing } from "./types";
import { listingStatuses } from "./constants";
import type { PropertyBuilding, PropertyRoom } from "@/features/properties/types";

export function emptyListingForm(): ListingFormValues {
  return { roomId: "", kind: "", area: "", bedrooms: "", bathrooms: "", city: "", ward: "", address: "", monthlyRent: "", deposit: "", electricity: "", water: "", serviceFee: "", parkingFee: "", amenities: [], rules: "", availableFrom: "", photos: [], title: "", description: "", contactName: "", contactPhone: "" };
}

export function roomToForm(room: PropertyRoom, building?: PropertyBuilding): ListingFormValues {
  return {
    ...emptyListingForm(), roomId: room.id, kind: room.kind, area: String(room.area), bedrooms: String(room.bedrooms), bathrooms: String(room.bathrooms),
    city: building?.city ?? "", ward: building?.ward ?? "", address: building?.address ?? "", monthlyRent: String(room.monthlyRent), deposit: room.deposit,
    amenities: [...room.amenities], availableFrom: room.availableFrom, description: room.description,
    photos: room.photos.map((url, index) => ({ id: `${room.id}-photo-${index}`, url, name: `Ảnh phòng ${room.code} ${index + 1}` })),
    electricity: "4.000 đ/kWh", water: "100.000 đ/người", serviceFee: "200.000 đ/tháng", parkingFee: "150.000 đ/xe", rules: "Tối đa 2 người. Không hút thuốc trong phòng.",
  };
}

export function validateListingStep(step: number, values: ListingFormValues): { field: keyof ListingFormValues; message: string } | null {
  if (step === 0) {
    if (!values.kind) return { field: "kind", message: "Chọn loại hình chỗ ở." };
    if (!Number.isFinite(Number(values.area)) || Number(values.area) < 5 || Number(values.area) > 500) return { field: "area", message: "Nhập diện tích từ 5 đến 500 m²." };
    if (!values.city.trim()) return { field: "city", message: "Chọn thành phố." };
    if (!values.ward.trim()) return { field: "ward", message: "Chọn phường/xã." };
    if (!values.address.trim()) return { field: "address", message: "Nhập địa chỉ chi tiết." };
    for (const field of ["bedrooms", "bathrooms"] as const) {
      if (values[field] !== "" && (!Number.isInteger(Number(values[field])) || Number(values[field]) < 0 || Number(values[field]) > 50)) return { field, message: "Nhập số nguyên từ 0 đến 50." };
    }
  }
  if (step === 1) {
    const rent = Number(values.monthlyRent);
    if (!Number.isFinite(rent) || rent < 500000 || rent > 200000000) return { field: "monthlyRent", message: "Giá thuê phải từ 500.000 đến 200.000.000 đ/tháng." };
    if (!values.deposit.trim()) return { field: "deposit", message: "Nhập thông tin tiền cọc." };
  }
  if (step === 2) {
    if (!values.photos.length || values.photos.length > 8) return { field: "photos", message: "Chọn từ 1 đến 8 ảnh thật của chỗ ở." };
    if (values.title.trim().length < 10 || values.title.trim().length > 90) return { field: "title", message: "Tiêu đề cần từ 10 đến 90 ký tự." };
    if (values.description.trim().length < 60) return { field: "description", message: "Mô tả cần ít nhất 60 ký tự." };
  }
  if (step === 3) {
    if (!values.contactName.trim()) return { field: "contactName", message: "Nhập tên người liên hệ." };
    if (!/^0[0-9]{9}$/.test(values.contactPhone.replace(/[\s.()-]/g, ""))) return { field: "contactPhone", message: "Nhập số điện thoại 10 số, bắt đầu bằng 0." };
  }
  return null;
}

export function listingQuality(values: ListingFormValues) {
  return Math.round(Math.min(values.photos.length, 8) / 8 * 35 + Math.min(values.description.trim().length / 600, 1) * 25 + (Number(values.area) >= 5 ? 15 : 0) + (values.bedrooms !== "" ? 10 : 0) + (values.ward ? 10 : 0) + (values.rules.trim() ? 5 : 0));
}

export function isListingFormValues(value: unknown): value is ListingFormValues {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  const fields = Object.keys(emptyListingForm()).filter(key => key !== "photos" && key !== "amenities");
  return fields.every(field => typeof record[field] === "string")
    && Array.isArray(record.amenities) && record.amenities.every(item => typeof item === "string")
    && Array.isArray(record.photos) && record.photos.length <= 8
    && record.photos.every(photo => photo && typeof photo.id === "string" && typeof photo.name === "string" && typeof photo.url === "string" && (/^\/images\//.test(photo.url) || /^data:image\/(jpeg|png|webp);base64,/.test(photo.url)));
}

export function isOwnerListing(value: unknown): value is OwnerListing {
  if (!isListingFormValues(value)) return false;
  const record = value as unknown as Record<string, unknown>;
  return typeof record.id === "string" && typeof record.code === "string"
    && typeof record.status === "string" && Object.prototype.hasOwnProperty.call(listingStatuses, record.status)
    && typeof record.views === "number" && typeof record.saves === "number"
    && typeof record.updatedAt === "string" && typeof record.createdAt === "string"
    && Array.isArray(record.history) && record.history.every(event => event && typeof event.id === "string" && typeof event.at === "string" && typeof event.description === "string");
}
