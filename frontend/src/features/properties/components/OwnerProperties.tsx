"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, FilePlus2, Grid2X2, LayoutList, Search } from "lucide-react";
import { useState } from "react";
import { Button, buttonClasses, Card, Badge } from "@/components/ui";
import { ManagementPagination, ManagementState, ManagementTable } from "@/components/management/ManagementUI";
import { useListingWorkspace } from "@/features/listings/use-listing-workspace";
import { formatMoney } from "@/features/listings/constants";
import { RoomDetails } from "./RoomDetails";
import { RoomStatusBadge, roomStatuses } from "./RoomStatusBadge";
import { cn } from "@/lib/utils";

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

  if (error) {
    return <ManagementState state="error" title="Chưa tải được danh mục phòng" description={error} onRetry={retry} />;
  }
  if (!data) {
    return <ManagementState state="loading" title="Đang tải căn hộ & phòng…" />;
  }

  const filtered = data.rooms.filter(room => {
    const building = data.buildings.find(item => item.id === room.buildingId);
    const hasListing = data.listings.some(
      listing => listing.roomId === room.id && ["published", "needs_update"].includes(listing.status),
    );
    return (
      `${room.code} ${building?.name} ${building?.address}`
        .toLocaleLowerCase("vi-VN")
        .includes(query.trim().toLocaleLowerCase("vi-VN")) &&
      (buildingId === "all" || room.buildingId === buildingId) &&
      (status === "all" || room.status === status) &&
      (floor === "all" || room.floor === Number(floor)) &&
      (listingFilter === "all" || (listingFilter === "yes" ? hasListing : !hasListing))
    );
  });

  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 5)));
  const visible = filtered.slice((currentPage - 1) * 5, currentPage * 5);
  const roomId = params.get("room");
  const selectedRoom = data.rooms.find(room => room.id === roomId);

  const clearFilters = () => {
    setQuery("");
    setBuildingId("all");
    setStatus("all");
    setListingFilter("all");
    setFloor("all");
    setPage(1);
  };

  const resetPage = (set: (value: string) => void, value: string) => {
    set(value);
    setPage(1);
  };

  const stats = [
    { label: "Tòa nhà", value: data.buildings.length },
    { label: "Căn/phòng", value: data.rooms.length },
    { label: "Đang thuê", value: data.rooms.filter(room => room.status === "occupied").length },
    { label: "Còn trống", value: data.rooms.filter(room => room.status === "available").length },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Căn hộ & phòng</h1>
          <p className="text-sm text-slate-500 mt-0.5">Danh mục tài sản và tình trạng khai thác từng chỗ ở.</p>
        </div>
        <Link href="/owner/v2?m=tao-tin" className={buttonClasses({ variant: "orange", size: "md" })}>
          <FilePlus2 size={16} /> Tạo tin cho thuê
        </Link>
      </header>

      {/* Note banner */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-orange-50/80 border border-orange-200/60 text-xs font-medium text-orange-800">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
        Dữ liệu mẫu · {data.rooms.length} căn/phòng trong sổ
      </div>

      {/* Stats deck */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Thống kê nguồn cung">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>{stat.label}</span>
              <Building2 size={16} className="text-orange-500" />
            </div>
            <strong className="text-2xl font-bold text-slate-900 mt-2 block">{stat.value}</strong>
          </Card>
        ))}
      </section>

      {/* Main Table Card */}
      <Card className="p-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Tìm phòng hoặc địa chỉ"
                type="search"
                placeholder="Tìm mã phòng, địa chỉ…"
                value={query}
                onChange={event => resetPage(setQuery, event.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors"
              />
            </div>

            {/* Building filter */}
            <select
              value={buildingId}
              onChange={event => resetPage(setBuildingId, event.target.value)}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Tất cả tòa nhà</option>
              {data.buildings.map(building => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={status}
              onChange={event => resetPage(setStatus, event.target.value)}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Mọi tình trạng</option>
              {Object.entries(roomStatuses).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>

            {/* Listing filter */}
            <select
              value={listingFilter}
              onChange={event => resetPage(setListingFilter, event.target.value)}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Mọi tin đăng</option>
              <option value="yes">Đang có tin</option>
              <option value="no">Chưa có tin</option>
            </select>

            {/* Floor filter */}
            <select
              value={floor}
              onChange={event => resetPage(setFloor, event.target.value)}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Mọi tầng</option>
              {[...new Set(data.rooms.map(room => room.floor))]
                .sort((a, b) => a - b)
                .map(item => (
                  <option key={item} value={item}>
                    Tầng {item}
                  </option>
                ))}
            </select>

            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-500">
              Đặt lại
            </Button>
          </div>

          {/* View switcher */}
          <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200/60" aria-label="Cách xem phòng">
            <button
              type="button"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                view === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
              )}
            >
              <LayoutList size={14} /> Danh sách
            </button>
            <button
              type="button"
              aria-pressed={view === "floor"}
              onClick={() => setView("floor")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                view === "floor" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
              )}
            >
              <Grid2X2 size={14} /> Sơ đồ tầng
            </button>
          </div>
        </div>

        {/* Content View */}
        {!filtered.length ? (
          <ManagementState
            state="empty"
            title="Không có phòng khớp bộ lọc"
            description="Thử đổi từ khóa, tòa nhà hoặc tình trạng phòng."
          />
        ) : view === "floor" ? (
          <div className="space-y-6">
            {data.buildings.map(building => {
              const rooms = filtered.filter(room => room.buildingId === building.id);
              if (rooms.length === 0) return null;
              return (
                <section key={building.id} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <strong className="text-sm font-semibold text-slate-800">{building.name}</strong>
                    <span className="text-xs text-slate-400">{rooms.length} căn/phòng</span>
                  </div>
                  {[...new Set(rooms.map(room => room.floor))]
                    .sort((a, b) => b - a)
                    .map(item => (
                      <div key={item} className="space-y-2">
                        <span className="text-xs font-semibold text-slate-400">Tầng {item}</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                          {rooms
                            .filter(room => room.floor === item)
                            .map(room => (
                              <button
                                type="button"
                                key={room.id}
                                onClick={() => router.push(`/owner/v2?m=can-ho-phong&room=${room.id}`)}
                                className="p-3 rounded-xl border border-slate-200 bg-white hover:border-orange-300 hover:shadow-xs transition-all text-left flex flex-col justify-between gap-2"
                              >
                                <div className="flex items-center justify-between">
                                  <strong className="text-sm font-bold text-slate-900">{room.code}</strong>
                                  <RoomStatusBadge status={room.status} />
                                </div>
                                <small className="text-[11px] text-slate-500">
                                  {room.area} m² · {formatMoney(room.monthlyRent)}
                                </small>
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                </section>
              );
            })}
          </div>
        ) : (
          <>
            <div className="hidden sm:block">
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
                <tbody>
                  {visible.map(room => {
                    const listings = data.listings.filter(listing => listing.roomId === room.id);
                    const building = data.buildings.find(item => item.id === room.buildingId);
                    return (
                      <tr key={room.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-lg overflow-hidden relative shrink-0 bg-slate-100">
                              <Image
                                src={room.photos[0]}
                                alt={`Phòng ${room.code}`}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <strong className="text-sm font-bold text-slate-900 block">{room.code}</strong>
                              <small className="text-xs text-slate-400">
                                {building?.name}
                                <br />
                                Tầng {room.floor} · {room.area} m²
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="font-semibold text-slate-900 block">{formatMoney(room.monthlyRent)}</span>
                          <small className="text-slate-400 text-[11px]">Cọc {room.deposit}</small>
                        </td>
                        <td>
                          <RoomStatusBadge status={room.status} />
                        </td>
                        <td>
                          {listings.length ? (
                            <Link
                              className="text-xs font-medium text-orange-600 hover:text-orange-700"
                              href={`/owner/v2?m=tin-bat-dong-san&listing=${listings[0].id}`}
                            >
                              {listings.length} tin liên kết
                            </Link>
                          ) : (
                            <span className="text-xs text-slate-400">Chưa có tin</span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/owner/v2?m=can-ho-phong&room=${room.id}`}
                              className={buttonClasses({ variant: "outline", size: "sm" })}
                            >
                              Chi tiết
                            </Link>
                            <Link
                              href={`/owner/v2?m=tao-tin&room=${room.id}`}
                              className={buttonClasses({ variant: "ghost", size: "sm", className: "text-orange-600 hover:text-orange-700" })}
                            >
                              Tạo tin
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </ManagementTable>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden flex flex-col gap-3">
              {visible.map(room => (
                <Card key={room.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-slate-900">{room.code}</strong>
                    <RoomStatusBadge status={room.status} />
                  </div>
                  <p className="text-xs text-slate-500">
                    {data.buildings.find(item => item.id === room.buildingId)?.name} · Tầng {room.floor} · {room.area} m²
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <strong className="text-sm font-bold text-slate-900">{formatMoney(room.monthlyRent)}/tháng</strong>
                    <Link
                      href={`/owner/v2?m=can-ho-phong&room=${room.id}`}
                      className={buttonClasses({ variant: "outline", size: "sm" })}
                    >
                      Chi tiết
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-4">
              <ManagementPagination page={currentPage} pageSize={5} total={filtered.length} onChange={setPage} />
            </div>
          </>
        )}
      </Card>

      {roomId && !selectedRoom && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700" role="alert">
          Không tìm thấy phòng này.{" "}
          <Link href="/owner/v2?m=can-ho-phong" className="font-semibold underline ml-1">
            Đóng chi tiết
          </Link>
        </div>
      )}

      {selectedRoom && (
        <RoomDetails
          key={selectedRoom.id}
          room={selectedRoom}
          workspace={data}
          onClose={() => router.push("/owner/v2?m=can-ho-phong", { scroll: false })}
        />
      )}
    </div>
  );
}
