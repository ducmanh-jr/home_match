"use client";

import React from "react";
import type { LeaseContract } from "../../types";
import { ContractDocument } from "../ContractDocument";

interface ContractPreviewPaperProps {
  contract: LeaseContract;
}

export function ContractPreviewPaper({ contract }: ContractPreviewPaperProps) {
  return (
    <div
      className="max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs sm:p-12"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div id="contract-paper-document">
        <ContractDocument contract={contract} />
      </div>
    </div>
  );
}

