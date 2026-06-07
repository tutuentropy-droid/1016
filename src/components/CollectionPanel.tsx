import { useMemo, useState } from "react";
import { paintings, artistInfos, allCountries, allMovements } from "@/data/paintings";
import { useGameStore } from "@/store/useGameStore";
import { X, Filter, BookOpen, Palette, MapPin, Calendar, Sparkles, Lock } from "lucide-react";

const ERA_FILTERS = [
  { label: "全部年代", value: "all" },
  { label: "15-16世纪 (文艺复兴)", value: "1500-1599" },
  { label: "17世纪 (巴洛克)", value: "1600-1699" },
  { label: "18世纪 (浪漫主义)", value: "1700-1799" },
  { label: "19世纪 (印象派)", value: "1800-1899" },
  { label: "20世纪 (现代艺术)", value: "1900-1999" },
];

export default function CollectionPanel() {
  const { unlockedPaintingIds } = useGameStore();
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedMovement, setSelectedMovement] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPainting, setSelectedPainting] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const collectedPaintings = useMemo(() => {
    return paintings.filter((p) => unlockedPaintingIds.includes(p.id));
  }, [unlockedPaintingIds]);

  const filteredPaintings = useMemo(() => {
    return paintings.filter((p) => {
      if (selectedEra !== "all") {
        const [start, end] = selectedEra.split("-").map(Number);
        if (p.decade < start || p.decade > end) return false;
      }
      if (selectedMovement !== "all" && !p.movement.includes(selectedMovement)) return false;
      if (selectedCountry !== "all" && p.country !== selectedCountry) return false;
      return true;
    });
  }, [selectedEra, selectedMovement, selectedCountry]);

  const detailPainting = selectedPainting
    ? paintings.find((p) => p.id === selectedPainting)
    : null;
  const detailArtist = detailPainting
    ? artistInfos.find((a) => a.name === detailPainting.artist)
    : null;

  const activeFilters = [selectedEra, selectedMovement, selectedCountry].filter(
    (f) => f !== "all"
  ).length;

  const totalCount = paintings.length;
  const collectedCount = collectedPaintings.length;
  const progress = Math.round((collectedCount / totalCount) * 100);

  return (
    <div className="min-h-screen py-6 md:py-8 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
              <BookOpen className="text-gold" size={22} strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-wide">
              我的画廊
            </h1>
          </div>
          <p className="text-ink/60 font-serif text-sm tracking-wider">
            Private Collection · 个人艺术收藏档案
          </p>
          <div className="mt-5 w-32 h-px mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-gold animate-markerPulse" />
          </div>
        </div>

        <div className="file-card p-5 mb-6 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-sm font-semibold text-ink/80">收藏进度</span>
                <span className="text-gold font-bold tabular-nums text-lg font-display">
                  {collectedCount} / {totalCount}
                </span>
              </div>
              <div className="relative h-3 bg-ink/5 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/70 via-gold to-gold-light rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-ink/50 font-serif">
                {progress === 100 ? "🏆 恭喜！已解锁全部作品，成为真正的艺术宗师" :
                 progress >= 50 ? "⭐ 已解锁过半，继续探索艺术的奥秘" :
                 "🔍 答对题目即可解锁画作，建立个人专属艺术收藏"}
              </p>
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 bg-ink/5 hover:bg-ink/10 border border-ink/10 rounded-sm transition-colors text-sm font-serif text-ink/70 relative"
            >
              <Filter size={14} />
              筛选条件
              {activeFilters > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 pt-5 border-t border-ink/10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp">
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-ink/60 font-serif uppercase tracking-wider">
                  <Calendar size={11} className="text-gold" />
                  年代
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ERA_FILTERS.map((era) => (
                    <button
                      key={era.value}
                      onClick={() => setSelectedEra(era.value)}
                      className={`px-2.5 py-1 text-[11px] font-serif rounded-sm transition-all ${
                        selectedEra === era.value
                          ? "bg-gold text-white shadow-md"
                          : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                      }`}
                    >
                      {era.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-ink/60 font-serif uppercase tracking-wider">
                  <Palette size={11} className="text-terracotta" />
                  画派
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedMovement("all")}
                    className={`px-2.5 py-1 text-[11px] font-serif rounded-sm transition-all ${
                      selectedMovement === "all"
                        ? "bg-terracotta text-white shadow-md"
                        : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                    }`}
                  >
                    全部画派
                  </button>
                  {allMovements.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMovement(m)}
                      className={`px-2.5 py-1 text-[11px] font-serif rounded-sm transition-all ${
                        selectedMovement === m
                          ? "bg-terracotta text-white shadow-md"
                          : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-ink/60 font-serif uppercase tracking-wider">
                  <MapPin size={11} className="text-gold" />
                  国家
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCountry("all")}
                    className={`px-2.5 py-1 text-[11px] font-serif rounded-sm transition-all ${
                      selectedCountry === "all"
                        ? "bg-gold text-white shadow-md"
                        : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                    }`}
                  >
                    全部国家
                  </button>
                  {allCountries.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={`px-2.5 py-1 text-[11px] font-serif rounded-sm transition-all ${
                        selectedCountry === c
                          ? "bg-gold text-white shadow-md"
                          : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPaintings.map((p, idx) => {
            const isUnlocked = unlockedPaintingIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${150 + idx * 40}ms` }}
              >
                <button
                  onClick={() => isUnlocked && setSelectedPainting(p.id)}
                  disabled={!isUnlocked}
                  className={`w-full file-card overflow-hidden group ${
                    isUnlocked ? "cursor-pointer hover:-translate-y-1" : "cursor-not-allowed"
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-ink/5 overflow-hidden">
                    {isUnlocked ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ink/10 to-ink/20">
                        <Lock size={28} className="text-ink/30 mb-2" />
                        <span className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
                          未解锁
                        </span>
                      </div>
                    )}
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-t from-museum-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    {isUnlocked && (
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold/90 text-white text-[10px] font-serif rounded-sm">
                          <Sparkles size={10} /> 查看详情
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                          p.difficulty === "easy"
                            ? "bg-green-600/80 text-white"
                            : p.difficulty === "normal"
                            ? "bg-gold/80 text-white"
                            : "bg-terracotta/80 text-white"
                        }`}
                      >
                        {p.difficulty === "easy" ? "易" : p.difficulty === "normal" ? "中" : "难"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 text-left">
                    <h3 className="font-display text-sm font-semibold text-ink truncate">
                      {isUnlocked ? `《${p.title}》` : "??? 佚名作品"}
                    </h3>
                    <p className="text-[11px] text-ink/50 font-serif mt-0.5 truncate">
                      {isUnlocked ? p.artist : "调查中..."}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-serif px-1.5 py-0.5 bg-ink/5 text-ink/60 rounded-sm">
                        {isUnlocked ? p.year : "--"}
                      </span>
                      <span className="text-[9px] font-serif px-1.5 py-0.5 bg-gold/10 text-gold rounded-sm">
                        {isUnlocked ? p.country : "--"}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {filteredPaintings.length === 0 && (
          <div className="text-center py-16 file-card">
            <Sparkles size={36} className="text-gold/30 mx-auto mb-3" />
            <p className="text-ink/50 font-serif">暂无符合筛选条件的作品</p>
            <button
              onClick={() => {
                setSelectedEra("all");
                setSelectedMovement("all");
                setSelectedCountry("all");
              }}
              className="mt-3 px-4 py-1.5 text-sm font-serif text-gold hover:text-gold-light underline underline-offset-4"
            >
              清除所有筛选
            </button>
          </div>
        )}

        {detailPainting && (
          <div
            className="fixed inset-0 z-50 bg-museum-dark/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInScale"
            onClick={() => setSelectedPainting(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-canvas rounded-sm animate-cameraPanIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPainting(null)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X size={20} className="text-ink" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square md:aspect-auto md:min-h-full bg-ink/5 relative">
                  <img
                    src={detailPainting.imageUrl}
                    alt={detailPainting.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-serif px-2 py-0.5 bg-gold/15 text-gold rounded-sm uppercase tracking-wider">
                      {detailPainting.country}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 bg-ink/10 text-ink/70 rounded-sm">
                      {detailPainting.year}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink tracking-wide mt-2">
                    《{detailPainting.title}》
                  </h2>
                  <p className="text-sm text-ink/50 italic font-serif mt-1">{detailPainting.titleEn}</p>

                  <div className="mt-4 pt-4 border-t border-ink/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <Palette size={14} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider">艺术家</div>
                        <div className="font-display text-base text-ink font-semibold">{detailPainting.artist}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles size={14} className="text-terracotta mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider">艺术流派</div>
                        <div className="font-serif text-sm text-ink/80">{detailPainting.movement}</div>
                      </div>
                    </div>
                    {detailArtist && (
                      <div className="flex items-start gap-3">
                        <Calendar size={14} className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider">艺术家生卒</div>
                          <div className="font-serif text-sm text-ink/80">{detailArtist.era}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-ink/10">
                    <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider mb-2">作品介绍</div>
                    <p className="font-serif text-sm text-ink/80 leading-relaxed">{detailPainting.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-ink/10">
                    <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider mb-2">线索档案</div>
                    <div className="space-y-2">
                      {detailPainting.clues.map((clue, i) => (
                        <div key={i} className="flex gap-2">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm h-fit ${
                              clue.type === "key"
                                ? "bg-terracotta/15 text-terracotta"
                                : clue.type === "style"
                                ? "bg-gold/15 text-gold"
                                : "bg-ink/10 text-ink/60"
                            }`}
                          >
                            {clue.type === "key" ? "关键" : clue.type === "style" ? "风格" : "基础"}
                          </span>
                          <div>
                            <div className="text-[11px] font-serif text-ink/70">{clue.label}</div>
                            <div className="text-xs text-ink/80">{clue.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
