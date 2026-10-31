import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { referenceLink } from "@/lib/config";
import sharedStyles from "@/styles/landing.module.css";
import styles from "@/styles/guides.module.css";
import type { GuideStage } from "../types";

export function GuideStages({ stages }: { stages: GuideStage[] }) {
  return (
    <section className={`${sharedStyles.section} ${styles.compactSection}`} aria-labelledby="guide-stages-title">
      <div className={sharedStyles.container}>
        <SectionHeading
          id="guide-stages-title"
          kicker="Theo đúng thứ tự bạn sẽ gặp"
          title="Bốn chặng của một lần thuê nhà"
          description="Mỗi chặng là một nhóm việc phải xong trước khi sang chặng sau. Đọc theo thứ tự nếu bạn thuê lần đầu."
        />
        <div className={styles.stages}>
          {stages.map((stage, index) => (
            <section className={styles.stage} id={stage.id} key={stage.id} aria-labelledby={`${stage.id}-title`}>
              <header>
                <span className={styles.stageNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 id={`${stage.id}-title`}>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </header>
              <div className={styles.articleGrid}>
                {stage.articles.map((article) => (
                  <Link className={styles.articleLink} href={referenceLink(article.path) as any} key={article.path}>
                    <Card className={`${styles.articleCard} h-full rounded-[15px] border-slate-200 p-5 shadow-none hover:shadow-sm`}>
                      <h4>{article.title}</h4>
                      <p>{article.description}</p>
                      <footer>
                        <small>{article.readingMinutes} phút</small>
                        {article.hasCalculator && (
                          <small className={styles.calculatorLabel}>
                            <Calculator size={13} aria-hidden="true" /> có công cụ tính
                          </small>
                        )}
                        <ArrowRight size={16} aria-hidden="true" />
                      </footer>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
