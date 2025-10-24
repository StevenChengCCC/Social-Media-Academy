import React, { useEffect, useRef, useState, useMemo } from "react";

// === Rock–Paper–Scissors 粒子物理模拟（Canvas）===
// 规则：
//   Rock(石头 🪨) 碰到 Scissors(剪刀 ✂️) → 剪刀变成石头
//   Scissors(剪刀 ✂️) 碰到 Paper(布 📄) → 布变成剪刀
//   Paper(布 📄) 碰到 Rock(石头 🪨) → 石头变成布
// 物理：
//   - 近似等质量弹性碰撞（2D），基于法向量交换法向速度分量
//   - 墙面弹性反弹
//   - 使用网格空间哈希提升碰撞检测效率
// UI：
//   - 选择初始数量、速度、大小
//   - 运行/暂停、重置、清屏
//   - 显示计数

// --- 类型与常量 ---
const EMOJI = {
  R: "🪨", // Rock
  P: "📄", // Paper
  S: "✂️", // Scissors
} as const;

type Kind = keyof typeof EMOJI; // 'R' | 'P' | 'S'

const WINS_OVER: Record<Kind, Kind> = {
  R: "S", // 石头克剪刀
  S: "P", // 剪刀克布
  P: "R", // 布克石头
};

interface Particle {
  id: number;
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // 半径（用于碰撞）
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// 将两个速度向量按法向/切向分解并交换法向分量（等质量弹性碰撞）
function resolveElasticCollision(a: Particle, b: Particle) {
  const nx = b.x - a.x;
  const ny = b.y - a.y;
  const dist = Math.hypot(nx, ny) || 1e-6;
  const nux = nx / dist;
  const nuy = ny / dist;

  // 速度在法向上的投影
  const vaN = a.vx * nux + a.vy * nuy;
  const vbN = b.vx * nux + b.vy * nuy;

  // 等质量：交换法向分量，切向不变
  const vaN_after = vbN;
  const vbN_after = vaN;

  const vaT_x = a.vx - vaN * nux;
  const vaT_y = a.vy - vaN * nuy;
  const vbT_x = b.vx - vbN * nux;
  const vbT_y = b.vy - vbN * nuy;

  a.vx = vaT_x + vaN_after * nux;
  a.vy = vaT_y + vaN_after * nuy;
  b.vx = vbT_x + vbN_after * nux;
  b.vy = vbT_y + vbN_after * nuy;
}

// 转化规则：若 A 克制 B，则 B 变为 A 的类型
function applyRPSConversion(a: Particle, b: Particle) {
  if (WINS_OVER[a.kind] === b.kind) {
    b.kind = a.kind;
  } else if (WINS_OVER[b.kind] === a.kind) {
    a.kind = b.kind;
  }
}

// --- 网格哈希（粗检测）---
class SpatialHash {
  cell: number;
  map = new Map<string, number[]>();
  constructor(cellSize: number) {
    this.cell = cellSize;
  }
  key(cx: number, cy: number) {
    return `${cx},${cy}`;
  }
  insert(p: Particle) {
    const cx = Math.floor(p.x / this.cell);
    const cy = Math.floor(p.y / this.cell);
    const k = this.key(cx, cy);
    let arr = this.map.get(k);
    if (!arr) this.map.set(k, (arr = []));
    arr.push(p.id);
  }
  neighbors(x: number, y: number) {
    const cx = Math.floor(x / this.cell);
    const cy = Math.floor(y / this.cell);
    const out: string[] = [];
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++) out.push(this.key(cx + dx, cy + dy));
    return out;
  }
}

