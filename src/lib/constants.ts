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
  /** Shown in the service card's expandable "Learn more" details. */
  whatsIncluded: string[];
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
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services" },
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
