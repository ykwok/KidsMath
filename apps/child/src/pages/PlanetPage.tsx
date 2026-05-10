import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Lock, ChevronLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { LEVELS } from "@/data/levels";
import { fetchLevels, type ApiLevel } from "@/api/levels";

export function PlanetPage() {
  const { module } = useParams<{ module: string }>();
  const navigate = useNavigate();
  const { levelStatuses } = useGameStore();
  const [apiLevels, setApiLevels] = useState<ApiLevel[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLevels({ module })
      .then((data) => {
        if (!cancelled) setApiLevels(data);
      })
      .catch(() => {
        if (!cancelled) setApiLevels(null);
      });
    return () => {
      cancelled = true;
    };
  }, [module]);

  // Fallback to local LEVELS if API is unavailable
  const levels =
    apiLevels && apiLevels.length > 0
      ? apiLevels.map((l) => ({
          id: parseInt(l.id, 10) || l.order,
          title: l.name,
          description: `难度: ${l.difficulty}`,
          module:
            (l.module as "counting" | "comparing" | "logic") || "counting",
          questions: [],
        }))
      : LEVELS.filter((l) => l.module === module);

  const planetName =
    module === "counting"
      ? "计数星云"
      : module === "comparing"
        ? "比较黑洞"
        : "逻辑迷宫";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-space-700/50 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">{planetName}</h1>
          <p className="text-xs text-white/50">完成关卡，收集星星</p>
        </div>
      </div>

      {/* Level cards - horizontal scroll */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {levels.map((level, index) => {
            const levelId = level.id;
            const status = levelStatuses.find((s) => s.levelId === levelId);
            const isLocked = status?.status === "locked";
            const isCompleted = status?.status === "completed";

            return (
              <motion.div
                key={levelId}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 snap-start"
              >
                {isLocked ? (
                  <div className="h-80 rounded-3xl bg-space-700/40 border border-white/5 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-space-800 flex items-center justify-center">
                      <Lock size={28} className="text-white/30" />
                    </div>
                    <p className="text-white/30 font-medium">关卡 {levelId}</p>
                    <p className="text-white/20 text-xs">完成前一关解锁</p>
                  </div>
                ) : (
                  <Link to={`/level/${levelId}`}>
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      className="h-80 rounded-3xl bg-gradient-to-b from-nebula-purple/20 to-space-700/60 border border-nebula-purple/20 flex flex-col p-5 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl font-bold text-white/10">
                          {String(levelId).padStart(2, "0")}
                        </span>
                        {isCompleted && (
                          <div className="flex gap-0.5">
                            {Array.from({ length: status?.stars || 0 }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="text-achievement-gold fill-achievement-gold"
                                />
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">
                        {level.title}
                      </h3>
                      <p className="text-sm text-white/60 mb-auto">
                        {level.description}
                      </p>

                      <motion.div
                        className="mt-4 w-full h-12 rounded-xl bg-planet-orange flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Play size={18} className="text-white" />
                        <span className="text-white font-bold">
                          {isCompleted ? "再玩一次" : "开始挑战"}
                        </span>
                      </motion.div>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
