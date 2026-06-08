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
  type AuctionPainting,
  type AuctionBidder,
  type MarketEvent,
  type PlayerCollectionItem,
  type AuctionSettlement,
  type ConservationStatus,
  type AuthenticityRisk,
  type BidRecord,
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

export function calculateTheftScore(
  unlockedClues: number,
  totalClues: number,
  isCorrect: boolean,
  difficulty: "normal" | "hard" | "expert"
): { delta: number; bonus: number } {
  const baseScore = 150;
  const clueDeduction = unlockedClues * 12;
  let delta = Math.max(40, baseScore - clueDeduction);

  const difficultyMultiplier = {
    normal: 1.0,
    hard: 1.3,
    expert: 1.6,
  };
  delta = Math.round(delta * difficultyMultiplier[difficulty]);

  if (!isCorrect) {
    delta = -Math.round(delta * 0.35);
  }

  const noClueBonus = isCorrect && unlockedClues === 0 ? 60 : 0;
  const perfectBonus = isCorrect && unlockedClues <= 2 ? 30 : 0;

  return { delta, bonus: noClueBonus + perfectBonus };
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `¥${(amount / 10000000).toFixed(2)}千万`;
  }
  if (amount >= 10000) {
    return `¥${(amount / 10000).toFixed(1)}万`;
  }
  return `¥${amount.toLocaleString()}`;
}

export function getConservationLabel(status: ConservationStatus): { label: string; color: string } {
  const map: Record<ConservationStatus, { label: string; color: string }> = {
    excellent: { label: "极佳", color: "text-emerald-600" },
    good: { label: "良好", color: "text-sky-600" },
    fair: { label: "一般", color: "text-amber-600" },
    poor: { label: "较差", color: "text-terracotta" },
  };
  return map[status];
}

export function getAuthenticityLabel(risk: AuthenticityRisk): { label: string; color: string } {
  const map: Record<AuthenticityRisk, { label: string; color: string }> = {
    confirmed: { label: "已鉴定真迹", color: "text-emerald-600" },
    low: { label: "低风险", color: "text-sky-600" },
    medium: { label: "中等风险", color: "text-amber-600" },
    high: { label: "高风险", color: "text-orange-600" },
    suspectedForgery: { label: "存疑作品", color: "text-terracotta" },
  };
  return map[risk];
}

export function getBidIncrement(currentBid: number): number {
  if (currentBid >= 10000000) return 500000;
  if (currentBid >= 5000000) return 250000;
  if (currentBid >= 1000000) return 100000;
  if (currentBid >= 500000) return 50000;
  if (currentBid >= 100000) return 10000;
  return 5000;
}

export function calculateBidderValuation(
  bidder: AuctionBidder,
  painting: AuctionPainting,
  marketEvents: MarketEvent[]
): number {
  let baseValue = painting.baseEstimate;

  const artistMatch = bidder.preferredArtists.includes(painting.artist);
  const movementMatch = bidder.preferredMovements.some((m) => painting.movement.includes(m));

  if (artistMatch) {
    baseValue *= 1 + 0.3 * bidder.aggressionLevel;
  }
  if (movementMatch) {
    baseValue *= 1 + 0.15 * bidder.aggressionLevel;
  }

  const riskPenalty = painting.authenticityRisk === "confirmed" ? 0 : painting.authenticityRisk === "low" ? 0.05 : painting.authenticityRisk === "medium" ? 0.15 : painting.authenticityRisk === "high" ? 0.35 : 0.55;
  if (bidder.riskTolerance < 0.5) {
    baseValue *= Math.max(0.5, riskPenalty);
  } else {
    baseValue *= Math.max(0.7, riskPenalty + (1 - riskPenalty) * bidder.riskTolerance);
  }

  for (const event of marketEvents) {
    if (event.duration === "remaining" || event.duration === "instant") {
      if (event.targetArtist && event.targetArtist === painting.artist) {
        baseValue *= event.valueModifier;
      }
      if (event.targetMovement && painting.movement.includes(event.targetMovement)) {
        baseValue *= event.valueModifier;
      }
      if (!event.targetArtist && !event.targetMovement) {
        baseValue *= event.valueModifier;
      }
    }
  }

  if (bidder.expertiseLevel >= 4) {
    const expertAdjustment = painting.hiddenTrueValue / painting.baseEstimate;
    baseValue *= 0.6 + 0.4 * expertAdjustment;
  }

  return Math.round(baseValue);
}

export function shouldBidderBid(
  bidder: AuctionBidder,
  painting: AuctionPainting,
  currentBid: number,
  marketEvents: MarketEvent[],
  bidCount: number
): boolean {
  if (bidder.remainingBudget < currentBid + getBidIncrement(currentBid)) return false;

  const valuation = calculateBidderValuation(bidder, painting, marketEvents);

  if (currentBid >= valuation * 1.05) return false;

  switch (bidder.personality) {
    case "aggressive":
      return currentBid < valuation * 1.15 || (bidCount < 3 && Math.random() < bidder.aggressionLevel);
    case "conservative":
      return currentBid < valuation * 0.9;
    case "strategic":
      return currentBid < valuation * 1.0 && (bidCount < 5 || Math.random() < 0.6);
    case "emotional":
      return currentBid < valuation * 1.1 || Math.random() < 0.35;
    case "expert":
      return currentBid < valuation * 1.02;
    default:
      return currentBid < valuation;
  }
}

