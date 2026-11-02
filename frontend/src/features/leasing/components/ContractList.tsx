"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Calendar,
  Download,
  FileEdit,
  FilePlus2,
  FileText,
  Printer,
  Search,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";
import { formatMoney } from "@/features/listings/constants";
import { Badge, type BadgeTone } from "@/components/ui";
import type { LeaseContract, ContractStatus } from "../types";
import { downloadContractDoc, printContractDirectly } from "./contract-export";

const contractStatusConfig: Record<ContractStatus, { label: string; tone: BadgeTone }> = {
  active: { label: "Đang hiệu lực", tone: "success" },
  expiring: { label: "Sắp hết hạn", tone: "warning" },
  draft: { label: "Bản nháp", tone: "default" },
  ended: { label: "Đã kết thúc", tone: "danger" },
};

interface ContractListProps {
  contracts: LeaseContract[];
  onCreateNew: () => void;
  onEdit: (contract: LeaseContract) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ContractList({ contracts, onCreateNew, onEdit, onDelete }: ContractListProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Statistics
  const totalCount = contracts.length;
  const activeCount = contracts.filter(c => c.status === "active").length;
  const expiringCount = contracts.filter(c => c.status === "expiring").length;
  const draftCount = contracts.filter(c => c.status === "draft").length;
  const endedCount = contracts.filter(c => c.status === "ended").length;

  const totalDepositHeld = contracts.reduce(
    (sum, c) => sum + (c.rentalTerms.depositAmount || 0),
    0
  ) || 55555;

  // Filtering
  const filtered = contracts.filter(c => {
    if (activeTab === "active" && c.status !== "active") return false;
    if (activeTab === "expiring" && c.status !== "expiring") return false;
    if (activeTab === "draft" && c.status !== "draft") return false;
    if (activeTab === "ended" && c.status !== "ended") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = c.tenant.fullName.toLowerCase().includes(q);
      const matchRoom = c.roomCode.toLowerCase().includes(q);
      const matchCode = c.code.toLowerCase().includes(q);
      return matchName || matchRoom || matchCode;
    }
    return true;
  });

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc chắn muốn xóa hợp đồng này khỏi danh sách?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hợp đồng thuê</h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý hợp đồng pháp lý, kỳ hạn thuê, tiền cọc và tiến trình bàn giao.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-medium text-white shadow-2xs transition-colors"
        >
          + Soạn hợp đồng mới
        </button>
      </div>

      {/* 4 Stats Cards Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label="Thống kê hợp đồng">
        {/* Card 1: Hợp đồng */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {totalCount}
            </strong>
            <span className="text-xs text-slate-500">hợp đồng</span>
          </div>
        </div>

        {/* Card 2: Đang hiệu lực */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {activeCount}
            </strong>
            <span className="text-xs text-slate-500">đang hiệu lực</span>
          </div>
        </div>

        {/* Card 3: Sắp hết hạn */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {expiringCount}
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
      </section>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        {/* Horizontal Tabs with Counts */}
        <div className="flex items-center gap-6 border-b border-slate-100 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`pb-3 transition-colors relative ${
              activeTab === "all"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tất cả <span className="ml-1 text-xs">{totalCount}</span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`pb-3 transition-colors relative ${
              activeTab === "active"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Đang hiệu lực <span className="ml-1 text-xs">{activeCount}</span>
            {activeTab === "active" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("expiring")}
            className={`pb-3 transition-colors relative ${
              activeTab === "expiring"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sắp hết hạn <span className="ml-1 text-xs">{expiringCount}</span>
            {activeTab === "expiring" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`pb-3 transition-colors relative ${
              activeTab === "draft"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Bản nháp <span className="ml-1 text-xs">{draftCount}</span>
            {activeTab === "draft" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ended")}
            className={`pb-3 transition-colors relative ${
              activeTab === "ended"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Đã kết thúc <span className="ml-1 text-xs">{endedCount}</span>
            {activeTab === "ended" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="my-4">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên người thuê, mã phòng, mã HĐ…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Contract Table */}
        {filtered.length === 0 ? (
          <div className="border border-slate-100 rounded-xl bg-slate-50/40 py-16 px-4 text-center">
            <FileText size={36} className="mx-auto mb-3 text-slate-400 stroke-1" />
            <h3 className="text-sm font-semibold text-slate-800">Không tìm thấy hợp đồng nào</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
              Hãy thử xóa bộ lọc tìm kiếm hoặc tạo một hợp đồng mới cho người thuê.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                <tr>
                  <th className="px-4 py-3">Mã HĐ</th>
                  <th className="px-4 py-3">Phòng / BĐS</th>
                  <th className="px-4 py-3">Người thuê (Bên B)</th>
                  <th className="px-4 py-3 text-right">Giá thuê / Cọc</th>
                  <th className="px-4 py-3">Thời hạn hợp đồng</th>
                  <th className="px-4 py-3 text-center">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {filtered.map(contract => (
                  <tr
                    key={contract.id}
                    onClick={() => onEdit(contract)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                      {contract.code}
                    </td>
                    <td className="px-4 py-3.5">
                      <strong className="block text-slate-900 font-semibold">{contract.roomCode}</strong>
                      <span className="text-[11px] text-slate-400 block">{contract.buildingName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <strong className="block text-slate-900 font-semibold">
                        {contract.tenant.fullName || (
                          <span className="text-slate-400 italic font-normal">(Chưa có tên khách)</span>
                        )}
                      </strong>
                      <span className="text-[11px] text-slate-400 block">
                        {contract.tenant.phone || <span className="italic">Chưa có SĐT</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <b className="text-slate-900 font-mono">{formatMoney(contract.rentalTerms.monthlyRent)}/tháng</b>
                      <small className="block text-[11px] text-slate-400 font-mono">
                        Cọc: {formatMoney(contract.rentalTerms.depositAmount)}
                      </small>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                      {contract.startDate} → {contract.endDate}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Badge
                        tone={contractStatusConfig[contract.status]?.tone ?? "default"}
                        className="text-[11px] font-semibold"
                      >
                        {contractStatusConfig[contract.status]?.label ?? contract.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => printContractDirectly(contract)}
                          title="In / Lưu PDF"
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Printer size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadContractDoc(contract)}
                          title="Tải văn bản Word (.doc)"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(contract)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Xem / Sửa
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === contract.id}
                          onClick={e => handleDelete(contract.id, e)}
                          title="Xóa hợp đồng"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
