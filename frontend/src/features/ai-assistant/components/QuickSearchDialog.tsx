"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "@/styles/tro-ly-ai.module.css";

interface QuickSearchDialogProps {
  district: string;
  maxPrice: number;
  onDistrictChange: (district: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
}

export function QuickSearchDialog({ district, maxPrice, onDistrictChange, onMaxPriceChange, onClose, onReset, onApply }: QuickSearchDialogProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        document.querySelector<HTMLButtonElement>('[aria-controls="quick-search-dialog"]')?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Element && !panel.current?.contains(target) && !target.closest('[aria-controls="quick-search-dialog"]')) onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onClose]);

  return (
    <div ref={panel} id="quick-search-dialog" className={styles.quickSearchDialog} role="dialog" aria-labelledby="quick-search-title">
      <div className={styles.quickSearchHeading}>
        <strong id="quick-search-title"><SlidersHorizontal size={16} aria-hidden="true" /> Tìm nhanh</strong>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Đóng bộ lọc"><X size={16} /></button>
      </div>
      <div className={styles.quickSearchFields}>
        <label>Khu vực
          <select value={district} onChange={(event) => onDistrictChange(event.target.value)}>
            <option value="all">Tất cả khu vực</option><option>Quận 10</option><option>Bình Thạnh</option>
          </select>
        </label>
        <label>Ngân sách tối đa
          <select value={maxPrice} onChange={(event) => onMaxPriceChange(Number(event.target.value))}>
            <option value={4000000}>Dưới 4 triệu</option><option value={5000000}>Dưới 5 triệu</option>
            <option value={6000000}>Dưới 6 triệu</option><option value={10000000}>Dưới 10 triệu</option>
          </select>
        </label>
      </div>
      <div className={styles.priceChips}>
        {[4000000, 5000000, 6000000].map((price) => <button key={price} type="button" aria-pressed={maxPrice === price} onClick={() => onMaxPriceChange(price)}>Dưới {price / 1000000} triệu</button>)}
      </div>
      <div className={styles.quickSearchActions}>
        <button type="button" onClick={onReset}>Đặt lại</button><button type="button" className={styles.applyFilter} onClick={onApply}>Áp dụng</button>
      </div>
    </div>
  );
}
