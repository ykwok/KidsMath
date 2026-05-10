import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({ icon: Icon, label, value, subValue, iconColor = 'text-brand-500', iconBg = 'bg-brand-50' }: StatCardProps) {
  return (
    <div className="card flex items-center gap-3">
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-warm-400">{label}</p>
        <p className="text-lg font-bold text-warm-700">{value}</p>
        {subValue && <p className="text-[10px] text-warm-400">{subValue}</p>}
      </div>
    </div>
  );
}
