import type { CreateLearningRecordPayload } from "./learningRecords";
import { submitLearningRecord } from "./learningRecords";

const QUEUE_KEY = "kidsmath_learning_record_queue";

export function getOfflineQueue(): CreateLearningRecordPayload[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToOfflineQueue(record: CreateLearningRecordPayload): void {
  const queue = getOfflineQueue();
  queue.push(record);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function clearOfflineQueue(): void {
  localStorage.removeItem(QUEUE_KEY);
}

export async function flushOfflineQueue(): Promise<void> {
  const queue = getOfflineQueue();
  if (queue.length === 0) return;

  const remaining: CreateLearningRecordPayload[] = [];
  for (const record of queue) {
    try {
      await submitLearningRecord(record);
    } catch {
      remaining.push(record);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } else {
    localStorage.removeItem(QUEUE_KEY);
  }
}
