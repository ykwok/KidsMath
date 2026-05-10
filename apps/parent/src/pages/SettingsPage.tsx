import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Moon,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Header } from "@/components/Header";
import { useAppStore } from "@/stores/useAppStore";

export function SettingsPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleItems = [
    {
      icon: Bell,
      label: "每日学情推送",
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Moon,
      label: "深色模式",
      value: darkMode,
      onChange: setDarkMode,
    },
  ];

  const menuItems = [
    { icon: Shield, label: "隐私政策", href: "#" },
    { icon: HelpCircle, label: "帮助与反馈", href: "#" },
  ];

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen pb-8">
      <Header title="设置" />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-4">
        {/* Toggle Items */}
        <div className="card divide-y divide-warm-100">
          {toggleItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warm-50 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-warm-500" />
                </div>
                <span className="text-sm text-warm-700">{item.label}</span>
              </div>
              <button
                onClick={() => item.onChange(!item.value)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  item.value ? "bg-brand-500" : "bg-warm-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    item.value ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="card divide-y divide-warm-100">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warm-50 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-warm-500" />
                </div>
                <span className="text-sm text-warm-700">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-warm-300" />
            </a>
          ))}
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-[10px] text-warm-300">数感星球家长端 v0.0.1</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm text-danger bg-white rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" /> 退出登录
        </button>
      </div>
    </div>
  );
}
