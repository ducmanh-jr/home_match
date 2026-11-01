import Image from "next/image";
import { Check, ImageIcon, MapPin, Minus } from "lucide-react";
import { formatMoney } from "../constants";
import { listingQuality } from "../form";
import type { ListingFormValues } from "../types";
import styles from "@/styles/owner-supply.module.css";

export function ListingPreview({ values, showRequirements = false }: { values: ListingFormValues; showRequirements?: boolean; }) {
  const requirements = [
    { label: "Tiêu đề từ 10 ký tự", valid: values.title.trim().length >= 10 },
    { label: "Mô tả từ 60 ký tự", valid: values.description.trim().length >= 60 },
    { label: "Có phường/xã", valid: Boolean(values.ward) },
    { label: "Ít nhất 1 ảnh", valid: values.photos.length >= 1 },
    { label: "Giá trong dải hợp lệ", valid: Number(values.monthlyRent) >= 500000 && Number(values.monthlyRent) <= 200000000 },
    { label: "Diện tích 5–500 m²", valid: Number(values.area) >= 5 && Number(values.area) <= 500 },
  ];
  const quality = listingQuality(values);
  return (
    <div className={styles.previewAside}>
      <article className={styles.previewCard}>
        <header>Người thuê sẽ thấy thế này</header>
        <div className={styles.previewPhoto}>{values.photos[0] ? <Image src={values.photos[0].url} alt={values.title || "Ảnh chỗ ở"} fill sizes="(max-width: 599px) 85vw, 310px" className="object-cover" unoptimized={values.photos[0].url.startsWith("data:")} /> : <ImageIcon size={30} />}</div>
        <div className={styles.previewBody}>
          <small>{values.kind || "Chưa chọn loại hình"}{values.area && ` · ${values.area} m²`}</small>
          <h3>{values.title.trim() || "Tiêu đề tin sẽ hiện ở đây"}</h3>
          <p className={`${styles.muted} flex items-center gap-1 m-0`}>
            <MapPin size={12} />{[values.ward, values.city].filter(Boolean).join(", ") || "Chưa có địa chỉ"}</p>
          <strong className={styles.previewPrice}>{values.monthlyRent ? formatMoney(values.monthlyRent) : "— đ"}<small> /tháng</small>
          </strong>
          <div className={styles.tags}>{values.amenities.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div>
        </div>
      </article>
      {showRequirements && <section className={styles.requirements}>
        <h3>Điều kiện gửi duyệt</h3>{requirements.map(item => <div key={item.label} data-valid={item.valid}>{item.valid ? <Check size={13} /> : <Minus size={13} />}{item.label}</div>)}<div className={styles.quality}>
          <span>Chất lượng nội dung</span>
          <strong>{quality}/100</strong>
        </div>
        <div className={styles.qualityTrack}>
          <span style={{ width: `${quality}%` }} />
        </div>
        <small className={styles.muted}>Điểm tính từ mức độ đầy đủ thông tin, không thay cho kiểm duyệt.</small>
      </section>}
    </div>
  );
}
