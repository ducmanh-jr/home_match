export type InvoiceStatus = "paid" | "pending" | "overdue" | "partially_paid";

export interface InvoiceItem {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface InvoiceLandlord {
  fullName: string;
  phone: string;
  bankAccount: string;
  bankName: string;
}

export interface Invoice {
  id: string;
  code: string; // e.g. "INV-2026-11-01"
  leaseId: string;
  contractCode: string;
  tenantName: string;
  tenantPhone: string;
  roomCode: string;
  buildingName: string;
  landlord?: InvoiceLandlord;
  
  month: number;
  year: number;
  periodLabel: string; // e.g. "Tháng 11/2026"
  
  items: InvoiceItem[];
  totalAmount: number;
  paidAmount: number;
  debtAmount: number;
  
  dueDate: string; // YYYY-MM-DD
  paidAt?: string;
  status: InvoiceStatus;
  note?: string;
}

