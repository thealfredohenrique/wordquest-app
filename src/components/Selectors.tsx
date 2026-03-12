"use client";

import { Theme, Difficulty } from "@/lib/api";

interface ThemeSelectorProps {
  selected: Theme | null;
  onSelect: (theme: Theme) => void;
}

const THEMES: { value: Theme; label: string; emoji: string }[] = [
  { value: "travel", label: "Viagem", emoji: "✈️" },
  { value: "business", label: "Negócios", emoji: "💼" },
  { value: "technology", label: "Tecnologia", emoji: "💻" },
  { value: "food", label: "Comida", emoji: "🍕" },
  { value: "sports", label: "Esportes", emoji: "⚽" },
  { value: "daily", label: "Cotidiano", emoji: "🏠" },
  { value: "entertainment", label: "Entretenimento", emoji: "🎬" },
  { value: "health", label: "Saúde", emoji: "🏥" },
];

export function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">
        Escolha um tema
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onSelect(theme.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${selected === theme.value
                ? "border-primary bg-primary/10 shadow-md"
                : "border-primary/10 bg-card hover:border-primary/30"
              }`}
          >
            <span className="text-3xl">{theme.emoji}</span>
            <span className="text-sm font-medium text-foreground">
              {theme.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (d: Difficulty) => void;
}

const DIFFICULTIES: { value: Difficulty; label: string; description: string; color: string }[] = [
  { value: "easy", label: "Fácil", description: "Palavras do dia a dia", color: "#10b981" },
  { value: "medium", label: "Médio", description: "Vocabulário intermediário", color: "#f59e0b" },
  { value: "hard", label: "Difícil", description: "Vocabulário avançado", color: "#ef4444" },
];

export function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">
        Dificuldade
      </h2>
      <div className="flex gap-3">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            onClick={() => onSelect(d.value)}
            className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${selected === d.value
                ? "shadow-md"
                : "border-primary/10 bg-card hover:border-primary/30"
              }`}
            style={{
              borderColor: selected === d.value ? d.color : undefined,
              backgroundColor: selected === d.value ? `${d.color}15` : undefined,
            }}
          >
            <p className="font-bold text-sm" style={{ color: d.color }}>
              {d.label}
            </p>
            <p className="text-xs text-muted mt-0.5">{d.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
