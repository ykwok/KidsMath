import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TreePine } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

const PLANETS = [
  {
    id: 'counting',
    name: '计数星云',
    color: 'from-nebula-purple to-nebula-pink',
    shadow: 'shadow-nebula-purple/30',
    icon: '🔢',
    path: '/planet/counting',
    unlocked: true,
  },
  {
    id: 'comparing',
    name: '比较黑洞',
    color: 'from-gray-700 to-gray-900',
    shadow: 'shadow-gray-900/50',
    icon: '⚖️',
    path: '#',
    unlocked: false,
  },
  {
    id: 'logic',
    name: '逻辑迷宫',
    color: 'from-emerald-800 to-emerald-950',
    shadow: 'shadow-emerald-900/50',
    icon: '🧩',
    path: '#',
    unlocked: false,
  },
];

export function HomePage() {
  const { stars, treeLevel } = useGameStore();

  return (
    <div className="h-full flex flex-col px-5 pt-6 pb-4 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <TreePine size={20} className="text-kid-success" />
          <span className="text-sm font-medium text-white/80">Lv.{treeLevel}</span>
        </div>
        <div className="flex items-center gap-2 bg-space-700/50 px-3 py-1.5 rounded-full">
          <Star size={16} className="text-achievement-gold fill-achievement-gold" />
          <span className="text-sm font-bold text-achievement-gold">{stars}</span>
        </div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8 text-center text-shadow"
      >
        选择你的星球
      </motion.h1>

      {/* Planets */}
      <div className="flex-1 flex flex-col gap-6 items-center justify-center relative z-10">
        {PLANETS.map((planet, index) => (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, type: 'spring' }}
            className="relative w-full max-w-xs"
          >
            {planet.unlocked ? (
              <Link to={planet.path}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full h-28 rounded-3xl bg-gradient-to-br ${planet.color} ${planet.shadow} shadow-lg flex items-center gap-4 px-6 relative overflow-hidden`}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                    {planet.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{planet.name}</h3>
                    <p className="text-xs text-white/70">点击进入探索</p>
                  </div>
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </Link>
            ) : (
              <div className={`w-full h-28 rounded-3xl bg-gradient-to-br ${planet.color} opacity-60 flex items-center gap-4 px-6 relative overflow-hidden`}>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl grayscale">
                  {planet.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/60">{planet.name}</h3>
                  <p className="text-xs text-white/40">即将解锁</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                  <span className="text-sm font-medium text-white/80 bg-black/40 px-3 py-1 rounded-full">
                    🔒 即将解锁
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
