import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, RefreshCw } from 'lucide-react';
import { LEVELS } from '@/data/levels';
import type { CPAQuestion } from '@/data/levels';
import type { CPAAnswer } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { VoiceBuddy } from '@/components/VoiceBuddy';
import { useGameStore } from '@/store/gameStore';

type Stage = 'C' | 'P' | 'A';

export function LevelPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1', 10);
  const level = LEVELS.find((l) => l.id === levelId);
  const { checkAndUpdateStreak } = useGameStore();

  const [stage, setStage] = useState<Stage>('C');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<CPAAnswer[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'hint'>('idle');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const { speak, isListening, isSpeaking, isSupported } = useSpeech();
  const hasSpokenRef = useRef(false);

  const currentQuestions = level?.questions.filter((q) => q.stage === stage) || [];
  const currentQuestion = currentQuestions[questionIndex];

  const speakHint = useCallback(
    async (text: string) => {
      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        await speak(text);
      }
    },
    [speak]
  );

  useEffect(() => {
    if (currentQuestion) {
      hasSpokenRef.current = false;
      speakHint(currentQuestion.voiceHint);
    }
  }, [currentQuestion, speakHint]);

  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  if (!level) {
    return (
      <div className="h-full flex items-center justify-center text-white">
        关卡不存在
      </div>
    );
  }

  const handleAnswer = async (answer: string, isCorrect: boolean) => {
    const newAnswer: CPAAnswer = {
      stage,
      questionIndex,
      userAnswer: answer,
      isCorrect,
      attempts: attempts + 1,
    };
    setAnswers((prev) => [...prev, newAnswer]);

    if (isCorrect) {
      setFeedback('correct');
      setScore((s) => s + 10);
      await speak('太棒了！答对啦！');
      setTimeout(() => {
        setFeedback('idle');
        setAttempts(0);
        if (questionIndex + 1 < currentQuestions.length) {
          setQuestionIndex((i) => i + 1);
        } else {
          advanceStage();
        }
      }, 1500);
    } else {
      setFeedback('hint');
      setAttempts((a) => a + 1);
      await speak('我们再数一遍好吗？');
      setTimeout(() => setFeedback('idle'), 2000);
    }
  };

  const advanceStage = () => {
    if (stage === 'C') {
      setStage('P');
      setQuestionIndex(0);
    } else if (stage === 'P') {
      // Check P stage accuracy >= 80%
      const pAnswers = answers.filter((a) => a.stage === 'P');
      const pCorrect = pAnswers.filter((a) => a.isCorrect).length;
      const pAccuracy = pAnswers.length > 0 ? pCorrect / pAnswers.length : 1;
      if (pAccuracy >= 0.8) {
        setStage('A');
        setQuestionIndex(0);
      } else {
        // Retry P stage
        setQuestionIndex(0);
        setAnswers((prev) => prev.filter((a) => a.stage !== 'P'));
        speak('我们再练习一下图示阶段吧！');
      }
    } else {
      // Calculate stars
      const totalCorrect = answers.filter((a) => a.isCorrect).length;
      const totalQuestions = level.questions.length;
      const accuracy = totalCorrect / totalQuestions;
      const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;

      navigate(`/result/${levelId}`, {
        state: {
          levelId,
          stars,
          score,
          answers,
          treeGrew: accuracy >= 0.7,
        },
      });
    }
  };

  const stageLabel = stage === 'C' ? '具体阶段' : stage === 'P' ? '图示阶段' : '抽象阶段';
  const stageColor = stage === 'C' ? 'bg-kid-success' : stage === 'P' ? 'bg-nebula-purple' : 'bg-planet-orange';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-space-700/50 flex items-center justify-center active:scale-90 transition-transform">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-medium ${stageColor}`}>
            {stageLabel}
          </span>
          <div className="flex items-center gap-1 bg-space-700/50 px-2 py-1 rounded-full">
            <Star size={12} className="text-achievement-gold fill-achievement-gold" />
            <span className="text-xs text-white font-medium">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 mb-3">
        <div className="flex gap-1 h-1.5">
          {level.questions.map((q, i) => {
            const answered = answers.find((a) => a.stage === q.stage && a.questionIndex === getQuestionIndexInStage(q));
            const isCurrent = q.stage === stage && getQuestionIndexInStage(q) === questionIndex;
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors ${
                  answered
                    ? answered.isCorrect
                      ? 'bg-kid-success'
                      : 'bg-kid-error'
                    : isCurrent
                    ? 'bg-white/60'
                    : 'bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={`${stage}-${questionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-white text-center">
                {currentQuestion.prompt}
              </h2>

              {stage === 'C' && currentQuestion.concreteItems && (
                <ConcreteStage
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  feedback={feedback}
                />
              )}
              {stage === 'P' && currentQuestion.pictorialItems && (
                <PictorialStage
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  feedback={feedback}
                />
              )}
              {stage === 'A' && (
                <AbstractStage
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  feedback={feedback}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voice Buddy */}
      <div className="px-4 pb-4">
        <VoiceBuddy
          message={
            feedback === 'correct'
              ? '太棒了！答对啦！⭐'
              : feedback === 'hint'
              ? '我们再数一遍好吗？用手指指着数。'
              : currentQuestion?.voiceHint || '加油！'
          }
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={() => {
            if (currentQuestion) speak(currentQuestion.voiceHint);
          }}
          showHint={true}
        />
        {!isSupported && (
          <p className="text-[10px] text-white/30 mt-1 text-center">你的浏览器不支持语音，使用触摸操作吧</p>
        )}
      </div>
    </div>
  );

  function getQuestionIndexInStage(q: CPAQuestion): number {
    return level!.questions.filter((x) => x.stage === q.stage).indexOf(q);
  }
}

/* ─────────── Concrete Stage ─────────── */
function ConcreteStage({
  question,
  onAnswer,
  feedback,
}: {
  question: CPAQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  feedback: string;
}) {
  void feedback;
  const items = question.concreteItems!;
  const [bins, setBins] = useState<number[][]>(Array.from({ length: items.bins }, () => []));
  const [remaining, setRemaining] = useState<number[]>(Array.from({ length: items.total }, (_, i) => i));

  const handleDrag = (itemIndex: number, binIndex: number) => {
    if (!remaining.includes(itemIndex)) return;
    const newBins = bins.map((b, i) => (i === binIndex ? [...b, itemIndex] : b));
    setBins(newBins);
    setRemaining((r) => r.filter((x) => x !== itemIndex));

    if (remaining.length === 1) {
      // All placed, check answer
      const counts = newBins.map((b) => b.length).sort((a, b) => a - b);
      const correctParts = question.correctAnswer.split('+').map((s) => parseInt(s.trim(), 10)).sort((a, b) => a - b);
      const isCorrect = counts.length === correctParts.length && counts.every((c, i) => c === correctParts[i]);
      onAnswer(counts.join('+'), isCorrect);
    }
  };

  const reset = () => {
    setBins(Array.from({ length: items.bins }, () => []));
    setRemaining(Array.from({ length: items.total }, (_, i) => i));
  };

  return (
    <div className="space-y-4">
      {/* Items to drag */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
        {remaining.map((idx) => (
          <motion.button
            key={idx}
            layoutId={`item-${idx}`}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-xl bg-space-600 border border-white/10 flex items-center justify-center text-2xl"
          >
            {items.emoji}
          </motion.button>
        ))}
      </div>

      {/* Bins */}
      <div className="flex justify-center gap-4">
        {bins.map((bin, binIdx) => (
          <button
            key={binIdx}
            onClick={() => {
              if (remaining.length > 0) handleDrag(remaining[0], binIdx);
            }}
            className="w-28 h-36 rounded-2xl border-2 border-dashed border-white/20 bg-space-700/30 flex flex-col items-center justify-start pt-3 gap-2 relative"
          >
            <span className="text-xs text-white/40">篮子 {binIdx + 1}</span>
            <div className="flex flex-wrap justify-center gap-1 px-2">
              {bin.map((itemIdx) => (
                <motion.div
                  key={itemIdx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-lg bg-space-600 flex items-center justify-center text-lg"
                >
                  {items.emoji}
                </motion.div>
              ))}
            </div>
            <span className="absolute bottom-2 text-lg font-bold text-white/60">{bin.length}</span>
          </button>
        ))}
      </div>

      {feedback === 'hint' && (
        <button onClick={reset} className="flex items-center justify-center gap-2 w-full text-sm text-white/50">
          <RefreshCw size={14} /> 重新分配
        </button>
      )}

      {/* Fallback touch options */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {generateSplitOptions(items.total).map((opt) => (
          <button
            key={opt}
            onClick={() => {
              const isCorrect = opt === question.correctAnswer;
              onAnswer(opt, isCorrect);
            }}
            className="h-14 rounded-xl bg-space-700/50 border border-white/10 text-white font-medium active:bg-nebula-purple/30 transition-colors"
          >
            {opt.replace('+', ' 和 ')}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Pictorial Stage ─────────── */
function PictorialStage({
  question,
  onAnswer,
  feedback,
}: {
  question: CPAQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  feedback: string;
}) {
  const items = question.pictorialItems!;
  const shapeClass =
    items.shape === 'circle'
      ? 'rounded-full'
      : items.shape === 'square'
      ? 'rounded-md'
      : 'clip-triangle';

  const [bins, setBins] = useState<number[][]>(Array.from({ length: items.bins }, () => []));
  const [remaining, setRemaining] = useState<number[]>(Array.from({ length: items.total }, (_, i) => i));

  const handleDrag = (itemIndex: number, binIndex: number) => {
    if (!remaining.includes(itemIndex)) return;
    const newBins = bins.map((b, i) => (i === binIndex ? [...b, itemIndex] : b));
    setBins(newBins);
    setRemaining((r) => r.filter((x) => x !== itemIndex));

    if (remaining.length === 1) {
      const counts = newBins.map((b) => b.length).sort((a, b) => a - b);
      const correctParts = question.correctAnswer.split('+').map((s) => parseInt(s.trim(), 10)).sort((a, b) => a - b);
      const isCorrect = counts.length === correctParts.length && counts.every((c, i) => c === correctParts[i]);
      onAnswer(counts.join('+'), isCorrect);
    }
  };

  const reset = () => {
    setBins(Array.from({ length: items.bins }, () => []));
    setRemaining(Array.from({ length: items.total }, (_, i) => i));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
        {remaining.map((idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (bins[0].length <= bins[1].length) handleDrag(idx, 0);
              else handleDrag(idx, 1);
            }}
            className={`w-10 h-10 ${shapeClass} bg-nebula-purple/60 border border-nebula-purple/40`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {bins.map((bin, binIdx) => (
          <button
            key={binIdx}
            onClick={() => {
              if (remaining.length > 0) handleDrag(remaining[0], binIdx);
            }}
            className="w-28 h-36 rounded-2xl border-2 border-dashed border-nebula-purple/30 bg-space-700/30 flex flex-col items-center justify-start pt-3 gap-2 relative"
          >
            <span className="text-xs text-white/40">区域 {binIdx + 1}</span>
            <div className="flex flex-wrap justify-center gap-1 px-2">
              {bin.map((itemIdx) => (
                <div
                  key={itemIdx}
                  className={`w-6 h-6 ${shapeClass} bg-nebula-purple/80`}
                />
              ))}
            </div>
            <span className="absolute bottom-2 text-lg font-bold text-white/60">{bin.length}</span>
          </button>
        ))}
      </div>

      {feedback === 'hint' && (
        <button onClick={reset} className="flex items-center justify-center gap-2 w-full text-sm text-white/50">
          <RefreshCw size={14} /> 重新分配
        </button>
      )}

      <div className="grid grid-cols-2 gap-3 mt-2">
        {generateSplitOptions(items.total).map((opt) => (
          <button
            key={opt}
            onClick={() => {
              const isCorrect = opt === question.correctAnswer;
              onAnswer(opt, isCorrect);
            }}
            className="h-14 rounded-xl bg-space-700/50 border border-white/10 text-white font-medium active:bg-nebula-purple/30 transition-colors"
          >
            {opt.replace('+', ' 和 ')}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Abstract Stage ─────────── */
function AbstractStage({
  question,
  onAnswer,
  feedback,
}: {
  question: CPAQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  feedback: string;
}) {
  void feedback;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-3 py-8">
        <span className="text-5xl font-bold text-white">{question.prompt.split('=')[0].trim()}</span>
        <span className="text-4xl text-white/60">=</span>
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-xl bg-space-600 border-2 border-nebula-purple/40 flex items-center justify-center text-2xl text-white/40">
            ?
          </div>
          <span className="text-3xl text-white/60">+</span>
          <div className="w-14 h-14 rounded-xl bg-space-600 border-2 border-nebula-purple/40 flex items-center justify-center text-2xl text-white/40">
            ?
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.options?.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(opt, opt === question.correctAnswer)}
            className="h-16 rounded-2xl bg-space-700/60 border border-white/10 text-xl font-bold text-white active:bg-nebula-purple/40 transition-colors"
          >
            {opt.replace('+', ' + ')}
          </motion.button>
        )) ||
          generateSplitOptions(parseInt(question.prompt.split('=')[0].trim(), 10)).map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAnswer(opt, opt === question.correctAnswer)}
              className="h-16 rounded-2xl bg-space-700/60 border border-white/10 text-xl font-bold text-white active:bg-nebula-purple/40 transition-colors"
            >
              {opt.replace('+', ' + ')}
            </motion.button>
          ))}
      </div>
    </div>
  );
}

function generateSplitOptions(total: number): string[] {
  const opts = new Set<string>();
  for (let i = 1; i < total; i++) {
    opts.add(`${i}+${total - i}`);
  }
  return Array.from(opts).sort(() => Math.random() - 0.5).slice(0, 4);
}
