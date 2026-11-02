"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Bot,
  Building2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  House,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/features/auth/context";
import { Button, buttonClasses, Card, Skeleton } from "@/components/ui";
import { getOwnerModule, ownerGroups, ownerModuleHref, ownerModules } from "./owner-navigation";
import { cn } from "@/lib/utils";

export function OwnerShell({ children }: { children: ReactNode }) {
  const { user, isLoading, logout, switchRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeModule = getOwnerModule(searchParams.get("m"));
  const [collapsed, setCollapsed] = useState(false);
  const [closedGroups, setClosedGroups] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const account = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const isUiKit = pathname.endsWith("/ui-kit");

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("homematch_owner_sidebar") === "collapsed");
    } catch {}
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!accountOpen) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !account.current?.contains(event.target)) setAccountOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountOpen(false);
        account.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [accountOpen]);

  useEffect(() => {
    const dialog = mobileDialog.current;
    if (!mobileOpen || !dialog) return;
    dialog.showModal();
    const media = window.matchMedia("(min-width: 900px)");
    function closeOnDesktop() {
      if (media.matches) setMobileOpen(false);
    }
    media.addEventListener("change", closeOnDesktop);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      dialog.close();
      menuButton.current?.focus();
    };
  }, [mobileOpen]);

  function toggleSidebar() {
    setCollapsed(previous => {
      const next = !previous;
      try {
        localStorage.setItem("homematch_owner_sidebar", next ? "collapsed" : "expanded");
      } catch {}
      return next;
    });
  }

  function signOut() {
    setMobileOpen(false);
    logout();
    router.replace("/auth/login?role=owner");
  }

  const currentPath = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`;
  const loginHref = `/auth/login?role=owner&next=${encodeURIComponent(currentPath)}`;

  function navigation(mobile = false) {
    return (
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-3 border-b border-slate-100 shrink-0">
          <Link
            href="/owner/v2"
            className="flex items-center gap-2 font-bold text-slate-900 tracking-tight"
            aria-label="HubHome — Quản trị chủ nhà"
          >
            <span className="p-1.5 rounded-lg bg-orange-500 text-white">
              <House size={20} strokeWidth={2.5} />
            </span>
            {(!collapsed || mobile) && (
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 leading-none">
                  Hub<span className="text-orange-500">Home</span>
                </span>
                <span className="text-[9px] text-slate-400 font-normal leading-tight mt-0.5">
                  - AI Agent for Apartment Rentals -
                </span>
              </div>
            )}
          </Link>
          {mobile ? (
            <button
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Đóng menu"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
              title={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
              onClick={toggleSidebar}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <nav
          aria-label={mobile ? "Menu quản trị trên điện thoại" : "Khu quản trị chủ nhà"}
          className="flex-1 overflow-y-auto p-3 space-y-4"
        >
          {ownerGroups.map(group => {
            const closed = !(collapsed && !mobile) && closedGroups.includes(group);
            const groupId = `${mobile ? "mobile" : "desktop"}-owner-group-${ownerGroups.indexOf(group)}`;
            return (
              <section key={group} className="space-y-1">
                {(!collapsed || mobile) && (
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600"
                    aria-expanded={!closed}
                    aria-controls={groupId}
                    onClick={() => {
                      if (collapsed && !mobile) {
                        toggleSidebar();
                        return;
                      }
                      setClosedGroups(previous =>
                        previous.includes(group) ? previous.filter(item => item !== group) : [...previous, group],
                      );
                    }}
                  >
                    <span>{group}</span>
                    <ChevronRight size={13} className={cn("transition-transform duration-150", !closed && "rotate-90")} />
                  </button>
                )}
                <div id={groupId} hidden={closed} className="space-y-0.5">
                  {ownerModules
                    .filter(module => module.group === group)
                    .map(module => {
                      const selected = !isUiKit && module.id === activeModule.id;
                      return (
                        <Link
                          key={module.id}
                          href={ownerModuleHref(module.id)}
                          aria-current={selected ? "page" : undefined}
                          title={collapsed && !mobile ? module.label : undefined}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors",
                            selected
                              ? "bg-orange-500 text-white font-medium shadow-xs"
                              : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900",
                            collapsed && !mobile && "justify-center px-0",
                          )}
                        >
                          <module.icon
                            size={18}
                            className={cn("shrink-0", selected ? "text-white" : "text-slate-400")}
                            aria-hidden="true"
                          />
                          {(!collapsed || mobile) && <span className="truncate flex-1">{module.label}</span>}
                          {(!collapsed || mobile) && module.badge && (
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded font-normal shrink-0",
                                selected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400",
                              )}
                            >
                              {module.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                </div>
              </section>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-1">
          <Link
            href="/tro-ly-ai"
            title="Xem website người thuê"
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors",
              collapsed && !mobile && "justify-center px-0",
            )}
          >
            <ExternalLink size={16} className="shrink-0" />
            {(!collapsed || mobile) && <span>Website người thuê</span>}
          </Link>
          <button
            type="button"
            onClick={signOut}
            title="Đăng xuất"
            className={cn(
              "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors",
              collapsed && !mobile && "justify-center px-0",
            )}
          >
            <LogOut size={16} className="shrink-0" />
            {(!collapsed || mobile) && <span>Đăng xuất</span>}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center p-6">
        <Card className="p-8 max-w-sm w-full text-center space-y-3">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </Card>
      </div>
    );
  }

  if (!user || user.role !== "owner") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-xl">
            <span className="p-1.5 rounded-lg bg-orange-500 text-white">
              <House size={24} />
            </span>
            <span>Home<span className="text-orange-600">Match</span></span>
          </Link>
        </div>
        <Card className="p-8 max-w-md w-full text-center space-y-4 shadow-md">
          <span className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Building2 size={26} />
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {user ? "Chuyển sang khu vực chủ nhà" : "Chào mừng chủ nhà"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {user
                ? "Bạn đang dùng vai trò người thuê. Chuyển vai trò để xem khu quản trị mẫu."
                : "Đăng nhập để quản lý căn phòng, tin đăng và hoạt động cho thuê của bạn."}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <Button variant="orange" size="md" className="w-full" onClick={() => switchRole("owner")}>
                Chuyển sang chủ nhà
              </Button>
            ) : (
              <Link
                href={loginHref}
                className={buttonClasses({ variant: "orange", size: "md", className: "w-full" })}
              >
                Đăng nhập chủ nhà
              </Link>
            )}
            <Link
              href="/"
              className={buttonClasses({ variant: "ghost", size: "sm", className: "w-full text-slate-500" })}
            >
              Về trang chủ
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-slate-50 text-slate-900",
        "grid grid-cols-1 md:grid-cols-[264px_minmax(0,1fr)] transition-all duration-200",
        collapsed && "md:grid-cols-[68px_minmax(0,1fr)]",
      )}
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-3 focus:bg-orange-500 focus:text-white focus:rounded-lg"
        href="#owner-main"
      >
        Chuyển đến nội dung
      </a>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 bg-white border-r border-slate-200/80 z-20">
        {navigation(false)}
      </aside>

      {/* Workspace Area */}
      <div className="flex flex-col min-h-screen min-w-0">
        {/* Topbar */}
        <header className="h-16 px-6 bg-white border-b border-slate-200/80 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
            <Building2 size={15} className="text-slate-400 shrink-0" />
            <span className="hidden sm:inline">Khu vực chủ nhà</span>
            <ChevronRight size={13} className="text-slate-300 shrink-0" />
            <strong className="text-slate-800 font-semibold truncate">
              {isUiKit ? "Mẫu giao diện" : activeModule.label}
            </strong>
          </div>

          {/* Account Profile Menu */}
          <div className="relative" ref={account}>
            <button
              type="button"
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-expanded={accountOpen}
              aria-controls="owner-account-menu"
              onClick={() => setAccountOpen(open => !open)}
            >
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center shrink-0">
                {user.fullName.trim().charAt(0)}
              </span>
              <div className="hidden sm:flex flex-col text-left">
                <strong className="text-xs font-semibold text-slate-800 leading-tight">{user.fullName}</strong>
                <small className="text-[11px] text-slate-400">Chủ nhà</small>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {accountOpen && (
              <div
                id="owner-account-menu"
                className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-white border border-slate-200 shadow-lg text-xs space-y-1 z-50 animate-in fade-in-50 zoom-in-95 duration-100"
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <strong className="font-semibold text-slate-900 block truncate">{user.fullName}</strong>
                  <small className="text-slate-400 block truncate">{user.email}</small>
                </div>
                <Link
                  href={ownerModuleHref("cai-dat")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Settings size={15} /> Cài đặt tài khoản
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink size={15} /> Xem trang chủ
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={15} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main id="owner-main" className="flex-1 pb-20 md:pb-6" tabIndex={-1} key={`${pathname}?${searchParams.get("m") ?? ""}`}>
          {children}
        </main>

        {/* Floating Trợ lý AI button matching HubHome mockup */}
        <Link
          href="/tro-ly-ai"
          className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-lg border border-slate-200 text-xs font-semibold text-slate-800 hover:shadow-xl hover:border-orange-300 transition-all no-print group"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Bot size={16} />
          </div>
          <span>Trợ lý AI</span>
        </Link>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 grid grid-cols-5 items-center z-30 px-1"
        aria-label="Điều hướng nhanh"
      >
        {(["tong-quan", "can-ho-phong", "tin-bat-dong-san", "thu-tien"] as const).map(id => {
          const module = getOwnerModule(id);
          const selected = !isUiKit && activeModule.id === id;
          return (
            <Link
              key={id}
              href={ownerModuleHref(id)}
              aria-current={selected ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                selected ? "text-orange-600" : "text-slate-400 hover:text-slate-700",
              )}
            >
              <module.icon size={19} />
              <span className="truncate max-w-[60px]">{module.shortLabel}</span>
            </Link>
          );
        })}
        <button
          type="button"
          ref={menuButton}
          onClick={() => setMobileOpen(true)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
            !isUiKit && !["tong-quan", "can-ho-phong", "tin-bat-dong-san", "thu-tien"].includes(activeModule.id)
              ? "text-orange-600"
              : "text-slate-400 hover:text-slate-700",
          )}
          aria-haspopup="dialog"
          aria-controls="owner-mobile-menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={20} />
          <span>Thêm</span>
        </button>
      </nav>

      {/* Mobile Drawer Dialog */}
      <dialog
        id="owner-mobile-menu"
        ref={mobileDialog}
        className="backdrop:bg-slate-900/40 p-0 m-0 w-72 h-full max-h-screen bg-white shadow-2xl fixed inset-y-0 left-0 z-50 overflow-hidden outline-none"
        aria-label="Tất cả mục quản trị"
        onCancel={event => {
          event.preventDefault();
          setMobileOpen(false);
        }}
        onClick={event => {
          if (event.target === event.currentTarget) setMobileOpen(false);
        }}
      >
        <div className="h-full">{navigation(true)}</div>
      </dialog>
    </div>
  );
}
