const XP_PER_CORRECT = 10;
const STREAK_BONUS = 5;
const STREAK_THRESHOLD = 3;

export interface RoundResult {
  correct: boolean;
  word: string;
  selectedAnswer: string;
  correctAnswer: string;
}

export interface GameScore {
  totalCorrect: number;
  totalQuestions: number;
  xpEarned: number;
  maxStreak: number;
  results: RoundResult[];
}

export function calculateXp(
  correctCount: number,
  maxStreak: number
): number {
  const baseXp = correctCount * XP_PER_CORRECT;
  const streakBonuses = Math.floor(maxStreak / STREAK_THRESHOLD) * STREAK_BONUS;
  return baseXp + streakBonuses;
}

export interface PlayerLevel {
  name: string;
  minXp: number;
  color: string;
  emoji: string;
}

const LEVELS: PlayerLevel[] = [
  { name: "Iniciante", minXp: 0, color: "#8B5CF6", emoji: "🌱" },
  { name: "Intermediário", minXp: 200, color: "#3B82F6", emoji: "📚" },
  { name: "Avançado", minXp: 500, color: "#F59E0B", emoji: "🚀" },
  { name: "Expert", minXp: 1000, color: "#EF4444", emoji: "👑" },
];

export function getPlayerLevel(totalXp: number): PlayerLevel {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXp >= level.minXp) {
      current = level;
    }
  }
  return current;
}

export function getNextLevel(totalXp: number): PlayerLevel | null {
  for (const level of LEVELS) {
    if (totalXp < level.minXp) {
      return level;
    }
  }
  return null;
}

export function getXpProgress(totalXp: number): number {
  const current = getPlayerLevel(totalXp);
  const next = getNextLevel(totalXp);
  if (!next) return 100;
  const range = next.minXp - current.minXp;
  const progress = totalXp - current.minXp;
  return Math.round((progress / range) * 100);
}
