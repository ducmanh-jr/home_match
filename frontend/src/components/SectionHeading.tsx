import type { ReactNode } from "react";
import styles from "@/styles/landing.module.css";

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function SectionHeading({ id, kicker, title, description, children }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
