import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceBuddyProps {
  message: string;
  isListening?: boolean;
  isSpeaking?: boolean;
  onClick?: () => void;
  showHint?: boolean;
}

export function VoiceBuddy({ message, isListening, isSpeaking, onClick, showHint }: VoiceBuddyProps) {
  return (
    <div className="flex items-start gap-3">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        className="relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center shadow-lg"
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="mic"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Mic size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="speaker"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Volume2 size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {(isListening || isSpeaking) && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
      <div className="flex-1">
        <div className="bg-space-700/80 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white/90 leading-relaxed">
          {message}
        </div>
        {showHint && (
          <p className="text-[10px] text-white/40 mt-1 ml-1">点击头像听数小星说话</p>
        )}
      </div>
    </div>
  );
}
