import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Testimonials } from "@/components/home/Testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { COMPANY, FAQ_ITEMS } from "@/lib/constants";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about IT Helpers' support, response times, pricing, Microsoft 365, cybersecurity, and migrations for Sydney businesses.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `Frequently Asked Questions | ${COMPANY.name}`,
    description:
      "Answers to common questions about IT Helpers' support, response times, pricing, Microsoft 365, cybersecurity, and migrations for Sydney businesses.",
    url: "/faq",
  },
};

export default function FaqPage() {
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Frequently Asked Questions"
        description="Answers to the questions we hear most often — if yours isn't here, just get in touch."
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <Section spacing="lg">
        <Container className="mx-auto max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} immediate />
        </Container>
      </Section>

      <Testimonials />
    </>
  );
}
