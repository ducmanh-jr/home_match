"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, Eye, Pencil } from "lucide-react";
import { Button, buttonClasses, Card, Badge } from "@/components/ui";
import { ManagementDialog, ManagementToast } from "@/components/management/ManagementUI";
import { ListingStatusBadge } from "./ListingStatusBadge";
import { ListingPreview } from "./ListingPreview";
import { formatMoney } from "../constants";
import { listingQuality } from "../form";
import type { ListingWorkspace, OwnerListing } from "../types";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "content", label: "Nội dung tin" },
  { id: "photos", label: "Hình ảnh" },
  { id: "costs", label: "Giá & chi phí" },
  { id: "performance", label: "Hiệu quả" },
  { id: "leads", label: "Khách quan tâm" },
  { id: "history", label: "Lịch sử" },
];

export function ListingDetails({
  listing,
  workspace,
  tabId,
}: {
  listing: OwnerListing;
  workspace: ListingWorkspace;
  tabId?: string | null;
}) {
  const tab = tabs.some(item => item.id === tabId) ? tabId : "overview";
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const room = workspace.rooms.find(item => item.id === listing.roomId);
  const leads = workspace.leads.filter(lead => lead.listingId === listing.id);
  const metrics = [
    { label: "Lượt xem", value: listing.views },
    { label: "Lượt lưu", value: listing.saves },
    { label: "Khách quan tâm", value: leads.length },
    { label: "Lịch xem", value: leads.filter(lead => lead.viewingAt).length },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Back button */}
      <div>
        <Link
          href="/owner/v2?m=tin-bat-dong-san"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} /> Danh sách tin bất động sản
        </Link>
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ListingStatusBadge status={listing.status} />
            <span className="text-xs text-slate-400 font-mono">{listing.code}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {listing.title || "Tin chưa đặt tiêu đề"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {[listing.ward, listing.city].filter(Boolean).join(", ")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
            <Eye size={14} /> Xem trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `${window.location.origin}/owner/v2?m=tin-bat-dong-san&listing=${listing.id}`,
                );
                setToast("Đã sao chép liên kết nội bộ khu quản trị.");
              } catch {
                setToast("Không sao chép được. Bạn có thể sao chép URL trên thanh địa chỉ.");
              }
            }}
            title="Sao chép liên kết nội bộ"
          >
            <Copy size={14} /> Sao chép
          </Button>
          <Link
            href={`/owner/v2?m=tao-tin&edit=${listing.id}`}
            className={buttonClasses({ variant: "orange", size: "sm" })}
          >
            <Pencil size={14} /> Chỉnh sửa tin
          </Link>
        </div>
      </header>

      {/* Main card with tabs */}
      <Card className="p-5">
        <nav
          className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/60 overflow-x-auto pb-1 mb-5"
          aria-label="Chi tiết tin đăng"
        >
          {tabs.map(item => (
            <Link
              key={item.id}
              href={`/owner/v2?m=tin-bat-dong-san&listing=${listing.id}&tab=${item.id}`}
              scroll={false}
              className={cn(
                "py-1.5 px-3 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                tab === item.id
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-800",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          {tab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100">
                  {listing.photos[0] && (
                    <Image
                      src={listing.photos[0].url}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 599px) 85vw, 620px"
                      className="object-cover"
                      unoptimized={listing.photos[0].url.startsWith("data:")}
                    />
                  )}
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <dt className="text-slate-400 font-medium">Giá thuê</dt>
                    <dd className="text-orange-600 font-bold mt-0.5">{formatMoney(listing.monthlyRent)}/tháng</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Tiền cọc</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{listing.deposit || "Chưa khai"}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Diện tích</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{listing.area || "—"} m²</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Loại hình</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{listing.kind || "Chưa khai"}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Chất lượng nội dung</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{listingQuality(listing)}/100</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Căn liên kết</dt>
                    <dd className="mt-0.5">
                      {room ? (
                        <Link
                          href={`/owner/v2?m=can-ho-phong&room=${room.id}`}
                          className="text-orange-600 font-semibold underline"
                        >
                          {room.code}
                        </Link>
                      ) : (
                        <span className="text-slate-400">Chưa gắn căn/phòng</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-800 mb-2">Tiện ích</h3>
                <div className="flex flex-wrap gap-1.5">
                  {listing.amenities.map(item => (
                    <Badge key={item} tone="default" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
                {listing.description || "Chưa có mô tả."}
              </p>
            </div>
          )}

          {tab === "content" && (
            <div className="space-y-4 text-xs">
              <div>
                <h2 className="font-semibold text-slate-900 mb-1">Nội dung tin</h2>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
                  {listing.description || "Chưa có mô tả."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Nội quy</h3>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
                  {listing.rules || "Chưa khai nội quy."}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <dt className="text-slate-400">Vị trí công khai</dt>
                  <dd className="text-slate-800 font-semibold mt-0.5">
                    {listing.ward}, {listing.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Địa chỉ vận hành</dt>
                  <dd className="text-slate-800 font-semibold mt-0.5">{listing.address}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Người liên hệ</dt>
                  <dd className="text-slate-800 font-semibold mt-0.5">{listing.contactName}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Điện thoại</dt>
                  <dd className="text-slate-800 font-semibold mt-0.5">{listing.contactPhone}</dd>
                </div>
              </dl>
              <p className="text-slate-400 text-[11px]">
                Địa chỉ đầy đủ và số điện thoại ở đây dành cho chủ nhà quản lý.
              </p>
            </div>
          )}

          {tab === "photos" && (
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-slate-900">Hình ảnh ({listing.photos.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {listing.photos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.id}
                    onClick={() => setPhotoIndex(index)}
                    className="aspect-video relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group text-left"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      sizes="(max-width: 599px) 40vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      unoptimized={photo.url.startsWith("data:")}
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium">
                      {index === 0 ? "Ảnh bìa" : `Ảnh ${index + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "costs" && (
            <div className="space-y-3 text-xs">
              <h2 className="font-semibold text-slate-900">Giá thuê & chi phí</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {[
                  ["Giá thuê/tháng", formatMoney(listing.monthlyRent)],
                  ["Tiền cọc", listing.deposit],
                  ["Giá điện", listing.electricity],
                  ["Giá nước", listing.water],
                  ["Phí dịch vụ", listing.serviceFee],
                  ["Giữ xe", listing.parkingFee],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-slate-400">{label}</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{value || "Chưa khai"}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-slate-400 text-[11px]">
                Tiền cọc là khoản giữ hộ, tách biệt với giá thuê mỗi tháng.
              </p>
            </div>
          )}

          {tab === "performance" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map(item => (
                  <Card key={item.label} className="p-3.5">
                    <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                    <strong className="text-xl font-bold text-slate-900 block mt-1">{item.value}</strong>
                  </Card>
                ))}
              </div>
              <p className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700">
                Số liệu mẫu dùng để duyệt giao diện. Chưa có chuỗi lượt xem theo ngày hoặc nguồn truy cập để vẽ biểu đồ
                thời gian.
              </p>
            </div>
          )}

          {tab === "leads" && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-slate-900">Khách quan tâm từ tin này</h2>
              {leads.length ? (
                <div className="space-y-2">
                  {leads.map(lead => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div>
                        <strong className="text-slate-900 font-semibold block">{lead.name}</strong>
                        <small className="text-slate-400">
                          {lead.viewingAt
                            ? `Hẹn xem ${new Date(lead.viewingAt).toLocaleString("vi-VN")}`
                            : "Để lại liên hệ"}
                        </small>
                      </div>
                      <Link
                        href={`/owner/v2?m=khach-quan-tam&lead=${lead.id}`}
                        className="text-orange-600 font-semibold hover:underline"
                      >
                        Xem khách
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Chưa có khách nào từ tin này.</p>
              )}
            </div>
          )}

          {tab === "history" && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-slate-900">Lịch sử thay đổi mẫu</h2>
              <ul className="space-y-2 border-l-2 border-slate-200 pl-4 py-1 text-xs">
                {listing.history.map(event => (
                  <li key={event.id}>
                    <span className="text-slate-700 font-medium block">
                      <Check size={12} className="inline mr-1.5 text-emerald-600" />
                      {event.description}
                    </span>
                    <small className="text-slate-400">{new Date(event.at).toLocaleString("vi-VN")}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Preview Dialog */}
      <ManagementDialog open={previewOpen} title="Xem trước thẻ tin" onClose={() => setPreviewOpen(false)}>
        <ListingPreview values={listing} />
      </ManagementDialog>

      {/* Lightbox Dialog */}
      <ManagementDialog
        open={photoIndex !== null}
        title={`Ảnh ${photoIndex === null ? "" : photoIndex + 1}/${listing.photos.length}`}
        wide
        onClose={() => setPhotoIndex(null)}
      >
        {photoIndex !== null && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-video relative rounded-xl overflow-hidden bg-slate-950">
              <Image
                src={listing.photos[photoIndex].url}
                alt={listing.photos[photoIndex].name}
                fill
                sizes="90vw"
                className="object-contain"
                unoptimized={listing.photos[photoIndex].url.startsWith("data:")}
              />
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <Button
                variant="outline"
                size="sm"
                aria-label="Ảnh trước"
                onClick={() => setPhotoIndex((photoIndex - 1 + listing.photos.length) % listing.photos.length)}
              >
                <ChevronLeft size={16} />
              </Button>
              <span>
                {photoIndex + 1} / {listing.photos.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                aria-label="Ảnh sau"
                onClick={() => setPhotoIndex((photoIndex + 1) % listing.photos.length)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </ManagementDialog>

      <ManagementToast message={toast} onClose={clearToast} />
    </div>
  );
}
