import { appConfig } from "@/lib/config";
import type { OwnerPreviewData } from "./types";
import { getOwnerListings } from "@/features/listings/api";

export async function getOwnerPreview(ownerId?: string): Promise<OwnerPreviewData> {
  if (appConfig.useMocks) {
    const { ownerPreview } = await import("./mocks");
    if (!ownerId) return ownerPreview;
    const listings = await getOwnerListings(ownerId);
    return { ...ownerPreview, listings: listings.map(({ id, roomId, title, status }) => ({ id, roomId, title, status })) };
  }
  throw new Error("Dữ liệu quản trị hiện chưa khả dụng. Vui lòng thử lại sau.");
}

