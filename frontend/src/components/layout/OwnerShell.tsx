"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building2, ChevronDown, ChevronRight, ExternalLink, House, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/features/auth/context";
import { ManagementState } from "@/components/management/ManagementUI";
import { getOwnerModule, ownerGroups, ownerModuleHref, ownerModules } from "./owner-navigation";
import sharedStyles from "@/styles/landing.module.css";
import styles from "@/styles/owner-management.module.css";

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
    try { setCollapsed(localStorage.getItem("homematch_owner_sidebar") === "collapsed"); } catch {}
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
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [accountOpen]);

  useEffect(() => {
    const dialog = mobileDialog.current;
    if (!mobileOpen || !dialog) return;
    dialog.showModal();
    const media = window.matchMedia("(min-width: 900px)");
    function closeOnDesktop() { if (media.matches) setMobileOpen(false); }
    media.addEventListener("change", closeOnDesktop);
    return () => { media.removeEventListener("change", closeOnDesktop); dialog.close(); menuButton.current?.focus(); };
  }, [mobileOpen]);

  function toggleSidebar() {
    setCollapsed(previous => {
      const next = !previous;
      try { localStorage.setItem("homematch_owner_sidebar", next ? "collapsed" : "expanded"); } catch {}
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
      <>
        <div className={styles.sidebarBrand}>
          <Link href="/owner/v2" className={styles.brand} aria-label="HomeMatch — Quản trị chủ nhà"><House size={27} strokeWidth={2.5} /><span>Home<span>Match</span></span></Link>
          {mobile ? <button type="button" className={styles.iconButton} aria-label="Đóng menu" onClick={() => setMobileOpen(false)}><X size={20} /></button> : <button type="button" className={styles.collapseButton} aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"} title={collapsed ? "Mở rộng menu" : "Thu gọn menu"} onClick={toggleSidebar}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>}
        </div>
        <nav aria-label={mobile ? "Menu quản trị trên điện thoại" : "Khu quản trị chủ nhà"} className={styles.navigation}>
          {ownerGroups.map(group => {
            const closed = !(collapsed && !mobile) && closedGroups.includes(group);
            const groupId = `${mobile ? "mobile" : "desktop"}-owner-group-${ownerGroups.indexOf(group)}`;
            return <section className={styles.navGroup} key={group}>
              <button type="button" className={styles.groupHeading} aria-expanded={!closed} aria-controls={groupId} onClick={() => { if (collapsed && !mobile) { toggleSidebar(); return; } setClosedGroups(previous => previous.includes(group) ? previous.filter(item => item !== group) : [...previous, group]); }}><span>{group}</span><ChevronRight size={13} className={!closed ? styles.groupExpanded : ""} /></button>
              <div id={groupId} hidden={closed}>
                {ownerModules.filter(module => module.group === group).map(module => {
                  const selected = !isUiKit && module.id === activeModule.id;
                  return <Link key={module.id} href={ownerModuleHref(module.id)} className={styles.navLink} aria-current={selected ? "page" : undefined} title={collapsed && !mobile ? module.label : undefined} onClick={() => setMobileOpen(false)}><module.icon size={18} aria-hidden="true" /><span>{module.label}</span></Link>;
                })}
              </div>
            </section>;
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/tro-ly-ai" title="Xem website người thuê"><ExternalLink size={17} /><span>Xem website người thuê</span></Link>
          <button type="button" onClick={signOut} title="Đăng xuất"><LogOut size={17} /><span>Đăng xuất</span></button>
        </div>
      </>
    );
  }

  if (isLoading) return <div className={`${sharedStyles.siteShell} ${styles.authGate}`}><ManagementState state="loading" title="Đang mở khu vực chủ nhà…" /></div>;
  if (!user || user.role !== "owner") return (
    <div className={`${sharedStyles.siteShell} ${styles.authGate}`}>
      <Link href="/" className={styles.brand}><House size={30} /><span>Home<span>Match</span></span></Link>
      <div className={styles.gateCard}>
        <span className={styles.gateIcon}><Building2 size={30} /></span>
        <h1>{user ? "Chuyển sang khu vực chủ nhà" : "Chào mừng chủ nhà"}</h1>
        <p>{user ? "Bạn đang dùng vai trò người thuê. Chuyển vai trò để xem khu quản trị mẫu." : "Đăng nhập để quản lý căn phòng, tin đăng và hoạt động cho thuê của bạn."}</p>
        {user ? <button type="button" className={styles.primaryButton} onClick={() => switchRole("owner")}>Chuyển sang chủ nhà</button> : <Link href={loginHref} className={styles.primaryButton}>Đăng nhập chủ nhà</Link>}
        <Link href="/" className={styles.gateBack}>Về trang chủ</Link>
      </div>
    </div>
  );

  return (
    <div className={`${sharedStyles.siteShell} ${styles.shell} ${collapsed ? styles.collapsed : ""}`}>
      <a className={styles.skipLink} href="#owner-main">Chuyển đến nội dung</a>
      <aside className={styles.sidebar}>{navigation()}</aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}><Building2 size={16} /><span>Khu vực chủ nhà</span><ChevronRight size={13} /><strong>{isUiKit ? "Mẫu giao diện" : activeModule.label}</strong></div>
          <div className={styles.account} ref={account}>
            <button type="button" className={styles.accountButton} aria-expanded={accountOpen} aria-controls="owner-account-menu" onClick={() => setAccountOpen(open => !open)}><span className={styles.avatar}>{user.fullName.trim().charAt(0)}</span><span className={styles.accountText}><strong>{user.fullName}</strong><small>Chủ nhà</small></span><ChevronDown size={14} /></button>
            {accountOpen && <div id="owner-account-menu" className={styles.accountMenu}><strong>{user.fullName}</strong><small>{user.email}</small><Link href={ownerModuleHref("cai-dat")}><Settings size={16} /> Cài đặt tài khoản</Link><Link href="/"><ExternalLink size={16} /> Xem trang chủ</Link><button type="button" onClick={signOut}><LogOut size={16} /> Đăng xuất</button></div>}
          </div>
        </header>
        <main id="owner-main" className={styles.main} tabIndex={-1} key={`${pathname}?${searchParams.get("m") ?? ""}`}>{children}</main>
      </div>
      <nav className={styles.mobileTabs} aria-label="Điều hướng nhanh">
        {(["tong-quan", "can-ho-phong", "tin-bat-dong-san", "thu-tien"] as const).map(id => { const module = getOwnerModule(id); return <Link key={id} href={ownerModuleHref(id)} aria-current={!isUiKit && activeModule.id === id ? "page" : undefined}><module.icon size={20} /><span>{module.shortLabel}</span></Link>; })}
        <button type="button" ref={menuButton} onClick={() => setMobileOpen(true)} aria-current={!isUiKit && !["tong-quan", "can-ho-phong", "tin-bat-dong-san", "thu-tien"].includes(activeModule.id) ? "page" : undefined} aria-haspopup="dialog" aria-controls="owner-mobile-menu" aria-expanded={mobileOpen}><Menu size={21} /><span>Thêm</span></button>
      </nav>
      <dialog id="owner-mobile-menu" ref={mobileDialog} className={styles.mobileDialog} aria-label="Tất cả mục quản trị" onCancel={event => { event.preventDefault(); setMobileOpen(false); }} onClick={event => { if (event.target === event.currentTarget) setMobileOpen(false); }}><div className={styles.mobileMenu}>{navigation(true)}</div></dialog>
    </div>
  );
}
