import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MessageSquare } from "lucide-react";

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-stone-900 antialiased flex flex-col selection:bg-orange-100 selection:text-orange-900">
      <SiteHeader />
      <div className="flex-1">
        {children}
      </div>
      <SiteFooter />
      <Link
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 px-2 py-3 bg-stone-900 hover:bg-orange-600 text-white rounded-l-lg shadow-lg text-xs font-bold tracking-wider [writing-mode:vertical-rl] rotate-180 transition-colors"
        href="/tro-ly-ai?q=Tôi muốn đóng góp ý kiến về trải nghiệm HomeMatch"
        aria-label="Gửi góp ý về trải nghiệm HomeMatch"
      >
        <MessageSquare size={16} className="rotate-90" aria-hidden="true" />
        <span>Góp ý</span>
      </Link>
    </div>
  );
}
