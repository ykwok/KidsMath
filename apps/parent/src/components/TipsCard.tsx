import { Lightbulb } from 'lucide-react';

interface TipsCardProps {
  tips: string[];
  title?: string;
}

export function TipsCard({ tips, title = 'AI 教练建议' }: TipsCardProps) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-50">
          <Lightbulb className="w-3.5 h-3.5 text-warning" />
        </div>
        <h3 className="text-sm font-semibold text-warm-700">{title}</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-2 text-xs text-warm-600 leading-relaxed">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-50 text-brand-500 text-[10px] font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
