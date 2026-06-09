import { useMemo, useState, useEffect, useRef } from "react";
import {
  Search,
  Eye,
  MapPin,
  ZoomIn,
  ZoomOut,
  Move,
  X,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Info,
  Award,
  Sparkles,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Compass,
  Frame,
  BookOpen,
  Star,
  RefreshCw,
  Layers,
} from "lucide-react";
import { useGameStore, type InvestigationPhase } from "@/store/useGameStore";
import { paintings } from "@/data/paintings";
import type {
  ExhibitionHall,
  InvestigationCase,
  ExhibitionClue,
  ExhibitionArtwork,
} from "@/data/paintings";
import {
  EXHIBITION_HALLS,
  getExhibitionHallById,
} from "@/data/paintings";
import { audioManager } from "@/utils/audioManager";

export default function InvestigationPanel() {
  const {
    investigationPhase,
    investigationCurrentCase,
    investigationUnlockedClueIds,
    investigationAnswers,
    investigationCurrentQuestionIndex,
    investigationScoreDelta,
    investigationBonus,
    investigationCasesCompleted,
    investigationViewerFocus,
    investigationActiveClueId,
    investigationZoomedPaintingId,
    setInvestigationPhase,
    startInvestigationCase,
    unlockInvestigationExhibitClue,
    setInvestigationActiveClue,
    setInvestigationViewerFocus,
    setInvestigationZoomedPainting,
    submitInvestigationAnswer,
    nextInvestigationQuestion,
    nextInvestigationCase,
    resetInvestigation,
    totalScore,
    streak,
  } = useGameStore();

  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  const [showClueDetail, setShowClueDetail] = useState<ExhibitionClue | null>(null);
  const [panning, setPanning] = useState(false);
  const [lastPanPos, setLastPanPos] = useState({ x: 0, y: 0 });
  const viewerRef = useRef<HTMLDivElement>(null);

  const currentHall = useMemo(() => {
    if (!investigationCurrentCase) return null;
    return getExhibitionHallById(investigationCurrentCase.hallId);
  }, [investigationCurrentCase]);

  const handleSelectHall = (hallId: string) => {
    audioManager.play("paper_flip");
    setSelectedHallId(hallId);
  };

  const handleConfirmHall = () => {
    if (!selectedHallId) return;
    audioManager.play("next_question");
    startInvestigationCase(selectedHallId as any);
  };

  const handleStartExploring = () => {
    audioManager.play("paper_flip");
    setInvestigationPhase("exploring");
  };

  const handleGoToQuestions = () => {
    audioManager.play("detail_focus");
    setInvestigationPhase("questioning");
  };

  const handleZoomIn = () => {
    audioManager.play("detail_focus");
    setInvestigationViewerFocus({
      ...investigationViewerFocus,
      zoom: Math.min(investigationViewerFocus.zoom + 0.25, 2.5),
    });
  };

  const handleZoomOut = () => {
    audioManager.play("detail_focus");
    setInvestigationViewerFocus({
      ...investigationViewerFocus,
      zoom: Math.max(investigationViewerFocus.zoom - 0.25, 0.5),
    });
  };

  const handleResetView = () => {
    audioManager.play("paper_flip");
    setInvestigationViewerFocus({ x: 50, y: 50, zoom: 1 });
  };

  const handleViewerMouseDown = (e: React.MouseEvent) => {
    setPanning(true);
    setLastPanPos({ x: e.clientX, y: e.clientY });
  };

  const handleViewerMouseMove = (e: React.MouseEvent) => {
    if (!panning) return;
    const dx = e.clientX - lastPanPos.x;
    const dy = e.clientY - lastPanPos.y;
    const zoom = investigationViewerFocus.zoom;
    setInvestigationViewerFocus({
      x: Math.max(0, Math.min(100, investigationViewerFocus.x - (dx / zoom) * 0.3)),
      y: Math.max(0, Math.min(100, investigationViewerFocus.y - (dy / zoom) * 0.3)),
      zoom,
    });
    setLastPanPos({ x: e.clientX, y: e.clientY });
  };

  const handleViewerMouseUp = () => {
    setPanning(false);
  };

  const handleClueClick = (clue: ExhibitionClue) => {
    if (!investigationUnlockedClueIds.includes(clue.id)) {
      audioManager.play("clue_unlock");
      unlockInvestigationExhibitClue(clue.id);
    } else {
      audioManager.play("option_hover");
      setInvestigationActiveClue(clue.id);
    }
    setShowClueDetail(clue);
  };

  const handlePaintingClick = (artwork: ExhibitionArtwork) => {
    audioManager.play("detail_focus");
    setInvestigationZoomedPainting(artwork.paintingId);
  };

  const handleSubmitAnswer = (questionId: string, optionId: string) => {
    audioManager.play("detail_focus");
    submitInvestigationAnswer(questionId, optionId);
  };

  const handleNextQuestion = () => {
    audioManager.play("next_question");
    nextInvestigationQuestion();
  };

  const handleNextCase = () => {
    audioManager.play("next_question");
    audioManager.play("paper_flip");
    resetInvestigation();
    setSelectedHallId(null);
  };

  const handleBackToHalls = () => {
    audioManager.play("paper_flip");
    resetInvestigation();
    setSelectedHallId(null);
  };

  return (
    <div className="space-y-5 animate-fadeInUp">
      <HeaderCard completedCount={investigationCasesCompleted} />

      {investigationPhase === "hallSelect" && (
        <HallSelectStage
          selectedHallId={selectedHallId}
          onSelect={handleSelectHall}
          onConfirm={handleConfirmHall}
        />
      )}

      {investigationPhase === "briefing" && investigationCurrentCase && (
        <BriefingStage
          caseData={investigationCurrentCase}
          hall={currentHall!}
          onStart={handleStartExploring}
        />
      )}

      {investigationPhase === "exploring" && investigationCurrentCase && currentHall && (
        <ExploringStage
          caseData={investigationCurrentCase}
          hall={currentHall}
          unlockedClueIds={investigationUnlockedClueIds}
          activeClueId={investigationActiveClueId}
          viewerFocus={investigationViewerFocus}
          zoomedPaintingId={investigationZoomedPaintingId}
          showClueDetail={showClueDetail}
          setShowClueDetail={setShowClueDetail}
          onClueClick={handleClueClick}
          onPaintingClick={handlePaintingClick}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onClosePainting={() => setInvestigationZoomedPainting(null)}
          onViewerMouseDown={handleViewerMouseDown}
          onViewerMouseMove={handleViewerMouseMove}
          onViewerMouseUp={handleViewerMouseUp}
          onGoToQuestions={handleGoToQuestions}
          onSetActiveClue={setInvestigationActiveClue}
          panning={panning}
          viewerRef={viewerRef}
        />
      )}

      {investigationPhase === "questioning" && investigationCurrentCase && (
        <QuestioningStage
          caseData={investigationCurrentCase}
          currentQuestionIndex={investigationCurrentQuestionIndex}
          answers={investigationAnswers}
          onSubmit={handleSubmitAnswer}
          onNext={handleNextQuestion}
          unlockedClueIds={investigationUnlockedClueIds}
        />
      )}

      {investigationPhase === "report" && investigationCurrentCase && (
        <ReportStage
          caseData={investigationCurrentCase}
          answers={investigationAnswers}
          unlockedClueIds={investigationUnlockedClueIds}
          scoreDelta={investigationScoreDelta}
          bonus={investigationBonus}
          totalScore={totalScore}
          streak={streak}
          onNextCase={handleNextCase}
          onBackToHalls={handleBackToHalls}
        />
      )}
    </div>
  );
}

