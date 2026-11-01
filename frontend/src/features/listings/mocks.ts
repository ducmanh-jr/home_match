import { propertyInventory } from "@/features/properties/mocks";
import { roomToForm } from "./form";
import type { OwnerListing } from "./types";

export const ownerListings: OwnerListing[] = [
  { id: "listing-102", roomId: "room-102", title: "Studio thoáng sáng tại Bình Thạnh", status: "published", views: 248, saves: 19 },
  { id: "listing-302", roomId: "room-302", title: "Phòng đầy đủ nội thất tại Quận 10", status: "published", views: 186, saves: 12 },
  { id: "listing-401", roomId: "room-401", title: "Studio ban công rộng tại Quận 10", status: "draft", views: 0, saves: 0 },
].map((listing, index) => {
  const room = propertyInventory.rooms.find(item => item.id === listing.roomId)!;
  return {
    ...roomToForm(room, propertyInventory.buildings.find(building => building.id === room.buildingId)),
    ...listing, status: listing.status as OwnerListing["status"], code: `HM-${102 + index}`,
    createdAt: "2026-10-25T09:00:00+07:00", updatedAt: "2026-11-01T09:00:00+07:00",
    contactName: "Chủ nhà mẫu", contactPhone: "0901234567",
    history: [{ id: `history-${listing.id}`, at: "2026-11-01T09:00:00+07:00", description: listing.status === "draft" ? "Đã lưu bản nháp mẫu." : "Tin mẫu đang hiển thị." }],
  };
});
