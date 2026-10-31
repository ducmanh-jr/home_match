"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Menu, PencilLine, Search, Sparkles, X, LogOut, RefreshCw, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { referenceLink, siteLink } from "@/lib/config";
import { useAuth } from "@/features/auth/context";
import styles from "@/styles/landing.module.css";

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
    <header className={styles.siteHeader} ref={header}>
      <a href="#main-content" className={styles.skipLink}>Bỏ qua điều hướng</a>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <button
          ref={menuButton}
          className={`${styles.iconButton} ${styles.mobileOnly}`}
          type="button"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link href="/" className={styles.brand} aria-label="HomeMatch — Trang chủ">
          <House size={28} strokeWidth={2.5} aria-hidden="true" />
          <span>Home<span>Match</span></span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <Link
              href={siteLink(item.path)}
              key={item.label}
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {item.ai && <Sparkles size={14} aria-hidden="true" />}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth status on Desktop */}
        {isAuthenticated && user ? (
          <div className="relative hidden md:block" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-sm"
              aria-expanded={userMenuOpen}
            >
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                {user.fullName.charAt(0)}
              </div>
              <span className="font-semibold text-slate-800 text-xs">
                {user.fullName}
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-orange-100 text-orange-800 font-bold uppercase">
                {user.role === "renter" ? "Người thuê" : "Chủ nhà"}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{user.fullName}</div>
                  <div className="text-slate-400 truncate">{user.email}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    switchRole(user.role === "renter" ? "owner" : "renter");
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <RefreshCw size={14} className="text-orange-500" />
                  <span>
                    Đổi sang vai trò{" "}
                    <b>{user.role === "renter" ? "Chủ nhà" : "Người thuê"}</b>
                  </span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
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
              className="text-xs font-semibold text-slate-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              className={`${styles.button} ${styles.primaryButton} ${styles.postListing}`}
              href="/auth/login"
            >
              <PencilLine size={17} aria-hidden="true" /> Đăng tin
            </Link>
          </div>
        )}

        <Link
          className={`${styles.iconButton} ${styles.mobileOnly}`}
          href={"/tro-ly-ai?tim_nhanh=1" as any}
          aria-label="Tìm nhà nhanh"
        >
          <Search size={21} />
        </Link>
      </div>
      <nav
        id="mobile-navigation"
        className={styles.mobileNav}
        aria-label="Điều hướng di động"
        hidden={!menuOpen}
      >
        <div className={styles.container}>
          {/* Mobile auth summary */}
          {isAuthenticated && user ? (
            <div className="p-3.5 bg-slate-100/80 border border-slate-200 rounded-xl mb-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">{user.fullName}</div>
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
            <div className="pb-3 mb-3 border-b border-slate-200 flex items-center gap-2">
              <Link
                href="/auth/login"
                className="w-full py-2 text-center text-sm font-semibold bg-orange-500 text-white rounded-xl"
                onClick={() => setMenuOpen(false)}
              >
                Đăng nhập HomeMatch
              </Link>
            </div>
          )}

          {navigation.map((item) => (
            <Link
              href={siteLink(item.path)}
              key={item.label}
              aria-current={pathname === item.path ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.ai && <Sparkles size={16} aria-hidden="true" />}
              {item.label}
            </Link>
          ))}
          <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
            <PencilLine size={16} aria-hidden="true" /> Đăng tin cho thuê
          </Link>
        </div>
      </nav>
    </header>
  );
}
