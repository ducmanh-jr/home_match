"use client";

import { useCallback, useEffect, useState } from "react";
import type { Invoice } from "./types";
import { getInvoices, recordPayment, saveInvoice, deleteInvoice } from "./api";

export function useBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInvoices();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách hóa đơn.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleRecordPayment = useCallback(
    async (invoiceId: string, amount: number, note?: string) => {
      const updated = await recordPayment(invoiceId, amount, note);
      await reload();
      return updated;
    },
    [reload]
  );

  const handleSaveInvoice = useCallback(
    async (invoice: Invoice) => {
      const saved = await saveInvoice(invoice);
      await reload();
      return saved;
    },
    [reload]
  );

  const handleDeleteInvoice = useCallback(
    async (id: string) => {
      await deleteInvoice(id);
      await reload();
    },
    [reload]
  );

  return {
    invoices,
    loading,
    error,
    reload,
    recordPayment: handleRecordPayment,
    saveInvoice: handleSaveInvoice,
    deleteInvoice: handleDeleteInvoice,
  };
}
