
export function formatDate(value, useLocal = false) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: useLocal ? undefined : "UTC",
  });
}

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}


export function getDueInfo(returnDate, now) {
  const days = Math.round((startOfDay(returnDate) - startOfDay(now)) / DAY_MS);

  if (days < 0) {
    const late = Math.abs(days);
    return { label: `Overdue by ${late} ${late === 1 ? "day" : "days"}`, tone: "late" };
  }
  if (days === 0) return { label: "Due today", tone: "soon" };
  if (days <= 2) return { label: `${days} ${days === 1 ? "day" : "days"} left`, tone: "soon" };
  return { label: `${days} days left`, tone: "ok" };
}