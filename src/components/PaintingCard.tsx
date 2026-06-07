import type { Painting } from "@/data/paintings";
import { useGameStore } from "@/store/useGameStore";

export default function PaintingCard() {
  const { currentPainting, isAnswered } = useGameStore();

  if (!currentPainting) return null;
  const painting: Painting = currentPainting;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-br from-frame-light to-frame-dark rounded-sm opacity-90" />
        <div className="relative p-4 bg-white">
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className="max-w-full max-h-[450px] object-contain block"
            loading="lazy"
          />
        </div>
        <div className="absolute -inset-5 shadow-painting rounded-sm pointer-events-none" />
      </div>

      <div className="mt-10 text-center">
        {isAnswered ? (
          <>
            <h2 className="font-display text-2xl font-semibold text-ink">
              《{painting.title}》
            </h2>
            <p className="mt-1 text-sm text-ink/60 italic">{painting.titleEn}</p>
          </>
        ) : (
          <h2 className="font-display text-xl text-ink/80 italic">猜猜这幅画是谁的作品？</h2>
        )}
      </div>
    </div>
  );
}
