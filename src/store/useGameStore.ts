import { create } from "zustand";
import type { Painting } from "@/data/paintings";
import {
  pickRandomPainting,
  generateOptionsByDifficulty,
  calculateScore,
  getConfidenceMultiplier,
} from "@/utils/gameLogic";

export type Confidence = "low" | "medium" | "high";

interface GameState {
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
  nextQuestion: () => void;
  unlockClue: (index: number) => void;
  setConfidence: (level: Confidence) => void;
  submitAnswer: (answer: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
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

  nextQuestion: () => {
    const { recentPaintingIds } = get();
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
    });
  },

  unlockClue: (index: number) => {
    const { unlockedClueIndices, isAnswered } = get();
    if (isAnswered) return;
    if (unlockedClueIndices.includes(index)) return;
    set({
      unlockedClueIndices: [...unlockedClueIndices, index],
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
    } = get();
    if (isAnswered || !currentPainting) return;

    const isCorrect = answer === currentPainting.artist;
    const multiplier = getConfidenceMultiplier(confidence);
    const baseScore = calculateScore(unlockedClueIndices.length);
    const delta = isCorrect
      ? Math.round(baseScore * multiplier)
      : -Math.round(baseScore * multiplier * 0.5);

    const newStreak = isCorrect ? streak + 1 : 0;
    const newBestStreak = Math.max(bestStreak, newStreak);

    set({
      selectedAnswer: answer,
      isAnswered: true,
      totalScore: Math.max(0, totalScore + delta),
      correctCount: isCorrect ? correctCount + 1 : correctCount,
      totalAnswered: totalAnswered + 1,
      streak: newStreak,
      bestStreak: newBestStreak,
      lastScoreDelta: delta,
      lastResultCorrect: isCorrect,
    });
  },
}));

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
