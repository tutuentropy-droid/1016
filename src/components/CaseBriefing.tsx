import { useEffect, useState } from "react";
import { MapPin, Calendar, Palette, User, Globe } from "lucide-react";
import type { Painting } from "@/data/paintings";
import { artistInfos } from "@/data/paintings";
import { audioManager } from "@/utils/audioManager";

interface CaseBriefingProps {
  painting: Painting;
  options: string[];
  onComplete: () => void;
}

export default function CaseBriefing({ painting, options, onComplete }: CaseBriefingProps) {
  const [step, setStep] = useState(0);

  const suspectInfos = options
    .map((name) => artistInfos.find((a) => a.name === name))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  useEffect(() => {
    audioManager.play("briefing_tick");
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => {
        setStep(2);
        audioManager.play("briefing_tick");
      }, 1100),
      setTimeout(() => {
        setStep(3);
        audioManager.play("briefing_tick");
      }, 1800),
      setTimeout(() => {
        setStep(4);
        audioManager.play("briefing_tick");
      }, 2500),
      setTimeout(() => onComplete(), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [painting.id, onComplete]);

  return (
    <div className="fixed inset-0 z-40 bg-museum-dark/95 backdrop-blur-md flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh]"
          style={{
            background: "radial-gradient(ellipse at top, rgba(230,199,106,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="typewriter-font text-gold-soft/60 text-[10px] uppercase tracking-[0.4em]">
            Case #{painting.id.padStart(5, "0")} · Briefing
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded-full transition-all duration-500 ${
                  step >= s ? "bg-gold" : "bg-gold/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative bg-file-card/95 rounded-sm border border-gold/20 p-6 md:p-8 shadow-museum-spotlight">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="space-y-5">
            <div
              className={`transition-all duration-500 ${
                step >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div className="flex-1">
                  <div className="typewriter-font text-gold text-[10px] uppercase tracking-widest mb-0.5">
                    Location · 案发地点
                  </div>
                  <div className="font-display text-xl text-ink tracking-wide flex items-center gap-2">
                    <Globe size={14} className="text-ink/50" />
                    {painting.region}
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full bg-gold ${
                    step >= 1 ? "animate-markerPulse" : ""
                  }`}
                />
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${
                step >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center">
                  <Calendar size={18} className="text-terracotta" />
                </div>
                <div className="flex-1">
                  <div className="typewriter-font text-terracotta text-[10px] uppercase tracking-widest mb-0.5">
                    Era · 年代定位
                  </div>
                  <div className="relative h-6">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-ink/10 rounded-full" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-terracotta/50 to-terracotta rounded-full transition-all duration-1000"
                      style={{ width: step >= 2 ? "65%" : "0%" }}
                    />
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-terracotta border-2 border-white shadow-md transition-all duration-1000 ${
                        step >= 2 ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ left: step >= 2 ? "60%" : "0%" }}
                    />
                    <div className="absolute right-0 top-full mt-1 font-display text-sm text-ink">
                      {painting.year}
                    </div>
                    <div className="absolute left-0 top-full mt-1 text-[10px] text-ink/40 font-serif">
                      Timeline
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${
                step >= 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink/15 border border-ink/30 flex items-center justify-center">
                  <Palette size={18} className="text-ink" />
                </div>
                <div className="flex-1">
                  <div className="typewriter-font text-ink/60 text-[10px] uppercase tracking-widest mb-0.5">
                    Movement · 艺术流派
                  </div>
                  <div className="font-display text-xl text-ink tracking-wide">
                    {painting.movement}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${
                step >= 4 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center animate-glowPulse">
                  <User size={18} className="text-gold" />
                </div>
                <div className="flex-1">
                  <div className="typewriter-font text-gold text-[10px] uppercase tracking-widest mb-0.5">
                    Persons of Interest · 嫌疑人档案
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {suspectInfos.map((info, idx) => (
                      <div
                        key={info.name}
                        className="px-3 py-1 bg-ink/5 border border-ink/20 rounded-sm"
                        style={{
                          animation: `fadeInScale 0.5s ease-out ${0.1 + idx * 0.1}s both`,
                        }}
                      >
                        <span className="font-serif text-sm text-ink">{info.name}</span>
                        <span className="ml-2 text-[10px] text-ink/40 font-serif">
                          {info.era}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
            <div className="typewriter-font text-ink/40 text-[10px] uppercase tracking-widest">
              — Analyzing evidence —
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                  style={{
                    animation: `glowPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center typewriter-font text-gold-soft/40 text-[10px] uppercase tracking-[0.3em]">
          简报完成 · 请侦探仔细勘察证物
        </div>
      </div>
    </div>
  );
}
