"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { House, Menu, PencilLine, Search, Sparkles, X, LogOut, RefreshCw, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteLink } from "@/lib/config";
import { useAuth } from "@/features/auth/context";
import { getRoleHome } from "@/features/auth/navigation";

const navigation = [
  { label: "Trợ lý AI", path: "/tro-ly-ai", ai: true },
  { label: "Cẩm nang", path: "/cam-nang" },
  { label: "Tìm nhà nhanh", path: "/tro-ly-ai?tim_nhanh=1" },
  { label: "Thiết kế home", path: "/thiet-ke-home" },
  { label: "Trở thành partner", path: "/hop-tac" },
  { label: "Liên hệ", path: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    const desktop = window.matchMedia("(min-width: 1280px)");
    function closeOnDesktop() {
      if (desktop.matches) setMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 transition-shadow" ref={header}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded-md">
        Bỏ qua điều hướng
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button
          ref={menuButton}
          className="xl:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          type="button"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex items-center gap-2 text-stone-900 font-extrabold text-xl tracking-tight hover:opacity-90 transition-opacity" aria-label="HomeMatch — Trang chủ">
          <House size={26} strokeWidth={2.5} className="text-orange-600" aria-hidden="true" />
          <span>Home<span className="text-orange-600">Match</span></span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1" aria-label="Điều hướng chính">
          {navigation.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={siteLink(item.path)}
                key={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "text-orange-600 font-bold bg-orange-50/80"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium"
                }`}
              >
                {item.ai && <Sparkles size={14} className="text-amber-500" aria-hidden="true" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth status on Desktop */}
        {isAuthenticated && user ? (
          <div className="relative hidden md:block" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer text-sm"
              aria-expanded={userMenuOpen}
            >
              <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                {user.fullName.charAt(0)}
              </div>
              <span className="font-semibold text-stone-800 text-xs">
                {user.fullName}
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-orange-100 text-orange-800 font-bold uppercase">
                {user.role === "renter" ? "Người thuê" : "Chủ nhà"}
              </span>
              <ChevronDown size={14} className="text-stone-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-stone-100">
                  <div className="font-bold text-stone-900">{user.fullName}</div>
                  <div className="text-stone-400 truncate">{user.email}</div>
                </div>

                {user.role === "owner" && (
                  <Link href="/owner/v2" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3.5 py-2.5 text-stone-700 hover:bg-stone-50 font-medium">
                    <House size={14} className="text-orange-500" />
                    Khu vực chủ nhà
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const nextRole = user.role === "renter" ? "owner" : "renter";
                    switchRole(nextRole);
                    setUserMenuOpen(false);
                    router.push(getRoleHome(nextRole));
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-stone-700 hover:bg-stone-50 transition-colors text-left cursor-pointer font-medium"
                >
                  <RefreshCw size={14} className="text-orange-500" />
                  <span>
                    Đổi sang vai trò{" "}
                    <b>{user.role === "renter" ? "Chủ nhà" : "Người thuê"}</b>
                  </span>
                </button>

                <div className="border-t border-stone-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer font-medium"
                >
                  <LogOut size={14} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-xs font-semibold text-stone-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
              href="/auth/login?role=owner&next=%2Fowner%2Fv2%3Fm%3Dtao-tin"
            >
              <PencilLine size={15} aria-hidden="true" /> Đăng tin
            </Link>
          </div>
        )}

        <Link
          className="xl:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          href={"/tro-ly-ai?tim_nhanh=1" as any}
          aria-label="Tìm nhà nhanh"
        >
          <Search size={20} />
        </Link>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="xl:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-1 shadow-lg"
          aria-label="Điều hướng di động"
        >
          {/* Mobile auth summary */}
          {isAuthenticated && user ? (
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl mb-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900 text-sm">{user.fullName}</div>
                <div className="text-xs text-orange-600 font-semibold uppercase">
                  {user.role === "renter" ? "Người thuê" : "Chủ nhà"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="pb-3 mb-3 border-b border-stone-200 flex items-center gap-2">
              <Link
                href="/auth/login"
                className="w-full py-2 text-center text-sm font-semibold bg-orange-600 text-white rounded-xl"
                onClick={() => setMenuOpen(false)}
              >
                Đăng nhập HomeMatch
              </Link>
            </div>
          )}

          {isAuthenticated && user?.role === "owner" && (
            <Link
              href="/owner/v2"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              <House size={16} aria-hidden="true" className="text-orange-600" /> Khu vực chủ nhà
            </Link>
          )}

          {navigation.map((item) => (
            <Link
              href={siteLink(item.path)}
              key={item.label}
              aria-current={pathname === item.path ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.path
                  ? "bg-orange-50 text-orange-600 font-bold"
                  : "text-stone-700 hover:bg-stone-50 font-medium"
              }`}
            >
              {item.ai && <Sparkles size={16} className="text-amber-500" aria-hidden="true" />}
              {item.label}
            </Link>
          ))}
          <Link
            href={isAuthenticated && user?.role === "owner" ? "/owner/v2?m=tao-tin" : "/auth/login?role=owner&next=%2Fowner%2Fv2%3Fm%3Dtao-tin"}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-orange-600 hover:bg-orange-50"
          >
            <PencilLine size={16} aria-hidden="true" /> Đăng tin cho thuê
          </Link>
        </nav>
      )}
    </header>
  );
}
