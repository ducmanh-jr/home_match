"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, FilePlus2, Grid2X2, LayoutList, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ManagementCard, ManagementDialog, ManagementPagination, ManagementState, ManagementTable, ManagementToast } from "@/components/management/ManagementUI";
import { useListingWorkspace } from "../use-listing-workspace";
import { setOwnerListingStatus } from "../api";
import { formatMoney, listingStatuses } from "../constants";
import { listingQuality } from "../form";
import { ListingStatusBadge } from "./ListingStatusBadge";
import { ListingDetails } from "./ListingDetails";
import base from "@/styles/owner-management.module.css";
import styles from "@/styles/owner-supply.module.css";

export function OwnerListings() {
  const { data, error, retry, ownerId } = useListingWorkspace();
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [buildingId, setBuildingId] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("updated");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<{ ids: string[]; status: "hidden" | "pending_review"; } | null>(null);
  const [busy, setBusy] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const selectAll = useRef<HTMLInputElement>(null);
  const filtered = (data?.listings ?? []).filter(listing => {
    const room = data?.rooms.find(item => item.id === listing.roomId);
    return `${listing.title} ${listing.code}`.toLocaleLowerCase("vi-VN").includes(query.trim().toLocaleLowerCase("vi-VN")) && (status === "all" || listing.status === status) && (buildingId === "all" || room?.buildingId === buildingId);
  }).sort((a, b) => sort === "views" ? b.views - a.views : sort === "quality" ? listingQuality(b) - listingQuality(a) : Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 6)));
  const visible = filtered.slice((currentPage - 1) * 6, currentPage * 6);
  const allChecked = visible.length > 0 && visible.every(listing => selectedIds.includes(listing.id));
  const someChecked = visible.some(listing => selectedIds.includes(listing.id));
  useEffect(() => { if (selectAll.current) selectAll.current.indeterminate = someChecked && !allChecked; }, [someChecked, allChecked, view]);
  if (error) return <ManagementState state="error" title="Chưa tải được tin đăng" description={error} onRetry={retry} />;
  if (!data) return <ManagementState state="loading" title="Đang tải tin bất động sản…" />;
  const listingId = params.get("listing");
  const detail = data.listings.find(listing => listing.id === listingId);
  if (listingId) return detail ? <ListingDetails key={detail.id} listing={detail} workspace={data} tabId={params.get("tab")} /> : <ManagementState state="empty" title="Không tìm thấy tin đăng" description="Tin này không có trong sổ của tài khoản đang dùng." retryLabel="Về danh sách tin" onRetry={() => window.location.assign("/owner/v2?m=tin-bat-dong-san")} />;
  const toggle = (id: string) => setSelectedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  const selectedActive = data.listings.filter(listing => selectedIds.includes(listing.id) && ["published", "needs_update"].includes(listing.status)).map(listing => listing.id);

  async function confirmStatus() {
    if (!confirmation || busy) return;
    setBusy(true); setMutationError(null);
    try { await setOwnerListingStatus(ownerId, confirmation.ids, confirmation.status); setConfirmation(null); setSelectedIds([]); setToast("Đã cập nhật trạng thái tin mẫu."); retry(); }
    catch (reason) { setMutationError(reason instanceof Error ? reason.message : "Không cập nhật được tin."); }
    finally { setBusy(false); }
  }

  return (
    <div className={styles.supply}>
      <header className={base.pageHeader}>
        <div>
          <h1 className={base.pageHeading}>Tin bất động sản</h1>
          <p>Quản lý nội dung và theo dõi hiệu quả từng tin cho thuê.</p>
        </div>
        <Link href="/owner/v2?m=tao-tin" className={base.primaryButton}>
          <FilePlus2 size={15} /> Tạo tin cho thuê</Link>
      </header>
      <div className={styles.note}>Dữ liệu mẫu · Các thay đổi được lưu trên trình duyệt này</div>
      <section className={base.statsGrid}>{[{ label: "Tổng tin", count: data.listings.length }, { label: "Đang hiển thị", count: data.listings.filter(item => ["published", "needs_update"].includes(item.status)).length }, { label: "Bản nháp", count: data.listings.filter(item => item.status === "draft").length }, { label: "Chờ duyệt", count: data.listings.filter(item => item.status === "pending_review").length }].map(item => <ManagementCard key={item.label}>
        <span className={base.statTop}>{item.label}</span>
        <strong className={base.statValue}>{item.count}</strong>
      </ManagementCard>)}</section>
      <ManagementCard className={base.tableCard}>
        <div className={styles.toolbar}>
          <label className={`${styles.field} ${styles.search}`}>
            <Search size={15} />
            <input type="search" aria-label="Tìm tiêu đề hoặc mã tin" placeholder="Tìm tiêu đề, mã tin…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} />
          </label>
          <label className={styles.field}>Tòa nhà<select value={buildingId} onChange={event => { setBuildingId(event.target.value); setPage(1); }}>
            <option value="all">Tất cả tòa nhà</option>{data.buildings.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select>
          </label>
          <label className={styles.field}>Trạng thái<select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}>
            <option value="all">Mọi trạng thái</option>{Object.entries(listingStatuses).map(([id, item]) => <option value={id} key={id}>{item.label}</option>)}</select>
          </label>
          <label className={styles.field}>Sắp xếp<select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}>
            <option value="updated">Cập nhật gần nhất</option>
            <option value="views">Lượt xem nhiều nhất</option>
            <option value="quality">Chất lượng nội dung</option>
          </select>
          </label>
          <button type="button" className={base.secondaryButton} onClick={() => { setQuery(""); setBuildingId("all"); setStatus("all"); setSort("updated"); setPage(1); }}>Đặt lại</button>
