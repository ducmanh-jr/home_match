"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, FilePlus2, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { ManagementBadge, ManagementCard, ManagementDialog, ManagementState, ManagementTable, ManagementToast } from "@/components/management/ManagementUI";
import { ownerModuleHref } from "@/components/layout/owner-navigation";
import { useOwnerPreview } from "../use-owner-preview";
import type { OwnerRoom } from "../types";
import styles from "@/styles/owner-management.module.css";

const statuses = {
  available: { label: "Còn trống", tone: "info" },
  occupied: { label: "Đang thuê", tone: "success" },
  reserved: { label: "Giữ chỗ", tone: "warning" },
} as const;
const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });

export function OwnerUIKit() {
  const { data, error, retry } = useOwnerPreview();
  const [query, setQuery] = useState("");
  const [buildingId, setBuildingId] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<OwnerRoom | null>(null);
  const [statePreview, setStatePreview] = useState<"loading" | "empty" | "error">("empty");
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const selectAll = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
  const filteredRooms = data?.rooms.filter(room => {
    const building = data.buildings.find(item => item.id === room.buildingId);
    return (buildingId === "all" || room.buildingId === buildingId)
      && (status === "all" || room.status === status)
      && `${room.code} ${building?.name ?? ""}`.toLocaleLowerCase("vi-VN").includes(normalizedQuery);
  }) ?? [];
  const totalPages = Math.max(1, Math.ceil(filteredRooms.length / 4));
  const currentPage = Math.min(page, totalPages);
  const visibleRooms = filteredRooms.slice((currentPage - 1) * 4, currentPage * 4);
  const allChecked = visibleRooms.length > 0 && visibleRooms.every(room => selectedIds.includes(room.id));
  const someChecked = visibleRooms.some(room => selectedIds.includes(room.id));

  useEffect(() => {
    if (selectAll.current) selectAll.current.indeterminate = someChecked && !allChecked;
  }, [someChecked, allChecked]);

  function toggleRoom(id: string) {
    setSelectedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  }

  if (error) return <ManagementState state="error" title="Chưa tải được dữ liệu mẫu" description={error} onRetry={retry} />;
  if (!data) return <ManagementState state="loading" title="Đang tải dữ liệu mẫu…" />;

  return (
    <div className={styles.content}>
      <header className={styles.pageHeader}>
        <div><h1 className={styles.pageHeading}>Mẫu giao diện quản trị</h1><p>Bảng, bộ lọc và trạng thái dùng chung cho khu vực chủ nhà.</p></div>
        <Link href="/owner/v2" className={styles.secondaryButton}>Về tổng quan</Link>
      </header>
      <p className={styles.kitIntro}>Trang mẫu phục vụ duyệt giao diện. Các thao tác dưới đây chỉ sử dụng dữ liệu mẫu và không thay đổi thông tin phòng.</p>

      <ManagementCard className={styles.tableCard}>
        <div className={styles.filters}>
          <label className={`${styles.field} ${styles.searchField}`}>Tìm kiếm<Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Tìm mã phòng hoặc tòa nhà" /></label>
          <label className={styles.field}>Tòa nhà<select value={buildingId} onChange={event => { setBuildingId(event.target.value); setPage(1); }}><option value="all">Tất cả tòa nhà</option>{data.buildings.map(building => <option value={building.id} key={building.id}>{building.name}</option>)}</select></label>
          <label className={styles.field}>Tình trạng<select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="all">Mọi tình trạng</option>{Object.entries(statuses).map(([id, item]) => <option value={id} key={id}>{item.label}</option>)}</select></label>
          <button type="button" className={styles.secondaryButton} onClick={() => { setQuery(""); setBuildingId("all"); setStatus("all"); setPage(1); }}>Đặt lại</button>
        </div>
        {selectedIds.length > 0 && <div className={styles.selectedBar} role="status"><span>Đã chọn {selectedIds.length} căn/phòng</span><button type="button" className={styles.textButton} onClick={() => setSelectedIds([])}>Bỏ chọn</button></div>}
        {filteredRooms.length === 0 ? <ManagementState state="empty" title="Không có phòng phù hợp" description="Thử thay đổi từ khóa, tòa nhà hoặc tình trạng phòng." /> : <>
          <div className={styles.desktopTable}>
            <ManagementTable label="Danh sách phòng mẫu">
              <thead><tr><th scope="col"><input ref={selectAll} type="checkbox" aria-label="Chọn tất cả phòng trên trang này" checked={allChecked} onChange={() => setSelectedIds(previous => allChecked ? previous.filter(id => !visibleRooms.some(room => room.id === id)) : [...new Set([...previous, ...visibleRooms.map(room => room.id)])])} /></th><th scope="col">Căn/phòng</th><th scope="col">Tòa nhà</th><th scope="col">Diện tích</th><th scope="col">Giá thuê/tháng</th><th scope="col">Tình trạng</th><th scope="col">Thao tác</th></tr></thead>
              <tbody>{visibleRooms.map(room => <tr key={room.id}>
                <td><input type="checkbox" aria-label={`Chọn phòng ${room.code}`} checked={selectedIds.includes(room.id)} onChange={() => toggleRoom(room.id)} /></td>
                <td><strong>{room.code}</strong><small>{room.id}</small></td>
                <td>{data.buildings.find(building => building.id === room.buildingId)?.name}</td>
                <td>{room.area} m²</td><td>{money.format(room.monthlyRent)}</td>
                <td><ManagementBadge tone={statuses[room.status].tone}>{statuses[room.status].label}</ManagementBadge></td>
                <td><button type="button" className={styles.textButton} onClick={() => setSelectedRoom(room)} aria-label={`Xem chi tiết ${room.code}`}>Xem chi tiết</button></td>
              </tr>)}</tbody>
            </ManagementTable>
          </div>
          <div className={styles.mobileRoomCards}>{visibleRooms.map(room => <article className={styles.mobileRoomCard} key={room.id}>
            <header><strong>{room.code}</strong><ManagementBadge tone={statuses[room.status].tone}>{statuses[room.status].label}</ManagementBadge></header>
            <p>{data.buildings.find(building => building.id === room.buildingId)?.name}</p><p>{room.area} m² · {money.format(room.monthlyRent)}/tháng</p>
            <footer><label className={styles.badgeRow}><input type="checkbox" checked={selectedIds.includes(room.id)} onChange={() => toggleRoom(room.id)} /> Chọn phòng</label><button type="button" className={styles.textButton} onClick={() => setSelectedRoom(room)}>Xem chi tiết</button></footer>
          </article>)}</div>
        </>}
        <footer className={styles.tableFooter}><span aria-live="polite">{filteredRooms.length ? `Hiện ${(currentPage - 1) * 4 + 1}–${Math.min(currentPage * 4, filteredRooms.length)} / ${filteredRooms.length} căn/phòng` : "0 căn/phòng"}</span><nav className={styles.pagination} aria-label="Phân trang phòng mẫu"><button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Trang trước"><ChevronLeft size={16} /></button><span>Trang {currentPage}/{totalPages}</span><button type="button" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Trang sau"><ChevronRight size={16} /></button></nav></footer>
      </ManagementCard>

      <div className={styles.kitGrid}>
        <ManagementCard>
          <div className={styles.sectionHeader}><h2>Màu trạng thái</h2></div>
          <div className={styles.badgeRow}><ManagementBadge tone="success">Đang thuê</ManagementBadge><ManagementBadge tone="info">Còn trống</ManagementBadge><ManagementBadge tone="warning">Giữ chỗ</ManagementBadge><ManagementBadge tone="error">Quá hạn</ManagementBadge><ManagementBadge>Bản nháp</ManagementBadge></div>
          <div className={`${styles.sectionHeader} mt-6`}><h2>Nút hành động</h2></div>
          <div className={styles.badgeRow}><Button className={styles.primaryButton} onClick={() => setToast("Thông báo mẫu đã hiển thị.")}>Hiện thông báo</Button><Button variant="outline" size="sm" onClick={() => setSelectedRoom(data.rooms[0] ?? null)}>Mở cửa sổ</Button><Button variant="outline" size="sm" disabled>Chưa khả dụng</Button></div>
        </ManagementCard>
        <ManagementCard>
          <div className={styles.sectionHeader}><h2>Trạng thái nội dung</h2></div>
          <div className={styles.stateTabs} aria-label="Chọn trạng thái mẫu">{(["loading", "empty", "error"] as const).map(item => <button type="button" key={item} aria-pressed={statePreview === item} onClick={() => setStatePreview(item)}>{item === "loading" ? "Đang tải" : item === "empty" ? "Trống" : "Có lỗi"}</button>)}</div>
          <ManagementState state={statePreview} title={statePreview === "loading" ? "Đang tải dữ liệu…" : statePreview === "empty" ? "Chưa có dữ liệu" : "Không thể tải dữ liệu"} description={statePreview === "error" ? "Đây là mẫu hiển thị khi mất kết nối. Bạn có thể thử lại." : statePreview === "empty" ? "Thông tin sẽ xuất hiện khi có dữ liệu phù hợp." : undefined} onRetry={statePreview === "error" ? () => { retry(); setStatePreview("empty"); } : undefined} />
        </ManagementCard>
      </div>
      <ManagementDialog open={selectedRoom !== null} title={selectedRoom ? `Phòng ${selectedRoom.code}` : "Chi tiết phòng"} onClose={() => setSelectedRoom(null)} actions={<><Button variant="outline" size="sm" onClick={() => setSelectedRoom(null)}>Đóng</Button><Link className={styles.primaryButton} href={ownerModuleHref("tao-tin")}><FilePlus2 size={14} /> Đến tạo tin</Link></>}>
        {selectedRoom && <dl className={styles.detailList}><div><dt>Tòa nhà</dt><dd>{data.buildings.find(building => building.id === selectedRoom.buildingId)?.name}</dd></div><div><dt>Diện tích</dt><dd>{selectedRoom.area} m²</dd></div><div><dt>Giá thuê/tháng</dt><dd>{money.format(selectedRoom.monthlyRent)}</dd></div><div><dt>Tình trạng</dt><dd><ManagementBadge tone={statuses[selectedRoom.status].tone}>{statuses[selectedRoom.status].label}</ManagementBadge></dd></div></dl>}
      </ManagementDialog>
      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
