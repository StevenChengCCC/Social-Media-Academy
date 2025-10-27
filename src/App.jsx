import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// Pages
import Instagram from './pages/Instagram.jsx'
import TikTok from './pages/TikTok.jsx'
import YouTube from './pages/YouTube.jsx'
import Facebook from './pages/Facebook.jsx'
import Discord from './pages/Discord.jsx'
import Slang from './pages/Slang.jsx'
import LinkedIn from './pages/LinkedIn.jsx'
import Play from './pages/Play.jsx'

import './app.css'

// Local assets used on Home cards (可保留你已有的6张图路径)
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
        <Route path="/linkedin" element={<LinkedIn />} />
        <Route path="/play" element={<Play />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <header className="hero fancy">
        <h1 className="title" aria-label="social media academy">
          <span>social media academy</span>
        </h1>

        {/* 英文简介 */}
        <p className="subhero">
          Practical, parent-friendly guides for using social media safely and well.
          Learn platform-specific privacy settings, screen-time controls, and family
          supervision—plus a living slang dictionary with sensitive-term protection.
        </p>

        {/* 快速入口 chips */}
        <div className="chips">
          <Link className="chip" to="/instagram">Instagram</Link>
          <Link className="chip" to="/tiktok">TikTok</Link>
          <Link className="chip" to="/youtube">YouTube</Link>
          <Link className="chip" to="/facebook">Facebook</Link>
          <Link className="chip" to="/discord">Discord</Link>
          <Link className="chip" to="/linkedin">LinkedIn</Link>
          <Link className="chip" to="/slang">Slang Dictionary</Link>
        </div>
      </header>

      {/* 横向信息卡（横图更自然） */}
      <nav className="list">
        <WideTile to="/slang"     img={LogoSlang}     title="SlangDiction" desc="Slang dictionary · search · sensitive-term gate" />
        <WideTile to="/discord"   img={LogoDiscord}   title="Discord"      desc="Privacy & Safety · server basics · Family Center" />
        <WideTile to="/youtube"   img={LogoYouTube}   title="YouTube"      desc="Restricted Mode · supervised accounts · comments" />
        <WideTile to="/tiktok"    img={LogoTikTok}    title="TikTok"       desc="Privacy · Screen Time · Family Pairing" />
        <WideTile to="/facebook"  img={LogoFacebook}  title="Facebook"     desc="Privacy Checkup · audience controls · your time" />
        <WideTile to="/instagram" img={LogoInstagram} title="Instagram"    desc="Private account · Quiet Mode · Supervision" />
      </nav>

      {/* 新增：LinkedIn 简洁入口（第7个） */}
      <div className="highlight">
        <div className="hl-left">
          <div className="hl-dot" />
          <div className="hl-text">
            <b>New • LinkedIn</b>
            <span> Career-safe settings, public profile control, and feed hygiene. </span>
          </div>
        </div>
        <Link className="hl-link" to="/linkedin">Open guide →</Link>
      </div>

      {/* 最底部小游戏入口（低调） */}
      <div className="play-link">
        <Link to="/play" className="play-cta">🎮 Try a tiny physics toy (R-P-S particles)</Link>
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
      <div className="tile-media"><img src={img} alt={`${title} banner`} loading="lazy" /></div>
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
      <h2>Page not found</h2>
      <p><Link className="back" to="/">Back to Home</Link></p>
    </div>
  )
}
