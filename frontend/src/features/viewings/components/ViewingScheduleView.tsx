"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  Database,
  Inbox,
  Phone,
  Search,
} from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui";
import type { ViewingFilterPeriod, ViewingItem, ViewingStatus } from "../types";
import { useViewings } from "../use-viewings";

const viewingStatusConfig: Record<ViewingStatus, { label: string; tone: BadgeTone }> = {
  scheduled: { label: "Đã lên lịch", tone: "info" },
  completed: { label: "Đã hoàn thành", tone: "success" },
  cancelled: { label: "Đã huỷ", tone: "default" },
  no_show: { label: "Không đến", tone: "danger" },
};

export function ViewingScheduleView() {
  const { viewings, loading } = useViewings();
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<ViewingFilterPeriod>("upcoming");

  // Date references
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
  const sevenDaysLater = todayStart + 7 * 24 * 60 * 60 * 1000;

  // Statistics
  const countTotal = viewings.length;
  const countToday = viewings.filter(v => {
    const time = new Date(v.scheduledAt).getTime();
    return time >= todayStart && time <= todayEnd;
  }).length;
  const countUpcoming = viewings.filter(v => {
    const time = new Date(v.scheduledAt).getTime();
    return time >= todayStart;
  }).length;

  // Filtered viewings
  const filteredViewings = useMemo(() => {
    return viewings.filter(v => {
      const time = new Date(v.scheduledAt).getTime();

      // Period filter
      if (periodFilter === "upcoming" && time < todayStart) return false;
      if (periodFilter === "today" && (time < todayStart || time > todayEnd)) return false;
      if (periodFilter === "this_week" && (time < todayStart || time > sevenDaysLater)) return false;
      if (periodFilter === "past" && time >= todayStart) return false;

      // Search keyword
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          v.customerName.toLowerCase().includes(q) ||
          v.roomCode.toLowerCase().includes(q) ||
          v.customerPhone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [viewings, periodFilter, search, todayStart, todayEnd, sevenDaysLater]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Đang tải lịch xem phòng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Lịch xem phòng</h1>
        <p className="text-xs text-slate-500 mt-1">
          Hẹn dẫn xem, ai dẫn, kết quả buổi xem và bước tiếp theo.
        </p>
      </div>

      {/* 3 Stats Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5" aria-label="Thống kê lịch xem phòng">
        {/* Card 1: Tổng lượt hẹn */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countTotal}
            </strong>
            <span className="text-xs text-slate-500 font-normal">tổng lượt hẹn</span>
          </div>
        </div>

        {/* Card 2: Hẹn hôm nay */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <CalendarClock size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countToday}
            </strong>
            <span className="text-xs text-slate-500 font-normal">hẹn hôm nay</span>
          </div>
        </div>

        {/* Card 3: Sắp tới */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck size={18} />
          </div>
          <div>
            <strong className="text-lg font-bold text-slate-900 leading-tight block">
              {countUpcoming}
            </strong>
            <span className="text-xs text-slate-500 font-normal">sắp tới</span>
          </div>
        </div>
      </section>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (~70% width) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col gap-4">
            {/* Search & Period Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm khách hoặc căn"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                />
              </div>

              <select
                value={periodFilter}
                onChange={e => setPeriodFilter(e.target.value as ViewingFilterPeriod)}
                className="h-9 px-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="upcoming">Từ hôm nay trở đi</option>
                <option value="today">Hôm nay</option>
                <option value="this_week">Tuần này</option>
                <option value="all">Tất cả thời gian</option>
                <option value="past">Đã qua</option>
              </select>
            </div>

            {/* Content: Empty State or Table */}
            {filteredViewings.length === 0 ? (
              <div className="border border-slate-100 rounded-xl bg-slate-50/40 py-20 px-4 text-center">
                <Inbox size={40} className="mx-auto mb-3 text-slate-400 stroke-1" />
                <h3 className="text-sm font-semibold text-slate-800">
                  Không có lịch nào trong khoảng này
                </h3>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Khách</th>
                      <th className="px-4 py-3">Phòng / Căn</th>
                      <th className="px-4 py-3">Thời gian hẹn</th>
                      <th className="px-4 py-3">Người dẫn</th>
                      <th className="px-4 py-3 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredViewings.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Khách */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-slate-900 text-xs">
                              {v.customerName}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                              <Phone size={11} className="text-slate-400" />
                              {v.customerPhone}
                            </span>
                          </div>
                        </td>

                        {/* Căn */}
                        <td className="px-4 py-3.5 font-bold text-slate-900 tracking-tight">
                          {v.roomCode}
                        </td>

                        {/* Thời gian hẹn */}
                        <td className="px-4 py-3.5 text-slate-700 font-mono text-xs">
                          {v.scheduledFormatted}
                        </td>

                        {/* Người dẫn */}
                        <td className="px-4 py-3.5 text-slate-500 text-xs">
                          {v.guideName || "Chưa phân công"}
                        </td>

                        {/* Trạng thái */}
                        <td className="px-4 py-3.5 text-center">
                          <Badge
                            tone={viewingStatusConfig[v.status]?.tone ?? "default"}
                            className="text-[11px] font-medium"
                          >
                            {viewingStatusConfig[v.status]?.label ?? v.status}
                          </Badge>
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
          {/* Card: Phân công người dẫn */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Phân công người dẫn</h2>
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-slate-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">
                  Người dẫn xem và xác nhận lịch
                </span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                  Sắp có
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Cần bảng viewings riêng (người dẫn, xác nhận của khách, kết quả buổi xem). Hiện lịch chỉ là hai cột viewing_date/viewing_time trên bảng leads. Chưa có nên để trống, không hiện số ước lượng.
              </p>
            </div>
          </div>

          {/* Card: Tỉ lệ đến đúng hẹn */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 mb-3">Tỉ lệ đến đúng hẹn</h2>
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-slate-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">
                  Tỉ lệ đến đúng hẹn
                </span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                  Sắp có
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Cần cột ghi kết quả từng buổi xem (đến / không đến / huỷ). Chưa có nên để trống, không hiện số ước lượng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

