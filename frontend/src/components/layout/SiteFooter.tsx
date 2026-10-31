import Link from "next/link";
import { CircleCheck, Clock3, House, ShieldCheck } from "lucide-react";
import { referenceLink, siteLink } from "@/lib/config";
import styles from "@/styles/landing.module.css";

const columns = [
  {
    title: "Tìm chỗ ở",
    links: [
      ["Tìm phòng với trợ lý AI", "/tro-ly-ai"],
      ["Phòng trọ", "/tro-ly-ai?q=Tìm phòng trọ"],
      ["Studio", "/tro-ly-ai?q=Tìm studio"],
      ["Căn hộ", "/tro-ly-ai?q=Tìm căn hộ"],
      ["Gần trường đại học", "/tro-ly-ai?q=Tìm phòng gần trường đại học"],
      ["Gần nơi làm việc", "/tro-ly-ai?q=Tìm phòng gần nơi làm việc"],
    ],
  },
  {
    title: "Khám phá",
    links: [
      ["Khu vực người thuê", "/renter/dashboard"],
      ["Cẩm nang thuê trọ", "/cam-nang"],
      ["Về HomeMatch", "/about"],
      ["Câu hỏi thường gặp", "/faq"],
    ],
  },
  {
    title: "Dành cho chủ nhà",
    links: [
      ["Chương trình hợp tác", "/hop-tac"],
      ["Đăng tin cho thuê", "/auth/login"],
      ["Đăng nhập chủ nhà", "/auth/login"],
      ["Quản lý bất động sản", "/diagnostics"],
      ["Quản lý khách quan tâm", "/diagnostics"],
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      ["Trung tâm trợ giúp", "/help"],
      ["An toàn khi thuê", "/safety"],
      ["Báo cáo tin đăng", "/contact?topic=report"],
      ["Liên hệ", "/contact"],
    ],
  },
];

export function SiteFooter() {
  return (
    <>
      <section className={styles.assuranceStrip} aria-label="Cam kết dịch vụ">
        <div className={`${styles.container} ${styles.assuranceGrid}`}>
          <div>
            <ShieldCheck size={24} aria-hidden="true" />
            <span><strong>Tin đăng được kiểm duyệt</strong><small>Nội dung rõ ràng trước khi hiển thị</small></span>
          </div>
          <div>
            <CircleCheck size={24} aria-hidden="true" />
            <span><strong>Chi phí được trình bày rõ</strong><small>Dễ so sánh trước khi đi xem</small></span>
          </div>
          <div>
            <Clock3 size={24} aria-hidden="true" />
            <span><strong>Hỗ trợ đặt lịch xem</strong><small>Chọn thời gian phù hợp với bạn</small></span>
          </div>
        </div>
      </section>
      <footer className={styles.footer} id="help">
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.brand} aria-label="HomeMatch — Trang chủ">
              <House size={28} strokeWidth={2.5} aria-hidden="true" />
              <span>Home<span>Match</span></span>
            </Link>
            <p>Thuê đúng nơi — Sống đúng ý.</p>
            <span>Nền tảng tìm kiếm chỗ ở và đặt lịch xem dành cho người thuê tại Việt Nam.</span>
          </div>
          {columns.map((column) => (
            <div className={styles.footerColumn} key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, path]) => (
                <Link href={siteLink(path)} key={label}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className={`${styles.container} ${styles.legalBar}`}>
          <span>© {new Date().getFullYear()} HomeMatch. Bảo lưu mọi quyền.</span>
          <div>
            <Link href="/privacy">Chính sách bảo mật</Link>
            <Link href="/terms">Điều khoản sử dụng</Link>
            <Link href="/terms">Quy chế hoạt động</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
