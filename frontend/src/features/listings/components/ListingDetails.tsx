"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, Eye, Pencil } from "lucide-react";
import { ManagementCard, ManagementDialog, ManagementToast } from "@/components/management/ManagementUI";
import { ListingStatusBadge } from "./ListingStatusBadge";
import { ListingPreview } from "./ListingPreview";
import { formatMoney } from "../constants";
import { listingQuality } from "../form";
import type { ListingWorkspace, OwnerListing } from "../types";
import base from "@/styles/owner-management.module.css";
import styles from "@/styles/owner-supply.module.css";

const tabs = [{ id: "overview", label: "Tổng quan" }, { id: "content", label: "Nội dung tin" }, { id: "photos", label: "Hình ảnh" }, { id: "costs", label: "Giá & chi phí" }, { id: "performance", label: "Hiệu quả" }, { id: "leads", label: "Khách quan tâm" }, { id: "history", label: "Lịch sử" }];

export function ListingDetails({ listing, workspace, tabId }: { listing: OwnerListing; workspace: ListingWorkspace; tabId?: string | null; }) {
  const tab = tabs.some(item => item.id === tabId) ? tabId : "overview";
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const room = workspace.rooms.find(item => item.id === listing.roomId);
  const leads = workspace.leads.filter(lead => lead.listingId === listing.id);
  const metrics = [{ label: "Lượt xem", value: listing.views }, { label: "Lượt lưu", value: listing.saves }, { label: "Khách quan tâm", value: leads.length }, { label: "Lịch xem", value: leads.filter(lead => lead.viewingAt).length }];

  return (
    <div className={styles.supply}>
      <div className={styles.actions}>
        <Link href="/owner/v2?m=tin-bat-dong-san">
          <ArrowLeft size={14} /> Tin bất động sản</Link>
      </div>
      <header className={base.pageHeader}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ListingStatusBadge status={listing.status} />
            <span>{listing.code}</span>
          </div>
          <h1 className={base.pageHeading}>{listing.title || "Tin chưa đặt tiêu đề"}</h1>
          <p>{[listing.ward, listing.city].filter(Boolean).join(", ")}</p>
        </div>
        <div className={base.headerActions}>
          <button type="button" className={base.secondaryButton} onClick={() => setPreviewOpen(true)}>
            <Eye size={14} /> Xem trước</button>
          <button type="button" className={base.secondaryButton} onClick={async () => { try { await navigator.clipboard.writeText(`${window.location.origin}/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`); setToast("Đã sao chép liên kết nội bộ khu quản trị."); } catch { setToast("Không sao chép được. Bạn có thể sao chép URL trên thanh địa chỉ."); } }} title="Sao chép liên kết nội bộ">
            <Copy size={14} /> Sao chép</button>
          <Link href={`/owner/v2?m=tao-tin&edit=${listing.id}`} className={base.primaryButton}>
            <Pencil size={14} /> Chỉnh sửa tin</Link>
        </div>
      </header>
      <ManagementCard className={base.tableCard}>
        <nav className={styles.tabs} aria-label="Chi tiết tin đăng">{tabs.map(item => <Link key={item.id} href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}&tab=${item.id}`} aria-current={tab === item.id ? "page" : undefined} scroll={false}>{item.label}</Link>)}</nav>
        <div className={styles.detailBody}>
          {tab === "overview" && <>
            <div className={styles.detailGrid}>
              <div className={styles.detailImage}>{listing.photos[0] && <Image src={listing.photos[0].url} alt={listing.title} fill sizes="(max-width: 599px) 85vw, 620px" className="object-cover" unoptimized={listing.photos[0].url.startsWith("data:")} />}</div>
              <dl className={styles.detailList}>
                <div>
                  <dt>Giá thuê</dt>
                  <dd>{formatMoney(listing.monthlyRent)}/tháng</dd>
                </div>
                <div>
                  <dt>Tiền cọc</dt>
                  <dd>{listing.deposit || "Chưa khai"}</dd>
                </div>
                <div>
                  <dt>Diện tích</dt>
                  <dd>{listing.area || "—"} m²</dd>
                </div>
                <div>
                  <dt>Loại hình</dt>
                  <dd>{listing.kind || "Chưa khai"}</dd>
                </div>
                <div>
                  <dt>Chất lượng nội dung</dt>
                  <dd>{listingQuality(listing)}/100</dd>
                </div>
                <div>
                  <dt>Căn liên kết</dt>
                  <dd>{room ? <Link href={`/owner/v2?m=can-ho-phong&room=${room.id}`} className={base.textButton}>{room.code}</Link> : "Chưa gắn căn/phòng"}</dd>
                </div>
              </dl>
            </div>
            <div className={styles.tags}>{listing.amenities.map(item => <span key={item}>{item}</span>)}</div>
            <p className={styles.prose}>{listing.description || "Chưa có mô tả."}</p>
          </>}
          {tab === "content" && <>
            <h2 className={styles.subheading}>Nội dung tin</h2>
            <p className={styles.prose}>{listing.description || "Chưa có mô tả."}</p>
            <h3 className={styles.subheading}>Nội quy</h3>
            <p className={styles.prose}>{listing.rules || "Chưa khai nội quy."}</p>
            <dl className={styles.detailList}>
              <div>
                <dt>Vị trí công khai</dt>
                <dd>{listing.ward}, {listing.city}</dd>
              </div>
              <div>
                <dt>Địa chỉ vận hành</dt>
                <dd>{listing.address}</dd>
              </div>
              <div>
                <dt>Người liên hệ</dt>
                <dd>{listing.contactName}</dd>
              </div>
              <div>
                <dt>Điện thoại</dt>
                <dd>{listing.contactPhone}</dd>
              </div>
            </dl>
            <p className={styles.muted}>Địa chỉ đầy đủ và số điện thoại ở đây dành cho chủ nhà quản lý.</p>
          </>}
          {tab === "photos" && <>
            <h2 className={styles.subheading}>Hình ảnh ({listing.photos.length})</h2>
            <div className={styles.photoGrid}>{listing.photos.map((photo, index) => <button type="button" className={styles.photoTile} key={photo.id} aria-label={`Mở ảnh ${index + 1}`} onClick={() => setPhotoIndex(index)}>
              <Image src={photo.url} alt={photo.name} fill sizes="(max-width: 599px) 40vw, 300px" className="object-cover" unoptimized={photo.url.startsWith("data:")} />
              <span>{index === 0 ? "Ảnh bìa" : `Ảnh ${index + 1}`}</span>
            </button>)}</div>
          </>}
          {tab === "costs" && <>
            <h2 className={styles.subheading}>Giá thuê & chi phí</h2>
            <dl className={styles.detailList}>{[["Giá thuê/tháng", formatMoney(listing.monthlyRent)], ["Tiền cọc", listing.deposit], ["Giá điện", listing.electricity], ["Giá nước", listing.water], ["Phí dịch vụ", listing.serviceFee], ["Giữ xe", listing.parkingFee]].map(([label, value]) => <div key={label}>
              <dt>{label}</dt>
              <dd>{value || "Chưa khai"}</dd>
            </div>)}</dl>
            <p className={styles.muted}>Tiền cọc là khoản giữ hộ, tách biệt với giá thuê mỗi tháng.</p>
          </>}
          {tab === "performance" && <>
            <section className={base.statsGrid}>{metrics.map(item => <ManagementCard key={item.label}>
              <span className={base.statTop}>{item.label}</span>
              <strong className={base.statValue}>{item.value}</strong>
            </ManagementCard>)}</section>
            <p className={styles.infoBanner}>Số liệu mẫu dùng để duyệt giao diện. Chưa có chuỗi lượt xem theo ngày hoặc nguồn truy cập để vẽ biểu đồ thời gian.</p>
          </>}
          {tab === "leads" && <>
            <h2 className={styles.subheading}>Khách quan tâm từ tin này</h2>{leads.length ? leads.map(lead => <div className={base.roomItem} key={lead.id}>
              <div className={base.roomName}>
                <strong>{lead.name}</strong>
                <small>{lead.viewingAt ? `Hẹn xem ${new Date(lead.viewingAt).toLocaleString("vi-VN")}` : "Để lại liên hệ"}</small>
              </div>
              <Link href={`/owner/v2?m=khach-quan-tam&lead=${lead.id}`} className={base.textButton}>Xem khách</Link>
            </div>) : <p className={styles.muted}>Chưa có khách nào từ tin này.</p>}</>}
          {tab === "history" && <>
            <h2 className={styles.subheading}>Lịch sử thay đổi mẫu</h2>
            <ul className={styles.timeline}>{listing.history.map(event => <li key={event.id}>
              <span>
                <Check size={12} className="inline mr-2 text-emerald-600" />{event.description}</span>
              <small>{new Date(event.at).toLocaleString("vi-VN")}</small>
            </li>)}</ul>
          </>}
        </div>
      </ManagementCard>
      <ManagementDialog open={previewOpen} title="Xem trước thẻ tin" onClose={() => setPreviewOpen(false)}>
        <ListingPreview values={listing} />
      </ManagementDialog>
      <ManagementDialog open={photoIndex !== null} title={`Ảnh ${photoIndex === null ? "" : photoIndex + 1}/${listing.photos.length}`} wide onClose={() => setPhotoIndex(null)}>{photoIndex !== null && <div className={styles.lightbox}>
        <div className={styles.lightboxImage}>
          <Image src={listing.photos[photoIndex].url} alt={listing.photos[photoIndex].name} fill sizes="90vw" className="object-contain" unoptimized={listing.photos[photoIndex].url.startsWith("data:")} />
        </div>
        <div className={styles.lightboxFooter}>
          <button type="button" className={base.secondaryButton} aria-label="Ảnh trước" onClick={() => setPhotoIndex((photoIndex - 1 + listing.photos.length) % listing.photos.length)}>
            <ChevronLeft size={16} />
          </button>
          <span>{photoIndex + 1}/{listing.photos.length}</span>
          <button type="button" className={base.secondaryButton} aria-label="Ảnh sau" onClick={() => setPhotoIndex((photoIndex + 1) % listing.photos.length)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>}</ManagementDialog>
      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
