"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { listingAmenities, mockLocations, propertyKinds } from "../constants";
import { ListingPreview } from "./ListingPreview";
import type { ListingFormValues, ListingWorkspace } from "../types";
import type { validateListingStep } from "../form";
import styles from "@/styles/owner-supply.module.css";

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

export function ListingFormSteps({ step, values, workspace, onChange, onSelectRoom, onPhotos, processing, error, confirmed, onConfirm }: Props) {
  const upload = useRef<HTMLInputElement>(null);
  const inputProps = (field: keyof ListingFormValues) => ({ id: `listing-${field}`, "aria-invalid": error?.field === field || undefined, "aria-describedby": error?.field === field ? `listing-error-${field}` : undefined });
  const errorText = (field: keyof ListingFormValues) => error?.field === field ? <small id={`listing-error-${field}`} className={styles.fieldError} role="alert">{error.message}</small> : null;
  const textField = (field: keyof ListingFormValues, label: string, options: { type?: string; placeholder?: string; min?: number; max?: number; maxLength?: number; required?: boolean; } = {}) => <label className={styles.field}>{label}<input {...inputProps(field)} type={options.type ?? "text"} value={String(values[field])} onChange={event => onChange(field, event.target.value)} {...options} />{errorText(field)}</label>;
  return (
    <div className={styles.fields}>
      {step === 0 && <>
        <label className={`${styles.field} ${styles.full}`}>Chọn phòng trong sổ<select value={values.roomId} onChange={event => onSelectRoom(event.target.value)}>
          <option value="">Không gắn phòng — nhập thông tin mới</option>{workspace.rooms.map(room => <option value={room.id} key={room.id}>{room.code} · {workspace.buildings.find(building => building.id === room.buildingId)?.name}</option>)}</select>
          <small>Không bắt buộc. Chọn phòng để điền sẵn địa chỉ, diện tích và giá thuê.</small>
        </label>
        <label className={styles.field}>Loại hình *<select {...inputProps("kind")} value={values.kind} onChange={event => onChange("kind", event.target.value)} required>
          <option value="">Chọn loại hình</option>{propertyKinds.map(kind => <option key={kind}>{kind}</option>)}</select>{errorText("kind")}</label>
        {textField("area", "Diện tích (m²) *", { type: "number", min: 5, max: 500, placeholder: "Ví dụ: 28", required: true })}
        {textField("bedrooms", "Số phòng ngủ", { type: "number", min: 0, max: 50 })}{textField("bathrooms", "Số phòng tắm", { type: "number", min: 0, max: 50 })}
        <div className={`${styles.infoBanner} ${styles.full}`}>Địa chỉ đầy đủ dùng cho vận hành. Thẻ tin công khai chỉ hiển thị phường/xã và thành phố.</div>
        <label className={styles.field}>Thành phố *<select {...inputProps("city")} value={values.city} onChange={event => { onChange("city", event.target.value); onChange("ward", ""); }} required>
          <option value="">Chọn thành phố</option>{Object.keys(mockLocations).map(city => <option key={city}>{city}</option>)}</select>{errorText("city")}</label>
        <label className={styles.field}>Phường/xã *<select {...inputProps("ward")} value={values.ward} disabled={!values.city} onChange={event => onChange("ward", event.target.value)} required>
          <option value="">Chọn phường/xã</option>{(mockLocations[values.city] ?? []).map(ward => <option key={ward}>{ward}</option>)}</select>{errorText("ward")}<small>Danh mục địa chỉ giới hạn trong dữ liệu mẫu.</small>
        </label>
        <div className={styles.full}>{textField("address", "Địa chỉ chi tiết *", { placeholder: "Số nhà, tên đường", maxLength: 250, required: true })}</div>
      </>}
      {step === 1 && <>
        {textField("monthlyRent", "Giá thuê/tháng (đ) *", { type: "number", min: 500000, max: 200000000, placeholder: "5200000", required: true })}
        {textField("deposit", "Tiền cọc *", { placeholder: "Ví dụ: 1 tháng", maxLength: 100, required: true })}
        {textField("electricity", "Giá điện", { placeholder: "4.000 đ/kWh", maxLength: 100 })}{textField("water", "Giá nước", { placeholder: "100.000 đ/người", maxLength: 100 })}
        {textField("serviceFee", "Phí dịch vụ", { placeholder: "200.000 đ/tháng", maxLength: 100 })}{textField("parkingFee", "Phí giữ xe", { placeholder: "150.000 đ/xe", maxLength: 100 })}
        <fieldset className={styles.full}>
          <legend className={`${styles.subheading} mb-3`}>Tiện ích</legend>
          <div className={styles.checkChoices}>{listingAmenities.map(item => <label key={item}>
            <input type="checkbox" checked={values.amenities.includes(item)} onChange={() => onChange("amenities", values.amenities.includes(item) ? values.amenities.filter(amenity => amenity !== item) : [...values.amenities, item])} />{item}</label>)}</div>
        </fieldset>
        <label className={`${styles.field} ${styles.full}`}>Nội quy<textarea value={values.rules} onChange={event => onChange("rules", event.target.value)} maxLength={2000} rows={3} placeholder="Giờ giấc, số người ở, hút thuốc…" />
        </label>
        {textField("availableFrom", "Ngày có thể vào ở", { type: "date" })}
      </>}
      {step === 2 && <>
        <div className={styles.full}>
          <label className={styles.upload} id="listing-photos" tabIndex={-1}>
            <ImagePlus size={27} />
            <strong>Hình ảnh chỗ ở * ({values.photos.length}/8)</strong>
            <input ref={upload} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={processing || values.photos.length >= 8} onChange={event => { onPhotos(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
            <small>JPG, PNG hoặc WebP · tối đa 8 ảnh · mỗi ảnh dưới 5MB. Ảnh lưu trên trình duyệt, không tải lên máy chủ.</small>
          </label>
          {errorText("photos")}{processing && <p className={styles.muted} role="status">Đang đọc ảnh…</p>}
        </div>
        <div className={`${styles.editPhotos} ${styles.full}`}>{values.photos.map((photo, index) => <article className={styles.editPhoto} key={photo.id}>
          <div>
            <Image src={photo.url} alt={photo.name} fill sizes="(max-width: 599px) 40vw, 220px" className="object-cover" unoptimized={photo.url.startsWith("data:")} />
          </div>
          <p>{photo.name}</p>
          <footer>
            <button type="button" disabled={processing || index === 0} onClick={() => onChange("photos", [photo, ...values.photos.filter(item => item.id !== photo.id)])}>{index === 0 ? "Ảnh bìa" : "Đặt ảnh bìa"}</button>
            <button type="button" disabled={processing} aria-label={`Bỏ ảnh ${index + 1}`} onClick={() => onChange("photos", values.photos.filter(item => item.id !== photo.id))}>
              <X size={14} />
            </button>
          </footer>
        </article>)}</div>
        <label className={`${styles.field} ${styles.full}`}>Tiêu đề tin *<input {...inputProps("title")} value={values.title} onChange={event => onChange("title", event.target.value)} maxLength={90} required placeholder="Studio sáng thoáng, đầy đủ nội thất" />
          <small>{values.title.length}/90 ký tự · tối thiểu 10</small>{errorText("title")}</label>
        <label className={`${styles.field} ${styles.full}`}>Mô tả chi tiết *<textarea {...inputProps("description")} value={values.description} onChange={event => onChange("description", event.target.value)} maxLength={5000} required rows={7} placeholder="Mô tả không gian, ánh sáng, nội thất, kết nối và đối tượng phù hợp…" />
          <small>{values.description.length} ký tự · tối thiểu 60</small>{errorText("description")}</label>
      </>}
      {step === 3 && <>
        <div className={styles.full}>
          <ListingPreview values={values} />
        </div>
        {textField("contactName", "Tên người liên hệ *", { maxLength: 100, required: true })}{textField("contactPhone", "Số điện thoại liên hệ *", { type: "tel", placeholder: "0901234567", maxLength: 20, required: true })}
        <p className={`${styles.muted} ${styles.full}`}>Số điện thoại không hiển thị trên thẻ tin công khai. Đây là bản gửi duyệt mẫu, chưa có tin nào được xuất bản ra website.</p>
        <label className={`${styles.confirm} ${styles.full}`}>
          <input type="checkbox" id="listing-confirm" checked={confirmed} onChange={event => onConfirm(event.target.checked)} />
          <span>Tôi xác nhận thông tin trên là chính xác và đồng ý để HomeMatch kiểm duyệt trước khi hiển thị.</span>
        </label>
      </>}
    </div>
  );
}
