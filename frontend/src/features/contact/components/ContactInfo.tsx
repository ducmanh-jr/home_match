import React from "react";
import Link from "next/link";
import { MessageSquareText, ShieldCheck, Clock3, PhoneCall, Mail } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 block mb-2">
          Liên hệ HomeMatch
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Hãy cho chúng tôi biết bạn cần gì.
        </h1>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Chọn đúng chủ đề và mô tả cụ thể để yêu cầu được định tuyến phù hợp khi hệ thống hỗ trợ được kết nối.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200">
          <MessageSquareText size={22} className="text-orange-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-stone-900">Mô tả rõ vấn đề</strong>
            <small className="block text-xs text-stone-600 mt-0.5">Thêm URL tin đăng, thời điểm và kết quả bạn mong muốn.</small>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200">
          <ShieldCheck size={22} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-stone-900">Không gửi thông tin nhạy cảm</strong>
            <small className="block text-xs text-stone-600 mt-0.5">Không chia sẻ mật khẩu, mã OTP hoặc thông tin thanh toán.</small>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200">
          <Clock3 size={22} className="text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-stone-900">Thời gian phản hồi</strong>
            <small className="block text-xs text-stone-600 mt-0.5">HomeMatch phản hồi trong giờ làm việc; yêu cầu khẩn hãy dùng Trung tâm trợ giúp.</small>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <a
          href="tel:0967016979"
          className="flex items-center gap-3 p-4 rounded-xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <PhoneCall size={18} />
          </div>
          <div>
            <strong className="block text-sm font-bold text-stone-900">0967 016 979</strong>
            <small className="text-xs text-stone-500">Gọi hoặc nhắn Zalo</small>
          </div>
        </a>

        <a
          href="mailto:hotro@homematch.vn"
          className="flex items-center gap-3 p-4 rounded-xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <strong className="block text-sm font-bold text-stone-900">hotro@homematch.vn</strong>
            <small className="text-xs text-stone-500">Gửi email cho chúng tôi</small>
          </div>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-stone-200 text-xs font-medium text-stone-600">
        <Link href="/tro-ly-ai" className="hover:text-orange-600 transition-colors">Tìm trong Trung tâm trợ giúp</Link>
        <Link href="/cam-nang/an-toan-chay-no" className="hover:text-orange-600 transition-colors">Xem hướng dẫn an toàn</Link>
        <Link href="/privacy" className="hover:text-orange-600 transition-colors">Đọc Chính sách bảo mật</Link>
      </div>
    </div>
  );
}
