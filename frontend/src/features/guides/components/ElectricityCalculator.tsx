"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export function ElectricityCalculator() {
  const [kwh, setKwh] = useState<number>(150);
  const [landlordRate, setLandlordRate] = useState<number>(4000);

  // 6 Tier prices (chưa VAT) theo Quyết định 1279/QĐ-BCT
  // Bậc 1: 0 - 50 kWh: 1.984đ
  // Bậc 2: 51 - 100 kWh: 2.050đ
  // Bậc 3: 101 - 200 kWh: 2.380đ
  // Bậc 4: 201 - 300 kWh: 2.998đ
  // Bậc 5: 301 - 400 kWh: 3.350đ
  // Bậc 6: > 400 kWh: 3.460đ

  const calculateOfficialBill = (numKwh: number) => {
    let total = 0;
    const tiers = [
      { limit: 50, price: 1984 },
      { limit: 50, price: 2050 },
      { limit: 100, price: 2380 },
      { limit: 100, price: 2998 },
      { limit: 100, price: 3350 },
      { limit: Infinity, price: 3460 },
    ];

    let remaining = numKwh;
    for (const tier of tiers) {
      if (remaining <= 0) break;
      const usedInTier = Math.min(remaining, tier.limit);
      total += usedInTier * tier.price;
      remaining -= usedInTier;
    }

    const vat = total * 0.08; // 8% VAT
    return {
      subtotal: Math.round(total),
      vat: Math.round(vat),
      total: Math.round(total + vat),
    };
  };

  const officialBill = calculateOfficialBill(kwh);
  const landlordTotal = Math.round(kwh * landlordRate);
  const difference = landlordTotal - officialBill.total;

  return (
    <div className="my-8 p-6 rounded-2xl bg-orange-50/60 border border-orange-200 shadow-xs">
      <div className="flex items-center gap-2.5 mb-4 text-orange-900 font-extrabold text-lg">
        <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
          <Calculator size={18} />
        </div>
        <h3>Công cụ tính tiền điện 6 bậc & Bắt lỗi thu vượt</h3>
      </div>

      <p className="text-xs text-slate-600 mb-5 leading-relaxed">
        Nhập số kWh tháng này trên công tơ và đơn giá chủ trọ đang báo thu để xem số tiền đúng luật và số tiền chênh lệch.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Số điện thực dùng trong tháng (kWh):
          </label>
          <input
            type="number"
            min={1}
            max={2000}
            value={kwh}
            onChange={(e) => setKwh(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-orange-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Đơn giá chủ trọ đang tính (đ/kWh):
          </label>
          <input
            type="number"
            min={1000}
            max={10000}
            step={100}
            value={landlordRate}
            onChange={(e) => setLandlordRate(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-orange-500 text-sm"
          />
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-orange-200/80">
        <div className="p-4 rounded-xl bg-white border border-emerald-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <CheckCircle2 size={15} /> Giá đúng bậc thang Nhà nước
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">
            {officialBill.total.toLocaleString("vi-VN")} đ
          </div>
          <div className="text-[11px] text-slate-500">
            Tiền điện: {officialBill.subtotal.toLocaleString("vi-VN")}đ + VAT 8%: {officialBill.vat.toLocaleString("vi-VN")}đ
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-rose-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <AlertTriangle size={15} /> Chủ trọ thu cào bằng ({landlordRate.toLocaleString("vi-VN")}đ)
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">
            {landlordTotal.toLocaleString("vi-VN")} đ
          </div>
          <div className="text-[11px] font-semibold text-rose-600">
            {difference > 0 ? (
              <>Bạn đang bị thu vượt: <b>+{difference.toLocaleString("vi-VN")} đ</b> (+{Math.round((difference / officialBill.total) * 100)}%)</>
            ) : (
              <>Mức giá này thấp hơn hoặc bằng mức chuẩn Nhà nước.</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

