# Owner V2 — design brief and phase A

## Scope

Reference: https://hubhome.vn/owner/v2, HTML verified on 2026-11-01. The observed page loads the same owner component/CSS assets collected on 2026-10-31. Those public assets are read-only references, not the application implementation.

Phase A implements the shared foundation: design brief, owner layout, navigation/account integration, UI samples, and linked mock fixtures. Business screens from phases B–E are represented by clearly labeled content placeholders. The overview is a foundation sample, not the completed phase-E dashboard.

No backend, infrastructure, package, or database changes. Work remains on `feature/frontend-Landlords`.

## Source-to-local map

The local portal preserves `/owner/v2?m=<module>`. Missing, unknown, and removed module IDs resolve to the overview. Navigation uses normal Next links so query states support refresh and browser back/forward. The UI sample page is local-only at `/owner/v2/ui-kit` and is not inserted into the business menu.

| Group | Module ID | Screen inventory / later design work |
| --- | --- | --- |
| Tổng quan | `tong-quan` | Operational cards, room occupancy, finance, expiring leases, listing performance, leads and upcoming viewings |
| Nguồn cung | `tin-bat-dong-san` | Search/status/building filters, sorting, list/grid, selection, pagination; listing detail tabs |
| Nguồn cung | `tao-tin` | Four steps: room/location; rent/deposit/fees/amenities; images/title/description; preview/contact/confirmation |
| Nguồn cung | `can-ho-phong` | Building/status/listing/floor filters, table/floor plan, room details, links to listing/lease/invoice |
| Vận hành thuê | `nguoi-thue` | Search and lease status; tenant, room, rental period, rent, deposit; lease navigation |
| Vận hành thuê | `hop-dong` | Lease states, parties, room, term, rent/deposit, draft form and signing-progress mock |
| Vận hành thuê | `thu-tien` | Receivable, reconciled, awaiting reconciliation, outstanding, overdue, held deposit; filters, invoice table/detail, debt aging |
| Khách hàng | `khach-quan-tam` | Search/status, interested room/listing, contact date, lead detail and viewing/lease links |
| Khách hàng | `tin-nhan` | Conversation search, unread filter, messages, composer, sending and error states |
| Khách hàng | `lich-xem` | Upcoming/today/past filters, list/calendar, customer/room/time; in-person viewing only |
| Phân tích | `bao-cao` | Building filter, occupancy, revenue/debt, lead funnel, aging and room performance |
| Cài đặt | `thong-bao` | Notifications for retained workflows, read/unread states and destination links |
| Cài đặt | `cai-dat` | Account profile/security plus the retained settings tabs below |

### Excluded everywhere in the owner portal

- `agent-chu-nha`: personal assistant, floating assistant launcher and assistant suggestions.
- `marketing`: marketing generator and related links.
- `thiet-ke-home`: interior AI design and related links.
- `bao-tri`: maintenance screen, widgets and task links.
- `cong-viec`: work/task module. This does not remove the separate `thong-bao` module.
- `phong-xem`: video viewing room, join-call links and video UI.
- `agent`: automation and agent-run/report widgets.
- `xac-minh`: eKYC, identity verification flow and verification-dependent owner badges.

Retained settings tabs: Hồ sơ, Thành viên, Cấu hình, Tích hợp, Tài liệu, Nhật ký, Bảo mật. The source renders placeholders for several settings tabs; do not silently turn its declared roadmap into completed business forms. Remove agent activity from the future audit tab. Source labels about incomplete reconciliation/export/import features remain a separate later-screen concern.

## Design rules

Values below come from the public reference CSS. Screenshots were not available from the browser tool, so these are declared layout values rather than claims about a verified rendered match.

| Element | Rule |
| --- | --- |
| Desktop sidebar | 264px; collapsed 68px |
| Desktop breakpoint | 900px |
| Desktop frame | Height 100dvh; sidebar and main content scroll separately |
| Source content spacing | 18px 22px 44px; local shell adds a compact account header |
| Sidebar item | Minimum height 40px, radius 10px, text 12.5px, orange active fill on desktop |
| Main background | #f6f7f9 desktop; #f7f8fa mobile |
| Surface / border | White / #e2e8f0 |
| Accent / text / muted | #f97316 / #0f172a / #64748b |
| Cards | 14px radius, subtle border and shadow |
| Typography | Existing local Inter font assets; compact Vietnamese labels |
| Mobile navigation | Overview, rooms, listings, collections, More; no central AI button |
| Mobile sidebar | Modal drawer, at most 300px / 88vw |
| Mobile tables | Use room cards below 600px in the UI sample; horizontal table region remains available for future wide tables |

