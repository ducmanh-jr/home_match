import { getOwnerModule } from "@/components/layout/owner-navigation";
import { OwnerSectionPlaceholder } from "@/components/layout/OwnerSectionPlaceholder";
import { OwnerOverview } from "@/features/owner-dashboard/components/OwnerOverview";
import { OwnerProperties } from "@/features/properties/components/OwnerProperties";
import { OwnerListings } from "@/features/listings/components/OwnerListings";
import { ListingEditor } from "@/features/listings/components/ListingEditor";
import { LeasingWorkspace } from "@/features/leasing/components/LeasingWorkspace";
import { InvoiceList } from "@/features/billing/components/InvoiceList";

export default async function OwnerPage({
  searchParams,
}: {
  searchParams: Promise<{
    m?: string | string[];
    edit?: string | string[];
    room?: string | string[];
    action?: string | string[];
    contractId?: string | string[];
  }>;
}) {
  const { m, edit, room, action, contractId } = await searchParams;
  const module = getOwnerModule(typeof m === "string" ? m : null);

  if (module.id === "tong-quan") return <OwnerOverview />;
  if (module.id === "can-ho-phong") return <OwnerProperties />;
  if (module.id === "tin-bat-dong-san") return <OwnerListings />;
  if (module.id === "tao-tin") {
    const editingId = typeof edit === "string" ? edit : undefined;
    const roomId = typeof room === "string" ? room : undefined;
    return <ListingEditor key={`${editingId ?? "new"}:${roomId ?? ""}`} editingId={editingId} initialRoomId={roomId} />;
  }

  // Leasing Module (Hợp đồng thuê & Người thuê)
  if (module.id === "hop-dong") {
    const cid = typeof contractId === "string" ? contractId : undefined;
    const view = action === "list" ? ("contracts" as const) : ("editor" as const);
    return <LeasingWorkspace initialView={view} initialContractId={cid} />;
  }

  if (module.id === "nguoi-thue") {
    return <LeasingWorkspace initialView="tenants" />;
  }

  // Billing Module (Thu tiền & Công nợ)
  if (module.id === "thu-tien") {
    return <InvoiceList />;
  }

  return <OwnerSectionPlaceholder moduleId={module.id} />;
}
