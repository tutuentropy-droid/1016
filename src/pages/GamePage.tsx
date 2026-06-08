import { useCallback, useEffect } from "react";
import { Search, Volume2, VolumeX, BookOpen, Network, Gamepad2, TrendingUp, User, Gavel, Target, Palette, Hammer } from "lucide-react";
import ScoreBoard from "@/components/ScoreBoard";
import PaintingCard from "@/components/PaintingCard";
import OptionButton from "@/components/OptionButton";
import FeedbackPanel from "@/components/FeedbackPanel";
import CluePanel from "@/components/CluePanel";
import ConfidenceSelector from "@/components/ConfidenceSelector";
import InvestigationTimeline from "@/components/InvestigationTimeline";
import AmbientEffects from "@/components/AmbientEffects";
import HomeWallBackground from "@/components/HomeWallBackground";
import CinematicOpening from "@/components/CinematicOpening";
import CaseBriefing from "@/components/CaseBriefing";
import CollectionPanel from "@/components/CollectionPanel";
import ArtRelationshipGraph from "@/components/ArtRelationshipGraph";
import DailyTheme from "@/components/DailyTheme";
import StyleEvolutionPanel from "@/components/StyleEvolutionPanel";
import ForgeryPanel from "@/components/ForgeryPanel";
import StyleConfusionCamp from "@/components/StyleConfusionCamp";
import MuseumCuratorPanel from "@/components/MuseumCuratorPanel";
import TheftPanel from "@/components/TheftPanel";
import AuctionPanel from "@/components/AuctionPanel";
import { useGameStore, type AppPage, type GameMode } from "@/store/useGameStore";
import { audioManager } from "@/utils/audioManager";
import { useState } from "react";

const NAV_ITEMS: { id: AppPage; label: string; en: string; icon: typeof Gamepad2 }[] = [
  { id: "game", label: "调查案件", en: "Investigation", icon: Gamepad2 },
  { id: "collection", label: "我的画廊", en: "Collection", icon: BookOpen },
  { id: "graph", label: "关系图谱", en: "Network", icon: Network },
];

const MODE_ITEMS: { id: GameMode; label: string; en: string; icon: typeof Gamepad2; desc: string }[] = [
  { id: "standard", label: "艺术家鉴定", en: "Artist Detection", icon: User, desc: "经典模式：根据画作特征锁定艺术家" },
  { id: "evolution", label: "风格进化追踪", en: "Style Evolution", icon: TrendingUp, desc: "进阶模式：理解同一艺术家不同阶段的风格演变" },
  { id: "forgery", label: "真假伪作鉴定", en: "Forgery Investigation", icon: Gavel, desc: "专家模式：紫外线、颜料分析、档案比对，判断真迹或伪作" },
  { id: "confusionCamp", label: "风格混淆训练营", en: "Style Confusion Camp", icon: Target, desc: "专家模式：分辨极易混淆的艺术家，掌握关键差异点" },
  { id: "curator", label: "博物馆策展", en: "Museum Curator", icon: Palette, desc: "审美表达：策划主题展览，布局作品，撰写策展说明" },
  { id: "theft", label: "失窃名画追踪", en: "Stolen Art Tracking", icon: Search, desc: "侦探模式：追查失窃名作，地图追踪·时间线推进·锁定真迹" },
  { id: "auction", label: "艺术拍卖会", en: "Art Auction House", icon: Hammer, desc: "投资模式：有限预算竞拍，AI对手抢拍，市场事件影响价值" },
];

