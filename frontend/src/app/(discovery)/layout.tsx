import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MessageSquare } from "lucide-react";
import { referenceLink } from "@/lib/config";
import styles from "@/styles/landing.module.css";

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.siteShell}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Link
        className={styles.feedbackTab}
        href="/tro-ly-ai?q=Tôi muốn đóng góp ý kiến về trải nghiệm HomeMatch"
        aria-label="Gửi góp ý về trải nghiệm HomeMatch"
      >
        <MessageSquare size={17} aria-hidden="true" /> <span>Góp ý</span>
      </Link>
    </div>
  );
}
