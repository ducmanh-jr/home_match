import type { Metadata } from "next";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ | HomeMatch",
  description:
    "Liên hệ HomeMatch về nhu cầu tìm phòng, đăng tin hoặc báo cáo vấn đề.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <ContactInfo />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
