import { useState } from 'react';
import { Search, Clock, Package, MessageCircle, Send, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { mockGameTips, mockFAQs } from '@/data/mock';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export function TipsPage() {
  const [query, setQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: '你好！我是数感星球 AI 教练，有什么关于孩子数学启蒙的问题吗？' },
  ]);
  const [input, setInput] = useState('');

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  const handleFAQClick = (faq: typeof mockFAQs[0]) => {
    setChatOpen(true);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: faq.question },
      { role: 'ai', content: faq.answer },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);

    // Simple keyword matching
    const matched = mockFAQs.find((f) =>
      f.tags.some((t) => userMsg.includes(t)) || userMsg.includes(f.question.slice(0, 6))
    );

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: matched
            ? matched.answer
            : '感谢你的提问！AI 教练正在学习中。建议您可以参考"每日推荐"里的亲子游戏，或联系客服获取更专业的建议。',
        },
      ]);
    }, 600);
  };

  const filteredGames = mockGameTips.filter((g) =>
    query ? g.title.includes(query) || g.category.includes(query) : true
  );

  return (
    <div className="min-h-screen pb-20">
      <Header title="每日推荐" showBack={false} />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-warm-100">
          <Search className="w-4 h-4 text-warm-400" />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="搜索游戏或建议..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-warm-300"
          />
        </div>

        {/* Game Cards */}
        <div>
          <h3 className="text-sm font-semibold text-warm-700 mb-3">今日 3 个亲子数感小游戏</h3>
          <div className="space-y-3">
            {filteredGames.map((game, i) => (
              <div key={game.id} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-warm-700">{game.title}</h4>
                  <span className="ml-auto px-2 py-0.5 bg-warm-100 rounded text-[10px] text-warm-500">
                    {game.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-2 text-[10px] text-warm-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {game.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" /> {game.materials}
                  </span>
                </div>
                <p className="text-xs text-warm-600 leading-relaxed">{game.steps}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coach */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-semibold text-warm-700">AI 教练答疑</h3>
          </div>
          <p className="text-xs text-warm-400 mb-3">点击常见问题快速获取解答，或输入您的问题</p>
          <div className="flex flex-wrap gap-2">
            {mockFAQs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleFAQClick(faq)}
                className="px-3 py-1.5 bg-brand-50 text-brand-600 text-[11px] rounded-full hover:bg-brand-100 transition-colors"
              >
                {faq.question}
              </button>
            ))}
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="mt-3 w-full py-2.5 bg-brand-500 text-white text-sm rounded-xl hover:bg-brand-600 transition-colors flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-4 h-4" /> 打开 AI 教练
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-mobile h-[80vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-warm-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-warm-700">AI 教练</h4>
                  <p className="text-[10px] text-warm-400">随时为您解答育儿问题</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 rounded-lg hover:bg-warm-100">
                <X className="w-5 h-5 text-warm-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-500 text-white rounded-br-md'
                        : 'bg-warm-100 text-warm-700 rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-warm-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入您的问题..."
                  className="flex-1 px-3 py-2 bg-warm-50 rounded-xl text-sm outline-none border border-warm-100 focus:border-brand-300"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
