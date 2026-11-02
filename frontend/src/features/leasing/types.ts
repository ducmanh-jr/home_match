export type ContractStatus = "draft" | "active" | "expiring" | "ended";
export type PropertyCategory = "room" | "apartment" | "house";

export interface PartyInfo {
  fullName: string;
  identityNumber: string;
  phone: string;
  address: string;
  identityDate?: string;
  identityPlace?: string;
  bankAccount?: string;
  bankName?: string;
}

export interface RentalTerms {
  monthlyRent: number;
  depositAmount: number;
  paymentCycleMonths: number;
  paymentDueDay: number; // e.g. day 5 of the month
  paymentMethod: "transfer" | "cash";
  noticeDays?: number;
  bankInfo?: string;
}

export interface ServiceTerms {
  electricityType: "state_tiered" | "fixed";
  electricityRate?: number; // VND/kWh if fixed
  waterType: "meter" | "fixed_head";
  waterRate?: number; // VND/m3 or VND/person/month
  internetFee: number;
  parkingFee: number;
  serviceFee: number; // elevator, cleaning, etc.
}

export interface LeaseContract {
  id: string;
  code: string; // e.g. "HD-2026-001"
  propertyCategory: PropertyCategory;
  buildingId: string;
  buildingName: string;
  roomId: string;
  roomCode: string;
  propertyAddress: string;
  roomArea: number;

  landlord: PartyInfo;
  tenant: PartyInfo;
  
  rentalTerms: RentalTerms;
  serviceTerms: ServiceTerms;

  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  handoverDate: string; // YYYY-MM-DD
  furnitureNotes?: string;

  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TenantSummary {
  id: string;
  fullName: string;
  phone: string;
  identityNumber: string;
  roomCode: string;
  buildingName: string;
  contractCode: string;
  monthlyRent: number;
  deposit?: number;
  startDate: string;
  endDate: string;
  status: "active" | "expiring" | "ended";
}

