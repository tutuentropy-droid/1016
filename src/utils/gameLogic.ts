import {
  paintings,
  allArtists,
  artistInfos,
  artistsWithPeriods,
  getPeriodsByArtist,
  getPaintingsByArtist,
  getAllForgeryCases,
  type Painting,
  type Difficulty,
  type ArtistPeriod,
  type ForgeryCase,
} from "@/data/paintings";
import type { Confidence } from "@/store/useGameStore";

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandomPainting(excludeIds: string[] = []): Painting {
  const pool =
    excludeIds.length >= paintings.length
      ? paintings
      : paintings.filter((p) => !excludeIds.includes(p.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function calculateScore(unlockedClues: number): number {
  const deductions = [0, 20, 40, 60, 80];
  const idx = Math.min(unlockedClues, deductions.length - 1);
  return Math.max(20, 100 - deductions[idx]);
}

export function getConfidenceMultiplier(
  confidence: Confidence | null
): number {
  switch (confidence) {
    case "low":
      return 0.7;
    case "high":
      return 1.5;
    case "medium":
    default:
      return 1.0;
  }
}

function findArtistInfo(name: string) {
  return artistInfos.find((a) => a.name === name);
}

function similarityScore(a: string, b: string): number {
  const infoA = findArtistInfo(a);
  const infoB = findArtistInfo(b);
  if (!infoA || !infoB) return 0;
  let score = 0;
  if (infoA.movement === infoB.movement) score += 3;
  if (infoA.region === infoB.region) score += 2;
  const eraA = parseInt(infoA.era.split("-")[0]);
  const eraB = parseInt(infoB.era.split("-")[0]);
  if (Math.abs(eraA - eraB) <= 50) score += 2;
  else if (Math.abs(eraA - eraB) <= 100) score += 1;
  return score;
}

export function generateOptionsByDifficulty(
  correctArtist: string,
  difficulty: Difficulty
): string[] {
  const wrongPool = allArtists.filter((a) => a !== correctArtist);
  const wrongWithScores = wrongPool.map((name) => ({
    name,
    score: similarityScore(correctArtist, name),
  }));

  let selectedWrong: string[];
  switch (difficulty) {
    case "easy":
      selectedWrong = shuffle(
        wrongWithScores
          .filter((w) => w.score <= 2)
          .map((w) => w.name)
      ).slice(0, 3);
      if (selectedWrong.length < 3) {
        selectedWrong = shuffle(wrongPool).slice(0, 3);
      }
      break;
    case "hard":
      selectedWrong = shuffle(
        wrongWithScores
          .filter((w) => w.score >= 3)
          .map((w) => w.name)
      ).slice(0, 3);
      if (selectedWrong.length < 3) {
        wrongWithScores.sort((a, b) => b.score - a.score);
        selectedWrong = wrongWithScores.map((w) => w.name).slice(0, 3);
      }
      break;
    case "normal":
    default:
      selectedWrong = shuffle(wrongPool).slice(0, 3);
      break;
  }

  return shuffle([correctArtist, ...selectedWrong]);
}

export function generateOptions(correctArtist: string): string[] {
  return generateOptionsByDifficulty(correctArtist, "normal");
}

export interface EvolutionCase {
  artistName: string;
  periods: ArtistPeriod[];
  paintings: Painting[];
}

export function generateEvolutionCase(): EvolutionCase | null {
  const eligibleArtists = artistsWithPeriods.filter((artistName) => {
    const periods = getPeriodsByArtist(artistName);
    const artistPaintings = getPaintingsByArtist(artistName).filter((p) => p.periodId);
    return periods.length >= 3 && artistPaintings.length >= periods.length;
  });

  if (eligibleArtists.length === 0) return null;

  const artistName =
    eligibleArtists[Math.floor(Math.random() * eligibleArtists.length)];
  const periods = getPeriodsByArtist(artistName);
  const artistPaintings = getPaintingsByArtist(artistName).filter((p) => p.periodId);

  const selectedPaintings: Painting[] = [];
  const usedPeriodIds = new Set<string>();

  for (const period of periods) {
    const periodPaintings = artistPaintings.filter(
      (p) => p.periodId === period.id && !selectedPaintings.includes(p)
    );
    if (periodPaintings.length > 0) {
      const chosen =
        periodPaintings[Math.floor(Math.random() * periodPaintings.length)];
      selectedPaintings.push(chosen);
      usedPeriodIds.add(period.id);
    }
  }

  const remainingPeriods = periods.filter((p) => !usedPeriodIds.has(p.id));
  for (const period of remainingPeriods) {
    const periodPaintings = artistPaintings.filter(
      (p) => p.periodId === period.id && !selectedPaintings.includes(p)
    );
    if (periodPaintings.length > 0) {
      const chosen =
        periodPaintings[Math.floor(Math.random() * periodPaintings.length)];
      selectedPaintings.push(chosen);
    }
  }

  const shuffledPaintings = shuffle(selectedPaintings);

  return {
    artistName,
    periods,
    paintings: shuffledPaintings,
  };
}

export function calculateEvolutionScore(
  correctCount: number,
  totalCount: number
): { delta: number; bonus: number } {
  const baseScorePerPainting = 40;
  const delta = correctCount * baseScorePerPainting;
  const bonus = correctCount === totalCount ? 60 : 0;
  return { delta, bonus };
}

export function pickRandomForgeryCase(excludeIds: string[] = []): ForgeryCase | null {
  const allCases = getAllForgeryCases();
  const pool =
    excludeIds.length >= allCases.length
      ? allCases
      : allCases.filter((c) => !excludeIds.includes(c.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function calculateForgeryScore(
  unlockedClues: number,
  totalClues: number,
  isCorrect: boolean,
  difficulty: "normal" | "hard" | "expert"
): { delta: number; bonus: number } {
  const baseScore = 120;
  const clueDeduction = unlockedClues * 12;
  let delta = Math.max(30, baseScore - clueDeduction);

  const difficultyMultiplier = {
    normal: 1.0,
    hard: 1.3,
    expert: 1.6,
  };
  delta = Math.round(delta * difficultyMultiplier[difficulty]);

  if (!isCorrect) {
    delta = -Math.round(delta * 0.4);
  }

  const noClueBonus = isCorrect && unlockedClues === 0 ? 50 : 0;
  const perfectBonus = isCorrect && unlockedClues <= 2 ? 20 : 0;

  return { delta, bonus: noClueBonus + perfectBonus };
}