function HeaderCard({ completedCount }: { completedCount: number }) {
  return (
    <div className="file-card overflow-hidden">
      <div className="px-5 py-4 border-b border-teal-900/20 bg-gradient-to-r from-teal-900/10 via-teal-700/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-900/20 border border-teal-700/40 flex items-center justify-center">
            <Compass size={18} className="text-teal-800" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                艺术现场调查
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-serif bg-teal-900/20 text-teal-800 rounded-sm uppercase tracking-wider">
                Scene Investigation
              </span>
            </div>
            <p className="text-xs text-ink/50 font-serif mt-0.5">
              走进虚拟展厅 · 探索收集线索 · 推理做出判断
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-lg font-bold text-teal-800 tabular-nums">
              {completedCount}
            </div>
            <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
              Cases Solved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HallSelectStage({
  selectedHallId,
  onSelect,
  onConfirm,
}: {
  selectedHallId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card p-5">
        <div className="flex items-start gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-full bg-teal-900/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={14} className="text-teal-800" />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-ink mb-1">
              选择调查展厅
            </div>
            <p className="text-sm text-ink/60 font-serif leading-relaxed">
              每个展厅都有独特的艺术主题。选择一个展厅，开始你的现场调查之旅。
              仔细观察每一幅画作、每一张展签，甚至展厅环境中的隐藏细节——它们都是破案的关键线索。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXHIBITION_HALLS.map((hall) => {
            const isActive = selectedHallId === hall.id;
            return (
              <button
                key={hall.id}
                onClick={() => onSelect(hall.id)}
                onMouseEnter={() => audioManager.play("option_hover")}
                className={`relative group p-5 rounded-sm border-2 text-left transition-all overflow-hidden ${
                  isActive
                    ? "border-teal-700 bg-teal-900/5 shadow-lg scale-[1.01]"
                    : "border-ink/10 bg-white/60 hover:border-teal-900/30 hover:bg-teal-900/5"
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${hall.backgroundColor}20 0%, transparent 100%)`
                    : undefined,
                }}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
                <div
                  className="w-full h-28 rounded-sm mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: hall.backgroundColor }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `repeating-linear-gradient(
                        ${hall.floorPattern === "parquet"
                          ? "45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px"
                          : hall.floorPattern === "marble"
                          ? "0deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.2) 100%"
                          : "0deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px"
                        }
                      )`,
                    }}
                  />
                  <Frame
                    size={40}
                    className="relative z-10"
                    style={{ color: hall.accentColor }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {hall.name}
                  </h3>
                </div>
                <p className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-2">
                  {hall.nameEn}
                </p>
                <p className="text-xs text-ink/60 font-serif leading-relaxed">
                  {hall.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-ink/5 text-ink/60 rounded-sm font-serif">
                    🎨 {hall.theme}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!selectedHallId}
        className="w-full group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 disabled:bg-ink/20 disabled:cursor-not-allowed text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <Search size={18} />
          进入展厅 · 开始调查
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

function BriefingStage({
  caseData,
  hall,
  onStart,
}: {
  caseData: InvestigationCase;
  hall: ExhibitionHall;
  onStart: () => void;
}) {
  const difficultyLabel = { normal: "常规", hard: "困难" };
  const difficultyColor = { normal: "text-emerald-700", hard: "text-amber-600" };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div
          className="px-5 py-3 border-b border-ink/10 flex items-center gap-2"
          style={{ backgroundColor: `${hall.accentColor}10` }}
        >
          <BookOpen size={14} style={{ color: hall.accentColor }} />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            案件简报 · Case File
          </h3>
          <span
            className={`text-[10px] ml-auto font-serif font-semibold ${difficultyColor[caseData.difficulty]}`}
          >
            难度：{difficultyLabel[caseData.difficulty]}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${hall.accentColor}20` }}
            >
              <ScrollTextIcon color={hall.accentColor} />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink">
                《{caseData.title}》
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                Case #{caseData.id.toUpperCase()} · {hall.name}
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-sm border mb-4"
            style={{
              backgroundColor: `${hall.accentColor}08`,
              borderColor: `${hall.accentColor}20`,
            }}
          >
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {caseData.caseBriefing}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5 text-center">
              <div className="text-2xl mb-1">🖼️</div>
              <div className="font-display text-lg font-bold text-ink tabular-nums">
                {caseData.artworks.length}
              </div>
              <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
                Artworks
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5 text-center">
              <div className="text-2xl mb-1">🔍</div>
              <div className="font-display text-lg font-bold text-ink tabular-nums">
                {caseData.clues.length}
              </div>
              <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
                Clues
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5 text-center">
              <div className="text-2xl mb-1">❓</div>
              <div className="font-display text-lg font-bold text-ink tabular-nums">
                {caseData.questions.length}
              </div>
              <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
                Questions
              </div>
            </div>
          </div>

          <div
            className="flex items-start gap-2 p-3 rounded-sm border"
            style={{
              backgroundColor: `${hall.accentColor}08`,
              borderColor: `${hall.accentColor}20`,
            }}
          >
            <Lightbulb size={14} style={{ color: hall.accentColor }} className="mt-0.5 flex-shrink-0" />
            <div>
              <div
                className="text-[11px] font-semibold font-serif mb-0.5"
                style={{ color: hall.accentColor }}
              >
                调查守则
              </div>
              <p className="text-xs text-ink/60 font-serif leading-relaxed">
                基础分 150 分，每解锁一条线索扣 8 分。全对可获得 +40 分奖励；
                探索率 ≥80% 且全对额外 +30 分；线索使用率 ≤40% 且全对额外 +25 分。
                在展厅中拖动鼠标可以「走动」，使用缩放按钮可以「放大观察」。
                点击画作查看细节，点击闪烁的热点收集线索！
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full group relative py-4 px-6 rounded-sm text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        style={{ backgroundColor: hall.accentColor }}
      >
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
          <Eye size={18} />
          进入展厅 · 开始探索
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

function ExploringStage({
  caseData,
  hall,
  unlockedClueIds,
  activeClueId,
  viewerFocus,
  zoomedPaintingId,
  showClueDetail,
  setShowClueDetail,
  onClueClick,
  onPaintingClick,
  onZoomIn,
  onZoomOut,
  onResetView,
  onClosePainting,
  onViewerMouseDown,
  onViewerMouseMove,
  onViewerMouseUp,
  onGoToQuestions,
  onSetActiveClue,
  panning,
  viewerRef,
}: {
  caseData: InvestigationCase;
  hall: ExhibitionHall;
  unlockedClueIds: string[];
  activeClueId: string | null;
  viewerFocus: { x: number; y: number; zoom: number };
  zoomedPaintingId: string | null;
  showClueDetail: ExhibitionClue | null;
  setShowClueDetail: (clue: ExhibitionClue | null) => void;
  onClueClick: (clue: ExhibitionClue) => void;
  onPaintingClick: (artwork: ExhibitionArtwork) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onClosePainting: () => void;
  onViewerMouseDown: (e: React.MouseEvent) => void;
  onViewerMouseMove: (e: React.MouseEvent) => void;
  onSetActiveClue: (id: string | null) => void;
  onViewerMouseUp: () => void;
  onGoToQuestions: () => void;
  panning: boolean;
  viewerRef: React.RefObject<HTMLDivElement>;
}) {
  const zoomedPainting = useMemo(() => {
    if (!zoomedPaintingId) return null;
    return paintings.find((p) => p.id === zoomedPaintingId) || null;
  }, [zoomedPaintingId]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-4">
          <div className="file-card overflow-hidden">
            <div
              className="px-4 py-2.5 border-b border-ink/10 flex items-center gap-2"
              style={{ backgroundColor: `${hall.accentColor}10` }}
            >
              <MapPin size={13} style={{ color: hall.accentColor }} />
              <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
                {hall.name} · Virtual Tour
              </h4>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={onZoomOut}
                  className="w-7 h-7 rounded-sm bg-white/60 border border-ink/10 flex items-center justify-center hover:bg-white transition-colors"
                  title="缩小"
                >
                  <ZoomOut size={13} className="text-ink/60" />
                </button>
                <div className="text-[10px] text-ink/50 font-mono w-12 text-center tabular-nums">
                  {Math.round(viewerFocus.zoom * 100)}%
                </div>
                <button
                  onClick={onZoomIn}
                  className="w-7 h-7 rounded-sm bg-white/60 border border-ink/10 flex items-center justify-center hover:bg-white transition-colors"
                  title="放大"
                >
                  <ZoomIn size={13} className="text-ink/60" />
                </button>
                <button
                  onClick={onResetView}
                  className="w-7 h-7 rounded-sm bg-white/60 border border-ink/10 flex items-center justify-center hover:bg-white transition-colors ml-1"
                  title="重置视图"
                >
                  <RefreshCw size={12} className="text-ink/60" />
                </button>
              </div>
            </div>

            <div
              ref={viewerRef}
              className={`relative w-full overflow-hidden select-none ${
                panning ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                backgroundColor: hall.wallColor,
                aspectRatio: "16 / 10",
                touchAction: "none",
              }}
              onMouseDown={onViewerMouseDown}
              onMouseMove={onViewerMouseMove}
              onMouseUp={onViewerMouseUp}
              onMouseLeave={onViewerMouseUp}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `repeating-linear-gradient(
                    ${hall.floorPattern === "parquet"
                      ? "45deg, transparent, transparent 30px, rgba(0,0,0,0.06) 30px, rgba(0,0,0,0.06) 60px"
                      : hall.floorPattern === "marble"
                      ? "0deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.1) 100%"
                      : "0deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 80px"
                    }
                  )`,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(255,255,255,0.25) 0%, transparent 60%)",
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  transform: `translate(calc(50% - ${viewerFocus.x}%), calc(50% - ${viewerFocus.y}%)) scale(${viewerFocus.zoom})`,
                  transformOrigin: "center center",
                  transition: panning ? "none" : "transform 0.3s ease-out",
                }}
              >
                <div className="absolute w-full h-full">
                  {hall.id === "paris_impressionism" && (
                    <>
                      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[8%] bg-gradient-to-b from-sky-200/60 to-transparent rounded-b-full border-x border-b border-white/30" />
                    </>
                  )}
                  {hall.id === "surrealism" && (
                    <>
                      <div className="absolute top-[5%] left-[10%] text-2xl opacity-30 animate-float">🕐</div>
                      <div className="absolute top-[8%] right-[15%] text-xl opacity-25 animate-float" style={{ animationDelay: "1s" }}>👁️</div>
                      <div className="absolute bottom-[15%] left-[5%] text-2xl opacity-20 animate-float" style={{ animationDelay: "2s" }}>🌀</div>
                    </>
                  )}

                  {caseData.artworks.map((artwork) => {
                    const painting = paintings.find((p) => p.id === artwork.paintingId);
                    if (!painting) return null;
                    return (
                      <button
                        key={artwork.paintingId}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPaintingClick(artwork);
                        }}
                        className="absolute group transition-all duration-200 hover:scale-105 hover:z-20"
                        style={{
                          left: `${artwork.position.x}%`,
                          top: `${artwork.position.y}%`,
                          width: `${artwork.size.w}%`,
                          height: `${artwork.size.h}%`,
                          transform: `rotate(${artwork.rotation || 0}deg)`,
                        }}
                      >
                        <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 rounded-sm shadow-lg" />
                        <div className="absolute -inset-1 bg-gradient-to-br from-stone-700 via-stone-500 to-stone-700 rounded-sm" />
                        <div className="relative w-full h-full overflow-hidden rounded-sm">
                          <img
                            src={painting.imageUrl}
                            alt={painting.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                        </div>
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="px-2 py-1 bg-black/80 text-white text-[9px] font-serif rounded-sm">
                            🖼️ 点击查看
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {caseData.clues.map((clue) => {
                    const isUnlocked = unlockedClueIds.includes(clue.id);
                    const isActive = activeClueId === clue.id;
                    return (
                      <button
                        key={clue.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onClueClick(clue);
                        }}
                        onMouseEnter={() => audioManager.play("option_hover")}
                        className={`absolute group flex items-center justify-center transition-all duration-300 ${
                          isActive ? "z-30 scale-125" : "z-10 hover:scale-110"
                        }`}
                        style={{
                          left: `${clue.position.x}%`,
                          top: `${clue.position.y}%`,
                        }}
                      >
                        {isUnlocked ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 transition-all ${
                              isActive
                                ? "bg-white border-teal-600"
                                : "bg-emerald-50 border-emerald-600"
                            }`}
                          >
                            <span className="text-sm">{clue.icon}</span>
                          </div>
                        ) : (
                          <div className="relative">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                              style={{
                                backgroundColor: `${hall.accentColor}20`,
                                border: `2px dashed ${hall.accentColor}80`,
                              }}
                            >
                              <Search
                                size={14}
                                style={{ color: hall.accentColor }}
                              />
                            </div>
                            <div
                              className="absolute inset-0 rounded-full animate-ping opacity-40"
                              style={{ backgroundColor: hall.accentColor }}
                            />
                          </div>
                        )}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                          <div
                            className="px-2 py-1 text-white text-[9px] font-serif rounded-sm whitespace-nowrap"
                            style={{ backgroundColor: hall.accentColor }}
                          >
                            {isUnlocked ? clue.title : clue.hintText}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm">
                <Move size={11} className="text-white/70" />
                <span className="text-[9px] text-white/70 font-serif">
                  拖动浏览 · 点击画作和热点
                </span>
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm">
                <Layers size={11} className="text-white/70" />
                <span className="text-[9px] text-white/70 font-mono tabular-nums">
                  {unlockedClueIds.length}/{caseData.clues.length} 线索
                </span>
              </div>
            </div>
          </div>

          <div className="file-card p-4 animate-fadeInUp">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-ink/40 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-ink/60 font-serif leading-relaxed">
                  已收集 <span className="font-bold text-teal-700">{unlockedClueIds.length}</span> / {caseData.clues.length} 条线索。
                  {unlockedClueIds.length >= Math.ceil(caseData.clues.length * 0.5)
                    ? " 线索收集过半，可以开始答题了！收集更多线索会让推理更准确。"
                    : " 继续探索展厅，寻找更多隐藏的线索吧。"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onGoToQuestions}
            className="w-full group relative py-4 px-6 rounded-sm text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
            style={{ backgroundColor: hall.accentColor }}
          >
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
              <Star size={18} />
              收集完毕 · 开始推理判断
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>
        </div>

        <div className="space-y-4 self-start lg:sticky lg:top-6">
          <ClueCollectionPanel
            caseData={caseData}
            unlockedClueIds={unlockedClueIds}
            activeClueId={activeClueId}
            accentColor={hall.accentColor}
            onSetShowClueDetail={setShowClueDetail}
            onSetActiveClue={onSetActiveClue}
          />

          <div
            className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp"
          >
            <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
              <span style={{ color: hall.accentColor }}>📋</span>
              <span>调查守则</span>
            </div>
            <p>· 基础分 <span style={{ color: hall.accentColor }} className="font-bold">150 分</span>，每条线索扣 <span className="text-terracotta font-semibold">8 分</span></p>
            <p>· 全对奖励 <span className="text-gold font-bold">+40 分</span></p>
            <p>· 探索率≥80%且全对 <span className="text-gold font-bold">+30 分</span></p>
            <p>· 线索使用率≤40%且全对 <span className="text-gold font-bold">+25 分</span></p>
            <div className="pt-2 mt-2 border-t border-ink/10 flex items-center gap-2 text-[10px] text-ink/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full animate-markerPulse" style={{ backgroundColor: hall.accentColor }} />
              <span className="typewriter-font uppercase tracking-widest">Investigation in Progress</span>
            </div>
          </div>
        </div>
      </div>

      {showClueDetail && (
        <ClueDetailModal
          clue={showClueDetail}
          isNewlyUnlocked={!unlockedClueIds.includes(showClueDetail.id) || activeClueId === showClueDetail.id}
          accentColor={hall.accentColor}
          onClose={() => {
            setShowClueDetail(null);
            onSetActiveClue(null);
          }}
        />
      )}

      {zoomedPainting && (
        <PaintingZoomModal
          painting={zoomedPainting}
          accentColor={hall.accentColor}
          onClose={onClosePainting}
        />
      )}
    </div>
  );
}

function ClueCollectionPanel({
  caseData,
  unlockedClueIds,
  activeClueId,
  accentColor,
  onSetShowClueDetail,
  onSetActiveClue,
}: {
  caseData: InvestigationCase;
  unlockedClueIds: string[];
  activeClueId: string | null;
  accentColor: string;
  onSetShowClueDetail: (clue: ExhibitionClue | null) => void;
  onSetActiveClue: (id: string | null) => void;
}) {
  return (
    <div className="file-card overflow-hidden animate-fadeInUp">
      <div
        className="px-4 py-2.5 border-b border-ink/10 flex items-center gap-2"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <Layers size={13} style={{ color: accentColor }} />
        <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
          线索收集 · Evidence
        </h4>
        <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
          {unlockedClueIds.length} / {caseData.clues.length}
        </span>
      </div>
      <div className="p-3 space-y-2 max-h-[480px] overflow-y-auto scrollbar-thin">
        {caseData.clues.map((clue, idx) => {
          const isUnlocked = unlockedClueIds.includes(clue.id);
          const isActive = activeClueId === clue.id;
          return (
            <div key={clue.id} style={{ animationDelay: `${idx * 40}ms` }} className="animate-fadeInUp">
              {isUnlocked ? (
                <button
                  onClick={() => {
                    onSetShowClueDetail(clue);
                    onSetActiveClue(clue.id);
                  }}
                  className={`w-full text-left rounded-sm border overflow-hidden transition-all ${
                    isActive
                      ? `border-teal-700/40 bg-teal-900/[0.08]`
                      : "border-ink/10 bg-ink/[0.03] hover:bg-ink/[0.06]"
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full`} style={{ backgroundColor: accentColor }} />
                  <div className="flex items-start gap-2.5 px-3 py-2.5 pl-4 relative">
                    <div className="text-lg leading-none flex-shrink-0">{clue.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-ink/80 tracking-wide">
                          {clue.title}
                        </span>
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-sm font-serif uppercase tracking-wider"
                          style={{
                            backgroundColor:
                              clue.type === "label"
                                ? "#dbeafe20"
                                : clue.type === "hidden"
                                ? "#fef3c720"
                                : "#d1fae520",
                            color:
                              clue.type === "label"
                                ? "#2563eb"
                                : clue.type === "hidden"
                                ? "#b45309"
                                : "#047857",
                          }}
                        >
                          {clue.type === "label" ? "展签" : clue.type === "hidden" ? "隐藏" : "环境"}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink/50 font-serif mt-0.5 line-clamp-2 leading-snug">
                        {clue.description}
                      </p>
                    </div>
                    <Unlock size={11} className="flex-shrink-0 mt-1 text-emerald-600" />
                  </div>
                </button>
              ) : (
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-sm border border-dashed border-ink/15 bg-white/40">
                  <div className="w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock size={10} className="text-ink/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-ink/30 font-serif">??? · 未发现的线索</div>
                    <p className="text-[10px] text-ink/25 font-serif mt-0.5 italic">
                      {clue.hintText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClueDetailModal({
  clue,
  isNewlyUnlocked,
  accentColor,
  onClose,
}: {
  clue: ExhibitionClue;
  isNewlyUnlocked: boolean;
  accentColor: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInScale"
      onClick={onClose}
    >
      <div
        className={`relative max-w-lg w-full animate-cameraPanIn ${isNewlyUnlocked ? "animate-paperUnfurl" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={18} className="text-ink" />
        </button>

        <div className="file-card overflow-hidden">
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${accentColor}25` }}
            >
              {clue.icon}
            </div>
            <div className="flex-1">
              <div className="font-display text-lg font-bold text-ink">
                {clue.title}
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
                {clue.titleEn}
              </div>
            </div>
            <span
              className="text-[10px] px-2 py-1 rounded-sm font-serif uppercase tracking-wider"
              style={{
                backgroundColor:
                  clue.type === "label"
                    ? "#dbeafe40"
                    : clue.type === "hidden"
                    ? "#fef3c740"
                    : "#d1fae540",
                color:
                  clue.type === "label"
                    ? "#2563eb"
                    : clue.type === "hidden"
                    ? "#b45309"
                    : "#047857",
              }}
            >
              {clue.type === "label" ? "展签线索" : clue.type === "hidden" ? "隐藏线索" : "环境线索"}
            </span>
          </div>
          <div className="p-5">
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {clue.description}
            </p>
            {isNewlyUnlocked && (
              <div
                className="mt-4 flex items-center gap-2 p-3 rounded-sm border"
                style={{
                  backgroundColor: `${accentColor}08`,
                  borderColor: `${accentColor}30`,
                }}
              >
                <Sparkles size={14} style={{ color: accentColor }} />
                <span
                  className="text-xs font-semibold font-serif"
                  style={{ color: accentColor }}
                >
                  线索已记录！仔细记住这些信息，它们可能是推理的关键。
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaintingZoomModal({
  painting,
  accentColor,
  onClose,
}: {
  painting: any;
  accentColor: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInScale"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] w-full animate-cameraPanIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={20} className="text-ink" />
        </button>

        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 rounded-sm opacity-90" />
          <div className="absolute -inset-2 bg-gradient-to-br from-stone-700 via-stone-500 to-stone-700 rounded-sm" />
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="max-w-full max-h-[70vh] mx-auto object-contain ken-burns"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/8 via-transparent to-black/15" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white">
            《{painting.title}》
          </h3>
          <p className="mt-1 text-sm text-white/60 italic font-serif">{painting.titleEn}</p>
          <p className="mt-1 text-xs text-white/50 font-serif">
            {painting.artist} · {painting.year} · {painting.movement}
          </p>
          <div className="mt-3 text-center text-white/40 text-[10px] typewriter-font uppercase tracking-[0.3em]">
            放大镜模式 · Magnifying Glass
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestioningStage({
  caseData,
  currentQuestionIndex,
  answers,
  onSubmit,
  onNext,
  unlockedClueIds,
}: {
  caseData: InvestigationCase;
  currentQuestionIndex: number;
  answers: ReturnType<typeof useGameStore.getState>["investigationAnswers"];
  onSubmit: (qid: string, oid: string) => void;
  onNext: () => void;
  unlockedClueIds: string[];
}) {
  const currentQuestion = caseData.questions[currentQuestionIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const hasAnswered = !!currentAnswer;
  const progress = ((currentQuestionIndex + (hasAnswered ? 1 : 0)) / caseData.questions.length) * 100;

  if (!currentQuestion) return null;

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2">
          <Star size={14} className="text-gold" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            推理判断 · Reasoning
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-28 h-1.5 bg-ink/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-ink/50 font-mono tabular-nums">
              {currentQuestionIndex + 1}/{caseData.questions.length}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-1.5">
              Question {currentQuestionIndex + 1}
            </div>
            <div className="font-display text-lg font-bold text-ink leading-relaxed">
              {currentQuestion.question}
            </div>
            <div className="text-[10px] text-ink/30 font-serif uppercase tracking-wider mt-1">
              {currentQuestion.questionEn}
            </div>
          </div>

          {currentQuestion.requiredClueIds.length > 0 && (
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
                相关线索：
              </span>
              {currentQuestion.requiredClueIds.map((cid) => {
                const isUnlocked = unlockedClueIds.includes(cid);
                const clue = caseData.clues.find((c) => c.id === cid);
                return (
                  <span
                    key={cid}
                    className={`text-[10px] px-2 py-0.5 rounded-sm font-serif ${
                      isUnlocked
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {isUnlocked ? "✓" : "✗"} {clue?.title || cid}
                  </span>
                );
              })}
            </div>
          )}

          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = currentAnswer?.selectedOptionId === opt.id;
              let optClass = "bg-white/60 border-ink/10 hover:bg-teal-900/5 hover:border-teal-900/30 hover:text-ink text-ink/70";
              if (hasAnswered) {
                if (opt.isCorrect) {
                  optClass = "bg-emerald-50 border-emerald-400 text-emerald-800";
                } else if (isSelected && !opt.isCorrect) {
                  optClass = "bg-rose-50 border-rose-400 text-rose-700";
                } else {
                  optClass = "bg-white/40 border-ink/10 text-ink/40";
                }
              } else if (isSelected) {
                optClass = "bg-teal-900/8 border-teal-700/50 text-ink";
              }
              return (
                <button
                  key={opt.id}
                  onClick={() => !hasAnswered && onSubmit(currentQuestion.id, opt.id)}
                  onMouseEnter={() => !hasAnswered && audioManager.play("option_hover")}
                  disabled={hasAnswered}
                  className={`w-full group relative overflow-hidden rounded-sm border-2 text-left p-4 transition-all ${optClass}`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold font-mono ${
                        hasAnswered && opt.isCorrect
                          ? "bg-emerald-600 text-white"
                          : hasAnswered && isSelected && !opt.isCorrect
                          ? "bg-rose-500 text-white"
                          : isSelected
                          ? "bg-teal-700 text-white"
                          : "bg-ink/5 text-ink/50"
                      }`}
                    >
                      {hasAnswered && opt.isCorrect ? (
                        <Check size={16} />
                      ) : hasAnswered && isSelected && !opt.isCorrect ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span className="font-display text-base font-medium flex-1">
                      {opt.label}
                    </span>
                    {!hasAnswered && (
                      <ChevronRight
                        size={18}
                        className="text-ink/20 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div
              className={`mt-5 p-4 rounded-sm border animate-fadeInUp ${
                currentAnswer?.isCorrect
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-rose-50 border-rose-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                {currentAnswer?.isCorrect ? (
                  <Check size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle size={18} className="text-rose-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div
                    className={`font-display text-base font-bold ${
                      currentAnswer?.isCorrect ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {currentAnswer?.isCorrect ? "推理正确！" : "推理有误"}
                  </div>
                  <p className="text-sm text-ink/70 font-serif mt-1 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasAnswered && currentQuestionIndex < caseData.questions.length - 1 && (
        <button
          onClick={onNext}
          className="w-full group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        >
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)",
              }}
            />
          </span>
          <span className="relative flex items-center gap-2">
            下一题
            <ArrowRight
              size={20}
              strokeWidth={2.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </button>
      )}

      {hasAnswered && currentQuestionIndex >= caseData.questions.length - 1 && (
        <div className="text-center p-4 animate-fadeInUp">
          <p className="text-sm text-ink/50 font-serif">正在生成调查报告...</p>
        </div>
      )}
    </div>
  );
}

function ReportStage({
  caseData,
  answers,
  unlockedClueIds,
  scoreDelta,
  bonus,
  totalScore,
  streak,
  onNextCase,
  onBackToHalls,
}: {
  caseData: InvestigationCase;
  answers: ReturnType<typeof useGameStore.getState>["investigationAnswers"];
  unlockedClueIds: string[];
  scoreDelta: number;
  bonus: number;
  totalScore: number;
  streak: number;
  onNextCase: () => void;
  onBackToHalls: () => void;
}) {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = caseData.questions.length;
  const allCorrect = correctCount === totalQuestions;
  const explorerRate = unlockedClueIds.length / caseData.clues.length;

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div
        className={`relative overflow-hidden file-card ${
          allCorrect ? "" : "animate-shake"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-20 ${
            allCorrect
              ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />
        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                allCorrect ? "bg-emerald-600 animate-glowPulse" : "bg-terracotta"
              }`}
            >
              {allCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <AlertTriangle size={28} strokeWidth={3} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-display text-2xl md:text-3xl font-bold ${
                  allCorrect ? "text-success-deep" : "text-error-deep"
                }`}
              >
                {allCorrect ? "调查成功！" : "调查存在偏差"}
              </div>
              <div className="mt-1.5 text-sm font-serif text-ink/60">
                《{caseData.title}》· 正确率 {correctCount}/{totalQuestions}
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <span
                  className={`font-display text-xl font-bold tabular-nums ${
                    scoreDelta >= 0 ? "text-gold" : "text-terracotta"
                  } animate-scorePop`}
                >
                  {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta}
                </span>
                {bonus > 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-gold/15 text-gold rounded-sm font-serif">
                    奖励 +{bonus}
                  </span>
                )}
                {streak >= 2 && allCorrect && (
                  <span className="text-[11px] text-orange-700 font-serif flex items-center gap-1">
                    <Sparkles size={12} />
                    连续成功 {streak} 次
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="file-card p-4 text-center">
          <div className="text-2xl mb-1">🔍</div>
          <div className="font-display text-xl font-bold text-ink tabular-nums">
            {unlockedClueIds.length}/{caseData.clues.length}
          </div>
          <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
            线索探索率
          </div>
          <div className="mt-1.5 h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full"
              style={{ width: `${explorerRate * 100}%` }}
            />
          </div>
        </div>
        <div className="file-card p-4 text-center">
          <div className="text-2xl mb-1">✅</div>
          <div className="font-display text-xl font-bold text-ink tabular-nums">
            {correctCount}/{totalQuestions}
          </div>
          <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
            推理正确率
          </div>
          <div className="mt-1.5 h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <div className="file-card p-4 text-center">
          <div className="text-2xl mb-1">💎</div>
          <div className="font-display text-xl font-bold text-ink tabular-nums">
            {bonus}
          </div>
          <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
            奖励分数
          </div>
        </div>
        <div className="file-card p-4 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="font-display text-xl font-bold text-gold tabular-nums">
            {totalScore.toLocaleString()}
          </div>
          <div className="text-[9px] text-ink/40 font-serif uppercase tracking-wider">
            总分
          </div>
        </div>
      </div>

      <div className="file-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <ScrollTextIcon color="#0f766e" />
          <h3 className="font-display text-base font-bold text-ink">
            案件结论
          </h3>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed font-serif">
          {caseData.caseConclusion}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={onBackToHalls}
          className="group relative py-4 px-6 rounded-sm border-2 border-ink/15 bg-white/60 hover:bg-ink/5 text-ink/70 hover:text-ink font-serif font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Compass size={16} />
          返回展厅选择
        </button>
        <button
          onClick={onNextCase}
          className="w-full group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)",
              }}
            />
          </span>
          <span className="relative flex items-center gap-2">
            <RefreshCw size={18} />
            调查下一案件
            <ArrowRight
              size={20}
              strokeWidth={2.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </button>
      </div>
    </div>
  );
}

function ScrollTextIcon({ color = "#0f766e" }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </svg>
  );
}