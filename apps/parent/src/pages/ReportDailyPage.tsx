import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { DateSelector } from "@/components/DateSelector";
import { TipsCard } from "@/components/TipsCard";
import { useAppStore } from "@/stores/useAppStore";
import { emotionConfig } from "@/data/mock";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}分${s}秒` : `${m}分钟`;
}

export function ReportDailyPage() {
  const {
    dailyReport,
    weeklyData,
    fetchDailyReport,
    fetchWeeklyData,
    currentChild,
  } = useAppStore();
  const [date, setDate] = useState(dailyReport.date);
  const emotion = emotionConfig[dailyReport.emotion] || emotionConfig["开心"];

  useEffect(() => {
    fetchDailyReport();
    fetchWeeklyData();
  }, [fetchDailyReport, fetchWeeklyData, currentChild.id]);

  return (
    <div className="min-h-screen pb-20">
      <Header title="学情日报" />
      <DateSelector date={date} onChange={setDate} />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-4">
        {/* Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-warm-400">今日学习时长</p>
              <p className="text-2xl font-bold text-warm-700">
                {dailyReport.duration} 分钟
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-warm-400">完成关卡</p>
              <p className="text-2xl font-bold text-warm-700">
                {dailyReport.completedLevels}/{dailyReport.totalLevels}
              </p>
            </div>
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${emotion.bg} ${emotion.color}`}
            >
              {emotion.icon} {dailyReport.emotion}
            </div>
          </div>
        </div>

        {/* Duration Chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">
            最近 7 天学习时长（分钟）
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f3ef" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#a89f8d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#a89f8d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="duration" fill="#0066ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">
            最近 7 天正确率（%）
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f3ef" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#a89f8d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#a89f8d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#22c55e" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Levels List */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">
            今日完成关卡
          </h3>
          <div className="space-y-3">
            {dailyReport.levels.map((level) => {
              const levelEmotion =
                emotionConfig[level.emotion] || emotionConfig["开心"];
              return (
                <div
                  key={level.id}
                  className="flex items-center gap-3 p-3 bg-warm-50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm shadow-sm">
                    {levelEmotion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-warm-700 truncate">
                      {level.title}
                    </p>
                    <p className="text-[10px] text-warm-400">
                      用时 {formatDuration(level.duration)} · {level.correct}/
                      {level.total} 正确
                    </p>
                  </div>
                  <div
                    className={`text-[10px] px-2 py-0.5 rounded-full ${levelEmotion.bg} ${levelEmotion.color}`}
                  >
                    {level.emotion}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Tips */}
        <TipsCard tips={dailyReport.tips} />
      </div>

      <BottomNav />
    </div>
  );
}
