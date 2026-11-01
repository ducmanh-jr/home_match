import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOwnerModule, ownerModuleHref } from "./owner-navigation";
import styles from "@/styles/owner-management.module.css";

export function OwnerSectionPlaceholder({ moduleId }: { moduleId: string }) {
  const module = getOwnerModule(moduleId);
  return (
    <div className={styles.content}>
      <header className={styles.pageHeader}><div><h1 className={styles.pageHeading}>{module.label}</h1><p>{module.description}</p></div></header>
      <section className={styles.placeholder}>
        <div className={styles.placeholderInner}>
          <span className={styles.placeholderIcon}><module.icon size={26} /></span>
          <h2>{module.label}</h2>
          <p>Nội dung khu vực này đang được hoàn thiện. Bạn có thể quay về Tổng quan để tiếp tục khám phá giao diện quản trị.</p>
          <Link href={ownerModuleHref("tong-quan")} className={styles.secondaryButton}><ArrowLeft size={14} /> Về tổng quan</Link>
        </div>
      </section>
    </div>
  );
}
