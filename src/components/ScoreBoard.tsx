import { useGameStore } from "@/store/useGameStore";

export default function ScoreBoard() {
  const { score, total } = useGameStore();
  const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);

  return (
    <div className="flex items-center justify-center gap-8 text-ink">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-ink/60 mb-1">答对</div>
        <div className="font-display text-3xl font-bold text-gold">{score}</div>
      </div>
      <div className="w-px h-10 bg-gold/30" />
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-ink/60 mb-1">总题数</div>
        <div className="font-display text-3xl font-bold">{total}</div>
      </div>
      <div className="w-px h-10 bg-gold/30" />
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-ink/60 mb-1">正确率</div>
        <div className="font-display text-3xl font-bold">{accuracy}%</div>
      </div>
    </div>
  );
}
