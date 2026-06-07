import { useGameStore } from "@/store/useGameStore";
import { Check, X, ArrowRight } from "lucide-react";

export default function FeedbackPanel() {
  const { isAnswered, selectedAnswer, currentPainting, score, total, nextQuestion } = useGameStore();
  if (!isAnswered || !currentPainting) return null;

  const isCorrect = selectedAnswer === currentPainting.artist;

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className={`flex items-center gap-3 p-5 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isCorrect ? "bg-green-500" : "bg-terracotta"}`}>
          {isCorrect ? <Check size={22} strokeWidth={3} /> : <X size={22} strokeWidth={3} />}
        </div>
        <div>
          <div className="font-display text-xl font-semibold" style={{ color: isCorrect ? "#15803d" : "#A0522D" }}>
            {isCorrect ? "回答正确！" : "回答错误"}
          </div>
          {!isCorrect && (
            <div className="text-sm text-ink/70 mt-0.5">
              正确答案是：<span className="font-semibold text-ink">{currentPainting.artist}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 p-6 bg-white rounded-lg border border-ink/10 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gold rounded-full" />
          <h3 className="font-display text-lg font-semibold text-ink">作品信息</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <div className="text-ink/50 uppercase tracking-wider text-xs mb-1">作者</div>
            <div className="font-serif text-ink font-medium">{currentPainting.artist}</div>
          </div>
          <div>
            <div className="text-ink/50 uppercase tracking-wider text-xs mb-1">年代</div>
            <div className="font-serif text-ink font-medium">{currentPainting.year}</div>
          </div>
          <div>
            <div className="text-ink/50 uppercase tracking-wider text-xs mb-1">画派</div>
            <div className="font-serif text-ink font-medium">{currentPainting.movement}</div>
          </div>
        </div>

        <p className="text-ink/80 leading-relaxed text-sm border-t border-ink/10 pt-4">
          {currentPainting.description}
        </p>
      </div>

      <button
        onClick={nextQuestion}
        className="mt-6 w-full py-4 px-6 rounded-lg bg-gold hover:bg-gold-light text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
      >
        下一题
        <ArrowRight size={20} strokeWidth={2.5} />
      </button>

      <div className="mt-4 text-center text-sm text-ink/50">
        当前得分：{score} / {total}
      </div>
    </div>
  );
}
