import { useEffect, useMemo, useState } from "react";
import { useGameStore, getDetectiveRank } from "@/store/useGameStore";
import { audioManager } from "@/utils/audioManager";
import { artistInfos } from "@/data/paintings";
import {
  Check,
  X,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  Award,
  Sparkles,
  Network,
  Brain,
  User,
  Link2,
} from "lucide-react";

export default function FeedbackPanel() {
  const {
    isAnswered,
    currentPainting,
    totalScore,
    correctCount,
    totalAnswered,
    streak,
    bestStreak,
    lastScoreDelta,
    lastResultCorrect,
    unlockedClueIndices,
    confidence,
    selectedAnswer,
    nextQuestion,
  } = useGameStore();

  const [showConnections, setShowConnections] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      audioManager.play(lastResultCorrect ? "answer_correct" : "answer_wrong");
      if (lastResultCorrect) {
        setTimeout(() => audioManager.play("stamp_hit"), 400);
      }
      const t = setTimeout(() => setShowConnections(true), 600);
      return () => clearTimeout(t);
    } else {
      setShowConnections(false);
    }
  }, [isAnswered, lastResultCorrect]);

  const confidenceLabel = useMemo(() => {
    switch (confidence) {
      case "low":
        return "低信心";
      case "high":
        return "高信心";
      case "medium":
      default:
        return "中信心";
    }
  }, [confidence]);

  if (!isAnswered || !currentPainting) return null;

  const isCorrect = lastResultCorrect;
  const rank = getDetectiveRank(totalScore);
  const prevRank = getDetectiveRank(Math.max(0, totalScore - (lastScoreDelta ?? 0)));
  const leveledUp = rank.level > prevRank.level;

  const correctArtistInfo = artistInfos.find((a) => a.name === currentPainting.artist);
  const selectedArtistInfo = selectedAnswer
    ? artistInfos.find((a) => a.name === selectedAnswer)
    : null;

  const misleadingReasons = useMemo(() => {
    if (isCorrect || !selectedArtistInfo || !correctArtistInfo) return [];
    const reasons: string[] = [];
    if (selectedArtistInfo.movement.split(/[\/、]/).some((m) =>
      correctArtistInfo.movement.includes(m.trim()) ||
      currentPainting.movement.includes(m.trim())
    )) {
      reasons.push(`「${selectedArtistInfo.name}」同属相近艺术流派（${selectedArtistInfo.movement}），风格表现有相似之处`);
    }
    if (selectedArtistInfo.region.split(/[\/、]/).some((r) =>
      correctArtistInfo.region.includes(r.trim())
    )) {
      reasons.push(`两位艺术家均活跃于 ${selectedArtistInfo.region} 地区，存在地域文化影响的重叠`);
    }
    const sEra = selectedArtistInfo.era.match(/\d{4}/g);
    const cEra = correctArtistInfo.era.match(/\d{4}/g);
    if (sEra && cEra) {
      const sEnd = parseInt(sEra[1] || sEra[0]);
      const cStart = parseInt(cEra[0]);
      if (Math.abs(sEnd - cStart) < 80) {
        reasons.push(`创作年代较为接近（${selectedArtistInfo.era} vs ${correctArtistInfo.era}），时代审美取向有交集`);
      }
    }
    if (reasons.length === 0) {
      reasons.push(`这幅作品的某些视觉元素（构图、色彩、题材）容易让人联想到 ${selectedArtistInfo.name} 的创作风格`);
      reasons.push(`建议重点关注笔触特征、色彩偏好和典型题材来区分两位艺术家`);
    }
    return reasons;
  }, [isCorrect, selectedArtistInfo, correctArtistInfo, currentPainting]);

  return (
    <div className="animate-fadeInUp space-y-4" style={{ animationDelay: "100ms" }}>
      <div
        className={`relative overflow-hidden file-card ${
          isCorrect ? "" : "animate-shake"
        }`}
      >
        {isCorrect && showConnections && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            preserveAspectRatio="none"
          >
            <line
              x1="15%"
              y1="30%"
              x2="75%"
              y2="30%"
              stroke="#D4A017"
              strokeWidth="1.5"
              className="clue-string-line"
              style={{ animationDelay: "0.1s" }}
            />
            <line
              x1="15%"
              y1="50%"
              x2="70%"
              y2="55%"
              stroke="#D4A017"
              strokeWidth="1.5"
              className="clue-string-line"
              style={{ animationDelay: "0.3s" }}
            />
            <line
              x1="20%"
              y1="70%"
              x2="65%"
              y2="75%"
              stroke="#B8860B"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="clue-string-line"
              style={{ animationDelay: "0.5s" }}
            />
          </svg>
        )}

        <div
          className={`absolute inset-0 opacity-20 ${
            isCorrect
              ? "bg-gradient-to-br from-green-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />

        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                isCorrect ? "bg-green-500" : "bg-terracotta"
              } ${isCorrect ? "animate-glowPulse" : ""}`}
            >
              {isCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <X size={28} strokeWidth={3.5} className="text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className={`font-display text-2xl md:text-3xl font-bold ${
                    isCorrect ? "text-success-deep" : "text-error-deep"
                  }`}
                >
                  {isCorrect ? "案件破解" : "误判线索"}
                </div>

                {isCorrect && (
                  <div className="stamp animate-stampHit text-xs">
                    <FileCheck size={12} className="mr-1" />
                    CASE CLOSED
                  </div>
                )}
              </div>

              {!isCorrect && (
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-terracotta font-serif">
                  <AlertTriangle size={14} />
                  正确答案是：
                  <span className="font-bold">{currentPainting.artist}</span>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs">
                <span className="px-2.5 py-1 rounded-sm bg-ink/5 text-ink/70 font-serif border border-ink/10">
                  线索：{unlockedClueIndices.length} / {currentPainting.clues.length}
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-ink/5 text-ink/70 font-serif border border-ink/10">
                  信心：{confidenceLabel}
                </span>
                {isCorrect && streak >= 2 && (
                  <span className="px-2.5 py-1 rounded-sm bg-orange-500/10 text-orange-700 font-serif border border-orange-500/20 flex items-center gap-1">
                    <Sparkles size={12} />
                    连胜 {streak} 题
                  </span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <div
                className={`font-display text-3xl md:text-4xl font-bold tabular-nums animate-scorePop ${
                  lastScoreDelta > 0 ? "text-green-700" : "text-terracotta"
                }`}
                key={lastScoreDelta}
              >
                {lastScoreDelta > 0 ? "+" : ""}
                {lastScoreDelta}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-ink/40 font-serif mt-0.5">
                本次得分
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isCorrect && misleadingReasons.length > 0 && (
        <div className="relative file-card overflow-hidden animate-slideInRight" style={{ animationDelay: "300ms" }}>
          <div className="px-5 py-3 border-b border-terracotta/20 bg-terracotta/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center">
              <Brain size={16} className="text-terracotta" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-terracotta tracking-wide">
                误判分析
              </div>
              <div className="text-[10px] text-terracotta/60 uppercase tracking-widest font-serif">
                Misjudgment Analysis
              </div>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-2.5">
            {misleadingReasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 animate-fadeInUp"
                style={{ animationDelay: `${400 + i * 120}ms` }}
              >
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-terracotta">{i + 1}</span>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed font-serif">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isCorrect && correctArtistInfo && (
        <div className="relative file-card overflow-hidden animate-slideInLeft" style={{ animationDelay: "300ms" }}>
          <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(212,160,23,0.6) 0%, transparent 70%)",
            }}
          />
          <div className="px-5 py-3 border-b border-gold/20 bg-gold/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center animate-glowPulse">
              <User size={16} className="text-gold" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="font-display text-base font-semibold text-gold tracking-wide">
                  艺术家档案
                </div>
                <div className="text-[10px] text-gold/60 uppercase tracking-widest font-serif">
                  Artist Profile · Confirmed
                </div>
              </div>
              {showConnections && (
                <Network size={14} className="text-gold animate-badgeFloat" />
              )}
            </div>
          </div>
          <div className="p-4 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="姓名" value={correctArtistInfo.name} highlight />
              <Field label="年代" value={correctArtistInfo.era} />
              <Field label="地区" value={correctArtistInfo.region} />
              <Field label="流派" value={correctArtistInfo.movement} />
            </div>
            {showConnections && (
              <div className="mt-4 pt-4 border-t border-gold/20 flex items-center gap-2 text-xs text-gold/70 font-serif animate-fadeInScale">
                <Link2 size={14} />
                <span>
                  已关联 {unlockedClueIndices.length} 条线索与艺术家档案成功匹配
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {leveledUp && isCorrect && (
        <div
          className="animate-stampHit relative paper-card rounded-sm p-4 border-2 border-gold/40 bg-gradient-to-r from-gold/5 via-parchment/50 to-gold/5"
          style={{ animationDelay: "500ms" }}
        >
          {(() => {
            audioManager.play("level_up");
            return null;
          })()}
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-badgeFloat">{rank.badge}</div>
            <div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gold" />
                <span className="font-display text-lg font-bold text-gold">
                  评级提升！
                </span>
              </div>
              <div className="text-sm text-ink/70 font-serif mt-0.5">
                {prevRank.title} <span className="mx-1.5">→</span>
                <span className="font-semibold text-ink">{rank.title}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="file-card overflow-hidden animate-fadeInUp" style={{ animationDelay: "400ms" }}>
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2.5">
          <div className="w-1 h-5 bg-gold rounded-full" />
          <h3 className="font-display text-base font-semibold text-ink tracking-wide">
            结案档案 · 作品信息
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-ink/40 font-serif ml-auto">
            Exhibit Report
          </span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <Field label="作者" value={currentPainting.artist} />
            <Field label="年代" value={currentPainting.year} />
            <Field label="画派" value={currentPainting.movement} />
            <Field label="地区" value={currentPainting.region} />
          </div>

          <div className="border-t border-ink/10 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-gold font-serif mb-2">
              作品背景
            </div>
            <p className="text-ink/80 leading-relaxed font-serif text-sm">
              {currentPainting.description}
            </p>
          </div>

          {unlockedClueIndices.length < currentPainting.clues.length && (
            <div className="mt-4 pt-4 border-t border-ink/10">
              <div className="text-[10px] uppercase tracking-widest text-ink/40 font-serif mb-2">
                未使用的线索（结案后可见）
              </div>
              <div className="space-y-1.5">
                {currentPainting.clues
                  .filter((_, i) => !unlockedClueIndices.includes(i))
                  .map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-ink/50 font-serif"
                    >
                      <span className="text-gold/60">▸</span>
                      <span className="font-semibold text-ink/60">{c.label}：</span>
                      <span>{c.content}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          audioManager.play("next_question");
          audioManager.play("paper_flip");
          nextQuestion();
        }}
        className="w-full group relative py-4 px-6 rounded-sm bg-gold hover:bg-gold-light text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        style={{ animationDelay: "500ms" }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          调查下一案
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-ink/50 font-serif py-1 animate-fadeInUp" style={{ animationDelay: "600ms" }}>
        <span>
          累计得分：<span className="font-bold text-gold tabular-nums">{totalScore}</span>
        </span>
        <span className="w-px h-3 bg-ink/20" />
        <span>
          战绩：
          <span className="font-semibold text-ink tabular-nums">
            {correctCount} / {totalAnswered}
          </span>
        </span>
        {bestStreak >= 3 && (
          <>
            <span className="w-px h-3 bg-ink/20" />
            <span>
              最佳连胜：<span className="font-semibold text-orange-600">{bestStreak}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-ink/50 mb-1 font-serif">
        {label}
      </div>
      <div
        className={`font-serif ${
          highlight ? "text-gold font-bold glow-text-gold" : "text-ink font-medium"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
