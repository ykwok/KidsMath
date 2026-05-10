export interface Level {
  id: string;
  name: string;
  title?: string;
  description?: string;
  module?: string;
  ageGroup?: string;
  stage?: string;
  order: number;
  difficulty?: "easy" | "medium" | "hard";
  stages?: LevelStage[];
  content?: unknown;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LevelStage {
  id: string;
  type: "counting" | "comparison" | "addition" | "subtraction" | "pattern";
  question: string;
  options?: string[];
  answer: string | number;
  hint?: string;
}
