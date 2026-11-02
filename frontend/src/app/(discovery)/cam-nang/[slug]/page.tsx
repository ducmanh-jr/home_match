import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  House,
  Clock,
  ArrowRight,
  Sparkles,
  MessagesSquare,
  AlertTriangle,
  FileCheck,
} from "lucide-react";
import { getGuideBySlug, getAllGuideSlugs } from "@/features/guides/api";
import { ElectricityCalculator } from "@/features/guides/components/ElectricityCalculator";

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
    <article className="py-10 md:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap" aria-label="Đường dẫn trang">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors">
            <House size={14} /> Trang chủ
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="/cam-nang" className="hover:text-stone-900 transition-colors">Cẩm nang</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-semibold truncate max-w-xs" title={article.title}>
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 mb-3">
            {article.stageTitle} • {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock size={15} className="text-orange-500" /> {article.readingMinutes} phút đọc
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <FileCheck size={15} className="text-emerald-500" /> Dẫn nguồn luật có hiệu lực
            </span>
          </div>
        </header>

        {/* Top Key Figures Bar */}
        {article.stats.length > 0 && (
          <section className="p-6 rounded-2xl bg-slate-50 border border-stone-200 mb-12" aria-label="Số liệu quan trọng">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {article.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <b className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono block">{stat.value}</b>
                  <span className="text-xs text-stone-600 mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Full Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Lead Paragraph */}
            <p className="text-lg text-stone-700 leading-relaxed font-medium pb-6 border-b border-stone-200">
              {article.lead}
            </p>

            {/* Sections */}
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-3">{section.title}</h2>

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-stone-700 text-sm sm:text-base leading-relaxed">{p}</p>
                ))}

                {section.list && (
                  <ul className="list-disc pl-5 space-y-2 text-stone-700 text-sm sm:text-base leading-relaxed">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto my-6 rounded-xl border border-stone-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-900 font-bold">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm leading-relaxed my-4">
                    {section.callout.text}
                  </div>
                )}
              </section>
            ))}

            {/* Interactive Calculator for Electricity Article */}
            {article.hasCalculator && <ElectricityCalculator />}

            {/* Red Flags / Cờ đỏ Warning Box */}
            {article.redFlags && article.redFlags.length > 0 && (
              <section className="p-6 rounded-2xl bg-rose-50 border border-rose-200 my-8">
                <h3 className="flex items-center gap-2 text-base font-bold text-rose-900 mb-3">
                  <AlertTriangle size={18} className="text-rose-600" /> Cờ đỏ — Gặp thì dừng lại hỏi cho rõ
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-rose-800 leading-relaxed">
                  {article.redFlags.map((rf, rIdx) => (
                    <li key={rIdx}>{rf}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Legal Basis / Nguồn trích dẫn */}
            {article.legalBasis && article.legalBasis.length > 0 && (
              <section className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 my-8">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-3">Căn cứ pháp lý & Nguồn trích dẫn</h4>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  {article.legalBasis.map((lb, lIdx) => (
                    <li key={lIdx}>{lb}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Aside */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Landlord Questions Card */}
            {article.landlordQuestions.length > 0 && (
              <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-200 shadow-xs">
                <div className="flex items-center gap-2 text-orange-900 font-bold text-sm mb-4">
                  <MessagesSquare size={18} className="text-orange-600" />
                  <span>Mang đi hỏi chủ nhà</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {article.landlordQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold shrink-0">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Assistant CTA Card */}
            <div className="p-6 rounded-2xl bg-stone-900 text-white shadow-lg space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-orange-400">
                <Sparkles size={16} />
                <span>Đang xem một căn cụ thể?</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                HomeMatch Agent giúp bạn đọc tin đăng thật, tính tổng chi phí sinh hoạt và so sánh các căn phòng trước khi đi xem.
              </p>
              <div className="pt-2">
                <Link
                  href="/tro-ly-ai"
                  className="block w-full py-2.5 text-center bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Mở Trợ lý AI
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stone-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 block mb-1">Đọc tiếp</span>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Bài viết liên quan trong lộ trình</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.filter(Boolean).map((rel) => rel && (
                <Link
                  key={rel.slug}
                  href={`/cam-nang/${rel.slug}` as any}
                  className="group p-6 rounded-2xl border border-stone-200 bg-white hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                      {rel.category} • {rel.readingMinutes} phút đọc
                    </span>
                    <h4 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">{rel.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 text-xs font-bold text-orange-600">
                    <span>Đọc bài viết</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
