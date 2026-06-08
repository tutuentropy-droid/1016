import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import type { AuctionPainting, AuctionBidder, BidRecord, MarketEvent, AuctionPhase } from "@/data/paintings";
import {
  Gavel,
  Wallet,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Play,
  Hammer,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Layers,
  Sparkles,
  History,
  ArrowRight,
  Target,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Zap,
} from "lucide-react";
import { audioManager } from "@/utils/audioManager";
import {
  formatCurrency,
  getConservationLabel,
  getAuthenticityLabel,
  getBidIncrement,
  getBidderPersonalityLabel,
  getMarketEventIcon,
} from "@/utils/gameLogic";

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < value ? "text-gold fill-gold" : "text-ink/20"}
        />
      ))}
    </div>
  );
}

function IntroStage({ onStart }: { onStart: () => void }) {
  return (
    <div className="file-card p-8 md:p-10 animate-fadeInUp">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 mb-6">
          <Gavel className="text-gold" size={36} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3 tracking-wide">
          艺术拍卖会
        </h2>
        <p className="text-ink/50 font-serif text-sm uppercase tracking-[0.3em] mb-6">
          Art Auction House
        </p>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8" />

        <div className="text-left space-y-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Wallet size={16} className="text-gold" />
            </div>
            <div>
              <div className="font-display font-semibold text-ink text-sm">初始预算</div>
              <div className="text-ink/60 text-sm font-serif">
                您将获得 <span className="text-gold font-bold">¥5,000万</span> 的预算用于竞拍艺术品
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target size={16} className="text-terracotta" />
            </div>
            <div>
              <div className="font-display font-semibold text-ink text-sm">竞拍策略</div>
              <div className="text-ink/60 text-sm font-serif">
                根据作者、年代、风格热度、保存状态和真伪风险决定是否出价，小心伪作陷阱！
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users size={16} className="text-sky-600" />
            </div>
            <div>
              <div className="font-display font-semibold text-ink text-sm">AI 竞拍对手</div>
              <div className="text-ink/60 text-sm font-serif">
                面对4位风格迥异的收藏家，他们可能抢拍、抬价或突然退出，各有偏好
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap size={16} className="text-amber-600" />
            </div>
            <div>
              <div className="font-display font-semibold text-ink text-sm">市场事件</div>
              <div className="text-ink/60 text-sm font-serif">
                艺术家热度上涨、真伪争议等突发新闻会影响价格和价值判断
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-ink/[0.03] rounded-sm border border-ink/5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
            <div>
              <div className="font-display font-semibold text-ink text-sm">投资回报</div>
              <div className="text-ink/60 text-sm font-serif">
                结算时展示资产变化、投资回报率和收藏价值分析，目标是让资产增值！
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-2 px-10 py-4 bg-gold text-white font-display font-semibold tracking-wider rounded-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <Play size={18} />
          <span>开始竞拍</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function PaintingDetailCard({ painting }: { painting: AuctionPainting }) {
  const conservation = getConservationLabel(painting.conservationStatus);
  const authenticity = getAuthenticityLabel(painting.authenticityRisk);

  return (
    <div className="file-card overflow-hidden animate-fadeInUp">
      <div className="relative aspect-[4/3] bg-ink/5 overflow-hidden">
        <img
          src={painting.imageUrl}
          alt={painting.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f0e8' width='400' height='300'/%3E%3Ctext fill='%23999' font-family='serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EArtwork%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase ${authenticity.color} bg-white/90 backdrop-blur-sm border border-ink/10`}>
            {authenticity.label}
          </span>
          <span className={`px-2 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase ${conservation.color} bg-white/90 backdrop-blur-sm border border-ink/10`}>
            保存{conservation.label}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-1">{painting.title}</h3>
          <p className="text-ink/50 font-serif text-xs uppercase tracking-wider">{painting.titleEn}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">艺术家</div>
            <div className="font-display font-semibold text-ink">{painting.artist}</div>
          </div>
          <div className="p-3 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">创作年代</div>
            <div className="font-display font-semibold text-ink">{painting.year}</div>
          </div>
          <div className="p-3 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">艺术流派</div>
            <div className="font-display font-semibold text-ink text-xs">{painting.movement}</div>
          </div>
          <div className="p-3 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">估价范围</div>
            <div className="font-display font-semibold text-gold">
              {formatCurrency(painting.lowEstimate)} - {formatCurrency(painting.highEstimate)}
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-ink/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink/50">来源历史</span>
            <StarRating value={painting.provenanceQuality} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink/50">展览记录</span>
            <StarRating value={painting.exhibitionHistory} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink/50">稀有程度</span>
            <StarRating value={painting.rarityScore} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink/50">风格热度</span>
            <StarRating value={painting.styleHeat} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink/50">艺术家声誉</span>
            <StarRating value={painting.artistReputation} />
          </div>
        </div>

        <p className="text-xs text-ink/50 font-serif leading-relaxed pt-2 border-t border-ink/10">
          {painting.description}
        </p>
      </div>
    </div>
  );
}

function BidderCard({ bidder, isActive }: { bidder: AuctionBidder; isActive: boolean }) {
  const personality = getBidderPersonalityLabel(bidder.personality);
  const budgetPercent = (bidder.remainingBudget / bidder.budget) * 100;

  return (
    <div
      className={`p-3 rounded-sm border transition-all ${
        isActive
          ? "bg-gold/5 border-gold/40 shadow-md"
          : "bg-white/50 border-ink/10"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{bidder.avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-ink text-sm truncate">{bidder.name}</div>
          <div className="text-[10px] text-ink/40 uppercase tracking-wider">{personality.label}</div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-ink/40">剩余预算</span>
          <span className="font-mono font-semibold text-ink/70">{formatCurrency(bidder.remainingBudget)}</span>
        </div>
        <div className="h-1 bg-ink/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${budgetPercent > 50 ? "bg-emerald-500" : budgetPercent > 20 ? "bg-amber-500" : "bg-terracotta"}`}
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
        <div className="text-[9px] text-ink/40">
          已竞得 {bidder.wonLots.length} 件
        </div>
      </div>
    </div>
  );
}

function BidHistory({ bids }: { bids: BidRecord[] }) {
  if (bids.length === 0) {
    return (
      <div className="text-center py-6 text-ink/40 text-xs font-serif">
        <History size={20} className="mx-auto mb-2 opacity-40" />
        暂无出价记录
      </div>
    );
  }

  return (
    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
      {[...bids].reverse().map((bid, idx) => (
        <div
          key={`${bid.bidderId}-${bid.timestamp}-${idx}`}
          className={`flex items-center justify-between p-2 rounded-sm text-xs ${
            bid.isPlayer ? "bg-gold/10 border border-gold/20" : "bg-ink/[0.03]"
          }`}
        >
          <div className="flex items-center gap-1.5">
            {bid.isPlayer ? (
              <span className="text-xs">👤</span>
            ) : (
              <span className="text-xs">🤖</span>
            )}
            <span className={`font-display font-medium ${bid.isPlayer ? "text-gold" : "text-ink/70"}`}>
              {bid.bidderName}
            </span>
          </div>
          <span className="font-mono font-bold text-ink">{formatCurrency(bid.amount)}</span>
        </div>
      ))}
    </div>
  );
}

function MarketEventBanner({ event }: { event: MarketEvent }) {
  const isPositive = event.valueModifier > 1;

  return (
    <div
      className={`p-4 rounded-sm border-2 animate-pulse-slow ${
        isPositive
          ? "bg-emerald-50 border-emerald-300"
          : "bg-rose-50 border-rose-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{getMarketEventIcon(event.type)}</span>
        <div className="flex-1">
          <div
            className={`font-display font-bold ${
              isPositive ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {event.title}
            {isPositive ? " 利好！" : " 利空！"}
          </div>
          <p
            className={`text-xs mt-0.5 ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {event.description}
          </p>
          <div className="text-[10px] mt-1 opacity-70">
            估值影响：{isPositive ? "+" : ""}
            {Math.round((event.valueModifier - 1) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}

function BiddingStage() {
  const {
    auctionPaintings,
    auctionCurrentLotIndex,
    auctionBidders,
    auctionCurrentBid,
    auctionLastBidderId,
    auctionBidHistory,
    auctionActiveEvents,
    auctionPlayerBudget,
    auctionBidCount,
    auctionPhase,
    placeQuickBid,
    placePlayerBid,
    passLot,
    triggerAIBid,
    triggerMarketEvent,
  } = useGameStore();

  const [customBid, setCustomBid] = useState<string>("");
  const [eventTriggered, setEventTriggered] = useState(false);

  const currentPainting = auctionPaintings[auctionCurrentLotIndex];
  const minNextBid = auctionCurrentBid + getBidIncrement(auctionCurrentBid);
  const maxBid = Math.min(auctionPlayerBudget, currentPainting?.highEstimate * 2 || auctionPlayerBudget);

  useEffect(() => {
    setCustomBid("");
    setEventTriggered(false);
  }, [auctionCurrentLotIndex]);

  useEffect(() => {
    if (auctionPhase !== "bidding") return;
    if (auctionLastBidderId === "player") return;

    const timeSinceLastBid = Date.now() - useGameStore.getState().auctionLastAIBidTime;
    const shouldBid = timeSinceLastBid > 1500 + Math.random() * 2000;

    if (!shouldBid) return;

    const timer = setTimeout(() => {
      triggerAIBid();
    }, 800 + Math.random() * 1500);

    return () => clearTimeout(timer);
  }, [auctionLastBidderId, auctionBidCount, auctionPhase, triggerAIBid]);

  useEffect(() => {
    if (auctionPhase !== "bidding") return;
    if (eventTriggered) return;
    if (auctionBidCount > 0 && auctionBidCount % 4 === 0 && Math.random() < 0.5) {
      setEventTriggered(true);
      const timer = setTimeout(() => {
        triggerMarketEvent();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [auctionBidCount, auctionPhase, eventTriggered, triggerMarketEvent]);

  if (!currentPainting) return null;

  const handleCustomBid = () => {
    const amount = parseInt(customBid.replace(/,/g, ""));
    if (isNaN(amount)) return;
    if (amount < minNextBid) return;
    if (amount > auctionPlayerBudget) return;
    audioManager.play("detail_focus");
    placePlayerBid(amount);
    setCustomBid("");
  };

  const handleQuickBid = () => {
    audioManager.play("clue_unlock");
    placeQuickBid();
  };

  const handlePass = () => {
    audioManager.play("paper_flip");
    passLot();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 animate-fadeInUp">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
              <Gavel size={18} className="text-gold" />
            </div>
            <div>
              <div className="font-display font-bold text-ink text-lg">
                拍品 {auctionCurrentLotIndex + 1} / {auctionPaintings.length}
              </div>
              <div className="text-[10px] text-ink/40 uppercase tracking-wider">
                Lot #{String(auctionCurrentLotIndex + 1).padStart(3, "0")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white/70 rounded-sm border border-ink/10">
            <Wallet size={18} className="text-gold" />
            <div>
              <div className="text-[10px] text-ink/40 uppercase tracking-wider">可用预算</div>
              <div className="font-mono font-bold text-ink text-lg">
                {formatCurrency(auctionPlayerBudget)}
              </div>
            </div>
          </div>
        </div>

        <PaintingDetailCard painting={currentPainting} />

        {auctionActiveEvents.length > 0 && auctionPhase === "marketEvent" && (
          <MarketEventBanner event={auctionActiveEvents[auctionActiveEvents.length - 1]} />
        )}

        <div className="file-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hammer size={18} className="text-gold" />
              <span className="font-display font-semibold text-ink">当前出价</span>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-3xl text-gold">
                {formatCurrency(auctionCurrentBid)}
              </div>
              <div className="text-[10px] text-ink/40">
                起拍价：{formatCurrency(Math.round(currentPainting.lowEstimate * 0.7))}
              </div>
            </div>
          </div>

          {auctionLastBidderId && (
            <div className="mb-4 p-3 bg-gold/5 rounded-sm border border-gold/20">
              <div className="flex items-center gap-2 text-sm">
                {auctionLastBidderId === "player" ? (
                  <>
                    <span>👤</span>
                    <span className="text-gold font-semibold">您</span>
                    <span className="text-ink/50">是最高出价者</span>
                  </>
                ) : (
                  <>
                    <span>🤖</span>
                    <span className="text-ink/70 font-semibold">
                      {auctionBidders.find((b) => b.id === auctionLastBidderId)?.name || "神秘买家"}
                    </span>
                    <span className="text-ink/50">领先出价</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleQuickBid}
              disabled={auctionPlayerBudget < minNextBid || auctionPhase !== "bidding"}
              className="flex items-center justify-center gap-2 p-4 bg-gold text-white font-display font-semibold rounded-sm hover:bg-gold/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-md"
            >
              <ChevronRight size={18} />
              <span>加价 {formatCurrency(getBidIncrement(auctionCurrentBid))}</span>
            </button>
            <button
              onClick={handlePass}
              disabled={auctionPhase !== "bidding"}
              className="flex items-center justify-center gap-2 p-4 bg-white text-ink/60 font-display font-semibold rounded-sm border-2 border-ink/15 hover:border-ink/30 hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <XCircle size={18} />
              <span>放弃此拍品</span>
            </button>
          </div>

          <div className="p-4 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-2">自定义出价</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customBid}
                onChange={(e) => setCustomBid(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={`最低 ${formatCurrency(minNextBid)}`}
                className="flex-1 px-4 py-3 bg-white border border-ink/15 rounded-sm font-mono text-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              />
              <button
                onClick={handleCustomBid}
                disabled={
                  !customBid ||
                  parseInt(customBid) < minNextBid ||
                  parseInt(customBid) > auctionPlayerBudget ||
                  auctionPhase !== "bidding"
                }
                className="px-5 py-3 bg-ink text-white font-display font-semibold rounded-sm hover:bg-ink/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                确认
              </button>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-ink/40">
              <span>最低：{formatCurrency(minNextBid)}</span>
              <span>上限：{formatCurrency(maxBid)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-6 self-start">
        <div className="file-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-gold" />
            <span className="font-display font-semibold text-ink text-sm">竞拍对手</span>
          </div>
          <div className="space-y-2">
            {auctionBidders.map((bidder) => (
              <BidderCard
                key={bidder.id}
                bidder={bidder}
                isActive={auctionLastBidderId === bidder.id}
              />
            ))}
          </div>
        </div>

        <div className="file-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <History size={16} className="text-gold" />
            <span className="font-display font-semibold text-ink text-sm">出价记录</span>
            <span className="ml-auto text-[10px] text-ink/40 font-mono">
              {auctionBidHistory.length} 次
            </span>
          </div>
          <BidHistory bids={auctionBidHistory} />
        </div>

        {auctionActiveEvents.length > 0 && (
          <div className="file-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-gold" />
              <span className="font-display font-semibold text-ink text-sm">市场动态</span>
            </div>
            <div className="space-y-2">
              {auctionActiveEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-2.5 rounded-sm text-xs ${
                    event.valueModifier > 1 ? "bg-emerald-50" : "bg-rose-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{getMarketEventIcon(event.type)}</span>
                    <span
                      className={`font-semibold ${
                        event.valueModifier > 1 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {event.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultStage() {
  const {
    auctionPaintings,
    auctionCurrentLotIndex,
    auctionCurrentBid,
    auctionLastBidderId,
    auctionBidders,
    auctionPlayerCollection,
    auctionLotResults,
    nextAuctionLot,
  } = useGameStore();

  const currentPainting = auctionPaintings[auctionCurrentLotIndex];
  const lotResult = auctionLotResults[auctionCurrentLotIndex];

  if (!currentPainting || !lotResult) return null;

  const winner = lotResult.winnerId
    ? lotResult.winnerId === "player"
      ? { name: "您", avatar: "👤" }
      : {
          name: auctionBidders.find((b) => b.id === lotResult.winnerId)?.name || "神秘买家",
          avatar: "🤖",
        }
    : null;

  const playerItem = auctionPlayerCollection.find(
    (c) => c.auctionPaintingId === currentPainting.id
  );

  const handleNext = () => {
    audioManager.play("next_question");
    nextAuctionLot();
  };

  const isLastLot = auctionCurrentLotIndex >= auctionPaintings.length - 1;

  return (
    <div className="file-card p-6 md:p-8 animate-fadeInUp max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-4">
          <Hammer className="text-gold" size={28} />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink mb-1">拍卖成交</h3>
        <p className="text-ink/50 font-serif text-sm uppercase tracking-wider">Lot Sold</p>
      </div>

      <div className="flex items-center gap-4 p-5 bg-ink/[0.03] rounded-sm mb-6">
        <img
          src={currentPainting.imageUrl}
          alt={currentPainting.title}
          className="w-24 h-20 object-cover rounded-sm shadow-md"
        />
        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-ink text-lg truncate">
            {currentPainting.title}
          </div>
          <div className="text-ink/50 text-sm">{currentPainting.artist} · {currentPainting.year}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gold/5 rounded-sm border border-gold/20 text-center">
          <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">成交价</div>
          <div className="font-mono font-bold text-2xl text-gold">
            {winner ? formatCurrency(lotResult.finalPrice) : "流拍"}
          </div>
        </div>
        <div className="p-4 bg-ink/[0.03] rounded-sm text-center">
          <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">得主</div>
          {winner ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">{winner.avatar}</span>
              <span
                className={`font-display font-semibold ${
                  lotResult.isPlayerWin ? "text-gold" : "text-ink/70"
                }`}
              >
                {winner.name}
              </span>
            </div>
          ) : (
            <div className="text-ink/50 font-serif">无人竞拍</div>
          )}
        </div>
      </div>

      {lotResult.isPlayerWin && playerItem && (
        <div
          className={`p-4 rounded-sm border mb-6 ${
            playerItem.isForgery
              ? "bg-rose-50 border-rose-200"
              : "bg-emerald-50 border-emerald-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {playerItem.isForgery ? (
              <ShieldAlert size={24} className="text-terracotta flex-shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck size={24} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div
                className={`font-display font-bold ${
                  playerItem.isForgery ? "text-terracotta" : "text-emerald-700"
                }`}
              >
                {playerItem.isForgery ? "⚠️ 警告：您可能买到了伪作！" : "✓ 真迹确认"}
              </div>
              <div className="text-sm text-ink/60 mt-1">
                {playerItem.isForgery
                  ? "经过专家鉴定，此作品存在重大疑点，实际价值大幅缩水。请在下次竞拍中更谨慎地评估真伪风险！"
                  : "专家鉴定确认此作品为真迹，具有良好的收藏和投资价值。"}
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div>
                  <span className="text-ink/40">购入价格：</span>
                  <span className="font-mono font-semibold text-ink">
                    {formatCurrency(playerItem.purchasePrice)}
                  </span>
                </div>
                <div>
                  <span className="text-ink/40">当前估值：</span>
                  <span
                    className={`font-mono font-semibold ${
                      playerItem.currentValue >= playerItem.purchasePrice
                        ? "text-emerald-600"
                        : "text-terracotta"
                    }`}
                  >
                    {formatCurrency(playerItem.currentValue)}
                  </span>
                </div>
                <div>
                  <span className="text-ink/40">盈亏：</span>
                  <span
                    className={`font-mono font-bold ${
                      playerItem.currentValue >= playerItem.purchasePrice
                        ? "text-emerald-600"
                        : "text-terracotta"
                    }`}
                  >
                    {playerItem.currentValue >= playerItem.purchasePrice ? "+" : ""}
                    {formatCurrency(playerItem.currentValue - playerItem.purchasePrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleNext}
        className="w-full flex items-center justify-center gap-2 p-4 bg-gold text-white font-display font-semibold tracking-wider rounded-sm hover:bg-gold/90 transition-all hover:shadow-lg"
      >
        <span>{isLastLot ? "查看最终结算" : "下一件拍品"}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function SettlementStage() {
  const { auctionSettlement, resetAuction, startAuction, totalScore, setGameMode } = useGameStore();

  const handleRestart = () => {
    audioManager.play("paper_flip");
    resetAuction();
    startAuction();
  };

  const handleBack = () => {
    audioManager.play("paper_flip");
    resetAuction();
    setGameMode("standard");
  };

  if (!auctionSettlement) return null;

  const roiPercent = (auctionSettlement.returnRate * 100).toFixed(2);
  const isProfit = auctionSettlement.profitLoss >= 0;

  const getGrade = () => {
    const roi = auctionSettlement.returnRate;
    if (roi >= 0.3) return { grade: "S", title: "投资宗师", color: "text-gold", desc: "眼光毒辣，点石成金！" };
    if (roi >= 0.15) return { grade: "A", title: "资深藏家", color: "text-emerald-600", desc: "优秀的投资判断力！" };
    if (roi >= 0.05) return { grade: "B", title: "潜力买家", color: "text-sky-600", desc: "稳健的收藏策略！" };
    if (roi >= -0.05) return { grade: "C", title: "新手投资人", color: "text-amber-600", desc: "继续学习艺术市场知识！" };
    if (roi >= -0.2) return { grade: "D", title: "交学费了", color: "text-orange-600", desc: "下次多加小心真伪风险！" };
    return { grade: "F", title: "惨痛教训", color: "text-terracotta", desc: "伪作陷阱太多，请谨慎出价！" };
  };

  const grade = getGrade();

  return (
    <div className="space-y-5 animate-fadeInUp max-w-4xl mx-auto">
      <div className="file-card p-8 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 mb-4">
          <Award className="text-gold" size={44} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2 tracking-wide">
          拍卖结算报告
        </h2>
        <p className="text-ink/50 font-serif text-sm uppercase tracking-[0.3em] mb-6">
          Final Settlement
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={`text-7xl font-black ${grade.color} tracking-tight`}>
            {grade.grade}
          </div>
          <div className="text-left">
            <div className={`font-display text-2xl font-bold ${grade.color}`}>
              {grade.title}
            </div>
            <div className="text-ink/50 text-sm font-serif">{grade.desc}</div>
          </div>
        </div>

        <div className="w-32 h-px mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">初始预算</div>
            <div className="font-mono font-bold text-xl text-ink">
              {formatCurrency(auctionSettlement.initialBudget)}
            </div>
          </div>
          <div className="p-4 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">剩余现金</div>
            <div className="font-mono font-bold text-xl text-ink">
              {formatCurrency(auctionSettlement.finalBudget)}
            </div>
          </div>
          <div className="p-4 bg-ink/[0.03] rounded-sm">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">藏品总值</div>
            <div className="font-mono font-bold text-xl text-sky-600">
              {formatCurrency(auctionSettlement.collectionValue)}
            </div>
          </div>
          <div className="p-4 bg-gold/5 rounded-sm border border-gold/20">
            <div className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">净资产</div>
            <div className="font-mono font-bold text-xl text-gold">
              {formatCurrency(auctionSettlement.netWorth)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-5 rounded-sm ${isProfit ? "bg-emerald-50" : "bg-rose-50"}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isProfit ? (
                <TrendingUp size={20} className="text-emerald-600" />
              ) : (
                <TrendingDown size={20} className="text-terracotta" />
              )}
              <span className="text-sm text-ink/50 uppercase tracking-wider">投资盈亏</span>
            </div>
            <div
              className={`font-mono font-bold text-3xl ${
                isProfit ? "text-emerald-600" : "text-terracotta"
              }`}
            >
              {isProfit ? "+" : ""}
              {formatCurrency(auctionSettlement.profitLoss)}
            </div>
          </div>
          <div className={`p-5 rounded-sm ${isProfit ? "bg-emerald-50" : "bg-rose-50"}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 size={20} className={isProfit ? "text-emerald-600" : "text-terracotta"} />
              <span className="text-sm text-ink/50 uppercase tracking-wider">投资回报率</span>
            </div>
            <div
              className={`font-mono font-bold text-3xl ${
                isProfit ? "text-emerald-600" : "text-terracotta"
              }`}
            >
              {isProfit ? "+" : ""}
              {roiPercent}%
            </div>
          </div>
          <div className="p-5 bg-ink/[0.03] rounded-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Layers size={20} className="text-ink/50" />
              <span className="text-sm text-ink/50 uppercase tracking-wider">战绩统计</span>
            </div>
            <div className="font-mono font-bold text-xl text-ink">
              竞得 {auctionSettlement.wonLots}/{auctionSettlement.totalLots} 件
            </div>
            {auctionSettlement.forgeryCount > 0 && (
              <div className="text-xs text-terracotta mt-1">
                ⚠️ 其中 {auctionSettlement.forgeryCount} 件为伪作
              </div>
            )}
          </div>
        </div>
      </div>

      {auctionSettlement.collection.length > 0 && (
        <div className="file-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieChart size={18} className="text-gold" />
            <h3 className="font-display font-bold text-ink text-lg">收藏明细</h3>
            <span className="ml-auto text-xs text-ink/40 font-serif">
              Collection Details
            </span>
          </div>

          <div className="space-y-3">
            {auctionSettlement.collection.map((item, idx) => {
              const auctionPainting = useGameStore
                .getState()
                .auctionPaintings.find((p) => p.id === item.auctionPaintingId);
              if (!auctionPainting) return null;
              const profit = item.currentValue - item.purchasePrice;
              const profitPct = ((profit / item.purchasePrice) * 100).toFixed(1);

              return (
                <div
                  key={item.auctionPaintingId}
                  className="flex items-center gap-4 p-4 bg-ink/[0.02] rounded-sm border border-ink/5 hover:bg-ink/[0.04] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gold font-mono">
                    {idx + 1}
                  </div>
                  <img
                    src={auctionPainting.imageUrl}
                    alt={auctionPainting.title}
                    className="w-16 h-12 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-ink truncate">
                      {auctionPainting.title}
                    </div>
                    <div className="text-xs text-ink/50 truncate">
                      {auctionPainting.artist} · {auctionPainting.year}
                      {item.isForgery && (
                        <span className="ml-2 px-1.5 py-0.5 bg-rose-100 text-terracotta text-[9px] rounded-sm font-semibold uppercase">
                          伪作
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-sm text-ink/60">
                      购入 {formatCurrency(item.purchasePrice)}
                    </div>
                    <div
                      className={`font-mono font-bold text-sm ${
                        profit >= 0 ? "text-emerald-600" : "text-terracotta"
                      }`}
                    >
                      {profit >= 0 ? "+" : ""}
                      {formatCurrency(profit)} ({profit >= 0 ? "+" : ""}
                      {profitPct}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRestart}
          className="flex-1 flex items-center justify-center gap-2 p-4 bg-gold text-white font-display font-semibold tracking-wider rounded-sm hover:bg-gold/90 transition-all hover:shadow-lg"
        >
          <RefreshCw size={18} />
          <span>再次挑战</span>
        </button>
        <button
          onClick={handleBack}
          className="flex-1 flex items-center justify-center gap-2 p-4 bg-white text-ink/70 font-display font-semibold tracking-wider rounded-sm border-2 border-ink/15 hover:border-ink/30 hover:text-ink transition-all"
        >
          <ArrowRight size={18} />
          <span>返回主菜单</span>
        </button>
      </div>
    </div>
  );
}

export default function AuctionPanel() {
  const { auctionPhase, startAuction, resetAuction, gameMode, setGameMode } = useGameStore();

  const handleStart = () => {
    audioManager.play("next_question");
    startAuction();
  };

  if (auctionPhase === "intro") {
    return <IntroStage onStart={handleStart} />;
  }

  if (auctionPhase === "bidding" || auctionPhase === "marketEvent") {
    return <BiddingStage />;
  }

  if (auctionPhase === "result") {
    return <ResultStage />;
  }

  if (auctionPhase === "settlement") {
    return <SettlementStage />;
  }

  return null;
}
