import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  iconColorClass?: string;
  iconBgClass?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  iconColorClass = "text-blue-500",
  iconBgClass = "bg-blue-50",
}: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBgClass}`}
      >
        <Icon className={`w-5 h-5 ${iconColorClass}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-700">{value}</p>
        {subValue && <p className="text-[10px] text-gray-400">{subValue}</p>}
      </div>
    </div>
  );
}
