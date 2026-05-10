import { create } from 'zustand';
import type { Child, TabKey } from '@/types';
import { mockChild, mockChildren } from '@/data/mock';

interface AppState {
  currentChild: Child;
  children: Child[];
  activeTab: TabKey;
  selectedDate: string;
  setCurrentChild: (child: Child) => void;
  setActiveTab: (tab: TabKey) => void;
  setSelectedDate: (date: string) => void;
  addChild: (child: Child) => void;
  updateChild: (child: Child) => void;
}

const today = new Date().toISOString().split('T')[0];

export const useAppStore = create<AppState>((set) => ({
  currentChild: mockChild,
  children: mockChildren,
  activeTab: 'home',
  selectedDate: today,
  setCurrentChild: (child) => set({ currentChild: child }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  addChild: (child) =>
    set((state) => ({
      children: [...state.children, child],
      currentChild: child,
    })),
  updateChild: (child) =>
    set((state) => ({
      children: state.children.map((c) => (c.id === child.id ? child : c)),
      currentChild: state.currentChild.id === child.id ? child : state.currentChild,
    })),
}));
