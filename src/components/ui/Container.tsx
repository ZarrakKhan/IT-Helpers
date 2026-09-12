import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Max-width (1200px) centered content wrapper with responsive gutters. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
