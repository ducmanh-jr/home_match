import { ManagementBadge } from "@/components/management/ManagementUI";
import { listingStatuses } from "../constants";
import type { ListingStatus } from "../types";

export function ListingStatusBadge({ status }: { status: ListingStatus; }) {
  return <ManagementBadge tone={listingStatuses[status].tone}>{listingStatuses[status].label}</ManagementBadge>;
}
