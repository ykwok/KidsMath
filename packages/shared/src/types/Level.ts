export interface Level {
  id: string;
  name: string;
  order: number;
  difficulty: "easy" | "medium" | "hard";
  stages: LevelStage[];
}

export interface LevelStage {
  id: string;
  type: "counting" | "comparison" | "addition" | "subtraction" | "pattern";
  question: string;
  options?: string[];
  answer: string | number;
  hint?: string;
}
