import { Sparkles, Zap } from "lucide-react";
import { referenceLink } from "@/lib/config";

export function GuidesHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-stone-200" aria-labelledby="guides-page-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 block mb-3">
            Cẩm nang HomeMatch
          </span>
          <h1 id="guides-page-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Thuê trọ mà không phải<br />trả giá để học.
          </h1>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Viết cho sinh viên và người đi làm thuê nhà ở TP.HCM, Hà Nội.
            Mỗi con số về giá điện, tiền cọc hay thủ tục đều dẫn nguồn tra được —
            để bạn mang đi hỏi chủ nhà, không phải để đọc cho biết.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
              href={referenceLink("/cam-nang/tien-dien-dung-gia")}
            >
              <Zap size={18} aria-hidden="true" /> Đối chiếu tiền điện của bạn
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-sm font-semibold transition-colors"
              href={referenceLink("/tro-ly-ai")}
            >
              <Sparkles size={18} className="text-amber-500" aria-hidden="true" /> Hỏi trợ lý AI về căn cụ thể
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
