import Link from "next/link";
import { ArrowLeft, ShieldCheck, House } from "lucide-react";

export const metadata = {
  title: "Điều khoản sử dụng | HomeMatch",
  description: "Quy định và điều khoản sử dụng nền tảng tìm kiếm và quản lý thuê nhà HomeMatch.",
};

export default function TermsPage() {
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

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
          <ShieldCheck size={16} /> Quy chế dịch vụ
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
          Điều khoản sử dụng HomeMatch
        </h1>

        <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-slate-600">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Giới thiệu nền tảng</h2>
            <p>
              HomeMatch là nền tảng công nghệ hỗ trợ tìm kiếm phòng trọ, căn hộ và kết nối trực tiếp giữa người thuê và chủ nhà có tin đăng đã qua kiểm duyệt.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Tài khoản và Bảo mật</h2>
            <p>
              Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập của mình. HomeMatch cam kết không bao giờ yêu cầu người dùng cung cấp mật khẩu qua điện thoại, email hay tin nhắn mạng xã hội.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Cam kết về Tin đăng & Giá thuê</h2>
            <p>
              Mọi tin đăng trên hệ thống được xác thực về hình ảnh và giá cả minh bạch (bao gồm giá phòng, tiền cọc, chi phí điện nước và dịch vụ đi kèm) trước khi cho phép người thuê đặt lịch xem phòng.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Trợ lý AI và Quyền riêng tư</h2>
            <p>
              Trợ lý AI HomeMatch chỉ thu thập các thông tin về nhu cầu tìm nhà (khu vực, ngân sách, số phòng, tiện ích) nhằm đưa ra gợi ý phù hợp nhất và cải thiện chất lượng dịch vụ.
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

