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
import LogoLinkedIn from './assets/linkedin.png'

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
      <header className="hero fancy">
        <h1 className="title" aria-label="social media academy">
          <span>social media academy</span>
        </h1>

        <p className="subhero">
          Social Media Academy is a simple, parent-friendly handbook for using the internet safely and confidently.
          We explain each platform in plain language—how to set up privacy, manage screen time, and use family or
          supervision tools—plus a searchable slang dictionary so you can decode what people mean online.
        </p>

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

      <nav className="list">
        <WideTile
          to="/slang"
          img={LogoSlang}
          title="Slang Dictionary"
          desc="New to online slang? Meanings can change by culture, age, and context. Search unfamiliar words here—sensitive terms are hidden until you choose to reveal."
        />
        <WideTile
          to="/discord"
          img={LogoDiscord}
          title="Discord"
          desc="Group chat and voice for communities and games. Learn DM-scanning for safety, how to control friend requests, and Family Center supervision for teens."
        />
        <WideTile
          to="/youtube"
          img={LogoYouTube}
          title="YouTube"
          desc="Video platform for watching and posting. Set Restricted Mode, tune recommendations, and use supervised experiences (Kids or supervised accounts)."
        />
        <WideTile
          to="/tiktok"
          img={LogoTikTok}
          title="TikTok"
          desc="Short-form videos and trends. Configure private accounts, comment/DM controls, and manage Screen Time with Family Pairing for parents."
        />
        <WideTile
          to="/facebook"
          img={LogoFacebook}
          title="Facebook"
          desc="Connect with friends, groups, and pages. Run Privacy Checkup, choose audiences for posts, and reduce distractions with Your Time & Quiet Mode."
        />
        <WideTile
          to="/instagram"
          img={LogoInstagram}
          title="Instagram"
          desc="Photos, Reels, and messaging. Make your account private, limit sensitive content, use Quiet Mode, and set up teen Supervision with parents."
        />
        <WideTile
          to="/linkedin"
          img={LogoLinkedIn}
          title="LinkedIn"
          desc="Professional networking for school and jobs. Control your public profile, limit data sharing, and keep notifications focused."
        />
      </nav>

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
