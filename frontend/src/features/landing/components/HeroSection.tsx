import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ShieldCheck, Sparkles, WalletCards, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-orange-50/50 via-white to-slate-50 border-b border-stone-200" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 uppercase tracking-wide mb-4">
            <Sparkles size={14} className="text-orange-600" aria-hidden="true" /> Thuê nhà cùng trợ lý AI
          </span>
          <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Tìm chỗ ở phù hợp <span className="block text-orange-600">nhanh, rõ ràng và an tâm</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
            Kể nhu cầu bằng lời của bạn — HomeMatch Agent lọc tin đăng đã kiểm duyệt,
            làm rõ chi phí trước khi xem và giúp bạn đặt lịch xem phòng.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition-all hover:shadow-lg"
              href="/tro-ly-ai"
            >
              <Sparkles size={18} aria-hidden="true" /> Trò chuyện với trợ lý AI
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl text-sm font-bold shadow-sm transition-all"
              href={{ pathname: "/tro-ly-ai", query: { tim_nhanh: "1" } } as any}
            >
              <Zap size={18} className="text-orange-500" aria-hidden="true" /> Tìm nhà nhanh
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-stone-700">
            <li className="inline-flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0" aria-hidden="true" /> Tin đăng được kiểm duyệt
            </li>
            <li className="inline-flex items-center gap-2">
              <WalletCards size={18} className="text-emerald-600 shrink-0" aria-hidden="true" /> Chi phí rõ trước khi xem
            </li>
            <li className="inline-flex items-center gap-2">
              <CalendarCheck size={18} className="text-emerald-600 shrink-0" aria-hidden="true" /> Đặt lịch xem nhanh
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center py-6" aria-hidden="true">
          <div className="relative z-10 w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 shadow-xl shadow-stone-200/50">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <Image src="/images/landing/assistant.svg" alt="" width={48} height={48} priority />
              <div>
                <b className="block text-stone-900 text-sm font-bold">HomeMatch Agent</b>
                <small className="text-stone-500 text-xs">Trợ lý tìm nhà</small>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <p className="ml-auto w-fit max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-stone-900 text-white text-xs sm:text-sm leading-relaxed">
                Studio gần ĐH Bách Khoa, dưới 6 triệu, có máy lạnh
              </p>
              <p className="w-fit max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-slate-100 text-stone-800 text-xs sm:text-sm leading-relaxed">
                Mình lọc theo ngân sách, khu vực và tiện ích bạn cần, rồi gửi những căn phù hợp để bạn so sánh nhé.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-800 text-xs font-semibold">Dưới 6 triệu</span>
              <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-800 text-xs font-semibold">Gần ĐH Bách Khoa</span>
              <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-800 text-xs font-semibold">Có máy lạnh</span>
            </div>
          </div>

          <span className="hidden sm:inline-flex absolute top-4 -left-4 z-20 items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-stone-200 text-stone-800 text-xs font-bold shadow-md">
            <ShieldCheck size={16} className="text-emerald-600" /> Tin đã kiểm duyệt
          </span>
          <span className="hidden sm:inline-flex absolute bottom-4 -left-6 z-20 items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-stone-200 text-stone-800 text-xs font-bold shadow-md">
            <WalletCards size={16} className="text-emerald-600" /> Chi phí rõ ràng
          </span>
          <Image className="hidden lg:block absolute -right-4 -bottom-2 z-20" src="/images/landing/assistant.svg" alt="" width={100} height={100} />
        </div>
      </div>
    </section>
  );
}
