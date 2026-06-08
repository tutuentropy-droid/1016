import { useMemo, useState } from "react";
import { useGameStore, type ForgeryPhase } from "@/store/useGameStore";
import type { ForgeryClueType, ForgeryClue, ForgeryVerdict } from "@/data/paintings";
import { paintings } from "@/data/paintings";
import {
  Search,
  Eye,
  Scan,
  Microscope,
  FileText,
  ShieldCheck,
  Copy,
  Palette,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  ChevronRight,
  Lightbulb,
  Info,
  Award,
  BookOpen,
  RefreshCw,
  Filter,
  Layers,
  ZoomIn,
  FileQuestion,
  Gavel,
  ScrollText,
  Fingerprint,
  Clock,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

type VisualMode = "normal" | "uv" | "texture" | "signature" | "pigment" | "comparison";

const VERDICT_OPTIONS: { id: ForgeryVerdict; label: string; en: string; icon: typeof ShieldCheck; desc: string; color: string }[] = [
  { id: "authentic", label: "真迹", en: "Authentic", icon: ShieldCheck, desc: "确认是艺术家本人的原作", color: "text-emerald-600" },
  { id: "copy", label: "临摹伪作", en: "Forged Copy", icon: Copy, desc: "后世临摹复制的赝品", color: "text-terracotta" },
  { id: "styleImitation", label: "风格模仿", en: "Style Imitation", icon: Palette, desc: "同期追随者或后世的风格模仿", color: "text-amber-600" },
];

export default function ForgeryPanel() {
  const {
    forgeryCurrentCase,
    forgeryPhase,
    forgeryUnlockedClues,
    forgeryScoreDelta,
    forgeryCasesCompleted,
    setForgeryPhase,
    unlockForgeryClue,
    submitForgeryVerdict,
    nextForgeryCase,
    totalScore,
    streak,
  } = useGameStore();

  const [visualMode, setVisualMode] = useState<VisualMode>("normal");
  const [activeClueType, setActiveClueType] = useState<ForgeryClueType | null>(null);

  const currentPainting = useMemo(() => {
    if (!forgeryCurrentCase) return null;
    return paintings.find((p) => p.id === forgeryCurrentCase.paintingId) || null;
  }, [forgeryCurrentCase]);

  if (!forgeryCurrentCase || !currentPainting) {
    return (
      <div className="file-card p-8 text-center animate-fadeInUp">
        <div className="text-ink/50 font-serif">正在加载真伪鉴定案件...</div>
      </div>
    );
  }

  const handleStartObserving = () => {
    audioManager.play("paper_flip");
    setForgeryPhase("observing");
  };

  const handleGoInvestigating = () => {
    audioManager.play("paper_flip");
    setForgeryPhase("investigating");
  };

  const handleUnlockClue = (clue: ForgeryClue) => {
    if (forgeryUnlockedClues.includes(clue.type)) {
      setActiveClueType(clue.type);
      if (clue.visualEffect) {
        setVisualMode(clue.visualEffect as VisualMode);
      }
      return;
    }
    audioManager.play("clue_unlock");
    unlockForgeryClue(clue.type);
    setActiveClueType(clue.type);
    if (clue.visualEffect) {
      setVisualMode(clue.visualEffect as VisualMode);
    }
  };

  const handleGoVerdict = () => {
    audioManager.play("detail_focus");
    setForgeryPhase("verdict");
    setVisualMode("normal");
    setActiveClueType(null);
  };

  const handleSelectVerdict = (verdict: ForgeryVerdict) => {
    audioManager.play("detail_focus");
    submitForgeryVerdict(verdict);
    if (verdict === forgeryCurrentCase.groundTruth) {
      audioManager.play("answer_correct");
    } else {
      audioManager.play("answer_wrong");
    }
  };

  const handleNextCase = () => {
    audioManager.play("next_question");
    audioManager.play("paper_flip");
    setVisualMode("normal");
    setActiveClueType(null);
    nextForgeryCase();
  };

  return (
    <div className="space-y-5 animate-fadeInUp">
      <HeaderCard completedCount={forgeryCasesCompleted} />

      {forgeryPhase === "briefing" && (
        <BriefingStage
          caseData={forgeryCurrentCase}
          onStart={handleStartObserving}
        />
      )}

      {(forgeryPhase === "observing" || forgeryPhase === "investigating") && (
        <ObservingInvestigatingStage
          phase={forgeryPhase}
          caseData={forgeryCurrentCase}
          painting={currentPainting}
          unlockedClues={forgeryUnlockedClues}
          activeClueType={activeClueType}
          visualMode={visualMode}
          onVisualModeChange={setVisualMode}
          onUnlockClue={handleUnlockClue}
          onSetActiveClue={setActiveClueType}
          onGoInvestigating={handleGoInvestigating}
          onGoVerdict={handleGoVerdict}
        />
      )}

      {forgeryPhase === "verdict" && (
        <VerdictStage
          caseData={forgeryCurrentCase}
          painting={currentPainting}
          unlockedClues={forgeryUnlockedClues}
          onSelect={handleSelectVerdict}
        />
      )}

      {forgeryPhase === "report" && (
        <ReportStage
          caseData={forgeryCurrentCase}
          painting={currentPainting}
          unlockedClues={forgeryUnlockedClues}
          scoreDelta={forgeryScoreDelta}
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
      <div className="px-5 py-4 border-b border-violet-900/20 bg-gradient-to-r from-violet-900/10 via-violet-700/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-900/20 border border-violet-700/40 flex items-center justify-center">
            <Gavel size={18} className="text-violet-800" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                真假伪作鉴定
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-serif bg-violet-900/20 text-violet-800 rounded-sm uppercase tracking-wider">
                Forgery Investigation
              </span>
            </div>
            <p className="text-xs text-ink/50 font-serif mt-0.5">
              像艺术鉴定师一样 · 紫外线 · 颜料分析 · 档案比对 · 出具鉴定报告
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-lg font-bold text-violet-800 tabular-nums">
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
  onStart,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["forgeryCurrentCase"];
  onStart: () => void;
}) {
  if (!caseData) return null;
  const difficultyLabel = { normal: "常规", hard: "困难", expert: "专家" };
  const difficultyColor = { normal: "text-emerald-700", hard: "text-amber-600", expert: "text-terracotta" };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <FileText size={14} className="text-violet-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            案件简报 · Case File
          </h3>
          <span className={`text-[10px] ml-auto font-serif font-semibold ${difficultyColor[caseData.difficulty]}`}>
            难度：{difficultyLabel[caseData.difficulty]}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-900/15 flex items-center justify-center flex-shrink-0">
              <ScrollText size={14} className="text-violet-800" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink">
                《{caseData.caseTitle}》
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                Case #{caseData.id.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="p-4 bg-violet-900/[0.04] rounded-sm border border-violet-900/10 mb-4">
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {caseData.caseBriefing}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1">
                声称作者
              </div>
              <div className="font-display text-sm font-semibold text-ink">
                {caseData.displayedArtist}
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1">
                声称创作年代
              </div>
              <div className="font-display text-sm font-semibold text-ink">
                {caseData.displayedYear}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 p-3 bg-gold/[0.06] rounded-sm border border-gold/20">
            <Lightbulb size={14} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-gold font-serif mb-0.5">
                鉴定守则
              </div>
              <p className="text-xs text-ink/60 font-serif leading-relaxed">
                基础分 120 分，每条线索消耗 12 分。解锁 0 条线索答对可额外获得 +50 分奖励，≤2 条线索答对额外 +20 分。答错扣 40% 分数。仔细利用视觉分析工具（紫外线、放大镜、颜料光谱等）寻找破绽。
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full group relative py-4 px-6 rounded-sm bg-violet-800 hover:bg-violet-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-700 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <Search size={18} />
          进入修复室 · 开始鉴定
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

function PaintingVisualizer({
  painting,
  visualMode,
}: {
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  visualMode: VisualMode;
}) {
  if (!painting) return null;

  return (
    <div className="relative group forensic-border overflow-hidden rounded-sm">
      <div className="absolute -inset-2 bg-gradient-to-br from-violet-900/50 via-violet-800/30 to-violet-900/50 rounded-sm opacity-70" />
      <div className="relative p-2 bg-gradient-to-br from-museum-dark to-museum-warm rounded-sm overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className={`w-full h-full object-cover transition-all duration-500 ${visualMode === "uv" ? "uv-tint" : ""} ${visualMode === "texture" ? "animate-textureZoom" : ""} ${visualMode === "signature" ? "animate-signatureReveal" : ""} ${visualMode === "pigment" ? "animate-pigmentGlow" : ""}`}
            loading="lazy"
            draggable={false}
          />

          {visualMode === "uv" && (
            <>
              <div className="absolute inset-0 uv-tint" />
              <div className="absolute inset-0 uv-overlay animate-uvScan" />
              <div className="lab-scan-line animate-uvScan" style={{ top: "0" }} />
            </>
          )}

          {visualMode === "texture" && (
            <div className="absolute inset-0 canvas-weave pointer-events-none opacity-50" />
          )}

          {visualMode === "signature" && (
            <div className="absolute bottom-[8%] right-[8%] w-[22%] h-[15%] signature-highlight">
              <div className="absolute inset-0 flex items-center justify-center">
                <Fingerprint size={14} className="text-violet-400 opacity-60" />
              </div>
            </div>
          )}

          {visualMode === "pigment" && (
            <div className="absolute top-4 left-4 right-4 h-1.5 pigment-spectrum rounded-full animate-dataStream opacity-80" />
          )}

          {visualMode === "comparison" && (
            <div className="absolute inset-0 comparison-split">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 rounded-sm text-[10px] text-violet-300 font-serif tracking-wider">
                LEFT: QUESTIONED · RIGHT: ARCHIVE
              </div>
            </div>
          )}

          {visualMode === "normal" && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
              <Eye size={11} className="text-violet-300" />
              <span className="text-[10px] text-violet-200 font-serif uppercase tracking-wider">
                Visual Inspection
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-labPulse" />
            <span className="text-[10px] text-emerald-300 font-serif uppercase tracking-wider typewriter-font">
              {visualMode.toUpperCase()} MODE · ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualModeSelector({
  mode,
  onChange,
}: {
  mode: VisualMode;
  onChange: (m: VisualMode) => void;
}) {
  const modes: { id: VisualMode; label: string; icon: typeof Eye }[] = [
    { id: "normal", label: "目视", icon: Eye },
    { id: "uv", label: "紫外线", icon: Scan },
    { id: "texture", label: "纹理放大", icon: ZoomIn },
    { id: "signature", label: "签名检测", icon: Fingerprint },
    { id: "pigment", label: "颜料光谱", icon: Filter },
    { id: "comparison", label: "档案比对", icon: Layers },
  ];

  return (
    <div className="file-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-ink/10 bg-violet-900/5 flex items-center gap-2">
        <Microscope size={13} className="text-violet-800" />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          分析工具
        </h4>
        <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
          Analysis Tools
        </span>
      </div>
      <div className="p-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                audioManager.play("option_hover");
                onChange(m.id);
              }}
              onMouseEnter={() => audioManager.play("option_hover")}
              className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-sm border transition-all ${
                isActive
                  ? "bg-violet-800 text-white border-violet-700 shadow-md scale-[1.03]"
                  : "bg-white/50 text-ink/60 border-ink/10 hover:bg-violet-900/5 hover:text-violet-800 hover:border-violet-900/30"
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] font-serif tracking-wide">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ObservingInvestigatingStage({
  phase,
  caseData,
  painting,
  unlockedClues,
  activeClueType,
  visualMode,
  onVisualModeChange,
  onUnlockClue,
  onSetActiveClue,
  onGoInvestigating,
  onGoVerdict,
}: {
  phase: ForgeryPhase;
  caseData: ReturnType<typeof useGameStore.getState>["forgeryCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: ForgeryClueType[];
  activeClueType: ForgeryClueType | null;
  visualMode: VisualMode;
  onVisualModeChange: (m: VisualMode) => void;
  onUnlockClue: (clue: ForgeryClue) => void;
  onSetActiveClue: (t: ForgeryClueType | null) => void;
  onGoInvestigating: () => void;
  onGoVerdict: () => void;
}) {
  if (!caseData) return null;
  const isObserving = phase === "observing";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        <div className="space-y-4">
          <div className="animate-fadeInUp">
            <PaintingVisualizer painting={painting} visualMode={visualMode} />
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: "50ms" }}>
            <VisualModeSelector mode={visualMode} onChange={onVisualModeChange} />
          </div>

          <div className="file-card p-4 animate-fadeInUp" style={{ animationDelay: "80ms" }}>
            <div className="flex items-start gap-2.5">
              <BookOpen size={14} className="text-violet-800 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-display text-sm font-semibold text-ink mb-1">
                  《{caseData.displayedArtist}》· 声称创作于 {caseData.displayedYear}
                </div>
                <p className="text-xs text-ink/60 font-serif leading-relaxed">
                  {painting?.description}
                </p>
              </div>
            </div>
          </div>

          {isObserving && (
            <button
              onClick={onGoInvestigating}
              className="w-full group relative py-4 px-6 rounded-sm bg-violet-800 hover:bg-violet-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-700 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 overflow-hidden pointer-events-none">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
                  }}
                />
              </span>
              <span className="relative flex items-center gap-2">
                <Search size={18} />
                启动深度鉴定 · 解锁线索
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          )}

          {!isObserving && (
            <div className="file-card p-4 animate-fadeInUp">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-ink/40 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-ink/60 font-serif leading-relaxed">
                    已收集 {unlockedClues.length} / {caseData.clues.length} 条线索。综合所有证据，准备给出你的鉴定结论？
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isObserving && (
            <button
              onClick={onGoVerdict}
              className="w-full group relative py-4 px-6 rounded-sm bg-violet-800 hover:bg-violet-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-700 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 overflow-hidden pointer-events-none">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
                  }}
                />
              </span>
              <span className="relative flex items-center gap-2">
                <Gavel size={18} />
                出具鉴定结论
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          )}
        </div>

        <div className="space-y-4 self-start lg:sticky lg:top-6">
          {!isObserving ? (
            <InvestigationCluesPanel
              caseData={caseData}
              unlocked={unlockedClues}
              activeClueType={activeClueType}
              onUnlock={onUnlockClue}
              onSetActive={onSetActiveClue}
              onVisualModeChange={onVisualModeChange}
            />
          ) : (
            <div className="file-card p-4 text-xs text-ink/50 font-serif animate-fadeInUp">
              <div className="flex items-center gap-1.5 text-ink/70 font-semibold mb-2">
                <span className="text-violet-800">🔬</span>
                <span>鉴定阶段提示</span>
              </div>
              <p className="leading-relaxed mb-1.5">· 使用上方「分析工具」切换不同观察模式</p>
              <p className="leading-relaxed mb-1.5">· 紫外线模式可发现现代上光材料</p>
              <p className="leading-relaxed mb-1.5">· 纹理放大可观察画布纤维和笔触层次</p>
              <p className="leading-relaxed">· 准备好后启动深度鉴定，解锁科学检测线索</p>
            </div>
          )}

          <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp">
            <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
              <span className="text-violet-800">📋</span>
              <span>鉴定守则</span>
            </div>
            <p>· 基础分 <span className="text-violet-800 font-bold">120 分</span>，每条线索扣除 <span className="text-terracotta font-semibold">12 分</span></p>
            <p>· 不解锁线索直接答对 +<span className="text-gold font-bold">50 分</span> 奖励</p>
            <p>· ≤2 条线索答对额外 +<span className="text-gold font-semibold">20 分</span></p>
            <p>· 难度越高，分数倍率越大</p>
            <div className="pt-2 mt-2 border-t border-ink/10 flex items-center gap-2 text-[10px] text-ink/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-800 animate-markerPulse" />
              <span className="typewriter-font uppercase tracking-widest">Forensic Lab · Active</span>
            </div>
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
  onVisualModeChange,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["forgeryCurrentCase"];
  unlocked: ForgeryClueType[];
  activeClueType: ForgeryClueType | null;
  onUnlock: (clue: ForgeryClue) => void;
  onSetActive: (t: ForgeryClueType | null) => void;
  onVisualModeChange: (m: VisualMode) => void;
}) {
  if (!caseData) return null;

  return (
    <div className="file-card overflow-hidden animate-fadeInUp">
      <div className="px-4 py-2.5 border-b border-ink/10 bg-violet-900/5 flex items-center gap-2">
        <Layers size={13} className="text-violet-800" />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          鉴定线索 · Evidence
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
                      ? "border-violet-700/40 bg-violet-900/[0.08] animate-paperUnfurl"
                      : "border-violet-700/20 bg-violet-900/[0.04]"
                  }`}
                  onClick={() => {
                    onSetActive(isActive ? null : clue.type);
                    if (clue.visualEffect) {
                      onVisualModeChange(clue.visualEffect as VisualMode);
                    }
                  }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-violet-800" />
                  <div className="flex items-start gap-3 px-4 py-3 pl-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-900/15 flex items-center justify-center">
                      {getClueIcon(clue.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest font-serif text-violet-800">
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
                    <Unlock size={12} className="flex-shrink-0 mt-1.5 text-violet-800/70" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onUnlock(clue)}
                  onMouseEnter={() => audioManager.play("option_hover")}
                  className="w-full group flex items-start gap-3 px-4 py-3 rounded-sm border border-dashed border-ink/20 bg-white/40 hover:bg-violet-900/5 hover:border-violet-900/40 transition-all text-left"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-violet-900/15 transition-colors">
                    <Lock
                      size={12}
                      className="text-ink/40 group-hover:text-violet-800 transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-0.5">
                      {clue.label} · 待检测
                    </div>
                    <div className="text-sm text-ink/60 group-hover:text-ink font-serif transition-colors">
                      {clue.hintText}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 text-[10px] text-terracotta font-serif">
                    <ChevronRight
                      size={14}
                      className="text-ink/30 group-hover:text-violet-800 group-hover:translate-x-0.5 transition-all"
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

function getClueIcon(type: ForgeryClueType) {
  const iconMap: Record<ForgeryClueType, React.ReactNode> = {
    brushstrokeDetail: <BrushstrokeIcon />,
    signatureAnalysis: <Fingerprint size={14} className="text-violet-800" />,
    pigmentDating: <Filter size={14} className="text-violet-800" />,
    compositionStyle: <Layers size={14} className="text-violet-800" />,
    uvExamination: <Scan size={14} className="text-violet-800" />,
    canvasTexture: <ZoomIn size={14} className="text-violet-800" />,
    archiveComparison: <RefreshCw size={14} className="text-violet-800" />,
    provenanceRecord: <FileQuestion size={14} className="text-violet-800" />,
  };
  return iconMap[type];
}

function BrushstrokeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-violet-800">
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 00-3-3.02z" />
    </svg>
  );
}

function VerdictStage({
  caseData,
  painting,
  unlockedClues,
  onSelect,
}: {
  caseData: ReturnType<typeof useGameStore.getState>["forgeryCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: ForgeryClueType[];
  onSelect: (verdict: ForgeryVerdict) => void;
}) {
  if (!caseData || !painting) return null;

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-violet-900/5 flex items-center gap-2">
          <Gavel size={14} className="text-violet-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            出具鉴定结论 · Final Verdict
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            Based on {unlockedClues.length} Evidence
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-5 p-4 bg-violet-900/[0.04] rounded-sm border border-violet-900/10">
            <div className="w-16 h-16 overflow-hidden rounded-sm flex-shrink-0">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-semibold text-ink">
                《{painting.title}》
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                声称作者：{caseData.displayedArtist} · {caseData.displayedYear}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-violet-900/10 rounded-sm">
                <Clock size={11} className="text-violet-800" />
                <span className="text-[10px] text-violet-800 font-serif">
                  已收集 {unlockedClues.length} / {caseData.clues.length} 条证据
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-ink/50 font-serif mb-3 uppercase tracking-wider">
            请选择你的最终鉴定结论
          </div>
          <div className="space-y-3">
            {VERDICT_OPTIONS.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelect(opt.id)}
                  onMouseEnter={() => audioManager.play("option_hover")}
                  className="w-full group relative overflow-hidden rounded-sm border border-ink/10 bg-white/60 hover:bg-violet-900/5 hover:border-violet-900/40 transition-all text-left p-4 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-900/15 border border-violet-900/25 flex items-center justify-center group-hover:bg-violet-800 group-hover:border-violet-700 transition-all">
                      <Icon size={18} strokeWidth={2} className={`${opt.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-display text-base font-semibold ${opt.color} group-hover:text-violet-900 transition-colors`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-ink/40 font-serif">
                          {opt.en}
                        </span>
                      </div>
                      <p className="text-xs text-ink/60 font-serif mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="flex-shrink-0 mt-1 text-ink/30 group-hover:text-violet-800 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </button>
              );
            })}
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
  caseData: ReturnType<typeof useGameStore.getState>["forgeryCurrentCase"];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  unlockedClues: ForgeryClueType[];
  scoreDelta: number;
  totalScore: number;
  streak: number;
  onNext: () => void;
}) {
  const { forgeryCaseCorrect, forgerySelectedVerdict } = useGameStore();
  if (!caseData || !painting) return null;

  const correctVerdict = VERDICT_OPTIONS.find((v) => v.id === caseData.groundTruth);
  const selectedVerdict = VERDICT_OPTIONS.find((v) => v.id === forgerySelectedVerdict);

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div
        className={`relative overflow-hidden file-card ${
          forgeryCaseCorrect ? "" : "animate-shake"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-20 ${
            forgeryCaseCorrect
              ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />
        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                forgeryCaseCorrect ? "bg-emerald-600" : "bg-terracotta"
              } ${forgeryCaseCorrect ? "animate-glowPulse" : ""}`}
            >
              {forgeryCaseCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <X size={28} strokeWidth={3.5} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-display text-2xl md:text-3xl font-bold ${
                  forgeryCaseCorrect ? "text-success-deep" : "text-error-deep"
                }`}
              >
                {forgeryCaseCorrect ? "鉴定准确" : "鉴定失误"}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm font-serif">
                {!forgeryCaseCorrect && selectedVerdict && (
                  <span className="text-terracotta flex items-center gap-1">
                    <AlertTriangle size={13} />
                    你的判断：{selectedVerdict.label}
                  </span>
                )}
                {correctVerdict && (
                  <span className="px-2.5 py-1 rounded-sm bg-violet-900/10 text-violet-900 border border-violet-900/20 font-serif text-xs font-semibold">
                    正确结论：{correctVerdict.label}（{correctVerdict.en}）
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
                    零线索奖励 +50
                  </span>
                )}
                {scoreDelta >= 0 && unlockedClues.length > 0 && unlockedClues.length <= 2 && (
                  <span className="text-[10px] px-2 py-0.5 bg-gold/15 text-gold rounded-sm font-serif">
                    精准鉴定 +20
                  </span>
                )}
                {streak >= 2 && (
                  <span className="text-[11px] text-orange-700 font-serif flex items-center gap-1">
                    <Sparkles size={12} />
                    连续准确 {streak} 次
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
              "radial-gradient(circle at top right, rgba(107, 70, 193, 0.6) 0%, transparent 70%)",
          }}
        />
        <div className="px-5 py-3 border-b border-violet-900/20 bg-violet-900/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-violet-900/20 flex items-center justify-center">
            <ScrollText size={14} className="text-violet-800" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-violet-900 tracking-wide">
              鉴定报告 · Authentication Report
            </div>
            <div className="text-[10px] text-violet-800/60 uppercase tracking-widest font-serif">
              Bureau of Art Authentication
            </div>
          </div>
          <div className="ml-auto">
            <div
              className={`authenticity-stamp animate-stampAuth ${
                caseData.groundTruth === "authentic"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-terracotta text-terracotta"
              }`}
            >
              {caseData.groundTruth === "authentic" ? "AUTHENTIC" : "FORGERY"}
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
                《{painting.title}》
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                实际作者：{caseData.correctArtist} · {caseData.correctYear}
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                声称作者：{caseData.displayedArtist} · {caseData.displayedYear}
              </div>
            </div>
          </div>

          <p className="text-sm text-ink/80 leading-relaxed font-serif mb-5">
            {caseData.report.summary}
          </p>

          <div className="space-y-2.5 mb-5">
            <div className="text-[10px] uppercase tracking-widest text-violet-800 font-serif mb-2">
              核心鉴定证据
            </div>
            {caseData.report.evidenceForVerdict.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 animate-fadeInUp"
                style={{ animationDelay: `${100 + i * 100}ms` }}
              >
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-violet-900/15 border border-violet-900/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-violet-800">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-violet-900 font-serif">
                    {item.title}
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed font-serif">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!forgeryCaseCorrect && caseData.report.misleadingFeatures.length > 0 && (
            <div className="relative file-card overflow-hidden animate-slideInRight mb-5">
              <div className="px-4 py-2.5 border-b border-terracotta/20 bg-terracotta/5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-terracotta/20 flex items-center justify-center">
                  <AlertTriangle size={13} className="text-terracotta" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-terracotta tracking-wide">
                    容易被误导的细节
                  </div>
                  <div className="text-[10px] text-terracotta/60 uppercase tracking-widest font-serif">
                    Misleading Features
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
                  历史背景
                </div>
                <div className="text-[10px] text-gold/60 uppercase tracking-widest font-serif">
                  Historical Context
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-ink/80 leading-relaxed font-serif">
                {caseData.report.historicalContext}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full group relative py-4 px-6 rounded-sm bg-violet-800 hover:bg-violet-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-violet-800 via-violet-700 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <RefreshCw size={18} />
          调查下一件真伪鉴定案件
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
