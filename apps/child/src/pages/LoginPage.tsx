import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { Sparkles } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { isOnboarded } = useUserStore();
  const [nickname, setNickname] = useState('');

  const handleLogin = () => {
    if (!nickname.trim()) return;
    if (isOnboarded) {
      navigate('/');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center mb-6 planet-glow"
      >
        <Sparkles size={40} className="text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-white mb-2 text-shadow"
      >
        数感星球
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/60 mb-8"
      >
        探索数学的奇妙宇宙
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-xs space-y-4"
      >
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="输入你的昵称"
          className="w-full h-14 px-5 rounded-2xl bg-space-700/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-nebula-purple/50 text-center text-lg"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="btn-primary w-full">
          进入星球
        </button>
      </motion.div>
    </div>
  );
}
