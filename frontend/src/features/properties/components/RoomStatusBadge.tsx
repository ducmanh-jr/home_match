import { ManagementBadge } from "@/components/management/ManagementUI";
import type { PropertyRoom } from "../types";

export const roomStatuses = {
  available: { label: "Còn trống", tone: "info" },
  occupied: { label: "Đang thuê", tone: "success" },
  reserved: { label: "Giữ chỗ", tone: "warning" },
} as const;

export function RoomStatusBadge({ status }: { status: PropertyRoom["status"]; }) {
  return <ManagementBadge tone={roomStatuses[status].tone}>{roomStatuses[status].label}</ManagementBadge>;
}
