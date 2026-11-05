import { getLandingContent } from "@/features/landing/api";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { DiscoverySections } from "@/features/landing/components/DiscoverySections";
import { InformationSections } from "@/features/landing/components/InformationSections";

export default async function LandingPage() {
  const result = await getLandingContent().then(
    (content) => ({ content, error: null }),
    (error: unknown) => ({
      content: null,
      error: error instanceof Error ? error.message : "Không thể tải dữ liệu trang chủ.",
    }),
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      {result.content ? (
        <>
          <DiscoverySections content={result.content} />
          <InformationSections content={result.content} />
        </>
      ) : (
        <section className="max-w-7xl mx-auto px-4 py-16 text-center" role="alert">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-red-900 mb-2">Chưa thể tải nội dung</h2>
            <p className="text-sm text-red-700 mb-6">{result.error}</p>
            <a className="inline-flex items-center justify-center px-4 py-2 border border-stone-300 rounded-lg text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 transition-colors" href="/">
              Thử lại
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
