export interface StageData {
  id: string;
  type: "counting" | "comparison" | "addition" | "subtraction" | "pattern";
  question: string;
  options?: string[];
  answer: string | number;
  hint?: string;
}

export interface LevelData {
  id: string;
  name: string;
  order: number;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  stages: StageData[];
}
