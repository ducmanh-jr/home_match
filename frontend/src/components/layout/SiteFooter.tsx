import Link from "next/link";
import { CircleCheck, Clock3, House, ShieldCheck } from "lucide-react";
import { siteLink } from "@/lib/config";

const columns = [
  {
    title: "Tìm chỗ ở",
    links: [
      ["Tìm phòng với trợ lý AI", "/tro-ly-ai"],
      ["Phòng trọ", "/tro-ly-ai?q=Tìm phòng trọ"],
      ["Studio", "/tro-ly-ai?q=Tìm studio"],
      ["Căn hộ", "/tro-ly-ai?q=Tìm căn hộ"],
      ["Gần trường đại học", "/tro-ly-ai?q=Tìm phòng gần trường đại học"],
      ["Gần nơi làm việc", "/tro-ly-ai?q=Tìm phòng gần nơi làm việc"],
    ],
  },
  {
    title: "Khám phá",
    links: [
      ["Khu vực người thuê", "/renter/dashboard"],
      ["Cẩm nang thuê trọ", "/cam-nang"],
      ["Về HomeMatch", "/about"],
      ["Câu hỏi thường gặp", "/faq"],
    ],
  },
  {
    title: "Dành cho chủ nhà",
    links: [
      ["Chương trình hợp tác", "/hop-tac"],
      ["Đăng tin cho thuê", "/auth/login"],
      ["Đăng nhập chủ nhà", "/auth/login"],
      ["Quản lý bất động sản", "/diagnostics"],
      ["Quản lý khách quan tâm", "/diagnostics"],
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      ["Trung tâm trợ giúp", "/help"],
      ["An toàn khi thuê", "/safety"],
      ["Báo cáo tin đăng", "/contact?topic=report"],
      ["Liên hệ", "/contact"],
    ],
  },
];

export function SiteFooter() {
  return (
    <>
      <section className="bg-stone-100 border-t border-b border-stone-200 py-8" aria-label="Cam kết dịch vụ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <ShieldCheck size={26} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="block text-sm font-bold text-stone-900">Tin đăng được kiểm duyệt</strong>
              <small className="block text-xs text-stone-600 mt-0.5">Nội dung rõ ràng trước khi hiển thị</small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <CircleCheck size={26} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="block text-sm font-bold text-stone-900">Chi phí được trình bày rõ</strong>
              <small className="block text-xs text-stone-600 mt-0.5">Dễ so sánh trước khi đi xem</small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Clock3 size={26} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="block text-sm font-bold text-stone-900">Hỗ trợ đặt lịch xem</strong>
              <small className="block text-xs text-stone-600 mt-0.5">Chọn thời gian phù hợp với bạn</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 text-sm" id="help">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-white font-extrabold text-xl tracking-tight mb-4" aria-label="HomeMatch — Trang chủ">
              <House size={26} strokeWidth={2.5} className="text-orange-500" aria-hidden="true" />
              <span>Home<span className="text-orange-500">Match</span></span>
            </Link>
            <p className="font-semibold text-white mb-2">Thuê đúng nơi — Sống đúng ý.</p>
            <span className="text-stone-400 text-xs leading-relaxed block max-w-sm">
              Nền tảng tìm kiếm chỗ ở và đặt lịch xem dành cho người thuê tại Việt Nam.
            </span>
          </div>

          {columns.map((column) => (
            <div className="space-y-3" key={column.title}>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">{column.title}</h3>
              <ul className="space-y-2 text-xs">
                {column.links.map(([label, path]) => (
                  <li key={label}>
                    <Link href={siteLink(path)} className="text-stone-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} HomeMatch. Bảo lưu mọi quyền.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Điều khoản sử dụng</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Quy chế hoạt động</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