function GameContent() {
  const {
    nextQuestion,
    options,
    isAnswered,
    currentPainting,
    casePhase,
    setCasePhase,
    generateDailyTheme,
    gameMode,
    setGameMode,
    startEvolutionCase,
    evolutionArtist,
    startForgeryCase,
    forgeryCurrentCase,
    resetCamp,
    campCurrentCombination,
    campPhase,
    resetCurator,
    startTheftCase,
    theftCurrentCase,
    theftPhase,
    theftCasesCompleted,
    resetAuction,
    auctionPhase,
    auctionCurrentLotIndex,
    auctionPaintings,
    auctionSettlement,
  } = useGameStore();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleOpeningComplete = useCallback(() => {
    setCasePhase("briefing");
  }, [setCasePhase]);

  const handleBriefingComplete = useCallback(() => {
    setCasePhase("investigating");
  }, [setCasePhase]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioManager.setEnabled(next);
  };

  useEffect(() => {
    nextQuestion();
    generateDailyTheme();
  }, [nextQuestion, generateDailyTheme]);

  useEffect(() => {
    if (gameMode === "evolution" && !evolutionArtist) {
      startEvolutionCase();
    }
    if (gameMode === "forgery" && !forgeryCurrentCase) {
      startForgeryCase();
    }
    if (gameMode === "theft" && !theftCurrentCase) {
      startTheftCase();
    }
  }, [gameMode, evolutionArtist, forgeryCurrentCase, theftCurrentCase, startEvolutionCase, startForgeryCase, startTheftCase]);

  const handleModeSwitch = (mode: GameMode) => {
    audioManager.play("paper_flip");
    setGameMode(mode);
    if (mode === "evolution") {
      startEvolutionCase();
    }
    if (mode === "forgery") {
      startForgeryCase();
    }
    if (mode === "confusionCamp") {
      resetCamp();
    }
    if (mode === "curator") {
      resetCurator();
    }
    if (mode === "theft") {
      startTheftCase();
    }
    if (mode === "auction") {
      resetAuction();
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-8 px-3 md:px-4 bg-paper-texture relative">
      <AmbientEffects />
      <HomeWallBackground />

      {gameMode === "standard" && casePhase === "opening" && currentPainting && (
        <CinematicOpening
          paintingId={currentPainting.id}
          onComplete={handleOpeningComplete}
        />
      )}

      {gameMode === "standard" && casePhase === "briefing" && currentPainting && (
        <CaseBriefing
          painting={currentPainting}
          options={options}
          onComplete={handleBriefingComplete}
        />
      )}

      <button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-45 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-ink/10 shadow-archive-card flex items-center justify-center hover:bg-white transition-all hover:scale-105"
        title={soundEnabled ? "关闭音效" : "开启音效"}
      >
        {soundEnabled ? (
          <Volume2 size={18} className="text-gold" />
        ) : (
          <VolumeX size={18} className="text-ink/40" />
        )}
      </button>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-6 md:mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center animate-badgeFloat">
              <Search className="text-gold" size={22} strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-wide text-shadow-soft">
              艺术侦探
            </h1>
          </div>
          <p className="text-ink/60 font-serif text-sm tracking-wider">
            Art Detective · 博物馆谜案调查
          </p>
          <div className="mt-5 w-32 h-px mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-gold animate-markerPulse" />
          </div>
          <div className="mt-3 typewriter-font text-[10px] text-ink/40 uppercase tracking-[0.4em]">
            — Bureau of Art Authentication —
          </div>
        </header>

        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-center gap-2">
            {MODE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = gameMode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleModeSwitch(item.id)}
                  className={`relative flex flex-col items-center gap-1 px-4 md:px-6 py-3 rounded-sm transition-all border-2 ${
                    isActive
                      ? "bg-gold text-white border-gold shadow-lg scale-[1.02]"
                      : "bg-white/50 text-ink/60 border-ink/10 hover:text-ink hover:border-ink/30 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span className="font-display text-sm font-semibold">{item.label}</span>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-serif ${isActive ? "text-white/70" : "text-ink/40"}`}>
                    {item.en}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-paper-texture rotate-45" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-ink/50 font-serif mt-2">
            {MODE_ITEMS.find((m) => m.id === gameMode)?.desc}
          </p>
        </div>

        {gameMode === "standard" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 md:gap-7">
          <div className="space-y-6">
            <div className="animate-fadeInUp" style={{ animationDelay: "80ms" }}>
              <ScoreBoard />
            </div>

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "140ms" }}
              key={currentPainting?.id}
            >
              <PaintingCard />
            </div>

            {!isAnswered ? (
              <div
                className="animate-fadeInUp space-y-4"
                style={{ animationDelay: "200ms" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <div className="w-1 h-4 bg-gold rounded-full" />
                    <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
                      锁定嫌疑人
                    </h3>
                    <span className="text-[10px] text-ink/40 font-serif ml-auto">
                      Suspect Lineup
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {options.map((artist, idx) => (
                      <div
                        key={artist}
                        style={{ animationDelay: `${240 + idx * 50}ms` }}
                        className="animate-fadeInUp"
                      >
                        <OptionButton artist={artist} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ animationDelay: "480ms" }} className="animate-fadeInUp">
                  <ConfidenceSelector />
                </div>
              </div>
            ) : (
              <div style={{ animationDelay: "200ms" }}>
                <FeedbackPanel />
              </div>
            )}
          </div>

          <div
            className="lg:sticky lg:top-6 space-y-5 self-start"
          >
            <DailyTheme />
            <InvestigationTimeline />
            <CluePanel />

            <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp" style={{ animationDelay: "440ms" }}>
              <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
                <span className="text-gold">📋</span>
                <span>调查守则</span>
              </div>
              <p>· 不查看线索直接答对可获得 <span className="text-gold font-bold">100 分</span></p>
              <p>· 每解锁一条线索扣除 <span className="text-terracotta font-semibold">20 分</span></p>
              <p>· 选择 <span className="text-terracotta font-semibold">高信心</span> 答对 ×1.5，答错扣分翻倍</p>
              <p>· 连续答对 <span className="text-orange-600 font-semibold">3 题以上</span> 可获得分数加成</p>
              <p>· 完成 <span className="text-gold font-semibold">今日主题</span> 相关作品可获额外加成</p>
              <div className="pt-2 mt-2 border-t border-ink/10 flex items-center gap-2 text-[10px] text-ink/40">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-markerPulse" />
                <span className="typewriter-font uppercase tracking-widest">Case in Progress</span>
              </div>
            </div>
          </div>
        </div>
        ) : gameMode === "evolution" ? (
          <div className="max-w-4xl mx-auto">
            <StyleEvolutionPanel />
          </div>
        ) : gameMode === "confusionCamp" ? (
          <div className="max-w-5xl mx-auto">
            <StyleConfusionCamp />
          </div>
        ) : gameMode === "curator" ? (
          <div className="max-w-6xl mx-auto">
            <MuseumCuratorPanel />
          </div>
        ) : gameMode === "theft" ? (
          <div className="max-w-5xl mx-auto">
            <TheftPanel />
          </div>
        ) : gameMode === "auction" ? (
          <div className="max-w-6xl mx-auto">
            <AuctionPanel />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <ForgeryPanel />
          </div>
        )}

        <footer className="mt-14 md:mt-20 text-center text-[11px] text-ink/40 font-serif space-y-1 animate-fadeInUp" style={{ animationDelay: "700ms" }}>
          <p>所有画作图片均来自公共领域（Wikimedia Commons / Google Art Project）</p>
          <p className="tracking-widest uppercase text-[10px] typewriter-font">
            {gameMode === "standard"
              ? `— Case File #${currentPainting?.id.padStart(5, "0") || "00000"} · Active —`
              : gameMode === "evolution"
              ? `— Style Evolution · ${evolutionArtist || "Investigating"} —`
              : gameMode === "confusionCamp"
              ? `— Style Camp · ${campCurrentCombination ? campCurrentCombination.titleEn : "Select Mode"} · ${campPhase.toUpperCase()} —`
              : gameMode === "curator"
              ? `— Museum Curator · Exhibition Planning —`
              : gameMode === "theft"
              ? `— Stolen Art Tracking · Case #${theftCurrentCase?.id.toUpperCase() || "000"} · ${theftPhase.toUpperCase()} · Solved: ${theftCasesCompleted} —`
              : gameMode === "auction"
              ? auctionSettlement
                ? `— Art Auction · Final Settlement · ROI: ${(auctionSettlement.returnRate * 100).toFixed(1)}% —`
                : `— Art Auction · Lot ${auctionCurrentLotIndex + 1}/${auctionPaintings.length} · ${auctionPhase.toUpperCase()} —`
              : `— Forgery Investigation · Case #${forgeryCurrentCase?.id.toUpperCase() || "000"} · Active —`}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function GamePage() {
  const { activePage, setActivePage } = useGameStore();

  return (
    <div>
      <nav className="sticky top-0 z-40 bg-paper-texture/95 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-3 md:px-4">
          <div className="flex items-center justify-center py-3 gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`relative flex items-center gap-2 px-4 md:px-5 py-2 rounded-sm transition-all ${
                    isActive
                      ? "bg-gold text-white shadow-md"
                      : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span className="font-display text-sm font-semibold hidden sm:inline">{item.label}</span>
                  <span className="text-[9px] uppercase tracking-wider font-serif hidden md:inline opacity-70">
                    {item.en}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {activePage === "game" && <GameContent />}
      {activePage === "collection" && <CollectionPanel />}
      {activePage === "graph" && <ArtRelationshipGraph />}
    </div>
  );
}
