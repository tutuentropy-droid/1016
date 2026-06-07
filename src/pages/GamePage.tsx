import { useEffect } from "react";
import { Search } from "lucide-react";
import ScoreBoard from "@/components/ScoreBoard";
import PaintingCard from "@/components/PaintingCard";
import OptionButton from "@/components/OptionButton";
import FeedbackPanel from "@/components/FeedbackPanel";
import CluePanel from "@/components/CluePanel";
import ConfidenceSelector from "@/components/ConfidenceSelector";
import { useGameStore } from "@/store/useGameStore";

export default function GamePage() {
  const { nextQuestion, options, isAnswered, currentPainting } = useGameStore();

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  return (
    <div className="min-h-screen py-6 md:py-8 px-3 md:px-4 bg-paper-texture">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 md:mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
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
          </div>
        </header>

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
            className="lg:sticky lg:top-6 space-y-5 self-start animate-fadeInUp"
            style={{ animationDelay: "320ms" }}
          >
            <CluePanel />

            <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2">
              <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
                <span className="text-gold">📋</span>
                <span>调查守则</span>
              </div>
              <p>· 不查看线索直接答对可获得 <span className="text-gold font-bold">100 分</span></p>
              <p>· 每解锁一条线索扣除 <span className="text-terracotta font-semibold">20 分</span></p>
              <p>· 选择 <span className="text-terracotta font-semibold">高信心</span> 答对 ×1.5，答错扣分翻倍</p>
              <p>· 连续答对 <span className="text-orange-600 font-semibold">3 题以上</span> 可获得分数加成</p>
            </div>
          </div>
        </div>

        <footer className="mt-14 md:mt-20 text-center text-[11px] text-ink/40 font-serif space-y-1">
          <p>所有画作图片均来自公共领域（Wikimedia Commons / Google Art Project）</p>
          <p className="tracking-widest uppercase text-[10px]">— Case File Closed —</p>
        </footer>
      </div>
    </div>
  );
}
