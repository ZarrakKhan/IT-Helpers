import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { AboutContent } from "@/components/about/AboutContent";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema, generateOrganizationSchema, generateTeamSchema } from "@/lib/seo";

export const metadata: Metadata = {
  // `title.absolute` bypasses the root layout's "%s | IT Helpers" template —
  // this page's title is meant to stand on its own, not have it appended.
  title: { absolute: "About IT Helpers | IT Support & Technology Services" },
  description:
    "Meet IT Helpers — a Sydney-based IT support team focused on reliability, security, and clear communication for small and mid-sized businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${COMPANY.name}`,
    description:
      "Meet IT Helpers — a Sydney-based IT support team focused on reliability, security, and clear communication for small and mid-sized businesses.",
    url: "/about",
  },
};

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();
  const teamSchema = generateTeamSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {teamSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="About IT Helpers"
        description={COMPANY.tagline}
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <AboutContent />
    </>
  );
}
