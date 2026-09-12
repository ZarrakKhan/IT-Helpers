# IT Helpers — Website

Marketing site for [IT Helpers](https://ithelper.com.au), an IT support and technology
services provider serving Sydney, Australia. Built as a reusable, rebrandable Next.js
template.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS 3** (theme driven by CSS custom properties)
- **Framer Motion** for animation
- **lucide-react** for icons

## Project Structure

```
src/
  app/
    layout.tsx        Root layout: fonts, metadata, JSON-LD, Header/Footer
    page.tsx           Homepage: composes the section components
    globals.css        Tailwind layers + design tokens import
  components/
    ui/                Reusable primitives: Button, Container, Section
    navigation/         Header, Navigation, MobileMenu
    common/             Footer
    home/               Homepage sections: Hero, Services, TrustSection,
                        CTASection, ContactSection, NetworkVisual
  lib/
    constants.ts        Company info, services, nav links — THE rebrand file
    seo.ts              JSON-LD schema builders (Organization, LocalBusiness,
                        Service, Breadcrumb)
    utils.ts            Small class-name helper (`cn`)
  styles/
    design-tokens.css   Brand colors, spacing, shadows, motion timings
tailwind.config.ts       Tailwind theme wired to design tokens
```

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_FORM_ENDPOINT, etc.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — type-check (`tsc --noEmit`)

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.local.example` in the Vercel
   project settings.
4. Deploy — Vercel auto-detects the Next.js App Router build.

## Template Customization Guide

This project is built so it can be rebranded for a different client with
minimal file touches:

1. **Company info & services** — edit `src/lib/constants.ts` (`COMPANY`,
   `SERVICES`, `NAV_LINKS`, `CTA`). Every component reads from here.
2. **Brand colors, spacing, shadows, motion** — edit
   `src/styles/design-tokens.css`. Colors are consumed via Tailwind classes
   (`bg-primary`, `text-secondary`, etc.) that map to these CSS variables in
   `tailwind.config.ts`, so no component needs to change.
3. **Logo** — replace the wordmark markup in `Header.tsx` and `Footer.tsx`
   with an `<Image>` pointing at your logo file in `public/`.
4. **SEO / structured data** — `src/lib/seo.ts` builds JSON-LD from
   `COMPANY`/`SERVICES` automatically; update the address, geo-coordinates,
   and ABN placeholder in `constants.ts`.
5. **Contact form** — set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local` to a
   Formspree endpoint or your own API route (see `ContactSection.tsx`).
6. **Fonts** — swap the `Inter` import in `src/app/layout.tsx` for another
   `next/font/google` family; update `--font-inter` references if renamed.

## Notes

- `abn` in `src/lib/constants.ts` is a placeholder — replace with the
  registered ABN before launch.
- Latitude/longitude in `generateLocalBusinessSchema` (`src/lib/seo.ts`) are
  approximate for Sydney — replace with the precise coordinates for
  826 Hume Highway, Bass Hill NSW 2197.
- Social links in `Footer.tsx` (`SOCIAL_LINKS`) are placeholders (`#`).
