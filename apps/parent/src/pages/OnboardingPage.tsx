import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

const steps = [
  {
    title: '了解孩子学习状态',
    desc: '每日学情推送，学习时长、正确率、情绪状态一目了然',
    icon: '📊',
  },
  {
    title: '能力发展追踪',
    desc: '三维能力雷达图，科学评估孩子的数感成长轨迹',
    icon: '📈',
  },
  {
    title: '亲子数感游戏',
    desc: '每日推荐 3 个生活化小游戏，把数学融入日常',
    icon: '🎮',
  },
  {
    title: 'AI 教练建议',
    desc: '个性化学习建议，帮您成为孩子最好的数学启蒙老师',
    icon: '💡',
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/');
    }
  };

  const step = steps[current];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-mobile mx-auto w-full">
        <div className="text-6xl mb-6">{step.icon}</div>
        <h2 className="text-xl font-bold text-warm-700 mb-2 text-center">{step.title}</h2>
        <p className="text-sm text-warm-400 text-center leading-relaxed">{step.desc}</p>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-brand-500' : 'bg-warm-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 max-w-mobile mx-auto w-full">
        <button
          onClick={next}
          className="w-full py-3 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors flex items-center justify-center gap-1"
        >
          {current === steps.length - 1 ? (
            <>
              开始使用 <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              下一步 <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
