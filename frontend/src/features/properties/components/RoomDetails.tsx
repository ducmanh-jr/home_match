"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { ManagementDialog } from "@/components/management/ManagementUI";
import { useOwnerPreview } from "@/features/owner-dashboard/use-owner-preview";
import { formatMoney } from "@/features/listings/constants";
import type { ListingWorkspace } from "@/features/listings/types";
import type { PropertyRoom } from "../types";
import { RoomStatusBadge } from "./RoomStatusBadge";
import base from "@/styles/owner-management.module.css";
import styles from "@/styles/owner-supply.module.css";

const roomTabs = [{ id: "overview", label: "Tổng quan" }, { id: "lease", label: "Hợp đồng & thu tiền" }, { id: "history", label: "Lịch sử" }];

export function RoomDetails({ room, workspace, onClose }: { room: PropertyRoom; workspace: ListingWorkspace; onClose: () => void; }) {
  const [tab, setTab] = useState("overview");
  const { data: ledger, error } = useOwnerPreview();
  const building = workspace.buildings.find(item => item.id === room.buildingId);
  const listings = workspace.listings.filter(listing => listing.roomId === room.id);
  const lease = ledger?.leases.find(item => item.roomId === room.id);
  const invoices = ledger?.invoices.filter(item => item.leaseId === lease?.id) ?? [];
  return (
    <ManagementDialog open title={`Căn/phòng ${room.code}`} onClose={onClose} wide actions={<>
      <button type="button" className={base.secondaryButton} onClick={onClose}>Đóng</button>
      <Link href={`/owner/v2?m=tao-tin&room=${room.id}`} className={base.primaryButton}>
        <FilePlus2 size={14} /> Tạo tin cho căn</Link>
    </>}>
      <div className={styles.supply}>
        <div className={styles.tabs} role="tablist" aria-label="Chi tiết phòng">{roomTabs.map((item, index) => <button type="button" key={item.id} id={`room-tab-${item.id}`} role="tab" tabIndex={tab === item.id ? 0 : -1} aria-selected={tab === item.id} aria-controls="room-panel" onClick={() => setTab(item.id)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (index + 1) % roomTabs.length : event.key === "ArrowLeft" ? (index - 1 + roomTabs.length) % roomTabs.length : event.key === "Home" ? 0 : event.key === "End" ? roomTabs.length - 1 : -1; if (next < 0) return; event.preventDefault(); setTab(roomTabs[next].id); document.getElementById(`room-tab-${roomTabs[next].id}`)?.focus(); }}>{item.label}</button>)}</div>
        <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${tab}`}>
          {tab === "overview" && <div className={styles.supply}>
            <div className={styles.detailGrid}>
              <div className={styles.detailImage}>
                <Image src={room.photos[0]} alt={`Phòng ${room.code}`} fill sizes="(max-width: 599px) 85vw, 450px" className="object-cover" />
              </div>
              <dl className={styles.detailList}>
                <div>
                  <dt>Tòa nhà</dt>
                  <dd>{building?.name}</dd>
                </div>
                <div>
                  <dt>Địa chỉ</dt>
                  <dd>{building?.address}</dd>
                </div>
                <div>
                  <dt>Tình trạng</dt>
                  <dd>
                    <RoomStatusBadge status={room.status} />
                  </dd>
                </div>
                <div>
                  <dt>Loại phòng</dt>
                  <dd>{room.kind}</dd>
                </div>
                <div><dt>Phòng ngủ / phòng tắm</dt><dd>{room.bedrooms} / {room.bathrooms}</dd></div>
                <div>
                  <dt>Tầng / Diện tích</dt>
                  <dd>{room.floor} / {room.area} m²</dd>
                </div>
                <div>
                  <dt>Giá thuê</dt>
                  <dd>{formatMoney(room.monthlyRent)}/tháng</dd>
                </div>
                <div>
                  <dt>Tiền cọc</dt>
                  <dd>{room.deposit}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className={styles.subheading}>Tiện ích & nội thất</h3>
              <div className={`${styles.tags} mt-3`}>{room.amenities.map(item => <span key={item}>{item}</span>)}</div>
            </div>
            <p className={styles.prose}>{room.description}</p>
            <div>
              <h3 className={styles.subheading}>Tin liên kết ({listings.length})</h3>{listings.length ? listings.map(listing => <p key={listing.id} className={styles.actions}>
                <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>{listing.title}</Link>
              </p>) : <p className={styles.muted}>Căn này chưa có tin cho thuê.</p>}</div>
          </div>}
          {tab === "lease" && <div className={styles.supply}>
            {error ? <p className={styles.errorBanner} role="alert">{error}</p> : lease ? <>
              <dl className={styles.detailList}>
                <div>
                  <dt>Người thuê</dt>
                  <dd>{lease.tenantName}</dd>
                </div>
                <div>
                  <dt>Tiền thuê</dt>
                  <dd>{formatMoney(lease.monthlyRent)}/tháng</dd>
                </div>
                <div>
                  <dt>Tiền cọc giữ hộ</dt>
                  <dd>{formatMoney(lease.deposit)}</dd>
                </div>
                <div>
                  <dt>Đã thu theo hóa đơn</dt>
                  <dd>{formatMoney(invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0))}</dd>
                </div>
                <div>
                  <dt>Còn phải thu</dt>
                  <dd>{formatMoney(invoices.reduce((sum, invoice) => sum + Math.max(0, invoice.amount - invoice.paidAmount), 0))}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                <Link href={`/owner/v2?m=hop-dong&lease=${lease.id}`}>Mở hợp đồng</Link>
                <Link href={`/owner/v2?m=thu-tien&lease=${lease.id}`}>Mở thu tiền</Link>
              </div>
            </> : <p className={styles.muted}>{ledger ? "Căn này chưa có hợp đồng thuê trong dữ liệu mẫu." : "Đang tải thông tin hợp đồng…"}</p>}
          </div>}
          {tab === "history" && <>
            <p className={styles.muted}>Lịch sử mẫu gắn với căn/phòng này.</p>
            <ul className={styles.timeline}>
              <li>
                <span>Giá thuê hiện tại: {formatMoney(room.monthlyRent)}/tháng</span>
                <small>Dữ liệu sổ phòng mẫu</small>
              </li>{lease && <li>
                <span>Hợp đồng của {lease.tenantName}</span>
                <small>Mã {lease.id}</small>
              </li>}{listings.map(listing => <li key={listing.id}>
                <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>{listing.title}</Link>
                <small>Cập nhật {new Date(listing.updatedAt).toLocaleDateString("vi-VN")}</small>
              </li>)}</ul>
          </>}
        </div>
      </div>
    </ManagementDialog>
  );
}
