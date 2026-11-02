"use client";

import React from "react";
import type { PartyInfo } from "../../types";

interface PartiesFormProps {
  landlord: PartyInfo;
  tenant: PartyInfo;
  onUpdateLandlord: (updates: Partial<PartyInfo>) => void;
  onUpdateTenant: (updates: Partial<PartyInfo>) => void;
}

export function PartiesForm({
  landlord,
  tenant,
  onUpdateLandlord,
  onUpdateTenant,
}: PartiesFormProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* BÊN CHO THUÊ (BÊN A) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            BÊN CHO THUÊ (BÊN A - CHỦ NHÀ)
          </h2>
          <span className="text-[11px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            Hồ sơ tài khoản
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Họ và tên *</label>
            <input
              type="text"
              required
              value={landlord.fullName}
              onChange={e => onUpdateLandlord({ fullName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">CCCD/CMND số *</label>
            <input
              type="text"
              required
              value={landlord.identityNumber}
              onChange={e => onUpdateLandlord({ identityNumber: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Điện thoại liên hệ *</label>
            <input
              type="tel"
              required
              value={landlord.phone}
              onChange={e => onUpdateLandlord({ phone: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Địa chỉ thường trú *</label>
            <input
              type="text"
              required
              value={landlord.address}
              onChange={e => onUpdateLandlord({ address: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* BÊN THUÊ (BÊN B) */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            BÊN THUÊ (BÊN B - KHÁCH THUÊ)
          </h2>
          <span className="text-[11px] font-medium text-slate-400">
            Có thể để trống để ký tay sau
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Họ và tên người thuê *</label>
            <input
              type="text"
              placeholder="Nguyễn Văn B"
              value={tenant.fullName}
              onChange={e => onUpdateTenant({ fullName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">CCCD/CMND số</label>
            <input
              type="text"
              placeholder="001..."
              value={tenant.identityNumber}
              onChange={e => onUpdateTenant({ identityNumber: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Số điện thoại</label>
            <input
              type="tel"
              placeholder="09..."
              value={tenant.phone}
              onChange={e => onUpdateTenant({ phone: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Địa chỉ thường trú</label>
            <input
              type="text"
              placeholder="Địa chỉ ghi trên CCCD..."
              value={tenant.address}
              onChange={e => onUpdateTenant({ address: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

