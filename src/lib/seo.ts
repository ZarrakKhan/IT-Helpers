import { COMPANY, SERVICES, type Service } from "./constants";

/**
 * Structured data (schema.org JSON-LD) helpers — Australian local business.
 *
 * TEMPLATE CUSTOMIZATION POINT: these read from `COMPANY`/`SERVICES` in
 * `constants.ts`, so rebranding that file updates the schema automatically.
 */

const SITE_URL = `https://${COMPANY.website}`;

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "IT Helpers provides IT support, Microsoft 365, cloud, networking, and cybersecurity services for businesses across Sydney, Australia.",
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
    // TEMPLATE CUSTOMIZATION POINT: replace once the ABN is confirmed.
    taxID: COMPANY.abn,
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
    sameAs: [] as string[],
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Sydney",
    },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function generateAllServicesSchema() {
  return SERVICES.map(generateServiceSchema);
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
