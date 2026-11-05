"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarCheck,
  ChevronRight,
  Database,
  FolderOpen,
  Phone,
  Search,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui";
import type { LeadItem, LeadStatus } from "../types";
import { useViewings } from "../use-viewings";

const leadStatusConfig: Record<LeadStatus, { label: string; tone: BadgeTone }> = {
  new: { label: "Mới", tone: "info" },
  contacted: { label: "Đã liên hệ", tone: "warning" },
  confirmed: { label: "Đã xác nhận", tone: "success" },
  cancelled: { label: "Đã huỷ", tone: "default" },
};

export function LeadsView() {
  const { leads, loading } = useViewings();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Statistics
  const countAll = leads.length;
  const countNew = leads.filter(l => l.status === "new").length;
  const countContacted = leads.filter(l => l.status === "contacted").length;
  const countConfirmed = leads.filter(l => l.status === "confirmed").length;
  const countCancelled = leads.filter(l => l.status === "cancelled").length;

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          l.fullName.toLowerCase().includes(q) ||
          l.interestedRoomCode.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, search, statusFilter]);

  // Recent leads list for the right panel (up to 5 items)
  const recentLeads = useMemo(() => {
    return leads.slice(0, 5);
  }, [leads]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Đang tải danh sách khách quan tâm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Khách quan tâm</h1>
        <p className="text-xs text-slate-500 mt-1">
          Khách hỏi thuê từ mọi nguồn, xếp theo bước chuyển đổi.
        </p>
      </div>

      {/* 5 Stats Cards Row */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5" aria-label="Thống kê khách quan tâm">
        {/* Card 1: Tổng khách */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countAll}
            </strong>
            <span className="text-xs text-slate-500 font-normal">tổng khách</span>
          </div>
        </div>

        {/* Card 2: Mới */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <UserCheck size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countNew}
            </strong>
            <span className="text-xs text-slate-500 font-normal">mới</span>
          </div>
        </div>

        {/* Card 3: Đã liên hệ */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countContacted}
            </strong>
            <span className="text-xs text-slate-500 font-normal">đã liên hệ</span>
          </div>
        </div>

        {/* Card 4: Đã xác nhận */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countConfirmed}
            </strong>
            <span className="text-xs text-slate-500 font-normal">đã xác nhận</span>
          </div>
        </div>

        {/* Card 5: Đã huỷ */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <UserX size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countCancelled}
            </strong>
            <span className="text-xs text-slate-500 font-normal">đã huỷ</span>
          </div>
        </div>
      </section>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (~70% width) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col gap-4">
            {/* Search & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm tên khách hoặc căn"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Đã huỷ</option>
              </select>
            </div>

            {/* Table or Empty State */}
            {filteredLeads.length === 0 ? (
              <div className="border border-slate-100 rounded-xl bg-slate-50/40 py-16 px-4 text-center">
                <FolderOpen size={36} className="mx-auto mb-3 text-slate-400 stroke-1" />
                <h3 className="text-sm font-semibold text-slate-800">Không tìm thấy khách quan tâm</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc trạng thái khác.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Khách</th>
                      <th className="px-4 py-3">Quan tâm căn</th>
                      <th className="px-4 py-3 text-center">Trạng thái</th>
                      <th className="px-4 py-3">Hẹn xem</th>
                      <th className="px-4 py-3">Vào sổ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Khách */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-slate-900 text-xs">
                              {lead.fullName}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                              <Phone size={11} className="text-slate-400" />
                              {lead.phone}
                            </span>
                          </div>
                        </td>

                        {/* Quan tâm căn */}
                        <td className="px-4 py-3.5 font-bold text-slate-900 tracking-tight">
                          {lead.interestedRoomCode}
                        </td>

                        {/* Trạng thái */}
                        <td className="px-4 py-3.5 text-center">
                          <Badge
                            tone={leadStatusConfig[lead.status]?.tone ?? "default"}
                            className="text-[11px] font-medium"
                          >
                            {leadStatusConfig[lead.status]?.label ?? lead.status}
                          </Badge>
                        </td>

                        {/* Hẹn xem */}
                        <td className="px-4 py-3.5 text-slate-700 text-xs font-mono">
                          {lead.viewingFormatted || "—"}
                        </td>

                        {/* Vào sổ */}
                        <td className="px-4 py-3.5 text-slate-500 text-xs font-mono">
                          {lead.registeredFormatted || lead.registeredAt}
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
          {/* Card: Khách mới nhất */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Khách mới nhất</h2>
            <div className="divide-y divide-slate-100">
              {recentLeads.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">Chưa có khách quan tâm nào.</p>
              ) : (
                recentLeads.map(lead => {
                  const initialLetter = (lead.fullName.trim()[0] || "K").toUpperCase();
                  return (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between py-2.5 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100">
                          {initialLetter}
                        </div>
                        <div>
                          <strong className="block text-xs font-semibold text-slate-900 leading-tight">
                            {lead.fullName}
                          </strong>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {lead.interestedRoomCode}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-slate-400" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Card: Nhu cầu và chấm điểm */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Nhu cầu và chấm điểm</h2>
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-slate-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">
                  Nhu cầu chi tiết và điểm ưu tiên
                </span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                  Sắp có
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Cần bảng nhu cầu khách (ngân sách, khu vực, ngày vào ở) và bảng chấm điểm do backend tính. Chưa có nên để trống, không hiện số ước lượng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

