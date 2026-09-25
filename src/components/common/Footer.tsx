import Link from "next/link";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialIcon, type SocialPlatform } from "@/components/common/SocialIcon";
import { COMPANY, NAV_LINKS, SERVICE_CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";

/** Site footer — company info, quick links, contact, and legal. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-neutral-100/70">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-ui text-white">
                <Wrench className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-lg font-bold tracking-tight">{COMPANY.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">{COMPANY.tagline}</p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-accent-sky hover:text-accent-sky"
                >
                  <SocialIcon platform={social.label as SocialPlatform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-animated transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/services#${category.slug}`}
                    className="link-animated transition-colors hover:text-white"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-sky" aria-hidden />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent-sky" aria-hidden />
                <a href={COMPANY.phoneHref} className="link-animated transition-colors hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent-sky" aria-hidden />
                <a href={`mailto:${COMPANY.email}`} className="link-animated transition-colors hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>
            &copy; {year} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-animated transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="link-animated transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
