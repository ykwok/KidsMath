export type Emotion = "happy" | "confused" | "bored" | "excited";

export interface LearningRecord {
  id: string;
  childId: string;
  levelId: string;
  correct: boolean;
  timeSpent: number;
  answer?: string;
  emotion?: Emotion;
  createdAt: string;
}
