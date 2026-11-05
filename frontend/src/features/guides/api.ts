import { appConfig } from "@/lib/config";
import type { GuidesContent, GuideArticleDetail } from "./types";
import { guidesMock } from "./mocks";
import { getGuideArticleBySlug, getAllGuideArticleSlugs } from "./article-data";

export async function getGuidesContent(): Promise<GuidesContent> {
  if (appConfig.useMocks) {
    return guidesMock;
  }

  throw new Error("Dữ liệu cẩm nang hiện chưa khả dụng. Vui lòng thử lại sau.");
}

export async function getGuideBySlug(slug: string): Promise<GuideArticleDetail | null> {
  const article = getGuideArticleBySlug(slug);
  return article || null;
}

export async function getAllGuideSlugs(): Promise<string[]> {
  return getAllGuideArticleSlugs();
}
