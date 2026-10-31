import React, { useState } from "react";
import Image from "next/image";
import { CalendarCheck, Heart, Layers, LayoutList, MapPin, Map as MapIcon, Scale } from "lucide-react";
import type { RoomListing } from "../types";
import styles from "@/styles/tro-ly-ai.module.css";

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

export function ResultsPanel({canvasView, setCanvasView, displayedListings, listings, favorites, comparedIds, handleToggleFavorite, handleToggleCompare, setBookingListing}: ResultsPanelProps) {
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const mapListing = displayedListings.find(listing => listing.id === selectedMapId) ?? displayedListings[0];
  const comparedListings = listings.filter(listing => comparedIds.includes(listing.id));
  return (
          <aside className={styles.wsCanvas}>
            <div className={styles.wsCanvasHead}>
              <div className={styles.canvasTitle}>
                <Layers size={16} />
                <span>Preview</span>
              </div>

              <div className={styles.canvasControls}>
                <button
                  type="button"
                  onClick={() => setCanvasView("list")}
                  aria-pressed={canvasView === "list"}
                  className={`${styles.toggleViewBtn} ${canvasView === "list" ? styles.active : ""}`}
                >
                  <LayoutList size={14} /> Danh sách
                </button>
                <button
                  type="button"
                  onClick={() => setCanvasView("map")}
                  aria-pressed={canvasView === "map"}
                  className={`${styles.toggleViewBtn} ${canvasView === "map" ? styles.active : ""}`}
                >
                  <MapIcon size={14} /> Bản đồ
                </button>
                <button
                  type="button"
                  onClick={() => setCanvasView("compare")}
                  aria-pressed={canvasView === "compare"}
                  className={`${styles.toggleViewBtn} ${canvasView === "compare" ? styles.active : ""}`}
                >
                  <Scale size={14} /> So sánh ({comparedIds.length})
                </button>
              </div>
            </div>

            <div className={styles.resultsSummary}>{displayedListings.length} phòng phù hợp với nhu cầu của bạn</div>

            <div className={styles.wsCanvasBody}>
              {canvasView === "map" ? (
                /* Map Simulation Mode */
                <div className={styles.mockMap} aria-label="Sơ đồ vị trí phòng minh họa">
                  <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <rect width="600" height="500" fill="#eff3ec" />
                    <path d="M470 -30Q350 90 480 200T470 530" fill="none" stroke="#bedee9" strokeWidth="62" />
                    <g fill="#dbe8d3"><rect x="40" y="40" width="105" height="95" rx="12" /><rect x="220" y="280" width="110" height="120" rx="18" /><rect x="45" y="340" width="75" height="90" rx="12" /></g>
                    <g fill="none" stroke="white" strokeWidth="13"><path d="M-20 160L620 320M110 -20L260 520M-30 410L590 40M-20 270L610 430M280 -30L430 520" /><path d="M20 -20L155 520M-30 40L620 190" strokeWidth="7" /></g>
                    <g fill="#84928a" fontSize="12" fontFamily="Arial, sans-serif"><text x="80" y="235">QUẬN 10</text><text x="310" y="110">BÌNH THẠNH</text><text x="220" y="345">Công viên</text></g>
                  </svg>
                  {displayedListings.map((listing, index) => (
                    <button
                      key={listing.id}
                      type="button"
                      className={styles.mapPin}
                      style={{ left: `${20 + (index % 3) * 26}%`, top: `${24 + Math.floor(index / 3) * 28 + (index % 2) * 13}%` }}
                      aria-pressed={mapListing?.id === listing.id}
                      onClick={() => setSelectedMapId(listing.id)}
                    >{listing.priceStr}</button>
                  ))}
                  <span className={styles.mapCaption}>Sơ đồ minh họa • Dữ liệu mẫu</span>
                  {mapListing && (
                    <div className={styles.mapDetail}>
                      <strong>{mapListing.title}</strong>
                      <span><MapPin size={13} /> {mapListing.address}</span>
                      <button type="button" className={styles.bookButton} onClick={() => setBookingListing(mapListing)}><CalendarCheck size={14} /> Đặt lịch xem</button>
                    </div>
                  )}
                  {displayedListings.length === 0 && <p className={styles.emptyResults}>Chưa có phòng trong bộ lọc này.</p>}
                </div>
              ) : canvasView === "compare" ? (
                /* Compare Simulation Mode */
                <div className="bg-white rounded-2xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                    <Scale size={16} className="text-orange-500" /> So sánh phòng đã chọn ({comparedListings.length}/2)
                  </h4>
                  {comparedListings.length < 2 && <p className={styles.emptyResults}>Chọn biểu tượng so sánh trên hai tin phòng để xem thông tin cạnh nhau.</p>}
                  <div className="grid grid-cols-2 gap-4">
                    {comparedListings.map((l) => (
                      <div key={l.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col gap-2">
                        <div className="font-bold text-slate-900 text-xs leading-tight">{l.title}</div>
                        <div className="text-orange-600 font-extrabold text-sm">{l.priceStr}</div>
                        <div className="text-[11px] text-slate-600">Diện tích: <b>{l.areaM2} m²</b></div>
                        <div className="text-[11px] text-slate-600">Điện: <b>{l.electricity}</b></div>
                        <div className="text-[11px] text-slate-600">Nước: <b>{l.water}</b></div>
                        <div className="text-[11px] text-slate-600">Xe: <b>{l.parking}</b></div>
                        <button
                          type="button"
                          onClick={() => setBookingListing(l)}
                          className="mt-2 w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold"
                        >
                          Đặt lịch căn này
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Normal Listing Cards View */
                displayedListings.length === 0 ? <div className={styles.emptyResults}><HouseEmpty />Không có phòng phù hợp. Hãy đổi khu vực hoặc tăng ngân sách trong Tìm nhanh.</div> : displayedListings.map((listing) => (
                  <article
                    key={listing.id}
                    className={`${styles.wsCard} ${comparedIds.includes(listing.id) ? styles.highlight : ""}`}
                  >
                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(listing.id, e)}
                      className={`${styles.cardFavBtn} ${favorites.includes(listing.id) ? styles.active : ""}`}
                      title={favorites.includes(listing.id) ? "Bỏ lưu tin" : "Lưu tin này"}
                      aria-label={`${favorites.includes(listing.id) ? "Bỏ lưu" : "Lưu"} ${listing.title}`}
                      aria-pressed={favorites.includes(listing.id)}
                    >
                      <Heart size={16} fill={favorites.includes(listing.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Compare Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleCompare(listing.id, e)}
                      className={`${styles.cardCmpBtn} ${comparedIds.includes(listing.id) ? styles.active : ""}`}
                      title="Chọn để so sánh"
                      aria-label={`So sánh ${listing.title}`}
                      aria-pressed={comparedIds.includes(listing.id)}
                    >
                      <Scale size={15} />
                    </button>

                    {/* Thumbnail */}
                    <div className={styles.cardPhoto}>
                      <Image
                        src={listing.photos[0]}
                        alt={listing.title}
                        fill
                        sizes="(max-width: 700px) 90px, 148px"
                        className="object-cover"
                      />
                      <span className={styles.photoCount}>1/{listing.photos.length} ảnh</span>
                    </div>

                    {/* Body */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardPriceRow}>
                        <span className={styles.priceHighlight}>{listing.priceStr}</span>
                        <span className={styles.depositText}>{listing.depositStr}</span>
                      </div>

                      <h3 className={styles.cardTitle}>{listing.title}</h3>

                      <div className={styles.cardLocation}>
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{listing.address}</span>
                      </div>

                      <div className={styles.cardTags}>
                        <span className={styles.tagBadge}>{listing.areaM2} m²</span>
                        <span className={styles.tagBadge}>Tầng {listing.floor}</span>
                        {listing.tags.slice(0, 2).map((t) => (
                          <span key={t} className={styles.tagBadge}>{t}</span>
                        ))}
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          type="button"
                          onClick={() => setBookingListing(listing)}
                          className={styles.bookButton}
                        >
                          <CalendarCheck size={14} /> Đặt lịch xem
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </aside>
  );
}

function HouseEmpty() {
  return <MapPin size={24} aria-hidden="true" />;
}
