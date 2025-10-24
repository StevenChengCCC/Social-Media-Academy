import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 你已有的页面
import Instagram from './pages/Instagram.jsx'
import TikTok from './pages/TikTok.jsx'
import YouTube from './pages/YouTube.jsx'
import Facebook from './pages/Facebook.jsx'
import Discord from './pages/Discord.jsx'
import Slang from './pages/Slang.jsx'

// 新增：小游戏页
import Play from './pages/Play.jsx'

import './app.css'

// 本地图片
import LogoSlang from './assets/slang_dictionary.png'
import LogoDiscord from './assets/discord-1024x576.jpg'
import LogoYouTube from './assets/youtubeLogo-1.png'
import LogoTikTok from './assets/TikTok_logo.svg'
import LogoFacebook from './assets/Facebook-Logo-2019.png'
import LogoInstagram from './assets/ins.jpg'

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
        <Route path="/play" element={<Play />} /> {/* 新增 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="page">
      <header className="hero">
        <h1 className="title" aria-label="social media academy">
          <span>social media academy</span>
        </h1>
      </header>

      {/* 横向信息卡 */}
      <nav className="list">
        <WideTile to="/slang"     img={LogoSlang}     title="SlangDiction" desc="网络用语词典 · 搜索 / 敏感提示" />
        <WideTile to="/discord"   img={LogoDiscord}   title="Discord"      desc="服务器 · 频道 · 语音与安全" />
        <WideTile to="/youtube"   img={LogoYouTube}   title="YouTube"      desc="频道 · 上传 · 合规" />
        <WideTile to="/tiktok"    img={LogoTikTok}    title="TikTok"       desc="隐私 · 家长监护 · 创作" />
        <WideTile to="/facebook"  img={LogoFacebook}  title="Facebook"     desc="隐私 · 页面管理 · 社群" />
        <WideTile to="/instagram" img={LogoInstagram} title="Instagram"    desc="账号设置 · 安全 · 内容基础" />
      </nav>

      {/* 这里是最底部的小链接 */}
      <div className="play-link">
        <Link to="/play" className="play-cta">🎮 去玩一个小小的粒子模拟游戏</Link>
      </div>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} social media academy</span>
      </footer>
    </div>
  )
}

function WideTile({ to, img, title, desc }) {
  return (
    <Link to={to} className="tile-wide">
      <div className="tile-media">
        <img src={img} alt={`${title} banner`} loading="lazy" />
      </div>
      <div className="tile-body">
        <div className="tile-title">{title}</div>
        <div className="tile-desc">{desc}</div>
      </div>
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
