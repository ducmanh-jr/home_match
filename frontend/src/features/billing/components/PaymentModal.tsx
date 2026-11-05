"use client";

import React, { useState } from "react";
import { Check, DollarSign } from "lucide-react";
import { formatMoney } from "@/features/listings/constants";
import { Button } from "@/components/ui";
import { ManagementDialog } from "@/components/management/ManagementUI";
import type { Invoice } from "../types";

interface PaymentModalProps {
  invoice: Invoice;
  onClose: () => void;
  onSubmit: (invoiceId: string, amount: number, note?: string) => Promise<void>;
}

export function PaymentModal({ invoice, onClose, onSubmit }: PaymentModalProps) {
  const [amount, setAmount] = useState<number>(invoice.debtAmount > 0 ? invoice.debtAmount : invoice.totalAmount);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (amount <= 0) {
      setErrorMsg("Vui lòng nhập số tiền thu hợp lệ (> 0 VNĐ)");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);
    try {
      await onSubmit(invoice.id, amount, note.trim() || undefined);
      onClose();
    } catch (err: unknown) {
      // Giữ dữ liệu đã nhập và hiển thị lỗi trực tiếp trong modal
      setErrorMsg(err instanceof Error ? err.message : "Ghi nhận thu tiền thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ManagementDialog
      open
      onClose={onClose}
      title={`Ghi nhận thu tiền — ${invoice.code}`}
      actions={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={submitting}>
            Hủy
          </Button>
          <Button
            variant="orange"
            size="sm"
            onClick={handleSubmit}
            disabled={submitting}
            className="gap-1.5"
          >
            <Check size={14} />
            {submitting ? "Đang ghi nhận..." : "Xác nhận đã thu"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        {/* Invoice Summary */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 text-xs text-slate-600 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Khách thuê:</span>
            <span className="font-semibold text-slate-900">
              {invoice.tenantName || <span className="text-slate-400 italic font-normal">(Chưa có tên khách)</span>}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phòng:</span>
            <span className="font-semibold text-slate-900">
              Phòng {invoice.roomCode || "---"} ({invoice.buildingName || "---"})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kỳ thanh toán:</span>
            <span className="font-semibold text-slate-900">{invoice.periodLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tổng hóa đơn:</span>
            <span className="font-semibold text-slate-900 font-mono">{formatMoney(invoice.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Đã thanh toán:</span>
            <span className="font-semibold text-emerald-600 font-mono">{formatMoney(invoice.paidAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 font-medium">
            <span className="text-slate-900 font-semibold">Còn nợ đọng:</span>
            <span className="font-bold text-rose-600 font-mono text-sm">{formatMoney(invoice.debtAmount)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Số tiền thu đợt này (VNĐ) <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              min={1000}
              max={invoice.debtAmount || invoice.totalAmount}
              step={1000}
              required
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              disabled={submitting}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs font-mono font-semibold text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              disabled={submitting}
              onClick={() => setAmount(invoice.debtAmount)}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
            >
              Thu hết số nợ ({formatMoney(invoice.debtAmount)})
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Ghi chú hoặc phương thức</label>
          <textarea
            rows={2}
            value={note}
            disabled={submitting}
            onChange={e => setNote(e.target.value)}
            placeholder="VD: Khách chuyển khoản Techcombank..."
            className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
      </form>
    </ManagementDialog>
  );
}
