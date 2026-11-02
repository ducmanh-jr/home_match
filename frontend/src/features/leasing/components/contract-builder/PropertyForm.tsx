"use client";

import React from "react";
import { propertyInventory } from "@/features/properties/mocks";

interface PropertyFormProps {
  propertyAddress: string;
  roomCode: string;
  roomArea: number;
  furnitureNotes?: string;
  roomId?: string;
  onRoomSelect: (roomId: string) => void;
  onUpdateAddress: (address: string) => void;
  onUpdateRoomCode: (code: string) => void;
  onUpdateArea: (area: number) => void;
  onUpdateFurniture: (notes: string) => void;
}

export function PropertyForm({
  propertyAddress,
  roomCode,
  roomArea,
  furnitureNotes = "",
  roomId,
  onRoomSelect,
  onUpdateAddress,
  onUpdateRoomCode,
  onUpdateArea,
  onUpdateFurniture,
}: PropertyFormProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            CHỌN PHÒNG TỪ SỔ TÀI SẢN
          </h2>
          <span className="text-[11px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            Tự động điền dữ liệu
          </span>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Chọn căn hộ / phòng cho thuê</label>
          <select
            value={roomId}
            onChange={e => onRoomSelect(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            {propertyInventory.rooms.map(r => {
              const b = propertyInventory.buildings.find(item => item.id === r.buildingId);
              return (
                <option key={r.id} value={r.id}>
                  Phòng {r.code} - {b?.name} ({r.area} m² - {r.monthlyRent.toLocaleString("vi-VN")} đ)
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ĐẶC ĐIỂM & NỘI THẤT BÀN GIAO (ĐIỀU 1)
        </h2>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Địa chỉ nhà ở / Phòng cho thuê *</label>
          <input
            type="text"
            required
            value={propertyAddress}
            onChange={e => onUpdateAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Mã phòng / căn</label>
            <input
              type="text"
              value={roomCode}
              onChange={e => onUpdateRoomCode(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Diện tích sử dụng (m²)</label>
            <input
              type="number"
              value={roomArea}
              onChange={e => onUpdateArea(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Trang thiết bị, nội thất bàn giao kèm</label>
          <textarea
            rows={3}
            value={furnitureNotes}
            onChange={e => onUpdateFurniture(e.target.value)}
            placeholder="VD: 01 máy lạnh Panasonic Inverter 1.5HP, 01 tủ lạnh 150L, 01 giường gỗ sồi 1m6x2m, 01 nệm cao su..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
}

