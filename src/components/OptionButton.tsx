import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/utils/audioManager";
import { Check, X, AlertCircle } from "lucide-react";

interface OptionButtonProps {
  artist: string;
}

export default function OptionButton({ artist }: OptionButtonProps) {
  const {
    isAnswered,
    selectedAnswer,
    currentPainting,
    submitAnswer,
  } = useGameStore();

  const correctAnswer = currentPainting?.artist;

  let variant: "default" | "selected" | "correct" | "wrong" | "correctReveal" = "default";

  if (isAnswered) {
    if (artist === correctAnswer) {
      variant = "correctReveal";
    } else if (artist === selectedAnswer && artist !== correctAnswer) {
      variant = "wrong";
    }
  } else if (selectedAnswer === artist) {
    variant = "selected";
  }

  const handleClick = () => {
    if (isAnswered) return;
    audioManager.play("option_select");
    submitAnswer(artist);
  };

  const base =
    "group relative w-full py-3.5 md:py-4 px-5 rounded-sm border-2 font-serif text-left transition-all duration-200 overflow-hidden perspective-1200";
  const styles: Record<string, string> = {
    default:
      "bg-white/70 border-ink/15 text-ink hover:border-gold hover:bg-parchment/50 hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
    selected: "bg-gold/10 border-gold text-ink",
    correct: "bg-green-50 border-green-500 text-green-800",
    wrong: "bg-terracotta/10 border-terracotta text-error-deep animate-shake",
    correctReveal: "bg-green-50 border-green-500 text-success-deep animate-fadeInScale",
  };

  const iconBg: Record<string, string> = {
    correctReveal: "bg-green-500",
    wrong: "bg-terracotta",
  };

  return (
    <button
      className={`${base} ${styles[variant]}`}
      onClick={handleClick}
      disabled={isAnswered}
      onMouseEnter={() => !isAnswered && audioManager.play("option_hover")}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div
        className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212, 160, 23, 0.1), transparent)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold font-display transition-all duration-200 ${
              variant === "correctReveal"
                ? "bg-green-500 text-white border-green-500"
                : variant === "wrong"
                ? "bg-terracotta text-white border-terracotta"
                : variant === "selected"
                ? "bg-gold text-white border-gold"
                : "bg-white border-ink/20 text-ink/40 group-hover:border-gold group-hover:text-gold group-hover:scale-110"
            }`}
          >
            {variant === "correctReveal" && <Check size={14} strokeWidth={3} />}
            {variant === "wrong" && <X size={14} strokeWidth={3} />}
          </span>
          <span className="truncate text-base md:text-lg group-hover:tracking-wide transition-all duration-200">{artist}</span>
        </div>

        {(variant === "correctReveal" || variant === "wrong") && (
          <span
            className={`w-8 h-8 rounded-full ${iconBg[variant]} flex items-center justify-center text-white shadow-sm animate-fadeInScale`}
          >
            {variant === "correctReveal" ? (
              <Check size={18} strokeWidth={3} />
            ) : (
              <X size={18} strokeWidth={3} />
            )}
          </span>
        )}
      </div>
    </button>
  );
}

export function SubmitHint() {
  const { isAnswered, confidence } = useGameStore();

  if (isAnswered) return null;

  return (
    <div className="text-center mt-4 animate-fadeInUp">
      {!confidence ? (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs font-serif">
          <AlertCircle size={14} />
          请先选择信心等级，再点击作者提交答案
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-serif">
          <Check size={14} strokeWidth={3} />
          已设置信心等级，请点击上方作者选项提交
        </div>
      )}
    </div>
  );
}
