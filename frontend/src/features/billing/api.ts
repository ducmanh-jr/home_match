import { readMockRecord, updateMockRecord } from "@/lib/mock-storage";
import type { Invoice } from "./types";
import { initialInvoices } from "./mocks";

const STORAGE_KEY_INVOICES = "owner_billing_invoices";

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const stored = await readMockRecord<Invoice[]>(STORAGE_KEY_INVOICES);
    if (Array.isArray(stored)) return stored;
    return initialInvoices;
  } catch {
    return initialInvoices;
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | undefined> {
  const all = await getInvoices();
  return all.find(inv => inv.id === id);
}

export async function saveInvoice(invoice: Invoice): Promise<Invoice> {
  return updateMockRecord<Invoice[]>(STORAGE_KEY_INVOICES, initialInvoices, current => {
    const idx = current.findIndex(i => i.id === invoice.id);
    if (idx >= 0) {
      const copy = [...current];
      copy[idx] = invoice;
      return copy;
    }
    return [invoice, ...current];
  }).then(list => list.find(i => i.id === invoice.id) || invoice);
}

export async function recordPayment(invoiceId: string, amount: number, note?: string): Promise<Invoice> {
  const list = await updateMockRecord<Invoice[]>(STORAGE_KEY_INVOICES, initialInvoices, current => {
    return current.map(inv => {
      if (inv.id !== invoiceId) return inv;
      const newPaid = Math.min(inv.totalAmount, inv.paidAmount + amount);
      const newDebt = Math.max(0, inv.totalAmount - newPaid);
      const isFull = newDebt === 0;
      return {
        ...inv,
        paidAmount: newPaid,
        debtAmount: newDebt,
        status: isFull ? ("paid" as const) : inv.status,
        paidAt: isFull ? new Date().toISOString() : inv.paidAt,
        note: note ? `${inv.note ? inv.note + " | " : ""}${note}` : inv.note,
      };
    });
  });

  const updated = list.find(i => i.id === invoiceId);
  if (!updated) throw new Error("Không tìm thấy hóa đơn cần thanh toán");
  return updated;
}

export async function deleteInvoice(id: string): Promise<void> {
  await updateMockRecord<Invoice[]>(STORAGE_KEY_INVOICES, initialInvoices, current => {
    return current.filter(i => i.id !== id);
  });
}
