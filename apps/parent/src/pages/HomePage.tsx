import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Target,
  TrendingUp,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { emotionConfig } from "@/data/mock";
import { BottomNav } from "@/components/BottomNav";
import { StatCard } from "@/components/StatCard";
import { ProgressRing } from "@/components/ProgressRing";

export function HomePage() {
  const navigate = useNavigate();
  const { currentChild, dailyReport, fetchDailyReport } = useAppStore();
  const emotion = emotionConfig[dailyReport.emotion] || emotionConfig["开心"];

  useEffect(() => {
    fetchDailyReport();
  }, [fetchDailyReport, currentChild.id]);

  return (
    <div className="min-h-screen pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-warm-100">
        <div className="max-w-mobile mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-lg">
              👶
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-warm-700">
                {currentChild.name}
              </h2>
              <p className="text-xs text-warm-400">
                今天是第 {currentChild.learningDay} 天学习
              </p>
            </div>
            <div
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${emotion.bg} ${emotion.color}`}
            >
              {emotion.icon} {dailyReport.emotion}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Clock}
            label="今日学习时长"
            value={`${dailyReport.duration} 分钟`}
            iconColor="text-brand-500"
            iconBg="bg-brand-50"
          />
          <StatCard
            icon={Target}
            label="完成关卡"
            value={`${dailyReport.completedLevels}/${dailyReport.totalLevels} 关`}
            iconColor="text-success"
            iconBg="bg-green-50"
          />
        </div>

        {/* Accuracy + Emotion */}
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-xs text-warm-400 mb-1">今日正确率</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-warm-700">
                {dailyReport.accuracy}%
              </span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
          </div>
          <ProgressRing
            percentage={dailyReport.accuracy}
            size={64}
            strokeWidth={5}
          />
        </div>

        {/* AI Tips Summary */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-warm-700">
              今日 AI 教练建议
            </h3>
          </div>
          <div className="space-y-2">
            {dailyReport.tips.slice(0, 2).map((tip, i) => (
              <p
                key={i}
                className="text-xs text-warm-600 leading-relaxed line-clamp-2"
              >
                {tip}
              </p>
            ))}
          </div>
          <button
            onClick={() => navigate("/report/daily")}
            className="mt-3 flex items-center text-xs text-brand-500 font-medium"
          >
            查看详细报告 <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate("/report/daily")}
            className="card flex flex-col items-center gap-2 py-4 hover:bg-warm-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-brand-500" />
            </div>
            <span className="text-[10px] text-warm-600">详细报告</span>
          </button>
          <button
            onClick={() => navigate("/report/radar")}
            className="card flex flex-col items-center gap-2 py-4 hover:bg-warm-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-[10px] text-warm-600">能力雷达</span>
          </button>
          <button
            onClick={() => navigate("/tips")}
            className="card flex flex-col items-center gap-2 py-4 hover:bg-warm-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-warning" />
            </div>
            <span className="text-[10px] text-warm-600">明日推荐</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
