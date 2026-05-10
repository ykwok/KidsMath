import { create } from "zustand";
import type {
  Child,
  TabKey,
  DailyReport,
  WeeklyData,
  RadarData,
} from "@/types";
import {
  mockChild,
  mockChildren,
  mockDailyReport,
  mockWeeklyData,
  mockRadarData,
} from "@/data/mock";
import {
  getChildren,
  createChild,
  type ChildApi,
  type CreateChildDto,
} from "@/api/children";
import { getTodayReport, getWeeklySummary } from "@/api/dailyReports";
import { getStats } from "@/api/learningRecords";

interface AppState {
  token: string | null;
  user: { id: string; nickname: string; avatar?: string } | null;
  currentChild: Child;
  children: Child[];
  activeTab: TabKey;
  selectedDate: string;
  dailyReport: DailyReport;
  weeklyData: WeeklyData[];
  radarData: RadarData[];
  loading: Record<string, boolean>;
  setToken: (token: string | null) => void;
  setUser: (
    user: { id: string; nickname: string; avatar?: string } | null,
  ) => void;
  setCurrentChild: (child: Child) => void;
  setActiveTab: (tab: TabKey) => void;
  setSelectedDate: (date: string) => void;
  addChild: (child: Child) => void;
  addChildApi: (dto: CreateChildDto) => Promise<void>;
  updateChild: (child: Child) => void;
  fetchChildren: () => Promise<void>;
  fetchDailyReport: (childId?: string) => Promise<void>;
  fetchWeeklyData: (childId?: string) => Promise<void>;
  fetchRadarData: (childId?: string) => Promise<void>;
}

const today = new Date().toISOString().split("T")[0];

