import type { Metadata } from "next";
import Link from "next/link";
import { getGuidesContent } from "@/features/guides/api";
import { GuidesHero } from "@/features/guides/components/GuidesHero";
import { GuideHighlights } from "@/features/guides/components/GuideHighlights";
import { GuideStages } from "@/features/guides/components/GuideStages";
import { GuidesEditorial } from "@/features/guides/components/GuidesEditorial";

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
        <section className="max-w-7xl mx-auto px-4 py-16 text-center" role="alert">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-red-900 mb-2">Chưa thể tải cẩm nang</h2>
            <p className="text-sm text-red-700 mb-6">{result.error}</p>
            <Link className="inline-flex items-center justify-center px-4 py-2 border border-stone-300 rounded-lg text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 transition-colors" href="/cam-nang">
              Thử lại
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
