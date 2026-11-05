"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeaseContract, TenantSummary } from "./types";
import { getContracts, getTenants, saveContract, deleteContract } from "./api";

export function useLeasing() {
  const [contracts, setContracts] = useState<LeaseContract[]>([]);
  const [tenants, setTenants] = useState<TenantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [cList, tList] = await Promise.all([getContracts(), getTenants()]);
      setContracts(cList);
      setTenants(tList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải dữ liệu hợp đồng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleSave = useCallback(async (contract: LeaseContract) => {
    const saved = await saveContract(contract);
    await reload();
    return saved;
  }, [reload]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteContract(id);
    await reload();
  }, [reload]);

  return {
    contracts,
    tenants,
    loading,
    error,
    reload,
    saveContract: handleSave,
    deleteContract: handleDelete,
  };
}

