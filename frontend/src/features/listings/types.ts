import type { PropertyInventory } from "@/features/properties/types";

export interface ListingPhoto { id: string; url: string; name: string }
export type ListingStatus = "published" | "draft" | "pending_review" | "hidden" | "needs_update";

export interface ListingFormValues {
  roomId: string;
  kind: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  city: string;
  ward: string;
  address: string;
  monthlyRent: string;
  deposit: string;
  electricity: string;
  water: string;
  serviceFee: string;
  parkingFee: string;
  amenities: string[];
  rules: string;
  availableFrom: string;
  photos: ListingPhoto[];
  title: string;
  description: string;
  contactName: string;
  contactPhone: string;
}

export interface OwnerListing extends ListingFormValues {
  id: string;
  code: string;
  status: ListingStatus;
  updatedAt: string;
  createdAt: string;
  views: number;
  saves: number;
  history: { id: string; at: string; description: string }[];
}

export interface ListingDraft {
  values: ListingFormValues;
  step: number;
  savedAt: string;
}

export interface ListingWorkspace extends PropertyInventory {
  listings: OwnerListing[];
  leads: { id: string; listingId: string; name: string; viewingAt: string | null }[];
}
