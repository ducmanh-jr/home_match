"use client";

import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, DoorOpen, FilePlus2, House, UsersRound, WalletCards } from "lucide-react";
import { ManagementBadge, ManagementCard, ManagementState } from "@/components/management/ManagementUI";
import { ownerModuleHref } from "@/components/layout/owner-navigation";
import { useOwnerPreview } from "../use-owner-preview";
import styles from "@/styles/owner-management.module.css";

export function OwnerOverview() {
  const { data, error, retry } = useOwnerPreview();
  if (error) return <ManagementState state="error" title="Chưa tải được tổng quan" description={error} onRetry={retry} />;
  if (!data) return <ManagementState state="loading" title="Đang tải tổng quan…" />;

  const occupied = data.rooms.filter(room => room.status === "occupied").length;
  const available = data.rooms.filter(room => room.status === "available").length;
  const occupancy = data.rooms.length ? Math.round(occupied / data.rooms.length * 100) : 0;
  const stats = [
    { label: "Tổng căn/phòng", value: data.rooms.length, foot: `${data.buildings.length} tòa nhà đang quản lý`, icon: Building2 },
    { label: "Căn đang thuê", value: occupied, foot: "Đã có người thuê", icon: House },
    { label: "Căn còn trống", value: available, foot: "Sẵn sàng cho thuê", icon: DoorOpen },
    { label: "Khách quan tâm", value: data.leads.length, foot: "Từ các tin đăng của bạn", icon: UsersRound },
  ];

  return (
    <div className={styles.content}>
      <header className={styles.pageHeader}>
        <div><h1 className={styles.pageHeading}>Tổng quan</h1><p>Một góc nhìn rõ ràng về hoạt động cho thuê của bạn.</p></div>
        <div className={styles.headerActions}><Link href={ownerModuleHref("tao-tin")} className={styles.primaryButton}><FilePlus2 size={16} /> Tạo tin cho thuê</Link></div>
      </header>
      <div className={styles.sampleNote}><span aria-hidden="true" /> Dữ liệu mẫu · Khu quản trị chủ nhà</div>
      <section className={styles.statsGrid} aria-label="Tổng quan nguồn cung">
        {stats.map(stat => <ManagementCard key={stat.label}><div className={styles.statTop}><span>{stat.label}</span><span className={styles.statIcon}><stat.icon size={17} /></span></div><strong className={styles.statValue}>{stat.value}</strong><small className={styles.statFoot}>{stat.foot}</small></ManagementCard>)}
      </section>
      <div className={styles.overviewGrid}>
        <ManagementCard>
          <div className={styles.sectionHeader}><h2>Căn hộ & phòng</h2><Link href={ownerModuleHref("can-ho-phong")}>Xem tất cả <ArrowRight size={13} /></Link></div>
          <div className={styles.roomList}>{data.rooms.slice(0, 4).map(room => {
            const building = data.buildings.find(item => item.id === room.buildingId);
            return <div className={styles.roomItem} key={room.id}><span className={styles.roomIcon}><Building2 size={19} /></span><div className={styles.roomName}><strong>{room.code}</strong><small>{building?.name} · {room.area} m²</small></div><ManagementBadge tone={room.status === "occupied" ? "success" : room.status === "reserved" ? "warning" : "info"}>{room.status === "occupied" ? "Đang thuê" : room.status === "reserved" ? "Giữ chỗ" : "Còn trống"}</ManagementBadge></div>;
          })}</div>
        </ManagementCard>
        <div className={styles.asideStack}>
          <ManagementCard>
            <div className={styles.sectionHeader}><h2>Công suất phòng</h2><Building2 size={16} className="text-slate-400" /></div>
            <div className={styles.occupancy}><strong>{occupancy}%</strong><span>{occupied}/{data.rooms.length} căn đang thuê</span></div>
            <div className={styles.progressTrack} role="progressbar" aria-label="Tỷ lệ phòng đang thuê" aria-valuenow={occupancy} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${occupancy}%` }} /></div>
            <div className={styles.legend}><span><i /> Đang thuê</span><span><i /> Còn lại</span></div>
          </ManagementCard>
          <ManagementCard>
            <div className={styles.sectionHeader}><h2>Truy cập nhanh</h2></div>
            <div className={styles.quickActions}>
              <Link href={ownerModuleHref("tin-bat-dong-san")} className={styles.quickAction}><span><House size={17} /></span><span><strong>Tin bất động sản</strong><small>Theo dõi tin đang hiển thị</small></span><ChevronRight size={15} /></Link>
              <Link href={ownerModuleHref("thu-tien")} className={styles.quickAction}><span><WalletCards size={17} /></span><span><strong>Thu tiền & công nợ</strong><small>Kiểm tra khoản thu theo kỳ</small></span><ChevronRight size={15} /></Link>
            </div>
          </ManagementCard>
        </div>
      </div>
    </div>
  );
}
