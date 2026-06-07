import { useState, useMemo } from "react";
import type { Painting } from "@/data/paintings";
import { useGameStore } from "@/store/useGameStore";
import { Search, X, ZoomIn } from "lucide-react";

export default function PaintingCard() {
  const { currentPainting, isAnswered, lastResultCorrect } = useGameStore();
  const [zoomOpen, setZoomOpen] = useState(false);

  const shadowStyle = useMemo(() => {
    if (!isAnswered) return "shadow-painting";
    return lastResultCorrect ? "shadow-painting-correct" : "shadow-painting-wrong";
  }, [isAnswered, lastResultCorrect]);

  const animationClass = isAnswered
    ? lastResultCorrect
      ? "animate-glowPulse"
      : "animate-shake"
    : "animate-curtainReveal";

  if (!currentPainting) return null;
  const painting: Painting = currentPainting;

  const hasZoomRegions = painting.zoomRegions && painting.zoomRegions.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="hint-tape">案件档案 · 证物 #{painting.id.padStart(3, "0")}</div>

        <div className={`relative ${animationClass}`}>
          <div className="absolute -inset-2 bg-gradient-to-br from-frame-light via-frame-mid to-frame-dark rounded-sm opacity-90" />
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-frame-dark/60 via-transparent to-frame-light/40 rounded-sm pointer-events-none" />
          <div className="relative p-3 md:p-4 bg-gradient-to-br from-white to-parchment">
            <div className="relative">
              <img
                key={painting.id}
                src={painting.imageUrl}
                alt={painting.title}
                className="max-w-full max-h-[450px] object-contain block"
                loading="lazy"
                draggable={false}
              />

              {hasZoomRegions && !isAnswered &&
                painting.zoomRegions!.map((region, idx) => (
                  <button
                    key={idx}
                    onClick={() => setZoomOpen(true)}
                    className="absolute rounded-full border-2 border-gold/70 bg-gold/20 backdrop-blur-sm hover:bg-gold/40 transition-all group flex items-center justify-center"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${Math.min(region.w, 20)}%`,
                      height: "auto",
                      aspectRatio: "1",
                    }}
                    title={`查看细节：${region.label}`}
                  >
                    <ZoomIn size={14} className="text-gold opacity-80 group-hover:opacity-100" />
                  </button>
                ))}
            </div>
          </div>
          <div className={`absolute -inset-5 ${shadowStyle} rounded-sm pointer-events-none`} />
        </div>

        {hasZoomRegions && !isAnswered && (
          <button
            onClick={() => setZoomOpen(true)}
            className="absolute -bottom-4 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-ink/80 text-white rounded-md text-xs font-serif hover:bg-ink transition-colors shadow-md"
          >
            <Search size={14} />
            查看细节
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
            <p className="mt-2 text-xs text-gold tracking-widest uppercase font-serif">
              {painting.movement} · {painting.year}
            </p>
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-zoomIn"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X size={20} className="text-ink" />
            </button>
            <div className="absolute -inset-2 bg-gradient-to-br from-frame-light to-frame-dark rounded-sm" />
            <div className="relative p-3 bg-white">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="max-w-full max-h-[80vh] object-contain block"
              />
            </div>
            <div className="mt-4 text-center text-white/80 text-sm font-serif">
              {painting.zoomRegions && painting.zoomRegions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {painting.zoomRegions.map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    >
                      📍 {r.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
