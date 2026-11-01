"use client";

import { useCallback, useEffect, useState } from "react";
import { getOwnerPreview } from "./api";
import type { OwnerPreviewData } from "./types";
import { useAuth } from "@/features/auth/context";

export function useOwnerPreview() {
  const { user } = useAuth();
  const [data, setData] = useState<OwnerPreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    getOwnerPreview(user?.id).then(
      value => { if (active) setData(value); },
      reason => { if (active) setError(reason instanceof Error ? reason.message : "Không thể đọc dữ liệu quản trị."); },
    );
    return () => { active = false; };
  }, [attempt, user?.id]);
  return { data, error, retry };
}