function mapChildApiToChild(c: ChildApi): Child {
  const birth = c.birthDate ? new Date(c.birthDate) : null;
  const age = birth
    ? Math.max(1, new Date().getFullYear() - birth.getFullYear())
    : 5;
  const created = new Date(c.createdAt);
  const learningDay = Math.max(
    1,
    Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );
  let stage: Child["stage"] = "萌芽期";
  if (age >= 5) stage = "探索期";
  if (age >= 7) stage = "飞跃期";

  return {
    id: c.id,
    name: c.nickname || "未命名",
    avatar: c.avatar || "",
    age,
    stage,
    learningDay,
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  token: localStorage.getItem("jwt_token"),
  user: null,
  currentChild: mockChild,
  children: mockChildren,
  activeTab: "home",
  selectedDate: today,
  dailyReport: mockDailyReport,
  weeklyData: mockWeeklyData,
  radarData: mockRadarData,
  loading: {},

  setToken: (token) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
    }
    set({ token });
  },

  setUser: (user) => set({ user }),

  setCurrentChild: (child) => set({ currentChild: child }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  addChild: (child) =>
    set((state) => ({
      children: [...state.children, child],
      currentChild: child,
    })),

  addChildApi: async (dto) => {
    set((state) => ({ loading: { ...state.loading, addChild: true } }));
    try {
      const apiChild = await createChild(dto);
      const child = mapChildApiToChild(apiChild);
      set((state) => ({
        children: [...state.children, child],
        currentChild: child,
        loading: { ...state.loading, addChild: false },
      }));
    } catch {
      // Fallback: add locally with mock
      const localChild: Child = {
        id: Date.now().toString(),
        name: dto.nickname,
        avatar: dto.avatar || "",
        age: dto.birthDate
          ? Math.max(
              1,
              new Date().getFullYear() - new Date(dto.birthDate).getFullYear(),
            )
          : 5,
        stage: "萌芽期",
        learningDay: 1,
      };
      set((state) => ({
        children: [...state.children, localChild],
        currentChild: localChild,
        loading: { ...state.loading, addChild: false },
      }));
    }
  },

  updateChild: (child) =>
    set((state) => ({
      children: state.children.map((c) => (c.id === child.id ? child : c)),
      currentChild:
        state.currentChild.id === child.id ? child : state.currentChild,
    })),

  fetchChildren: async () => {
    set((state) => ({ loading: { ...state.loading, children: true } }));
    try {
      const apiChildren = await getChildren();
      const children = apiChildren.map(mapChildApiToChild);
      set({ children, currentChild: children[0] || mockChild, loading: {} });
    } catch {
      set({ loading: {} });
      // Keep mock data as fallback
    }
  },

  fetchDailyReport: async (childId) => {
    const id = childId || get().currentChild.id;
    set((state) => ({ loading: { ...state.loading, dailyReport: true } }));
    try {
      const apiReport = await getTodayReport(id);
      const report: DailyReport = {
        date: apiReport.date ? apiReport.date.split("T")[0] : today,
        duration: Math.round((apiReport.totalTime || 0) / 60),
        completedLevels: apiReport.levelsCompleted || 0,
        totalLevels: Math.max(apiReport.levelsCompleted || 0, 5),
        accuracy: Math.round((apiReport.correctRate || 0) * 100),
        emotion: "开心",
        levels: [],
        tips: apiReport.tips ? [apiReport.tips] : mockDailyReport.tips,
      };
      set({ dailyReport: report, loading: {} });
    } catch {
      set({ dailyReport: mockDailyReport, loading: {} });
    }
  },

  fetchWeeklyData: async (childId) => {
    const id = childId || get().currentChild.id;
    set((state) => ({ loading: { ...state.loading, weekly: true } }));
    try {
      const summary = await getWeeklySummary(id);
      const data: WeeklyData[] = summary.dailyReports.map((r) => ({
        date: r.date ? r.date.split("T")[0].slice(5) : "01-01",
        duration: Math.round((r.totalTime || 0) / 60),
        accuracy: Math.round((r.correctRate || 0) * 100),
      }));
      set({ weeklyData: data.length > 0 ? data : mockWeeklyData, loading: {} });
    } catch {
      set({ weeklyData: mockWeeklyData, loading: {} });
    }
  },

  fetchRadarData: async (childId) => {
    const id = childId || get().currentChild.id;
    set((state) => ({ loading: { ...state.loading, radar: true } }));
    try {
      const stats = await getStats(id);
      const correctRate = Math.round((stats.correctRate || 0) * 100);
      const timeScore = Math.min(
        100,
        Math.round((stats.totalTimeSpent || 0) / 60),
      );

      const data: RadarData[] = [
        {
          subject: "数与量",
          current: correctRate,
          previous: Math.max(0, correctRate - Math.round(Math.random() * 15)),
          fullMark: 100,
          percentile: Math.min(99, Math.round(correctRate * 0.85)),
          suggestion:
            "带孩子去超市购物时，让他们帮忙数苹果、拿 3 个橘子，把数字融入生活场景。",
        },
        {
          subject: "比较与运算",
          current: Math.min(100, Math.round(correctRate * 0.9)),
          previous: Math.max(
            0,
            Math.min(
              100,
              Math.round(correctRate * 0.9) - Math.round(Math.random() * 10),
            ),
          ),
          fullMark: 100,
          percentile: Math.min(99, Math.round(correctRate * 0.8)),
          suggestion:
            '分零食时说"你有 2 块饼干，妈妈再给你 1 块，现在有几块？"用实物演示加减法。',
        },
        {
          subject: "逻辑与空间",
          current: Math.min(
            100,
            Math.round(timeScore * 0.8 + correctRate * 0.2),
          ),
          previous: Math.max(
            0,
            Math.min(
              100,
              Math.round(timeScore * 0.8 + correctRate * 0.2) -
                Math.round(Math.random() * 12),
            ),
          ),
          fullMark: 100,
          percentile: Math.min(99, Math.round(timeScore * 0.75)),
          suggestion:
            '玩积木搭建时引导孩子观察"哪块积木在上面""这座塔有几层"，培养空间感。',
        },
      ];
      set({ radarData: data, loading: {} });
    } catch {
      set({ radarData: mockRadarData, loading: {} });
    }
  },
}));
