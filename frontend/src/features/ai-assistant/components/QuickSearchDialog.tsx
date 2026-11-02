"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui";

interface QuickSearchDialogProps {
  district: string;
  maxPrice: number;
  onDistrictChange: (district: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
}

export function QuickSearchDialog({
  district,
  maxPrice,
  onDistrictChange,
  onMaxPriceChange,
  onClose,
  onReset,
  onApply,
}: QuickSearchDialogProps) {
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
      if (
        target instanceof Element &&
        !panel.current?.contains(target) &&
        !target.closest('[aria-controls="quick-search-dialog"]')
      ) {
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panel}
      id="quick-search-dialog"
      role="dialog"
      aria-labelledby="quick-search-title"
      className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:w-80 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl text-xs space-y-3.5 z-40 animate-in fade-in-50 zoom-in-95 duration-100"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <strong id="quick-search-title" className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
          <SlidersHorizontal size={14} className="text-orange-500" /> Tìm nhanh
        </strong>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bộ lọc"
          className="p-1 rounded-md text-slate-400 hover:text-slate-700"
        >
          <X size={15} />
        </button>
      </div>

      <div className="space-y-2.5">
        <label className="flex flex-col text-slate-700 font-medium">
          <span className="mb-1">Khu vực</span>
          <select
            value={district}
            onChange={event => onDistrictChange(event.target.value)}
            className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-orange-500"
          >
            <option value="all">Tất cả khu vực</option>
            <option>Quận 10</option>
            <option>Bình Thạnh</option>
          </select>
        </label>

        <label className="flex flex-col text-slate-700 font-medium">
          <span className="mb-1">Ngân sách tối đa</span>
          <select
            value={maxPrice}
            onChange={event => onMaxPriceChange(Number(event.target.value))}
            className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-orange-500"
          >
            <option value={4000000}>Dưới 4 triệu</option>
            <option value={5000000}>Dưới 5 triệu</option>
            <option value={6000000}>Dưới 6 triệu</option>
            <option value={10000000}>Dưới 10 triệu</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {[4000000, 5000000, 6000000].map(price => (
          <button
            key={price}
            type="button"
            aria-pressed={maxPrice === price}
            onClick={() => onMaxPriceChange(price)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
              maxPrice === price
                ? "bg-orange-50 text-orange-700 border border-orange-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Dưới {price / 1000000} triệu
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={onReset} className="text-slate-500">
          Đặt lại
        </Button>
        <Button variant="orange" size="sm" onClick={onApply}>
          Áp dụng
        </Button>
      </div>
    </div>
  );
}
