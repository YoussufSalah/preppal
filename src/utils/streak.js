export function trackStreak() {
  const today = new Date().toDateString();
  const lastActive = localStorage.getItem("lastActiveDate");
  const storedCurrent = parseInt(localStorage.getItem("currentStreak") || "0");
  const storedBest = parseInt(localStorage.getItem("bestStreak") || "0");

  let current = storedCurrent;
  let best = storedBest;
  let updated = false;

  if (lastActive === today) {
    return { current, best, updated: false };
  }

  const wasYesterday = isYesterday(new Date(lastActive));
  if (wasYesterday) {
    current += 1;
  } else {
    current = 1;
  }

  best = Math.max(best, current);

  localStorage.setItem("lastActiveDate", today);
  localStorage.setItem("currentStreak", current);
  localStorage.setItem("bestStreak", best);
  updated = true;

  return { current, best, updated };
}

function isYesterday(date) {
  if (!date || isNaN(date)) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}
