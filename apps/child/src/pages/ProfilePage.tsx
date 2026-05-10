import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TreePine, Flame, LogOut } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { stars, treeLevel, flowers, streakDays, badges, resetProgress } = useGameStore();

  const unlockedBadges = badges.filter((b) => b.unlockedAt);
  const lockedBadges = badges.filter((b) => !b.unlockedAt);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col px-5 pt-6 pb-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center text-2xl shadow-lg">
          {user?.role === 'child' ? '👶' : '👤'}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{user?.nickname || '小朋友'}</h1>
          <p className="text-xs text-white/50">
            {user?.role === 'child' ? '小小探险家' : '家长'}
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard icon={Star} value={stars} label="星星" color="text-achievement-gold" />
        <StatCard icon={TreePine} value={treeLevel} label="树等级" color="text-kid-success" />
        <StatCard icon={Flame} value={streakDays} label="连续天数" color="text-planet-orange" />
      </div>

      {/* Growth Tree */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-white mb-3">成长树</h2>
        <div className="flex items-center justify-center py-6 relative">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            🌳
          </motion.div>
          {Array.from({ length: flowers }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute text-2xl"
              style={{
                top: `${20 + Math.sin(i * 2) * 15}%`,
                left: `${30 + Math.cos(i * 2) * 20}%`,
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-white/50">
          已收集 {flowers} 朵花，再完成 {3 - (flowers % 3)} 个模块升级
        </p>
      </div>

      {/* Badges */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-white mb-3">徽章墙</h2>
        <div className="grid grid-cols-3 gap-3">
          {[...unlockedBadges, ...lockedBadges].map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl ${
                badge.unlockedAt ? 'bg-space-600/40' : 'bg-space-800/40 opacity-40'
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-xs text-white/80 text-center font-medium">{badge.name}</span>
              <span className="text-[10px] text-white/40 text-center">{badge.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-auto">
        <button
          onClick={resetProgress}
          className="w-full h-12 rounded-2xl bg-space-700/40 border border-white/10 text-white/60 text-sm font-medium active:bg-space-700/60 transition-colors"
        >
          重置进度
        </button>
        <button
          onClick={handleLogout}
          className="w-full h-12 rounded-2xl bg-space-700/40 border border-white/10 text-white/60 text-sm font-medium flex items-center justify-center gap-2 active:bg-space-700/60 transition-colors"
        >
          <LogOut size={16} /> 退出登录
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: typeof Star;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="card flex flex-col items-center py-4">
      <Icon size={20} className={color} />
      <span className="text-xl font-bold text-white mt-1">{value}</span>
      <span className="text-[10px] text-white/50">{label}</span>
    </div>
  );
}
