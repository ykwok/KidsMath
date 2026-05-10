export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("zh-CN");
}

export function formatAccuracy(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}秒`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) return `${mins}分钟`;
  return `${mins}分${secs}秒`;
}

export function getAgeGroup(birthDate: string): "sprout" | "explore" | "leap" {
  const now = new Date();
  const birth = new Date(birthDate);
  const ageInMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (ageInMonths <= 48) return "sprout";
  if (ageInMonths <= 72) return "explore";
  return "leap";
}
