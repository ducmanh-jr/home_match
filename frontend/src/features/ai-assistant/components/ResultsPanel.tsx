import React, { useState } from "react";
import Image from "next/image";
import { CalendarCheck, Heart, Layers, LayoutList, MapPin, Map as MapIcon, Scale } from "lucide-react";
import type { RoomListing } from "../types";
import { Button, Card, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ResultsPanelProps {
  canvasView: "list" | "map" | "compare";
  setCanvasView: (view: "list" | "map" | "compare") => void;
  displayedListings: RoomListing[];
  listings: RoomListing[];
  favorites: string[];
  comparedIds: string[];
  handleToggleFavorite: (id: string, event: React.MouseEvent) => void;
  handleToggleCompare: (id: string, event: React.MouseEvent) => void;
  setBookingListing: (listing: RoomListing) => void;
}

export function ResultsPanel({
  canvasView,
  setCanvasView,
  displayedListings,
  listings,
  favorites,
  comparedIds,
  handleToggleFavorite,
  handleToggleCompare,
  setBookingListing,
}: ResultsPanelProps) {
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const mapListing = displayedListings.find(listing => listing.id === selectedMapId) ?? displayedListings[0];
  const comparedListings = listings.filter(listing => comparedIds.includes(listing.id));

  return (
    <aside className="h-full flex flex-col bg-slate-50/60 border-l border-slate-200 overflow-hidden w-full">
      {/* Canvas Top Head */}
      <div className="h-14 px-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Layers size={16} className="text-orange-500" />
          <span>Xem phòng</span>
        </div>

        <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200/60 text-xs">
          <button
            type="button"
            onClick={() => setCanvasView("list")}
            aria-pressed={canvasView === "list"}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors",
              canvasView === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
            )}
          >
            <LayoutList size={13} /> Danh sách
          </button>
          <button
            type="button"
            onClick={() => setCanvasView("map")}
            aria-pressed={canvasView === "map"}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors",
              canvasView === "map" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
            )}
          >
            <MapIcon size={13} /> Bản đồ
          </button>
          <button
            type="button"
            onClick={() => setCanvasView("compare")}
            aria-pressed={canvasView === "compare"}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors",
              canvasView === "compare" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800",
            )}
          >
            <Scale size={13} /> So sánh ({comparedIds.length})
          </button>
        </div>
      </div>

      {/* Results Counter Banner */}
      <div className="px-4 py-2 text-xs font-medium text-slate-500 bg-white/70 border-b border-slate-100 shrink-0">
        {displayedListings.length} phòng phù hợp với nhu cầu của bạn
      </div>

      {/* Main Canvas Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {canvasView === "map" ? (
          /* Map View */
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
              <rect width="600" height="500" fill="#eff3ec" />
              <path d="M470 -30Q350 90 480 200T470 530" fill="none" stroke="#bedee9" strokeWidth="62" />
              <g fill="#dbe8d3">
                <rect x="40" y="40" width="105" height="95" rx="12" />
                <rect x="220" y="280" width="110" height="120" rx="18" />
                <rect x="45" y="340" width="75" height="90" rx="12" />
              </g>
              <g fill="none" stroke="white" strokeWidth="13">
                <path d="M-20 160L620 320M110 -20L260 520M-30 410L590 40M-20 270L610 430M280 -30L430 520" />
                <path d="M20 -20L155 520M-30 40L620 190" strokeWidth="7" />
              </g>
              <g fill="#84928a" fontSize="12" fontFamily="Arial, sans-serif">
                <text x="80" y="235">QUẬN 10</text>
                <text x="310" y="110">BÌNH THẠNH</text>
                <text x="220" y="345">Công viên</text>
              </g>
            </svg>

            {displayedListings.map((listing, index) => (
              <button
                key={listing.id}
                type="button"
                onClick={() => setSelectedMapId(listing.id)}
                aria-pressed={mapListing?.id === listing.id}
                style={{
                  left: `${20 + (index % 3) * 26}%`,
                  top: `${24 + Math.floor(index / 3) * 28 + (index % 2) * 13}%`,
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md z-10",
                  mapListing?.id === listing.id
                    ? "bg-orange-600 text-white scale-110 ring-4 ring-orange-200"
                    : "bg-white text-slate-800 hover:bg-orange-50 hover:text-orange-700",
                )}
              >
                {listing.priceStr}
              </button>
            ))}

            <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-[10px] text-white font-medium">
              Sơ đồ minh họa • Dữ liệu mẫu
            </span>

            {mapListing && (
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xl flex items-center justify-between gap-3 z-20">
                <div className="truncate">
                  <strong className="text-xs font-bold text-slate-900 block truncate">{mapListing.title}</strong>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={12} className="text-slate-400 shrink-0" /> {mapListing.address}
                  </span>
                </div>
                <Button variant="orange" size="sm" onClick={() => setBookingListing(mapListing)} className="shrink-0">
                  <CalendarCheck size={14} /> Đặt lịch
                </Button>
              </div>
            )}
          </div>
        ) : canvasView === "compare" ? (
          /* Compare View */
          <Card className="p-4 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Scale size={16} className="text-orange-500" /> So sánh phòng đã chọn ({comparedListings.length}/2)
            </h4>
            {comparedListings.length < 2 && (
              <p className="p-3 rounded-lg bg-orange-50 border border-orange-200/60 text-xs text-orange-800">
                Chọn biểu tượng so sánh (biểu tượng cân) trên hai tin phòng để đối chiếu trực quan.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comparedListings.map(l => (
                <div key={l.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between gap-2.5">
                  <div>
                    <div className="font-bold text-slate-900 text-xs leading-tight mb-1">{l.title}</div>
                    <div className="text-orange-600 font-extrabold text-sm mb-2">{l.priceStr}</div>
                    <div className="space-y-1 text-xs text-slate-600">
                      <div>Diện tích: <strong className="text-slate-800">{l.areaM2} m²</strong></div>
                      <div>Điện: <strong className="text-slate-800">{l.electricity}</strong></div>
                      <div>Nước: <strong className="text-slate-800">{l.water}</strong></div>
                      <div>Xe: <strong className="text-slate-800">{l.parking}</strong></div>
                    </div>
                  </div>
                  <Button variant="orange" size="sm" onClick={() => setBookingListing(l)} className="w-full mt-2">
                    Đặt lịch căn này
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          /* Normal List Cards */
          displayedListings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <MapPin size={28} className="mx-auto text-slate-300" />
              <p>Không có phòng phù hợp. Hãy đổi khu vực hoặc tăng ngân sách trong Tìm nhanh.</p>
            </div>
          ) : (
            displayedListings.map(listing => {
              const isFav = favorites.includes(listing.id);
              const isCmp = comparedIds.includes(listing.id);
              return (
                <Card
                  key={listing.id}
                  className={cn(
                    "p-3 rounded-xl border flex gap-3 relative hover:shadow-md transition-all group",
                    isCmp ? "border-orange-400 bg-orange-50/20 ring-1 ring-orange-300" : "border-slate-200 bg-white",
                  )}
                >
                  {/* Photo Thumbnail */}
                  <div className="w-24 sm:w-28 aspect-[4/3] rounded-lg overflow-hidden relative shrink-0 bg-slate-100">
                    <Image
                      src={listing.photos[0]}
                      alt={listing.title}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white font-medium">
                      1/{listing.photos.length}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-orange-600">{listing.priceStr}</span>
                          <span className="text-[11px] text-slate-400">cọc {listing.depositStr}</span>
                        </div>

                        {/* Top action icons */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={e => handleToggleCompare(listing.id, e)}
                            aria-label={`So sánh ${listing.title}`}
                            aria-pressed={isCmp}
                            title="So sánh phòng"
                            className={cn(
                              "p-1.5 rounded-md transition-colors",
                              isCmp ? "text-orange-600 bg-orange-100" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100",
                            )}
                          >
                            <Scale size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={e => handleToggleFavorite(listing.id, e)}
                            aria-label={`${isFav ? "Bỏ lưu" : "Lưu"} ${listing.title}`}
                            aria-pressed={isFav}
                            title={isFav ? "Bỏ lưu tin" : "Lưu tin"}
                            className={cn(
                              "p-1.5 rounded-md transition-colors",
                              isFav ? "text-rose-500 bg-rose-50" : "text-slate-400 hover:text-rose-500 hover:bg-slate-100",
                            )}
                          >
                            <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">{listing.title}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                        <MapPin size={11} className="text-slate-400 shrink-0" />
                        <span className="truncate">{listing.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <Badge tone="default" className="text-[10px] py-0 px-1.5">
                          {listing.areaM2} m²
                        </Badge>
                        <Badge tone="default" className="text-[10px] py-0 px-1.5">
                          Tầng {listing.floor}
                        </Badge>
                      </div>
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => setBookingListing(listing)}
                        className="text-[11px] h-7 px-2.5"
                      >
                        <CalendarCheck size={12} /> Đặt lịch
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )
        )}
      </div>
    </aside>
  );
}
