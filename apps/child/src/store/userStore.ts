import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, OnboardingStep, AssessmentAnswer } from "@/types";

interface UserStore {
  user: User | null;
  token: string | null;
  onboardingStep: OnboardingStep;
  assessmentAnswers: AssessmentAnswer[];
  isOnboarded: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  addAssessmentAnswer: (answer: AssessmentAnswer) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      onboardingStep: "welcome",
      assessmentAnswers: [],
      isOnboarded: false,
      setUser: (user) => set({ user }),
      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem("kidsmath_token", token);
        } else {
          localStorage.removeItem("kidsmath_token");
        }
      },
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      addAssessmentAnswer: (answer) =>
        set({ assessmentAnswers: [...get().assessmentAnswers, answer] }),
      completeOnboarding: () =>
        set({ isOnboarded: true, onboardingStep: "done" }),
      logout: () => {
        localStorage.removeItem("kidsmath_token");
        set({
          user: null,
          token: null,
          isOnboarded: false,
          onboardingStep: "welcome",
          assessmentAnswers: [],
        });
      },
    }),
    {
      name: "kidsmath-user",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        onboardingStep: state.onboardingStep,
        assessmentAnswers: state.assessmentAnswers,
        isOnboarded: state.isOnboarded,
      }),
    },
  ),
);
