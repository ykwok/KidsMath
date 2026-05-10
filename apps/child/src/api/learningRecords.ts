import apiClient from "./client";

export interface CreateLearningRecordPayload {
  childId: string;
  levelId: string;
  correct: boolean;
  timeSpent: number;
  answer?: string;
  emotion?: string;
}

export async function submitLearningRecord(
  payload: CreateLearningRecordPayload,
): Promise<unknown> {
  return apiClient.post("/learning-records", payload);
}
