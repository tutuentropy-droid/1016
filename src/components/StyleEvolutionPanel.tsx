import { useMemo, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { getPeriodById, artistInfos, type ArtistPeriod, type Painting } from "@/data/paintings";
import {
  Palette,
  Brush,
  LayoutGrid,
  Image,
  Heart,
  ArrowRight,
  Check,
  X,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Info,
  Award,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

export default function StyleEvolutionPanel() {
  const {
    evolutionArtist,
    evolutionPeriods,
    evolutionPaintings,
    evolutionAssignments,
    evolutionSubmitted,
    evolutionCorrectCount,
    evolutionScoreDelta,
    assignPaintingToPeriod,
    submitEvolutionAnswer,
    nextEvolutionCase,
    streak,
    totalScore,
  } = useGameStore();

  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(null);
  const [expandedPeriodId, setExpandedPeriodId] = useState<string | null>(null);

  const artistInfo = useMemo(
    () => artistInfos.find((a) => a.name === evolutionArtist),
    [evolutionArtist]
  );

  const allAssigned = useMemo(() => {
    return evolutionAssignments.every((a) => a.selectedPeriodId !== null);
  }, [evolutionAssignments]);

  const getAssignment = (paintingId: string) => {
    return evolutionAssignments.find((a) => a.paintingId === paintingId);
  };

  const getPaintingsForPeriod = (periodId: string) => {
    return evolutionPaintings.filter((p) => {
      const assignment = getAssignment(p.id);
      return assignment?.selectedPeriodId === periodId;
    });
  };

  const getUnassignedPaintings = () => {
    return evolutionPaintings.filter((p) => {
      const assignment = getAssignment(p.id);
      return assignment?.selectedPeriodId === null;
    });
  };

  const handlePaintingClick = (painting: Painting) => {
    if (evolutionSubmitted) return;
    audioManager.play("paper_flip");
    setSelectedPaintingId(selectedPaintingId === painting.id ? null : painting.id);
  };

  const handlePeriodClick = (periodId: string) => {
    if (evolutionSubmitted) return;
    if (!selectedPaintingId) {
      audioManager.play("briefing_tick");
      setExpandedPeriodId(expandedPeriodId === periodId ? null : periodId);
      return;
    }
    audioManager.play("detail_focus");
    assignPaintingToPeriod(selectedPaintingId, periodId);
    setSelectedPaintingId(null);
  };

  const handleRemoveFromPeriod = (paintingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (evolutionSubmitted) return;
    audioManager.play("paper_flip");
    assignPaintingToPeriod(paintingId, null);
  };

  const handleSubmit = () => {
    if (!allAssigned || evolutionSubmitted) return;
    audioManager.play("stamp_hit");
    submitEvolutionAnswer();
  };

  const handleNext = () => {
    audioManager.play("next_question");
    audioManager.play("paper_flip");
    nextEvolutionCase();
  };

  if (!evolutionArtist || evolutionPeriods.length === 0) {
    return (
      <div className="file-card p-8 text-center animate-fadeInUp">
        <div className="text-ink/50 font-serif">正在加载风格进化案件...</div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/20 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <TrendingUp size={18} className="text-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                  风格进化追踪
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-serif bg-gold/20 text-gold rounded-sm uppercase tracking-wider">
                  Style Evolution
                </span>
              </div>
              <p className="text-xs text-ink/50 font-serif mt-0.5">
                根据色彩、笔触、构图、主题、情绪的演变，判断每幅作品所属的创作阶段
              </p>
            </div>
            {evolutionSubmitted && (
              <div className="text-right">
                <div className={`font-display text-2xl font-bold tabular-nums ${
                  evolutionCorrectCount === evolutionPaintings.length ? "text-green-700" : "text-gold"
                }`}>
                  +{evolutionScoreDelta}
                </div>
                <div className="text-[10px] text-ink/40 font-serif">本次得分</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-b border-ink/10 bg-ink/[0.02]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-terracotta/20 flex items-center justify-center border-2 border-gold/30">
              <span className="font-display text-2xl font-bold text-gold">
                {evolutionArtist.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {evolutionArtist}
                </h3>
                {artistInfo && (
                  <>
                    <span className="text-xs text-ink/50 font-serif">
                      {artistInfo.era}
                    </span>
                    <span className="text-xs text-ink/50 font-serif">
                      · {artistInfo.region}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-ink/60 font-serif mt-1">
                共 {evolutionPeriods.length} 个创作阶段 · {evolutionPaintings.length} 幅作品待鉴定
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {evolutionPeriods.map((period) => (
                  <span
                    key={period.id}
                    className="px-2 py-0.5 text-[10px] font-serif text-ink/70 bg-ink/5 border border-ink/10 rounded-sm"
                  >
                    {period.periodName}（{period.yearRange}）
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-ink/[0.03] border-b border-ink/10 flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif">
            进度：{evolutionAssignments.filter((a) => a.selectedPeriodId).length} / {evolutionPaintings.length} 已分配
          </div>
          {!evolutionSubmitted && selectedPaintingId && (
            <div className="flex items-center gap-1.5 text-xs text-gold font-serif">
              <Sparkles size={12} />
              请点击下方的创作阶段进行归类
            </div>
          )}
        </div>
      </div>

      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <Image size={14} className="text-terracotta" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            待归类作品
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Unassigned · 点击选择作品
          </span>
        </div>
        <div className="p-4">
          {getUnassignedPaintings().length === 0 ? (
            <div className="text-center py-6 text-sm text-ink/40 font-serif">
              {evolutionSubmitted ? "所有作品已展示结果" : "所有作品已归类，请提交答案"}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getUnassignedPaintings().map((painting, idx) => {
                const isSelected = selectedPaintingId === painting.id;
                return (
                  <div
                    key={painting.id}
                    onClick={() => handlePaintingClick(painting)}
                    className={`relative cursor-pointer group transition-all duration-200 ${
                      isSelected
                        ? "scale-[1.02] ring-2 ring-gold ring-offset-2 ring-offset-paper-texture shadow-lg"
                        : "hover:scale-[1.01] hover:shadow-md"
                    } animate-fadeInUp`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm opacity-80" />
                    <div className="relative p-1.5 bg-gradient-to-br from-white to-parchment rounded-sm overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                        <img
                          src={painting.imageUrl}
                          alt={painting.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center animate-glowPulse">
                              <Check size={18} className="text-white" strokeWidth={3} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5 px-1">
                        <div className="text-[10px] font-serif text-ink/70 truncate text-center">
                          {painting.title}
                        </div>
                        <div className="text-[9px] font-serif text-ink/40 text-center mt-0.5">
                          {painting.year}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-markerPulse" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {evolutionPeriods.map((period, pIdx) => (
          <PeriodCard
            key={period.id}
            period={period}
            paintings={getPaintingsForPeriod(period.id)}
            allPaintings={evolutionPaintings}
            isExpanded={expandedPeriodId === period.id}
            isHighlighted={selectedPaintingId !== null && !evolutionSubmitted}
            submitted={evolutionSubmitted}
            onToggle={() => handlePeriodClick(period.id)}
            onRemove={handleRemoveFromPeriod}
            index={pIdx}
          />
        ))}
      </div>

      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <Info size={14} className="text-ink/50" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            风格维度参考
          </h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          <StyleDim label="色彩" icon={<Palette size={12} />} />
          <StyleDim label="笔触" icon={<Brush size={12} />} />
          <StyleDim label="构图" icon={<LayoutGrid size={12} />} />
          <StyleDim label="主题" icon={<Image size={12} />} />
          <StyleDim label="情绪" icon={<Heart size={12} />} />
        </div>
      </div>

      {!evolutionSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAssigned}
          className={`w-full group relative py-4 px-6 rounded-sm font-serif text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp ${
            allAssigned
              ? "bg-gold hover:bg-gold-light text-white hover:-translate-y-0.5 hover:shadow-lg"
              : "bg-ink/10 text-ink/30 cursor-not-allowed"
          }`}
        >
          {allAssigned && (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 overflow-hidden pointer-events-none">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </span>
            </>
          )}
          <span className="relative flex items-center gap-2">
            {allAssigned ? (
              <>
                提交鉴定结果
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            ) : (
              `还有 ${evolutionPaintings.length - evolutionAssignments.filter((a) => a.selectedPeriodId).length} 幅作品未归类`
            )}
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`file-card p-5 ${
              evolutionCorrectCount === evolutionPaintings.length
                ? "animate-frameGlow"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                  evolutionCorrectCount === evolutionPaintings.length
                    ? "bg-green-500 animate-glowPulse"
                    : "bg-gold"
                }`}
              >
                {evolutionCorrectCount === evolutionPaintings.length ? (
                  <Check size={28} strokeWidth={3.5} className="text-white" />
                ) : (
                  <Award size={24} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-display text-xl font-bold text-ink">
                  {evolutionCorrectCount === evolutionPaintings.length
                    ? "完美追踪！全部正确"
                    : `鉴定完成 · 正确 ${evolutionCorrectCount} / ${evolutionPaintings.length}`}
                </div>
                <div className="text-sm text-ink/60 font-serif mt-0.5">
                  得分：
                  <span className="text-gold font-bold tabular-nums">
                    +{evolutionScoreDelta}
                  </span>
                  {evolutionCorrectCount === evolutionPaintings.length && (
                    <span className="ml-2 text-green-700">（全对奖励 +60）</span>
                  )}
                </div>
                {streak >= 2 && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-orange-700 font-serif">
                    <Sparkles size={12} />
                    连续完美追踪 {streak} 次
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full group relative py-4 px-6 rounded-sm bg-gold hover:bg-gold-light text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 overflow-hidden pointer-events-none">
              <span
                className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </span>
            <span className="relative flex items-center gap-2">
              追踪下一位艺术家
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>

          <div className="text-center text-xs text-ink/50 font-serif py-1">
            累计得分：
            <span className="font-bold text-gold tabular-nums">{totalScore}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function PeriodCard({
  period,
  paintings,
  allPaintings,
  isExpanded,
  isHighlighted,
  submitted,
  onToggle,
  onRemove,
  index,
}: {
  period: ArtistPeriod;
  paintings: Painting[];
  allPaintings: Painting[];
  isExpanded: boolean;
  isHighlighted: boolean;
  submitted: boolean;
  onToggle: () => void;
  onRemove: (paintingId: string, e: React.MouseEvent) => void;
  index: number;
}) {
  return (
    <div
      className={`file-card overflow-hidden animate-fadeInUp transition-all duration-200 ${
        isHighlighted ? "ring-1 ring-gold/50" : ""
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`px-5 py-3 border-b border-ink/10 flex items-center gap-3 cursor-pointer transition-colors ${
          !submitted && isHighlighted ? "bg-gold/5 hover:bg-gold/10" : "bg-ink/5 hover:bg-ink/[0.07]"
        }`}
        onClick={onToggle}
      >
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
          <span className="text-xs font-bold text-gold tabular-nums">{period.order}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-sm font-semibold text-ink">
              {period.periodName}
            </span>
            <span className="text-[10px] text-ink/50 font-serif">
              {period.periodNameEn}
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-serif text-ink/60 bg-ink/10 rounded-sm">
              {period.yearRange}
            </span>
            {submitted && (
              <span className="px-1.5 py-0.5 text-[9px] font-serif text-gold bg-gold/10 border border-gold/20 rounded-sm">
                {paintings.filter((p) => p.periodId === period.id).length} / {allPaintings.filter((p) => p.periodId === period.id).length} 正确
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-ink/40 font-serif">
            {paintings.length} 幅
          </span>
          {isExpanded ? (
            <ChevronUp size={16} className="text-ink/40" />
          ) : (
            <ChevronDown size={16} className="text-ink/40" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-b border-ink/5">
          <p className="text-xs text-ink/70 font-serif mb-3 leading-relaxed">
            {period.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            <StyleTag label="色彩" value={period.style.color} icon={<Palette size={10} />} />
            <StyleTag label="笔触" value={period.style.brushstroke} icon={<Brush size={10} />} />
            <StyleTag label="构图" value={period.style.composition} icon={<LayoutGrid size={10} />} />
            <StyleTag label="主题" value={period.style.theme} icon={<Image size={10} />} />
            <StyleTag label="情绪" value={period.style.emotion} icon={<Heart size={10} />} />
          </div>
        </div>
      )}

      {paintings.length > 0 && (
        <div className="p-3 bg-ink/[0.02] border-t border-ink/5">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {paintings.map((painting) => {
              const isCorrect = submitted && painting.periodId === period.id;
              return (
                <div
                  key={painting.id}
                  className={`relative group ${submitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm opacity-70" />
                  <div className="relative p-1 bg-gradient-to-br from-white to-parchment rounded-sm overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-ink/5">
                      <img
                        src={painting.imageUrl}
                        alt={painting.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                      {submitted && (
                        <div
                          className={`absolute inset-0 flex items-center justify-center ${
                            isCorrect ? "bg-green-500/30" : "bg-terracotta/30"
                          }`}
                        >
                          {isCorrect ? (
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center">
                              <X size={14} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      )}
                      {!submitted && (
                        <button
                          onClick={(e) => onRemove(painting.id, e)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-terracotta/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-terracotta"
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                    <div className="mt-1 px-0.5">
                      <div className="text-[9px] font-serif text-ink/70 truncate text-center">
                        {painting.title}
                      </div>
                      {submitted && !isCorrect && (
                        <div className="text-[8px] font-serif text-terracotta text-center mt-0.5">
                          应为：{getPeriodById(painting.periodId!)?.periodName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StyleDim({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 bg-ink/[0.03] rounded-sm border border-ink/5">
      <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold">
        {icon}
      </div>
      <span className="text-[10px] font-serif text-ink/60">{label}</span>
    </div>
  );
}

function StyleTag({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-2 bg-ink/[0.03] rounded-sm border border-ink/5">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-gold/80">{icon}</span>
        <span className="text-[10px] font-serif text-gold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-[11px] text-ink/70 font-serif leading-snug">{value}</p>
    </div>
  );
}
