"use client";

import { motion } from "framer-motion";
import type { RoundResult } from "@/lib/gamification";

interface ResultSummaryProps {
  results: RoundResult[];
  xpEarned: number;
  maxStreak: number;
  totalCorrect: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function ResultSummary({
  results,
  xpEarned,
  maxStreak,
  totalCorrect,
  totalQuestions,
  onPlayAgain,
  onGoHome,
}: ResultSummaryProps) {
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return { text: "Perfeito! 🏆", color: "text-accent" };
    if (percentage >= 70) return { text: "Ótimo trabalho! 🎉", color: "text-success" };
    if (percentage >= 50) return { text: "Bom progresso! 💪", color: "text-primary" };
    return { text: "Continue praticando! 📚", color: "text-secondary" };
  };

  const msg = getMessage();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Score Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${msg.color}`}>
          {msg.text}
        </h1>
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{totalCorrect}/{totalQuestions}</p>
            <p className="text-sm text-muted">Acertos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-accent">+{xpEarned}</p>
            <p className="text-sm text-muted">XP ganho</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-secondary">🔥 {maxStreak}</p>
            <p className="text-sm text-muted">Melhor streak</p>
          </div>
        </div>
      </motion.div>

      {/* Word Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl border border-primary/10 shadow-sm overflow-hidden mb-6"
      >
        <h2 className="text-lg font-bold p-4 border-b border-primary/10">
          📝 Revisão das Palavras
        </h2>
        <div className="divide-y divide-primary/5">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-3 p-4"
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${r.correct ? "bg-success" : "bg-danger"
                  }`}
              >
                {r.correct ? "✓" : "✗"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{r.correctAnswer}</p>
                {!r.correct && (
                  <p className="text-sm text-danger">
                    Sua resposta: {r.selectedAnswer}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex gap-4"
      >
        <button
          onClick={onPlayAgain}
          className="flex-1 py-4 px-6 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          🔄 Jogar Novamente
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 py-4 px-6 rounded-xl border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          🏠 Menu Principal
        </button>
      </motion.div>
    </div>
  );
}
