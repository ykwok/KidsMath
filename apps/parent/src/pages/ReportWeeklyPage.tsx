import { useEffect } from "react";
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
import { useAppStore } from "@/stores/useAppStore";

export function ReportWeeklyPage() {
  const { weeklyData, fetchWeeklyData, currentChild } = useAppStore();

  useEffect(() => {
    fetchWeeklyData();
  }, [fetchWeeklyData, currentChild.id]);

  const totalDuration = weeklyData.reduce((sum, d) => sum + d.duration, 0);
  const avgAccuracy =
    weeklyData.length > 0
      ? Math.round(
          weeklyData.reduce((sum, d) => sum + d.accuracy, 0) /
            weeklyData.length,
        )
      : 0;

  const maxDurationDay = weeklyData.reduce(
    (max, d) => (d.duration > max.duration ? d : max),
    weeklyData[0],
  );
  const minAccuracyDay = weeklyData.reduce(
    (min, d) => (d.accuracy < min.accuracy ? d : min),
    weeklyData[0],
  );

  return (
    <div className="min-h-screen pb-20">
      <Header title="周报" />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-4">
        {/* Weekly Summary */}
        <div className="card">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-warm-400">本周总时长</p>
              <p className="text-2xl font-bold text-warm-700">
                {totalDuration} 分钟
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-warm-400">平均正确率</p>
              <p className="text-2xl font-bold text-warm-700">{avgAccuracy}%</p>
            </div>
          </div>
        </div>

        {/* Duration Chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">
            每日学习时长
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
            每日正确率趋势
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

        {/* Weekly Insights */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">本周亮点</h3>
          <ul className="space-y-2">
            {maxDurationDay && (
              <li className="flex gap-2 text-xs text-warm-600">
                <span className="text-success font-bold">↑</span>
                <span>
                  {maxDurationDay.date} 学习时长最长（{maxDurationDay.duration}{" "}
                  分钟），建议保持这个节奏。
                </span>
              </li>
            )}
            <li className="flex gap-2 text-xs text-warm-600">
              <span className="text-brand-500 font-bold">★</span>
              <span>
                正确率总体稳定在 {avgAccuracy}% 左右，
                {avgAccuracy >= 80 ? "基础扎实" : "还有提升空间"}。
              </span>
            </li>
            {minAccuracyDay && minAccuracyDay.accuracy < avgAccuracy && (
              <li className="flex gap-2 text-xs text-warm-600">
                <span className="text-warning font-bold">!</span>
                <span>
                  {minAccuracyDay.date} 正确率略低（{minAccuracyDay.accuracy}
                  %），建议针对性复习。
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
