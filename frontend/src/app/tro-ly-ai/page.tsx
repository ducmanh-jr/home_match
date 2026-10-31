import { Suspense } from "react";
import type { Metadata } from "next";
import { AssistantWorkspace } from "@/features/ai-assistant/components/AssistantWorkspace";

export const metadata: Metadata = {
  title: "HomeMatch Agent | HomeMatch",
};

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-500">Đang khởi tạo HomeMatch Agent...</div>}>
      <AssistantWorkspace />
    </Suspense>
  );
}
