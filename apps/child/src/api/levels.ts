import apiClient from "./client";

export interface ApiLevel {
  id: string;
  name: string;
  order: number;
  difficulty: "easy" | "medium" | "hard";
  module: string;
  ageGroup?: string;
  stage?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchLevels(filters?: {
  module?: string;
  ageGroup?: string;
  stage?: string;
}): Promise<ApiLevel[]> {
  return apiClient.get("/levels", { params: filters });
}

export async function fetchLevelById(id: string): Promise<ApiLevel> {
  return apiClient.get(`/levels/${id}`);
}

export async function fetchTodayRecommended(): Promise<ApiLevel | null> {
  return apiClient.get("/levels/today");
}
