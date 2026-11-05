import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "default" | "success" | "warning" | "info" | "danger" | "orange";
export type BadgeVariant = BadgeTone | "neutral" | "error";

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-slate-100 text-slate-700 border-slate-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  danger: "bg-rose-50 text-rose-700 border-rose-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, variant, ...props }, ref) => {
    const resolvedTone: BadgeTone = (
      variant === "neutral" ? "default" :
      variant === "error" ? "danger" :
      (variant || tone || "default")
    ) as BadgeTone;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
          toneClasses[resolvedTone],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

