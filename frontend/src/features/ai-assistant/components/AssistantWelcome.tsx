"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, BookOpen, Clock, GraduationCap, House, Info, Lightbulb, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/context";
import { buttonClasses } from "@/components/ui";
import { ChatComposer } from "./ChatComposer";

const suggestions = [
  { icon: GraduationCap, text: "Tìm phòng dưới 6 triệu gần Đại học Bách Khoa" },
  { icon: BookOpen, text: "Phòng gần trường Đại học Kinh Tế, ưu tiên có máy lạnh" },
  { icon: BedDouble, text: "Studio có nội thất, gác lửng ở Quận 10" },
  { icon: Scale, text: "So sánh giúp mình 2 căn rẻ nhất" },
];

interface AssistantWelcomeProps {
  inputText: string;
  onInputChange: (value: string) => void;
  onSearch: (query: string) => void;
  onQuickFilter: () => void;
  onHistory: () => void;
  isBusy: boolean;
  quickFilter: ReactNode;
}

export function AssistantWelcome({
  inputText,
  onInputChange,
  onSearch,
  onQuickFilter,
  onHistory,
  isBusy,
  quickFilter,
}: AssistantWelcomeProps) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 max-w-4xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 tracking-tight" aria-label="HomeMatch — Trang chủ">
          <span className="p-1.5 rounded-lg bg-orange-500 text-white">
            <House size={22} strokeWidth={2.5} />
          </span>
          <span className="text-lg">
            Home<span className="text-orange-600">Match</span>
          </span>
        </Link>
        <nav aria-label="Điều hướng tài khoản">
          {!isAuthLoading && (
            <Link
              href={isAuthenticated ? "/" : "/auth/login"}
              className={buttonClasses({ variant: "ghost", size: "sm", className: "text-slate-600" })}
            >
              {isAuthenticated ? "Về trang chủ" : "Đăng nhập"}
            </Link>
          )}
        </nav>
      </div>

      {/* Main Hero Section */}
      <div className="flex flex-col items-center my-auto py-6">
        {/* Mascot & Heading */}
        <div className="relative mb-5" aria-hidden="true">
          <span className="absolute -top-2 -left-3 text-orange-400 text-base animate-pulse">✦</span>
          <span className="absolute -bottom-1 -right-2 text-amber-400 text-xs animate-pulse delay-150">✦</span>
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-orange-100/80 to-amber-50 flex items-center justify-center p-2 shadow-inner border border-orange-200/50">
            <Image src="/images/landing/assistant.svg" alt="" width={88} height={88} priority />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 text-center tracking-tight max-w-xl">
          Bạn đang tìm một <em className="text-orange-600 not-italic">nơi ở</em> như thế nào?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 text-center max-w-lg mt-2 mb-6 leading-relaxed">
          HomeMatch Agent sẽ giúp bạn tìm phòng phù hợp nhanh chóng, chính xác và tiết kiệm thời gian.
        </p>

        {/* Hero Search Form */}
        <div className="w-full">
          <ChatComposer
            value={inputText}
            onChange={onInputChange}
            onSubmit={onSearch}
            onQuickFilter={onQuickFilter}
            isBusy={isBusy}
          >
            {quickFilter}
          </ChatComposer>
        </div>

        {/* Suggestion Chips */}
        <div className="w-full max-w-2xl mt-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 mb-2.5">
            <Sparkles size={13} className="text-amber-500" />
            <span>Bạn có thể thử hỏi:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map(({ icon: Icon, text }) => (
              <button
                type="button"
                key={text}
                disabled={isBusy}
                onClick={() => onSearch(text)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-orange-50/50 hover:border-orange-200 text-xs font-medium text-slate-700 hover:text-orange-900 text-left transition-all shadow-xs group"
              >
                <Icon size={15} className="text-slate-400 group-hover:text-orange-600 shrink-0" />
                <span className="truncate">{text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* City Skyline Illustration */}
        <div className="mt-8 opacity-75 pointer-events-none select-none max-w-md w-full" aria-hidden="true">
          <Image src="/images/ai-assistant/city-scene.svg" alt="" width={560} height={108} className="w-full h-auto" />
        </div>

        <p className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-3">
          <ShieldCheck size={15} className="text-emerald-500" />
          <span>Thông tin thật · Giá tốt · An tâm thuê</span>
        </p>
      </div>

      {/* Footer Utility Row */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p className="flex items-center gap-1.5 m-0 text-center sm:text-left text-[11px]">
          <Info size={13} className="shrink-0" />
          HomeMatch Agent có thể mắc lỗi. Vui lòng kiểm tra thông tin trước khi quyết định.
        </p>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <Link href="/cam-nang" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
            <Lightbulb size={13} /> Cẩm nang
          </Link>
          <button
            type="button"
            onClick={onHistory}
            className="flex items-center gap-1 hover:text-orange-600 transition-colors"
          >
            <Clock size={13} /> Lịch sử
          </button>
          <Link
            href="/tro-ly-ai?q=Hướng dẫn tôi tìm phòng với trợ lý AI"
            className="flex items-center gap-1 hover:text-orange-600 transition-colors"
          >
            <BookOpen size={13} /> Hướng dẫn
          </Link>
        </div>
      </div>
    </div>
  );
}
