export type LandingIcon =
  | "graduation"
  | "briefcase"
  | "sofa"
  | "wallet"
  | "shield"
  | "filters"
  | "calendar"
  | "headphones"
  | "location"
  | "compare"
  | "check"
  | "electricity"
  | "home"
  | "contract";

export interface DiscoveryItem {
  title: string;
  description: string;
  query: string;
  icon: LandingIcon;
  color: "orange" | "blue" | "green" | "yellow";
}

export interface AreaItem {
  title: string;
  description: string;
  query: string;
  image: string;
  imageAlt: string;
}

export interface AudienceItem {
  label: string;
  title: string;
  description: string;
  action: string;
  query: string;
  theme: "student" | "worker";
}

export interface InformationItem {
  title: string;
  description: string;
  icon: LandingIcon;
}

export interface GuideItem {
  title: string;
  category: string;
  readingMinutes: number;
  path: string;
  icon: LandingIcon;
}

export interface LandingContent {
  discovery: DiscoveryItem[];
  areas: AreaItem[];
  audiences: AudienceItem[];
  benefits: InformationItem[];
  steps: InformationItem[];
  guides: GuideItem[];
}
