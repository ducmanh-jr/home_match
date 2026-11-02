import Link from "next/link";
import { referenceLink } from "@/lib/config";
import type { GuideHighlight } from "../types";

export function GuideHighlights({ highlights }: { highlights: GuideHighlight[] }) {
  return (
    <section className="py-12 bg-white border-b border-stone-200" aria-labelledby="guide-highlights-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="guide-highlights-title" className="text-xl sm:text-2xl font-bold text-stone-900 mb-6">
          Sáu con số đáng nhớ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map((highlight) => (
            <Link
              href={referenceLink(highlight.articlePath) as any}
              key={highlight.value}
              className="group p-4 rounded-2xl bg-stone-50 hover:bg-orange-50 border border-stone-200 hover:border-orange-200 transition-all text-center flex flex-col justify-center items-center"
            >
              <b className="text-xl sm:text-2xl font-extrabold text-stone-900 group-hover:text-orange-600 transition-colors font-mono block">
                {highlight.value}
              </b>
              <span className="text-xs text-stone-600 mt-1 line-clamp-2">{highlight.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
