import { apiClient } from "./client";

export interface LearningStatsApi {
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  correctRate: number;
  totalTimeSpent: number;
}

export async function getStats(childId: string): Promise<LearningStatsApi> {
  const res = await apiClient.get("/learning-records/stats", {
    params: { childId },
  });
  return res.data;
}
