"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { Navigation } from "@/components/navigation/Navigation";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { COMPANY, CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Sticky site header. Logo is a placeholder wordmark — swap the `<Link>`
 * contents below for an `<Image>` logo when rebranding this template.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-primary/95 backdrop-blur-md shadow-md"
          : "border-transparent bg-primary",
      )}
    >
      <Container className="relative flex h-18 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-white">
            <Wrench className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight">{COMPANY.name}</span>
        </Link>

        <Navigation className="hidden md:flex" />

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={COMPANY.phoneHref}
            className="link-animated text-sm font-medium text-neutral-100/80 transition-colors hover:text-white"
          >
            {COMPANY.phone}
          </a>
          <Button href={CTA.primary.href} size="sm">
            {CTA.primary.label}
          </Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
