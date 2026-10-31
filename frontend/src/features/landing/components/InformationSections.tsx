import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import styles from "@/styles/landing.module.css";
import type { LandingContent } from "../types";
import { searchLink } from "./DiscoverySections";
import { LandingIcon } from "./LandingIcon";

export function InformationSections({ content }: { content: LandingContent }) {
  return (
    <>
      <section className={`${styles.section} ${styles.audienceSection}`} id="about" aria-label="Tìm nhà theo nhịp sống">
        <div className={`${styles.container} ${styles.audienceGrid}`}>
          {content.audiences.map((audience) => (
            <article className={`${styles.audienceCard} ${styles[audience.theme]}`} key={audience.theme}>
              <div className={styles.audienceCopy}>
                <span>{audience.label}</span>
                <h2>{audience.title}</h2>
                <p>{audience.description}</p>
                <Link className={`${styles.button} ${styles.lightButton}`} href={searchLink(audience.query)}>
                  {audience.action} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="benefits-title">
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.kicker}>Vì sao chọn HomeMatch</span>
            <h2 id="benefits-title">Thuê nhà bớt mơ hồ</h2>
            <p>Thông tin cần thiết được đặt đúng chỗ để bạn so sánh và quyết định tự tin hơn.</p>
          </div>
          <div className={styles.benefitGrid}>
            {content.benefits.map((benefit) => (
              <article key={benefit.title}>
                <span><LandingIcon name={benefit.icon} /></span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.processGrid}`}>
          <div className={styles.processIntro}>
            <span className={styles.kicker}>Đơn giản từ đầu đến cuối</span>
            <h2 id="process-title">Tìm chỗ ở trong 4 bước</h2>
            <p>Từ nhu cầu ban đầu đến lịch xem phòng, mọi bước đều rõ ràng.</p>
            <Link className={styles.textLink} href="/tro-ly-ai">
              Bắt đầu tìm ngay <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Image className={styles.processMascot} src="/images/landing/assistant.svg" alt="" width={92} height={92} />
          </div>
          <ol className={styles.processList}>
            {content.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <LandingIcon name={step.icon} />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className={`${styles.section} ${styles.costSection}`} aria-labelledby="cost-title">
        <div className={`${styles.container} ${styles.costGrid}`}>
          <div className={styles.costVisual}>
            <div className={styles.costPhoto}>
              <Image
                src="/images/landing/living-room.jpg"
                alt="Phòng khách sáng với nội thất và cây xanh"
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
            <div className={styles.costSummary}>
              <span>Tổng quan chi phí</span>
              <strong>Rõ trước khi xem</strong>
              <div><small>Giá thuê</small><b>Hằng tháng</b></div>
              <div><small>Tiền cọc</small><b>Một lần</b></div>
              <div><small>Phí sinh hoạt</small><b>Định kỳ</b></div>
            </div>
          </div>
          <div className={styles.costCopy}>
            <span className={styles.kicker}>Biết trước khi đi xem</span>
            <h2 id="cost-title">Đừng chỉ nhìn giá thuê mỗi tháng.</h2>
            <p>Một chỗ ở phù hợp cần được cân nhắc theo tổng chi phí ban đầu và chi phí sinh hoạt định kỳ.</p>
            <ul>
              {[
                "Giá thuê và tiền cọc",
                "Điện, nước, internet và phí dịch vụ",
                "Phí gửi xe và số lượng xe",
                "Thời hạn hợp đồng và quy định báo trước",
              ].map((item) => <li key={item}><Check size={22} aria-hidden="true" /> {item}</li>)}
            </ul>
            <Link className={`${styles.button} ${styles.secondaryButton}`} href="/cam-nang">
              <BookOpen size={18} aria-hidden="true" /> Xem cẩm nang chi phí
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.section} id="guides" aria-labelledby="guides-title">
        <div className={styles.container}>
          <SectionHeading
            id="guides-title"
            kicker="Chuẩn bị kỹ hơn"
            title="Cẩm nang thuê trọ, có dẫn nguồn"
            description="Giá điện đúng luật, cách đặt cọc an toàn và điều khoản hợp đồng phải có."
          >
            <Link href="/cam-nang">Xem tất cả <ArrowRight size={18} aria-hidden="true" /></Link>
          </SectionHeading>
          <div className={styles.guideGrid}>
            {content.guides.map((guide) => (
              <article key={guide.path}>
                <span className={styles.guideIcon}><LandingIcon name={guide.icon} /></span>
                <small>{guide.category} • {guide.readingMinutes} phút đọc</small>
                <h3>{guide.title}</h3>
                <Link href={guide.path as any}>
                  Đọc bài viết <ArrowRight size={16} aria-hidden="true" />
                  <span className="sr-only">: {guide.title}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.finalCta}`} id="owners" aria-labelledby="cta-title">
        <div className={`${styles.container} ${styles.finalCtaInner}`}>
          <span className={styles.finalMascot} aria-hidden="true">
            <Image src="/images/landing/assistant.svg" alt="" width={128} height={128} />
          </span>
          <div>
            <span className={`${styles.eyebrow} ${styles.darkEyebrow}`}>
              <Sparkles size={14} aria-hidden="true" /> Bắt đầu hành trình tìm nhà
            </span>
            <h2 id="cta-title">Chưa tìm thấy chỗ ở phù hợp?</h2>
            <p>Cho chúng tôi biết khu vực, ngân sách và nhu cầu của bạn để bắt đầu tìm kiếm.</p>
          </div>
          <div className={styles.finalActions}>
            <Link className={`${styles.button} ${styles.primaryButton} ${styles.largeButton}`} href="/tro-ly-ai">
              Tìm phòng ngay <ArrowRight size={19} aria-hidden="true" />
            </Link>
            <Link className={`${styles.button} ${styles.darkOutlineButton} ${styles.largeButton}`} href="/tro-ly-ai">
              Hỏi trợ lý AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
