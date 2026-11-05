import Link from "next/link";
import { ArrowLeft, Lock, House } from "lucide-react";

export const metadata = {
  title: "Chính sách bảo mật | HomeMatch",
  description: "Chính sách bảo mật thông tin người dùng và dữ liệu thuê nhà trên HomeMatch.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-extrabold text-slate-900"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              <House size={18} />
            </div>
            <span>Home<span className="text-orange-500">Match</span></span>
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={14} /> Quay lại Đăng nhập
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
          <Lock size={16} /> Bảo mật thông tin
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
          Chính sách bảo mật HomeMatch
        </h1>

        <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-slate-600">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Dữ liệu chúng tôi thu thập</h2>
            <p>
              Khi bạn sử dụng ứng dụng HomeMatch (kể cả đăng nhập bằng Google hoặc email), chúng tôi lưu trữ thông tin cơ bản gồm: Tên hiển thị, Email và vai trò tài khoản (Người thuê hoặc Chủ nhà).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Mục đích sử dụng dữ liệu</h2>
            <p>
              Dữ liệu được dùng để ghi nhớ lịch sử tìm kiếm, gợi ý các phòng trọ phù hợp nhất thông qua Trợ lý AI, và tạo điều kiện liên hệ khi bạn chủ động đặt lịch xem phòng với chủ nhà.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Cam kết không chia sẻ cho bên thứ ba</h2>
            <p>
              HomeMatch không bán hoặc chia sẻ dữ liệu cá nhân hay số điện thoại của bạn cho các đơn vị tiếp thị bên ngoài.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
          <span>Cập nhật lần cuối: Tháng 10/2026</span>
          <Link href="/" className="hover:text-slate-700 underline">Về trang chủ HomeMatch</Link>
        </div>
      </div>
    </div>
  );
}

