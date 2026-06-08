import { useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import type { InvestigationClueType } from "@/store/useGameStore";
import {
  getPeriodById,
  artistInfos,
  type ArtistPeriod,
  type Painting,
} from "@/data/paintings";
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
  Info,
  Award,
  Eye,
  Search,
  MapPin,
  Calendar,
  BookOpen,
  Shuffle,
  AlertTriangle,
  Brain,
  Lightbulb,
  ChevronRight,
  Lock,
  Unlock,
  User,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

const CLUE_META: Record<
  InvestigationClueType,
  { label: string; en: string; icon: typeof MapPin; cost: number }
> = {
  creationLocation: {
    label: "创作地点",
    en: "Creation Location",
    icon: MapPin,
    cost: 15,
  },
  yearRangeHint: {
    label: "年代范围",
    en: "Year Range",
    icon: Calendar,
    cost: 15,
  },
  lifeEvent: {
    label: "人生事件",
    en: "Life Event",
    icon: BookOpen,
    cost: 20,
  },
  styleChangeHint: {
    label: "风格变化提示",
    en: "Style Hint",
    icon: Shuffle,
    cost: 25,
  },
};

export default function StyleEvolutionPanel() {
  const {
    evolutionArtist,
    evolutionPeriods,
    evolutionPaintings,
    evolutionAssignments,
    evolutionSubmitted,
    evolutionPhase,
    evolutionCurrentPaintingIndex,
    evolutionUnlockedClues,
    setEvolutionPhase,
    unlockInvestigationClue,
    submitSinglePaintingAnswer,
    advanceToNextPainting,
  } = useGameStore();

  const currentPainting = evolutionPaintings[evolutionCurrentPaintingIndex];
  const currentAssignment = evolutionAssignments.find(
    (a) => a.paintingId === currentPainting?.id
  );
  const currentUnlocked = evolutionUnlockedClues[currentPainting?.id] || [];
  const correctPeriod = currentPainting?.periodId
    ? getPeriodById(currentPainting.periodId)
    : null;
  const selectedPeriod = currentAssignment?.selectedPeriodId
    ? getPeriodById(currentAssignment.selectedPeriodId)
    : null;
  const isCorrect =
    currentAssignment?.selectedPeriodId === currentPainting?.periodId;

  const artistInfo = useMemo(
    () => artistInfos.find((a) => a.name === evolutionArtist),
    [evolutionArtist]
  );

  if (!evolutionArtist || evolutionPeriods.length === 0) {
    return (
      <div className="file-card p-8 text-center animate-fadeInUp">
        <div className="text-ink/50 font-serif">正在加载风格进化案件...</div>
      </div>
    );
  }

  if (evolutionSubmitted) {
    return <FinalSummary />;
  }

  const handleStartInvestigation = () => {
    audioManager.play("paper_flip");
    setEvolutionPhase("investigating");
  };

  const handleGoToSelect = () => {
    audioManager.play("paper_flip");
    setEvolutionPhase("selecting");
  };

  const handleUnlockClue = (clueType: InvestigationClueType) => {
    if (currentUnlocked.includes(clueType)) return;
    audioManager.play("clue_unlock");
    unlockInvestigationClue(currentPainting.id, clueType);
  };

  const handleSelectPeriod = (periodId: string) => {
    if (evolutionPhase !== "selecting") return;
    audioManager.play("detail_focus");
    submitSinglePaintingAnswer(currentPainting.id, periodId);
    if (periodId === currentPainting.periodId) {
      audioManager.play("answer_correct");
    } else {
      audioManager.play("answer_wrong");
    }
  };

  const handleNextPainting = () => {
    audioManager.play("next_question");
    advanceToNextPainting();
  };

  return (
    <div className="space-y-5 animate-fadeInUp">
      <HeaderCard />

      <ProgressIndicator
        total={evolutionPaintings.length}
        current={evolutionCurrentPaintingIndex}
        assignments={evolutionAssignments}
        paintings={evolutionPaintings}
      />

      {evolutionPhase === "observing" && currentPainting && (
        <ObservingStage
          painting={currentPainting}
          onStart={handleStartInvestigation}
        />
      )}

      {evolutionPhase === "investigating" && currentPainting && (
        <InvestigatingStage
          painting={currentPainting}
          unlocked={currentUnlocked}
          onUnlock={handleUnlockClue}
          onGoSelect={handleGoToSelect}
        />
      )}

      {evolutionPhase === "selecting" && currentPainting && (
        <SelectingStage
          painting={currentPainting}
          periods={evolutionPeriods}
          onSelect={handleSelectPeriod}
        />
      )}

      {evolutionPhase === "result" &&
        currentPainting &&
        correctPeriod && (
          <ResultStage
            painting={currentPainting}
            correctPeriod={correctPeriod}
            selectedPeriod={selectedPeriod}
            isCorrect={isCorrect}
            periods={evolutionPeriods}
            onNext={handleNextPainting}
            isLast={evolutionCurrentPaintingIndex === evolutionPaintings.length - 1}
          />
        )}
    </div>
  );

  function HeaderCard() {
    return (
      <div className="file-card overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/20 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <TrendingUp size={18} className="text-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                  风格演变调查
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-serif bg-gold/20 text-gold rounded-sm uppercase tracking-wider">
                  Style Evolution Investigation
                </span>
              </div>
              <p className="text-xs text-ink/50 font-serif mt-0.5">
                观察作品 → 解锁线索 → 锁定时期 → 追溯风格进化路径
              </p>
            </div>
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
                共 {evolutionPeriods.length} 个创作阶段 · 逐幅追溯风格演变
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ProgressIndicator({
  total,
  current,
  assignments,
  paintings,
}: {
  total: number;
  current: number;
  assignments: { paintingId: string; selectedPeriodId: string | null }[];
  paintings: Painting[];
}) {
  return (
    <div className="file-card px-5 py-3">
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest text-ink/40 font-serif">
          作品进度
        </span>
        <div className="flex-1 flex items-center gap-2">
          {paintings.map((p, idx) => {
            const done = assignments.find((a) => a.paintingId === p.id)
              ?.selectedPeriodId;
            const isCurrent = idx === current;
            return (
              <div
                key={p.id}
                className={`relative flex-1 h-2 rounded-full transition-all ${
                  done
                    ? p.periodId === done
                      ? "bg-green-500"
                      : "bg-terracotta"
                    : isCurrent
                    ? "bg-gold animate-glowPulse"
                    : "bg-ink/10"
                }`}
              >
                {isCurrent && !done && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-paper-texture animate-badgeFloat" />
                )}
              </div>
            );
          })}
        </div>
        <span className="font-display text-sm font-bold text-ink tabular-nums">
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}

function ObservingStage({
  painting,
  onStart,
}: {
  painting: Painting;
  onStart: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <Eye size={14} className="text-gold" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            第一步：细致观察
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Observe · 仔细审视作品的每一个细节
          </span>
        </div>
        <div className="p-5">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm opacity-80" />
            <div className="relative p-2 bg-gradient-to-br from-white to-parchment rounded-sm overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                <img
                  src={painting.imageUrl}
                  alt={painting.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="font-display text-lg font-semibold text-ink">
              《{painting.title}》
            </div>
            <div className="text-xs text-ink/50 font-serif mt-0.5">
              {painting.titleEn}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            <StyleDim label="色彩" icon={<Palette size={12} />} />
            <StyleDim label="笔触" icon={<Brush size={12} />} />
            <StyleDim label="构图" icon={<LayoutGrid size={12} />} />
            <StyleDim label="主题" icon={<Image size={12} />} />
            <StyleDim label="情绪" icon={<Heart size={12} />} />
          </div>
          <div className="mt-4 p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="flex items-start gap-2">
              <Lightbulb size={14} className="text-gold mt-0.5 flex-shrink-0" />
              <p className="text-xs text-ink/70 font-serif leading-relaxed">
                观察提示：注意色彩的冷暖倾向、笔触的方向与厚度、构图的特点，以及画面整体传达的情绪。这些都是判断创作时期的重要依据。
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onStart}
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
          <Search size={18} />
          开始调查 · 解锁线索
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </button>
    </div>
  );
}

function InvestigatingStage({
  painting,
  unlocked,
  onUnlock,
  onGoSelect,
}: {
  painting: Painting;
  unlocked: InvestigationClueType[];
  onUnlock: (type: InvestigationClueType) => void;
  onGoSelect: () => void;
}) {
  const clues = painting.investigationClues;
  if (!clues) return null;

  const clueTypes: InvestigationClueType[] = [
    "creationLocation",
    "yearRangeHint",
    "lifeEvent",
    "styleChangeHint",
  ];

  return (
    <div className="space-y-4">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <Search size={14} className="text-terracotta" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            第二步：调查取证
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Investigation · 每条线索消耗积分
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-ink/50 font-serif mb-1">
            <span>
              已解锁 <span className="font-bold text-gold">{unlocked.length}</span> /{" "}
              {clueTypes.length} 条线索
            </span>
            <span className="ml-auto text-terracotta">
              基础分 100，每条线索扣除对应分值
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clueTypes.map((type, idx) => {
              const meta = CLUE_META[type];
              const Icon = meta.icon;
              const isUnlocked = unlocked.includes(type);
              const content = clues[type];
              return (
                <div
                  key={type}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className={`relative animate-fadeInUp ${
                    isUnlocked ? "animate-paperUnfurl" : ""
                  }`}
                >
                  {isUnlocked ? (
                    <div className="relative rounded-sm border border-gold/20 bg-gold/[0.06] overflow-hidden shadow-inner-ink">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                      <div className="flex items-start gap-3 px-4 py-3 pl-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                          <Icon size={14} className="text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-widest font-serif text-gold">
                              {meta.label}
                            </span>
                            <span className="w-px h-3 bg-ink/20" />
                            <span className="text-[10px] text-ink/40 font-serif">
                              {meta.en}
                            </span>
                          </div>
                          <p className="text-sm text-ink/80 leading-relaxed font-serif">
                            {content}
                          </p>
                        </div>
                        <Unlock size={12} className="flex-shrink-0 mt-1.5 text-gold/70" />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onUnlock(type)}
                      className="w-full group flex items-start gap-3 px-4 py-3 rounded-sm border border-dashed border-ink/20 bg-white/40 hover:bg-gold/5 hover:border-gold/40 transition-all text-left"
                      onMouseEnter={() => audioManager.play("option_hover")}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                        <Lock
                          size={12}
                          className="text-ink/40 group-hover:text-gold transition-colors"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-0.5">
                          {meta.label} · 待解锁
                        </div>
                        <div className="text-sm text-ink/60 group-hover:text-ink font-serif transition-colors">
                          查看「{meta.label}」相关线索
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1 text-[10px] text-terracotta font-serif">
                        <ChevronRight
                          size={14}
                          className="text-ink/30 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                        />
                        <span>-{meta.cost}分</span>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="file-card p-4">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-ink/40 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-ink/60 font-serif leading-relaxed">
            线索已收集完毕。根据观察与线索，判断这幅作品属于艺术家的哪个创作时期？
          </p>
        </div>
      </div>

      <button
        onClick={onGoSelect}
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
          锁定创作时期
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </button>
    </div>
  );
}

function SelectingStage({
  painting,
  periods,
  onSelect,
}: {
  painting: Painting;
  periods: ArtistPeriod[];
  onSelect: (periodId: string) => void;
}) {
  const sortedPeriods = [...periods].sort((a, b) => a.order - b.order);
  return (
    <div className="space-y-4">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <User size={14} className="text-gold" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            第三步：锁定时期
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Select Period · 选择作品所属的创作阶段
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4 p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-14 h-14 overflow-hidden rounded-sm flex-shrink-0">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-ink">
                《{painting.title}》
              </div>
              <div className="text-xs text-ink/50 font-serif">
                请选择这幅作品的创作时期
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {sortedPeriods.map((period, idx) => (
              <button
                key={period.id}
                onClick={() => onSelect(period.id)}
                onMouseEnter={() => audioManager.play("option_hover")}
                className="w-full group relative overflow-hidden rounded-sm border border-ink/10 bg-white/60 hover:bg-gold/5 hover:border-gold/40 transition-all text-left p-4 animate-fadeInUp"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all">
                    <span className="text-xs font-bold text-gold group-hover:text-white tabular-nums transition-colors">
                      {period.order}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-sm font-semibold text-ink group-hover:text-gold transition-colors">
                        {period.periodName}
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-serif text-ink/60 bg-ink/10 rounded-sm">
                        {period.yearRange}
                      </span>
                    </div>
                    <p className="text-xs text-ink/60 font-serif mt-1 leading-relaxed line-clamp-2">
                      {period.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 mt-1 text-ink/30 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultStage({
  painting,
  correctPeriod,
  selectedPeriod,
  isCorrect,
  periods,
  onNext,
  isLast,
}: {
  painting: Painting;
  correctPeriod: ArtistPeriod;
  selectedPeriod: ArtistPeriod | null;
  isCorrect: boolean;
  periods: ArtistPeriod[];
  onNext: () => void;
  isLast: boolean;
}) {
  const explanation = painting.periodExplanation;
  const confusingPoints = correctPeriod.confusingPoints || [];

  return (
    <div className="space-y-4">
      <div
        className={`relative overflow-hidden file-card ${
          isCorrect ? "" : "animate-shake"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-20 ${
            isCorrect
              ? "bg-gradient-to-br from-green-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />
        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                isCorrect ? "bg-green-500" : "bg-terracotta"
              } ${isCorrect ? "animate-glowPulse" : ""}`}
            >
              {isCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <X size={28} strokeWidth={3.5} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-display text-2xl md:text-3xl font-bold ${
                  isCorrect ? "text-success-deep" : "text-error-deep"
                }`}
              >
                {isCorrect ? "时期锁定成功" : "时期误判"}
              </div>
              {!isCorrect && selectedPeriod && (
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-terracotta font-serif">
                  <AlertTriangle size={14} />
                  你的判断：{selectedPeriod.periodName}（
                  {selectedPeriod.yearRange}）
                </div>
              )}
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20 font-serif text-xs font-semibold">
                  正确时期：{correctPeriod.periodName}（{correctPeriod.yearRange}）
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StyleEvolutionPath
        periods={periods}
        correctPeriodId={correctPeriod.id}
        selectedPeriodId={selectedPeriod?.id}
      />

      {explanation && (
        <div className="relative file-card overflow-hidden animate-slideInLeft">
          <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(212,160,23,0.6) 0%, transparent 70%)",
            }}
          />
          <div className="px-5 py-3 border-b border-gold/20 bg-gold/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <Info size={14} className="text-gold" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-gold tracking-wide">
                为什么属于这个时期
              </div>
              <div className="text-[10px] text-gold/60 uppercase tracking-widest font-serif">
                Period Attribution
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {explanation.belongsReason}
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-gold font-serif mb-2">
                风格证据
              </div>
              {explanation.styleEvidence.map((evidence, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 animate-fadeInUp"
                  style={{ animationDelay: `${100 + i * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed font-serif">
                    {evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isCorrect && confusingPoints.length > 0 && (
        <div className="relative file-card overflow-hidden animate-slideInRight">
          <div className="px-5 py-3 border-b border-terracotta/20 bg-terracotta/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center">
              <Brain size={14} className="text-terracotta" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-terracotta tracking-wide">
                风格误导分析
              </div>
              <div className="text-[10px] text-terracotta/60 uppercase tracking-widest font-serif">
                Misleading Analysis
              </div>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-2.5">
            {confusingPoints.map((point, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{ animationDelay: `${200 + i * 120}ms` }}
              >
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center">
                    <AlertTriangle size={11} className="text-terracotta" />
                  </div>
                  <p className="text-sm font-semibold text-terracotta font-serif">
                    你可能被「{point.misleadingFeature}」误导了
                  </p>
                </div>
                <div className="ml-7.5 pl-2.5 border-l-2 border-terracotta/20">
                  <p className="text-sm text-ink/80 leading-relaxed font-serif">
                    {point.correctClarification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onNext}
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
          {isLast ? "查看完整鉴定报告" : "调查下一幅作品"}
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </button>
    </div>
  );
}

function StyleEvolutionPath({
  periods,
  correctPeriodId,
  selectedPeriodId,
}: {
  periods: ArtistPeriod[];
  correctPeriodId: string;
  selectedPeriodId?: string;
}) {
  const sorted = [...periods].sort((a, b) => a.order - b.order);
  const correctPeriod = periods.find((p) => p.id === correctPeriodId);
  if (!correctPeriod) return null;
  return (
    <div className="relative file-card overflow-hidden animate-fadeInUp">
      <div className="px-5 py-3 border-b border-gold/20 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
          <TrendingUp size={14} className="text-gold" />
        </div>
        <div>
          <div className="font-display text-base font-semibold text-gold tracking-wide">
            风格进化路径
          </div>
          <div className="text-[10px] text-gold/60 uppercase tracking-widest font-serif">
            Style Evolution Timeline
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="relative">
          <div className="absolute left-6 right-6 top-10 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30 rounded-full" />
          <div className="flex items-start justify-between relative">
            {sorted.map((period) => {
              const isCorrect = period.id === correctPeriodId;
              const isSelectedWrong =
                selectedPeriodId &&
                period.id === selectedPeriodId &&
                !isCorrect;
              return (
                <div
                  key={period.id}
                  className="flex flex-col items-center relative z-10"
                  style={{ width: `${100 / sorted.length}%` }}
                >
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCorrect
                        ? "bg-gold border-gold animate-glowPulse shadow-lg scale-110"
                        : isSelectedWrong
                        ? "bg-terracotta border-terracotta scale-105"
                        : "bg-white border-ink/20"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        isCorrect
                          ? "text-white"
                          : isSelectedWrong
                          ? "text-white"
                          : "text-ink/50"
                      }`}
                    >
                      {period.order}
                    </span>
                    {isCorrect && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-paper-texture flex items-center justify-center">
                        <Check size={12} strokeWidth={3} className="text-white" />
                      </div>
                    )}
                    {isSelectedWrong && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta border-2 border-paper-texture flex items-center justify-center">
                        <X size={12} strokeWidth={3} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center px-1">
                    <div
                      className={`text-[11px] font-semibold font-display ${
                        isCorrect
                          ? "text-gold"
                          : isSelectedWrong
                          ? "text-terracotta"
                          : "text-ink/70"
                      }`}
                    >
                      {period.periodName}
                    </div>
                    <div className="text-[9px] text-ink/40 font-serif mt-0.5">
                      {period.yearRange}
                    </div>
                    {isCorrect && (
                      <div className="mt-2 p-2 rounded-sm bg-gold/10 border border-gold/20 animate-fadeInScale">
                        <p className="text-[10px] text-gold/90 font-serif leading-snug">
                          {period.evolutionSummary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-ink/10">
          <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-2">
            关键演变节点
          </div>
          <div className="space-y-1.5">
            {correctPeriod.keyChanges.map((change, i) => (
              <div
                key={i}
                className="flex items-start gap-2 animate-fadeInUp"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Sparkles size={11} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-xs text-ink/70 font-serif leading-relaxed">
                  {change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalSummary() {
  const {
    evolutionArtist,
    evolutionPeriods,
    evolutionPaintings,
    evolutionAssignments,
    evolutionCorrectCount,
    evolutionScoreDelta,
    nextEvolutionCase,
    totalScore,
    streak,
  } = useGameStore();

  const allCorrect = evolutionCorrectCount === evolutionPaintings.length;

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/20 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <TrendingUp size={18} className="text-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                  风格进化追踪 · 结案
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-serif bg-gold/20 text-gold rounded-sm uppercase tracking-wider">
                  Case Closed
                </span>
              </div>
              <p className="text-xs text-ink/50 font-serif mt-0.5">
                {evolutionArtist} · 完整调查报告
              </p>
            </div>
            <div className="text-right">
              <div
                className={`font-display text-2xl font-bold tabular-nums ${
                  allCorrect ? "text-green-700" : "text-gold"
                }`}
              >
                +{evolutionScoreDelta}
              </div>
              <div className="text-[10px] text-ink/40 font-serif">本次得分</div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                allCorrect ? "bg-green-500 animate-glowPulse" : "bg-gold"
              }`}
            >
              {allCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <Award size={24} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-display text-xl font-bold text-ink">
                {allCorrect
                  ? "完美追踪！全部时期判定正确"
                  : `追踪完成 · 正确 ${evolutionCorrectCount} / ${evolutionPaintings.length}`}
              </div>
              <div className="text-sm text-ink/60 font-serif mt-0.5">
                得分：
                <span className="text-gold font-bold tabular-nums">
                  +{evolutionScoreDelta}
                </span>
                {allCorrect && (
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
      </div>

      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <TrendingUp size={14} className="text-gold" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            {evolutionArtist} · 完整风格进化路径
          </h3>
        </div>
        <div className="p-4">
          {[...evolutionPeriods]
            .sort((a, b) => a.order - b.order)
            .map((period, idx, arr) => {
              const correctInPeriod = evolutionPaintings.filter(
                (p) =>
                  p.periodId === period.id &&
                  evolutionAssignments.find((a) => a.paintingId === p.id)
                    ?.selectedPeriodId === period.id
              ).length;
              const totalInPeriod = evolutionPaintings.filter(
                (p) => p.periodId === period.id
              ).length;
              const hasWorks = totalInPeriod > 0;
              return (
                <div key={period.id} className="relative">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          hasWorks
                            ? correctInPeriod === totalInPeriod
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-gold border-gold text-white"
                            : "bg-white border-ink/20 text-ink/50"
                        }`}
                      >
                        <span className="text-xs font-bold tabular-nums">
                          {period.order}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-gold/50 to-gold/20 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-5">
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
                        {hasWorks && (
                          <span className="px-1.5 py-0.5 text-[9px] font-serif text-gold bg-gold/10 border border-gold/20 rounded-sm">
                            {correctInPeriod} / {totalInPeriod} 正确
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink/70 font-serif mt-1 leading-relaxed">
                        {period.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <StyleTagMini label="色彩" value={period.style.color} />
                        <StyleTagMini label="笔触" value={period.style.brushstroke} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <button
        onClick={() => {
          audioManager.play("next_question");
          audioManager.play("paper_flip");
          nextEvolutionCase();
        }}
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

function StyleTagMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink/[0.03] rounded-sm border border-ink/5 max-w-full">
      <span className="text-[9px] font-serif text-gold uppercase tracking-wider flex-shrink-0">
        {label}
      </span>
      <span className="text-[10px] text-ink/60 font-serif truncate">{value}</span>
    </div>
  );
}
