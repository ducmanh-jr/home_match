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
import type { RoomListing, ChatMessage } from "../types";
import { getAssistantListings, getAssistantReply } from "../api";
import { AssistantWelcome } from "./AssistantWelcome";
import { ChatComposer } from "./ChatComposer";
import { QuickSearchDialog } from "./QuickSearchDialog";
import { ResultsPanel } from "./ResultsPanel";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
      data => {
        if (active) setListings(data);
      },
      (error: unknown) => {
        if (active) setRequestError(error instanceof Error ? error.message : "Không thể tải dữ liệu phòng.");
      },
    );
    return () => {
      active = false;
      requestVersion.current += 1;
    };
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
    setSearchHistory(prev => {
      const updated = [query, ...prev.filter(item => item !== query)].slice(0, 8);
      try {
        localStorage.setItem("homematch_history", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    const timeStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setMode("workspace");
    setIsTyping(true);

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

      setMessages(prev => [...prev, agentMsg]);
    } catch (error: unknown) {
      if (currentRequest === requestVersion.current)
        setRequestError(error instanceof Error ? error.message : "Không thể gửi câu hỏi.");
    } finally {
      if (currentRequest === requestVersion.current) setIsTyping(false);
    }
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem("homematch_favs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
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
    setBookingSuccessToast(
      `Đã lưu lịch hẹn mẫu cho "${bookingListing.title}". Lịch hẹn chưa được gửi đến chủ nhà.`,
    );
    setBookingListing(null);
    setTimeout(() => {
      setBookingSuccessToast(null);
    }, 4500);
  };

  const displayedListings = listings.filter(item => {
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
      onReset={() => {
        setFilterDistrict("all");
        setFilterMaxPrice(10000000);
      }}
      onApply={() => {
        setQuickFilterOpen(false);
        triggerSearch(
          `Lọc phòng tại ${filterDistrict === "all" ? "toàn thành phố" : filterDistrict} với ngân sách dưới ${
            filterMaxPrice / 1000000
          } triệu`,
        );
      }}
    />
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" id="main-content">
      {requestError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-3 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-lg" role="alert">
          {requestError}
        </div>
      )}

      {/* Booking Toast */}
      {bookingSuccessToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-semibold animate-bounce">
          <CheckCircle2 size={18} />
          <span>{bookingSuccessToast}</span>
        </div>
      )}

      {mode === "hero" ? (
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
        /* Workspace 2-Column Mode */
        <div className="h-screen flex flex-col md:grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px] overflow-hidden">
          {/* ================= LEFT CHAT SECTION ================= */}
          <section
            className={cn(
              "flex flex-col h-full bg-slate-50 border-r border-slate-200 overflow-hidden",
              mobilePanel === "preview" ? "hidden md:flex" : "flex",
            )}
          >
            {/* Chat Head */}
            <div className="h-14 px-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-100 p-1 flex items-center justify-center shrink-0">
                  <Image src="/images/landing/assistant.svg" alt="" width={24} height={24} />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block leading-tight">HomeMatch Agent</strong>
                  <small className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Trực tuyến • Sẵn sàng tìm phòng
                  </small>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode("hero");
                    setMessages([]);
                    requestVersion.current += 1;
                    setIsTyping(false);
                    setRequestError(null);
                    setQuickFilterOpen(false);
                  }}
                  className="h-8 text-xs"
                  title="Bắt đầu phiên tìm kiếm mới"
                >
                  <RotateCcw size={12} />
                  <span>Hỏi mới</span>
                </Button>

                <a href="tel:19001234">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-orange-600 hover:text-orange-700">
                    <Headphones size={13} />
                    <span className="hidden sm:inline">Hỗ trợ</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    "p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] shadow-xs",
                    msg.sender === "user"
                      ? "ml-auto bg-orange-500 text-white rounded-tr-xs"
                      : "mr-auto bg-white border border-slate-200 text-slate-800 rounded-tl-xs space-y-2",
                  )}
                >
                  {msg.sender === "agent" && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 uppercase tracking-wider pb-1 border-b border-slate-100">
                      <Sparkles size={12} /> HomeMatch Agent
                    </div>
                  )}
                  <div>{msg.text}</div>

                  {msg.suggestedPrompts && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {msg.suggestedPrompts.map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => triggerSearch(p)}
                          className="text-[11px] bg-slate-50 text-slate-700 hover:text-orange-700 hover:bg-orange-50 hover:border-orange-200 border border-slate-200 px-2.5 py-1 rounded-full transition-colors font-medium text-left"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto bg-white border border-slate-200 text-slate-500 p-3 rounded-2xl rounded-tl-xs text-xs flex items-center gap-2 shadow-xs">
                  <span className="animate-spin text-orange-500">✦</span>
                  <span>HomeMatch Agent đang rà soát dữ liệu phòng trọ...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Composer Bottom */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
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
            </div>
          </section>

          {/* ================= RIGHT PREVIEW SECTION ================= */}
          <div className={cn("h-full overflow-hidden", mobilePanel === "chat" ? "hidden md:block" : "block")}>
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
          </div>
        </div>
      )}

      {/* Mobile Switch Tabs */}
      {mode === "workspace" && (
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 grid grid-cols-2 z-30"
          aria-label="Chuyển giao diện trợ lý"
        >
          <button
            type="button"
            onClick={() => setMobilePanel("chat")}
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors",
              mobilePanel === "chat" ? "text-orange-600 bg-orange-50/50" : "text-slate-500",
            )}
          >
            <MessageSquareHeart size={16} /> Chat
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel("preview")}
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors",
              mobilePanel === "preview" ? "text-orange-600 bg-orange-50/50" : "text-slate-500",
            )}
          >
            <Layers size={16} /> Danh sách ({displayedListings.length})
          </button>
        </nav>
      )}

      {/* Floating Feedback Button */}
      <button
        type="button"
        onClick={() => setFeedbackOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
      >
        <MessageSquareHeart size={15} />
        <span>Góp ý</span>
      </button>

      {/* Booking Viewing Modal */}
      {bookingListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Đặt lịch xem phòng"
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto"
          >
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
              <div className="text-orange-700 font-semibold">
                {bookingListing.priceStr} • {bookingListing.address}
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">Họ và tên của bạn</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
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
                    placeholder="Ví dụ: 0987 654 321"
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
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setBookingListing(null)}
                  className="flex-1"
                >
                  Hủy bỏ
                </Button>
                <Button type="submit" variant="orange" size="md" className="flex-1">
                  Xác nhận đặt lịch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Lịch sử câu hỏi"
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100"
          >
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
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Góp ý trải nghiệm"
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto"
          >
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
                <div className="text-xs text-slate-500">
                  Ý kiến của bạn giúp chúng tôi cải thiện HomeMatch Agent tốt hơn mỗi ngày.
                </div>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setFeedbackSent(true);
                }}
                className="space-y-3.5 text-xs font-semibold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Mức độ hài lòng với gợi ý phòng</label>
                  <div className="flex gap-2">
                    {["Rất hài lòng", "Hài lòng", "Chưa khớp lắm"].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        aria-pressed={feedbackRating === lvl}
                        onClick={() => setFeedbackRating(lvl)}
                        className={cn(
                          "flex-1 py-1.5 border rounded-lg hover:bg-orange-50 hover:border-orange-400 text-xs font-medium transition-colors",
                          feedbackRating === lvl
                            ? "bg-orange-50 border-orange-400 text-orange-700"
                            : "border-slate-200 text-slate-700",
                        )}
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

                <div className="pt-2">
                  <Button type="submit" variant="orange" size="md" className="w-full">
                    Gửi góp ý
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
