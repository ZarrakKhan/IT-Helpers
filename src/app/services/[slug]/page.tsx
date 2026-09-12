import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceContentSections } from "@/components/services/ServiceContentSections";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY, SERVICES, getRelatedServices, getServiceBySlug } from "@/lib/constants";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";

interface ServicePageParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const canonical = `/services/${service.slug}`;
  return {
    title: `${service.name} Services`,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${service.name} Services | ${COMPANY.name}`,
      description: service.metaDescription,
      url: canonical,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug, 3);
  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ServiceHero
        name={service.name}
        description={service.description}
        icon={service.icon}
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <ServiceContentSections service={service} />

      <RelatedServices services={related} />

      <Section id="contact" spacing="lg">
        <Container>
          <div className="mx-auto max-w-xl">
            <ContactForm
              title={`Get ${service.name}`}
              description="Tell us a bit about your business and we'll get back to you with next steps — usually within one business hour."
              submitButtonText="Request This Service"
              serviceContext={service.name}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
