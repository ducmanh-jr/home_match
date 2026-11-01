import type { OwnerPreviewData } from "./types";

export const ownerPreview: OwnerPreviewData = {
  buildings: [
    { id: "building-01", name: "HomeMatch Bình Thạnh", address: "Điện Biên Phủ, TP.HCM" },
    { id: "building-02", name: "HomeMatch Quận 10", address: "Tô Hiến Thành, TP.HCM" },
  ],
  rooms: [
    { id: "room-101", buildingId: "building-01", code: "BT.101", area: 25, monthlyRent: 4500000, status: "occupied" },
    { id: "room-102", buildingId: "building-01", code: "BT.102", area: 28, monthlyRent: 5200000, status: "available" },
    { id: "room-201", buildingId: "building-01", code: "BT.201", area: 30, monthlyRent: 5800000, status: "reserved" },
    { id: "room-301", buildingId: "building-02", code: "Q10.301", area: 22, monthlyRent: 3800000, status: "occupied" },
    { id: "room-302", buildingId: "building-02", code: "Q10.302", area: 26, monthlyRent: 4900000, status: "available" },
    { id: "room-401", buildingId: "building-02", code: "Q10.401", area: 32, monthlyRent: 6200000, status: "available" },
  ],
  listings: [
    { id: "listing-102", roomId: "room-102", title: "Studio thoáng sáng tại Bình Thạnh", status: "published" },
    { id: "listing-302", roomId: "room-302", title: "Phòng đầy đủ nội thất tại Quận 10", status: "published" },
    { id: "listing-401", roomId: "room-401", title: "Studio ban công rộng tại Quận 10", status: "draft" },
  ],
  leads: [
    { id: "lead-01", listingId: "listing-102", name: "Khách mẫu 01", viewingAt: null },
    { id: "lead-02", listingId: "listing-302", name: "Khách mẫu 02", viewingAt: "2026-11-03T09:00:00+07:00" },
    { id: "lead-03", listingId: "listing-102", name: "Khách mẫu 03", viewingAt: null },
  ],
  leases: [
    { id: "lease-01", roomId: "room-101", tenantName: "Người thuê mẫu 01", monthlyRent: 4500000, deposit: 4500000 },
    { id: "lease-02", roomId: "room-301", tenantName: "Người thuê mẫu 02", monthlyRent: 3800000, deposit: 3800000 },
  ],
  invoices: [
    { id: "invoice-01", leaseId: "lease-01", amount: 4500000, paidAmount: 4500000, status: "paid" },
    { id: "invoice-02", leaseId: "lease-02", amount: 3800000, paidAmount: 0, status: "pending" },
  ],
};
