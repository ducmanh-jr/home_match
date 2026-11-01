import type { OwnerPreviewData } from "./types";
import { propertyInventory } from "@/features/properties/mocks";

export const ownerPreview: OwnerPreviewData = {
  buildings: propertyInventory.buildings,
  rooms: propertyInventory.rooms,
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
