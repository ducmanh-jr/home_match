"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, FilePlus2, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, buttonClasses, Card, Badge } from "@/components/ui";
import {
  ManagementBadge,
  ManagementCard,
  ManagementDialog,
  ManagementState,
  ManagementTable,
  ManagementToast,
} from "@/components/management/ManagementUI";
import { ownerModuleHref } from "@/components/layout/owner-navigation";
import { useOwnerPreview } from "../use-owner-preview";
import type { OwnerRoom } from "../types";
import { cn } from "@/lib/utils";

const statuses = {
  available: { label: "Còn trống", tone: "info" as const },
  occupied: { label: "Đang thuê", tone: "success" as const },
  reserved: { label: "Giữ chỗ", tone: "warning" as const },
};
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

  const filteredRooms =
    data?.rooms.filter(room => {
      const building = data.buildings.find(item => item.id === room.buildingId);
      return (
        (buildingId === "all" || room.buildingId === buildingId) &&
        (status === "all" || room.status === status) &&
        `${room.code} ${building?.name ?? ""}`.toLocaleLowerCase("vi-VN").includes(normalizedQuery)
      );
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
    setSelectedIds(previous => (previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]));
  }

  if (error) {
    return <ManagementState state="error" title="Chưa tải được dữ liệu mẫu" description={error} onRetry={retry} />;
  }
  if (!data) {
    return <ManagementState state="loading" title="Đang tải dữ liệu mẫu…" />;
  }

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Mẫu giao diện quản trị</h1>
          <p className="text-sm text-slate-500 mt-0.5">Bảng, bộ lọc và trạng thái dùng chung cho khu vực chủ nhà.</p>
        </div>
        <Link
          href="/owner/v2"
          className={buttonClasses({ variant: "outline", size: "sm" })}
        >
          Về tổng quan
        </Link>
      </header>

      <div className="p-3.5 rounded-lg bg-orange-50/70 border border-orange-200/60 text-xs text-orange-900 font-medium">
        Trang mẫu phục vụ duyệt giao diện. Các thao tác dưới đây chỉ sử dụng dữ liệu mẫu và không thay đổi thông tin
        phòng.
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={event => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Tìm mã phòng hoặc tòa nhà"
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
            {data.buildings.map(building => (
              <option value={building.id} key={building.id}>
                {building.name}
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
            <option value="all">Mọi tình trạng</option>
            {Object.entries(statuses).map(([id, item]) => (
              <option value={id} key={id}>
                {item.label}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setBuildingId("all");
              setStatus("all");
              setPage(1);
            }}
            className="text-slate-500"
          >
            Đặt lại
          </Button>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-2.5 mb-4 rounded-lg bg-orange-50 border border-orange-200 text-xs">
            <span className="font-semibold text-orange-900">Đã chọn {selectedIds.length} căn/phòng</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])} className="text-orange-700">
              Bỏ chọn
            </Button>
          </div>
        )}

        {filteredRooms.length === 0 ? (
          <ManagementState
            state="empty"
            title="Không có phòng phù hợp"
            description="Thử thay đổi từ khóa, tòa nhà hoặc tình trạng phòng."
          />
        ) : (
          <>
            <div className="hidden sm:block">
              <ManagementTable label="Danh sách phòng mẫu">
                <thead>
                  <tr>
                    <th scope="col" className="w-10">
                      <input
                        ref={selectAll}
                        type="checkbox"
                        aria-label="Chọn tất cả phòng trên trang này"
                        checked={allChecked}
                        onChange={() =>
                          setSelectedIds(previous =>
                            allChecked
                              ? previous.filter(id => !visibleRooms.some(room => room.id === id))
                              : [...new Set([...previous, ...visibleRooms.map(room => room.id)])],
                          )
                        }
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                    </th>
                    <th scope="col">Căn/phòng</th>
                    <th scope="col">Tòa nhà</th>
                    <th scope="col">Diện tích</th>
                    <th scope="col">Giá thuê/tháng</th>
                    <th scope="col">Tình trạng</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRooms.map(room => (
                    <tr key={room.id}>
                      <td>
                        <input
                          type="checkbox"
                          aria-label={`Chọn phòng ${room.code}`}
                          checked={selectedIds.includes(room.id)}
                          onChange={() => toggleRoom(room.id)}
                          className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                        />
                      </td>
                      <td>
                        <strong className="text-sm font-semibold text-slate-900 block">{room.code}</strong>
                        <small className="text-xs text-slate-400 font-mono">{room.id}</small>
                      </td>
                      <td className="text-slate-600">
                        {data.buildings.find(building => building.id === room.buildingId)?.name}
                      </td>
                      <td className="text-slate-600">{room.area} m²</td>
                      <td className="font-semibold text-slate-900">{money.format(room.monthlyRent)}</td>
                      <td>
                        <ManagementBadge tone={statuses[room.status].tone}>
                          {statuses[room.status].label}
                        </ManagementBadge>
                      </td>
                      <td>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRoom(room)}
                          aria-label={`Xem chi tiết ${room.code}`}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ManagementTable>
            </div>

            <div className="sm:hidden flex flex-col gap-3">
              {visibleRooms.map(room => (
                <Card key={room.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-slate-900">{room.code}</strong>
                    <ManagementBadge tone={statuses[room.status].tone}>
                      {statuses[room.status].label}
                    </ManagementBadge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {data.buildings.find(building => building.id === room.buildingId)?.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {room.area} m² · {money.format(room.monthlyRent)}/tháng
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-1.5 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(room.id)}
                        onChange={() => toggleRoom(room.id)}
                        className="rounded border-slate-300 text-orange-600"
                      />
                      Chọn
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRoom(room)}
                      className="text-orange-600"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        <footer className="px-4 py-3 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span aria-live="polite">
            {filteredRooms.length
              ? `Hiện ${(currentPage - 1) * 4 + 1}–${Math.min(currentPage * 4, filteredRooms.length)} / ${
                  filteredRooms.length
                } căn/phòng`
              : "0 căn/phòng"}
          </span>
          <nav className="flex items-center gap-1.5" aria-label="Phân trang phòng mẫu">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              aria-label="Trang trước"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Trang {currentPage}/{totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              aria-label="Trang sau"
            >
              <ChevronRight size={15} />
            </button>
          </nav>
        </footer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Màu trạng thái</h2>
          <div className="flex flex-wrap gap-2">
            <ManagementBadge tone="success">Đang thuê</ManagementBadge>
            <ManagementBadge tone="info">Còn trống</ManagementBadge>
            <ManagementBadge tone="warning">Giữ chỗ</ManagementBadge>
            <ManagementBadge tone="error">Quá hạn</ManagementBadge>
            <ManagementBadge>Bản nháp</ManagementBadge>
          </div>

          <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 pt-2">Nút hành động</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="orange" size="sm" onClick={() => setToast("Thông báo mẫu đã hiển thị.")}>
              Hiện thông báo
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedRoom(data.rooms[0] ?? null)}>
              Mở cửa sổ
            </Button>
            <Button variant="outline" size="sm" disabled>
              Chưa khả dụng
            </Button>
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-semibold text-slate-900">Trạng thái nội dung</h2>
            <div className="inline-flex p-0.5 rounded-lg bg-slate-100 text-xs">
              {(["loading", "empty", "error"] as const).map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setStatePreview(item)}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-medium transition-colors",
                    statePreview === item ? "bg-white text-slate-900 shadow-xs" : "text-slate-500",
                  )}
                >
                  {item === "loading" ? "Đang tải" : item === "empty" ? "Trống" : "Có lỗi"}
                </button>
              ))}
            </div>
          </div>
          <ManagementState
            state={statePreview}
            title={
              statePreview === "loading"
                ? "Đang tải dữ liệu…"
                : statePreview === "empty"
                ? "Chưa có dữ liệu"
                : "Không thể tải dữ liệu"
            }
            description={
              statePreview === "error"
                ? "Đây là mẫu hiển thị khi mất kết nối. Bạn có thể thử lại."
                : statePreview === "empty"
                ? "Thông tin sẽ xuất hiện khi có dữ liệu phù hợp."
                : undefined
            }
            onRetry={
              statePreview === "error"
                ? () => {
                    retry();
                    setStatePreview("empty");
                  }
                : undefined
            }
          />
        </Card>
      </div>

      <ManagementDialog
        open={selectedRoom !== null}
        title={selectedRoom ? `Phòng ${selectedRoom.code}` : "Chi tiết phòng"}
        onClose={() => setSelectedRoom(null)}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedRoom(null)}>
              Đóng
            </Button>
            <Link
              href={ownerModuleHref("tao-tin")}
              className={buttonClasses({ variant: "orange", size: "sm" })}
            >
              <FilePlus2 size={14} /> Đến tạo tin
            </Link>
          </>
        }
      >
        {selectedRoom && (
          <dl className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <dt className="text-slate-400">Tòa nhà</dt>
              <dd className="font-semibold text-slate-800 mt-0.5">
                {data.buildings.find(building => building.id === selectedRoom.buildingId)?.name}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Diện tích</dt>
              <dd className="font-semibold text-slate-800 mt-0.5">{selectedRoom.area} m²</dd>
            </div>
            <div>
              <dt className="text-slate-400">Giá thuê/tháng</dt>
              <dd className="font-bold text-orange-600 mt-0.5">{money.format(selectedRoom.monthlyRent)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Tình trạng</dt>
              <dd className="mt-1">
                <ManagementBadge tone={statuses[selectedRoom.status].tone}>
                  {statuses[selectedRoom.status].label}
                </ManagementBadge>
              </dd>
            </div>
          </dl>
        )}
      </ManagementDialog>

      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
