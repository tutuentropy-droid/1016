import { useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { MapPin, Clock, Palette, Target } from "lucide-react";

const ERA_RANGES = [
  { label: "文艺复兴", start: 1400, end: 1600, color: "bg-terracotta" },
  { label: "巴洛克", start: 1600, end: 1750, color: "bg-sepia" },
  { label: "浪漫主义", start: 1750, end: 1850, color: "bg-gold" },
  { label: "印象派", start: 1850, end: 1900, color: "bg-gold-light" },
  { label: "现代艺术", start: 1900, end: 1980, color: "bg-ink" },
];

export default function InvestigationTimeline() {
  const { currentPainting, unlockedClueIndices, totalAnswered, correctCount } = useGameStore();

  const progress = useMemo(() => {
    if (!currentPainting) return 0;
    const total = currentPainting.clues.length;
    return total === 0 ? 0 : (unlockedClueIndices.length / total) * 100;
  }, [currentPainting, unlockedClueIndices]);

  const accuracy = totalAnswered === 0 ? 0 : Math.round((correctCount / totalAnswered) * 100);

  const yearMatch = currentPainting?.year.match(/\d{4}/);
  const paintingYear = yearMatch ? parseInt(yearMatch[0]) : null;

  const activeEra = useMemo(() => {
    if (!paintingYear) return null;
    return ERA_RANGES.find((e) => paintingYear >= e.start && paintingYear <= e.end);
  }, [paintingYear]);

  const timelineProgress = useMemo(() => {
    if (!paintingYear) return 0;
    const min = 1400;
    const max = 1980;
    return Math.min(100, Math.max(0, ((paintingYear - min) / (max - min)) * 100));
  }, [paintingYear]);

  if (!currentPainting) return null;

  return (
    <div className="file-card overflow-hidden animate-fadeInUp" style={{ animationDelay: "400ms" }}>
      <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <Target size={16} className="text-gold" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-ink tracking-wide">
              调查进度
            </div>
            <div className="text-[10px] text-ink/50 uppercase tracking-widest font-serif">
              Investigation Progress
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-bold text-gold tabular-nums">
            {accuracy}%
          </div>
          <div className="text-[10px] text-ink/40 font-serif">破案率</div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-ink/50 font-serif uppercase tracking-wider">
              <Clock size={10} className="text-gold" />
              时间轴定位
            </div>
            {activeEra && (
              <span className={`text-[10px] font-serif text-white px-2 py-0.5 rounded-sm ${activeEra.color}`}>
                {activeEra.label}
              </span>
            )}
          </div>
          <div className="relative h-3 bg-ink/5 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              {ERA_RANGES.map((era, i) => (
                <div
                  key={era.label}
                  className="h-full border-r border-white/50"
                  style={{
                    width: `${((era.end - era.start) / (1980 - 1400)) * 100}%`,
                    background: `linear-gradient(180deg, ${
                      i % 2 === 0 ? "rgba(62,44,32,0.03)" : "rgba(184,134,11,0.03)"
                    }, rgba(62,44,32,0.06))`,
                  }}
                />
              ))}
            </div>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gold shadow-[0_0_8px_rgba(212,160,23,0.8)]"
              style={{ left: `${timelineProgress}%` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold timeline-node-active animate-markerPulse" />
            </div>
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-ink/40 font-serif tabular-nums">
            <span>1400</span>
            <span>1600</span>
            <span>1800</span>
            <span>1980</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-ink/50 font-serif uppercase tracking-wider">
              <MapPin size={10} className="text-terracotta" />
              地理范围
            </div>
            <span className="text-[10px] font-serif text-ink/60">{currentPainting.region}</span>
          </div>
          <div className="h-8 bg-ink/5 rounded-sm overflow-hidden relative flex items-center px-3">
            <div className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(90deg, rgba(160,82,45,0.1) 0%, rgba(184,134,11,0.15) 50%, rgba(160,82,45,0.1) 100%)",
              }}
            />
            <div className="relative w-full flex items-center justify-between text-[9px] font-serif text-ink/60">
              <span>🇪🇸 西班牙</span>
              <span>🇮🇹 意大利</span>
              <span>🇫🇷 法国</span>
              <span>🇳🇱 荷兰</span>
              <span>🇳🇴 北欧</span>
              <span>🇦🇹 奥地利</span>
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-terracotta border-2 border-white shadow-md animate-markerPulse"
              style={{
                left: `calc(${(
                  currentPainting.region.includes("法国") ? 45 :
                  currentPainting.region.includes("意大利") ? 25 :
                  currentPainting.region.includes("荷兰") ? 65 :
                  currentPainting.region.includes("西班牙") ? 8 :
                  currentPainting.region.includes("挪威") ? 82 :
                  currentPainting.region.includes("奥地利") ? 92 : 50
                )}% - 8px)`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-ink/50 font-serif uppercase tracking-wider">
              <Palette size={10} className="text-ink" />
              风格锁定
            </div>
            <span className="text-[10px] font-serif text-gold font-semibold">
              {unlockedClueIndices.length} / {currentPainting.clues.length} 线索
            </span>
          </div>
          <div className="relative h-2.5 bg-ink/5 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/70 via-gold to-gold-light rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-[timelineProgress_2s_ease-in-out_infinite]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {currentPainting.movement.split(/[\/、]/).map((m, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-serif text-ink/70 bg-ink/5 border border-ink/10 rounded-sm"
              >
                {m.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
