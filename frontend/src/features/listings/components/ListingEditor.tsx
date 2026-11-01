"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/features/auth/context";
import { ManagementState } from "@/components/management/ManagementUI";
import { useListingWorkspace } from "../use-listing-workspace";
import { clearListingDraft, getListingDraft, saveListingDraft, saveOwnerListing } from "../api";
import { emptyListingForm, roomToForm, validateListingStep } from "../form";
import { readListingPhoto } from "../photos";
import { ListingFormSteps } from "./ListingFormSteps";
import { ListingPreview } from "./ListingPreview";
import type { ListingDraft, ListingFormValues, ListingPhoto, OwnerListing } from "../types";
import base from "@/styles/owner-management.module.css";
import styles from "@/styles/owner-supply.module.css";

const steps = ["Phòng & thông tin", "Giá & tiện ích", "Ảnh & nội dung", "Xem trước & đăng"];
const descriptions = ["Loại hình, diện tích thực tế và nơi chỗ ở nằm.", "Tách từng khoản để người thuê hiểu tổng ngân sách trước khi xem.", "Dùng ảnh thật, rõ sáng và mô tả đúng chỗ ở của bạn.", "Kiểm tra thẻ tin và người liên hệ trước khi gửi duyệt."];

export function ListingEditor({ editingId, initialRoomId }: { editingId?: string; initialRoomId?: string; }) {
  const { data, error, retry, ownerId } = useListingWorkspace();
  const { user } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<ListingFormValues>(emptyListingForm);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [draftAttempt, setDraftAttempt] = useState(0);
  const [initError, setInitError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<ReturnType<typeof validateListingStep>>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"saving" | "saved" | "error">("saved");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState<OwnerListing | null>(null);
  const key = editingId ? `edit:${editingId}` : initialRoomId ? `room:${initialRoomId}` : "new";
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(true);
  const terminal = useRef(false);
  const sending = useRef(false);
  const latest = useRef<ListingDraft | null>(null);
  const version = useRef(0);
  const formTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !ownerId) return;
    let active = true;
    setInitError(null);
    getListingDraft(ownerId, key).then(draft => {
      if (!active) return;
      const existing = data.listings.find(listing => listing.id === editingId);
      const room = data.rooms.find(room => room.id === initialRoomId);
      const initial = existing ?? (room ? roomToForm(room, data.buildings.find(building => building.id === room.buildingId)) : { ...emptyListingForm(), contactName: user?.fullName ?? "" });
      setValues(draft?.values ? { ...emptyListingForm(), ...draft.values } : initial);
      setStep(Math.max(0, Math.min(3, draft?.step ?? 0)));
      setReady(true);
      if (draft) setMessage("Đã khôi phục bản nháp trên thiết bị này.");
    }, reason => { if (active) setInitError(reason instanceof Error ? reason.message : "Không đọc được bản nháp."); });
    return () => { active = false; };
  }, [data, ownerId, key, editingId, initialRoomId, draftAttempt, user?.fullName]);

  const persist = useCallback((draft: ListingDraft) => {
    const currentVersion = ++version.current;
    if (mounted.current) { setSaveState("saving"); setSaveError(null); }
    const action = queue.current.catch(() => { }).then(() => saveListingDraft(ownerId, key, draft));
    queue.current = action;
    action.then(() => { if (mounted.current && version.current === currentVersion) setSaveState("saved"); }, reason => { if (mounted.current) { setSaveState("error"); setSaveError(reason instanceof Error ? reason.message : "Không lưu được nháp."); } });
    return action;
  }, [ownerId, key]);

  useEffect(() => {
    if (!ready || terminal.current) return;
    const draft = { values, step, savedAt: new Date().toISOString() };
    latest.current = draft;
    version.current += 1;
    setSaveState("saving");
    timer.current = setTimeout(() => { void persist(draft).catch(() => { }); }, 600);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [values, step, ready, persist]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      if (latest.current && !terminal.current && !sending.current) {
        const draft = latest.current;
        queue.current = queue.current.catch(() => { }).then(() => saveListingDraft(ownerId, key, draft));
        void queue.current.catch(() => { });
      }
    };
  }, [ownerId, key]);

  useEffect(() => {
    function warnUnsaved(event: BeforeUnloadEvent) {
      if (!terminal.current && (saveState !== "saved" || processing || submitting)) { event.preventDefault(); event.returnValue = ""; }
    }
    window.addEventListener("beforeunload", warnUnsaved);
    return () => window.removeEventListener("beforeunload", warnUnsaved);
  }, [saveState, processing, submitting]);

  function change<K extends keyof ListingFormValues>(field: K, value: ListingFormValues[K]) {
    setValues(previous => ({ ...previous, [field]: value })); setFieldError(null); setMessage(null);
  }

  function focusError(issue: NonNullable<ReturnType<typeof validateListingStep>>) {
    setFieldError(issue);
    requestAnimationFrame(() => { const element = document.getElementById(`listing-${issue.field}`); element?.scrollIntoView({ block: "center", behavior: "smooth" }); element?.focus({ preventScroll: true }); });
  }

  async function saveNow() {
    if (timer.current) clearTimeout(timer.current);
    await persist({ values, step, savedAt: new Date().toISOString() });
  }

  async function addPhotos(files: File[]) {
    if (!files.length || processing) return;
    const remaining = 8 - values.photos.length;
    if (remaining <= 0) { setMessage("Tin đã đủ 8 ảnh. Bỏ bớt ảnh trước khi thêm."); return; }
    setProcessing(true); setMessage(null);
    const photos: ListingPhoto[] = [];
    const failures: string[] = [];
    for (const file of files.slice(0, remaining)) {
      try { photos.push(await readListingPhoto(file)); } catch (reason) { failures.push(reason instanceof Error ? reason.message : "Không đọc được ảnh."); }
    }
    if (!mounted.current) return;
    setValues(previous => ({ ...previous, photos: [...previous.photos, ...photos].slice(0, 8) }));
    setProcessing(false); setFieldError(null);
    if (files.length > remaining) failures.push(`Chỉ lấy ${remaining} ảnh vì mỗi tin tối đa 8 ảnh.`);
    if (failures.length) setMessage(failures.join(" "));
  }

  async function submit() {
    if (sending.current || processing) return;
    for (let current = 0;current < 4;current++) {
      const issue = validateListingStep(current, values);
      if (issue) { setStep(current); focusError(issue); return; }
    }
    if (!confirmed) { setMessage("Đánh dấu ô xác nhận thông tin trước khi gửi duyệt."); document.getElementById("listing-confirm")?.focus(); return; }
    sending.current = true; setSubmitting(true); setMessage(null);
    try {
      await saveNow();
      const listing = await saveOwnerListing(ownerId, values, editingId);
      terminal.current = true;
      try { await clearListingDraft(ownerId, key); } catch { if (mounted.current) setMessage("Tin đã lưu, nhưng bản nháp cũ chưa xóa được trên thiết bị."); }
      if (mounted.current) setResult(listing);
    } catch (reason) { if (mounted.current) setMessage(reason instanceof Error ? reason.message : "Chưa gửi được tin. Nội dung đã nhập vẫn được giữ."); }
    finally { sending.current = false; if (mounted.current) setSubmitting(false); }
  }

  if (error) return <ManagementState state="error" title="Không tải được dữ liệu tạo tin" description={error} onRetry={retry} />;
  if (data && editingId && !data.listings.some(listing => listing.id === editingId)) return <ManagementState state="empty" title="Không tìm thấy tin cần sửa" description="Quay lại danh sách để chọn tin đang có trong sổ." retryLabel="Về danh sách tin" onRetry={() => router.push("/owner/v2?m=tin-bat-dong-san")} />;
  if (data && initialRoomId && !data.rooms.some(room => room.id === initialRoomId)) return <ManagementState state="empty" title="Không tìm thấy căn/phòng" retryLabel="Về sổ phòng" onRetry={() => router.push("/owner/v2?m=can-ho-phong")} />;
  if (initError) return <ManagementState state="error" title="Chưa mở được bản nháp" description={initError} onRetry={() => setDraftAttempt(value => value + 1)} />;
  if (!data || !ready) return <ManagementState state="loading" title="Đang chuẩn bị nội dung tin…" />;
  if (result) return <div className={styles.supply}>
    <section className={styles.success}>
      <CheckCircle2 size={48} />
      <h1>Đã gửi tin mẫu để chờ duyệt</h1>
      <p>Tin {result.code} đã được lưu trên trình duyệt này. Tin chưa được xuất bản ra website và không gửi đến hệ thống thật.</p>{message && <p>{message}</p>}<div className={base.headerActions}>
        <Link href={`/owner/v2?m=tin-bat-dong-san&listing=${result.id}`} className={base.primaryButton}>Xem tin vừa tạo</Link>
        <Link href="/owner/v2?m=tin-bat-dong-san" className={base.secondaryButton}>Về danh sách tin</Link>
      </div>
    </section>
  </div>;

  return (
    <div className={styles.supply}>
      <header className={base.pageHeader}>
        <div>
          <h1 className={base.pageHeading}>{editingId ? "Chỉnh sửa tin cho thuê" : "Tạo tin cho thuê"}</h1>
          <p>Điền thông tin đúng thực tế để người thuê dễ so sánh trước khi xem.</p>
        </div>
        <div className={base.headerActions}>
          <button type="button" className={base.secondaryButton} disabled={processing || submitting} onClick={async () => { try { await saveNow(); router.push("/owner/v2?m=tin-bat-dong-san"); } catch { } }}>
            <ArrowLeft size={14} /> Thoát</button>
          <button type="button" className={base.primaryButton} disabled={processing || submitting} onClick={async () => { try { await saveNow(); setMessage("Đã lưu bản nháp trên thiết bị này."); } catch { } }}>
            <Save size={14} /> Lưu nháp</button>
        </div>
      </header>
      <nav className={styles.steps} aria-label="Các bước tạo tin">{steps.map((label, index) => <button type="button" key={label} aria-current={step === index ? "step" : undefined} disabled={submitting || processing || index > step + 1} onClick={() => { if (index > step) { const issue = validateListingStep(step, values); if (issue) { focusError(issue); return; } } setFieldError(null); setStep(index); }}>
        <i>{index < step ? <Check size={13} /> : index + 1}</i>
        <span>
          <small>Bước {index + 1}</small>
          <strong>{label}</strong>
        </span>
      </button>)}</nav>
      {message && <div className={styles.infoBanner} role="status">{message}</div>}{saveError && <div className={styles.errorBanner} role="alert">{saveError}</div>}
      <div className={styles.formLayout}>
        <form noValidate onSubmit={event => { event.preventDefault(); if (step === 3) void submit(); else { const issue = validateListingStep(step, values); if (issue) { focusError(issue); return; } setFieldError(null); setStep(step + 1); requestAnimationFrame(() => formTop.current?.scrollIntoView({ block: "start", behavior: "smooth" })); } }} className={styles.formMain}>
          <div className={styles.formCard} ref={formTop}>
            <h2>{steps[step]}</h2>
            <p className={styles.muted}>{descriptions[step]}</p>
            <fieldset disabled={submitting || processing}>
              <ListingFormSteps step={step} values={values} workspace={data} onChange={change} onSelectRoom={id => { if (!id) { change("roomId", ""); return; } const room = data.rooms.find(item => item.id === id); if (!room) return; const preset = roomToForm(room, data.buildings.find(building => building.id === room.buildingId)); setValues(previous => ({ ...previous, ...preset, title: previous.title, description: previous.description || preset.description, photos: previous.photos.length ? previous.photos : preset.photos, contactName: previous.contactName, contactPhone: previous.contactPhone })); setFieldError(null); setMessage("Đã điền thông tin từ sổ phòng. Kiểm tra lại trước khi tiếp tục."); }} onPhotos={addPhotos} processing={processing} error={fieldError} confirmed={confirmed} onConfirm={setConfirmed} />
            </fieldset>
          </div>
          <footer className={styles.formFooter}>
            <button type="button" className={base.secondaryButton} disabled={step === 0 || submitting || processing} onClick={() => { setFieldError(null); setStep(step - 1); }}>Quay lại</button>
            <span className={styles.saveStatus} role="status">{saveState === "saving" ? "Đang lưu nháp…" : saveState === "error" ? "Chưa lưu được nháp" : "Đã lưu nháp trên thiết bị"}</span>
            <button type="submit" className={base.primaryButton} disabled={submitting || processing}>{submitting ? "Đang gửi…" : step === 3 ? "Gửi tin để duyệt" : "Tiếp tục"}{step !== 3 && <ChevronRight size={14} />}</button>
          </footer>
        </form>
        <ListingPreview values={values} showRequirements />
      </div>
    </div>
  );
}
