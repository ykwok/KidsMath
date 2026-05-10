export interface DailyReport {
  id: string;
  userId: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  studyMinutes: number;
  levelsCompleted: number;
}
