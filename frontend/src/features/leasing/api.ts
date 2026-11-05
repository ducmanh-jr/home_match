import { readMockRecord, updateMockRecord } from "@/lib/mock-storage";
import type { LeaseContract, TenantSummary } from "./types";
import { initialContracts, initialTenants } from "./mocks";

const STORAGE_KEY_CONTRACTS = "owner_lease_contracts";

export async function getContracts(): Promise<LeaseContract[]> {
  try {
    const stored = await readMockRecord<LeaseContract[]>(STORAGE_KEY_CONTRACTS);
    if (Array.isArray(stored)) return stored;
    return initialContracts;
  } catch {
    return initialContracts;
  }
}

export async function getContractById(id: string): Promise<LeaseContract | undefined> {
  const all = await getContracts();
  return all.find(c => c.id === id);
}

export async function saveContract(contract: LeaseContract): Promise<LeaseContract> {
  return updateMockRecord<LeaseContract[]>(STORAGE_KEY_CONTRACTS, initialContracts, current => {
    const idx = current.findIndex(c => c.id === contract.id);
    const now = new Date().toISOString();
    const updatedContract = { ...contract, updatedAt: now };

    if (idx >= 0) {
      const copy = [...current];
      copy[idx] = updatedContract;
      return copy;
    }
    return [updatedContract, ...current];
  }).then(list => list.find(c => c.id === contract.id) || contract);
}

export async function deleteContract(id: string): Promise<void> {
  await updateMockRecord<LeaseContract[]>(STORAGE_KEY_CONTRACTS, initialContracts, current => {
    return current.filter(c => c.id !== id);
  });
}

export async function getTenants(): Promise<TenantSummary[]> {
  const contracts = await getContracts();
  const activeContracts = contracts.filter(c => c.status === "active" || c.status === "expiring");

  return activeContracts.map(c => ({
    id: `tenant-${c.id}`,
    fullName: c.tenant.fullName || "Khách thuê",
    phone: c.tenant.phone || "---",
    identityNumber: c.tenant.identityNumber || "---",
    roomCode: c.roomCode,
    buildingName: c.buildingName,
    contractCode: c.code,
    monthlyRent: c.rentalTerms.monthlyRent,
    deposit: c.rentalTerms.depositAmount,
    startDate: c.startDate,
    endDate: c.endDate,
    status: c.status === "expiring" ? "expiring" : "active",
  }));
}

