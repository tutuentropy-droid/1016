import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Painting, ArtistPeriod, ForgeryCase, ForgeryClueType, ForgeryVerdict } from "@/data/paintings";
import {
  pickRandomPainting,
  generateOptionsByDifficulty,
  calculateScore,
  getConfidenceMultiplier,
  generateEvolutionCase,
  calculateEvolutionScore,
  pickRandomForgeryCase,
  calculateForgeryScore,
} from "@/utils/gameLogic";

export type Confidence = "low" | "medium" | "high";
export type CasePhase = "opening" | "briefing" | "investigating" | "answered";
export type AppPage = "game" | "collection" | "graph";
export type GameMode = "standard" | "evolution" | "forgery";

export type ForgeryPhase = "briefing" | "observing" | "investigating" | "verdict" | "report";

export type EvolutionPhase =
  | "observing"
  | "investigating"
  | "selecting"
  | "result";

export interface DailyTheme {
  id: string;
  title: string;
  description: string;
  date: string;
  filterType: "era" | "movement" | "region" | "artist";
  filterValue: string;
  bonusMultiplier: number;
}

export interface EvolutionAssignment {
  paintingId: string;
  selectedPeriodId: string | null;
}

export type InvestigationClueType =
  | "creationLocation"
  | "yearRangeHint"
  | "lifeEvent"
  | "styleChangeHint";

interface GameState {
  // Forgery Investigation Mode
  forgeryCurrentCase: ForgeryCase | null;
  forgeryPhase: ForgeryPhase;
  forgeryUnlockedClues: ForgeryClueType[];
  forgerySelectedVerdict: ForgeryVerdict | null;
  forgeryCaseCorrect: boolean | null;
  forgeryScoreDelta: number;
  forgeryCasesCompleted: number;
  forgeryRecentCaseIds: string[];
  startForgeryCase: () => void;
  setForgeryPhase: (phase: ForgeryPhase) => void;
  unlockForgeryClue: (clueType: ForgeryClueType) => void;
  submitForgeryVerdict: (verdict: ForgeryVerdict) => void;
  nextForgeryCase: () => void;
  gameMode: GameMode;
  currentPainting: Painting | null;
  options: string[];
  selectedAnswer: string | null;
  isAnswered: boolean;
  unlockedClueIndices: number[];
  confidence: Confidence | null;
  totalScore: number;
  correctCount: number;
  totalAnswered: number;
  streak: number;
  bestStreak: number;
  lastScoreDelta: number;
  lastResultCorrect: boolean | null;
  recentPaintingIds: string[];
  casePhase: CasePhase;
  firstCase: boolean;
  focusedDetailIndex: number | null;
  unlockedPaintingIds: string[];
  activePage: AppPage;
  dailyTheme: DailyTheme | null;
  evolutionArtist: string | null;
  evolutionPeriods: ArtistPeriod[];
  evolutionPaintings: Painting[];
  evolutionAssignments: EvolutionAssignment[];
  evolutionSubmitted: boolean;
  evolutionCorrectCount: number;
  evolutionScoreDelta: number;
  evolutionPhase: EvolutionPhase;
  evolutionCurrentPaintingIndex: number;
  evolutionUnlockedClues: Record<string, InvestigationClueType[]>;
  setCasePhase: (phase: CasePhase) => void;
  setFocusedDetail: (index: number | null) => void;
  setActivePage: (page: AppPage) => void;
  setGameMode: (mode: GameMode) => void;
  nextQuestion: () => void;
  unlockClue: (index: number) => void;
  setConfidence: (level: Confidence) => void;
  submitAnswer: (answer: string) => void;
  generateDailyTheme: () => void;
  startEvolutionCase: () => void;
  assignPaintingToPeriod: (paintingId: string, periodId: string | null) => void;
  submitEvolutionAnswer: () => void;
  nextEvolutionCase: () => void;
  setEvolutionPhase: (phase: EvolutionPhase) => void;
  setEvolutionCurrentPaintingIndex: (index: number) => void;
  unlockInvestigationClue: (paintingId: string, clueType: InvestigationClueType) => void;
  submitSinglePaintingAnswer: (paintingId: string, periodId: string) => void;
  advanceToNextPainting: () => void;
}

