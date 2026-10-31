import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  House,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  MessagesSquare,
  AlertTriangle,
  Scale,
  FileCheck,
} from "lucide-react";
import { getGuideBySlug, getAllGuideSlugs } from "@/features/guides/api";
import { ElectricityCalculator } from "@/features/guides/components/ElectricityCalculator";
import styles from "@/styles/guides-detail.module.css";
import landingStyles from "@/styles/landing.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getGuideBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết | HomeMatch",
    };
  }

  return {
    title: `${article.title} — Cẩm nang HomeMatch`,
    description: article.description,
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getGuideBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles
  const relatedArticles = await Promise.all(
    article.relatedSlugs.map(async (rSlug) => getGuideBySlug(rSlug))
  );

  return (
    <article className={styles.detailPage}>
      <div className={landingStyles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label="Đường dẫn trang">
          <Link href="/" className="inline-flex items-center gap-1">
            <House size={14} /> Trang chủ
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/cam-nang">Cẩm nang</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbActive} title={article.title}>
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <span className={styles.categoryTag}>
            {article.stageTitle} • {article.category}
          </span>
          <h1 className={styles.articleTitle}>{article.title}</h1>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <Clock size={15} className="text-orange-500" /> {article.readingMinutes} phút đọc
            </span>
            <span className={styles.metaItem}>
              <FileCheck size={15} className="text-emerald-500" /> Dẫn nguồn luật có hiệu lực
            </span>
          </div>
        </header>

        {/* Top Key Figures Bar (cn-bai-so) */}
        {article.stats.length > 0 && (
          <section className={styles.statsSection} aria-label="Số liệu quan trọng">
            <div className={styles.statsGrid}>
              {article.stats.map((stat, i) => (
                <div key={i} className={styles.statItem}>
                  <b className={styles.statValue}>{stat.value}</b>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main 2-Column Layout */}
        <div className={styles.mainLayout}>
          {/* Left Column: Full Content */}
          <div className={styles.articleBody}>
            {/* Lead Paragraph */}
            <p className={styles.leadParagraph}>{article.lead}</p>

            {/* Sections */}
            {article.sections.map((section, idx) => (
              <section key={idx} className={styles.sectionBlock}>
                <h2>{section.title}</h2>

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.list && (
                  <ul className={styles.bulletList}>
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className={styles.tableWrap}>
                    <table className={styles.dataTable}>
                      <thead>
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div className={styles.warningCallout}>
                    {section.callout.text}
                  </div>
                )}
              </section>
            ))}

            {/* Interactive Calculator for Electricity Article */}
            {article.hasCalculator && <ElectricityCalculator />}

            {/* Red Flags / Cờ đỏ Warning Box */}
            {article.redFlags && article.redFlags.length > 0 && (
              <section className={styles.redFlagSection}>
                <h3 className={styles.redFlagTitle}>
                  <AlertTriangle size={18} /> Cờ đỏ — Gặp thì dừng lại hỏi cho rõ
                </h3>
                <ul className={styles.redFlagList}>
                  {article.redFlags.map((rf, rIdx) => (
                    <li key={rIdx}>{rf}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Legal Basis / Nguồn trích dẫn */}
            {article.legalBasis && article.legalBasis.length > 0 && (
              <section className={styles.legalBox}>
                <h4 className={styles.legalTitle}>Căn cứ pháp lý & Nguồn trích dẫn</h4>
                <ul className={styles.legalList}>
                  {article.legalBasis.map((lb, lIdx) => (
                    <li key={lIdx}>{lb}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Aside */}
          <aside className={styles.asideCol}>
            {/* Landlord Questions Card */}
            {article.landlordQuestions.length > 0 && (
              <div className={styles.landlordCard}>
                <div className={styles.landlordCardHead}>
                  <MessagesSquare size={20} />
                  <span>Mang đi hỏi chủ nhà</span>
                </div>
                <ul className={styles.landlordQuestions}>
                  {article.landlordQuestions.map((q, qIdx) => (
                    <li key={qIdx}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Assistant CTA Card */}
            <div className={styles.aiCtaCard}>
              <div className={styles.aiCtaTitle}>
                <Sparkles size={18} />
                <span>Đang xem một căn cụ thể?</span>
              </div>
              <p className={styles.aiCtaDesc}>
                HomeMatch Agent giúp bạn đọc tin đăng thật, tính tổng chi phí sinh hoạt và so sánh các căn phòng trước khi đi xem.
              </p>
              <Link href="/tro-ly-ai" className={styles.aiCtaButton}>
                Mở Trợ lý AI
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <span className={styles.relatedKicker}>Đọc tiếp</span>
            <h2 className={styles.relatedHeading}>Bài viết liên quan trong lộ trình</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.filter(Boolean).map((rel) => rel && (
                <Link
                  key={rel.slug}
                  href={`/cam-nang/${rel.slug}` as any}
                  className={styles.relatedCard}
                >
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                      {rel.category} • {rel.readingMinutes} phút đọc
                    </span>
                    <h4>{rel.title}</h4>
                    <p>{rel.description}</p>
                  </div>
                  <div className={styles.relatedCardFooter}>
                    <span>Đọc bài viết</span>
                    <ArrowRight size={15} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

