"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context";
import { getListingWorkspace } from "./api";
import type { ListingWorkspace } from "./types";

export function useListingWorkspace() {
  const { user } = useAuth();
  const [data, setData] = useState<ListingWorkspace | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setError(null);
    getListingWorkspace(user.id).then(value => { if (active) setData(value); }, reason => { if (active) setError(reason instanceof Error ? reason.message : "Không tải được tin đăng."); });
    return () => { active = false; };
  }, [user?.id, attempt]);
  return { data, error, retry, ownerId: user?.id ?? "" };
}
