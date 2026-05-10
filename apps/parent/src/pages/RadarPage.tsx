import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { mockRadarData } from '@/data/mock';

export function RadarPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header title="能力雷达图" />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-4">
        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-warm-700 mb-3">三维能力评估</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockRadarData}>
                <PolarGrid stroke="#e8e4dc" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 12, fill: '#6b6354', fontWeight: 500 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#a89f8d' }} />
                <Radar
                  name="本月"
                  dataKey="current"
                  stroke="#0066ff"
                  fill="#0066ff"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name="上月"
                  dataKey="previous"
                  stroke="#a89f8d"
                  fill="#a89f8d"
                  fillOpacity={0.08}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dimension Details */}
        <div className="space-y-3">
          {mockRadarData.map((item) => (
            <div key={item.subject} className="card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-warm-700">{item.subject}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-warm-400">超过同龄</span>
                  <span className="text-sm font-bold text-brand-500">{item.percentile}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-warm-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${item.current}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-warm-400 mb-3">
                <span>上月: {item.previous}</span>
                <span>本月: {item.current}</span>
                <span className={item.current >= item.previous ? 'text-success' : 'text-danger'}>
                  {item.current >= item.previous ? '↑' : '↓'} {Math.abs(item.current - item.previous)}
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl">
                <p className="text-[11px] text-warm-600 leading-relaxed">
                  <span className="font-semibold">巩固建议：</span>
                  {item.suggestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
