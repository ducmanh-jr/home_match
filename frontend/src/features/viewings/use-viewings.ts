"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadItem, ViewingItem } from "./types";
import { getLeads, getViewings, saveLead, saveViewing } from "./api";

export function useViewings() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [viewings, setViewings] = useState<ViewingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [leadsData, viewingsData] = await Promise.all([
        getLeads(),
        getViewings(),
      ]);
      setLeads(leadsData);
      setViewings(viewingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải dữ liệu khách quan tâm & lịch xem phòng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleSaveLead = useCallback(
    async (lead: LeadItem) => {
      const saved = await saveLead(lead);
      await reload();
      return saved;
    },
    [reload]
  );

  const handleSaveViewing = useCallback(
    async (viewing: ViewingItem) => {
      const saved = await saveViewing(viewing);
      await reload();
      return saved;
    },
    [reload]
  );

  return {
    leads,
    viewings,
    loading,
    error,
    reload,
    saveLead: handleSaveLead,
    saveViewing: handleSaveViewing,
  };
}

