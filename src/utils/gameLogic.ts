import { paintings, allArtists, type Painting } from "@/data/paintings";

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandomPainting(excludeIds: string[] = []): Painting {
  const pool = excludeIds.length >= paintings.length
    ? paintings
    : paintings.filter(p => !excludeIds.includes(p.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateOptions(correctArtist: string): string[] {
  const wrongPool = allArtists.filter(a => a !== correctArtist);
  const shuffledWrong = shuffle(wrongPool).slice(0, 3);
  return shuffle([correctArtist, ...shuffledWrong]);
}
