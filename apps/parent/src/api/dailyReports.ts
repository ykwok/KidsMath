import { apiClient } from "./client";

export interface DailyReportApi {
  id: string;
  childId: string;
  date: string;
  totalTime: number;
  levelsCompleted: number;
  correctRate: number;
  emotionSummary?: string;
  tips?: string;
}

export interface WeeklySummaryApi {
  startDate: string;
  endDate: string;
  totalTime: number;
  totalLevelsCompleted: number;
  avgCorrectRate: number;
  dailyReports: DailyReportApi[];
}

export async function getTodayReport(childId: string): Promise<DailyReportApi> {
  const res = await apiClient.get("/daily-reports/today", {
    params: { childId },
  });
  return res.data;
}

export async function getWeeklySummary(
  childId: string,
): Promise<WeeklySummaryApi> {
  const res = await apiClient.get("/daily-reports/weekly", {
    params: { childId },
  });
  return res.data;
}
