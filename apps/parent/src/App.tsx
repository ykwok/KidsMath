import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { ChildrenPage } from '@/pages/ChildrenPage';
import { ReportDailyPage } from '@/pages/ReportDailyPage';
import { ReportWeeklyPage } from '@/pages/ReportWeeklyPage';
import { RadarPage } from '@/pages/RadarPage';
import { TipsPage } from '@/pages/TipsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-50 flex justify-center">
      <div className="w-full max-w-mobile bg-warm-50 min-h-screen relative">
        {children}
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/onboarding'].includes(location.pathname);

  return (
    <div className={isAuthPage ? '' : ''}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/children" element={<ChildrenPage />} />
        <Route path="/report/daily" element={<ReportDailyPage />} />
        <Route path="/report/weekly" element={<ReportWeeklyPage />} />
        <Route path="/report/radar" element={<RadarPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppLayout>
      <AppContent />
    </AppLayout>
  );
}