The local brand remains HomeMatch. No reference brand folders, production JS, or production stylesheet bundles are copied into source.

## File ownership and reuse

- Thin routes: `src/app/(landlord-management)/owner/v2/`.
- Layout/navigation: `src/components/layout/OwnerShell.tsx`, `owner-navigation.ts`, `OwnerSectionPlaceholder.tsx`.
- Neutral UI: `src/components/management/ManagementUI.tsx`; reuses existing Button, Card and Badge.
- Foundation overview and sample data: `src/features/owner-dashboard/` with `api.ts`, `mocks.ts`, `types.ts`, a shared loading hook and components.
- Scoped styles: `src/styles/owner-management.module.css`.
- Account destination rules: `src/features/auth/navigation.ts`, used by login, Google mock login, quick login and registration; SiteHeader links into the owner portal on desktop/mobile.
- Existing AuthProvider and mock switch are reused. Public discovery pages keep their layout and menu.

## Mock contract

Two buildings, six rooms, three listings, three leads, two leases and two invoices. Fixtures reference stable IDs: listing → room; lead → listing; lease → room; invoice → lease. Data is illustrative, not copied from the signed-in source account.

Components request data through `api.ts`. `NEXT_PUBLIC_MOCK=true` dynamically loads fixtures; false reports an unavailable state and does not fabricate backend endpoints or silently fall back.

Owner hydration is awaited before showing content. Signed-out visitors get a sign-in screen with the current owner URL preserved. A renter gets an explicit switch-role action. Return paths are restricted to local owner routes. This is a mock UI gate, not server authorization for future private APIs.

## Phase A implementation record

- **A1:** Screen inventory, exclusions, source measurements, responsive rules and ownership documented here. Screenshot comparison remains pending browser capture.
- **A2:** 13-item shell, grouped/collapsible navigation, persisted sidebar width, mobile modal menu, active navigation, account header and skip link.
- **A3:** Query-based route selection, account hydration gate, owner login/registration destinations, local menu links and sign-out.
- **A4:** UI sample route with search, building/status filters, selection, pagination, table/mobile cards, status badges, native modal with Escape/focus behavior, toast, loading/empty/error examples and linked mock data.

## Verification

- `npx.cmd tsc --noEmit`: passed after the foundation/UI sample integration.
- `npm.cmd run build`: passed with `/owner/v2` and `/owner/v2/ui-kit` generated. Final CSS fixes are included in the last build pass.
- `git diff --check`: passed; Git reports the repository's normal LF/CRLF conversion notices.
- The scoped stylesheet parses, and all referenced owner CSS module classes exist.
- The collapsed-brand selectors are scoped to the desktop sidebar so they cannot hide the mobile drawer wordmark. Button font sizes remain controlled by their individual styles.

- Final production build passed after the desktop/mobile collapsed-sidebar and font fixes.
- Preview started at `http://127.0.0.1:3000/owner/v2`; UI samples at `/owner/v2/ui-kit`. Signed-out visitors can use **Chủ nhà mẫu** on the existing login screen.
- HTTP checks: the portal, UI sample page, all 13 module queries, unknown/removed module queries, owner login return URL, registration, landing, guides and public assistant all return 200. The owner's 10 referenced JS/CSS resources and both local Inter font files return 200.
- HTTP availability does not verify client interactions or visual matching. Browser capture/desktop-mobile comparison remains pending the browser tool; the earlier browser access host/capture failures are documented as a limitation rather than a pixel-match claim.
- Final browser inventory again reports **The browser access host is unavailable**. No rendered desktop/mobile comparison or client interaction pass is claimed for this delivery.

No business CRUD, real payments, real messaging, real signing or backend authorization is implemented in phase A. No new test suite, library, or backend check was added.
