import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function SectionHeading({ id, kicker, title, description, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8">
      <div>
        <span className="relative pl-6 text-xs font-extrabold uppercase tracking-wider text-emerald-700 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-0.5 before:bg-emerald-600">
          {kicker}
        </span>
        <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mt-2 mb-2">
          {title}
        </h2>
        <p className="text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
