import { appConfig } from "@/lib/config";
import type { AssistantReply, RoomListing } from "./types";

export async function getAssistantListings(): Promise<RoomListing[]> {
  if (appConfig.useMocks) {
    const { MOCK_LISTINGS } = await import("./mocks");
    return MOCK_LISTINGS;
  }

  throw new Error("Chưa thể tải dữ liệu phòng. Vui lòng thử lại sau.");
}

export async function getAssistantReply(query: string): Promise<AssistantReply> {
  if (appConfig.useMocks) {
    const { createMockReply } = await import("./mocks");
    await new Promise((resolve) => setTimeout(resolve, 600));
    return createMockReply(query);
  }

  throw new Error("Trợ lý hiện chưa thể trả lời. Vui lòng thử lại sau.");
}
