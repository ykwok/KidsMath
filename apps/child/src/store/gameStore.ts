import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, LevelStatus, LevelResult } from "@/types";
import { ALL_BADGES } from "@/data/badges";
import { addToOfflineQueue } from "@/api/offlineQueue";
import { submitLearningRecord } from "@/api/learningRecords";
import { useUserStore } from "./userStore";

const INITIAL_LEVELS: LevelStatus[] = Array.from({ length: 8 }, (_, i) => ({
  levelId: i + 1,
  status: i === 0 ? "unlocked" : "locked",
  stars: 0,
  bestScore: 0,
}));

const INITIAL_STATE: GameState = {
  stars: 0,
  treeLevel: 1,
  flowers: 0,
  badges: ALL_BADGES.map((b) => ({ ...b })),
  levelStatuses: INITIAL_LEVELS,
  streakDays: 0,
};

interface GameStore extends GameState {
  completeLevel: (result: LevelResult) => void;
  resetProgress: () => void;
  checkAndUpdateStreak: () => void;
  setLevelStatuses: (statuses: LevelStatus[]) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      setLevelStatuses: (statuses) => set({ levelStatuses: statuses }),
      completeLevel: (result) => {
        const state = get();
        const newStatuses = [...state.levelStatuses];
        const idx = newStatuses.findIndex((l) => l.levelId === result.levelId);
        if (idx === -1) return;

        const current = newStatuses[idx];
        newStatuses[idx] = {
          ...current,
          status: "completed",
          stars: Math.max(current.stars, result.stars),
          bestScore: Math.max(current.bestScore, result.score),
        };

        // Unlock next level
        if (
          idx + 1 < newStatuses.length &&
          newStatuses[idx + 1].status === "locked"
        ) {
          newStatuses[idx + 1] = {
            ...newStatuses[idx + 1],
            status: "unlocked",
          };
        }

        const newBadges = state.badges.map((b) => {
          if (b.unlockedAt) return b;
          if (result.newBadge && b.id === result.newBadge.id) {
            return { ...b, unlockedAt: new Date().toISOString() };
          }
          // Counting master: complete 5 levels
          if (b.id === "counting-master") {
            const completedCount = newStatuses.filter(
              (l) => l.status === "completed",
            ).length;
            if (completedCount >= 5)
              return { ...b, unlockedAt: new Date().toISOString() };
          }
          // Explorer star: first CPA complete
          if (
            b.id === "explorer-star" &&
            result.answers.some((a) => a.stage === "A")
          ) {
            const hasCompleted = state.levelStatuses.some(
              (l) => l.status === "completed",
            );
            if (!hasCompleted)
              return { ...b, unlockedAt: new Date().toISOString() };
          }
          return b;
        });

        const treeGrew = result.treeGrew;
        const newFlowers = state.flowers + (treeGrew ? 1 : 0);
        const newTreeLevel = Math.floor(newFlowers / 3) + 1;

        set({
          stars: state.stars + result.stars,
          levelStatuses: newStatuses,
          badges: newBadges,
          flowers: newFlowers,
          treeLevel: newTreeLevel,
        });

        // Submit learning record to API
        const user = useUserStore.getState().user;
        if (user) {
          const totalCorrect = result.answers.filter((a) => a.isCorrect).length;
          const totalQuestions = result.answers.length;
          const correct = totalCorrect === totalQuestions;

          const payload = {
            childId: user.id,
            levelId: String(result.levelId),
            correct,
            timeSpent: 0,
            answer: result.answers.map((a) => a.userAnswer).join(","),
            emotion: result.stars >= 2 ? "happy" : "neutral",
          };

          submitLearningRecord(payload).catch(() => {
            addToOfflineQueue(payload);
          });
        }
      },
      resetProgress: () => set({ ...INITIAL_STATE }),
      checkAndUpdateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        const last = state.lastPlayDate
          ? new Date(state.lastPlayDate).toDateString()
          : null;
        if (last === today) return;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = last === yesterday.toDateString();
        set({
          streakDays: isConsecutive ? state.streakDays + 1 : 1,
          lastPlayDate: new Date().toISOString(),
        });
        if (isConsecutive && state.streakDays + 1 >= 3) {
          const newBadges = state.badges.map((b) =>
            b.id === "persistence-star" && !b.unlockedAt
              ? { ...b, unlockedAt: new Date().toISOString() }
              : b,
          );
          set({ badges: newBadges });
        }
      },
    }),
    { name: "kidsmath-game" },
  ),
);
