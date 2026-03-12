"use client";

import { motion } from "framer-motion";

export function LoadingQuiz() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-6xl mb-6 inline-block"
      >
        🌐
      </motion.div>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Preparando as palavras...
      </h2>
      <p className="text-muted">
        Nossa IA está gerando o quiz perfeito para você
      </p>
      <div className="mt-8 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center py-20">
      <div className="text-6xl mb-6">😕</div>
      <h2 className="text-xl font-bold text-danger mb-2">
        Ops, algo deu errado
      </h2>
      <p className="text-muted mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="py-3 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  );
}
