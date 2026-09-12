import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

interface NavigationProps {
  className?: string;
}

/** Desktop primary navigation. Hidden on small screens (see MobileMenu). */
export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={className} aria-label="Primary">
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-neutral-100/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
