import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TreePine, ArrowRight, RotateCcw } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useSpeech } from '@/hooks/useSpeech';
import type { LevelResult } from '@/types';
import { StarShower } from '@/components/StarShower';

export function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { completeLevel } = useGameStore();
  const { speak } = useSpeech();
  const [showTree, setShowTree] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const result: LevelResult | null = location.state || null;

  useEffect(() => {
    if (!result) {
      navigate(`/level/${id}`);
      return;
    }
    completeLevel(result);

    const sequence = async () => {
      await speak(`恭喜你获得了 ${result.stars} 颗星！`);
      if (result.treeGrew) {
        setTimeout(() => setShowTree(true), 500);
        await speak('你的成长树开出了一朵新花！');
      }
      if (result.newBadge) {
        setTimeout(() => setShowBadge(true), 800);
        await speak(`解锁了新徽章：${result.newBadge.name}！`);
      }
    };
    sequence();
  }, [result, completeLevel, speak, navigate, id]);

  if (!result) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {result.stars >= 2 && <StarShower count={16} />}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="text-center mb-6 relative z-10"
      >
        <h2 className="text-2xl font-bold text-white mb-4">关卡完成！</h2>
        <div className="flex justify-center gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4 + i * 0.2, type: 'spring' }}
            >
              <Star
                size={48}
                className={
                  i <= result.stars
                    ? 'text-achievement-gold fill-achievement-gold drop-shadow-lg'
                    : 'text-white/20'
                }
              />
            </motion.div>
          ))}
        </div>
        <p className="text-white/60 mt-3 text-sm">
          得分: <span className="text-white font-bold">{result.score}</span>
        </p>
      </motion.div>

      {/* Tree growth */}
      <AnimatePresence>
        {showTree && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0 }}
            className="flex flex-col items-center gap-2 mb-4 relative z-10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <TreePine size={48} className="text-kid-success" />
            </motion.div>
            <p className="text-sm text-kid-success font-medium">成长树开花了！🌸</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge unlock */}
      <AnimatePresence>
        {showBadge && result.newBadge && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0 }}
            className="flex flex-col items-center gap-2 mb-6 relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-achievement-gold/20 flex items-center justify-center text-3xl border-2 border-achievement-gold/50">
              {result.newBadge.icon}
            </div>
            <p className="text-sm text-achievement-gold font-medium">
              解锁徽章：{result.newBadge.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="w-full max-w-xs space-y-3 relative z-10">
        <Link to={`/level/${parseInt(id || '1', 10) + 1}`} className="btn-primary w-full">
          继续探索 <ArrowRight size={18} />
        </Link>
        <button onClick={() => navigate('/')} className="btn-secondary w-full">
          <RotateCcw size={18} /> 返回星球地图
        </button>
      </div>
    </div>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
