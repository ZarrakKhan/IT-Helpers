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
  website: "ithelpers.com.au",
  phone: "0421 300 524",
  phoneHref: "tel:+61421300524",
  email: "ithelpers01@gmail.com",
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
    | "remote"
    | "consulting"
    | "m365"
    | "website"
    | "apps"
    | "ai"
    | "social"
    | "marketing"
    | "data";
  /** Shown in the service card's expandable "Learn more" details, and on the service detail page. */
  whatsIncluded: string[];
  /** Why choose IT Helpers for this specific service — shown on the detail page. */
  benefits: string[];
  /** Typical scenarios this service fits — shown on the detail page. */
  useCases: string[];
  /** ~155-160 char summary used for the detail page's meta description. */
  metaDescription: string;
  /** Optional disclaimer shown directly on the service's detail page, next to its description. */
  caveat?: string;
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
    description:
      "Set up and manage your Microsoft 365 accounts, devices, and security — so your team has the right access, on the right devices, without the licensing guesswork.",
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
  {
    slug: "website-development",
    name: "Website Development",
    description: "Modern, fast, mobile-first business websites — from design through to launch.",
    icon: "website",
    whatsIncluded: [
      "Custom website design & build",
      "Booking & customer portal integration",
      "SEO-friendly structure from day one",
    ],
    benefits: [
      "A site built around how your business actually works",
      "Fast load times and mobile-first design",
      "Structured for search visibility, not just looks",
    ],
    useCases: [
      "Businesses without a website, or working off an outdated one",
      "Teams needing online booking or customer accounts",
      "Anyone wanting their site to actually generate leads",
    ],
    metaDescription:
      "Modern, fast, mobile-first business websites for Sydney businesses — designed, built, and launched by IT Helpers.",
  },
  {
    slug: "custom-applications",
    name: "SaaS & Custom Applications",
    description: "Internal tools, customer portals, and custom software built around your business.",
    icon: "apps",
    whatsIncluded: [
      "Custom dashboards & internal tools",
      "Booking & workflow systems",
      "API integrations & database-driven apps",
    ],
    benefits: [
      "Software built for how you work, not the other way around",
      "One partner for the whole build, not a freelancer patchwork",
      "Ongoing support after launch, not a handoff and goodbye",
    ],
    useCases: [
      "Businesses outgrowing spreadsheets or manual processes",
      "Teams needing a customer or staff portal",
      "Anyone needing systems that talk to each other via API",
    ],
    metaDescription:
      "Custom internal tools, dashboards, and business applications for Sydney businesses, built and supported by IT Helpers.",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    description: "AI assistants and workflow automation that handle the repetitive work.",
    icon: "ai",
    whatsIncluded: [
      "AI-assisted customer response & lead follow-up",
      "Workflow automation (n8n-based)",
      "Document & data processing automation",
    ],
    benefits: [
      "Time back from repetitive manual work",
      "Faster response to leads and enquiries",
      "Automation that fits your existing tools, not a rip-and-replace",
    ],
    useCases: [
      "Businesses missing leads due to slow follow-up",
      "Teams doing the same manual task repeatedly",
      "Anyone curious what AI automation could actually do for them",
    ],
    metaDescription:
      "AI automation and workflow tools for Sydney businesses — automate the repetitive, keep humans in control. From IT Helpers.",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    description: "Social media presence and posting handled for you, consistently.",
    icon: "social",
    whatsIncluded: [
      "Content calendar & scheduled posting",
      "Profile setup & brand consistency across platforms",
      "Basic community management (replies, messages)",
    ],
    benefits: [
      "A consistent presence without eating up your time",
      "Content that matches your actual brand, not generic templates",
      "One less thing on your plate every week",
    ],
    useCases: [
      "Businesses with no time to post consistently",
      "Teams wanting a professional, on-brand social presence",
      "Anyone who's started and stalled on social media before",
    ],
    metaDescription:
      "Social media management and content scheduling for Sydney businesses — consistent, on-brand, handled by IT Helpers.",
  },
  {
    slug: "online-marketing",
    name: "Online Marketing & Paid Ads",
    description: "Google Ads, Meta Ads, and AdSense setup and management that's actually tracked.",
    icon: "marketing",
    whatsIncluded: [
      "Google Ads & Meta Ads campaign setup",
      "AdSense integration where relevant",
      "Performance tracking & monthly reporting",
    ],
    benefits: [
      "Ad spend tied to actual results, not guesswork",
      "Campaigns managed by someone who'll explain what's working",
      "No lock-in agencies or hidden fees",
    ],
    useCases: [
      "Businesses wanting to generate leads through paid ads",
      "Sites with traffic but no clear conversion path",
      "Anyone who's tried ads themselves and wants it done properly",
    ],
    metaDescription:
      "Google Ads, Meta Ads, and AdSense management for Sydney businesses — campaigns tracked and reported clearly, by IT Helpers.",
  },
  {
    slug: "data-services",
    name: "Data Services",
    description: "Data transfer, recovery, and cleanup — done carefully.",
    icon: "data",
    whatsIncluded: [
      "Device-to-device & cloud data transfer",
      "Data recovery & retrieval",
      "Data organisation & cleanup",
    ],
    benefits: [
      "Careful handling of data that matters to you",
      "Straightforward transfer when you get a new device",
      "Honest assessment before any recovery attempt",
    ],
    useCases: [
      "Moving to a new computer or phone",
      "A drive or device that's failed or is behaving oddly",
      "Old data that needs sorting or cleaning up",
    ],
    metaDescription:
      "Data transfer, recovery, and cleanup services for Sydney businesses and individuals, from IT Helpers.",
    caveat:
      "Recovery isn't guaranteed in every case — we'll always give you an honest assessment before starting.",
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

export interface ServiceCategory {
  slug: string;
  title: string;
  /** Short "why we're different" pitch shown as the category's collapsed-state copy. */
  pitch: string;
  /** `Service.slug` values grouped under this category, in display order. */
  serviceSlugs: string[];
}

/**
 * Groups `SERVICES` into browsable categories for the `/services` accordion.
 * Every `SERVICES` slug must appear in exactly one category — there's no
 * runtime check for that, so keep this list in sync when services change.
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "it-support-troubleshooting",
    title: "IT Support & Troubleshooting",
    pitch:
      "Most IT problems aren't complicated — they just need someone who actually picks up the phone. We fix the cause, not just the symptom, and we're on standby whether it's a quick remote fix or a device that needs hands-on attention.",
    serviceSlugs: ["it-support", "device-setup", "remote-onsite-support"],
  },
  {
    slug: "cloud-microsoft-365",
    title: "Cloud & Microsoft 365",
    pitch:
      "Cloud setup done right the first time means no wasted licensing, no messy migrations, and systems that actually talk to each other. We plan around how you work now — not a generic template — so nothing gets left half-configured.",
    serviceSlugs: ["microsoft-365", "cloud-solutions", "system-migrations"],
  },
  {
    slug: "cybersecurity-networking",
    title: "Cybersecurity & Networking",
    pitch:
      "Security that's built in from day one, not bolted on after something goes wrong. No fear tactics, no upselling — just practical protection and a network that stays up.",
    serviceSlugs: ["cybersecurity", "networking"],
  },
  {
    slug: "websites-custom-software",
    title: "Websites & Custom Software",
    pitch:
      "Your website and internal tools should work as hard as you do. We build both — fast, professional sites and the custom software behind the scenes — as one connected system, not separate vendors who don't talk to each other.",
    serviceSlugs: ["website-development", "custom-applications"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    pitch:
      "Automation that actually keeps working — lead follow-up, document processing, customer responses — running quietly in the background so nothing falls through the cracks, without you having to manage it day to day.",
    serviceSlugs: ["ai-automation"],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    pitch:
      "A consistent, on-brand presence without it eating up your week. Content calendar, scheduled posting, and someone actually replying — handled for you, not a generic template on autopilot.",
    serviceSlugs: ["social-media-management"],
  },
  {
    slug: "online-marketing-ads",
    title: "Online Marketing & Paid Ads",
    pitch:
      "Ad spend tied to results you can actually see. Google Ads, Meta Ads, and AdSense set up and managed by someone who'll explain what's working and what isn't — no lock-in, no guesswork.",
    serviceSlugs: ["online-marketing"],
  },
  {
    slug: "data-services",
    title: "Data Services",
    pitch:
      "Your data matters, and we treat it that way — careful transfers, honest recovery attempts, and cleanup that actually makes things easier to find.",
    serviceSlugs: ["data-services"],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    pitch:
      "A roadmap tied to your actual business goals, not the latest tech trend. Vendor-neutral advice, budget planning that avoids surprises, and a second opinion when you need one.",
    serviceSlugs: ["it-consulting"],
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

/**
 * TEMPLATE CUSTOMIZATION POINT: replace with real client testimonials
 * before launch — names, roles, and companies below are placeholders.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Operations Manager",
    company: "Local Retail Business",
    quote:
      "IT Helpers came in and sorted out issues that had been dragging on for months. They explained everything in plain English, and our systems have been noticeably more reliable ever since. It's a relief to have a team we can just call and trust.",
    rating: 5,
  },
  {
    name: "David Nguyen",
    role: "Practice Manager",
    company: "Professional Services Firm",
    quote:
      "What stands out is how responsive they are — a real person picks up the phone and actually fixes the problem. The Microsoft 365 migration was smooth and happened outside business hours so it barely disrupted our team.",
    rating: 5,
  },
  {
    name: "Amelia Ferreira",
    role: "Director",
    company: "Hospitality Group",
    quote:
      "We went from constant Wi-Fi dropouts across our sites to a network that just works. IT Helpers mapped out exactly what we needed instead of overselling us, which we really appreciated.",
    rating: 5,
  },
  {
    name: "Michael Tran",
    role: "Finance Manager",
    company: "Accounting Practice",
    quote:
      "Security was our biggest concern given the data we handle. They rolled out MFA and cleaned up our access permissions without slowing anyone down. Genuinely feel more confident about our setup now.",
    rating: 5,
  },
  {
    name: "Rebecca Hall",
    role: "Office Manager",
    company: "Healthcare Clinic",
    quote:
      "Onboarding new staff used to be a whole afternoon of setup. Now it's handled before their first day. Small thing, but it's made a real difference to how smoothly our clinic runs.",
    rating: 5,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's included in your IT support?",
    answer:
      "Our IT support covers desktop and application troubleshooting, hardware support, software installation and updates, and general help-desk assistance for your whole team. If something in your day-to-day tech isn't working, it's covered.",
    category: "IT Support",
  },
  {
    question: "How fast is your response time?",
    answer:
      "We aim to respond to most support requests within an hour during business hours. Urgent issues affecting your whole team are prioritised and typically actioned even faster.",
    category: "IT Support",
  },
  {
    question: "Do you offer 24/7 support?",
    answer:
      "Our standard support hours are Monday to Friday, 9am-5pm. If your business needs after-hours or weekend coverage, let us know when you get in touch — we can scope a support plan around it.",
    category: "IT Support",
  },
  {
    question: "Can you help with Microsoft 365 and Entra ID?",
    answer:
      "Yes — we set up and manage M365 tenants, Entra ID (Azure AD), Intune device policies, and Active Directory. We also handle licensing so you're not paying for seats you don't need.",
    category: "Microsoft 365",
  },
  {
    question: "Do you offer on-site support, or is everything remote?",
    answer:
      "Both. Most issues can be resolved remotely, which is usually the fastest option. When something needs hands-on attention — new hardware, cabling, or a physical fault — we'll come to you.",
    category: "IT Support",
  },
  {
    question: "How much does IT support cost?",
    answer:
      "It depends on your team size, systems, and how much ongoing management you need. We scope pricing after an initial conversation about your setup, rather than quoting blind — reach out and we'll put together a plan.",
    category: "Pricing",
  },
  {
    question: "Can you migrate our existing systems and data?",
    answer:
      "Yes — server migrations, cloud migrations, and data migrations are all things we handle regularly, with integrity checks at each step and testing before we consider a migration complete.",
    category: "Cloud & Migrations",
  },
  {
    question: "What security measures do you put in place?",
    answer:
      "We deploy endpoint protection, roll out multi-factor authentication, and run access governance reviews so you know exactly who can access what. Security is built into how we set things up, not an afterthought.",
    category: "Cybersecurity",
  },
  {
    question: "Do you work with businesses that don't have any in-house IT staff?",
    answer:
      "That's most of who we work with — small and mid-sized teams that need reliable IT support without hiring a full-time IT person. We act as your IT department, as much or as little as you need.",
    category: "IT Support",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
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
  { label: "TikTok", href: "https://www.tiktok.com/@it.helpers" },
  { label: "Instagram", href: "https://www.instagram.com/it.helpers/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574547561171" },
  { label: "Twitter", href: "https://x.com/IT_Helpers01" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCkKsKSFvpn16eqSnMGRc3Vg" },
];

export interface CoreValue {
  title: string;
  description: string;
}

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Reliability",
    description: "Systems that stay up, and a team that answers when you call.",
  },
  {
    title: "Expertise",
    description: "Deep, current knowledge across support, cloud, and security — not generalists guessing.",
  },
  {
    title: "Customer-First",
    description: "We scope around your business, not a one-size-fits-all package.",
  },
  {
    title: "Security",
    description: "Every engagement considers security from the start, not as an afterthought.",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

/**
 * TEMPLATE CUSTOMIZATION POINT: replace with real team member details and
 * photos before launch — names and roles below are placeholders.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Lead Technician",
    bio: "Leads day-to-day support and troubleshooting, with a focus on getting issues resolved the first time.",
  },
  {
    name: "Priya Nair",
    role: "Client Success Manager",
    bio: "The first point of contact for scoping new engagements and keeping ongoing support running smoothly.",
  },
  {
    name: "Sam Rivera",
    role: "Cloud & Security Specialist",
    bio: "Handles cloud migrations, Microsoft 365 environments, and access governance for every client.",
  },
];
