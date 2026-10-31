"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, BookOpen, Clock, GraduationCap, House, Info, Lightbulb, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/context";
import styles from "@/styles/tro-ly-ai.module.css";
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

export function AssistantWelcome({ inputText, onInputChange, onSearch, onQuickFilter, onHistory, isBusy, quickFilter }: AssistantWelcomeProps) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  return (
    /* HERO INITIAL VIEW */
    <div className={styles.wsHero}>
      {/* Top Bar */}
      <div className={styles.wsHeroTop}>
        <Link href="/" className={styles.brandLogo} aria-label="HomeMatch — Trang chủ">
          <House size={30} strokeWidth={2.6} aria-hidden="true" />
          <span>Home<span>Match</span></span>
        </Link>
        <nav aria-label="Điều hướng tài khoản" className={styles.accountNav}>
          {!isAuthLoading && (
            <Link href={isAuthenticated ? "/" : "/auth/login"}>
              {isAuthenticated ? "Về trang chủ" : "Đăng nhập"}
            </Link>
          )}
        </nav>
      </div>
      <div className={styles.wsHeroInner}>
        {/* Mascot & Heading */}
        <div className={styles.wsHeroMascot} aria-hidden="true">
          <span className={`${styles.spark} ${styles.s1}`}>✦</span>
          <span className={`${styles.spark} ${styles.s2}`}>✦</span>
          <span className={`${styles.spark} ${styles.s3}`}>✦</span>
          <div className={styles.mascotHalo}>
            <Image src="/images/landing/assistant.svg" alt="" width={112} height={112} priority />
          </div>
        </div>
        <h1>Bạn đang tìm một <em>nơi ở</em> như thế nào?</h1>
        <p className={styles.sub}>HomeMatch Agent sẽ giúp bạn tìm phòng phù hợp nhanh chóng,<br />chính xác và tiết kiệm thời gian.</p>
        {/* Hero Search Form */}
        <ChatComposer value={inputText} onChange={onInputChange} onSubmit={onSearch} onQuickFilter={onQuickFilter} isBusy={isBusy}>
          {quickFilter}
        </ChatComposer>
        {/* Prompt Suggestion Chips */}
        <div className={styles.tryPromptTitle}><Sparkles size={14} aria-hidden="true" /><span>Bạn có thể thử hỏi:</span></div>
        <div className={styles.chipsGrid}>
          {suggestions.map(({ icon: Icon, text }) => (
            <button type="button" className={styles.chipButton} onClick={() => onSearch(text)} key={text} disabled={isBusy}>
              <Icon size={16} aria-hidden="true" /><span>{text}</span>
            </button>
          ))}
        </div>
        {/* City Skyline Illustration */}
        <div className={styles.wsHeroIllus} aria-hidden="true">
          <Image src="/images/ai-assistant/city-scene.svg" alt="" width={560} height={108} />
        </div>
        <p className={styles.wsHeroTrust}><ShieldCheck size={16} aria-hidden="true" /><span>Thông tin thật · Giá tốt · An tâm thuê</span></p>
      </div>
      {/* Footer Utility Row */}
      <p className={styles.heroDisclaimer}><Info size={13} aria-hidden="true" />HomeMatch Agent có thể mắc lỗi. Vui lòng kiểm tra thông tin trước khi quyết định.</p>
      <div className={styles.wsHeroFooterRow}>
        <Link href="/cam-nang"><Lightbulb size={14} aria-hidden="true" /> Cẩm nang</Link>
        <button type="button" onClick={onHistory}><Clock size={14} aria-hidden="true" /> Lịch sử</button>
        <Link href="/tro-ly-ai?q=Hướng dẫn tôi tìm phòng với trợ lý AI"><BookOpen size={14} aria-hidden="true" /> Hướng dẫn sử dụng</Link>
      </div>
    </div>
  );
}
