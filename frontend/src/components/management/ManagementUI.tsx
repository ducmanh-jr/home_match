"use client";

import { CircleAlert, Inbox, LoaderCircle, X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import styles from "@/styles/owner-management.module.css";

export function ManagementCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Card className={`${styles.card} ${className}`}>{children}</Card>;
}

export function ManagementBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "error" | "info" | "neutral" }) {
  return <Badge variant={tone} className={styles.badge}>{children}</Badge>;
}

export function ManagementTable({ children, label }: { children: ReactNode; label: string }) {
  return <div className={styles.tableScroll} role="region" aria-label={label} tabIndex={0}><table className={styles.table}>{children}</table></div>;
}

export function ManagementState({ state, title, description, onRetry }: { state: "loading" | "empty" | "error"; title: string; description?: string; onRetry?: () => void }) {
  const Icon = state === "loading" ? LoaderCircle : state === "error" ? CircleAlert : Inbox;
  return (
    <div className={`${styles.state} ${state === "error" ? styles.errorState : ""}`} role={state === "error" ? "alert" : "status"}>
      <span className={styles.stateIcon}><Icon size={25} className={state === "loading" ? styles.spin : ""} aria-hidden="true" /></span>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Thử lại</Button>}
    </div>
  );
}

export function ManagementDialog({ open, onClose, title, children, actions }: { open: boolean; onClose: () => void; title: string; children: ReactNode; actions?: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    element.showModal();
    return () => element.close();
  }, [open]);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.dialogPanel}>
        <header className={styles.dialogHeader}><h2 id={titleId}>{title}</h2><button type="button" className={styles.iconButton} aria-label="Đóng cửa sổ" onClick={onClose}><X size={19} /></button></header>
        <div className={styles.dialogBody}>{children}</div>
        {actions && <footer className={styles.dialogActions}>{actions}</footer>}
      </div>
    </dialog>
  );
}

export function ManagementToast({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);
  if (!message) return null;
  return <div className={styles.toast} role="status"><span>{message}</span><button type="button" aria-label="Đóng thông báo" onClick={onClose}><X size={16} /></button></div>;
}
