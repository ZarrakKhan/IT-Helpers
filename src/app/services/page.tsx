import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/services/Breadcrumb";
import { ServicesAccordion } from "@/components/services/ServicesAccordion";
import { COMPANY } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "IT support, Microsoft 365, cloud, networking, cybersecurity, and more — the full range of IT Helpers services for Sydney businesses.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `IT Services | ${COMPANY.name}`,
    description:
      "IT support, Microsoft 365, cloud, networking, cybersecurity, and more — the full range of IT Helpers services for Sydney businesses.",
    url: "/services",
  },
};

export default function ServicesIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-ink text-white">
        <Container className="py-14 sm:py-20">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} variant="dark" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Our IT Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-100/70">
            Full-scope IT support, cloud, networking, and cybersecurity services for Sydney
            businesses — explore each service below for what&rsquo;s included and how it helps.
          </p>
        </Container>
      </section>

      <Section spacing="lg">
        <Container className="mx-auto max-w-3xl">
          <ServicesAccordion />
        </Container>
      </Section>
    </>
  );
}
