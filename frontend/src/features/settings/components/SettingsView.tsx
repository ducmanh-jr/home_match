"use client";

import React, { useState } from "react";
import type { SettingsTabId } from "../types";
import { SettingsTabs } from "./SettingsTabs";
import { ProfileSettingsTab } from "./ProfileSettingsTab";
import { SecuritySettingsTab } from "./SecuritySettingsTab";

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Cài đặt</h1>
        <p className="text-xs text-slate-500 mt-1">
          Sáu khu cấu hình của hệ thống, gộp trong một trang.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col gap-6">
        {/* Horizontal Navigation Tabs */}
        <SettingsTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Tab 1: Hồ sơ tài khoản */}
        {activeTab === "profile" && <ProfileSettingsTab />}

        {/* Tab 2: Bảo mật (Đổi mật khẩu) */}
        {activeTab === "security" && <SecuritySettingsTab />}
      </div>
    </div>
  );
}

