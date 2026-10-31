import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "@/styles/landing.module.css";
import type { LandingContent } from "../types";
import { LandingIcon } from "./LandingIcon";

export function searchLink(query: string) {
  return {
    pathname: "/tro-ly-ai",
    query: { q: query },
  } as any;
}

export function DiscoverySections({ content }: { content: LandingContent }) {
  return (
    <>
      <section className={`${styles.section} ${styles.discoverySection}`} aria-labelledby="discovery-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>Tìm nhanh hơn</span>
              <h2 id="discovery-title">Bắt đầu từ nhu cầu của bạn</h2>
              <p>Chọn cách tìm phù hợp để rút ngắn thời gian xem phòng.</p>
            </div>
            <span className={styles.headingMascot} aria-hidden="true">
              <Image src="/images/landing/assistant.svg" alt="" width={86} height={86} />
            </span>
          </div>
          <div className={styles.discoveryGrid}>
            {content.discovery.map((item) => (
              <Link className={styles.discoveryCard} href={searchLink(item.query)} key={item.title}>
                <span className={`${styles.discoveryIcon} ${styles[item.color]}`}>
                  <LandingIcon name={item.icon} size={22} />
                </span>
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.assistantSection} aria-labelledby="assistant-title">
        <div className={`${styles.container} ${styles.assistantCard}`}>
          <div className={styles.assistantVisual} aria-hidden="true">
            <Image src="/images/landing/assistant.svg" alt="" width={140} height={140} />
            <div className={styles.assistantChips}>
              <span>Studio Quận 10 dưới 6 triệu</span>
              <span>Gần ĐH Bách Khoa</span>
              <span>Có máy giặt riêng</span>
            </div>
          </div>
          <div>
            <span className={styles.kicker}>Tìm bằng ngôn ngữ tự nhiên</span>
            <h2 id="assistant-title">Chỉ cần kể chỗ ở bạn đang tìm</h2>
            <p>Trợ lý ghi nhớ ngân sách, loại phòng và tiện ích trong cuộc trò chuyện, sau đó giúp bạn lưu và so sánh tối đa 3 lựa chọn.</p>
          </div>
          <div className={styles.assistantActions}>
            <Link
              className={`${styles.button} ${styles.primaryButton}`}
              href={searchLink("Tôi muốn tìm phòng phù hợp. Hãy hỏi tôi lần lượt về ngân sách, khu vực và tiện ích ưu tiên.")}
            >Bắt đầu với trợ lý</Link>
            <Link className={`${styles.button} ${styles.outlineButton}`} href={searchLink("Tìm phòng dưới 6 triệu gần trường đại học")}>
              Xem gợi ý mẫu
            </Link>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.areaSection}`} aria-labelledby="area-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>Khám phá theo khu vực</span>
              <h2 id="area-title">Nơi ở phù hợp với nhịp sống của bạn</h2>
              <p>Chọn điểm bắt đầu dựa trên việc học, công việc hoặc kết nối hằng ngày.</p>
            </div>
            <Link href="/tro-ly-ai">Hỏi trợ lý AI <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className={styles.areaGrid}>
            {content.areas.map((area) => (
              <Link className={styles.areaCard} href={searchLink(area.query)} key={area.title}>
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className={styles.areaImage}
                />
                <span className={styles.areaShade} />
                <span className={styles.areaGo} aria-hidden="true"><ArrowRight size={18} /></span>
                <span className={styles.areaContent}>
                  <MapPin size={18} aria-hidden="true" />
                  <strong>{area.title}</strong>
                  <small>{area.description}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
