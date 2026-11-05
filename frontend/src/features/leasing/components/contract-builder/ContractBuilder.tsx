"use client";

import React, { useState, useEffect } from "react";
import { propertyInventory } from "@/features/properties/mocks";
import type { LeaseContract, PartyInfo, PropertyCategory } from "../../types";
import { defaultLandlordProfile } from "../../mocks";
import { ContractEditorTabs, type ContractTabKey } from "./ContractEditorTabs";
import { ContractToolbar } from "./ContractToolbar";
import { RentalTermsForm } from "./RentalTermsForm";
import { PartiesForm } from "./PartiesForm";
import { PropertyForm } from "./PropertyForm";
import { ContractPreviewPaper } from "./ContractPreviewPaper";
import { downloadContractDoc, printContract } from "../contract-export";
import "@/styles/contract-print.css";

function addCalendarMonths(dateStr: string, months: number): string {
  if (!dateStr || !dateStr.includes("-")) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return "";

  const [year, month, day] = parts;
  const targetDate = new Date(year, month - 1 + months, day);
  targetDate.setDate(targetDate.getDate() - 1);

  if (isNaN(targetDate.getTime())) return "";

  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, "0");
  const d = String(targetDate.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface ContractBuilderProps {
  initialContract?: LeaseContract;
  onSave: (contract: LeaseContract) => Promise<void>;
  onCancel: () => void;
}

export function ContractBuilder({ initialContract, onSave, onCancel }: ContractBuilderProps) {
  const defaultRoom = propertyInventory.rooms[0];
  const defaultBuilding = propertyInventory.buildings[0];

  const [contract, setContract] = useState<LeaseContract>(() => {
    if (initialContract) return initialContract;

    const today = new Date().toISOString().split("T")[0];
    const sixMonthsLater = addCalendarMonths(today, 6);

    return {
      id: `lease-${Date.now()}`,
      code: `HD-2026-${defaultRoom.code.replace(".", "")}`,
      propertyCategory: "room",
      buildingId: defaultBuilding.id,
      buildingName: defaultBuilding.name,
      roomId: defaultRoom.id,
      roomCode: defaultRoom.code,
      propertyAddress: `Phòng ${defaultRoom.code}, ${defaultBuilding.name}, ${defaultBuilding.address}`,
      roomArea: defaultRoom.area,
      landlord: { ...defaultLandlordProfile },
      tenant: {
        fullName: "",
        identityNumber: "",
        identityDate: "",
        identityPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "",
        address: "",
      },
      rentalTerms: {
        monthlyRent: 5000000,
        depositAmount: 10000000,
        paymentCycleMonths: 1,
        paymentDueDay: 5,
        paymentMethod: "transfer",
        noticeDays: 30,
        bankInfo: "Techcombank – 19036888888888 – NGUYEN VAN AN",
      },
      serviceTerms: {
        electricityType: "state_tiered",
        electricityRate: 3500,
        waterType: "meter",
        waterRate: 20000,
        internetFee: 100000,
        parkingFee: 120000,
        serviceFee: 50000,
      },
      startDate: today,
      endDate: sixMonthsLater,
      handoverDate: today,
      furnitureNotes: "Điều hòa, bình nóng lạnh, giường nệm, tủ quần áo theo biên bản bàn giao thực tế.",
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [activeTab, setActiveTab] = useState<ContractTabKey>("terms");
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [noticeDays, setNoticeDays] = useState<number>(() => {
    return initialContract?.rentalTerms?.noticeDays ?? 30;
  });
  const [bankInfo, setBankInfo] = useState<string>(() => {
    return initialContract?.rentalTerms?.bankInfo ?? "Techcombank – 19036888888888 – NGUYEN VAN AN";
  });
  const [saving, setSaving] = useState(false);

  // Sync state if initialContract changes (e.g. user selected another record)
  useEffect(() => {
    if (initialContract) {
      setContract(initialContract);
      setNoticeDays(initialContract.rentalTerms.noticeDays ?? 30);
      setBankInfo(initialContract.rentalTerms.bankInfo ?? "Techcombank – 19036888888888 – NGUYEN VAN AN");
    }
  }, [initialContract]);

  // Tab 1: Rental terms handlers
  const handleCategoryChange = (cat: PropertyCategory) => {
    const isRoom = cat === "room";
    const newMonths = isRoom ? 6 : 12;
    setDurationMonths(newMonths);

    const newEnd = contract.startDate ? addCalendarMonths(contract.startDate, newMonths) : "";
    setContract(prev => ({
      ...prev,
      propertyCategory: cat,
      endDate: newEnd || prev.endDate,
    }));
  };

  const handleDurationChange = (months: number) => {
    setDurationMonths(months);
    const newEnd = contract.startDate ? addCalendarMonths(contract.startDate, months) : "";
    setContract(prev => ({
      ...prev,
      endDate: newEnd || prev.endDate,
    }));
  };

  const handleStartDateChange = (startDate: string) => {
    if (!startDate || startDate.trim() === "") {
      setContract(prev => ({
        ...prev,
        startDate: "",
        handoverDate: "",
      }));
      return;
    }

    const newEnd = addCalendarMonths(startDate, durationMonths);
    setContract(prev => ({
      ...prev,
      startDate,
      endDate: newEnd || prev.endDate,
      handoverDate: startDate,
    }));
  };

  const handleNoticeDaysChange = (days: number) => {
    setNoticeDays(days);
    setContract(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        noticeDays: days,
      },
    }));
  };

  const handleBankInfoChange = (info: string) => {
    setBankInfo(info);
    setContract(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        bankInfo: info,
      },
    }));
  };

  const handleUpdateTerms = (updates: Partial<LeaseContract["rentalTerms"]>) => {
    setContract(prev => ({
      ...prev,
      rentalTerms: { ...prev.rentalTerms, ...updates },
    }));
  };

  const handleUpdateDates = (updates: { endDate?: string; handoverDate?: string }) => {
    setContract(prev => ({
      ...prev,
      ...updates,
    }));
  };

  // Tab 2: Parties handlers
  const handleUpdateLandlord = (updates: Partial<PartyInfo>) => {
    setContract(prev => ({
      ...prev,
      landlord: { ...prev.landlord, ...updates },
    }));
  };

  const handleUpdateTenant = (updates: Partial<PartyInfo>) => {
    setContract(prev => ({
      ...prev,
      tenant: { ...prev.tenant, ...updates },
    }));
  };

  // Tab 3: Property handlers
  const handleRoomSelect = (roomId: string) => {
    const selected = propertyInventory.rooms.find(r => r.id === roomId);
    if (!selected) return;
    const building = propertyInventory.buildings.find(b => b.id === selected.buildingId);
    const bName = building?.name || "Tòa nhà";
    const address = building?.address || "";

    setContract(prev => ({
      ...prev,
      roomId: selected.id,
      roomCode: selected.code,
      roomArea: selected.area,
      buildingId: selected.buildingId,
      buildingName: bName,
      propertyAddress: `Phòng ${selected.code}, ${bName}, ${address}`,
      rentalTerms: {
        ...prev.rentalTerms,
        monthlyRent: selected.monthlyRent,
        depositAmount: selected.monthlyRent,
      },
    }));
  };

  // Action buttons
  const handleSave = async (status: "draft" | "active") => {
    setSaving(true);
    try {
      await onSave({ ...contract, status });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Top Toolbar ──────────────────────────────────────── */}
      <ContractToolbar
        roomCode={contract.roomCode}
        tenantName={contract.tenant.fullName}
        saving={saving}
        onCancel={onCancel}
        onPrint={() => printContract("contract-paper-document", `Hop-dong-thue-${contract.roomCode}-${contract.code}`)}
        onDownloadDoc={() => downloadContractDoc(contract)}
        onSaveDraft={() => handleSave("draft")}
        onActivate={() => handleSave("active")}
      />

      {/* ── Main Workspace: 2-Column Split View ──────────────── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 items-start">
        {/* Left Column: Tabbed Form Editor */}
        <div className="space-y-4 xl:col-span-6 no-print">
          <ContractEditorTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "terms" && (
            <RentalTermsForm
              contract={contract}
              durationMonths={durationMonths}
              noticeDays={noticeDays}
              bankInfo={bankInfo}
              onCategoryChange={handleCategoryChange}
              onDurationChange={handleDurationChange}
              onStartDateChange={handleStartDateChange}
              onNoticeDaysChange={handleNoticeDaysChange}
              onBankInfoChange={handleBankInfoChange}
              onUpdateTerms={handleUpdateTerms}
              onUpdateDates={handleUpdateDates}
            />
          )}

          {activeTab === "parties" && (
            <PartiesForm
              landlord={contract.landlord}
              tenant={contract.tenant}
              onUpdateLandlord={handleUpdateLandlord}
              onUpdateTenant={handleUpdateTenant}
            />
          )}

          {activeTab === "property" && (
            <PropertyForm
              propertyAddress={contract.propertyAddress}
              roomCode={contract.roomCode}
              roomArea={contract.roomArea}
              furnitureNotes={contract.furnitureNotes}
              roomId={contract.roomId}
              onRoomSelect={handleRoomSelect}
              onUpdateAddress={addr => setContract(prev => ({ ...prev, propertyAddress: addr }))}
              onUpdateRoomCode={code => setContract(prev => ({ ...prev, roomCode: code }))}
              onUpdateArea={area => setContract(prev => ({ ...prev, roomArea: area }))}
              onUpdateFurniture={notes => setContract(prev => ({ ...prev, furnitureNotes: notes }))}
            />
          )}
        </div>

        {/* Right Column: Live A4 Paper Preview */}
        <div className="xl:col-span-6">
          <ContractPreviewPaper contract={contract} />
        </div>
      </div>
    </div>
  );
}

