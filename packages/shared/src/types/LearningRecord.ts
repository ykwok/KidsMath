export interface LearningRecord {
  id: string;
  userId: string;
  levelId: string;
  stageId: string;
  correct: boolean;
  timeSpentMs: number;
  createdAt: string;
}
