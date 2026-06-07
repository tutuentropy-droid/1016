import { useState, useMemo, useEffect } from "react";
import type { Painting } from "@/data/paintings";
import { useGameStore } from "@/store/useGameStore";
import { Search, X, ZoomIn, Layers, Eye } from "lucide-react";
import { audioManager } from "@/utils/audioManager";

export default function PaintingCard() {
  const {
    currentPainting,
    isAnswered,
    lastResultCorrect,
    focusedDetailIndex,
    setFocusedDetail,
  } = useGameStore();
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomRegion, setZoomRegion] = useState<number | null>(null);

  useEffect(() => {
    if (focusedDetailIndex !== null && currentPainting?.zoomRegions) {
      setZoomRegion(focusedDetailIndex);
      audioManager.play("detail_focus");
      const t = setTimeout(() => setZoomRegion(null), 2500);
      return () => clearTimeout(t);
    }
  }, [focusedDetailIndex, currentPainting]);

  const shadowStyle = useMemo(() => {
    if (!isAnswered) return "shadow-painting-cinematic";
    return lastResultCorrect ? "shadow-painting-correct" : "shadow-painting-wrong";
  }, [isAnswered, lastResultCorrect]);

  const animationClass = isAnswered
    ? lastResultCorrect
      ? "animate-frameGlow"
      : "animate-shake"
    : "animate-cameraPanIn";

  if (!currentPainting) return null;
  const painting: Painting = currentPainting;

  const hasZoomRegions = painting.zoomRegions && painting.zoomRegions.length > 0;
  const focused = zoomRegion !== null && painting.zoomRegions?.[zoomRegion];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="hint-tape">案件档案 · 证物 #{painting.id.padStart(3, "0")}</div>

        <div className={`relative ${animationClass}`}>
          <div className="absolute -inset-2 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm opacity-90" />
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-frame-dark/60 via-transparent to-frame-light/40 rounded-sm pointer-events-none" />

          {isAnswered && lastResultCorrect && (
            <div className="absolute -inset-4 rounded-sm pointer-events-none animate-glowPulse"
              style={{
                boxShadow: "0 0 60px 20px rgba(212, 160, 23, 0.4), inset 0 0 30px rgba(212, 160, 23, 0.2)",
              }}
            />
          )}

          <div className="relative p-3 md:p-4 bg-gradient-to-br from-white to-parchment frame-inner-light overflow-hidden">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "auto" }}
            >
              <div
                className={`relative will-change-transform ${
                  !isAnswered ? "ken-burns" : ""
                } ${focused ? "animate-detailFocus" : ""}`}
                style={
                  focused
                    ? {
                        transformOrigin: `${focused.x + focused.w / 2}% ${focused.y + focused.h / 2}%`,
                      }
                    : undefined
                }
              >
                <img
                  key={painting.id}
                  src={painting.imageUrl}
                  alt={painting.title}
                  className="max-w-full max-h-[450px] object-contain block"
                  loading="lazy"
                  draggable={false}
                />

                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.12) 100%)",
                  }}
                />
              </div>

              {hasZoomRegions && !isAnswered &&
                painting.zoomRegions!.map((region, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setZoomRegion(idx);
                      audioManager.play("detail_focus");
                      setTimeout(() => {
                        setZoomOpen(true);
                        setZoomRegion(null);
                      }, 1200);
                    }}
                    className={`absolute rounded-full border-2 bg-gold/20 backdrop-blur-sm hover:bg-gold/40 transition-all group flex items-center justify-center ${
                      zoomRegion === idx
                        ? "border-gold shadow-[0_0_20px_rgba(212,160,23,0.8)] scale-125"
                        : "border-gold/70"
                    }`}
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${Math.min(region.w, 22)}%`,
                      height: "auto",
                      aspectRatio: "1",
                      zIndex: zoomRegion === idx ? 20 : 10,
                    }}
                    title={`查看细节：${region.label}`}
                  >
                    <ZoomIn size={14} className="text-gold opacity-80 group-hover:opacity-100" />
                    {zoomRegion === idx && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-museum-dark/80 text-gold-soft text-[10px] typewriter-font rounded-sm animate-fadeInScale">
                        🔍 {region.label}
                      </div>
                    )}
                  </button>
                ))}

              {focused && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 3px rgba(212, 160, 23, 0.7), inset 0 0 40px rgba(212, 160, 23, 0.3)`,
                    borderRadius: "2px",
                  }}
                />
              )}
            </div>
          </div>
          <div className={`absolute -inset-5 ${shadowStyle} rounded-sm pointer-events-none`} />

          {!isAnswered && (
            <div className="absolute -left-6 top-1/3 hidden md:flex flex-col items-center gap-2 opacity-70">
              <div className="w-8 h-8 rounded-full bg-ink/5 border border-ink/10 flex items-center justify-center">
                <Eye size={14} className="text-ink/40" />
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-ink/20 to-transparent" />
            </div>
          )}
        </div>

        {hasZoomRegions && !isAnswered && (
          <button
            onClick={() => {
              setZoomOpen(true);
              audioManager.play("paper_flip");
            }}
            className="absolute -bottom-4 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-ink/80 text-white rounded-md text-xs font-serif hover:bg-ink transition-colors shadow-md group"
          >
            <Search size={14} className="group-hover:scale-110 transition-transform" />
            查看细节
            <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-gold animate-markerPulse" />
          </button>
        )}
      </div>

      <div className="mt-12 text-center">
        {isAnswered ? (
          <div className="animate-fadeInUp">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-wide">
              《{painting.title}》
            </h2>
            <p className="mt-1 text-sm text-ink/60 italic font-serif">{painting.titleEn}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Layers size={12} className="text-gold/70" />
              <p className="text-xs text-gold tracking-widest uppercase font-serif">
                {painting.movement} · {painting.year}
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            <h2 className="font-display text-xl text-ink/80 italic tracking-wide">
              ━ 未知作品档案 ━
            </h2>
            <p className="mt-2 text-sm text-ink/50 font-serif">请仔细观察这幅画作的特征</p>
          </div>
        )}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-museum-dark/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInScale"
          onClick={() => {
            setZoomOpen(false);
            setFocusedDetail(null);
          }}
        >
          <div className="cinematic-vignette" />
          <div
            className="relative max-w-5xl max-h-[90vh] animate-cameraPanIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setZoomOpen(false);
                setFocusedDetail(null);
              }}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X size={20} className="text-ink" />
            </button>
            <div className="absolute -inset-2 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm" />
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-frame-dark/60 via-transparent to-frame-light/40 rounded-sm pointer-events-none" />
            <div className="relative p-3 bg-white overflow-hidden">
              <div className="relative ken-burns">
                <img
                  src={painting.imageUrl}
                  alt={painting.title}
                  className="max-w-full max-h-[75vh] object-contain block"
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 100%)",
                  }}
                />
              </div>
            </div>
            <div className="mt-4 text-center text-white/80 text-sm font-serif">
              {painting.zoomRegions && painting.zoomRegions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {painting.zoomRegions.map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-gold/30 cursor-pointer transition-colors"
                      onClick={() => {
                        setZoomRegion(i);
                        audioManager.play("detail_focus");
                      }}
                    >
                      📍 {r.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3 text-center text-white/40 text-[10px] typewriter-font uppercase tracking-[0.3em]">
              放大镜模式 · Magnifying Glass
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
