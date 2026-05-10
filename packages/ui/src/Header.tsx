import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
  className?: string;
}

export function Header({
  title,
  showBack = true,
  right,
  className = "",
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between h-12 px-4 max-w-md mx-auto">
        <div className="w-8">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="返回"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
        <h1 className="text-base font-semibold text-gray-700">{title}</h1>
        <div className="w-8 flex justify-end">{right}</div>
      </div>
    </header>
  );
}
