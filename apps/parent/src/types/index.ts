export type Emotion = '开心' | '困惑' | '无聊' | '兴奋';

export interface Child {
  id: string;
  name: string;
  avatar: string;
  age: number;
  stage: '萌芽期' | '探索期' | '飞跃期';
  learningDay: number;
}

export interface LevelResult {
  id: string;
  title: string;
  correct: number;
  total: number;
  duration: number; // seconds
  emotion: Emotion;
}

export interface DailyReport {
  date: string;
  duration: number; // minutes
  completedLevels: number;
  totalLevels: number;
  accuracy: number; // 0-100
  emotion: Emotion;
  levels: LevelResult[];
  tips: string[];
}

export interface WeeklyData {
  date: string;
  duration: number;
  accuracy: number;
}

export interface RadarData {
  subject: string;
  current: number;
  previous: number;
  fullMark: number;
  percentile: number;
  suggestion: string;
}

export interface GameTip {
  id: string;
  title: string;
  time: string;
  materials: string;
  steps: string;
  category: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export type TabKey = 'home' | 'report' | 'tips' | 'profile';
