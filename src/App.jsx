import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Instagram from './pages/Instagram.jsx'
import TikTok from './pages/TikTok.jsx'
import YouTube from './pages/YouTube.jsx'
import Facebook from './pages/Facebook.jsx'
import Discord from './pages/Discord.jsx'
import Slang from './pages/Slang.jsx'

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
    <div style={container}>
      <header style={headerRow}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Social Media Academy</h1>
          <p style={{ margin: '4px 0', opacity: .7 }}>文字优先教学 · 看不懂再看图解</p>
        </div>
      </header>

      <nav style={grid}>
        <Tile to="/instagram" title="Instagram 教程" desc="账号设置 · 安全 · 内容基础" />
        <Tile to="/tiktok"    title="TikTok 教程"     desc="隐私 · 家长监护 · 内容基础" />
        <Tile to="/youtube"   title="YouTube 教程"    desc="频道创建 · 上传 · 合规" />
        <Tile to="/facebook"  title="Facebook 教程"   desc="隐私 · 页面管理 · 社群" />
        <Tile to="/discord"   title="Discord 教程"    desc="加入服务器 · 频道 · 语音与安全" />
        <Tile to="/slang"     title="网络用语词典"     desc="常见缩写与梗，友好解释" />
      </nav>
    </div>
  )
}

function NotFound() {
  return (
    <div style={container}>
      <h2>页面不存在</h2>
      <p><Link to="/">回到首页</Link></p>
    </div>
  )
}

function Tile({ to, title, desc }) {
  return (
    <Link to={to} style={tile}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</div>
        <div style={{ opacity: .75 }}>{desc}</div>
      </div>
      <span aria-hidden>→</span>
    </Link>
  )
}

const container = { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', padding: 24, maxWidth: 980, margin: '0 auto' }
const headerRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }
const tile = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  border: '1px solid #e5e7eb', borderRadius: 14, padding: 16, textDecoration: 'none',
  color: 'inherit', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.04)'
}