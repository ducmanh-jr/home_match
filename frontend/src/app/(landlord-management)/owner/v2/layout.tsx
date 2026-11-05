import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { OwnerShell } from "@/components/layout/OwnerShell";

export const metadata: Metadata = { title: "Quản trị chủ nhà | HomeMatch" };

export default function OwnerLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm text-slate-500" role="status">Đang mở khu vực chủ nhà…</div>}><OwnerShell>{children}</OwnerShell></Suspense>;
}
