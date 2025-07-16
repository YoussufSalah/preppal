export function calculateStreaks(lastActiveDate, currentStreak, bestStreak) {
  const today = new Date().toDateString();
  const last = new Date(lastActiveDate).toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (today === last) {
    // Already updated today
    return { currentStreak, bestStreak };
  }

  if (new Date(last).toDateString() === yesterday.toDateString()) {
    // Continued streak
    const newCurrent = currentStreak + 1;
    return {
      currentStreak: newCurrent,
      bestStreak: Math.max(bestStreak, newCurrent),
    };
  } else {
    // Missed a day — reset
    return {
      currentStreak: 1,
      bestStreak: Math.max(bestStreak, 1),
    };
  }
}
