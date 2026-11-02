import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { referenceLink } from "@/lib/config";
import type { GuideStage } from "../types";

export function GuideStages({ stages }: { stages: GuideStage[] }) {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-stone-200" aria-labelledby="guide-stages-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="guide-stages-title"
          kicker="Theo đúng thứ tự bạn sẽ gặp"
          title="Bốn chặng của một lần thuê nhà"
          description="Mỗi chặng là một nhóm việc phải xong trước khi sang chặng sau. Đọc theo thứ tự nếu bạn thuê lần đầu."
        />
        <div className="space-y-12 mt-10">
          {stages.map((stage, index) => (
            <section className="space-y-6" id={stage.id} key={stage.id} aria-labelledby={`${stage.id}-title`}>
              <header className="flex items-start gap-4">
                <span className="text-2xl font-extrabold text-orange-600 font-mono shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 id={`${stage.id}-title`} className="text-xl font-bold text-stone-900">{stage.title}</h3>
                  <p className="text-stone-600 text-sm mt-0.5">{stage.description}</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {stage.articles.map((article) => (
                  <Link className="group block h-full" href={referenceLink(article.path) as any} key={article.path}>
                    <div className="h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                          {article.description}
                        </p>
                      </div>
                      <footer className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <span>{article.readingMinutes} phút</span>
                          {article.hasCalculator && (
                            <span className="inline-flex items-center gap-1 text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-full text-[11px]">
                              <Calculator size={12} aria-hidden="true" /> có công cụ tính
                            </span>
                          )}
                        </div>
                        <ArrowRight size={16} className="text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                      </footer>
                    </div>
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
