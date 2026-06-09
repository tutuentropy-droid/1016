import { useState, useRef, useCallback, useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import {
  getAllCuratorialThemes,
  paintings,
  PAINTING_CURATORIAL_TAGS,
  CURATORIAL_TAG_LABELS,
  getAllCuratorHalls,
  getPaintingSize,
  calculatePaintingDisplayScale,
  FRAME_STYLE_LABELS,
  type CuratorHallLayout,
  type CuratorHallId,
  type CuratorPlacedArtwork,
  type FrameStyle,
} from "@/data/paintings";
import type {
  CuratorialEvaluation,
} from "@/data/paintings";
import {
  Palette,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Award,
  BarChart3,
  RotateCcw,
  Lightbulb,
  Star,
  TrendingUp,
  Target,
  BookOpen,
  GalleryHorizontal,
  ChevronRight,
  Trophy,
  Move,
  Maximize2,
  Grid3X3,
  Ruler,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

function getFrameClass(frameStyle: FrameStyle): string {
  const classMap: Record<FrameStyle, string> = {
    gold_ornate: "frame-gold-carved",
    dark_wood: "frame-dark-wood",
    white_modern: "frame-white-modern",
    silver_classic: "frame-silver-classic",
    no_frame: "frame-frameless",
  };
  return classMap[frameStyle] || "frame-gold-carved";
}

function HallSelectStage({
  onSelect,
}: {
  onSelect: (hallId: string) => void;
}) {
  const halls = getAllCuratorHalls();
  const wallClassMap: Record<string, string> = {
    classic_gallery: "hall-wall-classic",
    white_cube: "hall-wall-whitecube",
    loft_industrial: "hall-wall-loft",
    baroque_salon: "hall-wall-baroque",
    japanese_tearoom: "hall-wall-japanese",
  };
  const floorClassMap: Record<string, string> = {
    herringbone_wood: "hall-floor-herringbone",
    concrete: "hall-floor-concrete",
    marble: "hall-floor-marble",
    tatami: "hall-floor-tatami",
  };
  const baseboardClassMap: Record<string, string> = {
    classic_gallery: "baseboard-classic",
    white_cube: "baseboard-white",
    loft_industrial: "baseboard-loft",
    baroque_salon: "baseboard-classic",
    japanese_tearoom: "baseboard-japanese",
  };

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20 mb-4">
          <Grid3X3 size={16} className="text-gold" />
          <span className="font-display text-sm font-semibold text-gold">
            展馆选择
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">
          选择你的展览展厅
        </h2>
        <p className="text-sm text-ink/60 font-serif">
          不同风格的展厅拥有独特的墙面、地板和灯光效果，选择最适合你策展主题的空间
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {halls.map((hall, idx) => (
          <button
            key={hall.id}
            onClick={() => {
              audioManager.play("paper_flip");
              onSelect(hall.id);
            }}
            className="group text-left file-card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 animate-fadeInUp"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div
              className={`hall-wall relative h-40 ${wallClassMap[hall.id] || "hall-wall-classic"}`}
            >
              <div className="track-light">
                {[15, 35, 55, 75].map((pos) => (
                  <div
                    key={pos}
                    className="track-light-fixture"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
              <div className="spotlight-overlay" />
              <div className={`baseboard ${baseboardClassMap[hall.id] || "baseboard-classic"}`} />
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 px-4">
                {hall.lightStyle === "warm_track" &&
                  [25, 50, 75].map((pos, i) => (
                    <div
                      key={i}
                      className="w-6 h-8 painting-frame frame-gold-carved"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 40}, 60%, 70%) 0%, hsl(${i * 40 + 30}, 50%, 50%) 100%)`,
                      }}
                    />
                  ))}
                {hall.lightStyle === "cool_spotlight" &&
                  [30, 60].map((pos, i) => (
                    <div
                      key={i}
                      className="w-10 h-12 painting-frame frame-white-modern"
                      style={{
                        background: `linear-gradient(135deg, hsl(${200 + i * 20}, 40%, 80%) 0%, hsl(${220 + i * 20}, 30%, 60%) 100%)`,
                      }}
                    />
                  ))}
                {hall.lightStyle === "industrial_pendant" &&
                  [40, 65].map((pos, i) => (
                    <div
                      key={i}
                      className="w-8 h-10 painting-frame frame-dark-wood"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 30}, 50%, 40%) 0%, hsl(${i * 30 + 20}, 40%, 25%) 100%)`,
                      }}
                    />
                  ))}
                {hall.lightStyle === "crystal_chandelier" &&
                  [20, 45, 70].map((pos, i) => (
                    <div
                      key={i}
                      className="w-7 h-9 painting-frame frame-silver-classic"
                      style={{
                        background: `linear-gradient(135deg, hsl(${320 + i * 15}, 60%, 60%) 0%, hsl(${340 + i * 15}, 50%, 40%) 100%)`,
                      }}
                    />
                  ))}
                {hall.lightStyle === "paper_lantern" &&
                  [35, 60].map((pos, i) => (
                    <div
                      key={i}
                      className="w-9 h-11 painting-frame frame-frameless"
                      style={{
                        background: `linear-gradient(135deg, hsl(${40 + i * 10}, 70%, 85%) 0%, hsl(${50 + i * 10}, 60%, 70%) 100%)`,
                      }}
                    />
                  ))}
              </div>
            </div>
            <div
              className={`hall-floor h-10 ${floorClassMap[hall.floorStyle] || "hall-floor-herringbone"}`}
            />
            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-2xl">{hall.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-gold transition-colors">
                    {hall.name}
                  </h3>
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider font-serif">
                    {hall.nameEn}
                  </p>
                </div>
              </div>
              <p className="text-xs text-ink/60 font-serif leading-relaxed mb-3">
                {hall.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-ink/10">
                <div className="flex items-center gap-1.5">
                  <Ruler size={12} className="text-ink/40" />
                  <span className="text-[10px] text-ink/50 font-serif">
                    最大 {hall.maxWorks} 幅
                  </span>
                </div>
                <span className="text-[10px] text-ink/40 font-serif">
                  {hall.minWorks} 幅起展
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {hall.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-ink/5 text-ink/50 text-[9px] rounded border border-ink/10 font-serif"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeSelectStage({
  onSelect,
  selectedHall,
}: {
  onSelect: (themeId: string) => void;
  selectedHall: CuratorHallLayout | null;
}) {
  const themes = getAllCuratorialThemes();
  const difficultyColors: Record<string, string> = {
    easy: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    normal: "bg-gold/15 text-gold border-gold/30",
    hard: "bg-terracotta/15 text-terracotta border-terracotta/30",
  };
  const difficultyLabels: Record<string, string> = {
    easy: "入门策展",
    normal: "进阶策展",
    hard: "大师策展",
  };

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-6">
        {selectedHall && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-parchment-dark/50 rounded-full border border-ink/10 mb-3">
            <span className="text-lg">{selectedHall.icon}</span>
            <span className="font-display text-xs font-semibold text-ink/70">
              {selectedHall.name}
            </span>
            <ChevronRight size={12} className="text-ink/30" />
          </div>
        )}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20 mb-4">
          <Palette size={16} className="text-gold" />
          <span className="font-display text-sm font-semibold text-gold">
            策展主题
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">
          选择你的展览主题
        </h2>
        <p className="text-sm text-ink/60 font-serif">
          每个主题都有独特的策展要求，挑选一个最能激发你策展灵感的主题
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme, idx) => (
          <button
            key={theme.id}
            onClick={() => {
              audioManager.play("paper_flip");
              onSelect(theme.id);
            }}
            className="group text-left file-card p-5 hover:shadow-lg transition-all hover:-translate-y-1 animate-fadeInUp"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{theme.icon}</span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-gold transition-colors">
                  {theme.title}
                </h3>
                <p className="text-[10px] text-ink/40 uppercase tracking-wider font-serif">
                  {theme.titleEn}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink/60 font-serif leading-relaxed mb-3">
              {theme.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {theme.requiredTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-terracotta/10 text-terracotta text-[10px] rounded-full border border-terracotta/20 font-serif"
                >
                  ✦ {CURATORIAL_TAG_LABELS[tag]}
                </span>
              ))}
              {theme.recommendedTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-ink/5 text-ink/60 text-[10px] rounded-full border border-ink/10 font-serif"
                >
                  {CURATORIAL_TAG_LABELS[tag]}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-ink/10">
              <span
                className={`px-2 py-0.5 text-[10px] rounded border font-serif ${
                  difficultyColors[theme.difficulty]
                }`}
              >
                {difficultyLabels[theme.difficulty]}
              </span>
              <span className="text-[10px] text-ink/40 font-serif">
                {theme.minWorks}–{theme.maxWorks} 幅作品
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniPaintingCard({
  paintingId,
  onClick,
  selected,
  compact = false,
  draggable = false,
  onDragStart,
  onDragEnd,
}: {
  paintingId: string;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
}) {
  const painting = paintings.find((p) => p.id === paintingId);
  if (!painting) return null;
  const tags = PAINTING_CURATORIAL_TAGS[paintingId] || [];
  const size = getPaintingSize(paintingId);

  return (
    <div
      className={`relative group cursor-pointer transition-all ${
        selected
          ? "ring-2 ring-gold ring-offset-2 ring-offset-parchment-dark scale-[1.02]"
          : "hover:scale-[1.02]"
      } ${draggable ? "artwork-drag-handle" : ""}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="overflow-hidden rounded-sm border border-ink/10 bg-white shadow-archive-card">
        <div className="relative" style={{ aspectRatio: "4/3" }}>
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {!compact && (
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="font-display text-xs font-bold text-white truncate">
                {painting.title}
              </p>
              <p className="text-[9px] text-white/70 truncate">
                {painting.artist} · {painting.movement}
              </p>
            </div>
          )}
          {size && (
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[8px] rounded font-serif flex items-center gap-0.5">
              <Ruler size={8} />
              {size.widthCm}×{size.heightCm}cm
            </div>
          )}
        </div>
      </div>
      {!compact && tags.length > 0 && (
        <div className="absolute top-1.5 right-1.5 flex flex-wrap gap-0.5 max-w-[60%] justify-end">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1 py-0.5 bg-white/90 backdrop-blur-sm text-[8px] rounded text-ink/70 font-serif"
            >
              {CURATORIAL_TAG_LABELS[tag]}
            </span>
          ))}
        </div>
      )}
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-lg">
          <CheckCircle size={14} className="text-white" />
        </div>
      )}
    </div>
  );
}

function PlacedPainting({
  artwork,
  hall,
  onMove,
  onRemove,
}: {
  artwork: CuratorPlacedArtwork;
  hall: CuratorHallLayout;
  onMove: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
}) {
  const painting = paintings.find((p) => p.id === artwork.paintingId);
  const size = getPaintingSize(artwork.paintingId);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!painting || !size) return null;

  const { widthPct, heightPct } = calculatePaintingDisplayScale(size, hall);
  const frameStyle = size.frameStyle;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: artwork.positionX,
      posY: artwork.positionY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dx = ((e.clientX - dragStartRef.current.x) / rect.width) * 100;
      const dy = ((e.clientY - dragStartRef.current.y) / rect.height) * 100;

      let newX = dragStartRef.current.posX + dx;
      let newY = dragStartRef.current.posY + dy;

      newX = Math.max(widthPct / 2 + 2, Math.min(98 - widthPct / 2, newX));
      newY = Math.max(heightPct / 2 + 5, Math.min(88 - heightPct / 2, newY));

      onMove(artwork.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      audioManager.play("paper_flip");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, artwork.id, artwork.positionX, artwork.positionY, widthPct, heightPct, onMove]);

  return (
    <div
      ref={containerRef}
      className="group absolute artwork-drag-handle z-10"
      style={{
        left: `${artwork.positionX}%`,
        top: `${artwork.positionY}%`,
        width: `${widthPct}%`,
        transform: `translate(-50%, -50%) rotate(${artwork.rotation || 0}deg)`,
        transition: isDragging ? "none" : "transform 0.2s ease, box-shadow 0.3s ease",
        zIndex: isDragging ? 50 : 10,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={`painting-frame ${getFrameClass(frameStyle)}`}>
        <div className="painting-mat">
          <div className="relative" style={{ aspectRatio: `${size.widthCm} / ${size.heightCm}` }}>
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          audioManager.play("detail_focus");
          onRemove(artwork.id);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-terracotta text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hover:bg-terracotta/90"
        style={{ pointerEvents: "auto", zIndex: 200 }}
      >
        <X size={14} strokeWidth={2.5} />
      </button>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-serif bg-black/80 text-white/90 px-2.5 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
        {painting.title} · {FRAME_STYLE_LABELS[frameStyle]}
      </div>
    </div>
  );
}

function HallCanvas({
  hall,
  placedArtworks,
  onArtworkDrop,
  onArtworkMove,
  onArtworkRemove,
  onCanvasClick,
}: {
  hall: CuratorHallLayout;
  placedArtworks: CuratorPlacedArtwork[];
  onArtworkDrop: (paintingId: string, x: number, y: number) => void;
  onArtworkMove: (id: string, x: number, y: number) => void;
  onArtworkRemove: (id: string) => void;
  onCanvasClick?: (x: number, y: number) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(null);

  const wallClassMap: Record<string, string> = {
    classic_gallery: "hall-wall-classic",
    white_cube: "hall-wall-whitecube",
    loft_industrial: "hall-wall-loft",
    baroque_salon: "hall-wall-baroque",
    japanese_tearoom: "hall-wall-japanese",
  };
  const floorClassMap: Record<string, string> = {
    herringbone_wood: "hall-floor-herringbone",
    concrete: "hall-floor-concrete",
    marble: "hall-floor-marble",
    tatami: "hall-floor-tatami",
  };
  const baseboardClassMap: Record<string, string> = {
    classic_gallery: "baseboard-classic",
    white_cube: "baseboard-white",
    loft_industrial: "baseboard-loft",
    baroque_salon: "baseboard-classic",
    japanese_tearoom: "baseboard-japanese",
  };

  const getPositionFromEvent = (e: React.DragEvent | React.MouseEvent) => {
    if (!canvasRef.current) return { x: 50, y: 50 };
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = "clientX" in e ? e.clientX : 0;
    const clientY = "clientY" in e ? e.clientY : 0;
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;
    x = Math.max(5, Math.min(95, x));
    y = Math.max(10, Math.min(85, y));
    return { x, y };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const paintingId = e.dataTransfer.getData("paintingId");
    if (!paintingId) return;
    const pos = getPositionFromEvent(e);
    audioManager.play("paper_flip");
    onArtworkDrop(paintingId, pos.x, pos.y);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!onCanvasClick) return;
    const pos = getPositionFromEvent(e);
    onCanvasClick(pos.x, pos.y);
  };

  return (
    <div className="space-y-3">
      <div
        ref={canvasRef}
        className={`relative droppable-zone rounded-sm overflow-hidden border-2 border-ink/20 shadow-2xl ${
          isDragOver ? "drag-over" : ""
        }`}
        style={{ aspectRatio: "16 / 9", minHeight: "380px" }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
      >
        <div className={`hall-wall absolute inset-0 ${wallClassMap[hall.id] || "hall-wall-classic"}`}>
          <div className="track-light">
            {[12, 28, 44, 60, 76, 88].map((pos) => (
              <div
                key={pos}
                className="track-light-fixture"
                style={{ left: `${pos}%` }}
              />
            ))}
          </div>
          <div className="spotlight-overlay" />
          <div className={`baseboard ${baseboardClassMap[hall.id] || "baseboard-classic"}`} />
        </div>
        <div
          className={`hall-floor absolute bottom-0 left-0 right-0 ${floorClassMap[hall.floorStyle] || "hall-floor-herringbone"}`}
          style={{ height: "12%" }}
        />
        <div className="absolute inset-0">
          {placedArtworks.map((artwork) => (
            <PlacedPainting
              key={artwork.id}
              artwork={artwork}
              hall={hall}
              onMove={onArtworkMove}
              onRemove={onArtworkRemove}
            />
          ))}
        </div>
        {placedArtworks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-6 py-4 bg-black/30 backdrop-blur-sm rounded-sm">
              <Move size={32} className="mx-auto text-white/50 mb-2" />
              <p className="font-display text-sm text-white/70 mb-1">
                拖放作品到展厅墙面
              </p>
              <p className="text-[11px] text-white/50 font-serif">
                从下方作品库拖拽，点击已放置作品可拖拽调整位置
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-ink/50 font-serif">
        <div className="flex items-center gap-3">
          <span>墙面可用：{Math.round((1 - placedArtworks.length / hall.maxWorks) * 100)}%</span>
          <span>已放置：{placedArtworks.length}/{hall.maxWorks} 幅</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-ink/30">提示：</span>
          <span>画作按真实尺寸比例显示</span>
        </div>
      </div>
    </div>
  );
}

function CuratingStage() {
  const {
    curatorCurrentTheme,
    curatorAvailablePaintings,
    curatorExhibitionSlots,
    curatorPlacedArtworks,
    curatorSelectedHall,
    curatorNarrativeText,
    placePaintingInSlot,
    removePaintingFromSlot,
    movePaintingSlot,
    placeCuratorArtwork,
    updateCuratorArtworkPosition,
    removeCuratorArtwork,
    setCuratorNarrativeText,
    submitCuratorExhibition,
    resetCurator,
    setCuratorPhase,
  } = useGameStore();

  const [draggedSlot, setDraggedSlot] = useState<string | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(
    null
  );
  const [useGalleryMode, setUseGalleryMode] = useState(false);

  if (!curatorCurrentTheme || !curatorSelectedHall) return null;

  const usedPaintingIds = [
    ...curatorExhibitionSlots
      .filter((s) => s.paintingId)
      .map((s) => s.paintingId!) as string[],
    ...curatorPlacedArtworks.map((a) => a.paintingId),
  ];
  const filledSlots =
    curatorExhibitionSlots.filter((s) => s.paintingId).length +
    curatorPlacedArtworks.length;
  const minWorks = Math.max(curatorCurrentTheme.minWorks, curatorSelectedHall.minWorks);
  const maxWorks = Math.min(curatorCurrentTheme.maxWorks, curatorSelectedHall.maxWorks);
  const canSubmit = filledSlots >= minWorks && filledSlots <= maxWorks;

  const handlePaintingSelect = (paintingId: string) => {
    if (usedPaintingIds.includes(paintingId)) return;
    if (useGalleryMode) {
      const emptySlot = curatorExhibitionSlots.find((s) => !s.paintingId);
      if (!emptySlot) return;
      audioManager.play("paper_flip");
      placePaintingInSlot(emptySlot.id, paintingId);
    } else {
      setSelectedPaintingId(paintingId);
    }
    setSelectedPaintingId(null);
  };

  const handlePaintingDragStart = (e: React.DragEvent, paintingId: string) => {
    if (usedPaintingIds.includes(paintingId)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("paintingId", paintingId);
    e.dataTransfer.effectAllowed = "copy";
    setSelectedPaintingId(paintingId);
  };

  const handlePaintingDragEnd = () => {
    setSelectedPaintingId(null);
  };

  const handleSlotClick = (slotId: string) => {
    const slot = curatorExhibitionSlots.find((s) => s.id === slotId);
    if (!slot) return;
    if (slot.paintingId && selectedPaintingId) {
      removePaintingFromSlot(slotId);
      audioManager.play("detail_focus");
      setTimeout(() => {
        placePaintingInSlot(slotId, selectedPaintingId);
        setSelectedPaintingId(null);
      }, 50);
    } else if (selectedPaintingId && !slot.paintingId) {
      audioManager.play("paper_flip");
      placePaintingInSlot(slotId, selectedPaintingId);
      setSelectedPaintingId(null);
    }
  };

  return (
    <div className="animate-fadeInUp space-y-5">
      <div className="file-card p-5">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">{curatorSelectedHall.icon}</span>
            <span className="text-2xl">{curatorCurrentTheme.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-display text-xl font-bold text-ink">
                {curatorCurrentTheme.title}
              </h2>
              <span className="text-[10px] text-ink/40 uppercase tracking-wider font-serif">
                @ {curatorSelectedHall.name}
              </span>
            </div>
            <p className="text-sm text-ink/60 font-serif mb-2">
              {curatorCurrentTheme.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {curatorCurrentTheme.requiredTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-terracotta/10 text-terracotta text-[10px] rounded-full border border-terracotta/20 font-serif"
                >
                  ✦ {CURATORIAL_TAG_LABELS[tag]}
                </span>
              ))}
              {curatorCurrentTheme.recommendedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-ink/5 text-ink/60 text-[10px] rounded-full border border-ink/10 font-serif"
                >
                  {CURATORIAL_TAG_LABELS[tag]}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right space-y-2">
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-display font-bold ${
                canSubmit
                  ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"
                  : "bg-ink/5 text-ink/50 border-ink/10"
              }`}
            >
              {filledSlots}
              <span className="text-ink/40">/</span>
              {minWorks}-{maxWorks}
              {canSubmit && <CheckCircle size={14} />}
            </div>
            <p className="text-[10px] text-ink/40 font-serif">
              最少 {minWorks} 幅 / 最多 {maxWorks} 幅
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  audioManager.play("paper_flip");
                  setCuratorPhase("hallSelect");
                }}
                className="text-[10px] text-ink/40 hover:text-ink/70 font-serif underline underline-offset-2"
              >
                更换展厅
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="file-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <GalleryHorizontal size={16} className="text-gold" />
          <h3 className="font-display text-base font-bold text-ink">
            展厅布局墙
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.play("detail_focus");
                setUseGalleryMode(false);
              }}
              className={`text-[10px] px-3 py-1 rounded-full border font-serif transition-all ${
                !useGalleryMode
                  ? "bg-gold/15 text-gold border-gold/30 font-semibold"
                  : "bg-white/50 text-ink/50 border-ink/10 hover:border-ink/20"
              }`}
            >
              <span className="flex items-center gap-1">
                <Maximize2 size={11} />
                自由布置
              </span>
            </button>
            <button
              onClick={() => {
                audioManager.play("detail_focus");
                setUseGalleryMode(true);
              }}
              className={`text-[10px] px-3 py-1 rounded-full border font-serif transition-all ${
                useGalleryMode
                  ? "bg-gold/15 text-gold border-gold/30 font-semibold"
                  : "bg-white/50 text-ink/50 border-ink/10 hover:border-ink/20"
              }`}
            >
              <span className="flex items-center gap-1">
                <Grid3X3 size={11} />
                网格展位
              </span>
            </button>
          </div>
        </div>

        {!useGalleryMode ? (
          <HallCanvas
            hall={curatorSelectedHall}
            placedArtworks={curatorPlacedArtworks}
            onArtworkDrop={placeCuratorArtwork}
            onArtworkMove={updateCuratorArtworkPosition}
            onArtworkRemove={removeCuratorArtwork}
          />
        ) : (
          <div className="relative p-6 bg-gradient-to-br from-museum-warm via-museum-dark to-museum-warm rounded-sm border-2 border-frame-dark/50 shadow-museum-spotlight min-h-[260px]">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, rgba(212, 160, 23, 0.3) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {curatorExhibitionSlots.map((slot, idx) => {
                const isOver = dragOverSlot === slot.id;
                return (
                  <div
                    key={slot.id}
                    draggable={!!slot.paintingId}
                    onDragStart={() =>
                      slot.paintingId && setDraggedSlot(slot.id)
                    }
                    onDragEnd={() => {
                      setDraggedSlot(null);
                      setDragOverSlot(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverSlot(slot.id);
                    }}
                    onDragLeave={() => setDragOverSlot(null)}
                    onDrop={() => {
                      if (draggedSlot && draggedSlot !== slot.id) {
                        audioManager.play("paper_flip");
                        movePaintingSlot(draggedSlot, slot.id);
                      }
                      setDraggedSlot(null);
                      setDragOverSlot(null);
                    }}
                    onClick={() => handleSlotClick(slot.id)}
                    className={`relative transition-all ${
                      isOver
                        ? "scale-105 z-10"
                        : draggedSlot && draggedSlot === slot.id
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    {slot.paintingId ? (
                      <div className="relative">
                        <MiniPaintingCard
                          paintingId={slot.paintingId}
                          selected={selectedPaintingId === slot.paintingId}
                        />
                        <div className="absolute -left-1 -top-1 w-6 h-6 rounded-full bg-gold text-white font-display text-xs font-bold flex items-center justify-center shadow-lg">
                          {idx + 1}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            audioManager.play("detail_focus");
                            removePaintingFromSlot(slot.id);
                          }}
                          className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-terracotta/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                          <X size={12} />
                        </button>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-white/70 font-serif bg-black/60 px-2 py-0.5 rounded-full">
                          拖拽排序
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`aspect-[4/3] rounded-sm border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isOver
                            ? "border-gold bg-gold/10"
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <Plus
                          size={20}
                          className={isOver ? "text-gold" : "text-white/40"}
                        />
                        <span
                          className={`text-[10px] mt-1 font-serif ${
                            isOver ? "text-gold" : "text-white/40"
                          }`}
                        >
                          展位 {idx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="file-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={16} className="text-gold" />
          <h3 className="font-display text-base font-bold text-ink">
            候选作品库
          </h3>
          <span className="text-[10px] text-ink/40 uppercase tracking-wider font-serif ml-auto">
            {!useGalleryMode ? "拖拽作品到展厅墙面放置" : "点击作品添加到下一个空展位"}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {curatorAvailablePaintings.map((painting) => {
            const used = usedPaintingIds.includes(painting.id);
            return (
              <div
                key={painting.id}
                className={used ? "opacity-40 pointer-events-none" : ""}
              >
                <MiniPaintingCard
                  paintingId={painting.id}
                  onClick={() => handlePaintingSelect(painting.id)}
                  selected={selectedPaintingId === painting.id}
                  draggable={!useGalleryMode && !used}
                  onDragStart={(e) => handlePaintingDragStart(e, painting.id)}
                  onDragEnd={handlePaintingDragEnd}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="file-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-gold" />
          <h3 className="font-display text-base font-bold text-ink">
            策展说明
          </h3>
          <span className="text-[10px] text-ink/40 uppercase tracking-wider font-serif ml-auto">
            Curatorial Statement
          </span>
        </div>
        <div className="bg-parchment-dark/40 border border-ink/10 rounded-sm p-3 mb-3">
          <div className="flex items-start gap-2 text-xs text-ink/50 font-serif">
            <Lightbulb size={14} className="text-gold flex-shrink-0 mt-0.5" />
            <p>
              <span className="text-gold font-semibold">策展灵感：</span>
              {curatorCurrentTheme.narrativeHint}
            </p>
          </div>
        </div>
        <textarea
          value={curatorNarrativeText}
          onChange={(e) => setCuratorNarrativeText(e.target.value)}
          placeholder="写下你策划这场展览的想法：你想通过这些作品传达什么？展览的叙事线索是什么？观众会有怎样的感受？..."
          className="w-full h-28 p-4 bg-white/60 border border-ink/15 rounded-sm text-sm text-ink font-serif resize-none focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all placeholder:text-ink/30"
        />
        <div className="mt-2 text-right text-[10px] text-ink/40 font-serif">
          {curatorNarrativeText.length} 字 · 建议 80 字以上获得更高评价
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            audioManager.play("paper_flip");
            resetCurator();
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-white/60 border border-ink/15 rounded-sm text-ink/60 font-display text-sm hover:bg-white hover:text-ink transition-all"
        >
          <RotateCcw size={14} />
          重新开始
        </button>
        <button
          onClick={() => {
            if (!canSubmit) return;
            audioManager.play("paper_flip");
            submitCuratorExhibition();
          }}
          disabled={!canSubmit}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-sm font-display text-sm font-bold transition-all ${
            canSubmit
              ? "bg-gold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              : "bg-ink/10 text-ink/30 cursor-not-allowed"
          }`}
        >
          <Sparkles size={16} />
          提交策展方案
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  score,
  color = "gold",
  icon,
}: {
  label: string;
  score: number;
  color?: "gold" | "emerald" | "terracotta" | "blue";
  icon?: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    gold: "bg-gold",
    emerald: "bg-emerald-500",
    terracotta: "bg-terracotta",
    blue: "bg-blue-500",
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-xs text-ink/70 font-serif">{label}</span>
        </div>
        <span className="font-display text-sm font-bold text-ink">
          {score}
        </span>
      </div>
      <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} rounded-full transition-all duration-1000`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
}

function EvaluationStage() {
  const {
    curatorCurrentTheme,
    curatorExhibitionSlots,
    curatorPlacedArtworks,
    curatorSelectedHall,
    curatorEvaluation,
    curatorNarrativeText,
    resetCurator,
    selectCuratorTheme,
  } = useGameStore();

  if (!curatorCurrentTheme || !curatorEvaluation) return null;

  const selectedIdsFromSlots = curatorExhibitionSlots
    .filter((s) => s.paintingId)
    .map((s) => s.paintingId!) as string[];
  const selectedIdsFromWall = curatorPlacedArtworks.map((a) => a.paintingId);
  const allSelectedIds = Array.from(
    new Set([...selectedIdsFromSlots, ...selectedIdsFromWall])
  );
  const selectedPaintings = allSelectedIds
    .map((id) => paintings.find((p) => p.id === id))
    .filter(Boolean) as typeof paintings;

  const rankBadge: Record<CuratorialEvaluation["rank"], { bg: string; icon: string; label: string }> = {
    bronze: { bg: "from-amber-600 to-amber-800", icon: "🥉", label: "铜牌" },
    silver: { bg: "from-gray-300 to-gray-500", icon: "🥈", label: "银牌" },
    gold: { bg: "from-yellow-400 to-gold", icon: "🥇", label: "金牌" },
    master: { bg: "from-gold to-terracotta", icon: "👑", label: "大师" },
  };

  const rank = rankBadge[curatorEvaluation.rank];

  return (
    <div className="animate-fadeInUp space-y-5">
      <div className="file-card p-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(212, 160, 23, 0.4) 0%, transparent 60%)",
          }}
        />
        <div className="relative text-center">
          <div
            className={`inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r ${rank.bg} rounded-full text-white shadow-lg mb-4 animate-fadeInScale`}
          >
            <span className="text-2xl">{rank.icon}</span>
            <div className="text-left">
              <div className="font-display text-lg font-bold leading-none">
                {curatorEvaluation.rankTitle}
              </div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">
                {rank.label} Curator
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="font-display text-5xl font-black text-ink">
              {curatorEvaluation.totalScore}
            </span>
            <span className="text-ink/40 font-serif text-sm">
              / 100 分
            </span>
          </div>

          <p className="text-sm text-ink/60 font-serif max-w-lg mx-auto leading-relaxed">
            {curatorEvaluation.comment}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="file-card p-4 animate-fadeInUp" style={{ animationDelay: "80ms" }}>
          <ScoreBar
            label="主题契合度"
            score={curatorEvaluation.themeMatchScore}
            color="gold"
            icon={<Target size={13} className="text-gold" />}
          />
        </div>
        <div className="file-card p-4 animate-fadeInUp" style={{ animationDelay: "120ms" }}>
          <ScoreBar
            label="作品多样性"
            score={curatorEvaluation.diversityScore}
            color="emerald"
            icon={<TrendingUp size={13} className="text-emerald-600" />}
          />
        </div>
        <div className="file-card p-4 animate-fadeInUp" style={{ animationDelay: "160ms" }}>
          <ScoreBar
            label="叙事完整性"
            score={curatorEvaluation.narrativeFlowScore}
            color="blue"
            icon={<BookOpen size={13} className="text-blue-500" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="file-card p-5 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-gold fill-gold" />
            <h3 className="font-display text-base font-bold text-ink">
              策展亮点
            </h3>
          </div>
          {curatorEvaluation.strengths.length > 0 ? (
            <ul className="space-y-2">
              {curatorEvaluation.strengths.map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-ink/70 font-serif animate-fadeInUp"
                  style={{ animationDelay: `${240 + idx * 50}ms` }}
                >
                  <CheckCircle
                    size={14}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink/40 font-serif italic">
              继续努力，下次会更好！
            </p>
          )}
        </div>

        <div className="file-card p-5 animate-fadeInUp" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-terracotta" />
            <h3 className="font-display text-base font-bold text-ink">
              改进建议
            </h3>
          </div>
          {curatorEvaluation.improvements.length > 0 ? (
            <ul className="space-y-2">
              {curatorEvaluation.improvements.map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-ink/70 font-serif animate-fadeInUp"
                  style={{ animationDelay: `${280 + idx * 50}ms` }}
                >
                  <AlertCircle
                    size={14}
                    className="text-terracotta flex-shrink-0 mt-0.5"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-emerald-600 font-serif font-semibold">
              完美的策展！没有需要改进的地方 ✨
            </p>
          )}
        </div>
      </div>

      {curatorEvaluation.styleAnalysis.length > 0 && (
        <div className="file-card p-5 animate-fadeInUp" style={{ animationDelay: "320ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={16} className="text-gold" />
            <h3 className="font-display text-base font-bold text-ink">
              风格分析
            </h3>
            <span className="text-[10px] text-ink/40 uppercase tracking-wider font-serif ml-auto">
              Style Analysis
            </span>
          </div>
          <div className="space-y-2">
            {curatorEvaluation.styleAnalysis.map((analysis, idx) => (
              <div
                key={idx}
                className="p-3 bg-parchment-dark/30 rounded-sm border-l-2 border-gold text-sm text-ink/70 font-serif animate-fadeInUp"
                style={{ animationDelay: `${360 + idx * 60}ms` }}
              >
                {analysis}
              </div>
            ))}
          </div>
        </div>
      )}

      {curatorNarrativeText && (
        <div className="file-card p-5 animate-fadeInUp" style={{ animationDelay: "380ms" }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-gold" />
            <h3 className="font-display text-base font-bold text-ink">
              你的策展说明
            </h3>
          </div>
          <div className="p-4 bg-parchment-dark/30 rounded-sm border border-ink/10">
            <p className="text-sm text-ink/70 font-serif leading-relaxed italic">
              "{curatorNarrativeText}"
            </p>
          </div>
        </div>
      )}

      <div className="file-card p-5 animate-fadeInUp" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center gap-2 mb-4">
          <GalleryHorizontal size={16} className="text-gold" />
          <h3 className="font-display text-base font-bold text-ink">
            你的展览
          </h3>
          <span className="text-[10px] text-ink/40 uppercase tracking-wider font-serif ml-auto">
            {curatorSelectedHall ? `${curatorSelectedHall.name} · ` : ""}
            {curatorCurrentTheme.title} · {selectedPaintings.length} 幅作品
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {selectedPaintings.map((painting, idx) => (
            <div
              key={painting.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${440 + idx * 60}ms` }}
            >
              <div className="relative overflow-hidden rounded-sm border border-ink/10 bg-white shadow-archive-card">
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute -left-1 -top-1 w-6 h-6 rounded-full bg-gold text-white font-display text-xs font-bold flex items-center justify-center shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="font-display text-xs font-bold text-white truncate">
                      {painting.title}
                    </p>
                    <p className="text-[9px] text-white/70 truncate">
                      {painting.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => {
            audioManager.play("paper_flip");
            resetCurator();
          }}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-white/60 border border-ink/15 rounded-sm text-ink/60 font-display text-sm hover:bg-white hover:text-ink transition-all"
        >
          <Palette size={14} />
          选择新展厅
        </button>
        <button
          onClick={() => {
            if (!curatorCurrentTheme) return;
            audioManager.play("paper_flip");
            selectCuratorTheme(curatorCurrentTheme.id);
          }}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-ink/10 border border-ink/20 rounded-sm text-ink/70 font-display text-sm hover:bg-ink/15 transition-all"
        >
          <RotateCcw size={14} />
          重新策划
        </button>
        <button
          onClick={() => {
            audioManager.play("paper_flip");
            resetCurator();
          }}
          className="flex items-center gap-2 px-7 py-2.5 bg-gold text-white shadow-lg rounded-sm font-display text-sm font-bold hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <Trophy size={16} />
          完成策展
        </button>
      </div>
    </div>
  );
}

export default function MuseumCuratorPanel() {
  const {
    curatorPhase,
    curatorSelectedHall,
    curatorExhibitionsCompleted,
    selectCuratorHall,
    selectCuratorTheme,
    resetCurator,
  } = useGameStore();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
            <Palette className="text-gold" size={20} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              博物馆策展模式
            </h2>
            <p className="text-[10px] text-ink/40 uppercase tracking-wider font-serif">
              Museum Curator Mode
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-parchment-dark/50 rounded-sm border border-ink/10">
            <Award size={14} className="text-gold" />
            <span className="text-xs font-serif text-ink/60">
              已策划{" "}
              <span className="font-display font-bold text-gold">
                {curatorExhibitionsCompleted}
              </span>{" "}
              场展览
            </span>
          </div>
          {curatorPhase !== "hallSelect" && (
            <button
              onClick={() => {
                audioManager.play("paper_flip");
                resetCurator();
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-serif text-ink/50 hover:text-ink transition-colors"
            >
              <RotateCcw size={12} />
              回到展厅选择
            </button>
          )}
        </div>
      </div>

      {curatorPhase === "hallSelect" && (
        <HallSelectStage
          onSelect={(id) => selectCuratorHall(id as CuratorHallId)}
        />
      )}

      {curatorPhase === "themeSelect" && (
        <ThemeSelectStage
          onSelect={(id) => selectCuratorTheme(id)}
          selectedHall={curatorSelectedHall}
        />
      )}

      {curatorPhase === "curating" && <CuratingStage />}

      {curatorPhase === "evaluation" && <EvaluationStage />}
    </div>
  );
}
