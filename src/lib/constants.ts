/**
 * Site-wide constants — IT Helpers template.
 *
 * TEMPLATE CUSTOMIZATION POINT: this is the single file to edit when
 * rebranding this template for a new client — company info, services,
 * nav links, and brand colors all live here.
 */

export interface CompanyInfo {
  name: string;
  tagline: string;
  website: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  addressLocality: string;
  addressRegion: string;
  addressPostcode: string;
  addressCountry: string;
  abn: string;
}

export const COMPANY: CompanyInfo = {
  name: "IT Helpers",
  tagline: "Your trusted partner in IT support",
  website: "ithelper.com.au",
  phone: "0421 300 524",
  phoneHref: "tel:+61421300524",
  email: "support@ithelper.com.au",
  address: "826 Hume Highway, Bass Hill NSW 2197",
  addressLocality: "Bass Hill",
  addressRegion: "NSW",
  addressPostcode: "2197",
  addressCountry: "AU",
  // TEMPLATE CUSTOMIZATION POINT: replace with the registered ABN.
  abn: "PLACEHOLDER_ABN",
};

export interface Service {
  slug: string;
  name: string;
  description: string;
  icon:
    | "support"
    | "cloud"
    | "network"
    | "shield"
    | "device"
    | "migration"
    | "users"
    | "remote"
    | "consulting"
    | "m365";
  /** Shown in the service card's expandable "Learn more" details, and on the service detail page. */
  whatsIncluded: string[];
  /** Why choose IT Helpers for this specific service — shown on the detail page. */
  benefits: string[];
  /** Typical scenarios this service fits — shown on the detail page. */
  useCases: string[];
  /** ~155-160 char summary used for the detail page's meta description. */
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "it-support",
    name: "IT Support",
    description: "Desktop, application, and general IT support for your team.",
    icon: "support",
    whatsIncluded: [
      "Help desk & troubleshooting",
      "Software installation & updates",
      "Hardware diagnostics & repair coordination",
    ],
    benefits: [
      "One point of contact for day-to-day IT issues",
      "Fast, jargon-free troubleshooting",
      "Proactive monitoring to catch problems early",
    ],
    useCases: [
      "Small teams without an in-house IT department",
      "Businesses experiencing recurring device or software issues",
      "Growing teams that need a reliable support line",
    ],
    metaDescription:
      "Desktop, application, and general IT support for Sydney businesses. Fast troubleshooting and a reliable single point of contact from IT Helpers.",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    description: "M365, Entra ID, Intune, and Active Directory setup & management.",
    icon: "m365",
    whatsIncluded: [
      "M365 tenant setup & licensing",
      "Entra ID (Azure AD) configuration",
      "Intune device management & policies",
    ],
    benefits: [
      "Correctly licensed from day one — no wasted spend",
      "Centralised identity and device management",
      "Ongoing tenant health checks",
    ],
    useCases: [
      "Businesses migrating from on-premises email or file shares",
      "Teams needing centralised device & access policies",
      "Organisations preparing for a security audit",
    ],
    metaDescription:
      "Microsoft 365, Entra ID, Intune, and Active Directory setup and management for Sydney businesses — correctly licensed and centrally managed.",
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    description: "Azure migrations, cloud infrastructure, and cloud services.",
    icon: "cloud",
    whatsIncluded: [
      "Azure environment setup",
      "Cloud migration planning & execution",
      "Ongoing cloud cost & performance review",
    ],
    benefits: [
      "A migration plan scoped to your actual usage",
      "Reduced infrastructure overhead",
      "Cost visibility instead of surprise cloud bills",
    ],
    useCases: [
      "Businesses retiring an aging on-premises server",
      "Teams that need infrastructure to scale with growth",
      "Organisations consolidating multiple systems into one cloud environment",
    ],
    metaDescription:
      "Azure migrations, cloud infrastructure, and ongoing cloud cost review for Sydney businesses — a migration plan scoped to how you actually work.",
  },
  {
    slug: "networking",
    name: "Networking",
    description: "Network setup, configuration, and infrastructure that just works.",
    icon: "network",
    whatsIncluded: [
      "Network design & cabling",
      "Router, switch & firewall configuration",
      "Wi-Fi coverage optimisation",
    ],
    benefits: [
      "A network designed for your floor plan, not a generic template",
      "Fewer dropouts and dead zones",
      "Documentation so future changes are quick",
    ],
    useCases: [
      "New office fit-outs or relocations",
      "Sites with poor Wi-Fi coverage or frequent dropouts",
      "Businesses adding VoIP or many networked devices",
    ],
    metaDescription:
      "Network design, cabling, and Wi-Fi optimisation for Sydney offices. Reliable infrastructure from IT Helpers, built for how your team actually works.",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Endpoint security, MFA, access governance, and security consulting.",
    icon: "shield",
    whatsIncluded: [
      "Endpoint protection deployment",
      "Multi-factor authentication rollout",
      "Access governance & security audits",
    ],
    benefits: [
      "Security built into daily operations, not bolted on",
      "Clear visibility into who has access to what",
      "Practical guidance, not scare tactics",
    ],
    useCases: [
      "Businesses handling sensitive client or financial data",
      "Teams preparing for cyber insurance requirements",
      "Organisations without MFA or a formal access review process",
    ],
    metaDescription:
      "Endpoint security, MFA rollout, and access governance for Sydney businesses. Practical cybersecurity from IT Helpers, built into daily operations.",
  },
  {
    slug: "device-setup",
    name: "Device Setup",
    description: "New computer deployments, device configuration, and hardware support.",
    icon: "device",
    whatsIncluded: [
      "New device provisioning & imaging",
      "Peripheral & software configuration",
      "Data transfer from old devices",
    ],
    benefits: [
      "New starters productive on day one",
      "Consistent configuration across every device",
      "No lost data during a hardware refresh",
    ],
    useCases: [
      "Onboarding new employees",
      "Bulk hardware refreshes across a team",
      "Replacing an ageing or failing device",
    ],
    metaDescription:
      "New computer deployments, device configuration, and hardware support for Sydney businesses — new starters productive from day one.",
  },
  {
    slug: "system-migrations",
    name: "System Migrations",
    description: "Server migrations, system upgrades, and data migrations.",
    icon: "migration",
    whatsIncluded: [
      "Server & platform migrations",
      "Data migration with integrity checks",
      "Post-migration testing & support",
    ],
    benefits: [
      "Migrations planned around your business hours",
      "Data integrity checked at every step",
      "Support on standby after go-live",
    ],
    useCases: [
      "Retiring end-of-life servers or software",
      "Consolidating systems after a merger or acquisition",
      "Upgrading a platform that's outgrown its current setup",
    ],
    metaDescription:
      "Server, system, and data migrations for Sydney businesses — planned around your business hours, with integrity checks at every step.",
  },
  {
    slug: "user-management",
    name: "User Management",
    description: "Onboarding, offboarding, access management, and license management.",
    icon: "users",
    whatsIncluded: [
      "Onboarding & offboarding workflows",
      "License allocation & management",
      "Access reviews & permission audits",
    ],
    benefits: [
      "New starters and leavers processed consistently",
      "No orphaned accounts or unused licenses",
      "Clear audit trail for access changes",
    ],
    useCases: [
      "Businesses with regular staff turnover",
      "Teams managing licenses across multiple systems",
      "Organisations needing a formal offboarding checklist",
    ],
    metaDescription:
      "Onboarding, offboarding, and license management for Sydney businesses — consistent processes so no account or license slips through the cracks.",
  },
  {
    slug: "remote-onsite-support",
    name: "Remote & On-Site Support",
    description: "Flexible support options tailored to your needs.",
    icon: "remote",
    whatsIncluded: [
      "Remote troubleshooting sessions",
      "On-site visits for hands-on issues",
      "Flexible scheduling around your business",
    ],
    benefits: [
      "Most issues resolved remotely, fast",
      "On-site visits when hands-on work is needed",
      "Scheduling that fits around your operating hours",
    ],
    useCases: [
      "Distributed or hybrid teams",
      "Hardware issues that need a technician on-site",
      "Businesses wanting a mix of remote and in-person support",
    ],
    metaDescription:
      "Remote and on-site IT support for Sydney businesses — most issues resolved remotely, with technicians on-site when hands-on work is needed.",
  },
  {
    slug: "it-consulting",
    name: "IT Consulting",
    description: "Strategic IT consulting and advisory services.",
    icon: "consulting",
    whatsIncluded: [
      "IT strategy & roadmap planning",
      "Technology stack recommendations",
      "Budget & vendor advisory",
    ],
    benefits: [
      "A roadmap tied to your business goals, not just tech trends",
      "Vendor-neutral recommendations",
      "Budget planning that avoids surprise costs",
    ],
    useCases: [
      "Businesses planning next year's IT budget",
      "Teams evaluating a major platform change",
      "Organisations without an internal IT strategy function",
    ],
    metaDescription:
      "Strategic IT consulting and advisory services for Sydney businesses — a technology roadmap tied to your goals, not just the latest trends.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/** Up to `limit` other services, for a "related services" section on a detail page. */
export function getRelatedServices(slug: string, limit = 3): Service[] {
  const currentIndex = SERVICES.findIndex((service) => service.slug === slug);
  const others = SERVICES.filter((service) => service.slug !== slug);
  if (currentIndex === -1) return others.slice(0, limit);

  // Rotate the start point so different services surface different "related" picks.
  const rotated = [...others.slice(currentIndex), ...others.slice(0, currentIndex)];
  return rotated.slice(0, limit);
}

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
];

export const CTA = {
  primary: { label: "Get IT Support", href: "/#contact" },
  secondary: { label: "Request a Quote", href: "/#contact" },
  consultation: { label: "Book a Consultation", href: "/#contact" },
};

export const BRAND = {
  primary: "#0F172A",
  secondary: "#0891B2",
  fontFamily: "Inter",
};

export const SOCIAL_LINKS = [
  // TEMPLATE CUSTOMIZATION POINT: add real profile URLs, or remove entries.
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
];
