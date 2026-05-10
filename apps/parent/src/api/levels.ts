import { apiClient } from "./client";

export interface LevelApi {
  id: string;
  module: string;
  ageGroup: string;
  stage: string;
  title: string;
  description: string;
  order: number;
  content: unknown;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getTodayRecommended(): Promise<LevelApi> {
  const res = await apiClient.get("/levels/today");
  return res.data;
}
