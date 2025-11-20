import React, { useEffect, useMemo, useRef, useState } from 'react'

const EMOJI = { R: '🪨', P: '📄', S: '✂️' }
const WINS_OVER = { R: 'S', S: 'P', P: 'R' }

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function resolveElasticCollision(a, b) {
  const nx = b.x - a.x, ny = b.y - a.y
  const dist = Math.hypot(nx, ny) || 1e-6
  const nux = nx / dist, nuy = ny / dist
  const vaN = a.vx * nux + a.vy * nuy
  const vbN = b.vx * nux + b.vy * nuy
  const vaN_after = vbN, vbN_after = vaN
  const vaT_x = a.vx - vaN * nux, vaT_y = a.vy - vaN * nuy
  const vbT_x = b.vx - vbN * nux, vbT_y = b.vy - vbN * nuy
  a.vx = vaT_x + vaN_after * nux; a.vy = vaT_y + vaN_after * nuy
  b.vx = vbT_x + vbN_after * nux; b.vy = vbT_y + vbN_after * nuy
}
function applyRPSConversion(a, b) {
  if (WINS_OVER[a.kind] === b.kind) b.kind = a.kind
  else if (WINS_OVER[b.kind] === a.kind) a.kind = b.kind
}
class SpatialHash {
  constructor(cellSize) { this.cell = cellSize; this.map = new Map() }
  key(cx, cy) { return `${cx},${cy}` }
  insert(p) {
    const cx = Math.floor(p.x / this.cell), cy = Math.floor(p.y / this.cell)
    const k = this.key(cx, cy); const arr = this.map.get(k) || []; arr.push(p.id); this.map.set(k, arr)
  }
  neighbors(x, y) {
    const cx = Math.floor(x / this.cell), cy = Math.floor(y / this.cell)
    const out = []; for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) out.push(this.key(cx + dx, cy + dy))
    return out
  }
}

export default function Play() {
  return (
    <div className="page">
      <header className="hero">
        <h1 className="title"><span>social media academy</span></h1>
      </header>

      <div className="play-wrap">
        <h2 className="play-title">🎮 石头剪刀布 · 粒子物理模拟</h2>
        <RPSArena />
        <div className="play-back">
          <a href="/" className="back">← 回到首页</a>
        </div>
      </div>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} social media academy</span>
      </footer>
    </div>
  )
}

