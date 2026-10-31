import { getLandingContent } from "@/features/landing/api";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { DiscoverySections } from "@/features/landing/components/DiscoverySections";
import { InformationSections } from "@/features/landing/components/InformationSections";
import styles from "@/styles/landing.module.css";

export default async function LandingPage() {
  const result = await getLandingContent().then(
    (content) => ({ content, error: null }),
    (error: unknown) => ({
      content: null,
      error: error instanceof Error ? error.message : "Không thể tải dữ liệu trang chủ.",
    }),
  );

  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        {result.content ? (
          <>
            <DiscoverySections content={result.content} />
            <InformationSections content={result.content} />
          </>
        ) : (
          <section className={`${styles.container} ${styles.dataError}`} role="alert">
            <h2>Chưa thể tải nội dung</h2>
            <p>{result.error}</p>
            <a className={`${styles.button} ${styles.outlineButton}`} href="/">Thử lại</a>
          </section>
        )}
      </main>
    </>
  );
}
