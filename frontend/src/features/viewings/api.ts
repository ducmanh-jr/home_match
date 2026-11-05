import { readMockRecord, updateMockRecord } from "@/lib/mock-storage";
import type { LeadItem, ViewingItem } from "./types";
import { initialLeads, initialViewings } from "./mocks";

const STORAGE_KEY_LEADS = "owner_viewings_leads";
const STORAGE_KEY_VIEWINGS = "owner_viewings_appointments";

export async function getLeads(): Promise<LeadItem[]> {
  try {
    const stored = await readMockRecord<LeadItem[]>(STORAGE_KEY_LEADS);
    if (Array.isArray(stored)) return stored;
    return initialLeads;
  } catch {
    return initialLeads;
  }
}

export async function saveLead(lead: LeadItem): Promise<LeadItem> {
  return updateMockRecord<LeadItem[]>(STORAGE_KEY_LEADS, initialLeads, current => {
    const idx = current.findIndex(l => l.id === lead.id);
    if (idx >= 0) {
      const copy = [...current];
      copy[idx] = lead;
      return copy;
    }
    return [lead, ...current];
  }).then(list => list.find(l => l.id === lead.id) || lead);
}

export async function getViewings(): Promise<ViewingItem[]> {
  try {
    const stored = await readMockRecord<ViewingItem[]>(STORAGE_KEY_VIEWINGS);
    if (Array.isArray(stored)) return stored;
    return initialViewings;
  } catch {
    return initialViewings;
  }
}

export async function saveViewing(viewing: ViewingItem): Promise<ViewingItem> {
  return updateMockRecord<ViewingItem[]>(STORAGE_KEY_VIEWINGS, initialViewings, current => {
    const idx = current.findIndex(v => v.id === viewing.id);
    if (idx >= 0) {
      const copy = [...current];
      copy[idx] = viewing;
      return copy;
    }
    return [viewing, ...current];
  }).then(list => list.find(v => v.id === viewing.id) || viewing);
}

