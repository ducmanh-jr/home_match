"use client";

import type { UserRole } from "../types";
import { User, Building2 } from "lucide-react";

interface RoleTabsProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleTabs({ selectedRole, onChange }: RoleTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Chọn loại tài khoản"
      className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-sm font-medium border border-slate-200"
    >
      <button
        type="button"
        role="tab"
        aria-selected={selectedRole === "renter"}
        onClick={() => onChange("renter")}
        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 ${
          selectedRole === "renter"
            ? "bg-white text-slate-900 shadow-sm font-semibold"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <User size={17} className={selectedRole === "renter" ? "text-orange-500" : "text-slate-400"} />
        <span>Người thuê</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={selectedRole === "owner"}
        onClick={() => onChange("owner")}
        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 ${
          selectedRole === "owner"
            ? "bg-white text-slate-900 shadow-sm font-semibold"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <Building2 size={17} className={selectedRole === "owner" ? "text-orange-500" : "text-slate-400"} />
        <span>Chủ nhà</span>
      </button>
    </div>
  );
}

