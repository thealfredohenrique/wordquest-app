"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WordEntry } from "@/lib/api";
import type { RoundResult } from "@/lib/gamification";

interface QuizCardProps {
  word: WordEntry;
  questionNumber: number;
  totalQuestions: number;
  currentStreak: number;
  onAnswer: (result: RoundResult) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizCard({
  word,
  questionNumber,
  totalQuestions,
  currentStreak,
  onAnswer,
}: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(shuffleArray([word.word, ...word.alternatives]));
    setSelected(null);
  }, [word]);

  const handleSelect = useCallback(
    (option: string) => {
      if (selected) return; // already answered
      setSelected(option);
      const correct = option === word.word;

      // Delay before moving to next question
      setTimeout(() => {
        onAnswer({
          correct,
          word: word.word,
          selectedAnswer: option,
          correctAnswer: word.word,
        });
      }, 1200);
    },
    [selected, word, onAnswer]
  );

  const progress = ((questionNumber) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>
            Pergunta {questionNumber} de {totalQuestions}
          </span>
          {currentStreak > 0 && (
            <span className="text-accent font-bold">
              🔥 Streak: {currentStreak}
            </span>
          )}
        </div>
        <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word.word}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl p-6 border border-primary/10 shadow-lg"
        >
          {/* Description */}
          <div className="mb-6">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
              Qual é a palavra?
            </p>
            <p className="text-xl font-bold text-foreground leading-relaxed">
              {word.description}
            </p>
            <p className="text-sm text-muted mt-3 italic">
              💡 &ldquo;{word.useCase}&rdquo;
            </p>
          </div>

          {/* Alternatives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((option) => {
              const isCorrectAnswer = option === word.word;
              const isSelected = selected === option;
              const showResult = selected !== null;

              let btnClass =
                "w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 cursor-pointer";

              if (!showResult) {
                btnClass += " border-primary/15 bg-card hover:border-primary hover:bg-primary/5 hover:scale-[1.02]";
              } else if (isCorrectAnswer) {
                btnClass += " border-success bg-success/10 text-success";
              } else if (isSelected && !isCorrectAnswer) {
                btnClass += " border-danger bg-danger/10 text-danger";
              } else {
                btnClass += " border-primary/10 bg-card opacity-50";
              }

              return (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={showResult}
                  className={btnClass}
                  whileTap={!showResult ? { scale: 0.97 } : undefined}
                >
                  <span className="text-base">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <span className="ml-2">✓</span>
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <span className="ml-2">✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback message */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-xl text-center font-bold ${selected === word.word
                    ? "bg-success/10 text-success"
                    : "bg-danger/10 text-danger"
                  }`}
              >
                {selected === word.word
                  ? "🎉 Correto!"
                  : `❌ Resposta certa: ${word.word}`}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
