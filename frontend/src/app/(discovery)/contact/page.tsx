import type { Metadata } from "next";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { ContactForm } from "@/features/contact/components/ContactForm";
import styles from "@/styles/contact.module.css";

export const metadata: Metadata = {
  title: "Liên hệ | HomeMatch",
  description:
    "Liên hệ HomeMatch về nhu cầu tìm phòng, đăng tin hoặc báo cáo vấn đề.",
};

export default function ContactPage() {
  return (
    <section className={styles.contactPage}>
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
