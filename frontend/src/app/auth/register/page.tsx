"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { House, Eye, EyeOff, UserPlus, Sparkles } from "lucide-react";
import { RoleTabs } from "@/features/auth/components/RoleTabs";
import { useAuth } from "@/features/auth/context";
import type { UserRole } from "@/features/auth/types";

export default function RegisterPage() {
  const router = useRouter();
  const { quickLogin } = useAuth();
  const [role, setRole] = useState<UserRole>("renter");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError("Vui lòng điền đầy đủ các trường thông tin.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có độ dài tối thiểu 6 ký tự.");
      return;
    }

    setLoading(true);
    try {
      // Simulate quick registration on client
      await quickLogin(role);
      setSuccess("Đăng ký tài khoản thành công! Đang chuyển hướng...");
      setTimeout(() => {
        router.push(role === "renter" ? "/" : "/diagnostics");
      }, 1000);
    } catch {
      setError("Có lỗi xảy ra trong quá trình đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRegister = async (selectedRole: UserRole) => {
    setLoading(true);
    try {
      await quickLogin(selectedRole);
      setSuccess(`Đăng ký thử nghiệm thành công với vai trò ${selectedRole === "renter" ? "Người thuê" : "Chủ nhà"}!`);
      setTimeout(() => {
        router.push(selectedRole === "renter" ? "/" : "/diagnostics");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column: Form */}
      <section className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:px-20 overflow-y-auto">
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

          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Tạo tài khoản mới
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Trở thành thành viên để lưu tin đăng, nhận gợi ý từ Trợ lý AI và đặt lịch xem phòng nhanh.
            </p>
          </div>

          {/* Quick Demo 1-Click for Testers */}
          <div className="mb-6 p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-900 mb-2">
              <Sparkles size={14} className="text-orange-600" />
              <span>Dành cho Tester (Tạo tài khoản nhanh 1-Click):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickRegister("renter")}
                disabled={loading}
                className="py-2 px-3 bg-white border border-orange-200 hover:border-orange-400 font-semibold text-slate-800 rounded-xl transition-all cursor-pointer text-center"
              >
                👤 Tạo Người thuê
              </button>
              <button
                type="button"
                onClick={() => handleQuickRegister("owner")}
                disabled={loading}
                className="py-2 px-3 bg-white border border-orange-200 hover:border-orange-400 font-semibold text-slate-800 rounded-xl transition-all cursor-pointer text-center"
              >
                🏢 Tạo Chủ nhà
              </button>
            </div>
          </div>

          {/* Role Tabs */}
          <RoleTabs selectedRole={role} onChange={setRole} />

          {error && (
            <div className="p-3.5 mb-4 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3.5 mb-4 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mật khẩu (tối thiểu 6 ký tự) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <Link href="/terms" className="text-slate-700 underline hover:text-orange-600">
                Điều khoản
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="text-slate-700 underline hover:text-orange-600">
                Chính sách bảo mật
              </Link>{" "}
              của HomeMatch.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer"
            >
              <UserPlus size={18} />
              <span>Đăng ký tài khoản</span>
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/auth/login"
                className="text-xs font-medium text-slate-600 hover:text-orange-600 transition-colors"
              >
                Đã có tài khoản? <span className="font-bold underline">Đăng nhập ngay</span>
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Right Column: Visual Brand Hero */}
      <aside
        className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-end p-12 xl:p-16 text-white overflow-hidden bg-slate-900 select-none"
        aria-hidden="true"
      >
        <Image
          src="/images/landing/living-room.jpg"
          alt="Không gian phòng khách HomeMatch"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0vw"
          className="object-cover object-center opacity-45 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-5">
            Gia nhập cộng đồng HomeMatch
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Thuê đúng nơi — <br />
            <span className="text-orange-400">Sống đúng ý.</span>
          </h2>
          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Hàng nghìn chỗ ở đã kiểm duyệt thông tin đang chờ bạn. Đăng ký tài khoản chỉ mất chưa đầy 30 giây.
          </p>
        </div>
      </aside>
    </main>
  );
}

