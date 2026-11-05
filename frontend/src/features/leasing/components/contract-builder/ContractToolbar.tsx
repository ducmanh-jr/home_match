"use client";

import React from "react";
import { ArrowLeft, Check, Download, Printer, Save } from "lucide-react";
import { Button } from "@/components/ui";

interface ContractToolbarProps {
  roomCode?: string;
  tenantName?: string;
  saving?: boolean;
  onCancel: () => void;
  onPrint: () => void;
  onDownloadDoc: () => void;
  onSaveDraft: () => Promise<void>;
  onActivate: () => Promise<void>;
}

export function ContractToolbar({
  roomCode,
  tenantName,
  saving = false,
  onCancel,
  onPrint,
  onDownloadDoc,
  onSaveDraft,
  onActivate,
}: ContractToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs no-print">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-xs"
          title="Quay lại danh sách"
        >
          <ArrowLeft size={17} />
        </button>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">Soạn hợp đồng mới</h1>
          <p className="text-xs text-slate-500">
            {roomCode ? `Phòng ${roomCode}` : "Chưa gắn tin"} • {tenantName || "chưa có tên khách"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onPrint} className="gap-1.5 text-xs">
          <Printer size={14} />
          In / Lưu PDF
        </Button>
        <Button variant="secondary" size="sm" onClick={onDownloadDoc} className="gap-1.5 text-xs text-blue-700 hover:text-blue-800">
          <Download size={14} />
          Tải bản soạn thảo (.doc)
        </Button>
        <Button variant="secondary" size="sm" onClick={onSaveDraft} disabled={saving} className="gap-1.5 text-xs">
          <Save size={14} />
          {saving ? "Đang lưu..." : "Lưu nháp"}
        </Button>
        <Button variant="primary" size="sm" onClick={onActivate} disabled={saving} className="gap-1.5 text-xs bg-orange-500 hover:bg-orange-600">
          <Check size={14} />
          Kích hoạt
        </Button>
      </div>
    </div>
  );
}

