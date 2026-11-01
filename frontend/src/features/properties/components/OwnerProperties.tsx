"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, DoorOpen, FilePlus2, Grid2X2, LayoutList, Search } from "lucide-react";
import { useState } from "react";
import { ManagementCard, ManagementPagination, ManagementState, ManagementTable } from "@/components/management/ManagementUI";
import { useListingWorkspace } from "@/features/listings/use-listing-workspace";
import { formatMoney } from "@/features/listings/constants";
import { RoomDetails } from "./RoomDetails";
import { RoomStatusBadge, roomStatuses } from "./RoomStatusBadge";
import base from "@/styles/owner-management.module.css";
import styles from "@/styles/owner-supply.module.css";

export function OwnerProperties() {
  const { data, error, retry } = useListingWorkspace();
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [buildingId, setBuildingId] = useState("all");
  const [status, setStatus] = useState("all");
  const [listingFilter, setListingFilter] = useState("all");
  const [floor, setFloor] = useState("all");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  if (error) return <ManagementState state="error" title="Chưa tải được danh mục phòng" description={error} onRetry={retry} />;
  if (!data) return <ManagementState state="loading" title="Đang tải căn hộ & phòng…" />;

  const filtered = data.rooms.filter(room => {
    const building = data.buildings.find(item => item.id === room.buildingId);
    const hasListing = data.listings.some(listing => listing.roomId === room.id && ["published", "needs_update"].includes(listing.status));
    return `${room.code} ${building?.name} ${building?.address}`.toLocaleLowerCase("vi-VN").includes(query.trim().toLocaleLowerCase("vi-VN"))
      && (buildingId === "all" || room.buildingId === buildingId) && (status === "all" || room.status === status)
      && (floor === "all" || room.floor === Number(floor)) && (listingFilter === "all" || (listingFilter === "yes" ? hasListing : !hasListing));
  });
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 5)));
  const visible = filtered.slice((currentPage - 1) * 5, currentPage * 5);
  const roomId = params.get("room");
  const selectedRoom = data.rooms.find(room => room.id === roomId);
  const clearFilters = () => { setQuery(""); setBuildingId("all"); setStatus("all"); setListingFilter("all"); setFloor("all"); setPage(1); };
  const resetPage = (set: (value: string) => void, value: string) => { set(value); setPage(1); };
  const stats = [{ label: "Tòa nhà", value: data.buildings.length }, { label: "Căn/phòng", value: data.rooms.length }, { label: "Đang thuê", value: data.rooms.filter(room => room.status === "occupied").length }, { label: "Còn trống", value: data.rooms.filter(room => room.status === "available").length }];

  return (
    <div className={styles.supply}>
      <header className={base.pageHeader}>
        <div>
          <h1 className={base.pageHeading}>Căn hộ & phòng</h1>
          <p>Danh mục tài sản và tình trạng khai thác từng chỗ ở.</p>
        </div>
        <Link href="/owner/v2?m=tao-tin" className={base.primaryButton}>
          <FilePlus2 size={15} /> Tạo tin cho thuê</Link>
      </header>
      <div className={styles.note}>Dữ liệu mẫu · {data.rooms.length} căn/phòng trong sổ</div>
      <section className={base.statsGrid} aria-label="Thống kê nguồn cung">{stats.map(stat => <ManagementCard key={stat.label}>
        <div className={base.statTop}>{stat.label}<Building2 size={16} className="text-orange-500" />
        </div>
        <strong className={base.statValue}>{stat.value}</strong>
      </ManagementCard>)}</section>
      <ManagementCard className={base.tableCard}>
        <div className={styles.toolbar}>
          <label className={`${styles.field} ${styles.search}`}>
            <Search size={15} />
            <input aria-label="Tìm phòng hoặc địa chỉ" type="search" placeholder="Tìm mã phòng, địa chỉ…" value={query} onChange={event => resetPage(setQuery, event.target.value)} />
          </label>
          <label className={styles.field}>Tòa nhà<select value={buildingId} onChange={event => resetPage(setBuildingId, event.target.value)}>
            <option value="all">Tất cả tòa nhà</option>{data.buildings.map(building => <option key={building.id} value={building.id}>{building.name}</option>)}</select>
          </label>
          <label className={styles.field}>Tình trạng<select value={status} onChange={event => resetPage(setStatus, event.target.value)}>
            <option value="all">Mọi tình trạng</option>{Object.entries(roomStatuses).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select>
          </label>
          <label className={styles.field}>Tin đăng<select value={listingFilter} onChange={event => resetPage(setListingFilter, event.target.value)}>
            <option value="all">Mọi tin đăng</option>
            <option value="yes">Đang có tin</option>
            <option value="no">Chưa có tin</option>
          </select>
          </label>
          <label className={styles.field}>Tầng<select value={floor} onChange={event => resetPage(setFloor, event.target.value)}>
            <option value="all">Mọi tầng</option>{[...new Set(data.rooms.map(room => room.floor))].sort((a, b) => a - b).map(item => <option key={item} value={item}>Tầng {item}</option>)}</select>
          </label>
          <button type="button" className={base.secondaryButton} onClick={clearFilters}>Đặt lại</button>
          <div className={styles.switcher} aria-label="Cách xem phòng">
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
              <LayoutList size={14} /> Danh sách</button>
            <button type="button" aria-pressed={view === "floor"} onClick={() => setView("floor")}>
              <Grid2X2 size={14} /> Sơ đồ tầng</button>
          </div>
        </div>
        {!filtered.length ? <ManagementState state="empty" title="Không có phòng khớp bộ lọc" description="Thử đổi từ khóa, tòa nhà hoặc tình trạng phòng." /> : view === "floor" ? <div className={styles.floorSections}>{data.buildings.map(building => {
          const rooms = filtered.filter(room => room.buildingId === building.id);
          return rooms.length > 0 && <section key={building.id}>
            <div className={styles.floorTitle}>
              <strong>{building.name}</strong>
              <span>{rooms.length} căn/phòng</span>
            </div>{[...new Set(rooms.map(room => room.floor))].sort((a, b) => b - a).map(item => <section key={item}>
              <span className={styles.muted}>Tầng {item}</span>
              <div className={styles.floorGrid}>{rooms.filter(room => room.floor === item).map(room => <button type="button" key={room.id} className={styles.floorRoom} data-status={room.status} onClick={() => router.push(`/owner/v2?m=can-ho-phong&room=${room.id}`)}>
                <strong>{room.code}</strong>
                <RoomStatusBadge status={room.status} />
                <small>{room.area} m² · {formatMoney(room.monthlyRent)}/tháng</small>
              </button>)}</div>
            </section>)}</section>;
        })}</div> : <>
          <div className={styles.desktopTable}>
            <ManagementTable label="Danh mục căn hộ và phòng">
              <thead>
                <tr>
                  <th scope="col">Căn/phòng</th>
                  <th scope="col">Giá thuê</th>
                  <th scope="col">Tình trạng</th>
                  <th scope="col">Tin đăng</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>{visible.map(room => {
                const listings = data.listings.filter(listing => listing.roomId === room.id);
                return <tr key={room.id}>
                  <td>
                    <div className={styles.thumbCell}>
                      <div className={styles.thumb}>
                        <Image src={room.photos[0]} alt={`Phòng ${room.code}`} fill sizes="62px" className="object-cover" />
                      </div>
                      <div>
                        <strong>{room.code}</strong>
                        <small>{data.buildings.find(item => item.id === room.buildingId)?.name}<br />Tầng {room.floor} · {room.area} m²</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.price}>{formatMoney(room.monthlyRent)}</span>
                    <small>Cọc {room.deposit}</small>
                  </td>
                  <td>
                    <RoomStatusBadge status={room.status} />
                  </td>
                  <td>{listings.length ? <Link className={base.textButton} href={`/owner/v2?m=tin-bat-dong-san&listing=${listings[0].id}`}>{listings.length} tin liên kết</Link> : <span className={styles.muted}>Chưa có tin</span>}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/owner/v2?m=can-ho-phong&room=${room.id}`}>Chi tiết</Link>
                      <Link href={`/owner/v2?m=tao-tin&room=${room.id}`}>Tạo tin</Link>
                    </div>
                  </td>
                </tr>;
              })}</tbody>
            </ManagementTable>
          </div>
          <div className={styles.mobileCards}>{visible.map(room => <article className={styles.mobileCard} key={room.id}>
            <header>
              <strong>{room.code}</strong>
              <RoomStatusBadge status={room.status} />
            </header>
            <p>{data.buildings.find(item => item.id === room.buildingId)?.name}</p>
            <p>Tầng {room.floor} · {room.area} m²</p>
            <footer>
              <strong className={styles.price}>{formatMoney(room.monthlyRent)}/tháng</strong>
              <Link className={base.textButton} href={`/owner/v2?m=can-ho-phong&room=${room.id}`}>Chi tiết</Link>
            </footer>
          </article>)}</div>
          <ManagementPagination page={currentPage} pageSize={5} total={filtered.length} onChange={setPage} />
        </>}
      </ManagementCard>
      {roomId && !selectedRoom && <div className={styles.errorBanner} role="alert">Không tìm thấy phòng này. <Link href="/owner/v2?m=can-ho-phong">Đóng chi tiết</Link>
      </div>}
      {selectedRoom && <RoomDetails key={selectedRoom.id} room={selectedRoom} workspace={data} onClose={() => router.push("/owner/v2?m=can-ho-phong", { scroll: false })} />}
    </div>
  );
}
