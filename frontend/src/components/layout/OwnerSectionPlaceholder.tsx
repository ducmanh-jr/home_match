import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonClasses, Card } from "@/components/ui";
import { getOwnerModule, ownerModuleHref } from "./owner-navigation";

export function OwnerSectionPlaceholder({ moduleId }: { moduleId: string }) {
  const module = getOwnerModule(moduleId);
  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto max-w-7xl mx-auto w-full">
      <header>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{module.label}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{module.description}</p>
      </header>
      <Card className="p-12 text-center flex flex-col items-center justify-center border-dashed">
        <span className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
          <module.icon size={28} />
        </span>
        <h2 className="text-base font-bold text-slate-800">{module.label}</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
          Nội dung khu vực này đang được hoàn thiện. Bạn có thể quay về Tổng quan để tiếp tục khám phá giao diện quản trị.
        </p>
        <div className="mt-5">
          <Link
            href={ownerModuleHref("tong-quan")}
            className={buttonClasses({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft size={14} /> Về tổng quan
          </Link>
        </div>
      </Card>
    </div>
  );
}
