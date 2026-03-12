"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeSelector, DifficultySelector } from "@/components/Selectors";
import { PlayerStats } from "@/components/PlayerStats";
import type { Theme, Difficulty } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const handleStart = () => {
    if (!theme) return;
    const params = new URLSearchParams({
      theme,
      difficulty,
      count: "10",
    });
    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">
          WordQuest
        </h1>
        <p className="text-lg text-muted max-w-md mx-auto">
          Expanda seu vocabulário em inglês de forma divertida com quizzes
          gerados por inteligência artificial 🚀
        </p>
      </motion.div>

      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <PlayerStats />
      </motion.div>

      {/* Theme Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ThemeSelector selected={theme} onSelect={setTheme} />
      </motion.div>

      {/* Difficulty Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleStart}
          disabled={!theme}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 cursor-pointer ${theme
              ? "bg-primary text-white hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/25"
              : "bg-primary/20 text-primary/40 cursor-not-allowed"
            }`}
        >
          {theme ? "🎮 Começar Quiz" : "Selecione um tema para começar"}
        </button>
      </motion.div>
    </div>
  );
}
