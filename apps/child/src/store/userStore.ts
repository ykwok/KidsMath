import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, OnboardingStep, AssessmentAnswer } from '@/types';

interface UserStore {
  user: User | null;
  onboardingStep: OnboardingStep;
  assessmentAnswers: AssessmentAnswer[];
  isOnboarded: boolean;
  setUser: (user: User) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  addAssessmentAnswer: (answer: AssessmentAnswer) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingStep: 'welcome',
      assessmentAnswers: [],
      isOnboarded: false,
      setUser: (user) => set({ user }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      addAssessmentAnswer: (answer) =>
        set({ assessmentAnswers: [...get().assessmentAnswers, answer] }),
      completeOnboarding: () => set({ isOnboarded: true, onboardingStep: 'done' }),
      logout: () => set({ user: null, isOnboarded: false, onboardingStep: 'welcome', assessmentAnswers: [] }),
    }),
    {
      name: 'kidsmath-user',
    }
  )
);
