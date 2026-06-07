import { useEffect, useState } from "react";

interface Photo {
  id: number;
  left: string;
  top: string;
  rotate: number;
  size: number;
  color: string;
  delay: number;
}

const PHOTO_COLORS = [
  "from-gold/20 to-terracotta/15",
  "from-sepia/25 to-gold/15",
  "from-ink/15 to-sepia/10",
  "from-terracotta/20 to-gold/10",
  "from-gold-soft/20 to-sepia/15",
];

export default function HomeWallBackground() {
  const [photos] = useState<Photo[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 85}%`,
      rotate: -3 + Math.random() * 6,
      size: 60 + Math.random() * 80,
      color: PHOTO_COLORS[i % PHOTO_COLORS.length],
      delay: Math.random() * 5,
    }))
  );

  const [stringLines] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x1: 10 + Math.random() * 40,
      y1: 10 + Math.random() * 40,
      x2: 50 + Math.random() * 45,
      y2: 40 + Math.random() * 50,
      delay: i * 0.6,
    }))
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {stringLines.map((l) => (
          <line
            key={l.id}
            x1={`${l.x1}%`}
            y1={`${l.y1}%`}
            x2={`${l.x2}%`}
            y2={`${l.y2}%`}
            stroke="rgba(184, 134, 11, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 3"
            className="clue-string-line"
            style={{ animationDelay: `${l.delay}s` }}
          />
        ))}
      </svg>

      {photos.map((p) => (
        <div
          key={p.id}
          className="absolute animate-photoSway"
          style={{
            left: p.left,
            top: p.top,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
          }}
        >
          <div className="photo-frame-pin" />
          <div
            className={`w-full h-full rounded-sm border border-ink/15 bg-gradient-to-br ${p.color} shadow-sm`}
            style={{
              backdropFilter: "blur(1px)",
            }}
          >
            <div className="absolute inset-2 border border-white/30 rounded-sm opacity-50" />
            <div
              className="absolute bottom-1 left-2 right-2 h-1 rounded-full opacity-40"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(62,44,32,0.2), transparent)",
              }}
            />
          </div>
        </div>
      ))}

      <div className="absolute top-8 left-10 w-28 h-28 rounded-full ink-blob" />
      <div className="absolute bottom-16 right-16 w-36 h-36 rounded-full ink-blob" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full coffee-stain" />
    </div>
  );
}