<div className={styles.switcher}>
            <button type="button" aria-label="Dạng danh sách" aria-pressed={view === "list"} onClick={() => setView("list")}>
              <LayoutList size={15} />
            </button>
            <button type="button" aria-label="Dạng lưới" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
              <Grid2X2 size={15} />
            </button>
          </div>
        </div>
        {selectedIds.length > 0 && <div className={styles.selectedBar}>
          <span>Đã chọn {selectedIds.length} tin</span>
          <button type="button" disabled={!selectedActive.length} onClick={() => { setMutationError(null); setConfirmation({ ids: selectedActive, status: "hidden" }); }}>Tạm ẩn ({selectedActive.length})</button>
          <button type="button" onClick={() => setSelectedIds([])}>Bỏ chọn</button>
        </div>}
        {!filtered.length ? <ManagementState state="empty" title="Không có tin nào khớp bộ lọc" description="Thử đổi từ khóa hoặc trạng thái tin đăng." /> : view === "grid" ? <div className={styles.grid}>{visible.map(listing => <article className={styles.listingCard} key={listing.id}>
          <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`} className={styles.cover}>{listing.photos[0] && <Image src={listing.photos[0].url} alt={listing.title} fill sizes="(max-width: 599px) 85vw, 350px" className="object-cover" unoptimized={listing.photos[0].url.startsWith("data:")} />}<span>
            <ListingStatusBadge status={listing.status} />
          </span>
          </Link>
          <div className={styles.cardBody}>
            <div className={styles.cardMeta}>
              <span>{listing.code}</span>
              <span>{listingQuality(listing)}/100 điểm</span>
            </div>
            <h2>
              <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>{listing.title}</Link>
            </h2>
            <strong className={styles.price}>{formatMoney(listing.monthlyRent)}/tháng</strong>
            <span className={styles.muted}>{listing.ward} · {listing.area} m²</span>
            <div className={styles.cardMeta}>
              <span>{listing.views} lượt xem · {listing.saves} lượt lưu</span>
              <label>
                <input type="checkbox" checked={selectedIds.includes(listing.id)} onChange={() => toggle(listing.id)} aria-label={`Chọn ${listing.title}`} /> Chọn</label>
            </div>
          </div>
        </article>)}</div> : <>
          <div className={styles.desktopTable}>
            <ManagementTable label="Danh sách tin đăng">
              <thead>
                <tr>
                  <th scope="col">
                    <input ref={selectAll} type="checkbox" aria-label="Chọn các tin trên trang này" checked={allChecked} onChange={() => setSelectedIds(previous => allChecked ? previous.filter(id => !visible.some(item => item.id === id)) : [...new Set([...previous, ...visible.map(item => item.id)])])} />
                  </th>
                  <th scope="col">Tin đăng</th>
                  <th scope="col">Giá / Căn liên kết</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hiệu quả</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>{visible.map(listing => <tr key={listing.id}>
                <td>
                  <input type="checkbox" checked={selectedIds.includes(listing.id)} onChange={() => toggle(listing.id)} aria-label={`Chọn ${listing.title}`} />
                </td>
                <td>
                  <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`} className={styles.thumbCell}>
                    <div className={styles.thumb}>{listing.photos[0] && <Image src={listing.photos[0].url} alt="" fill sizes="62px" className="object-cover" unoptimized={listing.photos[0].url.startsWith("data:")} />}</div>
                    <div>
                      <strong>{listing.title}</strong>
                      <small>{listing.code} · {listingQuality(listing)}/100 điểm</small>
                    </div>
                  </Link>
                </td>
                <td>
                  <strong className={styles.price}>{formatMoney(listing.monthlyRent)}</strong>
                  <small>{data.rooms.find(room => room.id === listing.roomId)?.code || "Chưa gắn phòng"}</small>
                </td>
                <td>
                  <ListingStatusBadge status={listing.status} />
                </td>
                <td>
                  <span className="inline-flex items-center gap-1">
                    <Eye size={12} /> {listing.views}</span>
                  <small>{listing.saves} lượt lưu</small>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/owner/v2?m=tao-tin&edit=${listing.id}`}>{listing.status === "draft" ? "Tiếp tục" : "Sửa tin"}</Link>{["published", "needs_update", "hidden"].includes(listing.status) && <button type="button" onClick={() => { setMutationError(null); setConfirmation({ ids: [listing.id], status: listing.status === "hidden" ? "pending_review" : "hidden" }); }}>{listing.status === "hidden" ? "Đăng lại" : "Tạm ẩn"}</button>}</div>
                </td>
              </tr>)}</tbody>
            </ManagementTable>
          </div>
          <div className={styles.mobileCards}>{visible.map(listing => <article className={styles.mobileCard} key={listing.id}>
            <header>
              <span>{listing.code}</span>
              <ListingStatusBadge status={listing.status} />
            </header>
            <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>
              <strong>{listing.title}</strong>
            </Link>
            <p>{formatMoney(listing.monthlyRent)}/tháng · {listing.area} m²</p>
            <footer>
              <label>
                <input type="checkbox" checked={selectedIds.includes(listing.id)} onChange={() => toggle(listing.id)} /> Chọn tin</label>
              <Link href={`/owner/v2?m=tao-tin&edit=${listing.id}`} className={base.textButton}>Chỉnh sửa</Link>
            </footer>
          </article>)}</div>
        </>}
        <ManagementPagination page={currentPage} pageSize={6} total={filtered.length} onChange={setPage} />
      </ManagementCard>
      <ManagementDialog open={confirmation !== null} title={confirmation?.status === "hidden" ? "Tạm ẩn tin đăng?" : "Gửi đăng lại tin?"} onClose={() => { if (!busy) setConfirmation(null); }} actions={<>
        <button type="button" className={base.secondaryButton} disabled={busy} onClick={() => setConfirmation(null)}>Hủy</button>
        <button type="button" className={base.primaryButton} disabled={busy} onClick={confirmStatus}>{busy ? "Đang lưu…" : "Xác nhận"}</button>
      </>}>
        <p className={styles.muted}>{confirmation?.status === "hidden" ? `Tạm ẩn ${confirmation.ids.length} tin trong dữ liệu mẫu. Bạn có thể gửi đăng lại sau.` : "Tin mẫu sẽ chuyển sang Chờ duyệt; không tự hiển thị công khai."}</p>{mutationError && <p className={styles.errorBanner} role="alert">{mutationError}</p>}</ManagementDialog>
      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
