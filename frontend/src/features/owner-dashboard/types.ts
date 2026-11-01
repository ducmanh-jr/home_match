import type { ListingStatus } from "@/features/listings/types";

export interface OwnerBuilding {
  id: string;
  name: string;
  address: string;
}

export interface OwnerRoom {
  id: string;
  buildingId: string;
  code: string;
  area: number;
  monthlyRent: number;
  status: "available" | "occupied" | "reserved";
}

export interface OwnerPreviewData {
  buildings: OwnerBuilding[];
  rooms: OwnerRoom[];
  listings: { id: string; roomId: string; title: string; status: ListingStatus }[];
  leads: { id: string; listingId: string; name: string; viewingAt: string | null }[];
  leases: { id: string; roomId: string; tenantName: string; monthlyRent: number; deposit: number }[];
  invoices: { id: string; leaseId: string; amount: number; paidAmount: number; status: "paid" | "pending" }[];
}