// --- 主组件 ---
export default function RPSArena() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(true);
  const [density, setDensity] = useState(60); // 粒子数量
  const [speed, setSpeed] = useState(1.0); // 速度系数
  const [radius, setRadius] = useState(14); // 半径（像素）
  const [counts, setCounts] = useState({ R: 0, P: 0, S: 0 });

  const [pixelRatio] = useState(() => (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1));

  // 生成初始粒子：R/P/S 均分
  const makeParticles = useMemo(() => {
    return (W: number, H: number): Particle[] => {
      const arr: Particle[] = [];
      const n = density;
      const third = Math.max(1, Math.floor(n / 3));
      const rest = n - third * 2;
      const kinds: Kind[] = [
        ...Array(third).fill("R" as Kind),
        ...Array(third).fill("P" as Kind),
        ...Array(rest).fill("S" as Kind),
      ];
      let id = 0;
      for (const k of kinds) {
        const r = radius;
        const x = clamp(Math.random() * W, r + 1, W - r - 1);
        const y = clamp(Math.random() * H, r + 1, H - r - 1);
        // 随机方向速度
        const theta = Math.random() * Math.PI * 2;
        const v = (0.6 + Math.random() * 0.8) * 100; // px/s 的基准（后续乘 speed）
        arr.push({ id: id++, kind: k, x, y, vx: Math.cos(theta) * v, vy: Math.sin(theta) * v, r });
      }
      return arr;
    };
  }, [density, radius]);

  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // 为了避免一次碰撞内多次转换，维护一帧的碰撞对集合
  const collidingPairs = useRef<Set<string>>(new Set());

  // 尺寸处理（自适应父容器）
  useEffect(() => {
    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;

    function resize() {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * pixelRatio);
      canvas.height = Math.floor((rect.height || 500) * pixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height || 500}px`;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [pixelRatio]);

  // 初始化与重置
  const reset = () => {
    const c = canvasRef.current;
    if (!c) return;
    particlesRef.current = makeParticles(c.width, c.height);
    setCounts({ R: 0, P: 0, S: 0 });
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeParticles]);

  // 动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const step = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = Math.min(0.035, (ts - lastRef.current) / 1000); // 秒
      lastRef.current = ts;

      if (running) {
        simulate(dt);
      }
      render();
      rafRef.current = requestAnimationFrame(step);
    };

    const simulate = (dt: number) => {
      const W = canvas.width;
      const H = canvas.height;
      const ps = particlesRef.current;

      // 位置更新 + 墙反弹
      for (const p of ps) {
        p.x += p.vx * dt * speed;
        p.y += p.vy * dt * speed;

        if (p.x < p.r) {
          p.x = p.r; p.vx = Math.abs(p.vx);
        } else if (p.x > W - p.r) {
          p.x = W - p.r; p.vx = -Math.abs(p.vx);
        }
        if (p.y < p.r) {
          p.y = p.r; p.vy = Math.abs(p.vy);
        } else if (p.y > H - p.r) {
          p.y = H - p.r; p.vy = -Math.abs(p.vy);
        }
      }

      // 网格放置
      const cell = Math.max(16, Math.floor(radius * 2.2 * pixelRatio));
      const grid = new SpatialHash(cell);
      grid.map.clear();
      for (const p of ps) grid.insert(p);

      // 清空本帧碰撞表
      collidingPairs.current.clear();

      // 碰撞检测与处理（近邻 3x3 网格）
      for (const a of ps) {
        const keys = grid.neighbors(a.x, a.y);
        for (const k of keys) {
          const idxs = grid.map.get(k);
          if (!idxs) continue;
          for (const id of idxs) {
            if (id <= a.id) continue; // 每对只处理一次
            const b = ps[id];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy);
            const minD = a.r + b.r;
            if (dist > 0 && dist < minD) {
              const pairKey = `${a.id}-${b.id}`;
              if (!collidingPairs.current.has(pairKey)) {
                collidingPairs.current.add(pairKey);
                // 轻微分离，避免重叠
                const overlap = (minD - dist) / 2;
                const ux = dx / (dist || 1e-6);
                const uy = dy / (dist || 1e-6);
                a.x -= ux * overlap;
                a.y -= uy * overlap;
                b.x += ux * overlap;
                b.y += uy * overlap;

                // 物理弹性碰撞
                resolveElasticCollision(a, b);
                // RPS 转化
                applyRPSConversion(a, b);
              }
            }
          }
        }
      }

      // 计数
      let cR = 0, cP = 0, cS = 0;
      for (const p of ps) {
        if (p.kind === "R") cR++; else if (p.kind === "P") cP++; else cS++;
      }
      setCounts({ R: cR, P: cP, S: cS });
    };

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.scale(1, 1);
      ctx.font = `${Math.floor(radius * 1.8 * pixelRatio)}px system-ui, Apple Color Emoji, Segoe UI Emoji`;

      for (const p of particlesRef.current) {
        // 绘制简易阴影圆增强“实体感”
        ctx.beginPath();
        ctx.arc(p.x, p.y + 2 * pixelRatio, p.r * 0.9, 0, Math.PI * 2);
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.globalAlpha = 1;
        // 绘制 emoji
        ctx.fillText(EMOJI[p.kind], p.x, p.y + (EMOJI[p.kind] === "✂️" ? -2 * pixelRatio : 0));
      }
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, speed, radius, pixelRatio]);

  return (
    <div className="w-full h-[600px] bg-white/40 backdrop-blur rounded-2xl shadow-lg p-4 border border-slate-200">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h2 className="text-xl font-semibold">石头剪刀布 · 物理碰撞模拟</h2>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <button
            onClick={() => setRunning(v => !v)}
            className="px-3 py-1.5 rounded-2xl shadow border hover:shadow-md transition"
          >{running ? "暂停" : "开始"}</button>
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-2xl shadow border hover:shadow-md transition"
          >重置</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-3">
          <label className="w-20 text-sm text-slate-600">数量</label>
          <input type="range" min={10} max={200} value={density} onChange={e=>setDensity(+e.target.value)} className="w-full"/>
          <span className="tabular-nums w-10 text-right">{density}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="w-20 text-sm text-slate-600">速度</label>
          <input type="range" min={0.2} max={2.0} step={0.1} value={speed} onChange={e=>setSpeed(+e.target.value)} className="w-full"/>
          <span className="tabular-nums w-10 text-right">{speed.toFixed(1)}×</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="w-20 text-sm text-slate-600">大小</label>
          <input type="range" min={8} max={24} value={radius} onChange={e=>setRadius(+e.target.value)} className="w-full"/>
          <span className="tabular-nums w-10 text-right">{radius}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm text-slate-700">
        <span className="rounded-full px-2 py-1 bg-white/70 border">🪨 石头：{counts.R}</span>
        <span className="rounded-full px-2 py-1 bg-white/70 border">📄 布：{counts.P}</span>
        <span className="rounded-full px-2 py-1 bg-white/70 border">✂️ 剪刀：{counts.S}</span>
      </div>

      <div className="relative w-full h-[calc(100%-170px)] overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-50 to-indigo-50">
        <canvas ref={canvasRef} className="block w-full h-full"/>
      </div>

      <p className="mt-3 text-xs text-slate-500">提示：数量越多、速度越快，阵营转化会更快发生；所有粒子等质量，使用近似弹性碰撞。</p>
    </div>
  );
}
