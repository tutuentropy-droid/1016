import { useEffect, useState } from "react";
import { Folder, FileText, Eye } from "lucide-react";
import { audioManager } from "@/utils/audioManager";

interface CinematicOpeningProps {
  paintingId: string;
  onComplete: () => void;
}

export default function CinematicOpening({ paintingId, onComplete }: CinematicOpeningProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    audioManager.play("case_open");
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2300);
    const t4 = setTimeout(() => onComplete(), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [paintingId, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-museum-dark flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-museum-warm via-museum-dark to-black opacity-90" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-3xl h-[60vh] opacity-30 animate-spotlightDrift"
        style={{
          background: "radial-gradient(ellipse at top, rgba(230,199,106,0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xl px-6">
        {phase >= 0 && (
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              phase >= 1 ? "opacity-30 -translate-y-4" : "opacity-100"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Eye size={28} className="text-gold-soft" />
            </div>
            <div>
              <div className="typewriter-font text-gold-soft/80 text-xs uppercase tracking-[0.3em]">
                Art Detective Bureau
              </div>
              <div className="font-display text-3xl text-gold-soft cinematic-text-shadow">
                档案调取中...
              </div>
            </div>
          </div>
        )}

        {phase >= 1 && (
          <div
            className={`w-full transition-all duration-800 ${
              phase >= 2 ? "scale-[0.85] opacity-40" : "scale-100 opacity-100"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-3 left-6 w-24 h-5 bg-gold/70 case-folder-tab flex items-center justify-center">
                <span className="typewriter-font text-[10px] text-ink uppercase tracking-wider">
                  Case #{paintingId.padStart(5, "0")}
                </span>
              </div>
              <div className="pt-4">
                <div className="relative bg-file-card rounded-sm border border-gold/30 p-8 shadow-museum-spotlight animate-paperUnfurl">
                  <div className="absolute top-2 left-4 right-4 h-px bg-gold/30" />
                  <div className="flex items-center gap-3 mb-4">
                    <Folder size={20} className="text-gold" />
                    <span className="font-display text-lg text-ink tracking-wide">
                      机密案件档案
                    </span>
                    <span className="ml-auto text-[10px] typewriter-font text-terracotta uppercase tracking-wider">
                      Classified
                    </span>
                  </div>
                  <div className="space-y-2 pl-2">
                    <div className="h-2 bg-ink/10 rounded w-3/4" />
                    <div className="h-2 bg-ink/10 rounded w-1/2" />
                    <div className="h-2 bg-ink/10 rounded w-5/6" />
                    <div className="h-2 bg-ink/10 rounded w-2/3 mt-3" />
                    <div className="h-2 bg-ink/10 rounded w-1/3" />
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="w-10 h-10 rounded-sm bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <FileText size={16} className="text-gold" />
                    </div>
                    <div className="w-10 h-10 rounded-sm bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <FileText size={16} className="text-gold" />
                    </div>
                    <div className="w-10 h-10 rounded-sm bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <FileText size={16} className="text-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase >= 2 && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ${
              phase >= 3 ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-center">
              <div className="typewriter-font text-gold-soft/60 text-xs uppercase tracking-[0.5em] mb-3 animate-fadeInScale">
                — New Case Assigned —
              </div>
              <div className="font-display text-5xl md:text-6xl text-gold-soft cinematic-text-shadow animate-cameraPanIn tracking-wider">
                开始调查
              </div>
              <div className="mt-4 typewriter-font text-gold-soft/50 text-sm tracking-widest">
                博物馆谜案 · 艺术品真伪鉴定
              </div>
            </div>
          </div>
        )}

        {phase >= 3 && (
          <div className="absolute inset-0 bg-canvas animate-fadeInScale" />
        )}
      </div>
    </div>
  );
}
