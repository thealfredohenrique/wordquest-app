"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchWords, type WordEntry, type Theme, type Difficulty } from "@/lib/api";
import { calculateXp, type RoundResult } from "@/lib/gamification";
import { addGameResult } from "@/lib/storage";
import { QuizCard } from "@/components/QuizCard";
import { LoadingQuiz, ErrorMessage } from "@/components/LoadingError";
import { ResultSummary } from "@/components/ResultSummary";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const theme = searchParams.get("theme") as Theme;
  const difficulty = (searchParams.get("difficulty") || "medium") as Difficulty;
  const count = parseInt(searchParams.get("count") || "10", 10);

  const [words, setWords] = useState<WordEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const loadWords = useCallback(async () => {
    if (!theme) {
      router.replace("/");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWords({ theme, difficulty, count });
      if (!data || data.length === 0) {
        throw new Error("Nenhuma palavra retornada. Tente novamente.");
      }
      setWords(data);
      setCurrentIndex(0);
      setResults([]);
      setStreak(0);
      setMaxStreak(0);
      setFinished(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [theme, difficulty, count, router]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const handleAnswer = useCallback(
    (result: RoundResult) => {
      const newResults = [...results, result];
      setResults(newResults);

      const newStreak = result.correct ? streak + 1 : 0;
      setStreak(newStreak);
      const newMaxStreak = Math.max(maxStreak, newStreak);
      setMaxStreak(newMaxStreak);

      if (currentIndex + 1 >= words.length) {
        // Quiz finished → save and show results
        const totalCorrect = newResults.filter((r) => r.correct).length;
        const xpEarned = calculateXp(totalCorrect, newMaxStreak);

        addGameResult(
          {
            date: new Date().toISOString(),
            theme,
            difficulty,
            score: totalCorrect,
            total: words.length,
            xpEarned,
          },
          newMaxStreak
        );

        setFinished(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [results, streak, maxStreak, currentIndex, words, theme, difficulty]
  );

  if (loading) return <LoadingQuiz />;
  if (error) return <ErrorMessage message={error} onRetry={loadWords} />;

  if (finished) {
    const totalCorrect = results.filter((r) => r.correct).length;
    const xpEarned = calculateXp(totalCorrect, maxStreak);

    return (
      <ResultSummary
        results={results}
        xpEarned={xpEarned}
        maxStreak={maxStreak}
        totalCorrect={totalCorrect}
        totalQuestions={words.length}
        onPlayAgain={loadWords}
        onGoHome={() => router.push("/")}
      />
    );
  }

  return (
    <QuizCard
      word={words[currentIndex]}
      questionNumber={currentIndex + 1}
      totalQuestions={words.length}
      currentStreak={streak}
      onAnswer={handleAnswer}
    />
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<LoadingQuiz />}>
      <QuizContent />
    </Suspense>
  );
}
