import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronRight, Settings, Check } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { stageColors } from "@/data/mock";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";

export function ChildrenPage() {
  const navigate = useNavigate();
  const {
    children,
    currentChild,
    setCurrentChild,
    addChildApi,
    fetchChildren,
  } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  const handleAdd = async () => {
    if (!newName || !newAge) return;
    setAdding(true);
    const birthYear = new Date().getFullYear() - parseInt(newAge);
    const birthDate = `${birthYear}-01-01`;
    try {
      await addChildApi({ nickname: newName, birthDate });
      setShowAdd(false);
      setNewName("");
      setNewAge("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header
        title="儿童档案"
        showBack={false}
        right={
          <button
            onClick={() => navigate("/settings")}
            className="p-1 -mr-1 rounded-lg hover:bg-warm-100"
          >
            <Settings className="w-5 h-5 text-warm-500" />
          </button>
        }
      />

      <div className="max-w-mobile mx-auto px-4 py-4 space-y-3">
        {children.map((child) => (
          <div
            key={child.id}
            onClick={() => setCurrentChild(child)}
            className={`card flex items-center gap-3 cursor-pointer transition-all ${
              currentChild.id === child.id ? "ring-2 ring-brand-300" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-lg">
              👶
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-warm-700">
                  {child.name}
                </h3>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${stageColors[child.stage]}`}
                >
                  {child.stage}
                </span>
              </div>
              <p className="text-xs text-warm-400">
                {child.age} 岁 · 第 {child.learningDay} 天学习
              </p>
            </div>
            {currentChild.id === child.id && (
              <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <ChevronRight className="w-4 h-4 text-warm-300" />
          </div>
        ))}

        <button
          onClick={() => setShowAdd(true)}
          className="card flex items-center justify-center gap-2 py-4 border-dashed border-2 border-warm-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
        >
          <Plus className="w-5 h-5 text-warm-400" />
          <span className="text-sm text-warm-500">添加儿童</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-mobile rounded-t-2xl sm:rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-warm-700">
              添加儿童档案
            </h3>
            <div>
              <label className="block text-xs text-warm-500 mb-1">昵称</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="请输入孩子昵称"
                className="w-full px-3 py-2.5 bg-warm-50 rounded-xl text-sm outline-none border border-warm-100 focus:border-brand-300"
              />
            </div>
            <div>
              <label className="block text-xs text-warm-500 mb-1">年龄</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                placeholder="请输入年龄"
                className="w-full px-3 py-2.5 bg-warm-50 rounded-xl text-sm outline-none border border-warm-100 focus:border-brand-300"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 bg-warm-100 text-warm-600 text-sm rounded-xl"
              >
                取消
              </button>
              <button
                onClick={handleAdd}
                disabled={adding || !newName || !newAge}
                className="flex-1 py-2.5 bg-brand-500 text-white text-sm rounded-xl disabled:opacity-60"
              >
                {adding ? "添加中..." : "确认"}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
