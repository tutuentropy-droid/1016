import { useGameStore } from "@/store/useGameStore";
import { Check, X } from "lucide-react";

interface OptionButtonProps {
  artist: string;
}

export default function OptionButton({ artist }: OptionButtonProps) {
  const { isAnswered, selectedAnswer, currentPainting, submitAnswer } = useGameStore();
  const correctAnswer = currentPainting?.artist;

  let variant: "default" | "correct" | "wrong" | "correctReveal" = "default";

  if (isAnswered) {
    if (artist === correctAnswer) {
      variant = "correctReveal";
    } else if (artist === selectedAnswer && artist !== correctAnswer) {
      variant = "wrong";
    }
  } else if (selectedAnswer === artist) {
    variant = "correct";
  }

  const base = "group relative w-full py-4 px-6 rounded-lg border-2 font-serif text-lg text-left transition-all duration-200";
  const styles: Record<string, string> = {
    default: "bg-white border-ink/15 text-ink hover:border-gold hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
    correct: "bg-green-50 border-green-500 text-green-800",
    wrong: "bg-red-50 border-terracotta text-terracotta",
    correctReveal: "bg-green-50 border-green-500 text-green-800",
  };

  const iconBg: Record<string, string> = {
    correctReveal: "bg-green-500",
    wrong: "bg-terracotta",
  };

  return (
    <button
      className={`${base} ${styles[variant]}`}
      onClick={() => !isAnswered && submitAnswer(artist)}
      disabled={isAnswered}
    >
      <div className="flex items-center justify-between">
        <span>{artist}</span>
        {(variant === "correctReveal" || variant === "wrong") && (
          <span className={`w-7 h-7 rounded-full ${iconBg[variant]} flex items-center justify-center text-white`}>
            {variant === "correctReveal" ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
          </span>
        )}
      </div>
    </button>
  );
}
