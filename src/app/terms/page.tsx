import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { TermsContent } from "@/components/legal/TermsContent";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo";

// TEMPLATE CUSTOMIZATION POINT: Replace with actual legal review before
// launch. This is placeholder content for structure only.
export const metadata: Metadata = {
  title: { absolute: `Terms of Service | ${COMPANY.name}` },
  description: `The terms governing use of ${COMPANY.website} and ${COMPANY.name}'s IT support services.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${COMPANY.name}`,
    description: `The terms governing use of ${COMPANY.website} and ${COMPANY.name}'s IT support services.`,
    url: "/terms",
  },
};

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Terms of Service"
        description="The terms governing your use of this website and our services."
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />

      <TermsContent />
    </>
  );
}
