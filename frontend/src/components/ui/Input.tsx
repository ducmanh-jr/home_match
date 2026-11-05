import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, inputSize = "md", disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center rounded-lg border bg-white transition-colors duration-150",
          error
            ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200"
            : "border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100",
          disabled && "bg-slate-50 opacity-60 cursor-not-allowed",
          className,
        )}
      >
        {icon && <span className="pl-3 text-slate-400 select-none flex items-center justify-center">{icon}</span>}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full bg-transparent px-3 text-slate-800 placeholder:text-slate-400 outline-none text-sm",
            inputSize === "sm" ? "h-8 text-xs" : inputSize === "lg" ? "h-11 text-base" : "h-9.5",
            icon && "pl-2",
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-700">
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-rose-500">*</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-rose-500 font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

