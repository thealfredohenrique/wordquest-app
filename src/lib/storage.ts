const STORAGE_KEY = "wordquest_data";

export interface GameHistory {
  date: string;
  theme: string;
  difficulty: string;
  score: number;
  total: number;
  xpEarned: number;
}

export interface PlayerData {
  totalXp: number;
  bestStreak: number;
  gamesPlayed: number;
  history: GameHistory[];
}

const DEFAULT_DATA: PlayerData = {
  totalXp: 0,
  bestStreak: 0,
  gamesPlayed: 0,
  history: [],
};

export function loadPlayerData(): PlayerData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    return JSON.parse(raw) as PlayerData;
  } catch {
    return DEFAULT_DATA;
  }
}

export function savePlayerData(data: PlayerData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addGameResult(
  result: GameHistory,
  maxStreak: number
): PlayerData {
  const data = loadPlayerData();
  data.totalXp += result.xpEarned;
  data.gamesPlayed += 1;
  if (maxStreak > data.bestStreak) data.bestStreak = maxStreak;
  data.history = [result, ...data.history].slice(0, 50); // keep last 50
  savePlayerData(data);
  return data;
}
