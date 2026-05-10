import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Sparkles,
  User,
  Baby,
  Calendar,
  Send,
} from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { guestLogin, mapBackendUserToFrontend } from "@/api/auth";
import type { OnboardingStep, AssessmentAnswer } from "@/types";

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "数一数，下面有几颗星星？",
    emoji: "⭐⭐⭐⭐⭐",
    options: ["3", "4", "5", "6"],
    correct: "5",
  },
  {
    id: 2,
    question: "3 个苹果加 2 个苹果等于几个？",
    emoji: "🍎🍎🍎 + 🍎🍎",
    options: ["4", "5", "6", "7"],
    correct: "5",
  },
  {
    id: 3,
    question: "5 比 3 多几个？",
    emoji: "5 - 3 = ?",
    options: ["1", "2", "3", "4"],
    correct: "2",
  },
  {
    id: 4,
    question: "把 4 分成两份，可以怎么分？",
    emoji: "4 = ?",
    options: ["1+2", "2+2", "3+1", "2+3"],
    correct: "2+2",
  },
  {
    id: 5,
    question: "数一数，下面有几根香蕉？",
    emoji: "🍌🍌🍌🍌🍌🍌🍌",
    options: ["6", "7", "8", "9"],
    correct: "7",
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const {
    setUser,
    setToken,
    setOnboardingStep,
    addAssessmentAnswer,
    completeOnboarding,
    onboardingStep,
  } = useUserStore();

  const [role, setRole] = useState<"child" | "parent">("child");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState<
    AssessmentAnswer[]
  >([]);

  const handleStep = (step: OnboardingStep) => {
    setOnboardingStep(step);
  };

  const handleProfileSubmit = async () => {
    if (!nickname.trim()) return;
    handleStep("assessment");

    try {
      const res = await guestLogin(nickname.trim());
      const user = mapBackendUserToFrontend(res.user);
      setToken(res.token);
      setUser(user);
    } catch {
      // Fallback: keep local user if API is unavailable
      setUser({
        id: `local_${Date.now()}`,
        nickname,
        role,
        birthday: birthday || undefined,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleAssessmentAnswer = (answer: string) => {
    const q = ASSESSMENT_QUESTIONS[assessmentIndex];
    const result: AssessmentAnswer = {
      questionId: q.id,
      answer,
      isCorrect: answer === q.correct,
    };
    addAssessmentAnswer(result);
    setAssessmentResults((prev) => [...prev, result]);

    if (assessmentIndex + 1 < ASSESSMENT_QUESTIONS.length) {
      setAssessmentIndex((i) => i + 1);
    } else {
      handleStep("passport");
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate("/");
  };

  const correctCount = assessmentResults.filter((r) => r.isCorrect).length;

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-4">
      {/* Progress */}
      <div className="flex gap-1 h-1 mb-6">
        {(
          [
            "welcome",
            "role",
            "profile",
            "assessment",
            "passport",
            "done",
          ] as OnboardingStep[]
        ).map((s, i) => (
          <div
            key={s}
            className={`flex-1 rounded-full ${
              i <=
              [
                "welcome",
                "role",
                "profile",
                "assessment",
                "passport",
                "done",
              ].indexOf(onboardingStep)
                ? "bg-nebula-purple"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {onboardingStep === "welcome" && (
            <WelcomeStep key="welcome" onNext={() => handleStep("role")} />
          )}
          {onboardingStep === "role" && (
            <RoleStep
              key="role"
              role={role}
              setRole={setRole}
              onNext={() => handleStep("profile")}
            />
          )}
          {onboardingStep === "profile" && (
            <ProfileStep
              key="profile"
              nickname={nickname}
              setNickname={setNickname}
              birthday={birthday}
              setBirthday={setBirthday}
              onSubmit={handleProfileSubmit}
            />
          )}
          {onboardingStep === "assessment" && (
            <AssessmentStep
              key="assessment"
              index={assessmentIndex}
              onAnswer={handleAssessmentAnswer}
            />
          )}
          {onboardingStep === "passport" && (
            <PassportStep
              key="passport"
              nickname={nickname}
              correctCount={correctCount}
              total={ASSESSMENT_QUESTIONS.length}
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Steps ─── */
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-6xl mb-6"
      >
        🚀
      </motion.div>
      <h1 className="text-3xl font-bold text-white mb-3">欢迎来到数感星球！</h1>
      <p className="text-white/60 mb-8">和数小星一起，探索数学的奇妙宇宙</p>
      <button onClick={onNext} className="btn-primary w-full max-w-xs">
        开始冒险 <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

function RoleStep({
  role,
  setRole,
  onNext,
}: {
  role: "child" | "parent";
  setRole: (r: "child" | "parent") => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h2 className="text-2xl font-bold text-white mb-2">你是谁？</h2>
      <p className="text-white/50 mb-8">选择你的角色</p>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => setRole("child")}
          className={`w-full h-20 rounded-2xl border-2 flex items-center gap-4 px-5 transition-colors ${
            role === "child"
              ? "border-nebula-purple bg-nebula-purple/20"
              : "border-white/10 bg-space-700/40"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-nebula-purple/30 flex items-center justify-center">
            <Baby size={24} className="text-nebula-purple" />
          </div>
          <span className="text-lg font-medium text-white">我是小朋友</span>
        </button>

        <button
          onClick={() => setRole("parent")}
          className={`w-full h-20 rounded-2xl border-2 flex items-center gap-4 px-5 transition-colors ${
            role === "parent"
              ? "border-planet-orange bg-planet-orange/20"
              : "border-white/10 bg-space-700/40"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-planet-orange/30 flex items-center justify-center">
            <User size={24} className="text-planet-orange" />
          </div>
          <span className="text-lg font-medium text-white">我是家长</span>
        </button>
      </div>

      <button onClick={onNext} className="btn-primary w-full max-w-xs mt-8">
        下一步 <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

function ProfileStep({
  nickname,
  setNickname,
  birthday,
  setBirthday,
  onSubmit,
}: {
  nickname: string;
  setNickname: (v: string) => void;
  birthday: string;
  setBirthday: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h2 className="text-2xl font-bold text-white mb-2">创建你的角色</h2>
      <p className="text-white/50 mb-8">告诉数小星你的名字</p>

      <div className="w-full max-w-xs space-y-4">
        <div>
          <label className="text-sm text-white/60 mb-1 block">昵称</label>
          <div className="relative">
            <Sparkles
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="例如：小明"
              className="w-full h-14 pl-11 pr-4 rounded-2xl bg-space-700/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-nebula-purple/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60 mb-1 block">生日</label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full h-14 pl-11 pr-4 rounded-2xl bg-space-700/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-nebula-purple/50"
            />
          </div>
        </div>
      </div>

      <button onClick={onSubmit} className="btn-primary w-full max-w-xs mt-8">
        开始评估 <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

function AssessmentStep({
  index,
  onAnswer,
}: {
  index: number;
  onAnswer: (a: string) => void;
}) {
  const q = ASSESSMENT_QUESTIONS[index];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="text-xs text-white/40 mb-2">
        题目 {index + 1} / {ASSESSMENT_QUESTIONS.length}
      </div>
      <div className="text-4xl mb-4">{q.emoji}</div>
      <h3 className="text-lg font-bold text-white text-center mb-6">
        {q.question}
      </h3>

      <div className="w-full max-w-xs grid grid-cols-2 gap-3">
        {q.options.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(opt)}
            className="h-16 rounded-2xl bg-space-700/60 border border-white/10 text-lg font-bold text-white active:bg-nebula-purple/40 transition-colors"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function PassportStep({
  nickname,
  correctCount,
  total,
  onComplete,
}: {
  nickname: string;
  correctCount: number;
  total: number;
  onComplete: () => void;
}) {
  const labels = ["数数能力", "加法基础", "减法思维", "分解能力", "观察能力"];
  const values = [
    Math.min(100, (correctCount / total) * 100 + 10),
    Math.min(100, (correctCount / total) * 100 + 5),
    Math.min(100, (correctCount / total) * 100),
    Math.min(100, (correctCount / total) * 100 + 15),
    Math.min(100, (correctCount / total) * 100 + 20),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="text-5xl mb-4"
      >
        🛂
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-1">数感星球护照</h2>
      <p className="text-white/50 mb-6">欢迎，{nickname}！</p>

      {/* Radar chart mock */}
      <div className="w-full max-w-xs bg-space-700/40 rounded-3xl p-5 mb-6">
        <h3 className="text-sm font-medium text-white/70 mb-4 text-center">
          能力雷达图
        </h3>
        <div className="space-y-3">
          {labels.map((label, i) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>{label}</span>
                <span>{Math.round(values[i])}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${values[i]}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onComplete} className="btn-primary w-full max-w-xs">
        进入星球地图 <Send size={18} />
      </button>
    </motion.div>
  );
}
