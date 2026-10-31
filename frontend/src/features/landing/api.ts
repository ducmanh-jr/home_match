import { appConfig } from "@/lib/config";
import type { LandingContent } from "./types";
import { landingMock } from "./mocks";

export async function getLandingContent(): Promise<LandingContent> {
  if (appConfig.useMocks) {
    return landingMock;
  }

  // The backend currently exposes module health endpoints only. Wire the real
  // request here when the landing API and its contract have been confirmed.
  throw new Error(
    "Dữ liệu trang chủ hiện chưa khả dụng. Vui lòng thử lại sau.",
  );
}
