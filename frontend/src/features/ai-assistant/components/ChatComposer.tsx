"use client";

import { ArrowUp, ChevronDown, ImagePlus, MapPin, Mic, Plus, X, Zap } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "@/styles/tro-ly-ai.module.css";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  onQuickFilter: () => void;
  isBusy?: boolean;
  presentation?: "welcome" | "conversation";
  children?: ReactNode;
}

export function ChatComposer({ value, onChange, onSubmit, onQuickFilter, isBusy = false, presentation = "welcome", children }: ChatComposerProps) {
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
    <div className={`${styles.composerGroup} ${presentation === "conversation" ? styles.conversationComposer : ""}`}>
      <form
        className={styles.wsHeroForm}
        onSubmit={(event) => {
          event.preventDefault();
          if (!isBusy && value.trim()) onSubmit(value.trim());
        }}
      >
        {attachment && (
          <div className={styles.attachment}>
            {/* Local preview only; the selected file is never uploaded. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={attachment.url} alt="Ảnh phòng đã chọn" />
            <span>{attachment.name}</span>
            <button type="button" aria-label="Bỏ ảnh đã chọn" onClick={() => setAttachment(null)}><X size={15} /></button>
          </div>
        )}
        <textarea
          ref={textarea}
          rows={presentation === "welcome" ? 2 : 1}
          maxLength={800}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={presentation === "welcome" ? "Mô tả căn phòng bạn muốn tìm…" : "Hỏi thêm về phòng, tiện ích hoặc chi phí…"}
          aria-label="Nhu cầu tìm phòng"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              if (!isBusy && value.trim()) onSubmit(value.trim());
            }
          }}
        />
        <div className={styles.formToolsRow}>
          <div className={styles.toolsLeft}>
            {/* Add Image Tool */}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setAttachment({ url: URL.createObjectURL(file), name: file.name });
                if (!value.trim()) onChange("Tìm phòng có thiết kế và nội thất tương tự ảnh này");
                event.target.value = "";
              }}
            />
            <div className={styles.toolsMenuWrap} ref={tools}>
              <button
                ref={plusButton}
                type="button"
                className={`${styles.toolButton} ${styles.iconToolButton}`}
                aria-label="Thêm ảnh hoặc nói"
                aria-expanded={toolsOpen}
                aria-haspopup="menu"
                onClick={() => setToolsOpen((open) => !open)}
              ><Plus size={17} /></button>
              {toolsOpen && (
                <div className={styles.toolsMenu} role="menu" aria-label="Thêm nội dung">
                  <button type="button" role="menuitem" onClick={() => { setToolsOpen(false); fileInput.current?.click(); }}>
                    <ImagePlus size={16} /> Thêm ảnh phòng
                  </button>
                  <button type="button" role="menuitem" onClick={showVoiceExample}><Mic size={16} /> Câu hỏi bằng giọng nói</button>
                </div>
              )}
            </div>
            {/* Quick Filter Tool */}
            <button type="button" onClick={onQuickFilter} className={`${styles.toolButton} ${styles.quickFilterTool}`} aria-haspopup="dialog" aria-controls="quick-search-dialog" aria-expanded={Boolean(children)}>
              <Zap size={14} /><span>Tìm nhanh</span><ChevronDown size={13} />
            </button>
            {/* GPS Near Me */}
            <button type="button" onClick={onQuickFilter} className={`${styles.toolButton} ${styles.locationTool}`} aria-label="Chọn khu vực gần tôi" title="Chọn khu vực gần tôi" aria-haspopup="dialog" aria-controls="quick-search-dialog" aria-expanded={Boolean(children)}>
              <MapPin size={15} /><span>Gần tôi</span>
            </button>
            {/* Voice Input */}
            <button type="button" onClick={showVoiceExample} className={`${styles.toolButton} ${styles.iconToolButton} ${styles.voiceTool}`} aria-label="Gợi ý câu hỏi bằng giọng nói" title="Gợi ý câu hỏi bằng giọng nói"><Mic size={15} /></button>
          </div>
          <button type="submit" disabled={isBusy || !value.trim()} className={styles.sendButton} aria-label="Gửi yêu cầu"><ArrowUp size={19} /></button>
        </div>
      </form>
      {toolNotice && <p className={styles.toolNotice} role="status">{toolNotice}</p>}
      {children}
    </div>
  );
}
