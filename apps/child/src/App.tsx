import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { PlanetPage } from '@/pages/PlanetPage';
import { LevelPage } from '@/pages/LevelPage';
import { ResultPage } from '@/pages/ResultPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { useUserStore } from '@/store/userStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isOnboarded } = useUserStore();
  return isOnboarded ? <>{children}</> : <Navigate to="/login" replace />;
}

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/planet/:module"
            element={
              <PrivateRoute>
                <PlanetPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/level/:id"
            element={
              <PrivateRoute>
                <LevelPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/result/:id"
            element={
              <PrivateRoute>
                <ResultPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <PrivateRoute>
                <AchievementsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
