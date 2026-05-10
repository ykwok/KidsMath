import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  date: string;
  onChange: (date: string) => void;
}

export function DateSelector({ date, onChange }: DateSelectorProps) {
  const current = new Date(date);
  const formatted = `${current.getMonth() + 1}月${current.getDate()}日`;
  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][current.getDay()];

  const shift = (days: number) => {
    const d = new Date(current);
    d.setDate(d.getDate() + days);
    onChange(d.toISOString().split('T')[0]);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-warm-100">
      <button
        onClick={() => shift(-1)}
        className="p-2 rounded-lg hover:bg-warm-100 transition-colors"
        aria-label="前一天"
      >
        <ChevronLeft className="w-4 h-4 text-warm-500" />
      </button>
      <div className="text-center">
        <p className="text-sm font-semibold text-warm-700">{formatted}</p>
        <p className="text-[10px] text-warm-400">{weekDay}</p>
      </div>
      <button
        onClick={() => shift(1)}
        className="p-2 rounded-lg hover:bg-warm-100 transition-colors"
        aria-label="后一天"
      >
        <ChevronRight className="w-4 h-4 text-warm-500" />
      </button>
    </div>
  );
}
