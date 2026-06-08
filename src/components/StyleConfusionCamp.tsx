import { useMemo } from "react";
import { useGameStore, type ConfusionCampPhase } from "@/store/useGameStore";
import { paintings, getAllCampCombinations, DIMENSION_LABELS } from "@/data/paintings";
import type { ConfusionCampCombination, ConfusionDimension } from "@/data/paintings";
import {
  Target,
  Brain,
  Eye,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Award,
  Zap,
  BookOpen,
  Users,
  Palette,
  Brush,
  Sun,
  LayoutGrid,
  Heart,
  Trophy,
  Clock,
  RotateCcw,
  Home,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";

export default function StyleConfusionCamp() {
  const {
    campPhase,
    campCurrentCombination,
    campQuestions,
    campCurrentQuestionIndex,
    campAnswers,
    campSelectedAnswer,
    campLastAnswerCorrect,
    campReport,
    campWeaknessItemIds,
    campTotalScore,
    selectCampCombination,
    startCamp,
    submitCampAnswer,
    nextCampQuestion,
    startWeaknessTraining,
    finishCamp,
    resetCamp,
  } = useGameStore();

  const currentQuestion = campQuestions[campCurrentQuestionIndex];
  const currentPainting = useMemo(() => {
    if (!currentQuestion) return null;
    return paintings.find((p) => p.id === currentQuestion.paintingId) || null;
  }, [currentQuestion]);

  return (
    <div className="space-y-5 animate-fadeInUp">
      <CampHeader completedCount={campAnswers.length} score={campTotalScore} />

      {campPhase === "selection" && (
        <SelectionStage onSelect={(id) => {
          audioManager.play("paper_flip");
          selectCampCombination(id);
        }} />
      )}

      {campPhase === "briefing" && campCurrentCombination && (
        <BriefingStage
          combination={campCurrentCombination}
          onStart={() => {
            audioManager.play("paper_flip");
            startCamp();
          }}
        />
      )}

      {(campPhase === "playing" || campPhase === "weakness") && currentQuestion && currentPainting && (
        <PlayingStage
          phase={campPhase}
          combination={campCurrentCombination!}
          question={currentQuestion}
          painting={currentPainting}
          questionIndex={campCurrentQuestionIndex}
          totalQuestions={campQuestions.length}
          onSelect={(answer) => {
            audioManager.play("detail_focus");
            submitCampAnswer(answer);
            if (answer === currentQuestion.correctAnswer) {
              audioManager.play("answer_correct");
            } else {
              audioManager.play("answer_wrong");
            }
          }}
        />
      )}

      {campPhase === "feedback" && currentQuestion && currentPainting && campCurrentCombination && (
        <FeedbackStage
          combination={campCurrentCombination}
          question={currentQuestion}
          painting={currentPainting}
          selectedAnswer={campSelectedAnswer}
          isCorrect={campLastAnswerCorrect}
          questionIndex={campCurrentQuestionIndex}
          totalQuestions={campQuestions.length}
          hasWeaknessItems={campWeaknessItemIds.length > 0}
          isLastQuestion={campCurrentQuestionIndex >= campQuestions.length - 1}
          onNext={() => {
            audioManager.play("next_question");
            nextCampQuestion();
          }}
          onFinish={() => {
            audioManager.play("next_question");
            finishCamp();
          }}
          onWeakness={() => {
            audioManager.play("paper_flip");
            startWeaknessTraining();
          }}
        />
      )}

      {campPhase === "report" && campReport && campCurrentCombination && (
        <ReportStage
          combination={campCurrentCombination}
          report={campReport}
          totalScore={campTotalScore}
          answers={campAnswers}
          onReset={() => {
            audioManager.play("paper_flip");
            resetCamp();
          }}
          onRestart={() => {
            audioManager.play("paper_flip");
            selectCampCombination(campCurrentCombination.id);
          }}
        />
      )}
    </div>
  );
}

function CampHeader({ completedCount, score }: { completedCount: number; score: number }) {
  return (
    <div className="file-card overflow-hidden">
      <div className="px-5 py-4 border-b border-teal-900/20 bg-gradient-to-r from-teal-900/10 via-emerald-700/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-900/20 border border-teal-700/40 flex items-center justify-center">
            <Target size={18} className="text-teal-800" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-ink tracking-wide">
                风格混淆训练营
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-serif bg-teal-900/20 text-teal-800 rounded-sm uppercase tracking-wider">
                Style Confusion Camp
              </span>
            </div>
            <p className="text-xs text-ink/50 font-serif mt-0.5">
              分辨极易混淆的艺术家 · 掌握关键差异点 · 突破你的识别盲区
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-lg font-bold text-teal-800 tabular-nums">
              {completedCount}
            </div>
            <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
              Answered
            </div>
            {score > 0 && (
              <div className="font-display text-sm font-bold text-gold tabular-nums mt-0.5">
                +{score}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectionStage({ onSelect }: { onSelect: (id: string) => void }) {
  const combinations = getAllCampCombinations();
  const difficultyLabel = { normal: "常规", hard: "困难", expert: "专家" };
  const difficultyColor = {
    normal: "text-emerald-700 bg-emerald-900/10",
    hard: "text-amber-600 bg-amber-900/10",
    expert: "text-terracotta bg-terracotta/10",
  };

  const dimIcons: Record<ConfusionDimension, typeof Palette> = {
    color: Palette,
    brushstroke: Brush,
    light: Sun,
    composition: LayoutGrid,
    theme: BookOpen,
    emotion: Heart,
  };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-ink/10 bg-teal-900/5 flex items-center gap-2">
          <Brain size={14} className="text-teal-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            选择训练组合 · Training Module
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto uppercase tracking-wider">
            {combinations.length} Modules
          </span>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {combinations.map((combo, idx) => (
            <button
              key={combo.id}
              onClick={() => onSelect(combo.id)}
              onMouseEnter={() => audioManager.play("option_hover")}
              className="group relative overflow-hidden rounded-sm border border-ink/10 bg-white/60 hover:bg-teal-900/5 hover:border-teal-900/40 transition-all text-left p-4 animate-fadeInUp"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="font-display text-base font-semibold text-ink group-hover:text-teal-900 transition-colors">
                      {combo.title}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-sm font-serif font-semibold ${difficultyColor[combo.difficulty]}`}
                    >
                      {difficultyLabel[combo.difficulty]}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-ink/40 font-serif">
                    {combo.titleEn}
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 mt-1 text-ink/30 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <p className="text-xs text-ink/60 font-serif mb-3 leading-relaxed">
                {combo.subtitle}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {combo.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 px-2 py-1 bg-ink/[0.03] rounded-sm border border-ink/5"
                  >
                    <Users size={11} className="text-teal-800/60" />
                    <span className="text-[10px] font-serif text-ink/70">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {combo.keyDifferences.slice(0, 4).map((diff) => {
                  const Icon = dimIcons[diff.dimension];
                  return (
                    <span
                      key={diff.dimension}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-serif text-teal-800/80 bg-teal-900/5 rounded-sm"
                    >
                      <Icon size={10} />
                      {diff.dimensionLabel}
                    </span>
                  );
                })}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp">
        <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
          <span className="text-teal-800">🎯</span>
          <span>训练守则</span>
        </div>
        <p>· 每个训练营围绕一组「高混淆艺术家/风格」展开</p>
        <p>· 每题答对基础 <span className="text-gold font-bold">60 分</span>，5 秒内答对额外 +<span className="text-gold font-bold">20 分</span></p>
        <p>· 系统会告诉你「为什么容易看错」及关键差异点</p>
        <p>· 完成后有<span className="text-terracotta font-semibold">「弱点特训」</span>针对你容易混淆的作品</p>
        <p>· 结算时展示「<span className="text-teal-800 font-semibold">风格辨识报告</span>」，总结你的误判模式</p>
      </div>
    </div>
  );
}

function BriefingStage({
  combination,
  onStart,
}: {
  combination: ConfusionCampCombination;
  onStart: () => void;
}) {
  const dimIcons: Record<ConfusionDimension, typeof Palette> = {
    color: Palette,
    brushstroke: Brush,
    light: Sun,
    composition: LayoutGrid,
    theme: BookOpen,
    emotion: Heart,
  };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-5 py-3 border-b border-teal-900/20 bg-gradient-to-r from-teal-900/10 to-transparent flex items-center gap-2">
          <BookOpen size={14} className="text-teal-800" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            训练简报 · Training Brief
          </h3>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-900/15 flex items-center justify-center flex-shrink-0">
              <Target size={14} className="text-teal-800" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink">
                {combination.title}
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                {combination.titleEn}
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-900/[0.04] rounded-sm border border-teal-900/10 mb-4">
            <p className="text-sm text-ink/80 leading-relaxed font-serif">
              {combination.background}
            </p>
          </div>

          <div className="text-[11px] text-ink/50 font-serif mb-3 uppercase tracking-wider">
            训练对象
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            {combination.items.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-white/50 rounded-sm border border-ink/10 animate-fadeInUp"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="font-display text-sm font-semibold text-ink mb-1">
                  {item.label}
                </div>
                <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mb-2">
                  {item.labelEn}
                </div>
                <p className="text-xs text-ink/60 font-serif mb-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-1">
                  {item.keyFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-ink/70 font-serif">
                      <Sparkles size={10} className="text-teal-800 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-ink/50 font-serif mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb size={12} className="text-gold" />
            关键差异维度 · Key Differences
          </div>
          <div className="space-y-2.5 mb-5">
            {combination.keyDifferences.map((diff, i) => {
              const Icon = dimIcons[diff.dimension];
              return (
                <div
                  key={diff.dimension}
                  className="flex items-start gap-2.5 p-3 bg-gold/[0.04] rounded-sm border border-gold/15 animate-fadeInUp"
                  style={{ animationDelay: `${100 + i * 80}ms` }}
                >
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-gold" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gold font-serif mb-0.5">
                      {diff.dimensionLabel}
                    </div>
                    <p className="text-xs text-ink/70 leading-relaxed font-serif">
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-start gap-2 p-3 bg-teal-900/[0.04] rounded-sm border border-teal-900/15">
            <Zap size={14} className="text-teal-800 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-teal-800 font-serif mb-0.5">
                训练提示
              </div>
              <p className="text-xs text-ink/60 font-serif leading-relaxed">
                答题时，请特别关注以上列出的差异维度。答错后系统会详细解释你可能被什么特征误导了。
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.4), transparent)",
            }}
          />
        </span>
        <span className="relative flex items-center gap-2">
          <Target size={18} />
          开始训练 · 进入辨识挑战
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </button>
    </div>
  );
}

function PlayingStage({
  phase,
  combination,
  question,
  painting,
  questionIndex,
  totalQuestions,
  onSelect,
}: {
  phase: ConfusionCampPhase;
  combination: ConfusionCampCombination;
  question: ReturnType<typeof useGameStore.getState>["campQuestions"][number];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  questionIndex: number;
  totalQuestions: number;
  onSelect: (answer: string) => void;
}) {
  const isWeakness = phase === "weakness";

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="file-card overflow-hidden">
        <div className="px-4 py-2.5 border-b border-ink/10 bg-teal-900/5 flex items-center gap-2">
          <Eye size={13} className="text-teal-800" />
          <h4 className="font-display text-xs font-semibold text-ink/70 tracking-wider uppercase">
            {isWeakness ? "弱点特训 · Weakness Drill" : "快速辨识 · Identification"}
          </h4>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] text-ink/40 font-serif uppercase tracking-wider">
              {questionIndex + 1} / {totalQuestions}
            </span>
            {isWeakness && (
              <span className="px-1.5 py-0.5 text-[10px] font-serif bg-terracotta/10 text-terracotta rounded-sm">
                弱点
              </span>
            )}
          </div>
        </div>
        <div className="p-2 bg-gradient-to-br from-museum-dark to-museum-warm rounded-b-sm">
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <img
              src={painting?.imageUrl}
              alt={painting?.title}
              className="w-full h-full object-cover transition-all duration-500 animate-fadeIn"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
              <Clock size={11} className="text-teal-300 animate-markerPulse" />
              <span className="text-[10px] text-teal-200 font-serif uppercase tracking-wider">
                {combination.title}
              </span>
            </div>
            {isWeakness && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-terracotta/80 backdrop-blur-sm rounded-sm">
                <Zap size={11} className="text-white" />
                <span className="text-[10px] text-white font-serif uppercase tracking-wider">
                  Weakness Focus
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="file-card p-4 animate-fadeInUp">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900/15 flex items-center justify-center flex-shrink-0">
            <BookOpen size={14} className="text-teal-800" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-ink mb-1">
              《{painting?.title}》· {painting?.year}
            </div>
            <p className="text-xs text-ink/60 font-serif leading-relaxed">
              {painting?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fadeInUp">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-1 h-4 bg-teal-800 rounded-full" />
          <h3 className="font-display text-sm font-semibold text-ink/80 tracking-wider uppercase">
            {question.questionText}
          </h3>
          <span className="text-[10px] text-ink/40 font-serif ml-auto">
            Pick Your Answer
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              onMouseEnter={() => audioManager.play("option_hover")}
              className="group relative overflow-hidden rounded-sm border border-ink/10 bg-white/60 hover:bg-teal-900/5 hover:border-teal-900/40 transition-all text-left p-4 animate-fadeInUp"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-900/15 border border-teal-900/25 flex items-center justify-center group-hover:bg-teal-800 group-hover:border-teal-700 transition-all">
                  <span className="font-display text-sm font-bold text-teal-800 group-hover:text-white transition-colors tabular-nums">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-display text-base font-semibold text-ink group-hover:text-teal-900 transition-colors">
                    {opt}
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 text-ink/30 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedbackStage({
  combination,
  question,
  painting,
  selectedAnswer,
  isCorrect,
  questionIndex,
  totalQuestions,
  hasWeaknessItems,
  isLastQuestion,
  onNext,
  onFinish,
  onWeakness,
}: {
  combination: ConfusionCampCombination;
  question: ReturnType<typeof useGameStore.getState>["campQuestions"][number];
  painting: ReturnType<typeof useGameStore.getState>["currentPainting"];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  questionIndex: number;
  totalQuestions: number;
  hasWeaknessItems: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onFinish: () => void;
  onWeakness: () => void;
}) {
  const correctItem = combination.items.find((i) => i.id === question.correctItemId);

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div
        className={`relative overflow-hidden file-card ${
          isCorrect ? "" : "animate-shake"
        }`}
      >
        <div
          className={`absolute inset-0 opacity-20 ${
            isCorrect
              ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
              : "bg-gradient-to-br from-terracotta/15 via-transparent to-transparent"
          }`}
        />
        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                isCorrect ? "bg-emerald-600" : "bg-terracotta"
              } ${isCorrect ? "animate-glowPulse" : ""}`}
            >
              {isCorrect ? (
                <Check size={28} strokeWidth={3.5} className="text-white" />
              ) : (
                <X size={28} strokeWidth={3.5} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-display text-2xl md:text-3xl font-bold ${
                  isCorrect ? "text-success-deep" : "text-error-deep"
                }`}
              >
                {isCorrect ? "辨识准确" : "辨识失误"}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm font-serif">
                {!isCorrect && selectedAnswer && (
                  <span className="text-terracotta flex items-center gap-1">
                    <AlertTriangle size={13} />
                    你的判断：{selectedAnswer}
                  </span>
                )}
                {correctItem && (
                  <span className="px-2.5 py-1 rounded-sm bg-teal-900/10 text-teal-900 border border-teal-900/20 font-serif text-xs font-semibold">
                    正确：{correctItem.label}（{correctItem.labelEn}）
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative file-card overflow-hidden animate-slideInLeft">
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(13, 148, 136, 0.6) 0%, transparent 70%)",
          }}
        />
        <div className="px-5 py-3 border-b border-teal-900/20 bg-teal-900/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900/20 flex items-center justify-center">
            <Brain size={14} className="text-teal-800" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-teal-900 tracking-wide">
              为什么容易看错 · Why It's Confusing
            </div>
            <div className="text-[10px] text-teal-800/60 uppercase tracking-widest font-serif">
              Confusion Analysis
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4 p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-14 h-14 overflow-hidden rounded-sm flex-shrink-0">
              <img
                src={painting?.imageUrl}
                alt={painting?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-sm font-semibold text-ink">
                《{painting?.title}》
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                实际作者：{question.correctAnswer} · {painting?.year}
              </div>
              <div className="text-xs text-ink/50 font-serif mt-0.5">
                所属画派：{painting?.movement}
              </div>
            </div>
          </div>

          <p className="text-sm text-ink/80 leading-relaxed font-serif mb-5">
            {question.confusionExplanation}
          </p>

          <div className="space-y-2.5">
            <div className="text-[10px] uppercase tracking-widest text-teal-800 font-serif mb-2 flex items-center gap-1.5">
              <Lightbulb size={11} className="text-gold" />
              关键差异点对照
            </div>
            {combination.keyDifferences.map((diff, i) => {
              const isRelevant = question.keyDimensions.includes(diff.dimension);
              return (
                <div
                  key={diff.dimension}
                  className={`flex items-start gap-2.5 animate-fadeInUp p-3 rounded-sm border transition-all ${
                    isRelevant
                      ? "bg-gold/[0.06] border-gold/20"
                      : "bg-ink/[0.02] border-ink/5"
                  }`}
                  style={{ animationDelay: `${100 + i * 80}ms` }}
                >
                  <div
                    className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                      isRelevant ? "bg-gold/25" : "bg-ink/10"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold ${
                        isRelevant ? "text-gold" : "text-ink/40"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-sm font-semibold font-serif ${
                        isRelevant ? "text-gold" : "text-ink/60"
                      }`}
                    >
                      {DIMENSION_LABELS[diff.dimension]}
                      {isRelevant && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-gold/15 text-gold rounded-sm">
                          重点
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-relaxed font-serif ${
                        isRelevant ? "text-ink/80" : "text-ink/50"
                      }`}
                    >
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!isCorrect && correctItem && (
        <div className="relative file-card overflow-hidden animate-slideInRight">
          <div className="px-4 py-2.5 border-b border-terracotta/20 bg-terracotta/5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-terracotta/20 flex items-center justify-center">
              <AlertTriangle size={13} className="text-terracotta" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-terracotta tracking-wide">
                学习要点
              </div>
              <div className="text-[10px] text-terracotta/60 uppercase tracking-widest font-serif">
                Learning Points
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {correctItem.keyFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2 animate-fadeInUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Sparkles size={12} className="text-terracotta mt-0.5 flex-shrink-0" />
                <p className="text-sm text-ink/80 leading-relaxed font-serif">{f}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLastQuestion && (
        <button
          onClick={onNext}
          className="w-full group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className="absolute inset-y-0 left-0 w-1/3 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.4), transparent)",
              }}
            />
          </span>
          <span className="relative flex items-center gap-2">
            <ArrowRight size={18} />
            下一题 · {questionIndex + 2} / {totalQuestions}
          </span>
        </button>
      )}

      {isLastQuestion && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={onFinish}
            className="group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <BarChart3 size={18} />
              查看辨识报告
            </span>
          </button>
          {hasWeaknessItems && (
            <button
              onClick={onWeakness}
              className="group relative py-4 px-6 rounded-sm bg-terracotta hover:bg-terracotta/90 text-white font-serif text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta via-terracotta/90 to-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <Zap size={18} />
                弱点特训（{hasWeaknessItems ? 3 : 0}题）
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ReportStage({
  combination,
  report,
  totalScore,
  answers,
  onReset,
  onRestart,
}: {
  combination: ConfusionCampCombination;
  report: ReturnType<typeof useGameStore.getState>["campReport"];
  totalScore: number;
  answers: ReturnType<typeof useGameStore.getState>["campAnswers"];
  onReset: () => void;
  onRestart: () => void;
}) {
  const accuracyPercent = Math.round(report.accuracy * 100);
  const avgTimeSeconds = (report.averageTimePerQuestion / 1000).toFixed(1);

  const dimIcons: Record<ConfusionDimension, typeof Palette> = {
    color: Palette,
    brushstroke: Brush,
    light: Sun,
    composition: LayoutGrid,
    theme: BookOpen,
    emotion: Heart,
  };

  return (
    <div className="space-y-4 animate-fadeInUp">
      <div className="relative file-card overflow-hidden animate-fadeInUp">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(13, 148, 136, 0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative p-6 md:p-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center animate-glowPulse shadow-lg">
              <Trophy size={36} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="font-display text-2xl md:text-3xl font-bold text-ink mb-2">
            训练完成
          </div>
          <p className="text-sm text-ink/60 font-serif mb-5 max-w-md mx-auto leading-relaxed">
            {report.progressMessage}
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-5">
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="font-display text-2xl font-bold text-teal-800 tabular-nums">
                {report.correctCount}/{report.totalQuestions}
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                正确数
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="font-display text-2xl font-bold text-gold tabular-nums">
                {accuracyPercent}%
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                正确率
              </div>
            </div>
            <div className="p-3 bg-ink/[0.03] rounded-sm border border-ink/5">
              <div className="font-display text-2xl font-bold text-ink/70 tabular-nums">
                {avgTimeSeconds}s
              </div>
              <div className="text-[10px] text-ink/40 font-serif uppercase tracking-wider mt-0.5">
                平均用时
              </div>
            </div>
          </div>
          {totalScore > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-sm border border-gold/20">
              <Award size={14} className="text-gold" />
              <span className="font-display text-lg font-bold text-gold tabular-nums">
                +{totalScore} 分
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative file-card overflow-hidden animate-slideInLeft">
        <div className="px-5 py-3 border-b border-teal-900/20 bg-teal-900/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900/20 flex items-center justify-center">
            <BarChart3 size={14} className="text-teal-800" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-teal-900 tracking-wide">
              风格辨识报告 · Style Identification Report
            </div>
            <div className="text-[10px] text-teal-800/60 uppercase tracking-widest font-serif">
              {combination.titleEn}
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-5">
            <div className="text-[11px] text-ink/50 font-serif mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={12} className="text-teal-800" />
              训练内容
            </div>
            <p className="text-sm text-ink/70 font-serif leading-relaxed p-3 bg-teal-900/[0.04] rounded-sm border border-teal-900/10">
              {combination.background}
            </p>
          </div>

          {report.strongDimensions.length > 0 && (
            <div className="mb-5">
              <div className="text-[11px] text-ink/50 font-serif mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Check size={12} className="text-emerald-600" />
                你的强项维度
              </div>
              <div className="flex flex-wrap gap-2">
                {report.strongDimensions.map((dim) => {
                  const Icon = dimIcons[dim.dimension];
                  return (
                    <div
                      key={dim.dimension}
                      className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-sm border border-emerald-200"
                    >
                      <Icon size={14} className="text-emerald-700" />
                      <span className="text-sm font-serif font-semibold text-emerald-800">
                        {dim.label}
                      </span>
                      <span className="text-[10px] font-serif text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
                        {Math.round(dim.accuracy * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {report.weakDimensions.length > 0 && (
            <div className="mb-5">
              <div className="text-[11px] text-ink/50 font-serif mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-terracotta" />
                你的薄弱维度
              </div>
              <div className="flex flex-wrap gap-2">
                {report.weakDimensions.map((dim) => {
                  const Icon = dimIcons[dim.dimension];
                  return (
                    <div
                      key={dim.dimension}
                      className="flex items-center gap-2 px-3 py-2 bg-terracotta/5 rounded-sm border border-terracotta/20"
                    >
                      <Icon size={14} className="text-terracotta" />
                      <span className="text-sm font-serif font-semibold text-terracotta">
                        {dim.label}
                      </span>
                      <span className="text-[10px] font-serif text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded-sm">
                        错误率 {Math.round(dim.errorRate * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {report.misjudgmentPatterns.length > 0 && (
            <div className="mb-5">
              <div className="text-[11px] text-ink/50 font-serif mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Brain size={12} className="text-gold" />
                误判模式分析
              </div>
              <div className="space-y-2.5">
                {report.misjudgmentPatterns.map((pattern, idx) => {
                  const [id1, id2] = pattern.confusedPair;
                  const item1 = combination.items.find((i) => i.id === id1);
                  const item2 = combination.items.find((i) => i.id === id2);
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-gold/[0.04] rounded-sm border border-gold/15 animate-fadeInUp"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 bg-gold/15 text-gold rounded-sm font-serif font-semibold">
                          误判 × {pattern.count}
                        </span>
                        <span className="text-sm font-serif font-semibold text-ink">
                          {item1?.label || "?"}
                        </span>
                        <X size={12} className="text-terracotta" />
                        <span className="text-sm font-serif font-semibold text-ink">
                          {item2?.label || "?"}
                        </span>
                      </div>
                      <p className="text-xs text-ink/70 font-serif leading-relaxed mb-2">
                        {pattern.description}
                      </p>
                      <div className="flex items-start gap-1.5 p-2 bg-teal-900/[0.04] rounded-sm">
                        <Lightbulb size={11} className="text-teal-800 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-teal-900 font-serif leading-relaxed">
                          {pattern.tip}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <div className="text-[11px] text-ink/50 font-serif mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Award size={12} className="text-teal-800" />
              改进建议
            </div>
            <div className="space-y-2">
              {report.improvementTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-800 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white tabular-nums">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-ink/80 font-serif leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {answers.length > 0 && (
        <div className="relative file-card overflow-hidden animate-fadeInUp">
          <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center">
              <Eye size={14} className="text-ink/60" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-ink/80 tracking-wide">
                答题记录 · Answer Log
              </div>
              <div className="text-[10px] text-ink/40 uppercase tracking-widest font-serif">
                {answers.length} Questions
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
            {answers.map((a, idx) => {
              const p = paintings.find((pp) => pp.id === a.paintingId);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-sm border ${
                    a.isCorrect
                      ? "bg-emerald-50 border-emerald-100"
                      : "bg-terracotta/5 border-terracotta/10"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      a.isCorrect ? "bg-emerald-600" : "bg-terracotta"
                    }`}
                  >
                    {a.isCorrect ? (
                      <Check size={14} className="text-white" strokeWidth={3} />
                    ) : (
                      <X size={14} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                  <div className="w-10 h-10 overflow-hidden rounded-sm flex-shrink-0">
                    {p && (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm font-semibold text-ink truncate">
                      {p?.title || "?"}
                    </div>
                    <div className="text-[11px] font-serif text-ink/50 truncate">
                      {a.isCorrect ? (
                        <span className="text-emerald-700">✓ {a.correctAnswer}</span>
                      ) : (
                        <span>
                          <span className="text-terracotta">✗ {a.selectedAnswer}</span>
                          <span className="text-ink/40 mx-1">→</span>
                          <span className="text-emerald-700">{a.correctAnswer}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[11px] font-serif text-ink/50">
                      {(a.timeSpent / 1000).toFixed(1)}s
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={onRestart}
          className="group relative py-4 px-6 rounded-sm bg-teal-800 hover:bg-teal-700 text-white font-serif text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            <RotateCcw size={18} />
            再次训练本组
          </span>
        </button>
        <button
          onClick={onReset}
          className="group relative py-4 px-6 rounded-sm bg-ink/10 hover:bg-ink/20 text-ink font-serif text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden animate-fadeInUp"
        >
          <span className="relative flex items-center gap-2">
            <Home size={18} />
            返回训练营列表
          </span>
        </button>
      </div>
    </div>
  );
}
