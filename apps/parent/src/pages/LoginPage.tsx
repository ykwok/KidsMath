import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, User } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { guestLogin } from "@/api/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAppStore();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const sendCode = () => {
    if (countdown > 0 || phone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) clearInterval(timer);
        return c - 1;
      });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      // Try guest login with phone as nickname for MVP
      const res = await guestLogin(phone || undefined);
      setToken(res.token);
      setUser({
        id: res.user.id,
        nickname: res.user.nickname || res.user.name || "用户",
        avatar: res.user.avatar,
      });
      navigate("/");
    } catch {
      setError("登录失败，请重试");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setLoggingIn(true);
    try {
      const res = await guestLogin();
      setToken(res.token);
      setUser({
        id: res.user.id,
        nickname: res.user.nickname || res.user.name || "游客用户",
        avatar: res.user.avatar,
      });
      navigate("/");
    } catch {
      setError("游客登录失败，请重试");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 max-w-mobile mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-warm-700 mb-2">欢迎回来</h1>
          <p className="text-sm text-warm-400">
            登录数感星球家长端，掌握孩子学习动态
          </p>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 text-danger text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs text-warm-500 mb-1.5">手机号</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-warm-50 rounded-xl border border-warm-100 focus-within:border-brand-300 transition-colors">
              <Phone className="w-4 h-4 text-warm-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                }
                placeholder="请输入手机号"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-warm-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-warm-500 mb-1.5">验证码</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-warm-50 rounded-xl border border-warm-100 focus-within:border-brand-300 transition-colors">
                <Lock className="w-4 h-4 text-warm-400" />
                <input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="请输入验证码"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-warm-300"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="text-warm-400"
                >
                  {showCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={sendCode}
                disabled={countdown > 0 || phone.length < 11}
                className="px-4 py-2.5 bg-brand-500 text-white text-sm rounded-xl disabled:bg-warm-200 disabled:text-warm-400 transition-colors whitespace-nowrap"
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-60"
          >
            {loggingIn ? "登录中..." : "登录"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-warm-100" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-warm-400">或</span>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          disabled={loggingIn}
          className="w-full py-3 flex items-center justify-center gap-2 bg-warm-50 text-warm-700 text-sm font-medium rounded-xl border border-warm-200 hover:bg-warm-100 transition-colors disabled:opacity-60"
        >
          <User className="w-4 h-4" />
          {loggingIn ? "登录中..." : "游客登录"}
        </button>

        <p className="mt-6 text-center text-xs text-warm-400">
          未注册手机号验证后将自动创建账号
        </p>
      </div>
    </div>
  );
}
