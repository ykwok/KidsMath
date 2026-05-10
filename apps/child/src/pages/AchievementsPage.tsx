import { motion } from 'framer-motion';
import { Star, TreePine, Trophy, Lock } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export function AchievementsPage() {
  const { stars, treeLevel, flowers, badges, levelStatuses } = useGameStore();
  const completedLevels = levelStatuses.filter((l) => l.status === 'completed').length;
  const totalLevels = levelStatuses.length;

  return (
    <div className="h-full flex flex-col px-5 pt-6 pb-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-6">我的成就</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card flex flex-col items-center py-4">
          <Trophy size={20} className="text-achievement-gold" />
          <span className="text-xl font-bold text-white mt-1">
            {completedLevels}/{totalLevels}
          </span>
          <span className="text-[10px] text-white/50">已完成关卡</span>
        </div>
        <div className="card flex flex-col items-center py-4">
          <Star size={20} className="text-achievement-gold fill-achievement-gold" />
          <span className="text-xl font-bold text-white mt-1">{stars}</span>
          <span className="text-[10px] text-white/50">收集星星</span>
        </div>
      </div>

      {/* Growth Tree Visual */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">成长树</h2>
          <span className="text-xs text-white/50">Lv.{treeLevel}</span>
        </div>
        <div className="flex items-center justify-center py-8 relative bg-gradient-to-b from-space-800/50 to-space-900/50 rounded-2xl">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-7xl"
          >
            🌳
          </motion.div>
          {Array.from({ length: flowers }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              className="absolute text-2xl"
              style={{
                top: `${15 + (i % 3) * 12}%`,
                left: `${25 + ((i * 7) % 50)}%`,
              }}
            >
              🌸
            </motion.div>
          ))}
          <div className="absolute bottom-2 right-3 flex items-center gap-1">
            <TreePine size={14} className="text-kid-success" />
            <span className="text-xs text-kid-success">{flowers} 朵花</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-3">徽章收集</h2>
        <div className="space-y-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                badge.unlockedAt ? 'bg-space-600/30' : 'bg-space-800/30 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  badge.unlockedAt ? 'bg-achievement-gold/20' : 'bg-white/5'
                }`}
              >
                {badge.unlockedAt ? badge.icon : <Lock size={18} className="text-white/30" />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">{badge.name}</h3>
                <p className="text-xs text-white/40">{badge.description}</p>
              </div>
              {badge.unlockedAt && (
                <Star size={16} className="text-achievement-gold fill-achievement-gold" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
