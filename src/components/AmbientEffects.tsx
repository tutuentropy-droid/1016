import { useEffect, useState } from "react";

export default function AmbientEffects() {
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; top: number; delay: number; duration: number; size: number; opacity: number }>
  >([]);

  useEffect(() => {
    const count = 18;
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 30 + Math.random() * 60,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 1 + Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.35,
    }));
    setParticles(generated);
  }, []);

  return (
    <>
      <div className="cinematic-vignette animate-vignettePulse" />
      <div className="film-grain" />
      <div className="museum-spotlight animate-spotlightDrift" />
      <div className="archive-wall-bg" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle animate-dustFloat fixed z-36"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </>
  );
}
