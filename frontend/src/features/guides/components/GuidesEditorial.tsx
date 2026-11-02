import { ArrowRight, BookOpenCheck, MapPin, Scale } from "lucide-react";
import { referenceLink } from "@/lib/config";
import type { EditorialPrinciple } from "../types";

const icons = { sources: BookOpenCheck, location: MapPin, legal: Scale };

export function GuidesEditorial({ principles }: { principles: EditorialPrinciple[] }) {
  return (
    <>
      <section className="py-16 md:py-20 bg-white" aria-label="Cách biên soạn cẩm nang">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((principle) => {
            const Icon = icons[principle.icon];

            return (
              <div
                className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 shadow-xs"
                key={principle.title}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{principle.title}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{principle.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-stone-900 text-white" aria-labelledby="guides-cta-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h2 id="guides-cta-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              Biết luật rồi, giờ tìm phòng thật
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Trợ lý AI đọc kho tin thật và giải thích vì sao từng căn hợp với bạn.
              Bạn có thể hỏi thẳng bằng tiếng Việt, ví dụ “phòng dưới 4 triệu gần Bách Khoa, có gác lửng”.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors shrink-0"
            href={referenceLink("/tro-ly-ai")}
          >
            Mở trợ lý AI <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
