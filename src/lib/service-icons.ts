import {
  Headset,
  Cloud,
  Network,
  ShieldCheck,
  Laptop,
  ArrowLeftRight,
  MapPinned,
  Lightbulb,
  Grid3x3,
  Globe,
  AppWindow,
  Bot,
  Share2,
  Megaphone,
  Database,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/constants";

/** Maps each `Service.icon` key to its lucide-react icon component. */
export const SERVICE_ICON_MAP: Record<Service["icon"], LucideIcon> = {
  support: Headset,
  cloud: Cloud,
  network: Network,
  shield: ShieldCheck,
  device: Laptop,
  migration: ArrowLeftRight,
  remote: MapPinned,
  consulting: Lightbulb,
  m365: Grid3x3,
  website: Globe,
  apps: AppWindow,
  ai: Bot,
  social: Share2,
  marketing: Megaphone,
  data: Database,
};
