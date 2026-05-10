export interface LearningRecord {
  id: string;
  childId: string;
  levelId: string;
  correct: boolean;
  timeSpent: number;
  answer?: string;
  emotion?: string;
  createdAt: string;
}
