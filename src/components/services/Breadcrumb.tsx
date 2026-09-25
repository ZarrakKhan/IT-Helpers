import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** "dark" for use on a dark hero band, "light" (default) for a light section. */
  variant?: "light" | "dark";
  className?: string;
}

/** Visual breadcrumb trail. Pair with `generateBreadcrumbSchema` for the matching JSON-LD. */
export function Breadcrumb({ items, variant = "light", className }: BreadcrumbProps) {
  const mutedText = variant === "dark" ? "text-neutral-100/60" : "text-muted";
  const currentText = variant === "dark" ? "text-white" : "text-foreground";
  const linkText = variant === "dark" ? "hover:text-white" : "hover:text-accent-ui";

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className={cn("flex flex-wrap items-center gap-1.5", mutedText)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
              {isLast ? (
                <span aria-current="page" className={cn("font-medium", currentText)}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className={cn("link-animated transition-colors", linkText)}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
