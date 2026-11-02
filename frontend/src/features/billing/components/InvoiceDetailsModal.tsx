"use client";

import React from "react";
import { CheckCircle2, Clock, FileText, Printer, X } from "lucide-react";
import { Badge, Button, Card, type BadgeTone } from "@/components/ui";
import { formatMoney } from "@/features/listings/constants";
import type { Invoice, InvoiceStatus } from "../types";

interface InvoiceDetailsModalProps {
  invoice: Invoice;
  onClose: () => void;
  onOpenPayment?: () => void;
}

const statusConfig: Record<InvoiceStatus, { label: string; tone: BadgeTone; icon: React.ReactNode }> = {
  paid: {
    label: "Đã thanh toán đủ",
    tone: "success",
    icon: <CheckCircle2 size={14} />,
  },
  partially_paid: {
    label: "Thanh toán một phần",
    tone: "info",
    icon: <Clock size={14} />,
  },
  pending: {
    label: "Chờ thanh toán",
    tone: "warning",
    icon: <Clock size={14} />,
  },
  overdue: {
    label: "Quá hạn thanh toán",
    tone: "danger",
    icon: <Clock size={14} />,
  },
};

export function InvoiceDetailsModal({ invoice, onClose, onOpenPayment }: InvoiceDetailsModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const status = statusConfig[invoice.status] ?? statusConfig.pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-orange-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Chi tiết phiếu thu tiền</h3>
              <p className="text-xs text-slate-500">Mã hóa đơn: {invoice.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
              <Printer size={14} />
              In phiếu thu
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6 text-sm">
          {/* Status & Period Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/75 p-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Kỳ thanh toán</span>
              <div className="text-lg font-bold text-slate-900">{invoice.periodLabel}</div>
              <div className="text-xs text-slate-500">Hạn thanh toán: {invoice.dueDate}</div>
            </div>
            <div>
              <Badge tone={status.tone} className="px-3 py-1 font-semibold">
                {status.icon}
                {status.label}
              </Badge>
            </div>
          </div>

          {/* Parties Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg border border-slate-200 bg-slate-50/40 p-4 text-xs">
            {/* Landlord Info */}
            <div>
              <h4 className="font-semibold text-slate-900">Bên cho thuê (Chủ trọ):</h4>
              <p className="mt-1 font-medium text-slate-700">
                {invoice.landlord?.fullName || (
                  <span className="text-slate-400 italic font-normal">(Chưa cập nhật tên chủ trọ)</span>
                )}
              </p>
              <p className="text-slate-500">
                SĐT:{" "}
                {invoice.landlord?.phone || (
                  <span className="text-slate-400 italic">(Chưa có SĐT)</span>
                )}
              </p>
              <p className="text-slate-500">
                STK:{" "}
                {invoice.landlord?.bankAccount ? (
                  `${invoice.landlord.bankAccount} - ${invoice.landlord.bankName}`
                ) : (
                  <span className="text-slate-400 italic">(Chưa có tài khoản)</span>
                )}
              </p>
            </div>

            {/* Tenant Info */}
            <div>
              <h4 className="font-semibold text-slate-900">Khách thuê phòng:</h4>
              <p className="mt-1 font-semibold text-slate-900">
                {invoice.tenantName || (
                  <span className="text-slate-400 italic font-normal">(Chưa có tên khách)</span>
                )}
              </p>
              <p className="text-slate-600">
                Phòng {invoice.roomCode || "---"} • {invoice.buildingName || "---"}
              </p>
              <p className="text-slate-500">
                SĐT:{" "}
                {invoice.tenantPhone || (
                  <span className="text-slate-400 italic">(Chưa có SĐT)</span>
                )}
              </p>
              <p className="text-slate-500">
                Hợp đồng:{" "}
                {invoice.contractCode || (
                  <span className="text-slate-400 italic">(Chưa có mã HĐ)</span>
                )}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-100/75 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Khoản mục</th>
                  <th className="px-3 py-3 text-center font-semibold">Số lượng</th>
                  <th className="px-3 py-3 text-center font-semibold">ĐVT</th>
                  <th className="px-4 py-3 text-right font-semibold">Đơn giá</th>
                  <th className="px-4 py-3 text-right font-semibold">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="px-3 py-3 text-center text-slate-600">{item.quantity}</td>
                    <td className="px-3 py-3 text-center text-slate-500">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-mono">{formatMoney(item.unitPrice)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 font-mono">{formatMoney(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-200 bg-slate-50 font-medium">
                <tr>
                  <td colSpan={4} className="px-4 py-2.5 text-right text-slate-600">Tổng cộng hóa đơn:</td>
                  <td className="px-4 py-2.5 text-right font-bold text-slate-900 font-mono">{formatMoney(invoice.totalAmount)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right text-slate-600">Đã thanh toán:</td>
                  <td className="px-4 py-2 text-right font-semibold text-emerald-600 font-mono">-{formatMoney(invoice.paidAmount)}</td>
                </tr>
                <tr className="border-t border-slate-200 bg-orange-50/50">
                  <td colSpan={4} className="px-4 py-3 text-right font-bold text-slate-900">Còn nợ kỳ này:</td>
                  <td className="px-4 py-3 text-right font-bold text-rose-600 font-mono">{formatMoney(invoice.debtAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {invoice.note && (
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Ghi chú: </span>
              {invoice.note}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="text-xs text-slate-500">
            {invoice.paidAt && <span>Đã thanh toán ngày {new Date(invoice.paidAt).toLocaleDateString("vi-VN")}</span>}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Đóng
            </Button>
            {invoice.debtAmount > 0 && onOpenPayment && (
              <Button variant="primary" size="sm" onClick={onOpenPayment} className="bg-emerald-600 hover:bg-emerald-700">
                Ghi nhận thu tiền
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
