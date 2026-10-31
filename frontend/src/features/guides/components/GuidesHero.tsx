import { Sparkles, Zap } from "lucide-react";
import { referenceLink } from "@/lib/config";
import sharedStyles from "@/styles/landing.module.css";
import styles from "@/styles/guides.module.css";

export function GuidesHero() {
  return (
    <section className={styles.hero} aria-labelledby="guides-page-title">
      <div className={sharedStyles.container}>
        <span className={sharedStyles.kicker}>Cẩm nang HomeMatch</span>
        <h1 id="guides-page-title">Thuê trọ mà không phải<br />trả giá để học.</h1>
        <p>
          Viết cho sinh viên và người đi làm thuê nhà ở TP.HCM, Hà Nội.
          Mỗi con số về giá điện, tiền cọc hay thủ tục đều dẫn nguồn tra được —
          để bạn mang đi hỏi chủ nhà, không phải để đọc cho biết.
        </p>
        <div className={styles.heroActions}>
          <a
            className={`${sharedStyles.button} ${sharedStyles.primaryButton}`}
            href={referenceLink("/cam-nang/tien-dien-dung-gia")}
          >
            <Zap size={18} aria-hidden="true" /> Đối chiếu tiền điện của bạn
          </a>
          <a
            className={`${sharedStyles.button} ${sharedStyles.outlineButton}`}
            href={referenceLink("/tro-ly-ai")}
          >
            <Sparkles size={18} aria-hidden="true" /> Hỏi trợ lý AI về căn cụ thể
          </a>
        </div>
      </div>
    </section>
  );
}
