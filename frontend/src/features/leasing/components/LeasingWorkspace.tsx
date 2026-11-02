"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLeasing } from "../use-leasing";
import type { LeaseContract } from "../types";
import { ContractList } from "./ContractList";
import { ContractBuilder } from "./contract-builder/ContractBuilder";
import { TenantList } from "./TenantList";

interface LeasingWorkspaceProps {
  initialView?: "contracts" | "tenants" | "editor";
  initialContractId?: string;
}

export function LeasingWorkspace({ initialView = "editor", initialContractId }: LeasingWorkspaceProps) {
  const { contracts, tenants, loading, saveContract, deleteContract } = useLeasing();
  const [view, setView] = useState<"contracts" | "tenants" | "editor">(initialView);
  const [selectedContract, setSelectedContract] = useState<LeaseContract | undefined>(undefined);
  const handledInitialContractRef = useRef<string | null>(null);

  // Sync view when parent navigation changes initialView (e.g. switching tabs via sidebar)
  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  // Load contract by URL initialContractId only once when data is ready
  useEffect(() => {
    if (!loading && initialContractId && handledInitialContractRef.current !== initialContractId) {
      handledInitialContractRef.current = initialContractId;
      const found = contracts.find(c => c.id === initialContractId);
      if (found) {
        setSelectedContract(found);
        setView("editor");
      } else {
        setSelectedContract(undefined);
        setView("contracts");
      }
    }
  }, [loading, initialContractId, contracts]);

  const handleCreateNew = () => {
    setSelectedContract(undefined);
    setView("editor");
  };

  const handleEdit = (contract: LeaseContract) => {
    setSelectedContract(contract);
    setView("editor");
  };

  const handleViewContractByCode = (contractCode: string) => {
    const found = contracts.find(c => c.code === contractCode);
    if (found) {
      setSelectedContract(found);
      setView("editor");
    } else {
      alert(`Không tìm thấy dữ liệu hợp đồng ${contractCode}`);
    }
  };

  const handleSaveContract = async (contract: LeaseContract) => {
    await saveContract(contract);
    setView("contracts");
  };

  const handleCancelEditor = () => {
    setView("contracts");
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Đang tải dữ liệu thuê và hợp đồng...</p>
        </div>
      </div>
    );
  }

  if (view === "editor") {
    return (
      <div className="p-6 max-w-7xl mx-auto w-full">
        <ContractBuilder
          initialContract={selectedContract}
          onSave={handleSaveContract}
          onCancel={handleCancelEditor}
        />
      </div>
    );
  }

  if (view === "tenants") {
    return (
      <TenantList
        tenants={tenants}
        onCreateContract={handleCreateNew}
        onViewContract={handleViewContractByCode}
      />
    );
  }

  return (
    <ContractList
      contracts={contracts}
      onCreateNew={handleCreateNew}
      onEdit={handleEdit}
      onDelete={deleteContract}
    />
  );
}
