import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TrustSection } from "@/components/home/TrustSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FAQ_ITEMS } from "@/lib/constants";
import { generateFaqSchema, generateReviewSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Support Sydney | Managed IT Services & Cybersecurity",
  description:
    "IT Helpers delivers IT support, Microsoft 365, cloud, networking, and cybersecurity services for Sydney SMBs and individuals. Get a free consultation.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const reviewSchemas = generateReviewSchema();

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {reviewSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Hero />
      <Services />
      <TrustSection />
      <Testimonials />
      <CTASection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
