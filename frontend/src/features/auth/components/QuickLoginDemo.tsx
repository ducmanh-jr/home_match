"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, Sparkles } from "lucide-react";
import { useAuth } from "../context";
import type { UserRole } from "../types";

export function QuickLoginDemo() {
  const router = useRouter();
  const { quickLogin } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);

  const handleQuickLogin = async (role: UserRole) => {
    setActiveRole(role);
    try {
      await quickLogin(role);
      setTimeout(() => {
        router.push(role === "renter" ? "/" : "/diagnostics");
      }, 500);
    } finally {
      setActiveRole(null);
    }
  };

  return (
    <div className="mb-6 p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-2xl">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-900 mb-2.5">
        <Sparkles size={14} className="text-orange-600" />
        <span>Trải nghiệm nhanh không cần nhập liệu:</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          type="button"
          onClick={() => handleQuickLogin("renter")}
          disabled={activeRole !== null}
          className="flex flex-col items-start p-2.5 bg-white border border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-xs transition-all text-left group cursor-pointer disabled:opacity-50"
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 group-hover:text-orange-600 mb-0.5">
            <User size={13} className="text-orange-500" />
            <span>Người thuê mẫu</span>
          </div>
          <span className="text-[11px] text-slate-500 truncate max-w-full">
            nguoithue@homematch.vn
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleQuickLogin("owner")}
          disabled={activeRole !== null}
          className="flex flex-col items-start p-2.5 bg-white border border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-xs transition-all text-left group cursor-pointer disabled:opacity-50"
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 group-hover:text-orange-600 mb-0.5">
            <Building2 size={13} className="text-orange-500" />
            <span>Chủ nhà mẫu</span>
          </div>
          <span className="text-[11px] text-slate-500 truncate max-w-full">
            chunha@homematch.vn
          </span>
        </button>
      </div>
    </div>
  );
}

