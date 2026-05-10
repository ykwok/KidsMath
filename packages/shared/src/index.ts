// Shared utilities for KidsMath
export const formatDate = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN');
};

export const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;
