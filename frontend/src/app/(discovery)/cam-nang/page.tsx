import type { Metadata } from "next";
import Link from "next/link";
import { getGuidesContent } from "@/features/guides/api";
import { GuidesHero } from "@/features/guides/components/GuidesHero";
import { GuideHighlights } from "@/features/guides/components/GuideHighlights";
import { GuideStages } from "@/features/guides/components/GuideStages";
import { GuidesEditorial } from "@/features/guides/components/GuidesEditorial";
import styles from "@/styles/landing.module.css";

export const metadata: Metadata = {
  title: "Cẩm nang thuê trọ cho người đi học, đi làm | HomeMatch",
  description: "Cẩm nang về chi phí, xem phòng, đặt cọc, hợp đồng và những điều cần chuẩn bị khi thuê trọ.",
};

export default async function GuidesPage() {
  const result = await getGuidesContent().then(
    (content) => ({ content, error: null }),
    (error: unknown) => ({
      content: null,
      error: error instanceof Error ? error.message : "Không thể tải dữ liệu cẩm nang.",
    }),
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <GuidesHero />
      {result.content ? (
        <>
          <GuideHighlights highlights={result.content.highlights} />
          <GuideStages stages={result.content.stages} />
          <GuidesEditorial principles={result.content.principles} />
        </>
      ) : (
        <section className={`${styles.container} ${styles.dataError}`} role="alert">
          <h2>Chưa thể tải cẩm nang</h2>
          <p>{result.error}</p>
          <Link className={`${styles.button} ${styles.outlineButton}`} href="/cam-nang">Thử lại</Link>
        </section>
      )}
    </main>
  );
}
