import type { UserRole } from "./types";

export function getRoleHome(role: UserRole) {
  return role === "owner" ? "/owner/v2" : "/";
}

export function getLoginDestination(role: UserRole, requestedPath?: string | null) {
  if (role === "owner" && requestedPath) {
    try {
      const url = new URL(requestedPath, "https://homematch.local");
      if (url.origin === "https://homematch.local" && (url.pathname === "/owner/v2" || url.pathname.startsWith("/owner/v2/"))) {
        return `${url.pathname}${url.search}${url.hash}`;
      }
    } catch {
      // Invalid return paths use the role's home page.
    }
  }
  return getRoleHome(role);
}
