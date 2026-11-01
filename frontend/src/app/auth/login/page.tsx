import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column: Login Form */}
      <section className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:px-20 overflow-y-auto">
        <Suspense fallback={<p className="text-sm text-slate-500" role="status">Đang mở đăng nhập…</p>}><LoginForm /></Suspense>
      </section>

      {/* Right Column: Visual Brand Hero (Hidden on Mobile) */}
      <aside
        className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-end p-12 xl:p-16 text-white overflow-hidden bg-slate-900 select-none"
        aria-hidden="true"
      >
        {/* Background Image */}
        <Image
          src="/images/landing/living-room.jpg"
          alt="Không gian phòng khách HomeMatch"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0vw"
          className="object-cover object-center opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-orange-950/20 mix-blend-color" />

        {/* Brand Slogan Content */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-xs">
            Trải nghiệm tìm nhà mới
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Thuê đúng nơi — <br />
            <span className="text-orange-400">Sống đúng ý.</span>
          </h2>

          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            HomeMatch mang đến giải pháp tìm kiếm phòng trọ và căn hộ thông minh với trợ lý AI, thông tin giá minh bạch và quy trình đặt lịch trực tiếp.
          </p>
        </div>
      </aside>
    </main>
  );
}

