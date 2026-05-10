export type Module = "counting" | "comparison" | "logic";
export type AgeGroup = "sprout" | "explore" | "leap";
export type Stage = "concrete" | "pictorial" | "abstract";

export interface LevelItem {
  id: string;
  type: "apple" | "star" | "ball" | "block" | "number";
  value: number;
  position?: { x: number; y: number };
}

export interface LevelContent {
  question: string;
  items: LevelItem[];
  correctAnswer: string | number;
  hints: string[];
  voicePrompt: string;
}

export interface Level {
  id: string;
  module: Module;
  ageGroup: AgeGroup;
  stage: Stage;
  title: string;
  description: string;
  order: number;
  content: LevelContent;
  isActive: boolean;
}