const DAILY_THEMES = [
  { title: "印象派的光影革命", description: "今天专攻印象派与后印象派大师，感受光与色的交响", filterType: "movement" as const, filterValue: "印象派", bonusMultiplier: 1.3 },
  { title: "文艺复兴的荣光", description: "回到15-16世纪的意大利，探访文艺复兴三杰的旷世杰作", filterType: "era" as const, filterValue: "文艺复兴", bonusMultiplier: 1.3 },
  { title: "荷兰黄金时代", description: "聚焦17世纪尼德兰地区的绘画巨匠", filterType: "region" as const, filterValue: "荷兰", bonusMultiplier: 1.4 },
  { title: "梵高的星空下", description: "专文森特·梵高的所有作品，理解这位天才的孤独与热情", filterType: "artist" as const, filterValue: "文森特·梵高", bonusMultiplier: 1.5 },
  { title: "现代艺术的裂变", description: "探索20世纪现代主义诸流派：立体主义、超现实主义、表现主义", filterType: "era" as const, filterValue: "现代艺术", bonusMultiplier: 1.3 },
  { title: "莫奈的花园", description: "克劳德·莫奈的光影世界，从日出印象到睡莲池塘", filterType: "artist" as const, filterValue: "克劳德·莫奈", bonusMultiplier: 1.5 },
  { title: "西班牙的热情", description: "从委拉斯开兹到毕加索、达利，伊比利亚半岛的艺术传承", filterType: "region" as const, filterValue: "西班牙", bonusMultiplier: 1.4 },
  { title: "神秘的微笑", description: "探索文艺复兴盛期达芬奇与米开朗基罗的世界", filterType: "movement" as const, filterValue: "文艺复兴盛期", bonusMultiplier: 1.3 },
  { title: "维也纳的金色", description: "古斯塔夫·克里姆特与维也纳分离派的华丽装饰美学", filterType: "artist" as const, filterValue: "古斯塔夫·克里姆特", bonusMultiplier: 1.5 },
  { title: "北欧的呐喊", description: "表现主义先驱爱德华·蒙克与北欧艺术的深沉内省", filterType: "region" as const, filterValue: "挪威", bonusMultiplier: 1.4 },
];

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      gameMode: "standard",
      currentPainting: null,
      options: [],
      selectedAnswer: null,
      isAnswered: false,
      unlockedClueIndices: [],
      confidence: "medium",
      totalScore: 0,
      correctCount: 0,
      totalAnswered: 0,
      streak: 0,
      bestStreak: 0,
      lastScoreDelta: 0,
      lastResultCorrect: null,
      recentPaintingIds: [],
      casePhase: "opening",
      firstCase: true,
      focusedDetailIndex: null,
      unlockedPaintingIds: [],
      activePage: "game",
      dailyTheme: null,
      evolutionArtist: null,
      evolutionPeriods: [],
      evolutionPaintings: [],
      evolutionAssignments: [],
      evolutionSubmitted: false,
      evolutionCorrectCount: 0,
      evolutionScoreDelta: 0,
      evolutionPhase: "observing",
      evolutionCurrentPaintingIndex: 0,
      evolutionUnlockedClues: {},
      forgeryCurrentCase: null,
      forgeryPhase: "briefing",
      forgeryUnlockedClues: [],
      forgerySelectedVerdict: null,
      forgeryCaseCorrect: null,
      forgeryScoreDelta: 0,
      forgeryCasesCompleted: 0,
      forgeryRecentCaseIds: [],

      setCasePhase: (phase: CasePhase) => set({ casePhase: phase }),
      setFocusedDetail: (index: number | null) => set({ focusedDetailIndex: index }),
      setActivePage: (page: AppPage) => set({ activePage: page }),
      setGameMode: (mode: GameMode) => set({ gameMode: mode }),

      generateDailyTheme: () => {
        const today = getTodayString();
        const current = get().dailyTheme;
        if (current && current.date === today) return;

        const seed = today.split("-").reduce((a, b) => a + parseInt(b), 0);
        const rand = seededRandom(seed);
        const idx = Math.floor(rand() * DAILY_THEMES.length);
        const tpl = DAILY_THEMES[idx];

        set({
          dailyTheme: {
            id: `theme-${today}`,
            title: tpl.title,
            description: tpl.description,
            date: today,
            filterType: tpl.filterType,
            filterValue: tpl.filterValue,
            bonusMultiplier: tpl.bonusMultiplier,
          },
        });
      },

      nextQuestion: () => {
        const { recentPaintingIds, firstCase } = get();
        const painting = pickRandomPainting(recentPaintingIds);
        const options = generateOptionsByDifficulty(painting.artist, painting.difficulty);
        const newRecent = [...recentPaintingIds, painting.id].slice(-5);
        set({
          currentPainting: painting,
          options,
          selectedAnswer: null,
          isAnswered: false,
          unlockedClueIndices: [],
          confidence: "medium",
          lastScoreDelta: 0,
          lastResultCorrect: null,
          recentPaintingIds: newRecent,
          casePhase: firstCase ? "opening" : "briefing",
          firstCase: false,
          focusedDetailIndex: null,
        });
      },

      unlockClue: (index: number) => {
        const { unlockedClueIndices, isAnswered, currentPainting } = get();
        if (isAnswered) return;
        if (unlockedClueIndices.includes(index)) return;
        const clue = currentPainting?.clues[index];
        const shouldFocusDetail = clue?.type === "key" || clue?.type === "style";
        set({
          unlockedClueIndices: [...unlockedClueIndices, index],
          focusedDetailIndex: shouldFocusDetail && currentPainting?.zoomRegions?.length
            ? Math.min(index, currentPainting.zoomRegions.length - 1)
            : null,
        });
      },

      setConfidence: (level: Confidence) => {
        const { isAnswered } = get();
        if (isAnswered) return;
        set({ confidence: level });
      },

      submitAnswer: (answer: string) => {
        const {
          currentPainting,
          isAnswered,
          unlockedClueIndices,
          confidence,
          totalScore,
          correctCount,
          totalAnswered,
          streak,
          bestStreak,
          unlockedPaintingIds,
          dailyTheme,
        } = get();
        if (isAnswered || !currentPainting) return;

        const isCorrect = answer === currentPainting.artist;
        const multiplier = getConfidenceMultiplier(confidence);
        const baseScore = calculateScore(unlockedClueIndices.length);
        let delta = isCorrect
          ? Math.round(baseScore * multiplier)
          : -Math.round(baseScore * multiplier * 0.5);

        if (isCorrect && dailyTheme) {
          const match =
            (dailyTheme.filterType === "movement" && currentPainting.movement.includes(dailyTheme.filterValue)) ||
            (dailyTheme.filterType === "artist" && currentPainting.artist === dailyTheme.filterValue) ||
            (dailyTheme.filterType === "region" && currentPainting.region.includes(dailyTheme.filterValue));
          if (match) delta = Math.round(delta * dailyTheme.bonusMultiplier);
        }

        const newStreak = isCorrect ? streak + 1 : 0;
        const newBestStreak = Math.max(bestStreak, newStreak);
        const newUnlocked = isCorrect && !unlockedPaintingIds.includes(currentPainting.id)
          ? [...unlockedPaintingIds, currentPainting.id]
          : unlockedPaintingIds;

        set({
          selectedAnswer: answer,
          isAnswered: true,
          casePhase: "answered",
          totalScore: Math.max(0, totalScore + delta),
          correctCount: isCorrect ? correctCount + 1 : correctCount,
          totalAnswered: totalAnswered + 1,
          streak: newStreak,
          bestStreak: newBestStreak,
          lastScoreDelta: delta,
          lastResultCorrect: isCorrect,
          unlockedPaintingIds: newUnlocked,
        });
      },

      startEvolutionCase: () => {
        const evolutionCase = generateEvolutionCase();
        if (!evolutionCase) return;
        const { artistName, periods, paintings: casePaintings } = evolutionCase;
        const assignments: EvolutionAssignment[] = casePaintings.map((p) => ({
          paintingId: p.id,
          selectedPeriodId: null,
        }));
        const unlockedClues: Record<string, InvestigationClueType[]> = {};
        casePaintings.forEach((p) => {
          unlockedClues[p.id] = [];
        });
        set({
          evolutionArtist: artistName,
          evolutionPeriods: periods,
          evolutionPaintings: casePaintings,
          evolutionAssignments: assignments,
          evolutionSubmitted: false,
          evolutionCorrectCount: 0,
          evolutionScoreDelta: 0,
          evolutionPhase: "observing",
          evolutionCurrentPaintingIndex: 0,
          evolutionUnlockedClues: unlockedClues,
        });
      },

      assignPaintingToPeriod: (paintingId: string, periodId: string | null) => {
        const { evolutionAssignments, evolutionSubmitted } = get();
        if (evolutionSubmitted) return;
        const newAssignments = evolutionAssignments.map((a) =>
          a.paintingId === paintingId ? { ...a, selectedPeriodId: periodId } : a
        );
        set({ evolutionAssignments: newAssignments });
      },

      setEvolutionPhase: (phase: EvolutionPhase) => {
        set({ evolutionPhase: phase });
      },

      setEvolutionCurrentPaintingIndex: (index: number) => {
        set({ evolutionCurrentPaintingIndex: index });
      },

      unlockInvestigationClue: (paintingId: string, clueType: InvestigationClueType) => {
        const { evolutionUnlockedClues } = get();
        const current = evolutionUnlockedClues[paintingId] || [];
        if (current.includes(clueType)) return;
        set({
          evolutionUnlockedClues: {
            ...evolutionUnlockedClues,
            [paintingId]: [...current, clueType],
          },
        });
      },

      submitSinglePaintingAnswer: (paintingId: string, periodId: string) => {
        const { evolutionAssignments } = get();
        const newAssignments = evolutionAssignments.map((a) =>
          a.paintingId === paintingId ? { ...a, selectedPeriodId: periodId } : a
        );
        set({
          evolutionAssignments: newAssignments,
          evolutionPhase: "result",
        });
      },

      advanceToNextPainting: () => {
        const { evolutionCurrentPaintingIndex, evolutionPaintings } = get();
        const next = evolutionCurrentPaintingIndex + 1;
        if (next < evolutionPaintings.length) {
          set({
            evolutionCurrentPaintingIndex: next,
            evolutionPhase: "observing",
          });
        } else {
          get().submitEvolutionAnswer();
        }
      },

      submitEvolutionAnswer: () => {
        const {
          evolutionPaintings,
          evolutionAssignments,
          evolutionSubmitted,
          totalScore,
          unlockedPaintingIds,
        } = get();
        if (evolutionSubmitted) return;

        let correctCount = 0;
        evolutionPaintings.forEach((painting) => {
          const assignment = evolutionAssignments.find((a) => a.paintingId === painting.id);
          if (assignment && assignment.selectedPeriodId === painting.periodId) {
            correctCount++;
          }
        });

        const { delta, bonus } = calculateEvolutionScore(
          correctCount,
          evolutionPaintings.length
        );

        const newUnlocked = [...unlockedPaintingIds];
        evolutionPaintings.forEach((p) => {
          if (!newUnlocked.includes(p.id)) newUnlocked.push(p.id);
        });

        set({
          evolutionSubmitted: true,
          evolutionCorrectCount: correctCount,
          evolutionScoreDelta: delta + bonus,
          totalScore: Math.max(0, totalScore + delta + bonus),
          unlockedPaintingIds: newUnlocked,
          streak: correctCount === evolutionPaintings.length ? get().streak + 1 : 0,
          bestStreak:
            correctCount === evolutionPaintings.length
              ? Math.max(get().bestStreak, get().streak + 1)
              : get().bestStreak,
        });
      },

      nextEvolutionCase: () => {
        get().startEvolutionCase();
      },

      startForgeryCase: () => {
        const { forgeryRecentCaseIds } = get();
        const forgeryCase = pickRandomForgeryCase(forgeryRecentCaseIds);
        if (!forgeryCase) return;
        const newRecent = [...forgeryRecentCaseIds, forgeryCase.id].slice(-3);
        set({
          forgeryCurrentCase: forgeryCase,
          forgeryPhase: "briefing",
          forgeryUnlockedClues: [],
          forgerySelectedVerdict: null,
          forgeryCaseCorrect: null,
          forgeryScoreDelta: 0,
          forgeryRecentCaseIds: newRecent,
        });
      },

      setForgeryPhase: (phase: ForgeryPhase) => {
        set({ forgeryPhase: phase });
      },

      unlockForgeryClue: (clueType: ForgeryClueType) => {
        const { forgeryUnlockedClues, forgeryPhase } = get();
        if (forgeryPhase === "report") return;
        if (forgeryUnlockedClues.includes(clueType)) return;
        set({ forgeryUnlockedClues: [...forgeryUnlockedClues, clueType] });
      },

      submitForgeryVerdict: (verdict: ForgeryVerdict) => {
        const { forgeryCurrentCase, forgeryUnlockedClues, totalScore, streak, bestStreak, unlockedPaintingIds } = get();
        if (!forgeryCurrentCase) return;
        const isCorrect = verdict === forgeryCurrentCase.groundTruth;
        const { delta, bonus } = calculateForgeryScore(
          forgeryUnlockedClues.length,
          forgeryCurrentCase.clues.length,
          isCorrect,
          forgeryCurrentCase.difficulty
        );
        const scoreDelta = delta + bonus;

        const newStreak = isCorrect ? streak + 1 : 0;
        const newBestStreak = Math.max(bestStreak, newStreak);
        const newUnlocked = !unlockedPaintingIds.includes(forgeryCurrentCase.paintingId)
          ? [...unlockedPaintingIds, forgeryCurrentCase.paintingId]
          : unlockedPaintingIds;

        set({
          forgerySelectedVerdict: verdict,
          forgeryCaseCorrect: isCorrect,
          forgeryScoreDelta: scoreDelta,
          forgeryPhase: "report",
          totalScore: Math.max(0, totalScore + scoreDelta),
          streak: newStreak,
          bestStreak: newBestStreak,
          forgeryCasesCompleted: get().forgeryCasesCompleted + 1,
          unlockedPaintingIds: newUnlocked,
        });
      },

      nextForgeryCase: () => {
        get().startForgeryCase();
      },
    }),
    {
      name: "art-detective-storage",
      partialize: (state) => ({
        totalScore: state.totalScore,
        correctCount: state.correctCount,
        totalAnswered: state.totalAnswered,
        bestStreak: state.bestStreak,
        unlockedPaintingIds: state.unlockedPaintingIds,
        dailyTheme: state.dailyTheme,
      }),
    }
  )
);

export function getDetectiveRank(totalScore: number): {
  title: string;
  badge: string;
  level: number;
} {
  if (totalScore >= 800) return { title: "艺术宗师", badge: "👑", level: 5 };
  if (totalScore >= 500) return { title: "首席侦探", badge: "🥇", level: 4 };
  if (totalScore >= 300) return { title: "资深探员", badge: "🥈", level: 3 };
  if (totalScore >= 150) return { title: "见习侦探", badge: "🥉", level: 2 };
  return { title: "新人调查员", badge: "🔍", level: 1 };
}
