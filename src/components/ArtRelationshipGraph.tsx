import { useMemo, useState, useEffect, useRef } from "react";
import { artistInfos, artistRelations, paintings, type ArtistRelation, type RelationType } from "@/data/paintings";
import { useGameStore } from "@/store/useGameStore";
import { Network, Users, ArrowRight, Sparkles, Lock, X } from "lucide-react";

const RELATION_COLORS: Record<RelationType, { color: string; label: string; icon: string }> = {
  teacher_student: { color: "#2E7D32", label: "师生关系", icon: "🎓" },
  friend: { color: "#1565C0", label: "挚友", icon: "🤝" },
  rival: { color: "#C62828", label: "竞争对手", icon: "⚔️" },
  influenced: { color: "#B8860B", label: "影响启发", icon: "💡" },
  contemporary: { color: "#6A1B9A", label: "同时代", icon: "📅" },
  same_movement: { color: "#A0522D", label: "同一流派", icon: "🎨" },
};

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  artist: typeof artistInfos[0];
  paintingCount: number;
  unlockedCount: number;
}

export default function ArtRelationshipGraph() {
  const { unlockedPaintingIds } = useGameStore();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredRelation, setHoveredRelation] = useState<ArtistRelation | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const [, forceRender] = useState(0);

  const unlockedArtists = useMemo(() => {
    const set = new Set<string>();
    paintings.forEach((p) => {
      if (unlockedPaintingIds.includes(p.id)) set.add(p.artist);
    });
    return set;
  }, [unlockedPaintingIds]);

  const artistPaintings = useMemo(() => {
    const map: Record<string, typeof paintings> = {};
    paintings.forEach((p) => {
      if (!map[p.artist]) map[p.artist] = [];
      map[p.artist].push(p);
    });
    return map;
  }, []);

  useEffect(() => {
    const visibleArtists = artistInfos.filter(
      (a) => unlockedArtists.size === 0 || unlockedArtists.has(a.name)
    );

    const cx = 400;
    const cy = 300;
    const radius = 220;
    const nodes: Node[] = (visibleArtists.length > 0 ? visibleArtists : artistInfos).map((artist, i) => {
      const angle = (i / (visibleArtists.length > 0 ? visibleArtists.length : artistInfos.length)) * Math.PI * 2 - Math.PI / 2;
      const ps = artistPaintings[artist.name] || [];
      const unlockedCount = ps.filter((p) => unlockedPaintingIds.includes(p.id)).length;
      return {
        id: artist.name,
        x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
        artist,
        paintingCount: ps.length,
        unlockedCount,
      };
    });
    nodesRef.current = nodes;

    let animId: number;
    let lastT = performance.now();

    const step = (t: number) => {
      const dt = Math.min((t - lastT) / 16, 2);
      lastT = t;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let fx = (cx - a.x) * 0.002;
        let fy = (cy - a.y) * 0.002;

        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = Math.max(dx * dx + dy * dy, 100);
          const d = Math.sqrt(d2);
          const f = 800 / d2;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        }

        for (const rel of artistRelations) {
          let bi = -1;
          if (rel.source === a.id) {
            bi = nodes.findIndex((n) => n.id === rel.target);
          } else if (rel.target === a.id) {
            bi = nodes.findIndex((n) => n.id === rel.source);
          }
          if (bi >= 0 && bi !== i) {
            const b = nodes[bi];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const target = 140;
            const diff = d - target;
            fx += (dx / d) * diff * 0.004;
            fy += (dy / d) * diff * 0.004;
          }
        }

        a.vx = (a.vx + fx * dt) * 0.85;
        a.vy = (a.vy + fy * dt) * 0.85;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.x = Math.max(60, Math.min(740, a.x));
        a.y = Math.max(60, Math.min(540, a.y));
      }

      forceRender((v) => v + 1);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [unlockedArtists, artistPaintings, unlockedPaintingIds]);

  const nodes = nodesRef.current;
  const selectedArtist = selectedNode ? artistInfos.find((a) => a.name === selectedNode) : null;
  const selectedArtistPaintings = selectedNode ? artistPaintings[selectedNode] || [] : [];
  const selectedRelations = selectedNode
    ? artistRelations.filter((r) => r.source === selectedNode || r.target === selectedNode)
    : [];

  const visibleRelations = artistRelations.filter((r) => {
    const hasSource = nodes.some((n) => n.id === r.source);
    const hasTarget = nodes.some((n) => n.id === r.target);
    return hasSource && hasTarget;
  });

  const totalRelations = artistRelations.length;
  const discoveredRelations = visibleRelations.filter(
    (r) => unlockedArtists.has(r.source) && unlockedArtists.has(r.target)
  ).length;

  return (
    <div className="min-h-screen py-6 md:py-8 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center">
              <Network className="text-terracotta" size={22} strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-wide">
              艺术关系图谱
            </h1>
          </div>
          <p className="text-ink/60 font-serif text-sm tracking-wider">
            Relationship Map · 大师们的师承、友谊与交锋
          </p>
          <div className="mt-5 w-32 h-px mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-gold animate-markerPulse" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-5">
          <div className="file-card overflow-hidden animate-fadeInUp" style={{ animationDelay: "100ms" }}>
            <div className="px-5 py-3 border-b border-ink/10 bg-ink/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gold" />
                <span className="font-display text-sm font-semibold text-ink/80">互动图谱</span>
              </div>
              <div className="text-[10px] font-serif text-ink/50">
                已发现 {discoveredRelations}/{totalRelations} 条关系
              </div>
            </div>

            <div
              ref={canvasRef}
              className="relative w-full"
              style={{
                aspectRatio: "4 / 3",
                background:
                  "radial-gradient(ellipse at center, rgba(184,134,11,0.03) 0%, transparent 70%), repeating-linear-gradient(0deg, rgba(62,44,32,0.015) 0px, rgba(62,44,32,0.015) 1px, transparent 1px, transparent 4px)",
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                {visibleRelations.map((rel, i) => {
                  const source = nodes.find((n) => n.id === rel.source);
                  const target = nodes.find((n) => n.id === rel.target);
                  if (!source || !target) return null;
                  const c = RELATION_COLORS[rel.type];
                  const isHighlighted = selectedNode === rel.source || selectedNode === rel.target;
                  const opacity = isHighlighted ? 0.9 : 0.25;
                  const strokeW = isHighlighted ? 2.5 : 1.5;

                  const dx = target.x - source.x;
                  const dy = target.y - source.y;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const nx = dx / len;
                  const ny = dy / len;
                  const arrowX = target.x - nx * 24;
                  const arrowY = target.y - ny * 24;

                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setHoveredRelation(rel)}
                      onMouseLeave={() => setHoveredRelation(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <line
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={c.color}
                        strokeWidth={strokeW}
                        strokeOpacity={opacity}
                        strokeDasharray={rel.type === "influenced" ? "6 4" : undefined}
                      />
                      {rel.type === "influenced" && (
                        <polygon
                          points={`${arrowX},${arrowY - 5} ${arrowX + nx * 10 + ny * 5},${arrowY + ny * 10 - nx * 5} ${arrowX + nx * 10 - ny * 5},${arrowY + ny * 10 + nx * 5}`}
                          fill={c.color}
                          fillOpacity={opacity}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                const isUnlocked = unlockedArtists.has(node.id);
                const r = 20 + node.paintingCount * 3;

                return (
                  <button
                    key={node.id}
                    onClick={() => isUnlocked && setSelectedNode(isSelected ? null : node.id)}
                    className="absolute group"
                    style={{
                      left: `${(node.x / 800) * 100}%`,
                      top: `${(node.y / 600) * 100}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isSelected ? 10 : 1,
                    }}
                  >
                    <div
                      className={`relative rounded-full flex items-center justify-center transition-all ${
                        isUnlocked ? "cursor-pointer" : "cursor-not-allowed"
                      } ${isSelected ? "scale-125" : "group-hover:scale-110"}`}
                      style={{
                        width: r * 2,
                        height: r * 2,
                        background: isUnlocked
                          ? `radial-gradient(circle at 30% 30%, #F5F1E8, #E8DFCC)`
                          : "rgba(62,44,32,0.08)",
                        border: isSelected
                          ? "3px solid #B8860B"
                          : isUnlocked
                          ? "2px solid rgba(184,134,11,0.5)"
                          : "1px dashed rgba(62,44,32,0.2)",
                        boxShadow: isSelected
                          ? "0 0 20px rgba(184,134,11,0.5)"
                          : isUnlocked
                          ? "0 2px 8px rgba(62,44,32,0.15)"
                          : "none",
                      }}
                    >
                      {isUnlocked ? (
                        <span className="text-base font-display font-bold text-ink/80">
                          {node.artist.name.slice(0, 1)}
                        </span>
                      ) : (
                        <Lock size={14} className="text-ink/30" />
                      )}
                      {isUnlocked && node.unlockedCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                          {node.unlockedCount}
                        </div>
                      )}
                    </div>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap font-serif text-[11px] transition-opacity ${
                        isSelected || isUnlocked ? "text-ink/80" : "text-ink/30"
                      }`}
                    >
                      {isUnlocked ? node.artist.name : "???"}
                    </div>
                  </button>
                );
              })}

              {hoveredRelation && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-museum-dark/90 backdrop-blur-sm rounded-sm animate-fadeInScale pointer-events-none">
                  <div className="flex items-center gap-2 text-white text-sm font-serif">
                    <span>{RELATION_COLORS[hoveredRelation.type].icon}</span>
                    <span className="font-semibold">{hoveredRelation.source}</span>
                    <ArrowRight size={14} />
                    <span className="font-semibold">{hoveredRelation.target}</span>
                  </div>
                  <div className="text-white/70 text-[11px] font-serif mt-0.5 text-center">
                    {hoveredRelation.description}
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-ink/10 bg-ink/5 flex flex-wrap gap-3 justify-center">
              {Object.entries(RELATION_COLORS).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-0.5"
                    style={{
                      backgroundColor: val.color,
                      borderStyle: key === "influenced" ? "dashed" : "solid",
                      borderTop: key === "influenced" ? `1px dashed ${val.color}` : undefined,
                      height: key === "influenced" ? 0 : 2,
                    }}
                  />
                  <span className="text-[10px] font-serif text-ink/60">
                    {val.icon} {val.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 self-start lg:sticky lg:top-6">
            {selectedArtist ? (
              <div className="file-card overflow-hidden animate-fadeInUp">
                <div className="px-5 py-3 border-b border-ink/10 bg-gold/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold" />
                    <span className="font-display text-sm font-semibold text-ink/80">艺术家档案</span>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center hover:bg-ink/20 transition-colors"
                  >
                    <X size={12} className="text-ink/60" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-ink">{selectedArtist.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-serif px-2 py-0.5 bg-ink/10 text-ink/70 rounded-sm">
                      {selectedArtist.era}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 bg-gold/15 text-gold rounded-sm">
                      {selectedArtist.country}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 bg-terracotta/15 text-terracotta rounded-sm">
                      {selectedArtist.movement}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-ink/10">
                    <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider mb-2">
                      相关作品
                    </div>
                    <div className="space-y-2">
                      {selectedArtistPaintings.map((p) => {
                        const unlocked = unlockedPaintingIds.includes(p.id);
                        return (
                          <div
                            key={p.id}
                            className={`flex items-center gap-2 p-2 rounded-sm ${
                              unlocked ? "bg-ink/5" : "bg-ink/[0.02]"
                            }`}
                          >
                            <div className="w-10 h-10 rounded-sm overflow-hidden bg-ink/5 shrink-0">
                              {unlocked ? (
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Lock size={12} className="text-ink/30" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-serif text-sm text-ink/80 truncate">
                                {unlocked ? `《${p.title}》` : "??? 未解锁"}
                              </div>
                              <div className="text-[10px] text-ink/50 font-serif">{p.year}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedRelations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-ink/10">
                      <div className="text-[10px] text-ink/50 font-serif uppercase tracking-wider mb-2">
                        艺术关系 ({selectedRelations.length})
                      </div>
                      <div className="space-y-2">
                        {selectedRelations.map((rel, i) => {
                          const other = rel.source === selectedNode ? rel.target : rel.source;
                          const c = RELATION_COLORS[rel.type];
                          const otherUnlocked = unlockedArtists.has(other);
                          return (
                            <button
                              key={i}
                              onClick={() => otherUnlocked && setSelectedNode(other)}
                              disabled={!otherUnlocked}
                              className={`w-full text-left flex items-center gap-2 p-2 rounded-sm transition-colors ${
                                otherUnlocked ? "hover:bg-ink/5 cursor-pointer" : "cursor-not-allowed"
                              }`}
                            >
                              <span className="text-base">{c.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-serif text-sm text-ink/80 truncate">
                                  {otherUnlocked ? other : "??? 未解锁"}
                                </div>
                                <div className="text-[10px] text-ink/50 font-serif truncate">
                                  {rel.description}
                                </div>
                              </div>
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: c.color }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="file-card p-5 animate-fadeInUp">
                <div className="text-center">
                  <Network size={32} className="text-gold/40 mx-auto mb-2" />
                  <p className="text-ink/50 font-serif text-sm">点击图谱中的艺术家节点</p>
                  <p className="text-ink/40 font-serif text-xs mt-1">查看详细档案与艺术关系</p>
                </div>
              </div>
            )}

            <div className="file-card p-4 text-xs text-ink/50 font-serif space-y-2 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-1.5 text-ink/70 font-semibold">
                <span className="text-gold">📜</span>
                <span>图谱说明</span>
              </div>
              <p>· 答对题目可解锁艺术家，其节点会出现在图谱中</p>
              <p>· 连线代表艺术家之间的关系：师承、友谊、竞争、影响等</p>
              <p>· 节点大小代表该艺术家收录的作品数量</p>
              <p>· 虚线箭头表示影响与启发的方向</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
