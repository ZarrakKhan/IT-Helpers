import { COMPANY, SERVICES, SOCIAL_LINKS, TEAM_MEMBERS, TESTIMONIALS, type FaqItem, type Service, type TeamMember } from "./constants";

/**
 * Structured data (schema.org JSON-LD) helpers — Australian local business.
 *
 * TEMPLATE CUSTOMIZATION POINT: these read from `COMPANY`/`SERVICES` in
 * `constants.ts`, so rebranding that file updates the schema automatically.
 */

const SITE_URL = `https://${COMPANY.website}`;

/** Social profile URLs, reused as `sameAs` on both the Organization and
 * ProfessionalService schemas below — this is what ties those profiles to
 * this business for Google's Knowledge Panel / entity recognition. */
const SOCIAL_URLS = SOCIAL_LINKS.map((link) => link.href);

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "IT Helpers supports Sydney businesses and individuals across IT support, cloud & Microsoft 365, cybersecurity & networking, websites & custom software, AI automation, social media, online marketing, data services, and IT consulting.",
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "826 Hume Highway",
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.addressPostcode,
      addressCountry: COMPANY.addressCountry,
    },
    sameAs: SOCIAL_URLS,
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY.name,
    image: `${SITE_URL}/og-image.png`,
    url: SITE_URL,
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: COMPANY.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "826 Hume Highway",
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.addressPostcode,
      addressCountry: COMPANY.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      // TEMPLATE CUSTOMIZATION POINT: set precise lat/long for the address.
      latitude: -33.9139,
      longitude: 151.0281,
    },
    areaServed: {
      "@type": "City",
      name: "Sydney",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: SOCIAL_URLS,
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.metaDescription ?? service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function generateAllServicesSchema() {
  return SERVICES.map(generateServiceSchema);
}

export function generateFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateReviewSchema() {
  return TESTIMONIALS.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewBody: testimonial.quote,
    itemReviewed: {
      "@type": "Organization",
      name: COMPANY.name,
    },
  }));
}

export function generatePersonSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
  };
}

export function generateTeamSchema() {
  return TEAM_MEMBERS.map(generatePersonSchema);
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export function generateBreadcrumbSchema(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
