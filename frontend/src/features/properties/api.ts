import { appConfig } from "@/lib/config";
import type { PropertyInventory } from "./types";

export async function getPropertyInventory(): Promise<PropertyInventory> {
  if (appConfig.useMocks) {
    const { propertyInventory } = await import("./mocks");
    return propertyInventory;
  }
  throw new Error("Danh mục phòng chưa khả dụng. Vui lòng thử lại sau.");
}
