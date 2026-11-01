import { getOwnerModule } from "@/components/layout/owner-navigation";
import { OwnerSectionPlaceholder } from "@/components/layout/OwnerSectionPlaceholder";
import { OwnerOverview } from "@/features/owner-dashboard/components/OwnerOverview";

export default async function OwnerPage({ searchParams }: { searchParams: Promise<{ m?: string | string[] }> }) {
  const { m } = await searchParams;
  const module = getOwnerModule(typeof m === "string" ? m : null);
  return module.id === "tong-quan" ? <OwnerOverview /> : <OwnerSectionPlaceholder moduleId={module.id} />;
}
