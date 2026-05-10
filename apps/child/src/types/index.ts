export interface User {
  id: string;
  nickname: string;
  role: "child" | "parent";
  birthday?: string;
  avatar?: string;
  createdAt: string;
}

export interface LevelStatus {
  levelId: number;
  status: "locked" | "unlocked" | "in_progress" | "completed";
  stars: number;
  bestScore: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GameState {
  stars: number;
  treeLevel: number;
  flowers: number;
  badges: Badge[];
  levelStatuses: LevelStatus[];
  streakDays: number;
  lastPlayDate?: string;
}

export interface CPAAnswer {
  stage: "C" | "P" | "A";
  questionIndex: number;
  userAnswer: string;
  isCorrect: boolean;
  attempts: number;
}

export interface LevelResult {
  levelId: number;
  stars: number;
  score: number;
  answers: CPAAnswer[];
  newBadge?: Badge;
  treeGrew: boolean;
}

export type OnboardingStep =
  | "welcome"
  | "role"
  | "profile"
  | "assessment"
  | "passport"
  | "done";

export interface AssessmentAnswer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
}

export interface VoiceState {
  isSupported: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  confidence: number;
}

export { generateId } from "@kidsmath/shared";
export type { Level } from "@kidsmath/shared";
