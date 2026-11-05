import type { ListingPhoto } from "./types";

export async function readListingPhoto(file: File): Promise<ListingPhoto> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error(`${file.name}: chỉ nhận JPG, PNG hoặc WebP.`);
  if (file.size >= 5 * 1024 * 1024) throw new Error(`${file.name}: ảnh phải dưới 5MB.`);
  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Không đọc được ảnh."));
    reader.onerror = () => reject(new Error(`Không đọc được ${file.name}.`));
    reader.readAsDataURL(file);
  });
  const image = new window.Image();
  image.src = url;
  try { await image.decode(); } catch { throw new Error(`${file.name}: tệp ảnh bị lỗi hoặc không đọc được.`); }
  return { id: crypto.randomUUID(), url, name: file.name };
}
