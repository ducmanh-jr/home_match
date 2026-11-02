"use client";

import { ChevronLeft, ChevronRight, CircleAlert, Inbox, LoaderCircle, X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ManagementCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Card className={cn("p-5 shadow-sm border-slate-200/90", className)}>{children}</Card>;
}

export function ManagementBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "success" | "warning" | "error" | "info" | "neutral" | "orange";
}) {
  const toneMap: Record<string, BadgeTone> = {
    success: "success",
    warning: "warning",
    error: "danger",
    info: "info",
    neutral: "default",
    orange: "orange",
  };
  return <Badge tone={toneMap[tone] || "default"}>{children}</Badge>;
}

export function ManagementTable({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-slate-200 bg-white",
        "[&_table]:w-full [&_table]:text-left [&_table]:text-xs [&_table]:border-collapse",
        "[&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-slate-600 [&_th]:border-b [&_th]:border-slate-100 [&_th]:bg-slate-50/80",
        "[&_td]:px-4 [&_td]:py-3.5 [&_td]:border-b [&_td]:border-slate-100 [&_tr:last-child_td]:border-b-0",
        "[&_tr:hover_td]:bg-slate-50/50 [&_td]:transition-colors",
      )}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table>{children}</table>
    </div>
  );
}

export function ManagementState({
  state,
  title,
  description,
  onRetry,
  retryLabel = "Thử lại",
}: {
  state: "loading" | "empty" | "error";
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const Icon = state === "loading" ? LoaderCircle : state === "error" ? CircleAlert : Inbox;
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center gap-2.5",
        state === "error"
          ? "border-rose-200 bg-rose-50/40 text-rose-800"
          : "border-slate-200 bg-slate-50/60 text-slate-600",
      )}
      role={state === "error" ? "alert" : "status"}
    >
      <span
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center shadow-xs",
          state === "error" ? "bg-rose-100 text-rose-600" : "bg-white border border-slate-200 text-slate-400",
        )}
      >
        <Icon size={22} className={state === "loading" ? "animate-spin text-orange-500" : ""} aria-hidden="true" />
      </span>
      <strong className="text-sm font-semibold text-slate-800">{title}</strong>
      {description && <p className="text-xs text-slate-500 max-w-sm leading-relaxed">{description}</p>}
      {onRetry && (
        <div className="pt-1">
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ManagementDialog({
  open,
  onClose,
  title,
  children,
  actions,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    element.showModal();
    return () => element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className={cn(
        "backdrop:bg-slate-900/50 p-0 m-auto rounded-2xl bg-white shadow-2xl border border-slate-200 outline-none max-h-[90vh] overflow-hidden",
        wide ? "w-[92vw] max-w-3xl" : "w-[92vw] max-w-lg",
      )}
      aria-labelledby={titleId}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col max-h-[90vh]">
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h2 id={titleId} className="text-base font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Đóng cửa sổ"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </header>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {actions && (
          <footer className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2.5 shrink-0">
            {actions}
          </footer>
        )}
      </div>
    </dialog>
  );
}

export function ManagementPagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <footer className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
      <span aria-live="polite">
        {total ? `Hiện ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} / ${total}` : "0 kết quả"}
      </span>
      <nav className="flex items-center gap-1.5" aria-label="Phân trang">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
          aria-label="Trang trước"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="px-2 font-medium text-slate-700">
          Trang {page}/{pages}
        </span>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
          className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
          aria-label="Trang sau"
        >
          <ChevronRight size={15} />
        </button>
      </nav>
    </footer>
  );
}

export function ManagementToast({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-medium flex items-center gap-3 animate-in fade-in-50 slide-in-from-bottom-5 duration-200"
      role="status"
    >
      <span>{message}</span>
      <button
        type="button"
        aria-label="Đóng thông báo"
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}
