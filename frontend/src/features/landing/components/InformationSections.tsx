import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { LandingContent } from "../types";
import { searchLink } from "./DiscoverySections";
import { LandingIcon } from "./LandingIcon";

const audienceThemeStyles: Record<string, string> = {
  student: "bg-gradient-to-br from-orange-700 to-orange-500",
  worker: "bg-gradient-to-br from-slate-900 to-slate-700",
};

export function InformationSections({ content }: { content: LandingContent }) {
  return (
    <>
      {/* Target Audiences */}
      <section className="py-16 md:py-20 bg-white" id="about" aria-label="Tìm nhà theo nhịp sống">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.audiences.map((audience) => (
            <article
              className={`relative flex items-end min-h-[380px] p-8 sm:p-12 rounded-3xl text-white shadow-lg overflow-hidden transition-transform hover:-translate-y-1 ${audienceThemeStyles[audience.theme] || "bg-stone-900"}`}
              key={audience.theme}
            >
              <div className="relative z-10 max-w-md">
                <span className="text-xs font-extrabold uppercase tracking-widest text-white/80 block mb-2">
                  {audience.label}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  {audience.title}
                </h2>
                <p className="text-sm sm:text-base text-white/90 mb-6 leading-relaxed">
                  {audience.description}
                </p>
                <Link
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-stone-900 font-bold text-sm shadow-md hover:bg-stone-100 transition-colors"
                  href={searchLink(audience.query)}
                >
                  {audience.action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-stone-200" aria-labelledby="benefits-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 block mb-2">Vì sao chọn HomeMatch</span>
            <h2 id="benefits-title" className="text-2xl md:text-3xl font-extrabold text-stone-900">
              Thuê nhà bớt mơ hồ
            </h2>
            <p className="text-stone-600 text-sm md:text-base mt-2">
              Thông tin cần thiết được đặt đúng chỗ để bạn so sánh và quyết định tự tin hơn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.benefits.map((benefit) => (
              <article key={benefit.title} className="bg-white border border-stone-200 p-8 rounded-2xl shadow-xs">
                <span className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
                  <LandingIcon name={benefit.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{benefit.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps Process */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Đơn giản từ đầu đến cuối</span>
            <h2 id="process-title" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Tìm chỗ ở trong 4 bước
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Từ nhu cầu ban đầu đến lịch xem phòng, mọi bước đều rõ ràng.
            </p>
            <div className="pt-2">
              <Link className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700" href="/tro-ly-ai">
                Bắt đầu tìm ngay <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="pt-6 hidden sm:block">
              <Image src="/images/landing/assistant.svg" alt="" width={92} height={92} />
            </div>
          </div>

          <ol className="lg:col-span-7 space-y-6">
            {content.steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-5 p-6 rounded-2xl border border-stone-200 bg-stone-50/50">
                <span className="text-xl font-extrabold text-orange-600 shrink-0 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-600"><LandingIcon name={step.icon} size={18} /></span>
                    <h3 className="text-base font-bold text-stone-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost transparency section */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-stone-200" aria-labelledby="cost-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone-200">
              <Image
                src="/images/landing/living-room.jpg"
                alt="Phòng khách sáng với nội thất và cây xanh"
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white border border-stone-200 p-5 rounded-2xl shadow-xl w-64">
              <span className="text-xs uppercase font-extrabold text-orange-600 block">Tổng quan chi phí</span>
              <strong className="text-base font-bold text-stone-900 block mb-3">Rõ trước khi xem</strong>
              <div className="space-y-2 text-xs border-t border-stone-100 pt-2">
                <div className="flex justify-between"><span className="text-stone-500">Giá thuê</span><b className="text-stone-800">Hằng tháng</b></div>
                <div className="flex justify-between"><span className="text-stone-500">Tiền cọc</span><b className="text-stone-800">Một lần</b></div>
                <div className="flex justify-between"><span className="text-stone-500">Phí sinh hoạt</span><b className="text-stone-800">Định kỳ</b></div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Biết trước khi đi xem</span>
            <h2 id="cost-title" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Đừng chỉ nhìn giá thuê mỗi tháng.
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Một chỗ ở phù hợp cần được cân nhắc theo tổng chi phí ban đầu và chi phí sinh hoạt định kỳ.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Giá thuê và tiền cọc",
                "Điện, nước, internet và phí dịch vụ",
                "Phí gửi xe và số lượng xe",
                "Thời hạn hợp đồng và quy định báo trước",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-stone-700">
                  <Check size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors shadow-sm"
                href="/cam-nang"
              >
                <BookOpen size={16} aria-hidden="true" /> Xem cẩm nang chi phí
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guides & Resources */}
      <section className="py-16 md:py-20 bg-white" id="guides" aria-labelledby="guides-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="guides-title"
            kicker="Chuẩn bị kỹ hơn"
            title="Cẩm nang thuê trọ, có dẫn nguồn"
            description="Giá điện đúng luật, cách đặt cọc an toàn và điều khoản hợp đồng phải có."
          >
            <Link href="/cam-nang" className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700">
              Xem tất cả <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.guides.map((guide) => (
              <article key={guide.path} className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-orange-200 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                    <LandingIcon name={guide.icon} size={20} />
                  </span>
                  <small className="text-xs text-stone-500 font-medium block mb-1">{guide.category} • {guide.readingMinutes} phút đọc</small>
                  <h3 className="text-base font-bold text-stone-900 leading-snug mb-4">{guide.title}</h3>
                </div>
                <Link href={guide.path as any} className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 pt-2">
                  Đọc bài viết <ArrowRight size={14} aria-hidden="true" />
                  <span className="sr-only">: {guide.title}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-stone-900 text-white" id="owners" aria-labelledby="cta-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="hidden sm:grid shrink-0 place-items-center" aria-hidden="true">
              <Image src="/images/landing/assistant.svg" alt="" width={100} height={100} />
            </span>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Sparkles size={14} aria-hidden="true" /> Bắt đầu hành trình tìm nhà
              </span>
              <h2 id="cta-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                Chưa tìm thấy chỗ ở phù hợp?
              </h2>
              <p className="text-stone-400 text-sm sm:text-base max-w-lg">
                Cho chúng tôi biết khu vực, ngân sách và nhu cầu của bạn để bắt đầu tìm kiếm.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
              href="/tro-ly-ai"
            >
              Tìm phòng ngay <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white rounded-xl text-sm font-semibold transition-colors"
              href="/tro-ly-ai"
            >
              Hỏi trợ lý AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
