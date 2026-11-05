"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, FilePlus2, Grid2X2, LayoutList, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, buttonClasses, Card } from "@/components/ui";
import {
  ManagementCard,
  ManagementDialog,
  ManagementPagination,
  ManagementState,
  ManagementTable,
  ManagementToast,
} from "@/components/management/ManagementUI";
import { useListingWorkspace } from "../use-listing-workspace";
import { setOwnerListingStatus } from "../api";
import { formatMoney, listingStatuses } from "../constants";
import { listingQuality } from "../form";
import { ListingStatusBadge } from "./ListingStatusBadge";
import { ListingDetails } from "./ListingDetails";
import { cn } from "@/lib/utils";

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
  const [confirmation, setConfirmation] = useState<{ ids: string[]; status: "hidden" | "pending_review" } | null>(null);
  const [busy, setBusy] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const selectAll = useRef<HTMLInputElement>(null);

  const filtered = (data?.listings ?? [])
    .filter(listing => {
      const room = data?.rooms.find(item => item.id === listing.roomId);
      return (
        `${listing.title} ${listing.code}`.toLocaleLowerCase("vi-VN").includes(query.trim().toLocaleLowerCase("vi-VN")) &&
        (status === "all" || listing.status === status) &&
        (buildingId === "all" || room?.buildingId === buildingId)
      );
    })
    .sort((a, b) =>
      sort === "views"
        ? b.views - a.views
        : sort === "quality"
        ? listingQuality(b) - listingQuality(a)
        : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
    );

  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 6)));
  const visible = filtered.slice((currentPage - 1) * 6, currentPage * 6);
  const allChecked = visible.length > 0 && visible.every(listing => selectedIds.includes(listing.id));
  const someChecked = visible.some(listing => selectedIds.includes(listing.id));

  useEffect(() => {
    if (selectAll.current) selectAll.current.indeterminate = someChecked && !allChecked;
  }, [someChecked, allChecked, view]);

  if (error) {
    return <ManagementState state="error" title="Chưa tải được tin đăng" description={error} onRetry={retry} />;
  }
  if (!data) {
    return <ManagementState state="loading" title="Đang tải tin bất động sản…" />;
  }

  const listingId = params.get("listing");
  const detail = data.listings.find(listing => listing.id === listingId);

  if (listingId) {
    return detail ? (
      <ListingDetails key={detail.id} listing={detail} workspace={data} tabId={params.get("tab")} />
    ) : (
      <ManagementState
        state="empty"
        title="Không tìm thấy tin đăng"
        description="Tin này không có trong sổ của tài khoản đang dùng."
        retryLabel="Về danh sách tin"
        onRetry={() => window.location.assign("/owner/v2?m=tin-bat-dong-san")}
      />
    );
  }

  const toggle = (id: string) =>
    setSelectedIds(previous => (previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]));

  const selectedActive = data.listings
    .filter(listing => selectedIds.includes(listing.id) && ["published", "needs_update"].includes(listing.status))
    .map(listing => listing.id);

  async function confirmStatus() {
    if (!confirmation || busy) return;
    setBusy(true);
    setMutationError(null);
    try {
      await setOwnerListingStatus(ownerId, confirmation.ids, confirmation.status);
      setConfirmation(null);
      setSelectedIds([]);
      setToast("Đã cập nhật trạng thái tin mẫu.");
      retry();
    } catch (reason) {
      setMutationError(reason instanceof Error ? reason.message : "Không cập nhật được tin.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tin bất động sản</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý nội dung và theo dõi hiệu quả từng tin cho thuê.</p>
        </div>
        <Link href="/owner/v2?m=tao-tin" className={buttonClasses({ variant: "orange", size: "md" })}>
          <FilePlus2 size={16} /> Tạo tin cho thuê
        </Link>
      </header>

      {/* Note banner */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-orange-50/80 border border-orange-200/60 text-xs font-medium text-orange-800">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
        Dữ liệu mẫu · Các thay đổi được lưu trên trình duyệt này
      </div>

      {/* Stats deck */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Thống kê tin đăng">
        {[
          { label: "Tổng tin", count: data.listings.length },
          {
            label: "Đang hiển thị",
            count: data.listings.filter(item => ["published", "needs_update"].includes(item.status)).length,
          },
          { label: "Bản nháp", count: data.listings.filter(item => item.status === "draft").length },
          { label: "Chờ duyệt", count: data.listings.filter(item => item.status === "pending_review").length },
        ].map(item => (
          <Card key={item.label} className="p-4 flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-medium">{item.label}</span>
            <strong className="text-2xl font-bold text-slate-900 mt-2 block">{item.count}</strong>
          </Card>
        ))}
      </section>

      {/* Main Card */}
      <Card className="p-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                aria-label="Tìm tiêu đề hoặc mã tin"
                placeholder="Tìm tiêu đề, mã tin…"
                value={query}
                onChange={event => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors"
              />
            </div>

            <select
              value={buildingId}
              onChange={event => {
                setBuildingId(event.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Tất cả tòa nhà</option>
              {data.buildings.map(item => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={event => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="all">Mọi trạng thái</option>
              {Object.entries(listingStatuses).map(([id, item]) => (
                <option value={id} key={id}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={event => {
                setSort(event.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="updated">Cập nhật gần nhất</option>
              <option value="views">Lượt xem nhiều nhất</option>
              <option value="quality">Chất lượng nội dung</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setBuildingId("all");
                setStatus("all");
                setSort("updated");
                setPage(1);
              }}
              className="text-slate-500"
            >
              Đặt lại
            </Button>
          </div>

          {/* View switcher */}
          <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200/60" aria-label="Cách xem tin">
            <button
              type="button"
              aria-label="Dạng danh sách"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
              )}
            >
              <LayoutList size={15} />
            </button>
            <button
              type="button"
              aria-label="Dạng lưới"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
              )}
            >
              <Grid2X2 size={15} />
            </button>
          </div>
        </div>

        {/* Selected bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-orange-50 border border-orange-200 text-xs">
            <span className="font-semibold text-orange-900">Đã chọn {selectedIds.length} tin</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!selectedActive.length}
                onClick={() => {
                  setMutationError(null);
                  setConfirmation({ ids: selectedActive, status: "hidden" });
                }}
              >
                Tạm ẩn ({selectedActive.length})
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                Bỏ chọn
              </Button>
            </div>
          </div>
        )}

        {/* List Content */}
        {!filtered.length ? (
          <ManagementState
            state="empty"
            title="Không có tin nào khớp bộ lọc"
            description="Thử đổi từ khóa hoặc trạng thái tin đăng."
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map(listing => (
              <Card key={listing.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <Link
                  href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}
                  className="aspect-video relative block bg-slate-100"
                >
                  {listing.photos[0] && (
                    <Image
                      src={listing.photos[0].url}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 599px) 85vw, 350px"
                      className="object-cover"
                      unoptimized={listing.photos[0].url.startsWith("data:")}
                    />
                  )}
                  <span className="absolute top-2.5 right-2.5">
                    <ListingStatusBadge status={listing.status} />
                  </span>
                </Link>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>{listing.code}</span>
                      <span>{listingQuality(listing)}/100 điểm</span>
                    </div>
                    <h2 className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-orange-600 transition-colors">
                      <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>{listing.title}</Link>
                    </h2>
                    <strong className="text-base font-bold text-orange-600 mt-1 block">
                      {formatMoney(listing.monthlyRent)}/tháng
                    </strong>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {listing.ward} · {listing.area} m²
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                    <span>{listing.views} xem · {listing.saves} lưu</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(listing.id)}
                        onChange={() => toggle(listing.id)}
                        aria-label={`Chọn ${listing.title}`}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      Chọn
                    </label>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="hidden sm:block">
              <ManagementTable label="Danh sách tin đăng">
                <thead>
                  <tr>
                    <th scope="col" className="w-10">
                      <input
                        ref={selectAll}
                        type="checkbox"
                        aria-label="Chọn các tin trên trang này"
                        checked={allChecked}
                        onChange={() =>
                          setSelectedIds(previous =>
                            allChecked
                              ? previous.filter(id => !visible.some(item => item.id === id))
                              : [...new Set([...previous, ...visible.map(item => item.id)])],
                          )
                        }
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                    </th>
                    <th scope="col">Tin đăng</th>
                    <th scope="col">Giá / Căn liên kết</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Hiệu quả</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(listing => (
                    <tr key={listing.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(listing.id)}
                          onChange={() => toggle(listing.id)}
                          aria-label={`Chọn ${listing.title}`}
                          className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                        />
                      </td>
                      <td>
                        <Link
                          href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden relative shrink-0 bg-slate-100">
                            {listing.photos[0] && (
                              <Image
                                src={listing.photos[0].url}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                                unoptimized={listing.photos[0].url.startsWith("data:")}
                              />
                            )}
                          </div>
                          <div>
                            <strong className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors block line-clamp-1">
                              {listing.title}
                            </strong>
                            <small className="text-xs text-slate-400">
                              {listing.code} · {listingQuality(listing)}/100 điểm
                            </small>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <strong className="text-sm font-semibold text-slate-900 block">
                          {formatMoney(listing.monthlyRent)}
                        </strong>
                        <small className="text-xs text-slate-400">
                          {data.rooms.find(room => room.id === listing.roomId)?.code || "Chưa gắn phòng"}
                        </small>
                      </td>
                      <td>
                        <ListingStatusBadge status={listing.status} />
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-700">
                          <Eye size={13} className="text-slate-400" /> {listing.views}
                        </span>
                        <small className="text-xs text-slate-400 block">{listing.saves} lượt lưu</small>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/owner/v2?m=tao-tin&edit=${listing.id}`}
                            className={buttonClasses({ variant: "outline", size: "sm" })}
                          >
                            {listing.status === "draft" ? "Tiếp tục" : "Sửa tin"}
                          </Link>
                          {["published", "needs_update", "hidden"].includes(listing.status) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setMutationError(null);
                                setConfirmation({
                                  ids: [listing.id],
                                  status: listing.status === "hidden" ? "pending_review" : "hidden",
                                });
                              }}
                              className={listing.status === "hidden" ? "text-emerald-600" : "text-slate-500"}
                            >
                              {listing.status === "hidden" ? "Đăng lại" : "Tạm ẩn"}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ManagementTable>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden flex flex-col gap-3">
              {visible.map(listing => (
                <Card key={listing.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{listing.code}</span>
                    <ListingStatusBadge status={listing.status} />
                  </div>
                  <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}>
                    <strong className="text-sm font-semibold text-slate-900 block hover:text-orange-600">
                      {listing.title}
                    </strong>
                  </Link>
                  <p className="text-xs text-slate-500">
                    {formatMoney(listing.monthlyRent)}/tháng · {listing.area} m²
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-1.5 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(listing.id)}
                        onChange={() => toggle(listing.id)}
                        className="rounded border-slate-300 text-orange-600"
                      />
                      Chọn tin
                    </label>
                    <Link
                      href={`/owner/v2?m=tao-tin&edit=${listing.id}`}
                      className={buttonClasses({ variant: "outline", size: "sm" })}
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="mt-4">
          <ManagementPagination page={currentPage} pageSize={6} total={filtered.length} onChange={setPage} />
        </div>
      </Card>

      {/* Confirmation Dialog */}
      <ManagementDialog
        open={confirmation !== null}
        title={confirmation?.status === "hidden" ? "Tạm ẩn tin đăng?" : "Gửi đăng lại tin?"}
        onClose={() => {
          if (!busy) setConfirmation(null);
        }}
        actions={
          <>
            <Button variant="outline" size="sm" disabled={busy} onClick={() => setConfirmation(null)}>
              Hủy
            </Button>
            <Button variant="orange" size="sm" disabled={busy} onClick={confirmStatus}>
              {busy ? "Đang lưu…" : "Xác nhận"}
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-500 leading-relaxed">
          {confirmation?.status === "hidden"
            ? `Tạm ẩn ${confirmation.ids.length} tin trong dữ liệu mẫu. Bạn có thể gửi đăng lại sau.`
            : "Tin mẫu sẽ chuyển sang Chờ duyệt; không tự hiển thị công khai."}
        </p>
        {mutationError && (
          <p className="p-3 mt-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700" role="alert">
            {mutationError}
          </p>
        )}
      </ManagementDialog>

      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
