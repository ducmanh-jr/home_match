"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { Button, buttonClasses, Badge } from "@/components/ui";
import { ManagementDialog } from "@/components/management/ManagementUI";
import { useOwnerPreview } from "@/features/dashboard/use-owner-preview";
import { formatMoney } from "@/features/listings/constants";
import type { ListingWorkspace } from "@/features/listings/types";
import type { PropertyRoom } from "../types";
import { RoomStatusBadge } from "./RoomStatusBadge";
import { cn } from "@/lib/utils";

const roomTabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "lease", label: "Hợp đồng & thu tiền" },
  { id: "history", label: "Lịch sử" },
];

export function RoomDetails({
  room,
  workspace,
  onClose,
}: {
  room: PropertyRoom;
  workspace: ListingWorkspace;
  onClose: () => void;
}) {
  const [tab, setTab] = useState("overview");
  const { data: ledger, error } = useOwnerPreview();
  const building = workspace.buildings.find(item => item.id === room.buildingId);
  const listings = workspace.listings.filter(listing => listing.roomId === room.id);
  const lease = ledger?.leases.find(item => item.roomId === room.id);
  const invoices = ledger?.invoices.filter(item => item.leaseId === lease?.id) ?? [];

  return (
    <ManagementDialog
      open
      title={`Căn/phòng ${room.code}`}
      onClose={onClose}
      wide
      actions={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Đóng
          </Button>
          <Link
            href={`/owner/v2?m=tao-tin&room=${room.id}`}
            className={buttonClasses({ variant: "orange", size: "sm" })}
          >
            <FilePlus2 size={14} /> Tạo tin cho căn
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        {/* Tab navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/60" role="tablist" aria-label="Chi tiết phòng">
          {roomTabs.map((item, index) => (
            <button
              type="button"
              key={item.id}
              id={`room-tab-${item.id}`}
              role="tab"
              tabIndex={tab === item.id ? 0 : -1}
              aria-selected={tab === item.id}
              aria-controls="room-panel"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all text-center",
                tab === item.id ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-800",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${tab}`}>
          {tab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100">
                  <Image
                    src={room.photos[0]}
                    alt={`Phòng ${room.code}`}
                    fill
                    sizes="(max-width: 599px) 85vw, 450px"
                    className="object-cover"
                  />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <dt className="text-slate-400 font-medium">Tòa nhà</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{building?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Địa chỉ</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{building?.address}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Tình trạng</dt>
                    <dd className="mt-1">
                      <RoomStatusBadge status={room.status} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Loại phòng</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{room.kind}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Phòng ngủ / tắm</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">
                      {room.bedrooms} / {room.bathrooms}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Tầng / Diện tích</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">
                      Tầng {room.floor} · {room.area} m²
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Giá thuê</dt>
                    <dd className="text-orange-600 font-bold mt-0.5">{formatMoney(room.monthlyRent)}/tháng</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Tiền cọc</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{room.deposit}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-800 mb-2">Tiện ích & nội thất</h3>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.map(item => (
                    <Badge key={item} tone="default" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {room.description && (
                <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
                  {room.description}
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold text-slate-800 mb-2">Tin liên kết ({listings.length})</h3>
                {listings.length ? (
                  listings.map(listing => (
                    <div key={listing.id} className="flex items-center gap-2">
                      <Link
                        href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}
                        className="text-xs text-orange-600 hover:text-orange-700 font-medium underline"
                      >
                        {listing.title}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Căn này chưa có tin cho thuê.</p>
                )}
              </div>
            </div>
          )}

          {tab === "lease" && (
            <div className="space-y-4">
              {error ? (
                <p className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700" role="alert">
                  {error}
                </p>
              ) : lease ? (
                <>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <dt className="text-slate-400">Người thuê</dt>
                      <dd className="text-slate-800 font-semibold mt-0.5">{lease.tenantName}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Tiền thuê</dt>
                      <dd className="text-slate-800 font-semibold mt-0.5">{formatMoney(lease.monthlyRent)}/tháng</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Tiền cọc giữ hộ</dt>
                      <dd className="text-slate-800 font-semibold mt-0.5">{formatMoney(lease.deposit)}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Đã thu theo hóa đơn</dt>
                      <dd className="text-emerald-600 font-semibold mt-0.5">
                        {formatMoney(invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0))}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Còn phải thu</dt>
                      <dd className="text-rose-600 font-semibold mt-0.5">
                        {formatMoney(
                          invoices.reduce((sum, invoice) => sum + Math.max(0, invoice.amount - invoice.paidAmount), 0),
                        )}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href={`/owner/v2?m=hop-dong&lease=${lease.id}`}
                      className={buttonClasses({ variant: "outline", size: "sm" })}
                    >
                      Mở hợp đồng
                    </Link>
                    <Link
                      href={`/owner/v2?m=thu-tien&lease=${lease.id}`}
                      className={buttonClasses({ variant: "outline", size: "sm" })}
                    >
                      Mở thu tiền
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400">
                  {ledger ? "Căn này chưa có hợp đồng thuê trong dữ liệu mẫu." : "Đang tải thông tin hợp đồng…"}
                </p>
              )}
            </div>
          )}

          {tab === "history" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Lịch sử mẫu gắn với căn/phòng này.</p>
              <ul className="space-y-2 border-l-2 border-slate-200 pl-4 py-1">
                <li className="text-xs text-slate-700">
                  <span className="font-semibold block">Giá thuê hiện tại: {formatMoney(room.monthlyRent)}/tháng</span>
                  <small className="text-slate-400">Dữ liệu sổ phòng mẫu</small>
                </li>
                {lease && (
                  <li className="text-xs text-slate-700">
                    <span className="font-semibold block">Hợp đồng của {lease.tenantName}</span>
                    <small className="text-slate-400">Mã {lease.id}</small>
                  </li>
                )}
                {listings.map(listing => (
                  <li key={listing.id} className="text-xs">
                    <Link
                      href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`}
                      className="font-medium text-orange-600 hover:text-orange-700 block"
                    >
                      {listing.title}
                    </Link>
                    <small className="text-slate-400">
                      Cập nhật {new Date(listing.updatedAt).toLocaleDateString("vi-VN")}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </ManagementDialog>
  );
}
