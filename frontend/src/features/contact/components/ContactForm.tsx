"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock client-side submission delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {submitted && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <span>
              Yêu cầu đã được gửi thành công! HomeMatch sẽ liên hệ phản hồi sớm nhất.
            </span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
            Họ và tên <span className="text-rose-500">*</span>
          </label>
          <input
            required
            placeholder="Tên của bạn"
            name="ten"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              required
              type="email"
              placeholder="ban@example.com"
              name="email"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
              Số điện thoại
            </label>
            <input
              inputMode="tel"
              placeholder="0901 234 567"
              name="sdt"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
            Chủ đề
          </label>
          <select
            name="chu_de"
            defaultValue="general"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
          >
            <option value="general">Câu hỏi chung</option>
            <option value="renter">Hỗ trợ tìm phòng</option>
            <option value="owner">Hỗ trợ chủ nhà</option>
            <option value="report">Báo cáo tin đăng</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
            URL liên quan
          </label>
          <input
            type="url"
            placeholder="https://..."
            name="url_lien_quan"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
            Nội dung <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="noi_dung"
            required
            rows={5}
            placeholder="Mô tả điều bạn cần hỗ trợ, thời điểm và kết quả mong muốn"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors resize-y"
          />
        </div>

        <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer pt-1">
          <input type="checkbox" required className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500" />
          <span>Tôi xác nhận không gửi mật khẩu, OTP hoặc dữ liệu thanh toán.</span>
        </label>

        <div>
          <Button
            variant="orange"
            type="submit"
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            <Send size={16} /> Gửi yêu cầu
          </Button>
        </div>

        <small className="block text-xs text-stone-400 mt-2">
          HomeMatch phản hồi trong giờ làm việc. Thông tin của bạn chỉ dùng để hỗ trợ yêu cầu này.
        </small>
      </form>
    </div>
  );
}
