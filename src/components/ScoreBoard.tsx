import { useGameStore, getDetectiveRank } from "@/store/useGameStore";
import { Flame, Trophy, Target, Medal } from "lucide-react";

export default function ScoreBoard() {
  const { totalScore, correctCount, totalAnswered, streak, bestStreak, lastScoreDelta } =
    useGameStore();

  const accuracy = totalAnswered === 0 ? 0 : Math.round((correctCount / totalAnswered) * 100);
  const rank = getDetectiveRank(totalScore);
  const multiplier = streak >= 5 ? 1.5 : streak >= 3 ? 1.2 : 1.0;

  return (
    <div className="paper-card rounded-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-file-card border-2 border-gold/40 flex items-center justify-center animate-badgeFloat">
              <span className="text-2xl">{rank.badge}</span>
              {rank.level >= 3 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {rank.level}
                </div>
              )}
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink leading-tight">
                {rank.title}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif">
                Art Detective Rank
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="font-display text-4xl font-bold text-gold tabular-nums tracking-tight">
                {totalScore}
              </span>
              <span className="text-xs text-ink/40 font-serif mb-1">pts</span>
            </div>
            {lastScoreDelta !== 0 && (
              <div
                className={`text-xs font-bold font-display tabular-nums animate-scorePop ${
                  lastScoreDelta > 0 ? "text-green-700" : "text-terracotta"
                }`}
                key={lastScoreDelta}
              >
                {lastScoreDelta > 0 ? "+" : ""}
                {lastScoreDelta}
              </div>
            )}
          </div>
        </div>

        <div className="divider-line my-4" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex flex-col items-center py-2">
            <Target size={16} className="text-gold/80 mb-1" />
            <div className="font-display text-2xl font-bold text-ink tabular-nums">
              {correctCount}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50 font-serif">
              答对
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <Medal size={16} className="text-ink/50 mb-1" />
            <div className="font-display text-2xl font-bold text-ink tabular-nums">
              {totalAnswered}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50 font-serif">
              总题数
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <Trophy size={16} className="text-terracotta/80 mb-1" />
            <div className="font-display text-2xl font-bold text-ink tabular-nums">
              {accuracy}%
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50 font-serif">
              正确率
            </div>
          </div>
          <div className="flex flex-col items-center py-2 relative">
            <Flame
              size={16}
              className={`mb-1 ${streak >= 3 ? "text-orange-500" : "text-ink/50"}`}
            />
            <div
              className={`font-display text-2xl font-bold tabular-nums ${
                streak >= 5 ? "text-orange-600" : streak >= 3 ? "text-orange-500" : "text-ink"
              }`}
            >
              {streak}
              {bestStreak > 0 && (
                <span className="text-[10px] text-ink/40 ml-0.5 font-normal">/ {bestStreak}</span>
              )}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50 font-serif">
              连胜
            </div>
            {streak >= 3 && (
              <div className="absolute -top-1 right-2 px-1.5 py-0.5 rounded-sm bg-orange-500 text-white text-[9px] font-bold font-serif animate-badgeFloat">
                ×{multiplier}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
