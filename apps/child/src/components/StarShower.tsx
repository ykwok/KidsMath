import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function StarShower({ count = 12 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 0.8 + Math.random() * 0.6,
      size: 16 + Math.random() * 20,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-achievement-gold"
          style={{ left: `${star.x}%`, top: '-20px', fontSize: star.size }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '30vh', '60vh', '100vh'],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration + 1,
            delay: star.delay,
            ease: 'easeIn',
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
}
