import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  spacing?: "sm" | "md" | "lg";
}

const spacingStyles = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

/** Vertical padding wrapper used to give every homepage section consistent rhythm. */
export function Section({ children, className, id, as: Tag = "section", spacing = "md" }: SectionProps) {
  return (
    <Tag id={id} className={cn(spacingStyles[spacing], className)}>
      {children}
    </Tag>
  );
}
