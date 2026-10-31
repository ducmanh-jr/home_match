import { ArrowRight, BookOpenCheck, MapPin, Scale } from "lucide-react";
import { Card } from "@/components/Card";
import { referenceLink } from "@/lib/config";
import sharedStyles from "@/styles/landing.module.css";
import styles from "@/styles/guides.module.css";
import type { EditorialPrinciple } from "../types";

const icons = { sources: BookOpenCheck, location: MapPin, legal: Scale };

export function GuidesEditorial({ principles }: { principles: EditorialPrinciple[] }) {
  return (
    <>
      <section className={`${sharedStyles.section} ${styles.compactSection} ${styles.editorial}`} aria-label="Cách biên soạn cẩm nang">
        <div className={`${sharedStyles.container} ${styles.principleGrid}`}>
          {principles.map((principle) => {
            const Icon = icons[principle.icon];

            return (
              <Card
                className={`${styles.principle} rounded-[15px] border-slate-200 p-[22px] shadow-none hover:shadow-none`}
                key={principle.title}
              >
                <Icon size={22} aria-hidden="true" />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </Card>
            );
          })}
        </div>
      </section>
      <section className={styles.cta} aria-labelledby="guides-cta-title">
        <div className={`${sharedStyles.container} ${styles.ctaInner}`}>
          <div>
            <h2 id="guides-cta-title">Biết luật rồi, giờ tìm phòng thật</h2>
            <p>
              Trợ lý AI đọc kho tin thật và giải thích vì sao từng căn hợp với bạn.
              Bạn có thể hỏi thẳng bằng tiếng Việt, ví dụ “phòng dưới 4 triệu gần Bách Khoa, có gác lửng”.
            </p>
          </div>
          <a className={`${sharedStyles.button} ${sharedStyles.primaryButton}`} href={referenceLink("/tro-ly-ai")}>
            Mở trợ lý AI <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
