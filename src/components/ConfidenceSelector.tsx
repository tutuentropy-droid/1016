import { useGameStore, type Confidence } from "@/store/useGameStore";
import { getConfidenceMultiplier } from "@/utils/gameLogic";
import { audioManager } from "@/utils/audioManager";
import { ShieldAlert, Shield, ShieldCheck } from "lucide-react";

const configs: Array<{
  value: Confidence;
  label: string;
  sub: string;
  icon: typeof Shield;
  accent: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  multiplier: number;
}> = [
  {
    value: "low",
    label: "低信心",
    sub: "保险起见",
    icon: ShieldAlert,
    accent: "text-ink/50",
    activeBg: "bg-ink/10",
    activeBorder: "border-ink/40",
    activeText: "text-ink",
    multiplier: 0.7,
  },
  {
    value: "medium",
    label: "中信心",
    sub: "常规判断",
    icon: Shield,
    accent: "text-gold",
    activeBg: "bg-gold/15",
    activeBorder: "border-gold",
    activeText: "text-gold",
    multiplier: 1.0,
  },
  {
    value: "high",
    label: "高信心",
    sub: "赌上名誉",
    icon: ShieldCheck,
    accent: "text-terracotta",
    activeBg: "bg-terracotta/15",
    activeBorder: "border-terracotta",
    activeText: "text-terracotta",
    multiplier: 1.5,
  },
];

export default function ConfidenceSelector() {
  const { confidence, setConfidence, isAnswered, unlockedClueIndices } = useGameStore();

  const handleSet = (level: Confidence) => {
    setConfidence(level);
    audioManager.play("confidence_change");
    audioManager.play("paper_flip");
  };

  if (isAnswered) return null;

  const baseScore = 100 - unlockedClueIndices.length * 20;

  return (
    <div className="paper-card rounded-sm overflow-hidden animate-fadeInUp">
      <div className="px-5 py-3 border-b border-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-px h-5 bg-gold" />
          <div>
            <div className="font-display text-sm font-semibold text-ink tracking-wide">
              信心评级
            </div>
            <div className="text-[10px] text-ink/50 uppercase tracking-widest font-serif">
              Confidence Level
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-ink/50 font-serif">基础分值</div>
          <div className="font-display text-lg font-bold text-gold tabular-nums">
            {Math.max(20, baseScore)}
          </div>
        </div>
      </div>

      <div className="p-3 grid grid-cols-3 gap-2">
        {configs.map((cfg) => {
          const Icon = cfg.icon;
          const isActive = confidence === cfg.value;
          return (
            <button
              key={cfg.value}
              onClick={() => handleSet(cfg.value)}
              onMouseEnter={() => audioManager.play("option_hover")}
              className={`relative flex flex-col items-center gap-1 py-3 px-2 rounded-sm border-2 transition-all duration-200 overflow-hidden ${
                isActive
                  ? `${cfg.activeBg} ${cfg.activeBorder} ${cfg.activeText} scale-[1.02] shadow-md`
                  : "bg-white/40 border-ink/10 text-ink/60 hover:border-ink/25 hover:bg-white/70"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-y-0 left-0 w-1/3 -translate-x-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cfg.value === 'low' ? 'rgba(62,44,32,0.08)' : cfg.value === 'high' ? 'rgba(160,82,45,0.1)' : 'rgba(184,134,11,0.12)'}, transparent)`,
                      animation: "timelineProgress 2s ease-in-out infinite",
                    }}
                  />
                </div>
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={`${isActive ? cfg.activeText : cfg.accent} transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
              />
              <div
                className={`text-sm font-semibold font-display ${
                  isActive ? cfg.activeText : ""
                }`}
              >
                {cfg.label}
              </div>
              <div className="text-[10px] text-ink/40 font-serif">{cfg.sub}</div>
              <div
                className={`text-[11px] font-bold font-display tabular-nums ${
                  isActive ? cfg.activeText : "text-ink/50"
                }`}
              >
                ×{cfg.multiplier}
              </div>
              {isActive && (
                <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${cfg.activeBorder.replace('border-', 'bg-')} animate-markerPulse`} />
              )}
            </button>
          );
        })}
      </div>

      {confidence && (
        <div className="px-5 py-2.5 border-t border-ink/10 bg-ink/[0.03] flex items-center justify-between text-xs">
          <span className="text-ink/60 font-serif">
            预计得分
            <span className="mx-2 text-ink/20">·</span>
            {confidence === "low" && "答错扣分较少"}
            {confidence === "medium" && "标准奖惩比例"}
            {confidence === "high" && "答错扣分翻倍"}
          </span>
          <span className="font-display font-bold text-gold tabular-nums glow-text-gold">
            +{Math.round(Math.max(20, baseScore) * getConfidenceMultiplier(confidence))}
          </span>
        </div>
      )}
    </div>
  );
}
