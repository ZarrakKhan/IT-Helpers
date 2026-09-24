"use client";

import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TAP_DURATION, EASE_OUT_PREMIUM } from "@/lib/motion";

const MotionLink = motion.create(Link);

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// Outer element: shape, focus/disabled state, and (for primary) the gradient
// ring shell. Content lives in an inner span so the primary variant can sit a
// solid ink pill inside a 2px accent-gradient border without extra markup at
// the call site.
const baseStyles =
  "relative inline-flex items-center justify-center rounded-pill font-semibold tracking-[var(--tracking-heading)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-gradient p-[2px] shadow-md hover:shadow-glow",
  secondary: "bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-sm",
  outline: "bg-white/10 border border-grey-200 hover:bg-white/15 backdrop-blur-sm",
  ghost: "hover:bg-surface bg-transparent",
};

// Inner span carries the visible fill for the primary variant (solid ink +
// soft inset highlight); other variants leave it transparent since the outer
// element already carries their surface.
const innerVariantStyles: Record<ButtonVariant, string> = {
  primary: "rounded-pill bg-ink text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
  secondary: "text-white",
  outline: "text-foreground",
  ghost: "text-foreground",
};

// Minimum 48px min-height on every size keeps CTAs comfortably tap-friendly on mobile.
const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[48px] px-4 text-sm",
  md: "min-h-[48px] px-6 text-sm",
  lg: "min-h-[56px] px-8 text-base",
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Shows a spinner and disables the button — for async actions like form submission. */
  loading?: boolean;
}

/** DOM event props whose signatures collide with Framer Motion's gesture props of the same name. */
type MotionConflictingProps = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd";

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * CTA-ready Button. Renders a Next.js `<Link>` when `href` is provided,
 * otherwise a native `<button>`. Fully typed, accessible (visible focus
 * ring, disabled state), and themeable via the `variant`/`size` props.
 * Hover/tap feedback is skipped under `prefers-reduced-motion`.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, loading = false, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const classes = cn(baseStyles, variantStyles[variant], className);
    const innerClasses = cn(
      "inline-flex w-full items-center justify-center gap-2",
      innerVariantStyles[variant],
      sizeStyles[size],
    );

    const gestureProps = reduceMotion
      ? {}
      : {
          whileHover: { scale: 1.04 },
          whileTap: { scale: 0.95 },
          transition: { duration: TAP_DURATION, ease: EASE_OUT_PREMIUM },
        };

    const content = (
      <span className={innerClasses}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {children}
      </span>
    );

    if ("href" in props && props.href) {
      const { href, ...anchorProps } = props;
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...gestureProps}
          {...anchorProps}
        >
          {content}
        </MotionLink>
      );
    }

    const buttonProps = props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps>;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={buttonProps.disabled || loading}
        aria-busy={loading || undefined}
        {...gestureProps}
        {...buttonProps}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
