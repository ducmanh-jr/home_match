"use client";

import React, { useState } from "react";
import { CheckCircle2, User } from "lucide-react";
import { useAuth } from "@/features/auth/context";

export function ProfileSettingsTab() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.fullName || "Hùng Dương");
  const [phone, setPhone] = useState("0912 345 678");
  const email = user?.email || "duongtienhunght@gmail.com";
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Đã lưu thông tin hồ sơ tài khoản thành công!");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3500);
  };

  const firstLetter = (displayName.trim()[0] || "H").toUpperCase();

  return (
    <div className="flex flex-col gap-6">
      {/* Section Title */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
          <User size={18} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Hồ sơ tài khoản</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Tên hiển thị và số điện thoại của chính bạn — dùng khi HubHome liên hệ về tin đăng và lịch xem.
          </p>
        </div>
      </div>

      {/* User Badge Info Row */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center border border-purple-200/80">
          {firstLetter}
        </div>
        <strong className="text-sm font-bold text-slate-900">{displayName}</strong>
        <span className="text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-200/70 px-2.5 py-0.5 rounded-full">
          Tài khoản chủ nhà
        </span>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 max-w-xl">
        {successMsg && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tên hiển thị */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="displayName" className="text-xs font-medium text-slate-700">
            Tên hiển thị
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200/90 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white transition-colors"
            placeholder="Nhập tên hiển thị của bạn"
            required
          />
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-slate-700">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200/90 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white transition-colors"
            placeholder="Ví dụ: 0912 345 678"
          />
        </div>

        {/* Email đăng nhập */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-slate-700">
            Email đăng nhập
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200/90 text-xs text-slate-600 bg-slate-50/80 cursor-not-allowed select-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      {/* Warning Note Box */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-orange-50/70 border border-orange-200/70 text-xs text-orange-950 leading-relaxed max-w-2xl mt-2">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-orange-600 text-orange-600 text-[10px] font-bold mt-0.5 shrink-0">
          !
        </span>
        <p>
          Tên và số điện thoại ở đây dùng khi HubHome liên hệ về tin đăng và lịch xem của bạn. Khách thuê <b>KHÔNG</b> thấy số này — HubHome nối hai bên sau khi đã xác nhận lịch.
        </p>
      </div>
    </div>
  );
}

