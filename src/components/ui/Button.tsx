import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 ease-out-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-white shadow-md hover:bg-secondary-dark hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-primary text-white hover:bg-primary-light active:scale-[0.98]",
  outline:
    "border border-border text-foreground hover:border-secondary hover:text-secondary bg-transparent",
  ghost: "text-foreground hover:bg-surface bg-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * CTA-ready Button. Renders a Next.js `<Link>` when `href` is provided,
 * otherwise a native `<button>`. Fully typed, accessible (visible focus
 * ring, disabled state), and themeable via the `variant`/`size` props.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if ("href" in props && props.href) {
      const { href, ...anchorProps } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
