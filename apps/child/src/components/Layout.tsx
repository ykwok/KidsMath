import { BottomNav } from './BottomNav';
import { useLocation } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNav = ['/onboarding', '/login', '/level/', '/result/'].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <div className="h-full w-full max-w-md mx-auto relative flex flex-col">
      <main className={`flex-1 overflow-y-auto scrollbar-hide ${hideNav ? '' : 'pb-20'}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
