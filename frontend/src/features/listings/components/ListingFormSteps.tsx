"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { listingAmenities, mockLocations, propertyKinds } from "../constants";
import { ListingPreview } from "./ListingPreview";
import type { ListingFormValues, ListingWorkspace } from "../types";
import type { validateListingStep } from "../form";
import { cn } from "@/lib/utils";

interface Props {
  step: number;
  values: ListingFormValues;
  workspace: ListingWorkspace;
  onChange: <K extends keyof ListingFormValues>(key: K, value: ListingFormValues[K]) => void;
  onSelectRoom: (id: string) => void;
  onPhotos: (files: File[]) => void;
  processing: boolean;
  error: ReturnType<typeof validateListingStep>;
  confirmed: boolean;
  onConfirm: (confirmed: boolean) => void;
}

export function ListingFormSteps({
  step,
  values,
  workspace,
  onChange,
  onSelectRoom,
  onPhotos,
  processing,
  error,
  confirmed,
  onConfirm,
}: Props) {
  const upload = useRef<HTMLInputElement>(null);

  const inputProps = (field: keyof ListingFormValues) => ({
    id: `listing-${field}`,
    "aria-invalid": error?.field === field || undefined,
    "aria-describedby": error?.field === field ? `listing-error-${field}` : undefined,
  });

  const errorText = (field: keyof ListingFormValues) =>
    error?.field === field ? (
      <small id={`listing-error-${field}`} className="text-xs text-rose-500 font-medium mt-1 block" role="alert">
        {error.message}
      </small>
    ) : null;

  const textField = (
    field: keyof ListingFormValues,
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      min?: number;
      max?: number;
      maxLength?: number;
      required?: boolean;
    } = {},
  ) => (
    <label className="flex flex-col text-xs font-semibold text-slate-700">
      <span>
        {label}
        {options.required && <span className="text-rose-500 ml-0.5">*</span>}
      </span>
      <input
        {...inputProps(field)}
        type={options.type ?? "text"}
        value={String(values[field])}
        onChange={event => onChange(field, event.target.value)}
        className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors"
        {...options}
      />
      {errorText(field)}
    </label>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* STEP 0: Thông tin cơ bản */}
      {step === 0 && (
        <>
          <label className="sm:col-span-2 flex flex-col text-xs font-semibold text-slate-700">
            <span>Chọn phòng trong sổ</span>
            <select
              value={values.roomId}
              onChange={event => onSelectRoom(event.target.value)}
              className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="">Không gắn phòng — nhập thông tin mới</option>
              {workspace.rooms.map(room => (
                <option value={room.id} key={room.id}>
                  {room.code} · {workspace.buildings.find(building => building.id === room.buildingId)?.name}
                </option>
              ))}
            </select>
            <small className="text-[11px] text-slate-400 font-normal mt-1">
              Không bắt buộc. Chọn phòng để điền sẵn địa chỉ, diện tích và giá thuê.
            </small>
          </label>

          <label className="flex flex-col text-xs font-semibold text-slate-700">
            <span>
              Loại hình <span className="text-rose-500">*</span>
            </span>
            <select
              {...inputProps("kind")}
              value={values.kind}
              onChange={event => onChange("kind", event.target.value)}
              required
              className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="">Chọn loại hình</option>
              {propertyKinds.map(kind => (
                <option key={kind}>{kind}</option>
              ))}
            </select>
            {errorText("kind")}
          </label>

          {textField("area", "Diện tích (m²)", {
            type: "number",
            min: 5,
            max: 500,
            placeholder: "Ví dụ: 28",
            required: true,
          })}

          {textField("bedrooms", "Số phòng ngủ", { type: "number", min: 0, max: 50 })}
          {textField("bathrooms", "Số phòng tắm", { type: "number", min: 0, max: 50 })}

          <div className="sm:col-span-2 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700">
            Địa chỉ đầy đủ dùng cho vận hành. Thẻ tin công khai chỉ hiển thị phường/xã và thành phố.
          </div>

          <label className="flex flex-col text-xs font-semibold text-slate-700">
            <span>
              Thành phố <span className="text-rose-500">*</span>
            </span>
            <select
              {...inputProps("city")}
              value={values.city}
              onChange={event => {
                onChange("city", event.target.value);
                onChange("ward", "");
              }}
              required
              className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="">Chọn thành phố</option>
              {Object.keys(mockLocations).map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>
            {errorText("city")}
          </label>

          <label className="flex flex-col text-xs font-semibold text-slate-700">
            <span>
              Phường/xã <span className="text-rose-500">*</span>
            </span>
            <select
              {...inputProps("ward")}
              value={values.ward}
              disabled={!values.city}
              onChange={event => onChange("ward", event.target.value)}
              required
              className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50 disabled:opacity-50"
            >
              <option value="">Chọn phường/xã</option>
              {(mockLocations[values.city] ?? []).map(ward => (
                <option key={ward}>{ward}</option>
              ))}
            </select>
            {errorText("ward")}
            <small className="text-[11px] text-slate-400 font-normal mt-1">
              Danh mục địa chỉ giới hạn trong dữ liệu mẫu.
            </small>
          </label>

          <div className="sm:col-span-2">
            {textField("address", "Địa chỉ chi tiết", {
              placeholder: "Số nhà, tên đường",
              maxLength: 250,
              required: true,
            })}
          </div>
        </>
      )}

      {/* STEP 1: Giá & tiện ích */}
      {step === 1 && (
        <>
          {textField("monthlyRent", "Giá thuê/tháng (đ)", {
            type: "number",
            min: 500000,
            max: 200000000,
            placeholder: "5200000",
            required: true,
          })}
          {textField("deposit", "Tiền cọc", {
            placeholder: "Ví dụ: 1 tháng",
            maxLength: 100,
            required: true,
          })}
          {textField("electricity", "Giá điện", { placeholder: "4.000 đ/kWh", maxLength: 100 })}
          {textField("water", "Giá nước", { placeholder: "100.000 đ/người", maxLength: 100 })}
          {textField("serviceFee", "Phí dịch vụ", { placeholder: "200.000 đ/tháng", maxLength: 100 })}
          {textField("parkingFee", "Phí giữ xe", { placeholder: "150.000 đ/xe", maxLength: 100 })}

          <fieldset className="sm:col-span-2 pt-2">
            <legend className="text-xs font-semibold text-slate-700 mb-2.5">Tiện ích</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {listingAmenities.map(item => (
                <label
                  key={item}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-200/80 hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={values.amenities.includes(item)}
                    onChange={() =>
                      onChange(
                        "amenities",
                        values.amenities.includes(item)
                          ? values.amenities.filter(amenity => amenity !== item)
                          : [...values.amenities, item],
                      )
                    }
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="sm:col-span-2 flex flex-col text-xs font-semibold text-slate-700 pt-2">
            <span>Nội quy</span>
            <textarea
              value={values.rules}
              onChange={event => onChange("rules", event.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Giờ giấc, số người ở, hút thuốc…"
              className="mt-1.5 p-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </label>

          <div className="sm:col-span-2">
            {textField("availableFrom", "Ngày có thể vào ở", { type: "date" })}
          </div>
        </>
      )}

      {/* STEP 2: Ảnh & nội dung */}
      {step === 2 && (
        <>
          <div className="sm:col-span-2 space-y-3">
            <label
              id="listing-photos"
              tabIndex={-1}
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50/50 hover:bg-orange-50/20 cursor-pointer transition-colors text-center"
            >
              <ImagePlus size={32} className="text-orange-500 mb-2" />
              <strong className="text-xs font-semibold text-slate-800">
                Hình ảnh chỗ ở <span className="text-rose-500">*</span> ({values.photos.length}/8)
              </strong>
              <input
                ref={upload}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={processing || values.photos.length >= 8}
                onChange={event => {
                  onPhotos(Array.from(event.target.files ?? []));
                  event.target.value = "";
                }}
                className="sr-only"
              />
              <small className="text-[11px] text-slate-400 mt-1">
                JPG, PNG hoặc WebP · tối đa 8 ảnh · mỗi ảnh dưới 5MB. Ảnh lưu trên trình duyệt, không tải lên máy chủ.
              </small>
            </label>
            {errorText("photos")}
            {processing && (
              <p className="text-xs text-slate-400 italic" role="status">
                Đang đọc ảnh…
              </p>
            )}
          </div>

          {values.photos.length > 0 && (
            <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {values.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="rounded-lg overflow-hidden border border-slate-200 bg-white flex flex-col justify-between shadow-xs"
                >
                  <div className="aspect-video relative bg-slate-100">
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      sizes="(max-width: 599px) 40vw, 220px"
                      className="object-cover"
                      unoptimized={photo.url.startsWith("data:")}
                    />
                  </div>
                  <div className="p-2 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      disabled={processing || index === 0}
                      onClick={() =>
                        onChange("photos", [photo, ...values.photos.filter(item => item.id !== photo.id)])
                      }
                      className={cn(
                        "text-[11px] font-semibold",
                        index === 0 ? "text-orange-600" : "text-slate-500 hover:text-slate-800",
                      )}
                    >
                      {index === 0 ? "Ảnh bìa" : "Đặt làm bìa"}
                    </button>
                    <button
                      type="button"
                      disabled={processing}
                      aria-label={`Bỏ ảnh ${index + 1}`}
                      onClick={() => onChange("photos", values.photos.filter(item => item.id !== photo.id))}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <label className="sm:col-span-2 flex flex-col text-xs font-semibold text-slate-700">
            <span>
              Tiêu đề tin <span className="text-rose-500">*</span>
            </span>
            <input
              {...inputProps("title")}
              value={values.title}
              onChange={event => onChange("title", event.target.value)}
              maxLength={90}
              required
              placeholder="Studio sáng thoáng, đầy đủ nội thất"
              className="mt-1.5 h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-normal">
              <span>Tối thiểu 10 ký tự</span>
              <span>{values.title.length}/90</span>
            </div>
            {errorText("title")}
          </label>

          <label className="sm:col-span-2 flex flex-col text-xs font-semibold text-slate-700">
            <span>
              Mô tả chi tiết <span className="text-rose-500">*</span>
            </span>
            <textarea
              {...inputProps("description")}
              value={values.description}
              onChange={event => onChange("description", event.target.value)}
              maxLength={5000}
              required
              rows={6}
              placeholder="Mô tả không gian, ánh sáng, nội thất, kết nối và đối tượng phù hợp…"
              className="mt-1.5 p-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-normal">
              <span>Tối thiểu 60 ký tự</span>
              <span>{values.description.length}/5000</span>
            </div>
            {errorText("description")}
          </label>
        </>
      )}

      {/* STEP 3: Xem trước & đăng */}
      {step === 3 && (
        <>
          <div className="sm:col-span-2 mb-2">
            <ListingPreview values={values} />
          </div>
          {textField("contactName", "Tên người liên hệ", { maxLength: 100, required: true })}
          {textField("contactPhone", "Số điện thoại liên hệ", {
            type: "tel",
            placeholder: "0901234567",
            maxLength: 20,
            required: true,
          })}
          <p className="sm:col-span-2 text-xs text-slate-400 leading-relaxed">
            Số điện thoại không hiển thị trên thẻ tin công khai. Đây là bản gửi duyệt mẫu, chưa có tin nào được xuất bản
            ra website.
          </p>
          <label className="sm:col-span-2 flex items-start gap-2.5 p-3 rounded-lg bg-orange-50/60 border border-orange-200/80 cursor-pointer text-xs text-orange-950 font-medium">
            <input
              type="checkbox"
              id="listing-confirm"
              checked={confirmed}
              onChange={event => onConfirm(event.target.checked)}
              className="mt-0.5 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
            />
            <span>Tôi xác nhận thông tin trên là chính xác và đồng ý để HomeMatch kiểm duyệt trước khi hiển thị.</span>
          </label>
        </>
      )}
    </div>
  );
}
