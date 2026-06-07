import { useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { paintings } from "@/data/paintings";
import { Sparkles, Target, Gift, ChevronRight } from "lucide-react";

export default function DailyTheme() {
  const { dailyTheme, unlockedPaintingIds } = useGameStore();

  const themePaintings = useMemo(() => {
    if (!dailyTheme) return [];
    return paintings.filter((p) => {
      switch (dailyTheme.filterType) {
        case "movement":
          return p.movement.includes(dailyTheme.filterValue);
        case "artist":
          return p.artist === dailyTheme.filterValue;
        case "region":
          return p.region.includes(dailyTheme.filterValue);
        case "era": {
          const map: Record<string, [number, number]> = {
            "文艺复兴": [1400, 1600],
            "现代艺术": [1900, 1980],
          };
          const range = map[dailyTheme.filterValue];
          if (!range) return false;
          return p.decade >= range[0] && p.decade <= range[1];
        }
        default:
          return false;
      }
    });
  }, [dailyTheme]);

  const solvedToday = themePaintings.filter((p) => unlockedPaintingIds.includes(p.id)).length;
  const progress = themePaintings.length > 0 ? Math.round((solvedToday / themePaintings.length) * 100) : 0;

  if (!dailyTheme) return null;

  return (
    <div className="file-card overflow-hidden animate-fadeInUp" style={{ animationDelay: "320ms" }}>
      <div className="px-5 py-3 bg-gradient-to-r from-gold/15 via-gold/10 to-transparent border-b border-gold/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <Sparkles size={14} className="text-gold" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-ink tracking-wide flex items-center gap-1.5">
              今日特殊调查
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gold text-white text-[9px] rounded-sm font-bold">
                <Gift size={9} /> ×{dailyTheme.bonusMultiplier}
              </span>
            </div>
            <div className="text-[10px] text-ink/50 uppercase tracking-widest font-serif">
              Daily Special Investigation
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="typewriter-font text-[10px] text-ink/40">
            {dailyTheme.date}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-sm bg-terracotta/15 flex items-center justify-center shrink-0">
            <Target size={18} className="text-terracotta" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-bold text-ink leading-tight">
              {dailyTheme.title}
            </h3>
            <p className="text-[11px] text-ink/60 font-serif mt-1 leading-relaxed">
              {dailyTheme.description}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-serif text-ink/50 uppercase tracking-wider">
              主题进度
            </span>
            <span className="text-[10px] font-bold text-gold tabular-nums">
              {solvedToday}/{themePaintings.length} 件作品
            </span>
          </div>
          <div className="relative h-2 bg-ink/5 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-terracotta via-gold to-gold-light rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {themePaintings.slice(0, 4).map((p) => {
            const unlocked = unlockedPaintingIds.includes(p.id);
            return (
              <div
                key={p.id}
                className={`aspect-square rounded-sm overflow-hidden border ${
                  unlocked ? "border-gold/30" : "border-ink/10"
                }`}
                title={unlocked ? p.title : "未解锁"}
              >
                {unlocked ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-ink/5 flex items-center justify-center">
                    <span className="text-[10px] text-ink/30 font-serif">???</span>
                  </div>
                )}
              </div>
            );
          })}
          {themePaintings.length > 4 && (
            <div className="aspect-square rounded-sm overflow-hidden border border-ink/10 bg-ink/5 flex items-center justify-center">
              <ChevronRight size={14} className="text-ink/30" />
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-ink/10 flex items-center justify-between">
          <div className="text-[10px] font-serif text-ink/50">
            <span className="text-gold font-semibold">奖金加成</span>：答对相关作品得分 ×{dailyTheme.bonusMultiplier}
          </div>
        </div>
      </div>
    </div>
  );
}
