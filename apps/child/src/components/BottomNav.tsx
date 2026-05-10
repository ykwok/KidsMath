import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: '星球地图' },
  { path: '/achievements', icon: Trophy, label: '我的成就' },
  { path: '/profile', icon: User, label: '个人中心' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-space-800/90 backdrop-blur-lg border-t border-white/10 safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 px-4 py-2 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-planet-orange rounded-full"
                />
              )}
              <item.icon
                size={22}
                className={isActive ? 'text-planet-orange' : 'text-white/50'}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-planet-orange' : 'text-white/50'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
