"use client";

import { useEffect, useState } from "react";
import { loadPlayerData } from "@/lib/storage";
import { getPlayerLevel, getXpProgress, getNextLevel } from "@/lib/gamification";

export function PlayerStats() {
  const [mounted, setMounted] = useState(false);
  const data = mounted ? loadPlayerData() : null;

  useEffect(() => setMounted(true), []);

  if (!mounted || !data) {
    return (
      <div className="bg-card rounded-2xl p-5 border border-primary/10 animate-pulse">
        <div className="h-20" />
      </div>
    );
  }

  const level = getPlayerLevel(data.totalXp);
  const next = getNextLevel(data.totalXp);
  const progress = getXpProgress(data.totalXp);

  return (
    <div className="bg-card rounded-2xl p-5 border border-primary/10 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{level.emoji}</span>
          <div>
            <p className="font-bold text-sm" style={{ color: level.color }}>
              {level.name}
            </p>
            <p className="text-xs text-muted">{data.totalXp} XP total</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Partidas jogadas</p>
          <p className="font-bold text-lg text-foreground">{data.gamesPlayed}</p>
        </div>
      </div>
      {next && (
        <div>
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>{level.name}</span>
            <span>{next.name} ({next.minXp} XP)</span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${level.color}, ${next.color})`,
              }}
            />
          </div>
        </div>
      )}
      {!next && (
        <p className="text-xs text-center text-accent font-medium">
          🎉 Nível máximo atingido!
        </p>
      )}
    </div>
  );
}
