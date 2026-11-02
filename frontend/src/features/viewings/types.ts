export type LeadStatus = "new" | "contacted" | "confirmed" | "cancelled";

export interface LeadItem {
  id: string;
  fullName: string;
  phone: string; // e.g. "0999922•••"
  interestedRoomCode: string; // e.g. "AVCAVHHJSAXQ"
  status: LeadStatus;
  viewingAt: string | null; // e.g. "2026-10-22T14:00:00+07:00"
  viewingFormatted?: string; // e.g. "22/10/2026 14:00"
  registeredAt: string; // e.g. "2026-10-22"
  registeredFormatted?: string; // e.g. "22/10/2026"
  notes?: string;
}

export type ViewingStatus = "scheduled" | "completed" | "cancelled" | "no_show";

export interface ViewingItem {
  id: string;
  leadId: string;
  customerName: string;
  customerPhone: string;
  roomCode: string;
  buildingName?: string;
  scheduledAt: string; // ISO string e.g. "2026-10-22T14:00:00+07:00"
  scheduledFormatted: string; // e.g. "22/10/2026 14:00"
  guideName?: string; // e.g. "Chưa phân công"
  status: ViewingStatus;
  notes?: string;
}

export type ViewingFilterPeriod = "upcoming" | "today" | "this_week" | "all" | "past";

