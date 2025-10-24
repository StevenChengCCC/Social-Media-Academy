import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Instagram from './pages/Instagram.jsx'
import TikTok from './pages/TikTok.jsx'
import YouTube from './pages/YouTube.jsx'
import Facebook from './pages/Facebook.jsx'
import Discord from './pages/Discord.jsx'
import Slang from './pages/Slang.jsx'
import './app.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/tiktok" element={<TikTok />} />
        <Route path="/youtube" element={<YouTube />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/discord" element={<Discord />} />
        <Route path="/slang" element={<Slang />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="page">
      {/* 纯标题区域 */}
      <header className="hero">
        <h1 className="title" aria-label="social media academy">
          <span>social media academy</span>
        </h1>
      </header>

      {/* 导航网格 */}
      <nav className="grid">
        <Tile to="/instagram" emoji="📸" title="Instagram" desc="账号·安全·内容基础" />
        <Tile to="/tiktok"    emoji="🎵" title="TikTok"    desc="隐私·家长监护·创作" />
        <Tile to="/youtube"   emoji="▶️" title="YouTube"   desc="频道·上传·合规" />
        <Tile to="/facebook"  emoji="👥" title="Facebook"  desc="隐私·页面·社群" />
        <Tile to="/discord"   emoji="💬" title="Discord"   desc="服务器·频道·语音" />
        <Tile to="/slang"     emoji="🔎" title="网络用语"   desc="词典·搜索·敏感提示" />
      </nav>

      {/* 页脚（可选） */}
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} social media academy</span>
      </footer>
    </div>
  )
}

function Tile({ to, emoji, title, desc }) {
  return (
    <Link to={to} className="tile">
      <div className="tile-head">
        <span className="tile-emoji" aria-hidden>{emoji}</span>
        <div className="tile-title">{title}</div>
      </div>
      <div className="tile-desc">{desc}</div>
      <div className="tile-arrow" aria-hidden>→</div>
    </Link>
  )
}

function NotFound() {
  return (
    <div className="nf">
      <h2>页面不存在</h2>
      <p><Link className="back" to="/">回到首页</Link></p>
    </div>
  )
}
