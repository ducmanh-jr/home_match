export const appConfig = {
  useMocks: process.env.NEXT_PUBLIC_MOCK === "true",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
} as const;

// Ensure all navigation stays within the HomeMatch local application
export function referenceLink(path: string): any {
  if (!path) return "/";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return "/";
    }
  }
  return path.startsWith("/") ? path : `/${path}`;
}

export function siteLink(path: string): any {
  return referenceLink(path);
}
