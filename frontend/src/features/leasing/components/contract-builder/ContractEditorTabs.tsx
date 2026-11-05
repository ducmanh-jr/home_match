"use client";

import React from "react";
import { Building2, FileText, Users } from "lucide-react";

export type ContractTabKey = "terms" | "parties" | "property";

interface ContractEditorTabsProps {
  activeTab: ContractTabKey;
  onTabChange: (tab: ContractTabKey) => void;
}

const TABS: { key: ContractTabKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: "terms", label: "1. Điều kiện & Loại hình", icon: FileText },
  { key: "parties", label: "2. Thông tin hai bên", icon: Users },
  { key: "property", label: "3. Phòng & Bàn giao", icon: Building2 },
];

export function ContractEditorTabs({ activeTab, onTabChange }: ContractEditorTabsProps) {
  return (
    <div className="flex rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs">
      {TABS.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-center text-xs font-semibold transition-all ${
              isActive
                ? "bg-orange-500 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

