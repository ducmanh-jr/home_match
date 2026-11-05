import {
  ArrowLeftRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  FileText,
  GraduationCap,
  Headphones,
  House,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  WalletCards,
  Zap,
} from "lucide-react";
import type { LandingIcon as IconName } from "../types";

const icons = {
  graduation: GraduationCap,
  briefcase: BriefcaseBusiness,
  sofa: Sofa,
  wallet: WalletCards,
  shield: ShieldCheck,
  filters: SlidersHorizontal,
  calendar: CalendarCheck,
  headphones: Headphones,
  location: MapPin,
  compare: ArrowLeftRight,
  check: BadgeCheck,
  electricity: Zap,
  home: House,
  contract: FileText,
} as const;

export function LandingIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
}
