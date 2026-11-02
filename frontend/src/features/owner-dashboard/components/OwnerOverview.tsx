"use client";

import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, DoorOpen, FilePlus2, House, UsersRound, WalletCards } from "lucide-react";
import { Card, Badge, Button, buttonClasses, Skeleton } from "@/components/ui";
import { ownerModuleHref } from "@/components/layout/owner-navigation";
import { useOwnerPreview } from "../use-owner-preview";

export function OwnerOverview() {
  const { data, error, retry } = useOwnerPreview();

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center border-rose-200 bg-rose-50/50">
          <h3 className="text-base font-semibold text-rose-800">Chưa tải được tổng quan</h3>
          <p className="mt-1 text-sm text-rose-600">{error}</p>
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={retry}>
              Thử lại
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-40" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const occupied = data.rooms.filter(room => room.status === "occupied").length;
  const available = data.rooms.filter(room => room.status === "available").length;
  const occupancy = data.rooms.length ? Math.round((occupied / data.rooms.length) * 100) : 0;

  const stats = [
    { label: "Tổng căn/phòng", value: data.rooms.length, foot: `${data.buildings.length} tòa nhà đang quản lý`, icon: Building2 },
    { label: "Căn đang thuê", value: occupied, foot: "Đã có người thuê", icon: House },
    { label: "Căn còn trống", value: available, foot: "Sẵn sàng cho thuê", icon: DoorOpen },
    { label: "Khách quan tâm", value: data.leads.length, foot: "Từ các tin đăng của bạn", icon: UsersRound },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tổng quan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Một góc nhìn rõ ràng về hoạt động cho thuê của bạn.</p>
        </div>
        <div>
          <Link
            href={ownerModuleHref("tao-tin")}
            className={buttonClasses({ variant: "orange", size: "md" })}
          >
            <FilePlus2 size={16} />
            Tạo tin cho thuê
          </Link>
        </div>
      </header>

      {/* Sample Data Banner */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-orange-50/80 border border-orange-200/60 text-xs font-medium text-orange-800">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden="true" />
        Dữ liệu mẫu · Khu quản trị chủ nhà
      </div>

      {/* Stats Deck */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Tổng quan nguồn cung">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>{stat.label}</span>
              <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
                <stat.icon size={17} />
              </span>
            </div>
            <div className="mt-3">
              <strong className="text-2xl font-bold text-slate-900 tracking-tight block">{stat.value}</strong>
              <small className="text-xs text-slate-400 mt-0.5 block">{stat.foot}</small>
            </div>
          </Card>
        ))}
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Main Column: Rooms List */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Căn hộ & phòng</h2>
            <Link
              href={ownerModuleHref("can-ho-phong")}
              className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {data.rooms.slice(0, 4).map(room => {
              const building = data.buildings.find(item => item.id === room.buildingId);
              return (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-500">
                      <Building2 size={18} />
                    </span>
                    <div>
                      <strong className="text-sm font-semibold text-slate-900 block">{room.code}</strong>
                      <small className="text-xs text-slate-400">{building?.name} · {room.area} m²</small>
                    </div>
                  </div>
                  <Badge tone={room.status === "occupied" ? "success" : room.status === "reserved" ? "warning" : "info"}>
                    {room.status === "occupied" ? "Đang thuê" : room.status === "reserved" ? "Giữ chỗ" : "Còn trống"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Aside Column */}
        <div className="flex flex-col gap-5">
          {/* Occupancy Card */}
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Công suất phòng</h2>
              <Building2 size={16} className="text-slate-400" />
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <strong className="text-2xl font-bold text-slate-900">{occupancy}%</strong>
              <span className="text-xs text-slate-500">{occupied}/{data.rooms.length} căn đang thuê</span>
            </div>

            <div
              className="h-2 w-full rounded-full bg-slate-100 overflow-hidden"
              role="progressbar"
              aria-label="Tỷ lệ phòng đang thuê"
              aria-valuenow={occupancy}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${occupancy}%` }} />
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" /> Đang thuê
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-200" /> Còn lại
              </span>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-5">
            <div className="pb-3 mb-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Truy cập nhanh</h2>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link
                href={ownerModuleHref("tin-bat-dong-san")}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-orange-50/50 hover:border-orange-200/60 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-600 group-hover:text-orange-600 transition-colors">
                    <House size={17} />
                  </span>
                  <div>
                    <strong className="text-xs font-semibold text-slate-800 group-hover:text-orange-900 block transition-colors">Tin bất động sản</strong>
                    <small className="text-[11px] text-slate-400">Theo dõi tin đang hiển thị</small>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href={ownerModuleHref("thu-tien")}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-orange-50/50 hover:border-orange-200/60 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-600 group-hover:text-orange-600 transition-colors">
                    <WalletCards size={17} />
                  </span>
                  <div>
                    <strong className="text-xs font-semibold text-slate-800 group-hover:text-orange-900 block transition-colors">Thu tiền & công nợ</strong>
                    <small className="text-[11px] text-slate-400">Kiểm tra khoản thu theo kỳ</small>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
