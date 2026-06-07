import { create } from "zustand";
import type { Painting } from "@/data/paintings";
import { pickRandomPainting, generateOptions } from "@/utils/gameLogic";

interface GameState {
  currentPainting: Painting | null;
  options: string[];
  selectedAnswer: string | null;
  isAnswered: boolean;
  score: number;
  total: number;
  recentPaintingIds: string[];
  nextQuestion: () => void;
  submitAnswer: (answer: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPainting: null,
  options: [],
  selectedAnswer: null,
  isAnswered: false,
  score: 0,
  total: 0,
  recentPaintingIds: [],

  nextQuestion: () => {
    const { recentPaintingIds } = get();
    const painting = pickRandomPainting(recentPaintingIds);
    const options = generateOptions(painting.artist);
    const newRecent = [...recentPaintingIds, painting.id].slice(-5);
    set({
      currentPainting: painting,
      options,
      selectedAnswer: null,
      isAnswered: false,
      recentPaintingIds: newRecent,
    });
  },

  submitAnswer: (answer: string) => {
    const { currentPainting, isAnswered, score, total } = get();
    if (isAnswered || !currentPainting) return;
    const isCorrect = answer === currentPainting.artist;
    set({
      selectedAnswer: answer,
      isAnswered: true,
      score: isCorrect ? score + 1 : score,
      total: total + 1,
    });
  },
}));
