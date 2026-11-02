"use client";

import { ArrowUp, ChevronDown, ImagePlus, MapPin, Mic, Plus, X, Zap } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  onQuickFilter: () => void;
  isBusy?: boolean;
  presentation?: "welcome" | "conversation";
  children?: ReactNode;
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onQuickFilter,
  isBusy = false,
  presentation = "welcome",
  children,
}: ChatComposerProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [attachment, setAttachment] = useState<{ url: string; name: string } | null>(null);
  const [toolNotice, setToolNotice] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const tools = useRef<HTMLDivElement>(null);
  const plusButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!attachment) return;
    return () => URL.revokeObjectURL(attachment.url);
  }, [attachment]);

  useEffect(() => {
    if (!toolsOpen) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !tools.current?.contains(event.target)) setToolsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setToolsOpen(false);
        plusButton.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [toolsOpen]);

  function showVoiceExample() {
    setToolsOpen(false);
    onChange("Phòng trọ Quận 10 dưới 5 triệu có ban công thoáng mát");
    setToolNotice("Bạn có thể sửa câu hỏi gợi ý trước khi gửi.");
    textarea.current?.focus();
  }

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", presentation === "conversation" && "max-w-3xl")}>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!isBusy && value.trim()) onSubmit(value.trim());
        }}
        className={cn(
          "p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all",
          presentation === "welcome" && "shadow-md hover:border-slate-300",
        )}
      >
        {attachment && (
          <div className="flex items-center gap-2 p-1.5 mb-2 rounded-lg bg-slate-100 text-xs text-slate-700 w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={attachment.url} alt="Ảnh phòng đã chọn" className="w-8 h-8 rounded object-cover" />
            <span className="truncate max-w-[200px] text-[11px] font-medium">{attachment.name}</span>
            <button
              type="button"
              aria-label="Bỏ ảnh đã chọn"
              onClick={() => setAttachment(null)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <textarea
          ref={textarea}
          rows={presentation === "welcome" ? 2 : 1}
          maxLength={800}
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={
            presentation === "welcome"
              ? "Mô tả căn phòng bạn muốn tìm (ví dụ: Studio Quận 10 dưới 6 triệu có máy giặt riêng)…"
              : "Hỏi thêm về phòng, tiện ích hoặc chi phí…"
          }
          aria-label="Nhu cầu tìm phòng"
          onKeyDown={event => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              if (!isBusy && value.trim()) onSubmit(value.trim());
            }
          }}
          className="w-full bg-transparent resize-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={event => {
                const file = event.target.files?.[0];
                if (!file) return;
                setAttachment({ url: URL.createObjectURL(file), name: file.name });
                if (!value.trim()) onChange("Tìm phòng có thiết kế và nội thất tương tự ảnh này");
                event.target.value = "";
              }}
            />

            <div className="relative" ref={tools}>
              <button
                ref={plusButton}
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Thêm ảnh hoặc nói"
                aria-expanded={toolsOpen}
                aria-haspopup="menu"
                onClick={() => setToolsOpen(open => !open)}
              >
                <Plus size={16} />
              </button>

              {toolsOpen && (
                <div
                  className="absolute bottom-full mb-2 left-0 w-52 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xl text-xs space-y-0.5 z-30 animate-in fade-in-50 zoom-in-95 duration-100"
                  role="menu"
                  aria-label="Thêm nội dung"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setToolsOpen(false);
                      fileInput.current?.click();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <ImagePlus size={15} className="text-orange-500" /> Thêm ảnh phòng
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={showVoiceExample}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Mic size={15} className="text-blue-500" /> Câu hỏi bằng giọng nói
                  </button>
                </div>
              )}
            </div>

            {/* Quick Filter Tool */}
            <button
              type="button"
              onClick={onQuickFilter}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-xs font-medium text-slate-600 transition-colors"
              aria-haspopup="dialog"
              aria-controls="quick-search-dialog"
              aria-expanded={Boolean(children)}
            >
              <Zap size={13} className="text-orange-500" />
              <span>Tìm nhanh</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {/* GPS Near Me */}
            <button
              type="button"
              onClick={onQuickFilter}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-xs font-medium text-slate-600 transition-colors"
              aria-label="Chọn khu vực gần tôi"
              title="Chọn khu vực gần tôi"
            >
              <MapPin size={13} className="text-blue-500" />
              <span>Gần tôi</span>
            </button>

            {/* Voice Suggestion */}
            <button
              type="button"
              onClick={showVoiceExample}
              className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              aria-label="Gợi ý câu hỏi bằng giọng nói"
              title="Gợi ý câu hỏi bằng giọng nói"
            >
              <Mic size={15} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isBusy || !value.trim()}
            className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs active:scale-95"
            aria-label="Gửi yêu cầu"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {toolNotice && <p className="text-[11px] text-slate-400 text-center mt-1.5">{toolNotice}</p>}
      {children}
    </div>
  );
}
