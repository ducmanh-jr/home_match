export type SettingsTabId =
  | "profile"
  | "verification"
  | "members"
  | "configuration"
  | "integrations"
  | "documents"
  | "audit_logs"
  | "security";

export interface SettingsTabItem {
  id: SettingsTabId;
  label: string;
  isAvailable: boolean;
}

export const SETTINGS_TABS: SettingsTabItem[] = [
  { id: "profile", label: "Hồ sơ", isAvailable: true },
  { id: "security", label: "Bảo mật", isAvailable: true },
];

