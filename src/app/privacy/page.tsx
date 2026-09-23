import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo";

// TEMPLATE CUSTOMIZATION POINT: Replace with actual legal review before
// launch. This is placeholder content for structure only.
export const metadata: Metadata = {
  title: { absolute: `Privacy Policy | ${COMPANY.name}` },
  description: `How ${COMPANY.name} collects, uses, and protects personal information submitted through ${COMPANY.website}.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${COMPANY.name}`,
    description: `How ${COMPANY.name} collects, uses, and protects personal information submitted through ${COMPANY.website}.`,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <PrivacyContent />
    </>
  );
}
