import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "cta" | "submit";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  loading?: boolean;
  href?: string;
}

export function Button({
  variant = "gold",
  size = "md",
  leftIcon,
  loading = false,
  href,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const cls = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls}>
        {leftIcon && <span className="btn-icon">{leftIcon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {leftIcon && <span className="btn-icon">{leftIcon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
