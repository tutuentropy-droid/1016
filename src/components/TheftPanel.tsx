import { useMemo, useState } from "react";
import { useGameStore, type TheftPhase } from "@/store/useGameStore";
import type { TheftClue, TheftClueType, SuspectedVersion } from "@/data/paintings";
import { paintings } from "@/data/paintings";
import {
  Search,
  MapPin,
  Clock,
  FileText,
  Eye,
  Fingerprint,
  Gavel,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  ChevronRight,
  Info,
  Award,
  BookOpen,
  RefreshCw,
  Layers,
  Camera,
  Palette,
  Users,
  TrendingUp,
  Landmark,
  ShieldCheck,
  History,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

const CLUE_ICONS: Record<TheftClueType, React.ReactNode> = {
  witnessReport: <Users size={14} className="text-rose-800" />,
  auctionRecord: <Landmark size={14} className="text-rose-800" />,
  partialPhoto: <Camera size={14} className="text-rose-800" />,
  styleFeature: <Palette size={14} className="text-rose-800" />,
  mapTracking: <MapPin size={14} className="text-rose-800" />,
  timelineRecord: <Clock size={14} className="text-rose-800" />,
};

export default function TheftPanel() {
  const {
    theftCurrentCase,
    theftPhase,
    theftUnlockedClues,
    theftScoreDelta,
    theftCasesCompleted,
    setTheftPhase,
    unlockTheftClue,
    submitTheftVerdict,
    nextTheftCase,
    totalScore,
    streak,
  } = useGameStore();

  const [activeClueType, setActiveClueType] = useState<TheftClueType | null>(null);

  const currentPainting = useMemo(() => {
    if (!theftCurrentCase) return null;
    return paintings.find((p) => p.id === theftCurrentCase.stolenPaintingId) || null;
  }, [theftCurrentCase]);

  if (!theftCurrentCase || !currentPainting) {
    return (
      <div className="file-card p-8 text-center animate-fadeInUp">
        <div className="text-ink/50 font-serif">正在加载失窃名画追踪案件...</div>
      </div>
    );
  }

  const handleStartInvestigating = () => {
    audioManager.play("paper_flip");
    setTheftPhase("investigating");
  };

  const handleGoSelecting = () => {
    audioManager.play("detail_focus");
    setTheftPhase("selecting");
  };

  const handleUnlockClue = (clue: TheftClue) => {
    if (theftUnlockedClues.includes(clue.type)) {
      setActiveClueType(clue.type);
      return;
    }
    audioManager.play("clue_unlock");
    unlockTheftClue(clue.type);
    setActiveClueType(clue.type);
  };

  const handleSelectVersion = (versionId: string) => {
    audioManager.play("detail_focus");
    submitTheftVerdict(versionId);
    const selected = theftCurrentCase.suspectedVersions.find((v) => v.id === versionId);
    if (selected?.isAuthentic) {
      audioManager.play("answer_correct");
    } else {
      audioManager.play("answer_wrong");
    }
  };

  const handleNextCase = () => {
    audioManager.play("next_question");
    audioManager.play("paper_flip");
    setActiveClueType(null);
    nextTheftCase();
  };

  return (
    <div className="space-y-5 animate-fadeInUp">
      <HeaderCard completedCount={theftCasesCompleted} />

      {theftPhase === "briefing" && (
        <BriefingStage
          caseData={theftCurrentCase}
          painting={currentPainting}
          onStart={handleStartInvestigating}
        />
      )}

      {theftPhase === "investigating" && (
        <InvestigatingStage
          caseData={theftCurrentCase}
          painting={currentPainting}
          unlockedClues={theftUnlockedClues}
          activeClueType={activeClueType}
          onUnlockClue={handleUnlockClue}
          onSetActiveClue={setActiveClueType}
          onGoSelecting={handleGoSelecting}
        />
      )}

      {theftPhase === "selecting" && (
        <SelectingStage
          caseData={theftCurrentCase}
          painting={currentPainting}
          unlockedClues={theftUnlockedClues}
          onSelect={handleSelectVersion}
        />
      )}

      {theftPhase === "report" && (
        <ReportStage
          caseData={theftCurrentCase}
          painting={currentPainting}
          unlockedClues={theftUnlockedClues}
          scoreDelta={theftScoreDelta}
          totalScore={totalScore}
          streak={streak}
          onNext={handleNextCase}
        />
      )}
    </div>
  );
}

function HeaderCard({ completedCount }: { completedCount: number }) {
  return (
    <div className="file-card overflow-hidden">
      <div className="px-5 py-4 border-b border-rose-900/20 bg-gradient-to-r from-rose-900/10 via-rose-700/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-900/20 border border-rose-700/40 flex items-center justify-center">
            <Search size={18} className="text-rose-800" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                失窃名画追踪
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-serif bg-rose-900/20 text-rose-800 rounded-sm uppercase tracking-wider">
                Stolen Art Tracking
              </span>
            </div>
            <p className="text-xs text-ink/50 font-serif mt-0.5">
              像艺术侦探一样 · 目击记录 · 拍卖追踪 · 地图定位 · 锁定真迹
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-lg font-bold text-rose-800 tabular-nums">
              {completedCount}
            </div>
            <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
              Cases Closed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefingStage({
  caseData,
  painting,
  onStart,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  onStart: () => void;
}) {
  if (!caseData || !painting) return null;
  const difficultyLabel = { normal: "常规", hard: "困难", expert: "专家" };
  const difficultyColor = { normal: "text-emerald-700", hard: "text-amber-600", expert: "text-terracotta" };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <FileText size={14} className="text-rose-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            失窃档案 · Case File
          </h3>
          <span className={`text-[10px] ml-auto font-serif font-semibold ${difficultyColor[caseData.difficulty]}`}>
            难度：{difficultyLabel[caseData.difficulty]}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-24 h-24 overflow-hidden rounded-sm border-2 border-rose-900/30 flex-shrink-0 bg-museum-dark">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-lg font-bold text-ink mb-1">
                {caseData.caseTitle}
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
                Case #{caseData.id.toUpperCase()} · {caseData.caseTitleEn}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-900/10 text-rose-800 text-[10px] font-serif rounded-sm">
                <AlertTriangle size={11} />
                失窃艺术品：《{painting.title}》· {painting.artist}
              </div>
            </div>
          </div>

          <div className="p-4 bg-rose-900/[0.04] rounded-sm border border-rose-900/10 mb-4">
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {caseData.caseBriefing}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1">
                疑似版本
              </div>
              <div className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                <Layers size={15} className="text-rose-800" />
                {caseData.suspectedVersions.length} 件
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1">
                追踪地点
              </div>
              <div className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                <MapPin size={15} className="text-rose-800" />
                {caseData.mapLocations.length} 处
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1">
                线索数量
              </div>
              <div className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                <Search size={15} className="text-rose-800" />
                {caseData.clues.length} 条
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 p-3 bg-gold/[0.06] rounded-sm border border-gold/20">
            <TrendingUp size={14} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-gold font-serif mb-0.5">
                追踪守则
              </div>
              <p className="text-xs text-ink/60 font-serif leading-relaxed">
                基础分 150 分，每条线索消耗 12 分。解锁 0 条线索答对可额外获得 +60 分奖励，≤2 条线索答对额外 +30 分。答错扣 35% 分数。综合利用目击记录、拍卖信息、地图追踪、时间线、局部照片和风格特征，从多个疑似版本中锁定真正的名作。
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full group relative py-4 px-6 rounded-sm bg-rose-800 hover:bg-rose-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <Search size={18} />
          启动追踪调查 · 开始搜集线索
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

function MapTracking({ caseData }: { caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"] }) {
  if (!caseData) return null;
  const locations = [...caseData.mapLocations].sort((a, b) => a.order - b.order);

  return (
    <div className="file-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-ink/10 bg-rose-900/5 flex items-center gap-2">
        <MapPin size={13} className="text-rose-800" />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          地图追踪 · Map Tracking
        </h4>
        <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
          {locations.length} Locations
        </span>
      </div>
      <div className="p-4">
        <div className="relative h-48 bg-gradient-to-br from-rose-900/5 via-ink/[0.02] to-rose-900/[0.03] rounded-sm border border-ink/10 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(136,19,55,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(136,19,55,0.06) 0%, transparent 50%)",
          }} />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {locations.map((loc, i) => {
              if (i === 0) return null;
              const prev = locations[i - 1];
              const x1 = 10 + (prev.longitude - 4) * 8;
              const y1 = 80 - (prev.latitude - 50) * 6;
              const x2 = 10 + (loc.longitude - 4) * 8;
              const y2 = 80 - (loc.latitude - 50) * 6;
              return (
                <line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(136,19,55,0.4)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1"
                />
              );
            })}
          </svg>

          {locations.map((loc, i) => {
            const x = 10 + (loc.longitude - 4) * 8;
            const y = 80 - (loc.latitude - 50) * 6;
            return (
              <div
                key={loc.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-rose-800 border-2 border-white shadow-md flex items-center justify-center animate-markerPulse">
                    <span className="text-[8px] font-bold text-white tabular-nums">{loc.order}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 space-y-1.5">
          {locations.map((loc, i) => (
            <div
              key={loc.id}
              className="flex items-start gap-2 p-2 rounded-sm bg-rose-900/[0.03] border border-rose-900/10 animate-fadeInUp"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-5 h-5 rounded-full bg-rose-800/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-white tabular-nums">{loc.order}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-ink font-serif">{loc.name}</div>
                <div className="text-[10px] text-ink/50 font-serif leading-tight">{loc.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineProgress({ caseData }: { caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"] }) {
  if (!caseData) return null;
  const events = [...caseData.timelineEvents].sort((a, b) => {
    const locA = caseData.mapLocations.find((l) => l.id === a.locationId);
    const locB = caseData.mapLocations.find((l) => l.id === b.locationId);
    return (locA?.order ?? 0) - (locB?.order ?? 0);
  });

  return (
    <div className="file-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-ink/10 bg-rose-900/5 flex items-center gap-2">
        <Clock size={13} className="text-rose-800" />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          时间线推进 · Timeline
        </h4>
        <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
          {events.length} Events
        </span>
      </div>
      <div className="p-4">
        <div className="relative pl-1">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-rose-900/30" />
          <div className="space-y-3">
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="relative flex items-start gap-3 animate-fadeInUp"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative z-10 w-8 h-8 rounded-full bg-rose-800/90 border-2 border-white shadow flex items-center justify-center flex-shrink-0">
                  <History size={12} className="text-white" />
                </div>
                <div className="flex-1 p-2.5 bg-rose-900/[0.04] rounded-sm border border-rose-900/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-rose-800 font-serif tabular-nums">{ev.date}</span>
                    <span className="text-[10px] text-ink/40 font-serif">·</span>
                    <span className="text-xs font-semibold text-ink font-serif">{ev.title}</span>
                  </div>
                  <p className="text-[11px] text-ink/60 font-serif mt-0.5 leading-relaxed">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestigationCluesPanel({
  caseData,
  unlocked,
  activeClueType,
  onUnlock,
  onSetActive,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"];
  unlocked: TheftClueType[];
  activeClueType: TheftClueType | null;
  onUnlock: (clue: TheftClue) => void;
  onSetActive: (t: TheftClueType | null) => void;
}) {
  if (!caseData) return null;

  return (
    <div className="file-card overflow-hidden animate-fadeInUp">
      <div className="px-4 py-2.5 border-b border-ink/10 bg-rose-900/5 flex items-center gap-2">
        <Layers size={13} className="text-rose-800" />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          调查线索 · Evidence
        </h4>
        <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
          {unlocked.length} / {caseData.clues.length}
        </span>
      </div>
      <div className="p-3 space-y-2.5 max-h-[520px] overflow-y-auto scrollbar-thin">
        {caseData.clues.map((clue, idx) => {
          const isUnlocked = unlocked.includes(clue.type);
          const isActive = activeClueType === clue.type;
          return (
            <div
              key={clue.type}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="animate-fadeInUp"
            >
              {isUnlocked ? (
                <div
                  className={`relative rounded-sm border overflow-hidden shadow-inner-ink cursor-pointer transition-all ${
                    isActive
                      ? "border-rose-700/40 bg-rose-900/[0.08] animate-paperUnfurl"
                      : "border-rose-700/20 bg-rose-900/[0.04]"
                  }`}
                  onClick={() => {
                    onSetActive(isActive ? null : clue.type);
                  }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-800" />
                  <div className="flex items-start gap-3 px-4 py-3 pl-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-900/15 flex items-center justify-center">
                      {CLUE_ICONS[clue.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest font-serif text-rose-800">
                          {clue.label}
                        </span>
                        <span className="w-px h-3 bg-ink/20" />
                        <span className="text-[10px] text-ink/40 font-serif">
                          {clue.labelEn}
                        </span>
                      </div>
                      <p className="text-sm text-ink/80 leading-relaxed font-serif">
                        {clue.content}
                      </p>
                    </div>
                    <Unlock size={12} className="flex-shrink-0 mt-1.5 text-rose-800/70" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onUnlock(clue)}
                  onMouseEnter={() => audioManager.play("option_hover")}
                  className="w-full group flex items-start gap-3 px-4 py-3 rounded-sm border border-dashed border-ink/20 bg-white/40 hover:bg-rose-900/5 hover:border-rose-900/40 transition-all text-left"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-rose-900/15 transition-colors">
                    <Lock
                      size={12}
                      className="text-ink/40 group-hover:text-rose-800 transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-0.5">
                      {clue.label} · 待调查
                    </div>
                    <div className="text-sm text-ink/60 group-hover:text-ink font-serif transition-colors">
                      {clue.hintText}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 text-[10px] text-terracotta font-serif">
                    <ChevronRight
                      size={14}
                      className="text-ink/30 group-hover:text-rose-800 group-hover:translate-x-0.5 transition-all"
                    />
                    <span>-12分</span>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvestigatingStage({
  caseData,
  painting,
  unlockedClues,
  activeClueType,
  onUnlockClue,
  onSetActiveClue,
  onGoSelecting,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: TheftClueType[];
  activeClueType: TheftClueType | null;
  onUnlockClue: (clue: TheftClue) => void;
  onSetActiveClue: (t: TheftClueType | null) => void;
  onGoSelecting: () => void;
}) {
  if (!caseData || !painting) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-4">
          <div className="animate-fadeInUp">
            <StolenPaintingCard painting={painting} caseTitle={caseData.caseTitle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-fadeInUp" style={{ animationDelay: "50ms" }}>
              <MapTracking caseData={caseData} />
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: "80ms" }}>
              <TimelineProgress caseData={caseData} />
            </div>
          </div>

          <div className="file-card p-4 animate-fadeInUp">
            <div className="flex items-start gap-2.5">
              <Info size={14} className="text-ink/40 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-ink/60 font-serif leading-relaxed">
                  已收集 {unlockedClues.length} / {caseData.clues.length} 条线索。综合所有证据，准备从 {caseData.suspectedVersions.length} 个疑似版本中锁定真正的名作？
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onGoSelecting}
            className="w-full group relative py-4 px-6 rounded-sm bg-rose-800 hover:bg-rose-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 overflow-hidden pointer-events-none">
              <span
                className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)",
                }}
              />
            </span>
            <span className="relative flex items-center gap-2">
              <Gavel size={18} />
              查看疑似版本 · 锁定真迹
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>
        </div>

        <div className="space-y-4 self-start lg:sticky lg:top-6">
          <InvestigationCluesPanel
            caseData={caseData}
            unlocked={unlockedClues}
            activeClueType={activeClueType}
            onUnlock={onUnlockClue}
            onSetActive={onSetActiveClue}
          />

          <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp">
            <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
              <span className="text-rose-800">📋</span>
              <span>追踪守则</span>
            </div>
            <p>· 基础分 <span className="text-rose-800 font-bold">150 分</span>，每条线索扣除 <span className="text-terracotta font-semibold">12 分</span></p>
            <p>· 不解锁线索直接答对 +<span className="text-gold font-bold">60 分</span> 奖励</p>
            <p>· ≤2 条线索答对额外 +<span className="text-gold font-bold">30 分</span></p>
            <p>· 难度越高，分数倍率越大</p>
            <div className="pt-2 mt-2 border-t border-ink/10 flex items-center gap-2 text-[10px] text-ink/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-800 animate-markerPulse" />
              <span className="typewriter-font uppercase tracking-widest">Art Theft Unit · Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StolenPaintingCard({
  painting,
  caseTitle,
}: {
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  caseTitle: string;
}) {
  if (!painting) return null;
  return (
    <div className="relative group forensic-border overflow-hidden rounded-sm">
      <div className="absolute -inset-2 bg-gradient-to-br from-rose-900/50 via-rose-800/30 to-rose-900/50 rounded-sm opacity-70" />
      <div className="relative p-2 bg-gradient-to-br from-museum-dark to-museum-warm rounded-sm overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className="w-full h-full object-contain animate-textureZoom"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-rose-900/80 backdrop-blur-sm rounded-sm">
            <AlertTriangle size={11} className="text-rose-100" />
            <span className="text-[10px] text-rose-100 font-serif uppercase tracking-wider typewriter-font">
              STOLEN ARTWORK
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
            <Eye size={11} className="text-rose-200" />
            <span className="text-[10px] text-rose-100 font-serif uppercase tracking-wider">
              Evidence Photo
            </span>
          </div>
        </div>
        <div className="mt-3 px-2 pb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-display text-base font-bold text-cream/90">
              《{painting.title}》
            </div>
            <span className="text-[10px] text-cream/50 font-serif uppercase tracking-wider">
              {painting.titleEn}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-cream/60 font-serif">
            <span>🎨 {painting.artist}</span>
            <span>📅 {painting.year}</span>
            <span>🏛️ {painting.movement}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuspectedVersionCard({
  version,
  painting,
  isSelected,
  onSelect,
}: {
  version: SuspectedVersion;
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => audioManager.play("option_hover")}
      className={`w-full group relative overflow-hidden rounded-sm border-2 transition-all text-left animate-fadeInUp ${
        isSelected
          ? "bg-rose-900/10 border-rose-700 shadow-lg scale-[1.01]"
          : "bg-white/60 border-ink/10 hover:bg-rose-900/5 hover:border-rose-900/40"
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-rose-800 flex items-center justify-center shadow-lg">
          <Check size={16} strokeWidth={3} className="text-white" />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-0">
        <div className="sm:w-44 flex-shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-museum-dark">
          <img
            src={painting?.imageUrl}
            alt={version.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isSelected ? "brightness-95" : "brightness-90"}`}
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className={`font-display text-base font-bold ${isSelected ? "text-rose-900" : "text-ink"} group-hover:text-rose-900 transition-colors`}>
                {version.title}
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                Suspected Version
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2 bg-ink/[0.03] rounded-sm">
              <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">来源</div>
              <div className="text-[11px] text-ink/70 font-serif mt-0.5">{version.source}</div>
            </div>
            <div className="p-2 bg-ink/[0.03] rounded-sm">
              <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">发现地点</div>
              <div className="text-[11px] text-ink/70 font-serif mt-0.5">{version.location}</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1.5">
              版本特征 · Distinguishing Features
            </div>
            <div className="space-y-1">
              {version.distinguishingFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-[11px] text-ink/70 font-serif"
                >
                  <span className="text-rose-800 mt-0.5">▸</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-rose-900/10 text-rose-800 font-serif rounded-sm">
              <ShieldCheck size={11} />
              点击锁定此版本
            </span>
            <ChevronRight
              size={16}
              className={`text-ink/30 group-hover:text-rose-800 group-hover:translate-x-0.5 transition-all ${isSelected ? "text-rose-800 translate-x-0.5" : ""}`}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function SelectingStage({
  caseData,
  painting,
  unlockedClues,
  onSelect,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: TheftClueType[];
  onSelect: (versionId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!caseData || !painting) return null;

  const handleSelect = (versionId: string) => {
    setSelected(versionId);
    setTimeout(() => {
      onSelect(versionId);
    }, 400);
  };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-rose-900/5 flex items-center gap-2">
          <Gavel size={14} className="text-rose-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            锁定真迹 · Final Selection
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Based on {unlockedClues.length} Evidence
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-5 p-4 bg-rose-900/[0.04] rounded-sm border border-rose-900/10">
            <div className="w-16 h-16 overflow-hidden rounded-sm flex-shrink-0">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-semibold text-ink">
                追寻目标：《{painting.title}》· {painting.artist}
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                请根据搜集到的线索，从以下 {caseData.suspectedVersions.length} 个疑似版本中判断哪一幅才是真正的原作
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-900/10 rounded-sm">
                <Clock size={11} className="text-rose-800" />
                <span className="text-[10px] text-rose-800 font-serif">
                  已收集 {unlockedClues.length} / {caseData.clues.length} 条证据
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-ink/50 font-serif mb-3 uppercase tracking-wider">
            疑似版本列表 · Suspected Versions
          </div>
          <div className="space-y-3">
            {caseData.suspectedVersions.map((version, idx) => (
              <SuspectedVersionCard
                key={version.id}
                version={version}
                painting={painting}
                isSelected={selected === version.id}
                onSelect={() => handleSelect(version.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportStage({
  caseData,
  painting,
  unlockedClues,
  scoreDelta,
  totalScore,
  streak,
  onNext,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["theftCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: TheftClueType[];
  scoreDelta: number;
  totalScore: number;
  streak: number;
  onNext: () => void;
}) {
  const { theftCaseCorrect, theftSelectedVersionId } = useGameStore();
  if (!caseData || !painting) return null;

  const selectedVersion = caseData.suspectedVersions.find((v) => v.id === theftSelectedVersionId);
  const correctVersion = caseData.suspectedVersions.find((v) => v.isAuthentic);

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div
        className={`relative overflow-hidden file-card ${
          theftCaseCorrect ? "" : "animate-shake"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-20 ${
            theftCaseCorrect
              ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />
        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                theftCaseCorrect ? "bg-emerald-600" : "bg-terracotta"
              } ${theftCaseCorrect ? "animate-glowPulse" : ""}`}
            >
              {theftCaseCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <X size={28} strokeWidth={3.5} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-display text-2xl md:text-3xl font-bold ${
                  theftCaseCorrect ? "text-success-deep" : "text-error-deep"
                }`}
              >
                {theftCaseCorrect ? "成功追踪！真迹已锁定" : "追踪失误，判断错误"}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm font-serif">
                {!theftCaseCorrect && selectedVersion && (
                  <span className="text-terracotta flex items-center gap-1">
                    <AlertTriangle size={13} />
                    你的选择：{selectedVersion.title}
                  </span>
                )}
                {correctVersion && (
                  <span className="px-2.5 py-1 rounded-sm bg-rose-900/10 text-rose-900 border border-rose-900/20 font-serif text-xs font-semibold">
                    真迹版本：{correctVersion.title}（{correctVersion.location}）
                  </span>
                )}
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <span
                  className={`font-display text-xl font-bold tabular-nums ${
                    scoreDelta >= 0 ? "text-gold" : "text-terracotta"
                  } animate-scorePop`}
                >
                  {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta}
                </span>
                {scoreDelta >= 0 && unlockedClues.length === 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-gold/15 text-gold rounded-sm font-serif">
                    零线索奖励 +60
                  </span>
                )}
                {scoreDelta >= 0 && unlockedClues.length > 0 && unlockedClues.length <= 2 && (
                  <span className="text-[10px] px-2 py-0.5 bg-gold/15 text-gold rounded-sm font-serif">
                    精准追踪 +30
                  </span>
                )}
                {streak >= 2 && (
                  <span className="text-[11px] text-orange-700 font-serif flex items-center gap-1">
                    <Sparkles size={12} />
                    连续破案 {streak} 次
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative file-card overflow-hidden animate-slideInLeft">
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(136,19,55,0.6) 0%, transparent 70%)",
          }}
        />
        <div className="px-5 py-3 border-b border-rose-900/20 bg-rose-900/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-900/20 flex items-center justify-center">
            <BookOpen size={14} className="text-rose-800" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-rose-900 tracking-wide">
              案件复盘 · Case Debriefing
            </div>
            <div className="text-[10px] text-rose-800/60 uppercase tracking-widest font-serif">
              Art Theft Unit Report
            </div>
          </div>
          <div className="ml-auto">
            <div
              className={`authenticity-stamp animate-stampAuth border-emerald-600 text-emerald-700`}
            >
              RECOVERED
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4 p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-14 h-14 overflow-hidden rounded-sm flex-shrink-0">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-sm font-semibold text-ink">
                《{painting.title}》· {painting.artist}
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                原作创作：{painting.year} · {painting.movement}
              </div>
              {correctVersion && (
                <div className="text-xs text-ink/50 font-serif mt-0.5">
                  寻回地点：{correctVersion.location}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-ink/80 leading-relaxed font-serif mb-5">
            {caseData.report.summary}
          </p>

          <div className="space-y-2.5 mb-5">
            <div className="text-[10px] uppercase tracking-widest text-rose-800 font-serif mb-2">
              关键追踪证据
            </div>
            {caseData.report.evidenceForVerdict.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 animate-fadeInUp"
                style={{ animationDelay: `${100 + i * 100}ms` }}
              >
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-rose-900/15 border border-rose-900/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-rose-800">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-rose-900 font-serif">
                    {item.title}
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed font-serif">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!theftCaseCorrect && caseData.report.misleadingFeatures.length > 0 && (
            <div className="relative file-card overflow-hidden animate-slideInRight mb-5">
              <div className="px-4 py-2.5 border-b border-terracotta/20 bg-terracotta/5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-terracotta/20 flex items-center justify-center">
                  <AlertTriangle size={13} className="text-terracotta" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-terracotta tracking-wide">
                    容易被误导的版本
                  </div>
                  <div className="text-[10px] text-terracotta/60 uppercase tracking-widest font-serif">
                    Misleading Versions
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2.5">
                {caseData.report.misleadingFeatures.map((item, i) => (
                  <div
                    key={i}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${200 + i * 120}ms` }}
                  >
                    <div className="flex items-start gap-2.5 mb-1.5">
                      <AlertTriangle size={12} className="text-terracotta mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-semibold text-terracotta font-serif">
                        你可能被「{item.feature}」误导了
                      </p>
                    </div>
                    <div className="ml-5 pl-2.5 border-l-2 border-terracotta/20">
                      <p className="text-sm text-ink/80 leading-relaxed font-serif">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative file-card overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gold/20 bg-gold/5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
                <Award size={13} className="text-gold" strokeWidth={2.2} />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-gold tracking-wide">
                  真实艺术史背景
                </div>
                <div className="text-[10px] text-gold/60 uppercase tracking-widest font-serif">
                  Art Historical Context
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-ink/80 leading-relaxed font-serif">
                {caseData.report.artHistoryContext}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full group relative py-4 px-6 rounded-sm bg-rose-800 hover:bg-rose-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <RefreshCw size={18} />
          追踪下一件失窃名画
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
