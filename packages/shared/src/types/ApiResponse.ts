export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  } | null;
}

export interface AuthResponse {
  token: string;
  user: import("./User").User;
}

export interface WeeklyReport {
  totalTime: number;
  totalLevels: number;
  avgCorrectRate: number;
  dailyReports: import("./DailyReport").DailyReport[];
}
