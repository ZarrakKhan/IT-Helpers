import {
  Headset,
  Cloud,
  Network,
  ShieldCheck,
  Laptop,
  ArrowLeftRight,
  Users,
  MapPinned,
  Lightbulb,
  Grid3x3,
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
  users: Users,
  remote: MapPinned,
  consulting: Lightbulb,
  m365: Grid3x3,
};
