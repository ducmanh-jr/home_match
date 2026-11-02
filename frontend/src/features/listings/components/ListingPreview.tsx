import Image from "next/image";
import { Check, ImageIcon, MapPin, Minus } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { formatMoney } from "../constants";
import { listingQuality } from "../form";
import type { ListingFormValues } from "../types";
import { cn } from "@/lib/utils";

export function ListingPreview({
  values,
  showRequirements = false,
}: {
  values: ListingFormValues;
  showRequirements?: boolean;
}) {
  const requirements = [
    { label: "Tiêu đề từ 10 ký tự", valid: values.title.trim().length >= 10 },
    { label: "Mô tả từ 60 ký tự", valid: values.description.trim().length >= 60 },
    { label: "Có phường/xã", valid: Boolean(values.ward) },
    { label: "Ít nhất 1 ảnh", valid: values.photos.length >= 1 },
    {
      label: "Giá trong dải hợp lệ",
      valid: Number(values.monthlyRent) >= 500000 && Number(values.monthlyRent) <= 200000000,
    },
    { label: "Diện tích 5–500 m²", valid: Number(values.area) >= 5 && Number(values.area) <= 500 },
  ];
  const quality = listingQuality(values);

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
      <Card className="overflow-hidden border-slate-200">
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500">
          Người thuê sẽ thấy thế này
        </div>
        <div className="aspect-video relative bg-slate-100 flex items-center justify-center text-slate-300">
          {values.photos[0] ? (
            <Image
              src={values.photos[0].url}
              alt={values.title || "Ảnh chỗ ở"}
              fill
              sizes="(max-width: 599px) 85vw, 310px"
              className="object-cover"
              unoptimized={values.photos[0].url.startsWith("data:")}
            />
          ) : (
            <ImageIcon size={32} />
          )}
        </div>
        <div className="p-4 space-y-2">
          <small className="text-xs text-slate-400 block font-medium">
            {values.kind || "Chưa chọn loại hình"}
            {values.area && ` · ${values.area} m²`}
          </small>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
            {values.title.trim() || "Tiêu đề tin sẽ hiện ở đây"}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 m-0">
            <MapPin size={12} className="text-slate-400 shrink-0" />
            <span className="truncate">{[values.ward, values.city].filter(Boolean).join(", ") || "Chưa có địa chỉ"}</span>
          </p>
          <div className="pt-1">
            <strong className="text-base font-bold text-orange-600 block">
              {values.monthlyRent ? formatMoney(values.monthlyRent) : "— đ"}
              <small className="text-xs font-normal text-slate-400"> /tháng</small>
            </strong>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {values.amenities.slice(0, 4).map(item => (
              <Badge key={item} tone="default" className="text-[11px] py-0 px-2">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {showRequirements && (
        <Card className="p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">Điều kiện gửi duyệt</h3>
          <div className="space-y-1.5 text-xs">
            {requirements.map(item => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-2",
                  item.valid ? "text-emerald-700 font-medium" : "text-slate-400",
                )}
              >
                {item.valid ? (
                  <Check size={13} className="text-emerald-600 shrink-0" />
                ) : (
                  <Minus size={13} className="text-slate-300 shrink-0" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Chất lượng nội dung</span>
              <strong className="font-bold text-slate-900">{quality}/100</strong>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${quality}%` }}
              />
            </div>
            <small className="text-[11px] text-slate-400 block leading-tight">
              Điểm tính từ mức độ đầy đủ thông tin, không thay cho kiểm duyệt.
            </small>
          </div>
        </Card>
      )}
    </div>
  );
}
