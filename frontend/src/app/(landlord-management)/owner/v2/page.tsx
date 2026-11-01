import { getOwnerModule } from "@/components/layout/owner-navigation";
import { OwnerSectionPlaceholder } from "@/components/layout/OwnerSectionPlaceholder";
import { OwnerOverview } from "@/features/owner-dashboard/components/OwnerOverview";
import { OwnerProperties } from "@/features/properties/components/OwnerProperties";
import { OwnerListings } from "@/features/listings/components/OwnerListings";
import { ListingEditor } from "@/features/listings/components/ListingEditor";

export default async function OwnerPage({ searchParams }: { searchParams: Promise<{ m?: string | string[]; edit?: string | string[]; room?: string | string[] }> }) {
  const { m, edit, room } = await searchParams;
  const module = getOwnerModule(typeof m === "string" ? m : null);
  if (module.id === "tong-quan") return <OwnerOverview />;
  if (module.id === "can-ho-phong") return <OwnerProperties />;
  if (module.id === "tin-bat-dong-san") return <OwnerListings />;
  if (module.id === "tao-tin") {
    const editingId = typeof edit === "string" ? edit : undefined;
    const roomId = typeof room === "string" ? room : undefined;
    return <ListingEditor key={`${editingId ?? "new"}:${roomId ?? ""}`} editingId={editingId} initialRoomId={roomId} />;
  }
  return <OwnerSectionPlaceholder moduleId={module.id} />;
}
