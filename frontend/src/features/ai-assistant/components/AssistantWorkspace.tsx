"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Clock,
  MessageSquareHeart,
  CalendarCheck,
  RotateCcw,
  Headphones,
  X,
  Phone,
  User,
  Layers,
  CheckCircle2,
} from "lucide-react";
import styles from "@/styles/tro-ly-ai.module.css";
import type { RoomListing, ChatMessage } from "../types";
import { getAssistantListings, getAssistantReply } from "../api";
import { AssistantWelcome } from "./AssistantWelcome";
import { ChatComposer } from "./ChatComposer";
import { QuickSearchDialog } from "./QuickSearchDialog";
import { ResultsPanel } from "./ResultsPanel";
import sharedStyles from "@/styles/landing.module.css";

export function AssistantWorkspace() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q")?.slice(0, 800) || "";

  const [mode, setMode] = useState<"hero" | "workspace">("hero");
  const [inputText, setInputText] = useState(initialQ);
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<"chat" | "preview">("chat");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [canvasView, setCanvasView] = useState<"list" | "map" | "compare">("list");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  
  // Modals & toasts
  const [quickFilterOpen, setQuickFilterOpen] = useState(false);
  const [bookingListing, setBookingListing] = useState<RoomListing | null>(null);
  const [bookingSuccessToast, setBookingSuccessToast] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000000);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialLocation = useRef<string | null>(null);
  const requestVersion = useRef(0);

  useEffect(() => {
    if (!bookingListing && !historyOpen && !feedbackOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setBookingListing(null);
      setHistoryOpen(false);
      setFeedbackOpen(false);
      setFeedbackSent(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [bookingListing, historyOpen, feedbackOpen]);

  useEffect(() => {
    let active = true;
    getAssistantListings().then(
      (data) => { if (active) setListings(data); },
      (error: unknown) => { if (active) setRequestError(error instanceof Error ? error.message : "Không thể tải dữ liệu phòng."); },
    );
    return () => { active = false; requestVersion.current += 1; };
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("homematch_favs");
      if (savedFavs) {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((item): item is string => typeof item === "string"));
      }
      const savedHistory = localStorage.getItem("homematch_history");
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) setSearchHistory(parsed.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      // Ignore storage errors in sandbox
    }
  }, []);

  // Handle initial query from URL
  useEffect(() => {
    const location = searchParams.toString();
    if (initialLocation.current === location) return;
    initialLocation.current = location;
    setInputText(initialQ);
    if (searchParams.has("tim_nhanh")) setQuickFilterOpen(true);
    if (searchParams.get("ws") === "1") {
      setMode("workspace");
      setMobilePanel("preview");
    }
  }, [initialQ, searchParams]);

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerSearch = async (query: string) => {
    if (!query.trim() || isTyping) return;
    const currentRequest = ++requestVersion.current;
    setRequestError(null);

    // Save to history
    setSearchHistory((prev) => {
      const updated = [query, ...prev.filter((item) => item !== query)].slice(0, 8);
      try { localStorage.setItem("homematch_history", JSON.stringify(updated)); } catch {}
      return updated;
    });

    const timeStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setMode("workspace");
    setIsTyping(true);

    // AI Reasoning simulation
    try {
      const reply = await getAssistantReply(query);
      if (currentRequest !== requestVersion.current) return;
      if (reply.comparisonIds) {
        setCanvasView("compare");
        setComparedIds(reply.comparisonIds);
        setMobilePanel("preview");
      }

      const agentMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        sender: "agent",
        text: reply.text,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        suggestedPrompts: reply.suggestedPrompts,
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (error: unknown) {
      if (currentRequest === requestVersion.current) setRequestError(error instanceof Error ? error.message : "Không thể gửi câu hỏi.");
    } finally {
      if (currentRequest === requestVersion.current) setIsTyping(false);
    }
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try { localStorage.setItem("homematch_favs", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleToggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingListing) return;
    setBookingSuccessToast(`Đã lưu lịch hẹn mẫu cho "${bookingListing.title}". Lịch hẹn chưa được gửi đến chủ nhà.`);
    setBookingListing(null);
    setTimeout(() => {
      setBookingSuccessToast(null);
    }, 4500);
  };

  const displayedListings = listings.filter((item) => {
    if (filterDistrict !== "all" && item.district !== filterDistrict) return false;
    if (item.priceNum > filterMaxPrice) return false;
    return true;
  });

  const quickFilter = (
    <QuickSearchDialog
      district={filterDistrict}
      maxPrice={filterMaxPrice}
      onDistrictChange={setFilterDistrict}
      onMaxPriceChange={setFilterMaxPrice}
      onClose={() => setQuickFilterOpen(false)}
      onReset={() => { setFilterDistrict("all"); setFilterMaxPrice(10000000); }}
      onApply={() => {
        setQuickFilterOpen(false);
        triggerSearch(`Lọc phòng tại ${filterDistrict === "all" ? "toàn thành phố" : filterDistrict} với ngân sách dưới ${filterMaxPrice / 1000000} triệu`);
      }}
    />
  );

  return (
    <main className={`${sharedStyles.siteShell} ${styles.wsPage}`} id="main-content">
      {requestError && <div className={styles.requestError} role="alert">{requestError}</div>}
      {/* Toast Notification */}
      {bookingSuccessToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-semibold animate-bounce">
          <CheckCircle2 size={20} />
          <span>{bookingSuccessToast}</span>
        </div>
      )}

      <div className={`${styles.ws} ${mode === "workspace" ? styles.wsSplit : ""}`} data-mobile-panel={mobilePanel}>
        {/* ================= LEFT SECTION (Chat / Hero) ================= */}
        <section className={styles.wsChat}>
          {mode === "hero" ? (
            /* HERO INITIAL VIEW */
            <AssistantWelcome
              inputText={inputText}
              onInputChange={setInputText}
              onSearch={triggerSearch}
              onQuickFilter={() => setQuickFilterOpen(open => !open)}
              onHistory={() => setHistoryOpen(true)}
              isBusy={isTyping}
              quickFilter={quickFilterOpen ? quickFilter : null}
            />
          ) : (
            /* WORKSPACE ACTIVE CHAT VIEW */
            <>
              <div className={styles.wsChatHead}>
                <div className={styles.chatAvatar}>
                  <Image src="/images/landing/assistant.svg" alt="" width={40} height={40} />
                  <span className={styles.onlineBadge} />
                </div>
                <div className={styles.chatTitleGroup}>
                  <strong>HomeMatch Agent</strong>
                  <small>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Đang trực tuyến • Sẵn sàng tìm phòng
                  </small>
                </div>

                <div className={styles.chatHeadActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("hero");
                      setMessages([]);
                      requestVersion.current += 1;
                      setIsTyping(false);
                      setRequestError(null);
                      setQuickFilterOpen(false);
                    }}
                    className={styles.chatHeadBtn}
                    title="Bắt đầu phiên tìm kiếm mới"
                  >
                    <RotateCcw size={13} />
                    <span>Hỏi mới</span>
                  </button>

                  <a
                    href="tel:19001234"
                    className={styles.chatHeadBtn}
                    title="Liên hệ tổng đài tư vấn trực tiếp"
                  >
                    <Headphones size={13} className="text-orange-500" />
                    <span>Hỗ trợ viên</span>
                  </a>
                </div>
              </div>

              {/* Message Feed */}
              <div className={styles.messagesList}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={msg.sender === "user" ? styles.userBubble : styles.agentBubble}
                  >
                    {msg.sender === "agent" && (
                      <div className={styles.agentMetaRow}>
                        <Sparkles size={13} /> HomeMatch Agent
                      </div>
                    )}
                    <div>{msg.text}</div>

                    {msg.suggestedPrompts && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200">
                        {msg.suggestedPrompts.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => triggerSearch(p)}
                            className="text-xs bg-white text-slate-700 hover:text-orange-600 hover:border-orange-300 border border-slate-200 px-2.5 py-1 rounded-full transition-colors font-medium text-left"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className={styles.agentBubble}>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="animate-spin text-orange-500">✦</span>
                      <span>HomeMatch Agent đang rà soát dữ liệu phòng trọ...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <ChatComposer
                presentation="conversation"
                value={inputText}
                onChange={setInputText}
                onSubmit={triggerSearch}
                onQuickFilter={() => setQuickFilterOpen(open => !open)}
                isBusy={isTyping}
              >
                {quickFilterOpen ? quickFilter : null}
              </ChatComposer>
            </>
          )}
        </section>

        {/* ================= RIGHT SECTION (Canvas Preview) ================= */}
        {mode === "workspace" && (
          <ResultsPanel
            canvasView={canvasView}
            setCanvasView={setCanvasView}
            displayedListings={displayedListings}
            listings={listings}
            favorites={favorites}
            comparedIds={comparedIds}
            handleToggleFavorite={handleToggleFavorite}
            handleToggleCompare={handleToggleCompare}
            setBookingListing={setBookingListing}
          />
        )}
      </div>

      {mode === "workspace" && (
        <nav className={styles.mobileWorkspaceTabs} aria-label="Chuyển giao diện trợ lý">
          <button type="button" onClick={() => setMobilePanel("chat")} aria-pressed={mobilePanel === "chat"}><MessageSquareHeart size={17} /> Chat</button>
          <button type="button" onClick={() => setMobilePanel("preview")} aria-pressed={mobilePanel === "preview"}><Layers size={17} /> Workspace ({displayedListings.length})</button>
        </nav>
      )}

      {/* Floating Feedback Button */}
      <button
        type="button"
        onClick={() => setFeedbackOpen(true)}
        className={styles.gopYTab}
      >
        <MessageSquareHeart size={16} />
        <span>Góp ý</span>
      </button>

      {/* Quick Filter Modal is shared by the welcome and chat composers. */}

      {/* Booking Viewing Modal */}
      {bookingListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div role="dialog" aria-modal="true" aria-label="Đặt lịch xem phòng" className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CalendarCheck size={18} className="text-orange-500" />
                Đặt lịch xem phòng trực tiếp
              </h3>
              <button
                type="button"
                onClick={() => setBookingListing(null)}
                aria-label="Đóng đặt lịch"
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 bg-orange-50 border border-orange-200/60 rounded-xl p-3 text-xs">
              <div className="font-bold text-orange-900 mb-1">{bookingListing.title}</div>
              <div className="text-orange-700 font-semibold">{bookingListing.priceStr} • {bookingListing.address}</div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">Họ và tên của bạn</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    defaultValue="Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl font-normal focus:outline-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Số điện thoại liên hệ</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    defaultValue="0987 654 321"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl font-normal focus:outline-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Ngày muốn xem</label>
                  <input
                    type="date"
                    required
                    defaultValue={new Date(Date.now() + 86400000).toLocaleDateString("en-CA")}
                    min={new Date().toLocaleDateString("en-CA")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-normal focus:outline-orange-500"
                  />
                </div>
                <div>
                  <label className="block mb-1">Khung giờ</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-xl font-normal focus:outline-orange-500">
                    <option>Sáng (09:00 - 11:30)</option>
                    <option>Chiều (14:00 - 17:00)</option>
                    <option>Tối (18:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setBookingListing(null)}
                  className="flex-1 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs"
                >
                  Xác nhận đặt lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div role="dialog" aria-modal="true" aria-label="Lịch sử câu hỏi" className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock size={16} className="text-blue-500" />
                Lịch sử câu hỏi đã tìm
              </h3>
              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                aria-label="Đóng lịch sử"
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={16} />
              </button>
            </div>

            {searchHistory.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">Chưa có lịch sử tìm kiếm nào.</div>
            ) : (
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {searchHistory.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setHistoryOpen(false);
                      triggerSearch(h);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50 text-slate-700 hover:text-orange-700 text-xs font-medium transition-colors truncate block"
                  >
                    • {h}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div role="dialog" aria-modal="true" aria-label="Góp ý trải nghiệm" className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MessageSquareHeart size={18} className="text-rose-500" />
                Góp ý trải nghiệm HomeMatch AI
              </h3>
              <button
                type="button"
                aria-label="Đóng góp ý"
                onClick={() => {
                  setFeedbackOpen(false);
                  setFeedbackSent(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {feedbackSent ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                <div className="font-bold text-slate-900 text-sm">Cảm ơn bạn đã đóng góp ý kiến!</div>
                <div className="text-xs text-slate-500">Ý kiến của bạn giúp chúng tôi cải thiện HomeMatch Agent tốt hơn mỗi ngày.</div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFeedbackSent(true);
                }}
                className="space-y-3.5 text-xs font-semibold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Mức độ hài lòng với gợi ý phòng</label>
                  <div className="flex gap-2">
                    {["Rất hài lòng", "Hài lòng", "Chưa khớp lắm"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        aria-pressed={feedbackRating === lvl}
                        onClick={() => setFeedbackRating(lvl)}
                        className={`flex-1 py-1.5 border rounded-lg hover:bg-orange-50 hover:border-orange-400 text-xs font-medium ${feedbackRating === lvl ? "bg-orange-50 border-orange-400 text-orange-700" : "border-slate-200 text-slate-700"}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Nội dung góp ý chi tiết</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Bạn thấy trợ lý cần bổ sung tính năng hay thông tin gì thêm..."
                    className="w-full p-3 border border-slate-200 rounded-xl font-normal focus:outline-orange-500 text-xs"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs"
                  >
                    Gửi góp ý
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
