import { Home, BarChart3, Lightbulb, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import type { TabKey } from '@/types';

const tabs: { key: TabKey; label: string; icon: typeof Home; path: string }[] = [
  { key: 'home', label: '首页', icon: Home, path: '/' },
  { key: 'report', label: '报告', icon: BarChart3, path: '/report/daily' },
  { key: 'tips', label: '推荐', icon: Lightbulb, path: '/tips' },
  { key: 'profile', label: '我的', icon: User, path: '/children' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTab, setActiveTab } = useAppStore();

  const handleClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.key);
    navigate(tab.path);
  };

  const isActive = (tab: typeof tabs[0]) => {
    if (location.pathname === '/') return tab.key === 'home';
    if (location.pathname.startsWith('/report')) return tab.key === 'report';
    if (location.pathname === '/tips') return tab.key === 'tips';
    if (location.pathname.startsWith('/children') || location.pathname === '/settings') return tab.key === 'profile';
    return activeTab === tab.key;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-100 safe-bottom z-50">
      <div className="flex items-center justify-around h-14 max-w-mobile mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => handleClick(tab)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                active ? 'text-brand-500' : 'text-warm-400'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
