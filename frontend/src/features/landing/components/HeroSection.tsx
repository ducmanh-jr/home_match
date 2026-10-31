import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ShieldCheck, Sparkles, WalletCards, Zap } from "lucide-react";
import styles from "@/styles/landing.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <Sparkles size={15} aria-hidden="true" /> Thuê nhà cùng trợ lý AI
          </span>
          <h1 id="hero-title">Tìm chỗ ở phù hợp <span>nhanh, rõ ràng và an tâm</span></h1>
          <p>
            Kể nhu cầu bằng lời của bạn — HomeMatch Agent lọc tin đăng đã kiểm duyệt,
            làm rõ chi phí trước khi xem và giúp bạn đặt lịch xem phòng.
          </p>
          <div className={styles.heroActions}>
            <Link className={`${styles.button} ${styles.primaryButton} ${styles.largeButton}`} href="/tro-ly-ai">
              <Sparkles size={18} aria-hidden="true" /> Trò chuyện với trợ lý AI
            </Link>
            <Link className={`${styles.button} ${styles.outlineButton} ${styles.largeButton}`} href={{ pathname: "/tro-ly-ai", query: { tim_nhanh: "1" } } as any}>
              <Zap size={18} aria-hidden="true" /> Tìm nhà nhanh
            </Link>
          </div>
          <ul className={styles.heroTrust}>
            <li><ShieldCheck size={18} aria-hidden="true" /> Tin đăng được kiểm duyệt</li>
            <li><WalletCards size={18} aria-hidden="true" /> Chi phí rõ trước khi xem</li>
            <li><CalendarCheck size={18} aria-hidden="true" /> Đặt lịch xem nhanh</li>
          </ul>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.conversationCard}>
            <div className={styles.conversationHeader}>
              <Image src="/images/landing/assistant.svg" alt="" width={52} height={52} priority />
              <span><b>HomeMatch Agent</b><small>Trợ lý tìm nhà</small></span>
            </div>
            <p className={`${styles.bubble} ${styles.userBubble}`}>
              Studio gần ĐH Bách Khoa, dưới 6 triệu, có máy lạnh
            </p>
            <p className={`${styles.bubble} ${styles.agentBubble}`}>
              Mình lọc theo ngân sách, khu vực và tiện ích bạn cần, rồi gửi những căn phù hợp để bạn so sánh nhé.
            </p>
            <div className={styles.conversationChips}>
              <span>Dưới 6 triệu</span><span>Gần ĐH Bách Khoa</span><span>Có máy lạnh</span>
            </div>
          </div>
          <span className={`${styles.floatingBadge} ${styles.verifiedBadge}`}>
            <ShieldCheck size={17} /> Tin đã kiểm duyệt
          </span>
          <span className={`${styles.floatingBadge} ${styles.costBadge}`}>
            <WalletCards size={17} /> Chi phí rõ ràng
          </span>
          <Image className={styles.heroMascot} src="/images/landing/assistant.svg" alt="" width={112} height={112} />
        </div>
      </div>
    </section>
  );
}
