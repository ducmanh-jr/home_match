"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  FolderOpen,
  HelpCircle,
  Search,
  Trash2,
} from "lucide-react";
import { formatMoney } from "@/features/listings/constants";
import { Badge, type BadgeTone } from "@/components/ui";
import { getContracts } from "@/features/leasing/api";
import { useBilling } from "../use-billing";
import type { Invoice, InvoiceStatus } from "../types";
import { PaymentModal } from "./PaymentModal";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";

const invoiceStatusConfig: Record<InvoiceStatus, { label: string; tone: BadgeTone }> = {
  paid: { label: "Đã thu", tone: "success" },
  partially_paid: { label: "Thu một phần", tone: "info" },
  pending: { label: "Chờ thu", tone: "warning" },
  overdue: { label: "Quá hạn", tone: "danger" },
};

export function InvoiceList() {
  const { invoices, loading, recordPayment, deleteInvoice } = useBilling();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [buildingFilter, setBuildingFilter] = useState<string>("all");
  const [selectedCycle, setSelectedCycle] = useState<string>("11/2026");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);
  const [detailsInvoice, setDetailsInvoice] = useState<Invoice | null>(null);
  const [totalDepositHeld, setTotalDepositHeld] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    getContracts()
      .then(contracts => {
        if (!isMounted) return;
        const active = contracts.filter(c => c.status === "active" || c.status === "expiring");
        const total = active.reduce((sum, c) => sum + (c.rentalTerms?.depositAmount ?? 0), 0);
        setTotalDepositHeld(total);
      })
      .catch(() => {
        if (isMounted) setTotalDepositHeld(0);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const buildings = [...new Set(invoices.map(i => i.buildingName))];

  // Invoices filtered by selected billing cycle (e.g. "11/2026")
  const cycleInvoices = useMemo(() => {
    if (selectedCycle === "all") return invoices;
    const [m, y] = selectedCycle.split("/").map(Number);
    if (!m || !y) return invoices;
    return invoices.filter(inv => inv.month === m && inv.year === y);
  }, [invoices, selectedCycle]);

  // Financial statistics for current cycle
  const cycleTotalBilled = cycleInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const cycleTotalReconciled = cycleInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const cycleDebt = cycleInvoices.reduce((sum, inv) => sum + inv.debtAmount, 0);
  const cycleOverdueAmount = cycleInvoices
    .filter(i => i.status === "overdue")
    .reduce((sum, inv) => sum + inv.debtAmount, 0);

  // Overall financial statistics (all periods)
  const overallTotalDebt = invoices.reduce((sum, inv) => sum + inv.debtAmount, 0);
  const overallOverdueAmount = invoices
    .filter(i => i.status === "overdue")
    .reduce((sum, inv) => sum + inv.debtAmount, 0);

  // Counts for tabs (reflecting selected cycle)
  const countAll = cycleInvoices.length;
  const countOverdue = cycleInvoices.filter(i => i.status === "overdue").length;
  const countPending = cycleInvoices.filter(i => i.status === "pending").length;
  const countPartial = cycleInvoices.filter(i => i.status === "partially_paid").length;
  const countPaid = cycleInvoices.filter(i => i.status === "paid").length;

  // Debt Aging calculation (only unpaid invoices with debtAmount > 0)
  // Calendar day calculation relative to simulated today (2026-11-02 / current date)
  const aging = useMemo(() => {
    const unpaidInvoices = invoices.filter(inv => inv.debtAmount > 0);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const result = {
      notDue: { count: 0, amount: 0 },
      overdue1to7: { count: 0, amount: 0 },
      overdue8to15: { count: 0, amount: 0 },
      overdueOver15: { count: 0, amount: 0 },
    };

    unpaidInvoices.forEach(inv => {
      const [y, m, d] = (inv.dueDate || "").split("-").map(Number);
      if (!y || !m || !d) {
        result.notDue.count += 1;
        result.notDue.amount += inv.debtAmount;
        return;
      }
      const due = new Date(y, m - 1, d);
      const diffDays = Math.round((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));

      // Rule: Invoices due today (diffDays === 0) or in future (diffDays < 0) are "Chưa tới hạn"
      if (diffDays <= 0) {
        result.notDue.count += 1;
        result.notDue.amount += inv.debtAmount;
      } else if (diffDays <= 7) {
        result.overdue1to7.count += 1;
        result.overdue1to7.amount += inv.debtAmount;
      } else if (diffDays <= 15) {
        result.overdue8to15.count += 1;
        result.overdue8to15.amount += inv.debtAmount;
      } else {
        result.overdueOver15.count += 1;
        result.overdueOver15.amount += inv.debtAmount;
      }
    });

    return result;
  }, [invoices]);

  // Filtering invoices within cycle
  const filteredInvoices = cycleInvoices.filter(inv => {
    if (activeTab === "overdue" && inv.status !== "overdue") return false;
    if (activeTab === "pending" && inv.status !== "pending") return false;
    if (activeTab === "partial" && inv.status !== "partially_paid") return false;
    if (activeTab === "paid" && inv.status !== "paid") return false;

    if (buildingFilter !== "all" && inv.buildingName !== buildingFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inv.code.toLowerCase().includes(q) ||
        inv.roomCode.toLowerCase().includes(q) ||
        inv.tenantName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(i => i.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenPayment = (inv: Invoice) => {
    setDetailsInvoice(null);
    setPaymentInvoice(inv);
  };

  const handleConfirmPayment = async (invoiceId: string, amount: number, note?: string) => {
    await recordPayment(invoiceId, amount, note);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      await deleteInvoice(id);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Đang tải dữ liệu thu tiền & công nợ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Thu tiền & công nợ</h1>
        <p className="text-xs text-slate-500 mt-1">
          Lập kỳ thu, thu tiền, đối soát và đòi nợ đúng hạn.
        </p>
      </div>

      {/* 6 Metrics Cards Grid (2 rows x 3 columns) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5" aria-label="Thống kê tài chính">
        {/* Row 1 */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-xs text-slate-500 block font-normal">
            Phải thu {selectedCycle === "all" ? "tất cả kỳ" : `kỳ ${selectedCycle}`}
          </span>
          <strong className="text-2xl font-bold text-slate-900 mt-2 block tracking-tight">
            {formatMoney(cycleTotalBilled)}
          </strong>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-xs text-slate-500 block font-normal">Đã đối soát kỳ này</span>
          <strong className="text-2xl font-bold text-emerald-600 mt-2 block tracking-tight">
            {formatMoney(cycleTotalReconciled)}
          </strong>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-xs text-slate-500 block font-normal">Chờ đối soát</span>
          <strong className="text-2xl font-bold text-slate-400 mt-2 block">
            —
          </strong>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-xs text-slate-500 block font-normal">Công nợ kỳ này</span>
          <strong className="text-2xl font-bold text-red-500 mt-2 block tracking-tight">
            {formatMoney(cycleDebt)}
          </strong>
          {selectedCycle !== "all" && (
            <span className="text-[11px] text-slate-400 block mt-1 font-normal">
              Tổng nợ mọi kỳ: {formatMoney(overallTotalDebt)}
            </span>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-xs text-slate-500 block font-normal">Quá hạn kỳ này</span>
          <strong className="text-2xl font-bold text-red-500 mt-2 block tracking-tight">
            {formatMoney(cycleOverdueAmount)}
          </strong>
          {selectedCycle !== "all" && (
            <span className="text-[11px] text-slate-400 block mt-1 font-normal">
              Tổng quá hạn mọi kỳ: {formatMoney(overallOverdueAmount)}
            </span>
          )}
        </div>

        <div className="bg-[#f9f7ff] rounded-xl border border-purple-100 p-4 shadow-xs">
          <span className="text-xs text-purple-600 block font-normal">Tiền cọc giữ hộ</span>
          <strong className="text-2xl font-bold text-[#6938ef] mt-2 block tracking-tight">
            {formatMoney(totalDepositHeld)}
          </strong>
        </div>
      </section>

      {/* Orange Info Note Banner */}
      <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-orange-50/70 border border-orange-200/70 text-xs text-orange-950 leading-relaxed">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-orange-600 text-orange-600 text-[10px] font-bold mt-0.5 shrink-0">
          !
        </span>
        <p>
          Chỉ phần <b>đã đối soát</b> mới trừ vào công nợ — tiền đã về nhưng chưa khớp hoá đơn nằm ở ô <b>chờ đối soát</b>. Tiền cọc là khoản giữ hộ, không tính vào doanh thu.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        {/* Horizontal Tabs */}
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
            Tất cả <span className="ml-1 text-xs">{countAll}</span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("overdue")}
            className={`pb-3 transition-colors relative ${
              activeTab === "overdue"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Quá hạn <span className="ml-1 text-xs">{countOverdue}</span>
            {activeTab === "overdue" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`pb-3 transition-colors relative ${
              activeTab === "pending"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Chờ thu <span className="ml-1 text-xs">{countPending}</span>
            {activeTab === "pending" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("partial")}
            className={`pb-3 transition-colors relative ${
              activeTab === "partial"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Thu một phần <span className="ml-1 text-xs">{countPartial}</span>
            {activeTab === "partial" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("paid")}
            className={`pb-3 transition-colors relative ${
              activeTab === "paid"
                ? "text-orange-500 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Đã thu <span className="ml-1 text-xs">{countPaid}</span>
            {activeTab === "paid" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 my-4">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã hoá đơn, căn, người thuê"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={buildingFilter}
              onChange={e => setBuildingFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">Tất cả toà nhà</option>
              {buildings.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={selectedCycle}
              onChange={e => setSelectedCycle(e.target.value)}
              className="h-9 px-3 rounded-lg border border-slate-200/90 bg-white text-xs text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="11/2026">Kỳ 11/2026</option>
              <option value="10/2026">Kỳ 10/2026</option>
              <option value="09/2026">Kỳ 09/2026</option>
              <option value="all">Tất cả các kỳ</option>
            </select>
          </div>
        </div>

        {/* Invoice Table or Empty State */}
        {filteredInvoices.length === 0 ? (
          <div className="border border-slate-100 rounded-xl bg-slate-50/40 py-16 px-4 text-center">
            <FolderOpen size={36} className="mx-auto mb-3 text-slate-400 stroke-1" />
            <h3 className="text-sm font-semibold text-slate-800">
              {selectedCycle !== "all"
                ? `Chưa có hoá đơn nào trong kỳ ${selectedCycle}`
                : "Chưa có hoá đơn nào"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
              {selectedCycle !== "all"
                ? `Không có hoá đơn nào phù hợp với bộ lọc trong kỳ ${selectedCycle}. Bạn có thể chọn kỳ khác hoặc "Tất cả các kỳ".`
                : "Khoản thu bạn ghi trong app HubHome Chủ nhà sẽ hiện ở đây theo từng kỳ. Lập và ghi khoản thu ngay trên web sắp có."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                <tr>
                  <th className="px-3.5 py-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3">Hoá đơn</th>
                  <th className="px-4 py-3">Hạn thu</th>
                  <th className="px-4 py-3 text-right">Phải thu</th>
                  <th className="px-4 py-3 text-right">Đã đối soát</th>
                  <th className="px-4 py-3 text-right">Còn lại</th>
                  <th className="px-4 py-3 text-center">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {filteredInvoices.map(inv => {
                  const isSelected = selectedInvoices.includes(inv.id);
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setDetailsInvoice(inv)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="px-3.5 py-3.5 text-center" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(inv.id)}
                          className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3.5">
                        <strong className="block text-slate-900 font-semibold">{inv.code}</strong>
                        <span className="text-[11px] text-slate-500 block">
                          Phòng {inv.roomCode || "---"} · {inv.tenantName || <span className="italic text-slate-400">(Chưa có tên khách)</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {inv.dueDate}
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-slate-900 font-mono">
                        {formatMoney(inv.totalAmount)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-emerald-600 font-mono">
                        {formatMoney(inv.paidAmount)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-slate-900 font-mono">
                        {inv.debtAmount > 0 ? (
                          <span className="text-rose-600">{formatMoney(inv.debtAmount)}</span>
                        ) : (
                          <span className="text-slate-400">0 đ</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <Badge
                          tone={invoiceStatusConfig[inv.status]?.tone ?? "default"}
                          className="text-[11px] font-semibold"
                        >
                          {invoiceStatusConfig[inv.status]?.label ?? inv.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.debtAmount > 0 && (
                            <button
                              type="button"
                              onClick={() => handleOpenPayment(inv)}
                              className="px-2.5 py-1 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-2xs transition-colors"
                            >
                              Thu tiền
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setDetailsInvoice(inv)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={e => handleDelete(inv.id, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Xóa hóa đơn"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Card: Tuổi nợ (Aging of Debt) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tuổi nợ (Tổng công nợ tồn đọng mọi kỳ)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-normal">
            Hóa đơn đến hạn hôm nay được tính vào nhóm Chưa tới hạn
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-700">Chưa tới hạn</span>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 font-medium">{aging.notDue.count} hoá đơn</span>
              <span
                className={
                  aging.notDue.amount > 0
                    ? "text-slate-900 font-semibold min-w-24 text-right font-mono"
                    : "text-slate-400 min-w-24 text-right"
                }
              >
                {aging.notDue.amount > 0 ? formatMoney(aging.notDue.amount) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-700">1 – 7 ngày</span>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 font-medium">{aging.overdue1to7.count} hoá đơn</span>
              <span
                className={
                  aging.overdue1to7.amount > 0
                    ? "text-amber-600 font-semibold min-w-24 text-right font-mono"
                    : "text-slate-400 min-w-24 text-right"
                }
              >
                {aging.overdue1to7.amount > 0 ? formatMoney(aging.overdue1to7.amount) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-700">8 – 15 ngày</span>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 font-medium">{aging.overdue8to15.count} hoá đơn</span>
              <span
                className={
                  aging.overdue8to15.amount > 0
                    ? "text-orange-600 font-semibold min-w-24 text-right font-mono"
                    : "text-slate-400 min-w-24 text-right"
                }
              >
                {aging.overdue8to15.amount > 0 ? formatMoney(aging.overdue8to15.amount) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-700">Trên 15 ngày</span>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 font-medium">{aging.overdueOver15.count} hoá đơn</span>
              <span
                className={
                  aging.overdueOver15.amount > 0
                    ? "text-rose-600 font-semibold min-w-24 text-right font-mono"
                    : "text-slate-400 min-w-24 text-right"
                }
              >
                {aging.overdueOver15.amount > 0 ? formatMoney(aging.overdueOver15.amount) : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment and Details Modals */}
      {paymentInvoice && (
        <PaymentModal
          invoice={paymentInvoice}
          onClose={() => setPaymentInvoice(null)}
          onSubmit={handleConfirmPayment}
        />
      )}

      {detailsInvoice && (
        <InvoiceDetailsModal
          invoice={detailsInvoice}
          onClose={() => setDetailsInvoice(null)}
          onOpenPayment={() => handleOpenPayment(detailsInvoice)}
        />
      )}
    </div>
  );
}
