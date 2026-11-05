"use client";

import React from "react";
import { SETTINGS_TABS, type SettingsTabId } from "../types";

interface SettingsTabsProps {
  activeTab: SettingsTabId;
  onSelectTab: (tab: SettingsTabId) => void;
}

export function SettingsTabs({ activeTab, onSelectTab }: SettingsTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-100 text-xs sm:text-sm font-medium overflow-x-auto pb-px">
      {SETTINGS_TABS.map(tab => {
        if (!tab.isAvailable) {
          return (
            <button
              key={tab.id}
              type="button"
              disabled
              className="pb-3 text-slate-400 cursor-not-allowed whitespace-nowrap relative select-none"
              title="Tính năng đang được phát triển"
            >
              {tab.label}
            </button>
          );
        }

        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
              isActive
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

