export interface DailyReport {
  id: string;
  childId: string;
  date: string;
  totalTime: number;
  levelsCompleted: number;
  correctRate: number;
  emotionSummary?: string;
  tips?: string;
  createdAt: string;
  updatedAt: string;
}
