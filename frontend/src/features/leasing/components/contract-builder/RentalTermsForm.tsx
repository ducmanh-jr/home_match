"use client";

import React from "react";
import type { LeaseContract, PropertyCategory } from "../../types";

interface RentalTermsFormProps {
  contract: LeaseContract;
  durationMonths: number;
  noticeDays: number;
  bankInfo: string;
  onCategoryChange: (cat: PropertyCategory) => void;
  onDurationChange: (months: number) => void;
  onStartDateChange: (startDate: string) => void;
  onNoticeDaysChange: (days: number) => void;
  onBankInfoChange: (info: string) => void;
  onUpdateTerms: (updates: Partial<LeaseContract["rentalTerms"]>) => void;
  onUpdateDates: (updates: { endDate?: string; handoverDate?: string }) => void;
}

export function RentalTermsForm({
  contract,
  durationMonths,
  noticeDays,
  bankInfo,
  onCategoryChange,
  onDurationChange,
  onStartDateChange,
  onNoticeDaysChange,
  onBankInfoChange,
  onUpdateTerms,
  onUpdateDates,
}: RentalTermsFormProps) {
  const category = contract.propertyCategory;
  const terms = contract.rentalTerms;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* LOẠI HÌNH CHO THUÊ */}
      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          LOẠI HÌNH CHO THUÊ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Card 1: Phòng trọ / nhà trọ */}
          <button
            type="button"
            onClick={() => onCategoryChange("room")}
            className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
              category === "room"
                ? "border-orange-400 bg-[#fffbf5] ring-1 ring-orange-400 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="mb-1 text-xs font-bold text-slate-900">Phòng trọ / nhà trọ</div>
            <p className="text-[11px] leading-snug text-slate-500">
              Chủ nhà bán lại điện nước, có nội quy chung và nghĩa vụ PCCC.
            </p>
          </button>

          {/* Card 2: Căn hộ chung cư */}
          <button
            type="button"
            onClick={() => onCategoryChange("apartment")}
            className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
              category === "apartment"
                ? "border-orange-400 bg-[#fffbf5] ring-1 ring-orange-400 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="mb-1 text-xs font-bold text-slate-900">Căn hộ chung cư</div>
            <p className="text-[11px] leading-snug text-slate-500">
              Ở trong toà nhà có ban quản lý: phí quản lý, thẻ cư dân, nội quy toà nhà.
            </p>
          </button>

          {/* Card 3: Nhà nguyên căn */}
          <button
            type="button"
            onClick={() => onCategoryChange("house")}
            className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
              category === "house"
                ? "border-orange-400 bg-[#fffbf5] ring-1 ring-orange-400 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="mb-1 text-xs font-bold text-slate-900">Nhà nguyên căn</div>
            <p className="text-[11px] leading-snug text-slate-500">
              Bên thuê tự quản lý cả căn: phân định sửa chữa lớn/nhỏ, điện nước đứng tên ai.
            </p>
          </button>
        </div>

        {/* Dynamic 3 specific clauses notice */}
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          {category === "room" &&
            "Mẫu này thêm 3 điều khoản riêng: Giá điện, nước và chi phí dịch vụ • An toàn phòng cháy chữa cháy • Đăng ký tạm trú và nội quy sinh hoạt."}
          {category === "apartment" &&
            "Mẫu này thêm 3 điều khoản riêng: Phí quản lý và dịch vụ toà nhà • Thẻ cư dân, chỗ để xe và nội quy toà nhà • Cải tạo và lắp đặt trong căn hộ."}
          {category === "house" &&
            "Mẫu này thêm 3 điều khoản riêng: Phân định sửa chữa lớn và sửa chữa nhỏ • Hợp đồng điện, nước và các dịch vụ • Sử dụng sân, khuôn viên và mặt tiền."}
        </p>
      </div>

      {/* Dynamic Alert Boxes per Screenshot */}
      {category === "room" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-xs text-[#991b1b]">
            <div className="mb-1 font-bold uppercase tracking-wider">RỦI RO BỊ PHẠT</div>
            <p className="leading-relaxed">
              Thu tiền điện cao hơn giá quy định có thể bị phạt 20–30 triệu đồng (áp dụng từ 25/5/2026), kèm nghĩa vụ hoàn trả phần chênh cho người thuê. Mẫu này đã ghi sẵn điều khoản tính đúng giá bậc thang.
            </p>
          </div>

          <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 text-xs text-[#92400e]">
            <div className="mb-1 font-bold uppercase tracking-wider">LƯU Ý</div>
            <p className="leading-relaxed">
              Nhà trọ từ 5 tầng hoặc khối tích từ 2.500 m³ trở lên thuộc diện cơ quan công an quản lý PCCC. Từ 5 phòng trở lên cần lập phương án chữa cháy trình UBND phường/xã.
            </p>
          </div>
        </div>
      )}

      {category === "apartment" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 text-xs text-[#92400e]">
            <div className="mb-1 font-bold uppercase tracking-wider">LƯU Ý</div>
            <p className="leading-relaxed">
              Ghi rõ trong hợp đồng ai trả phí quản lý và phí gửi xe. Đây là khoản dễ tranh cãi nhất ở căn hộ chung cư vì nó phát sinh hằng tháng và không nằm trong giá thuê.
            </p>
          </div>
        </div>
      )}

      {category === "house" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 text-xs text-[#92400e]">
            <div className="mb-1 font-bold uppercase tracking-wider">LƯU Ý</div>
            <p className="leading-relaxed">
              Nếu cho thuê để kinh doanh chứ không phải để ở, quan hệ này không thuộc phạm vi Luật Nhà ở 2023 mà theo hợp đồng thuê tài sản của Bộ luật Dân sự, và có thể phát sinh nghĩa vụ thuế. Nên hỏi ý kiến chuyên môn trước khi ký.
            </p>
          </div>
          <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 text-xs text-[#92400e]">
            <div className="mb-1 font-bold uppercase tracking-wider">LƯU Ý</div>
            <p className="leading-relaxed">
              Ghi rõ mức tiền ranh giới giữa sửa chữa lớn và nhỏ. Không ghi thì mọi hư hỏng đều thành tranh cãi ai trả.
            </p>
          </div>
        </div>
      )}

      {/* ĐIỀU KIỆN THUÊ */}
      <div className="pt-2">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          ĐIỀU KIỆN THUÊ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Ngày bắt đầu *</label>
            <input
              type="date"
              required
              value={contract.startDate}
              onChange={e => onStartDateChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Thời hạn (tháng)</label>
            <input
              type="number"
              min={1}
              value={durationMonths}
              onChange={e => onDurationChange(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Ngày kết thúc</label>
            <input
              type="date"
              value={contract.endDate}
              onChange={e => onUpdateDates({ endDate: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Ngày bàn giao nhà</label>
            <input
              type="date"
              value={contract.handoverDate}
              onChange={e => onUpdateDates({ handoverDate: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Giá thuê / tháng (đồng) *</label>
            <input
              type="number"
              step={100000}
              required
              value={terms.monthlyRent}
              onChange={e => onUpdateTerms({ monthlyRent: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Tiền cọc (đồng)</label>
            <input
              type="number"
              step={100000}
              value={terms.depositAmount}
              onChange={e => onUpdateTerms({ depositAmount: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Kỳ thu tiền</label>
            <select
              value={terms.paymentCycleMonths}
              onChange={e => onUpdateTerms({ paymentCycleMonths: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value={1}>Hàng tháng</option>
              <option value={3}>3 tháng / lần</option>
              <option value={6}>6 tháng / lần</option>
              <option value={12}>1 năm / lần</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Ngày đến hạn mỗi kỳ</label>
            <input
              type="number"
              min={1}
              max={31}
              value={terms.paymentDueDay}
              onChange={e => onUpdateTerms({ paymentDueDay: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Báo trước khi chấm dứt (ngày)</label>
            <input
              type="number"
              min={1}
              value={noticeDays}
              onChange={e => onNoticeDaysChange(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Phương thức thanh toán</label>
            <select
              value={terms.paymentMethod}
              onChange={e => onUpdateTerms({ paymentMethod: e.target.value as "transfer" | "cash" })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="transfer">Chuyển khoản</option>
              <option value="cash">Tiền mặt</option>
            </select>
          </div>

          {terms.paymentMethod === "transfer" && (
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-slate-700">Số tài khoản nhận tiền</label>
              <input
                type="text"
                value={bankInfo}
                onChange={e => onBankInfoChange(e.target.value)}
                placeholder="Ngân hàng – số tài khoản – chủ tài khoản"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

