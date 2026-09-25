import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { Footer } from "@/components/common/Footer";
import { COMPANY } from "@/lib/constants";
import { generateLocalBusinessSchema, generateOrganizationSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = `https://${COMPANY.website}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "IT Helpers supports Sydney businesses and individuals across IT support, cloud & Microsoft 365, cybersecurity & networking, websites & custom software, AI automation, social media, online marketing, data services, and IT consulting.",
  keywords: [
    "IT support Sydney",
    "Managed IT services",
    "Microsoft 365 support",
    "Cybersecurity Sydney",
    "IT consulting Australia",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description:
      "Trusted IT support, cloud, and cybersecurity services for Sydney businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description:
      "Trusted IT support, cloud, and cybersecurity services for Sydney businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en-AU" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <FloatingNav />
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
