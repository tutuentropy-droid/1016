import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/utils/audioManager";
import {
  Search,
  FileText,
  Palette,
  KeyRound,
  Lock,
  Unlock,
  ChevronRight,
} from "lucide-react";

const typeMeta: Record<string, { icon: typeof FileText; label: string; color: string; dot: string }> = {
  basic: { icon: FileText, label: "基础线索", color: "text-ink", dot: "bg-gold" },
  style: { icon: Palette, label: "风格线索", color: "text-ink", dot: "bg-terracotta" },
  key: { icon: KeyRound, label: "关键线索", color: "text-ink", dot: "bg-ink" },
};

export default function CluePanel() {
  const { currentPainting, unlockedClueIndices, unlockClue, isAnswered } = useGameStore();

  if (!currentPainting) return null;
  const clues = currentPainting.clues;
  const total = clues.length;
  const unlocked = unlockedClueIndices.length;
  const remaining = total - unlocked;

  const handleUnlock = (idx: number) => {
    if (unlockedClueIndices.includes(idx)) return;
    unlockClue(idx);
    audioManager.play("clue_unlock");
    audioManager.play("paper_flip");
  };

  return (
    <div className="file-card overflow-hidden animate-fadeInUp" style={{ animationDelay: "380ms" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink/10 bg-ink/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <Search size={16} className="text-gold" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-ink tracking-wide">
              调查记录
            </div>
            <div className="text-[10px] text-ink/50 uppercase tracking-widest font-serif">
              Investigation Notes
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-ink/60">已发现</span>
            <span className="font-display text-xl font-bold text-gold tabular-nums">
              {unlocked}
            </span>
            <span className="text-xs text-ink/40 font-serif">/ {total}</span>
            {remaining > 0 && !isAnswered && (
              <span className="ml-2 text-[10px] text-terracotta font-serif">
                每条线索 -{20} 分
              </span>
            )}
          </div>
          <div className="w-24 h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-700 ease-out"
              style={{ width: `${total === 0 ? 0 : (unlocked / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2.5">
        {clues.map((clue, idx) => {
          const isUnlocked = unlockedClueIndices.includes(idx);
          const meta = typeMeta[clue.type];
          const Icon = meta.icon;
          const animationDelay = `${idx * 60}ms`;

          return (
            <div
              key={idx}
              style={{ animationDelay }}
              className={`relative ${isUnlocked ? "animate-paperUnfurl" : ""}`}
            >
              {isUnlocked || isAnswered ? (
                <div
                  className={`relative rounded-sm border border-ink/10 bg-parchment/50 overflow-hidden shadow-inner-ink ${
                    isAnswered && !isUnlocked ? "opacity-50" : ""
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${meta.dot}`} />
                  <div className="flex items-start gap-3 px-4 py-3 pl-5">
                    <div
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        clue.type === "basic"
                          ? "bg-gold/15"
                          : clue.type === "style"
                          ? "bg-terracotta/15"
                          : "bg-ink/15"
                      } ${clue.type === "key" ? "animate-glowPulse" : ""}`}
                    >
                      <Icon
                        size={13}
                        className={
                          clue.type === "basic"
                            ? "text-gold"
                            : clue.type === "style"
                            ? "text-terracotta"
                            : "text-ink"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] uppercase tracking-widest font-serif ${
                            clue.type === "basic"
                              ? "text-gold"
                              : clue.type === "style"
                              ? "text-terracotta"
                              : "text-ink/70"
                          }`}
                        >
                          {meta.label}
                        </span>
                        <span className="w-px h-3 bg-ink/20" />
                        <span className="text-[10px] text-ink/40 font-serif">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-ink mb-0.5 font-serif">
                        {clue.label}
                      </div>
                      <div className="text-sm text-ink/80 leading-relaxed font-serif">
                        {clue.content}
                      </div>
                    </div>
                    <Unlock
                      size={12}
                      className="flex-shrink-0 mt-1.5 text-gold/70"
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleUnlock(idx)}
                  disabled={isAnswered}
                  className="w-full group flex items-center gap-3 px-4 py-3 rounded-sm border border-dashed border-ink/20 bg-white/40 hover:bg-parchment/60 hover:border-gold/40 transition-all text-left"
                  onMouseEnter={() => audioManager.play("option_hover")}
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                    <Lock size={12} className="text-ink/40 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-0.5">
                      {meta.label} · 待解锁
                    </div>
                    <div className="text-sm text-ink/60 group-hover:text-ink font-serif transition-colors">
                      查看「{clue.label}」相关线索
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-ink/30 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                  />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
