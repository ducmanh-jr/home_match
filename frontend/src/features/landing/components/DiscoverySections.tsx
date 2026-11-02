import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { LandingContent } from "../types";
import { LandingIcon } from "./LandingIcon";

export function searchLink(query: string) {
  return {
    pathname: "/tro-ly-ai",
    query: { q: query },
  } as any;
}

const colorMap: Record<string, string> = {
  orange: "text-orange-600 bg-orange-50",
  blue: "text-sky-600 bg-sky-50",
  green: "text-emerald-600 bg-emerald-50",
};

export function DiscoverySections({ content }: { content: LandingContent }) {
  return (
    <>
      {/* Discovery by needs */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="discovery-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Tìm nhanh hơn</span>
              <h2 id="discovery-title" className="text-2xl md:text-3xl font-extrabold text-stone-900 mt-2">
                Bắt đầu từ nhu cầu của bạn
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-1">Chọn cách tìm phù hợp để rút ngắn thời gian xem phòng.</p>
            </div>
            <span className="hidden md:block shrink-0" aria-hidden="true">
              <Image src="/images/landing/assistant.svg" alt="" width={72} height={72} />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.discovery.map((item) => (
              <Link
                className="group p-5 bg-stone-50 hover:bg-white border border-stone-200 hover:border-orange-300 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
                href={searchLink(item.query)}
                key={item.title}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${colorMap[item.color] || "text-stone-700 bg-stone-100"}`}>
                    <LandingIcon name={item.icon} size={22} />
                  </span>
                  <div>
                    <strong className="block text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </strong>
                    <small className="block text-xs text-stone-500 mt-0.5">{item.description}</small>
                  </div>
                </div>
                <ArrowRight size={18} className="text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Natural language AI helper CTA */}
      <section className="py-12 bg-slate-50 border-t border-b border-stone-200" aria-labelledby="assistant-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white/80 rounded-2xl border border-orange-100 shadow-xs" aria-hidden="true">
              <Image src="/images/landing/assistant.svg" alt="" width={110} height={110} />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-semibold">Studio Quận 10 dưới 6 triệu</span>
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-semibold">Gần ĐH Bách Khoa</span>
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-semibold">Có máy giặt riêng</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Tìm bằng ngôn ngữ tự nhiên</span>
              <h2 id="assistant-title" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Chỉ cần kể chỗ ở bạn đang tìm
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Trợ lý ghi nhớ ngân sách, loại phòng và tiện ích trong cuộc trò chuyện, sau đó giúp bạn lưu và so sánh tối đa 3 lựa chọn.
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-3">
              <Link
                className="w-full text-center px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                href={searchLink("Tôi muốn tìm phòng phù hợp. Hãy hỏi tôi lần lượt về ngân sách, khu vực và tiện ích ưu tiên.")}
              >
                Bắt đầu với trợ lý
              </Link>
              <Link
                className="w-full text-center px-5 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-sm font-semibold transition-colors"
                href={searchLink("Tìm phòng dưới 6 triệu gần trường đại học")}
              >
                Xem gợi ý mẫu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Area explore section */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="area-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Khám phá theo khu vực</span>
              <h2 id="area-title" className="text-2xl md:text-3xl font-extrabold text-stone-900 mt-2">
                Nơi ở phù hợp với nhịp sống của bạn
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-1">Chọn điểm bắt đầu dựa trên việc học, công việc hoặc kết nối hằng ngày.</p>
            </div>
            <Link href="/tro-ly-ai" className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700">
              Hỏi trợ lý AI <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.areas.map((area) => (
              <Link
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-100 shadow-sm hover:shadow-lg transition-all"
                href={searchLink(area.query)}
                key={area.title}
              >
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1 transition-all" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-xs text-orange-300 mb-1">
                    <MapPin size={14} aria-hidden="true" />
                    <span>Khu vực</span>
                  </div>
                  <strong className="block text-base font-bold leading-snug">{area.title}</strong>
                  <small className="block text-xs text-stone-300 mt-0.5">{area.description}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
