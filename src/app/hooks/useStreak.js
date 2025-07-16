import { useEffect } from 'react';
import { getCurrentUser } from '../utils/auth';
import { apiService } from '../utils/APIService';
import { calculateStreaks } from '../utils/streak';

export function useStreak() {
  useEffect(() => {
    async function updateStreakIfNeeded() {
      const lastActive = localStorage.getItem('lastActiveDate');
      const today = new Date().toDateString();

      if (lastActive === today) return; // Already updated today

      try {
        const user = await getCurrentUser();
        if (!user) return;

        const { current_streak, best_streak } = user;
        const { currentStreak, bestStreak } = calculateStreaks(
          lastActive,
          current_streak || 0,
          best_streak || 0
        );

        const token = apiService.getToken();

        await apiService.makeRequest('/users/me', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_streak: currentStreak,
            best_streak: bestStreak,
          }),
        });

        // Save today's date
        localStorage.setItem('lastActiveDate', today);
      } catch (err) {
        console.error('Failed to update streaks:', err);
      }
    }

    updateStreakIfNeeded();
  }, []);
}
