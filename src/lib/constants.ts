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
}

export const SERVICES: Service[] = [
  {
    slug: "it-support",
    name: "IT Support",
    description: "Desktop, application, and general IT support for your team.",
    icon: "support",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    description: "M365, Entra ID, Intune, and Active Directory setup & management.",
    icon: "m365",
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    description: "Azure migrations, cloud infrastructure, and cloud services.",
    icon: "cloud",
  },
  {
    slug: "networking",
    name: "Networking",
    description: "Network setup, configuration, and infrastructure that just works.",
    icon: "network",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Endpoint security, MFA, access governance, and security consulting.",
    icon: "shield",
  },
  {
    slug: "device-setup",
    name: "Device Setup",
    description: "New computer deployments, device configuration, and hardware support.",
    icon: "device",
  },
  {
    slug: "system-migrations",
    name: "System Migrations",
    description: "Server migrations, system upgrades, and data migrations.",
    icon: "migration",
  },
  {
    slug: "user-management",
    name: "User Management",
    description: "Onboarding, offboarding, access management, and license management.",
    icon: "users",
  },
  {
    slug: "remote-onsite-support",
    name: "Remote & On-Site Support",
    description: "Flexible support options tailored to your needs.",
    icon: "remote",
  },
  {
    slug: "it-consulting",
    name: "IT Consulting",
    description: "Strategic IT consulting and advisory services.",
    icon: "consulting",
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
