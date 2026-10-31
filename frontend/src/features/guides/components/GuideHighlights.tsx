import Link from "next/link";
import { referenceLink } from "@/lib/config";
import sharedStyles from "@/styles/landing.module.css";
import styles from "@/styles/guides.module.css";
import type { GuideHighlight } from "../types";

export function GuideHighlights({ highlights }: { highlights: GuideHighlight[] }) {
  return (
    <section className={styles.highlights} aria-labelledby="guide-highlights-title">
      <div className={sharedStyles.container}>
        <h2 id="guide-highlights-title">Sáu con số đáng nhớ</h2>
        <div className={styles.highlightGrid}>
          {highlights.map((highlight) => (
            <Link href={referenceLink(highlight.articlePath) as any} key={highlight.value}>
              <b>{highlight.value}</b>
              <span>{highlight.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
