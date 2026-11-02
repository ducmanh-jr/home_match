import { appConfig } from "@/lib/config";
import { deleteMockRecord, readMockRecord, updateMockRecord } from "@/lib/mock-storage";
import { getPropertyInventory } from "@/features/properties/api";
import { isListingFormValues, isOwnerListing, validateListingStep } from "./form";
import type { ListingDraft, ListingFormValues, ListingStatus, ListingWorkspace, OwnerListing } from "./types";

function requireMocks() {
  if (!appConfig.useMocks) throw new Error("Tin đăng hiện chưa khả dụng. Vui lòng thử lại sau.");
}
const listingKey = (ownerId: string) => `owner:${ownerId}:listings`;
const draftKey = (ownerId: string, key: string) => `owner:${ownerId}:listing-draft:${key}`;

export async function getOwnerListings(ownerId: string): Promise<OwnerListing[]> {
  requireMocks();
  const { ownerListings } = await import("./mocks");
  const saved = await readMockRecord<unknown>(listingKey(ownerId));
  if (saved === undefined) return structuredClone(ownerListings);
  if (!Array.isArray(saved) || !saved.every(isOwnerListing)) throw new Error("Dữ liệu tin đã lưu không đúng định dạng. Nội dung cũ được giữ nguyên; không tự ghi đè bằng dữ liệu mẫu.");
  return saved;
}

export async function getListingWorkspace(ownerId: string): Promise<ListingWorkspace> {
  requireMocks();
  const [inventory, listings, { ownerPreview }] = await Promise.all([getPropertyInventory(), getOwnerListings(ownerId), import("@/features/dashboard/mocks")]);
  return { ...inventory, listings, leads: ownerPreview.leads };
}

export async function saveOwnerListing(ownerId: string, values: ListingFormValues, existingId?: string, status: ListingStatus = "pending_review"): Promise<OwnerListing> {
  requireMocks();
  if (!isListingFormValues(values)) throw new Error("Nội dung tin không đúng định dạng.");
  for (let step = 0; step < 4; step++) {
    const error = validateListingStep(step, values);
    if (error) throw new Error(error.message);
  }
  const { ownerListings } = await import("./mocks");
  const id = existingId ?? `listing-${crypto.randomUUID()}`;
  const at = new Date().toISOString();
  let saved!: OwnerListing;
  await updateMockRecord<OwnerListing[]>(listingKey(ownerId), ownerListings, previous => {
    const existing = previous.find(listing => listing.id === id);
    if (existingId && !existing) throw new Error("Không tìm thấy tin cần chỉnh sửa.");
    saved = { ...values, id, code: existing?.code ?? `HM-${Date.now().toString().slice(-7)}`, status, views: existing?.views ?? 0, saves: existing?.saves ?? 0, createdAt: existing?.createdAt ?? at, updatedAt: at, history: [{ id: crypto.randomUUID(), at, description: existing ? "Đã cập nhật nội dung tin mẫu và gửi duyệt lại." : "Đã gửi tin mẫu để chờ duyệt." }, ...(existing?.history ?? [])] };
    return existing ? previous.map(listing => listing.id === id ? saved : listing) : [saved, ...previous];
  });
  return saved;
}

export async function setOwnerListingStatus(ownerId: string, ids: string[], status: "hidden" | "pending_review"): Promise<void> {
  requireMocks();
  const { ownerListings } = await import("./mocks");
  await updateMockRecord<OwnerListing[]>(listingKey(ownerId), ownerListings, previous => {
    const eligible = previous.filter(listing => ids.includes(listing.id) && (status === "hidden" ? ["published", "needs_update"].includes(listing.status) : listing.status === "hidden"));
    if (!eligible.length) throw new Error("Trạng thái tin đã thay đổi. Tải lại danh sách trước khi thao tác.");
    return previous.map(listing => eligible.some(item => item.id === listing.id) ? { ...listing, status, updatedAt: new Date().toISOString(), history: [{ id: crypto.randomUUID(), at: new Date().toISOString(), description: status === "hidden" ? "Đã tạm ẩn tin mẫu." : "Đã gửi đăng lại tin mẫu để chờ duyệt." }, ...listing.history] } : listing);
  });
}

export async function getListingDraft(ownerId: string, key: string) {
  requireMocks();
  const draft = await readMockRecord<ListingDraft>(draftKey(ownerId, key));
  if (draft && (!isListingFormValues(draft.values) || !Number.isInteger(draft.step) || draft.step < 0 || draft.step > 3 || typeof draft.savedAt !== "string")) throw new Error("Bản nháp đã lưu không đúng định dạng. Bản cũ vẫn được giữ trên thiết bị.");
  return draft;
}
export async function saveListingDraft(ownerId: string, key: string, draft: ListingDraft) {
  requireMocks();
  await updateMockRecord(draftKey(ownerId, key), draft, () => draft);
}
export async function clearListingDraft(ownerId: string, key: string) {
  requireMocks();
  await deleteMockRecord(draftKey(ownerId, key));
}
