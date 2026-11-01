import { appConfig } from "@/lib/config";
import type { OwnerPreviewData } from "./types";

export async function getOwnerPreview(): Promise<OwnerPreviewData> {
  if (appConfig.useMocks) {
    const { ownerPreview } = await import("./mocks");
    return ownerPreview;
  }
  throw new Error("Dữ liệu quản trị hiện chưa khả dụng. Vui lòng thử lại sau.");
}
