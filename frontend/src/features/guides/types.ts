export interface GuideHighlight {
  value: string;
  description: string;
  articlePath: string;
}

export interface GuideArticleSummary {
  title: string;
  description: string;
  readingMinutes: number;
  path: string;
  hasCalculator?: boolean;
}

export interface GuideStage {
  id: string;
  title: string;
  description: string;
  articles: GuideArticleSummary[];
}

export interface EditorialPrinciple {
  title: string;
  description: string;
  icon: "sources" | "location" | "legal";
}

export type GuidePrinciple = EditorialPrinciple;

export interface GuidesContent {
  highlights: GuideHighlight[];
  stages: GuideStage[];
  principles: EditorialPrinciple[];
}

export interface GuideStat {
  value: string;
  label: string;
}

export interface GuideSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: "warning" | "info" | "quote";
    text: string;
  };
}

export interface GuideArticleDetail {
  slug: string;
  title: string;
  description: string;
  readingMinutes: number;
  category: string;
  stageTitle: string;
  stats: GuideStat[];
  lead: string;
  sections: GuideSection[];
  redFlags?: string[];
  landlordQuestions: string[];
  legalBasis?: string[];
  hasCalculator?: boolean;
  relatedSlugs: string[];
}
