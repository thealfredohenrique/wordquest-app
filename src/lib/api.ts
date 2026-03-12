export interface WordEntry {
  word: string;
  description: string;
  useCase: string;
  alternatives: string[];
}

export type Theme =
  | "travel"
  | "business"
  | "technology"
  | "food"
  | "sports"
  | "daily"
  | "entertainment"
  | "health";

export type Difficulty = "easy" | "medium" | "hard";

export interface AskRequest {
  theme: Theme;
  difficulty: Difficulty;
  count: number;
}

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || "http://localhost:3001";

export async function fetchWords(params: AskRequest): Promise<WordEntry[]> {
  const res = await fetch(`${BFF_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}
