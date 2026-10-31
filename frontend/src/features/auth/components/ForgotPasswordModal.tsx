"use client";

import { useState } from "react";
import { X, Mail, CheckCircle2, ArrowRight } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export function ForgotPasswordModal({ isOpen, onClose, defaultEmail = "" }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Vui lòng nhập địa chỉ email của bạn.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate mock reset password request
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSubmitted(true);
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="mx-auto w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={30} />
            </div>
            <h3 id="forgot-password-title" className="text-xl font-bold text-slate-900 mb-2">
              Đã gửi liên kết khôi phục
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu tới địa chỉ <span className="font-semibold text-slate-900">{email}</span>. Vui lòng kiểm tra hộp thư (bao gồm cả thư rác).
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              Đã hiểu & Quay lại
            </button>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 id="forgot-password-title" className="text-xl font-bold text-slate-900 mb-1.5">
              Quên mật khẩu?
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Nhập địa chỉ email đăng ký tài khoản của bạn. HomeMatch sẽ gửi liên kết đặt lại mật khẩu an toàn.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Gửi liên kết khôi phục</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Hủy và quay lại
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

