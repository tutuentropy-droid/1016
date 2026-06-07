import { useEffect } from "react";
import { Search } from "lucide-react";
import ScoreBoard from "@/components/ScoreBoard";
import PaintingCard from "@/components/PaintingCard";
import OptionButton from "@/components/OptionButton";
import FeedbackPanel from "@/components/FeedbackPanel";
import { useGameStore } from "@/store/useGameStore";

export default function GamePage() {
  const { nextQuestion, options, isAnswered } = useGameStore();

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Search className="text-gold" size={32} strokeWidth={2} />
            <h1 className="font-display text-4xl font-bold text-ink tracking-tight">
              艺术侦探
            </h1>
          </div>
          <p className="text-ink/60 font-serif">Art Detective · 看画猜作者</p>
          <div className="mt-6 w-24 h-px bg-gold/50 mx-auto" />
        </header>

        <div className="mb-10">
          <ScoreBoard />
        </div>

        <div className="mb-12">
          <PaintingCard />
        </div>

        {!isAnswered ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((artist) => (
              <OptionButton key={artist} artist={artist} />
            ))}
          </div>
        ) : (
          <FeedbackPanel />
        )}

        <footer className="mt-16 text-center text-xs text-ink/40 font-serif">
          所有画作图片均来自公共领域（Wikimedia Commons）
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