function RPSArena() {
  const canvasRef = useRef(null)
  const [running, setRunning] = useState(true)
  const [density, setDensity] = useState(60)
  const [speed, setSpeed] = useState(1.0)
  const [radius, setRadius] = useState(14)
  const [counts, setCounts] = useState({ R: 0, P: 0, S: 0 })
  const [pixelRatio] = useState(() => (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1))
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const lastRef = useRef(null)
  const collidingPairs = useRef(new Set())

  const makeParticles = useMemo(() => {
    return (W, H) => {
      const arr = []
      const n = density
      const third = Math.max(1, Math.floor(n / 3))
      const rest = n - third * 2
      const kinds = [...Array(third).fill('R'), ...Array(third).fill('P'), ...Array(rest).fill('S')]
      let id = 0
      for (const k of kinds) {
        const r = radius
        const x = clamp(Math.random() * W, r + 1, W - r - 1)
        const y = clamp(Math.random() * H, r + 1, H - r - 1)
        const theta = Math.random() * Math.PI * 2
        const v = (0.6 + Math.random() * 0.8) * 100
        arr.push({ id: id++, kind: k, x, y, vx: Math.cos(theta) * v, vy: Math.sin(theta) * v, r })
      }
      return arr
    }
  }, [density, radius])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    function resize() {
      const rect = parent.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * pixelRatio)
      canvas.height = Math.floor(560 * pixelRatio) // 统一高度
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `560px`
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [pixelRatio])

  const reset = () => {
    const c = canvasRef.current; if (!c) return
    particlesRef.current = makeParticles(c.width, c.height)
    setCounts({ R: 0, P: 0, S: 0 })
  }
  useEffect(() => { reset() }, [makeParticles])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'

    const step = (ts) => {
      if (lastRef.current == null) lastRef.current = ts
      const dt = Math.min(0.035, (ts - lastRef.current) / 1000); lastRef.current = ts
      if (running) simulate(dt)
      render(); rafRef.current = requestAnimationFrame(step)
    }

    const simulate = (dt) => {
      const W = canvas.width, H = canvas.height, ps = particlesRef.current
      for (const p of ps) {
        p.x += p.vx * dt * speed; p.y += p.vy * dt * speed
        if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx) }
        else if (p.x > W - p.r) { p.x = W - p.r; p.vx = -Math.abs(p.vx) }
        if (p.y < p.r) { p.y = p.r; p.vy = Math.abs(p.vy) }
        else if (p.y > H - p.r) { p.y = H - p.r; p.vy = -Math.abs(p.vy) }
      }
      const cell = Math.max(16, Math.floor(radius * 2.2 * pixelRatio))
      const grid = new SpatialHash(cell); grid.map.clear(); for (const p of ps) grid.insert(p)
      collidingPairs.current.clear()
      for (const a of ps) {
        const keys = grid.neighbors(a.x, a.y)
        for (const k of keys) {
          const idxs = grid.map.get(k); if (!idxs) continue
          for (const id of idxs) {
            if (id <= a.id) continue
            const b = ps[id]
            const dx = b.x - a.x, dy = b.y - a.y
            const dist = Math.hypot(dx, dy); const minD = a.r + b.r
            if (dist > 0 && dist < minD) {
              const pairKey = `${a.id}-${b.id}`
              if (!collidingPairs.current.has(pairKey)) {
                collidingPairs.current.add(pairKey)
                const overlap = (minD - dist) / 2; const ux = dx / (dist || 1e-6); const uy = dy / (dist || 1e-6)
                a.x -= ux * overlap; a.y -= uy * overlap; b.x += ux * overlap; b.y += uy * overlap
                resolveElasticCollision(a, b)
                applyRPSConversion(a, b)
              }
            }
          }
        }
      }
      let cR = 0, cP = 0, cS = 0
      for (const p of ps) { if (p.kind === 'R') cR++; else if (p.kind === 'P') cP++; else cS++ }
      setCounts({ R: cR, P: cP, S: cS })
    }

    const render = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.font = `${Math.floor(radius * 1.8 * pixelRatio)}px system-ui, Apple Color Emoji, Segoe UI Emoji`
      for (const p of particlesRef.current) {
        ctx.beginPath(); ctx.arc(p.x, p.y + 2 * pixelRatio, p.r * 0.9, 0, Math.PI * 2)
        ctx.globalAlpha = 0.12; ctx.fillStyle = 'black'; ctx.fill(); ctx.globalAlpha = 1
        ctx.fillText(EMOJI[p.kind], p.x, p.y + (EMOJI[p.kind] === '✂️' ? -2 * pixelRatio : 0))
      }
      ctx.restore()
    }

    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [running, speed, radius, pixelRatio])

  return (
    <div className="arena">
      <div className="arena-row">
        <div className="arena-title">石头剪刀布 · 物理碰撞模拟</div>
        <div className="arena-actions">
          <button className="btn" onClick={() => setRunning(v => !v)}>{running ? '暂停' : '开始'}</button>
          <button className="btn" onClick={reset}>重置</button>
        </div>
      </div>

      <div className="arena-grid">
        <label className="field">
          <span>数量</span>
          <input type="range" min="10" max="200" value={density} onChange={e=>setDensity(+e.target.value)} />
          <em>{density}</em>
        </label>
        <label className="field">
          <span>速度</span>
          <input type="range" min="0.2" max="2.0" step="0.1" value={speed} onChange={e=>setSpeed(+e.target.value)} />
          <em>{speed.toFixed(1)}×</em>
        </label>
        <label className="field">
          <span>大小</span>
          <input type="range" min="8" max="24" value={radius} onChange={e=>setRadius(+e.target.value)} />
          <em>{radius}</em>
        </label>
      </div>

      <div className="arena-badges">
        <span>🪨 石头：{counts.R}</span>
        <span>📄 布：{counts.P}</span>
        <span>✂️ 剪刀：{counts.S}</span>
      </div>

      <div className="arena-canvas">
        <canvas ref={canvasRef} />
      </div>

      <p className="arena-note">提示：数量越多、速度越快，阵营转化会更快发生；所有粒子等质量，使用近似弹性碰撞。</p>
    </div>
  )
}