export function calculateBidAmount(
  bidder: AuctionBidder,
  painting: AuctionPainting,
  currentBid: number,
  marketEvents: MarketEvent[]
): number {
  const increment = getBidIncrement(currentBid);
  const valuation = calculateBidderValuation(bidder, painting, marketEvents);

  const aggression = bidder.aggressionLevel;
  let multiplier = 1;

  if (aggression > 0.7) {
    multiplier = 1 + Math.random() * 2;
  } else if (aggression > 0.4) {
    multiplier = 1 + Math.random() * 1.5;
  } else {
    multiplier = 1 + Math.random() * 0.8;
  }

  let newBid = currentBid + Math.round(increment * multiplier);

  if (bidder.personality === "aggressive" && Math.random() < 0.3) {
    newBid = currentBid + Math.round(increment * (2 + Math.random() * 2));
  }

  if (bidder.personality === "conservative") {
    newBid = currentBid + increment;
  }

  const maxBid = Math.min(bidder.remainingBudget, Math.round(valuation * 1.1));
  return Math.min(newBid, maxBid);
}

export function selectAIBidder(
  bidders: AuctionBidder[],
  painting: AuctionPainting,
  currentBid: number,
  lastBidderId: string | null,
  marketEvents: MarketEvent[],
  bidCount: number
): AuctionBidder | null {
  const eligible = bidders.filter((b) => {
    if (b.id === lastBidderId) return false;
    if (b.remainingBudget < currentBid + getBidIncrement(currentBid)) return false;
    return shouldBidderBid(b, painting, currentBid, marketEvents, bidCount);
  });

  if (eligible.length === 0) return null;

  const weights = eligible.map((b) => {
    let weight = 1;
    weight += b.aggressionLevel * 2;
    if (b.preferredArtists.includes(painting.artist)) weight += 3;
    if (b.preferredMovements.some((m) => painting.movement.includes(m))) weight += 1.5;
    return weight;
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < eligible.length; i++) {
    random -= weights[i];
    if (random <= 0) return eligible[i];
  }

  return eligible[eligible.length - 1];
}

export function calculatePaintingCurrentValue(
  painting: AuctionPainting,
  purchasePrice: number,
  yearsPassed: number = 1
): number {
  if (painting.isActuallyForgery) {
    return Math.round(purchasePrice * Math.max(0.05, 1 + painting.estimatedAppreciationRate * yearsPassed));
  }
  const baseAppreciation = painting.estimatedAppreciationRate;
  const reputationBonus = (painting.artistReputation - 3) * 0.015;
  const rarityBonus = (painting.rarityScore - 3) * 0.01;
  const totalRate = baseAppreciation + reputationBonus + rarityBonus;
  return Math.round(purchasePrice * (1 + totalRate * yearsPassed));
}

export function calculateAuctionSettlement(
  initialBudget: number,
  finalBudget: number,
  collection: PlayerCollectionItem[],
  totalLots: number
): AuctionSettlement {
  const totalSpent = initialBudget - finalBudget;
  const collectionValue = collection.reduce((sum, item) => sum + item.currentValue, 0);
  const netWorth = finalBudget + collectionValue;
  const profitLoss = netWorth - initialBudget;
  const returnRate = initialBudget > 0 ? profitLoss / initialBudget : 0;
  const forgeryCount = collection.filter((c) => c.isForgery).length;

  return {
    initialBudget,
    finalBudget,
    totalSpent,
    collectionValue,
    netWorth,
    profitLoss,
    returnRate,
    collection,
    totalLots,
    wonLots: collection.length,
    forgeryCount,
  };
}

export function getBidderPersonalityLabel(personality: string): { label: string; desc: string } {
  const map: Record<string, { label: string; desc: string }> = {
    aggressive: { label: "激进派", desc: "志在必得，容易情绪化高价抢拍" },
    conservative: { label: "保守派", desc: "谨慎出价，绝不超过估价上限" },
    strategic: { label: "策略派", desc: "冷静计算，等待最佳时机出手" },
    emotional: { label: "感性派", desc: "凭喜好出价，容易被故事打动" },
    expert: { label: "专家派", desc: "眼光独到，能发现作品真实价值" },
  };
  return map[personality] || { label: personality, desc: "" };
}

export function getMarketEventIcon(type: string): string {
  const map: Record<string, string> = {
    artistSurge: "📈",
    authenticityDispute: "⚠️",
    styleTrend: "🔥",
    museumInterest: "🏛️",
    celebrityPurchase: "⭐",
    negativeNews: "📉",
  };
  return map[type] || "📰";
}
