import type { LucideIcon } from "lucide-react";

export interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface BottomNavProps {
  items: NavItem[];
  activeKey: string;
  onNavigate: (item: NavItem) => void;
  className?: string;
}

export function BottomNav({
  items,
  activeKey,
  onNavigate,
  className = "",
}: BottomNavProps) {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 ${className}`}
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {items.map((item) => {
          const active = activeKey === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                active ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
