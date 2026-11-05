"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  FilePlus2,
  FileText,
  Phone,
  Search,
  ShieldCheck,
  Upload,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { formatMoney } from "@/features/listings/constants";
import { Badge, type BadgeTone } from "@/components/ui";
import type { TenantSummary } from "../types";

const tenantStatusConfig: Record<string, { label: string; tone: BadgeTone }> = {
  active: { label: "Đang thuê", tone: "success" },
  expiring: { label: "Sắp hết hạn", tone: "warning" },
  ended: { label: "Đã trả phòng", tone: "default" },
};

interface TenantListProps {
  tenants: TenantSummary[];
  onCreateContract: () => void;
  onViewContract: (contractCode: string) => void;
}

export function TenantList({ tenants, onCreateContract, onViewContract }: TenantListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTenants = tenants.filter(t => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.fullName.toLowerCase().includes(q) ||
        t.phone.toLowerCase().includes(q) ||
        t.roomCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalContracts = tenants.length;
  const activeTenants = tenants.filter(t => t.status === "active").length;
  const expiringTenants = tenants.filter(t => t.status === "expiring").length;
  const totalDepositHeld = tenants.reduce((sum, t) => sum + (t.deposit ?? 0), 0);

  // Expiring list for the right panel
  const expiringList = tenants.filter(t => t.status === "expiring");

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Người thuê</h1>
          <p className="text-xs text-slate-500 mt-1">
            Ai đang ở phòng nào, theo hợp đồng nào, và hồ sơ kèm theo.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Upload size={14} className="text-slate-500" />
            Nhập danh sách
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Sắp có
            </span>
          </button>

          <button
            type="button"
            onClick={onCreateContract}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-medium text-white shadow-2xs transition-colors"
          >
            + Soạn hợp đồng mới
          </button>
        </div>
      </div>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (~70% width) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* 4 Stats Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Card 1: Hợp đồng */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users size={18} />
              </div>
              <div>
                <strong className="text-lg font-bold text-slate-900 leading-tight block">
                  {totalContracts}
                </strong>
                <span className="text-xs text-slate-500">hợp đồng</span>
              </div>
            </div>

            {/* Card 2: Đang thuê */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={18} />
              </div>
              <div>
                <strong className="text-lg font-bold text-slate-900 leading-tight block">
                  {activeTenants}
                </strong>
                <span className="text-xs text-slate-500">đang thuê</span>
              </div>
            </div>

            {/* Card 3: Sắp hết hạn */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <strong className="text-lg font-bold text-slate-900 leading-tight block">
                  {expiringTenants}
                </strong>
                <span className="text-xs text-slate-500">sắp hết hạn</span>
              </div>
            </div>

            {/* Card 4: Tiền cọc giữ hộ */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Wallet size={18} />
              </div>
              <div>
                <strong className="text-sm font-bold text-purple-700 leading-tight block">
                  {formatMoney(totalDepositHeld)}
                </strong>
                <span className="text-xs text-slate-500">tiền cọc giữ hộ</span>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm tên người thuê hoặc căn"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang thuê</option>
                <option value="expiring">Sắp hết hạn</option>
                <option value="ended">Đã kết thúc</option>
              </select>
            </div>

            {/* Table */}
            {filteredTenants.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users size={36} className="mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-medium text-slate-600">Không có người thuê nào phù hợp</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-600 font-semibold">
                    <tr>
                      <th className="px-3.5 py-3">Người thuê</th>
                      <th className="px-3.5 py-3">Căn</th>
                      <th className="px-3.5 py-3">Trạng thái</th>
                      <th className="px-3.5 py-3">Kỳ thuê</th>
                      <th className="px-3.5 py-3 text-right">Giá thuê</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredTenants.map(t => (
                      <tr
                        key={t.id}
                        onClick={() => onViewContract(t.contractCode)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <td className="px-3.5 py-3.5">
                          <strong className="block text-slate-900 font-semibold">
                            {t.fullName || (
                              <span className="text-slate-400 italic font-normal">(Chưa có tên khách)</span>
                            )}
                          </strong>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone size={11} />
                            {t.phone || <span className="italic">Chưa có SĐT</span>}
                          </span>
                        </td>
                        <td className="px-3.5 py-3.5 text-slate-700 font-medium">
                          {t.roomCode || <span className="text-slate-400 italic font-normal">—</span>}
                        </td>
                        <td className="px-3.5 py-3.5">
                          <Badge
                            tone={tenantStatusConfig[t.status]?.tone ?? "default"}
                            className="text-[11px] font-medium"
                          >
                            {tenantStatusConfig[t.status]?.label ?? t.status}
                          </Badge>
                        </td>
                        <td className="px-3.5 py-3.5 text-slate-600 font-mono text-[11px]">
                          {t.startDate && t.endDate ? (
                            `${t.startDate} - ${t.endDate}`
                          ) : (
                            <span className="text-slate-400 italic">Chưa xác định</span>
                          )}
                        </td>
                        <td className="px-3.5 py-3.5 text-right font-medium text-slate-900 font-mono">
                          {t.monthlyRent > 0 ? (
                            formatMoney(t.monthlyRent)
                          ) : (
                            <span className="text-slate-400 italic font-normal">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (~30% width) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card: Hồ sơ người thuê */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Hồ sơ người thuê</h2>
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">📇</span>
                <span className="text-xs font-bold text-slate-800">
                  Hồ sơ 360° người thuê
                </span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                  Sắp có
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Cần bảng hồ sơ cá nhân (giấy tờ, người ở cùng, người bảo lãnh) và bảng lịch sử tương tác. Chưa có nên để trống, không hiện số ước lượng.
              </p>
            </div>
          </div>

          {/* Card: Sắp hết hạn */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Sắp hết hạn</h2>
            <div className="divide-y divide-slate-100">
              {expiringList.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">Không có hợp đồng nào sắp hết hạn.</p>
              ) : (
                expiringList.slice(0, 3).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => onViewContract(item.contractCode)}
                    className="flex items-center justify-between py-2.5 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <div>
                      <strong className="block text-xs font-semibold text-slate-900">
                        {item.fullName || "(chưa khai tên)"}
                      </strong>
                      <span className="text-[11px] text-slate-400">
                        {item.roomCode || "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 font-semibold text-xs">
                      <span>{item.endDate || "—"}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
