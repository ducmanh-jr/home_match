"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, House, ShieldCheck, HelpCircle } from "lucide-react";
import { RoleTabs } from "./RoleTabs";
import { QuickLoginDemo } from "./QuickLoginDemo";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { useAuth } from "../context";
import type { UserRole } from "../types";

export function LoginForm() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [role, setRole] = useState<UserRole>("renter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const authUser = await login({ email, password, role });
      setSuccessMsg(`Đăng nhập thành công! Chào mừng ${authUser.fullName} (${role === "renter" ? "Người thuê" : "Chủ nhà"}).`);
      
      setTimeout(() => {
        router.push(role === "renter" ? "/" : "/diagnostics");
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setSuccessMsg(null);
    setGoogleLoading(true);

    try {
      const authUser = await loginWithGoogle(role);
      setSuccessMsg(`Đăng nhập Google thành công với vai trò ${role === "renter" ? "Người thuê" : "Chủ nhà"}!`);
      
      setTimeout(() => {
        router.push(role === "renter" ? "/" : "/diagnostics");
      }, 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đăng nhập Google thất bại.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand logo */}
      <div className="mb-7">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 group"
          aria-label="HomeMatch — Về trang chủ"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:bg-orange-600 transition-colors">
            <House size={22} strokeWidth={2.4} />
          </div>
          <span>
            Home<span className="text-orange-500">Match</span>
          </span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Đăng nhập HomeMatch
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Trợ lý sẽ nhớ khu vực, ngân sách và số phòng bạn đã nói.
        </p>
      </div>

      {/* Quick Demo 1-Click Login for Testers */}
      <QuickLoginDemo />

      {/* Role Selection Tabs */}
      <RoleTabs selectedRole={role} onChange={setRole} />

      {/* Google Social Login */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50/80 transition-all text-left group shadow-xs disabled:opacity-60 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shadow-xs shrink-0">
              {googleLoading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                Tiếp tục với Google
              </div>
              <div className="text-xs text-slate-500">
                Nhanh nhất — và Trợ lý sẽ nhớ nhu cầu cho lần sau
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-xs uppercase font-medium text-slate-400 tracking-wider absolute">
          hoặc dùng email
        </span>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div className="p-3.5 mb-4 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 mb-4 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl">
          {successMsg}
        </div>
      )}

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="auth-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nguoithue@homematch.vn"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Mật khẩu <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              name="password"
              maxLength={72}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-3.5 pr-11 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              aria-pressed={showPassword}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Security badge & Help */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
          <span className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck size={14} className="text-emerald-600" />
            Bảo mật bởi HomeMatch Identity
          </span>
          <Link href="/diagnostics" className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors">
            <HelpCircle size={13} />
            <span>Cần trợ giúp?</span>
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <LockKeyhole size={17} />
                <span>Đăng nhập</span>
              </>
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-500 text-center leading-relaxed px-2 pt-1">
          Khi tiếp tục (kể cả bằng Google), bạn đồng ý với{" "}
          <Link href="/terms" className="text-slate-700 underline hover:text-orange-600">
            Điều khoản sử dụng
          </Link>{" "}
          và{" "}
          <Link href="/privacy" className="text-slate-700 underline hover:text-orange-600">
            Chính sách bảo mật
          </Link>{" "}
          của HomeMatch.
        </p>

        {/* Register Action */}
        <div className="pt-2">
          <Link
            href="/auth/register"
            className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            Chưa có tài khoản? Đăng ký
          </Link>
        </div>
      </form>

      {/* Forgot Password Trigger */}
      <div className="text-center mt-5">
        <button
          type="button"
          onClick={() => setForgotModalOpen(true)}
          className="text-xs font-medium text-slate-500 hover:text-orange-600 transition-colors cursor-pointer"
        >
          Quên mật khẩu?
        </button>
      </div>

      {/* Safety Notice */}
      <div className="mt-8 pt-5 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          HomeMatch không bao giờ hỏi mật khẩu qua điện thoại hay tin nhắn.
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        defaultEmail={email}
      />
    </div>
  );
}
