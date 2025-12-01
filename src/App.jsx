import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

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

// Local assets used on Home cards
import LogoSlang from './assets/slang_dictionary.png'
import LogoDiscord from './assets/discord-1024x576.jpg'
import LogoYouTube from './assets/youtubeLogo-1.png'
import LogoTikTok from './assets/TikTok_logo.svg'
import LogoFacebook from './assets/Facebook-Logo-2019.png'
import LogoInstagram from './assets/ins.jpg'
import LogoLinkedIn from './assets/linkedin.png'

// --- START: Localization Data for App/Home ---
const locales = {
  'en': {
    siteTitle: 'social media academy',
    subhero: 'Social Media Academy is a simple, parent-friendly handbook for using the internet safely and confidently. We explain each platform in plain language—how to set up privacy, manage screen time, and use family or supervision tools—plus a searchable slang dictionary so you can decode what people mean online.',
    chips: {
      instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', facebook: 'Facebook', discord: 'Discord', linkedin: 'LinkedIn', slang: 'Slang Dictionary'
    },
    tiles: {
      slang: {
        title: 'Slang Dictionary', desc: 'New to online slang? Meanings can change by culture, age, and context. Search unfamiliar words here—sensitive terms are hidden until you choose to reveal.'
      },
      discord: {
        title: 'Discord', desc: 'Group chat and voice for communities and games. Learn DM-scanning for safety, how to control friend requests, and Family Center supervision for teens.'
      },
      youtube: {
        title: 'YouTube', desc: 'Video platform for watching and posting. Set Restricted Mode, tune recommendations, and use supervised experiences (Kids or supervised accounts).'
      },
      tiktok: {
        title: 'TikTok', desc: 'Short-form videos and trends. Configure private accounts, comment/DM controls, and manage Screen Time with Family Pairing for parents.'
      },
      facebook: {
        title: 'Facebook', desc: 'Connect with friends, groups, and pages. Run Privacy Checkup, choose audiences for posts, and reduce distractions with Your Time & Quiet Mode.'
      },
      instagram: {
        title: 'Instagram', desc: 'Photos, Reels, and messaging. Make your account private, limit sensitive content, use Quiet Mode, and set up teen Supervision with parents.'
      },
      linkedin: {
        title: 'LinkedIn', desc: 'Professional networking for school and jobs. Control your public profile, limit data sharing, and keep notifications focused.'
      }
    },
    playLink: '🎮 Try a tiny physics toy (R-P-S particles)',
    footer: (year) => `© ${year} social media academy`,
    notFound: {
      h2: 'Page not found', back: 'Back to Home'
    },
    toggleLight: 'Switch to Light Mode',
    toggleDark: 'Switch to Dark Mode',
    toggleCN: '中文 (Chinese)',
    toggleEN: 'English',
    ytCaption: 'Tip: This video content is from YouTube. If it fails to load or watch, try using a VPN.',
    ytTitle: 'Watch Video Tutorial',
    backToHome: '← Back to Home',
    // Admin Locales
    adminTitle: 'Admin Dashboard',
    adminLogin: 'Enter Password to Access',
    adminPending: 'Pending Review',
    adminApproved: 'Approved Terms',
    approveBtn: 'Approve',
    rejectBtn: 'Reject/Delete',
    emptyList: 'No terms found.',
    logout: 'Logout'
  },
  'zh-CN': {
    siteTitle: '社交媒体学院',
    subhero: '社交媒体学院是一本简单、家长友好的手册，旨在帮助您安全、自信地使用互联网。我们用通俗的语言解释每个平台的使用方法——如何设置隐私、管理屏幕时间、使用家庭或监督工具——以及一个可搜索的俚语词典，帮助您解读网上的意思。',
    chips: {
      instagram: 'Instagram (照片/视频)', tiktok: '抖音国际版 (TikTok)', youtube: 'YouTube (视频)', facebook: '脸书 (Facebook)', discord: 'Discord (群聊)', linkedin: '领英 (LinkedIn)', slang: '俚语词典'
    },
    tiles: {
      slang: {
        title: '俚语词典', desc: '刚接触网络俚语？俚语的意思可能因文化、年龄和语境而异。在这里搜索不熟悉的词汇——敏感词汇默认隐藏，您可以选择显示。'
      },
      discord: {
        title: 'Discord (群聊)', desc: '用于社区和游戏的群聊和语音平台。了解私信扫描安全功能、如何控制好友请求以及针对青少年的家庭中心监督。'
      },
      youtube: {
        title: 'YouTube (视频)', desc: '用于观看和发布视频的平台。设置受限模式、调整推荐内容，并使用监督体验（YouTube Kids 或监督账户）。'
      },
      tiktok: {
        title: '抖音国际版 (TikTok)', desc: '短视频和热门趋势平台。配置私人账户、评论/私信控制，并通过家庭配对功能管理屏幕时间。'
      },
      facebook: {
        title: '脸书 (Facebook)', desc: '与朋友、群组和页面保持连接。运行隐私检查、选择帖子受众，并通过“你在 Facebook 上的时间”和“安静模式”减少干扰。'
      },
      instagram: {
        title: 'Instagram (照片/视频)', desc: '照片、Reels 和消息平台。将您的账户设为私人、限制敏感内容、使用安静模式，并与家长一起设置青少年监督。'
      },
      linkedin: {
        title: '领英 (LinkedIn)', desc: '面向学校和职业的专业社交平台。控制您的公开资料、限制数据共享，并保持通知集中。'
      },
    },
    playLink: '🎮 试玩一个微型物理小游戏 (石头剪刀布粒子)',
    footer: (year) => `© ${year} 社交媒体学院`,
    notFound: {
      h2: '找不到页面', back: '返回首页'
    },
    toggleLight: '切换至浅色模式',
    toggleDark: '切换至深色模式',
    toggleCN: '中文 (Chinese)',
    toggleEN: 'English',
    ytCaption: '提示：该视频内容来自YouTube，若无法加载或观看，请尝试科学上网。',
    ytTitle: '观看视频教程',
    backToHome: '← 返回首页',
    // Admin Locales
    adminTitle: '管理员控制台',
    adminLogin: '输入密码以访问',
    adminPending: '待审核',
    adminApproved: '已批准词条',
    approveBtn: '批准',
    rejectBtn: '拒绝/删除',
    emptyList: '暂无词条。',
    logout: '退出'
  },
};
// --- END: Localization Data ---


// Back to Home Link Component
export function BackToHomeLink({ lang }) {
  const t = locales[lang];
  return (
    <div className="back-link">
      <Link to="/" className="back-cta">
        {t.backToHome}
      </Link>
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle({ theme, toggleTheme, lang }) {
  const t = locales[lang];
  const icon = theme === 'dark' ? '🌙' : '☀️';
  const label = theme === 'dark' ? t.toggleDark : t.toggleLight;
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
      {icon}
    </button>
  );
}

// Language Toggle Component
function LanguageToggle({ lang, toggleLang }) {
  const label = lang === 'en' ? locales['zh-CN'].toggleCN : locales['en'].toggleEN;
  const icon = lang === 'en' ? '🇨🇳' : '🇬🇧';
  return (
    <button className="lang-toggle" onClick={toggleLang} aria-label={label} title={label}>
      {icon} {label}
    </button>
  );
}

export function YouTubeVideo({ videoId, title, lang }) {
  const t = locales[lang];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="yt">
      <h2>{t.ytTitle}: {title}</h2>
      <div className="yt-frame">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <p className="yt-caption">{t.ytCaption}</p>
    </div>
  )
}

// --- NEW: Admin Dashboard Component ---
function AdminDashboard({ lang, allTerms, onApprove, onReject }) {
  const t = locales[lang];
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  const checkPass = (e) => {
    e.preventDefault();
    if (password === 'admin123') setAuth(true); // Simple mock password
    else alert('Wrong password');
  }

  const pending = allTerms.filter(item => !item.approved);
  const approved = allTerms.filter(item => item.approved);

  if (!auth) {
    return (
      <div className="page" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh'}}>
        <BackToHomeLink lang={lang} />
        <form onSubmit={checkPass} style={{textAlign:'center', border: '1px solid var(--border)', padding:'2rem', borderRadius:'12px'}}>
          <h2>{t.adminLogin}</h2>
          <input
            type="password"
            className="slang-input"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            style={{marginBottom:'1rem'}}
          />
          <br/>
          <button type="submit" className="reveal-btn">{t.adminTitle}</button>
        </form>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <BackToHomeLink lang={lang} />
        <button className="reveal-btn" onClick={()=>setAuth(false)} style={{background:'red'}}>{t.logout}</button>
      </div>

      <div className="doc">
        <h1>{t.adminTitle}</h1>

        <div className="section">
          <h2 style={{color: 'orange'}}>{t.adminPending} ({pending.length})</h2>
          {pending.length === 0 && <p>{t.emptyList}</p>}
          <ul className="slang-list">
            {pending.map(item => (
              <li key={item.id} className="slang-row" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <b className="slang-term">{item.term}</b>: {item.meaning}
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                  <button onClick={()=>onApprove(item.id)} className="reveal-btn" style={{background:'green', fontSize:'0.8rem'}}>{t.approveBtn}</button>
                  <button onClick={()=>onReject(item.id)} className="reveal-btn" style={{background:'red', fontSize:'0.8rem'}}>{t.rejectBtn}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>{t.adminApproved} ({approved.length})</h2>
          {approved.length === 0 && <p>{t.emptyList}</p>}
          <ul className="slang-list">
            {approved.map(item => (
              <li key={item.id} className="slang-row" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <b className="slang-term">{item.term}</b>: {item.meaning}
                </div>
                <button onClick={()=>onReject(item.id)} className="reveal-btn" style={{background:'var(--subtext)', fontSize:'0.8rem'}}>{t.rejectBtn}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  // 1. Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // 2. Language state
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const userLang = navigator.language.startsWith('zh') ? 'zh-CN' : 'en';
      return localStorage.getItem('lang') || userLang;
    }
    return 'en';
  });

  // 3. User Submitted Terms State (Persistent)
  const [userTerms, setUserTerms] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userTerms');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Effect for theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect for language
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Effect for userTerms persistence
  useEffect(() => {
    localStorage.setItem('userTerms', JSON.stringify(userTerms));
  }, [userTerms]);

  // Actions for Slang
  const handleAddTerm = (term, meaning) => {
    const newEntry = {
      id: Date.now(), // simple unique ID
      term: term,
      meaning: meaning,
      approved: false, // Default pending
      sensitive: false
    };
    setUserTerms(prev => [...prev, newEntry]);
  };

  const handleApproveTerm = (id) => {
    setUserTerms(prev => prev.map(item => item.id === id ? {...item, approved: true} : item));
  };

  const handleRejectTerm = (id) => {
    setUserTerms(prev => prev.filter(item => item.id !== id));
  };

  // Filter only approved terms for the public Slang page
  const approvedCustomTerms = useMemo(() => userTerms.filter(t => t.approved), [userTerms]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang(currentLang => (currentLang === 'en' ? 'zh-CN' : 'en'));
  };

  const t = locales[lang];

  return (
    <BrowserRouter>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} lang={lang} />
      <LanguageToggle lang={lang} toggleLang={toggleLang} />

      <Routes>
        <Route path="/" element={<Home t={t} />} />
        {/* Pass custom approved list and submit handler to Slang */}
        <Route
          path="/slang"
          element={<Slang lang={lang} customList={approvedCustomTerms} onSubmitTerm={handleAddTerm} />}
        />
        {/* New Admin Route - pass all terms and handlers */}
        <Route
          path="/admin"
          element={<AdminDashboard lang={lang} allTerms={userTerms} onApprove={handleApproveTerm} onReject={handleRejectTerm} />}
        />

        <Route path="/instagram" element={<Instagram lang={lang} />} />
        <Route path="/tiktok" element={<TikTok lang={lang} />} />
        <Route path="/youtube" element={<YouTube lang={lang} />} />
        <Route path="/facebook" element={<Facebook lang={lang} />} />
        <Route path="/discord" element={<Discord lang={lang} />} />
        <Route path="/linkedin" element={<LinkedIn lang={lang} />} />
        <Route path="/play" element={<Play lang={lang} />} />
        <Route path="*" element={<NotFound t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home({ t }) {
  return (
    <div className="page">
      <header className="hero fancy">
        <h1 className="title" aria-label={t.siteTitle}>
          <span>{t.siteTitle}</span>
        </h1>

        <p className="subhero">
          {t.subhero}
        </p>

        <div className="chips">
          <Link className="chip" to="/instagram">{t.chips.instagram}</Link>
          <Link className="chip" to="/tiktok">{t.chips.tiktok}</Link>
          <Link className="chip" to="/youtube">{t.chips.youtube}</Link>
          <Link className="chip" to="/facebook">{t.chips.facebook}</Link>
          <Link className="chip" to="/discord">{t.chips.discord}</Link>
          <Link className="chip" to="/linkedin">{t.chips.linkedin}</Link>
          <Link className="chip" to="/slang">{t.chips.slang}</Link>
        </div>
      </header>

      <nav className="list">
        <WideTile
          to="/slang"
          img={LogoSlang}
          title={t.tiles.slang.title}
          desc={t.tiles.slang.desc}
        />
        <WideTile
          to="/discord"
          img={LogoDiscord}
          title={t.tiles.discord.title}
          desc={t.tiles.discord.desc}
        />
        <WideTile
          to="/youtube"
          img={LogoYouTube}
          title={t.tiles.youtube.title}
          desc={t.tiles.youtube.desc}
        />
        <WideTile
          to="/tiktok"
          img={LogoTikTok}
          title={t.tiles.tiktok.title}
          desc={t.tiles.tiktok.desc}
        />
        <WideTile
          to="/facebook"
          img={LogoFacebook}
          title={t.tiles.facebook.title}
          desc={t.tiles.facebook.desc}
        />
        <WideTile
          to="/instagram"
          img={LogoInstagram}
          title={t.tiles.instagram.title}
          desc={t.tiles.instagram.desc}
        />
        <WideTile
          to="/linkedin"
          img={LogoLinkedIn}
          title={t.tiles.linkedin.title}
          desc={t.tiles.linkedin.desc}
        />
      </nav>

      <div className="play-link">
        <Link to="/play" className="play-cta">{t.playLink}</Link>
      </div>

      <footer className="footer">
        <span>{t.footer(new Date().getFullYear())}</span>
        {/* Simple Link to Admin at bottom */}
        <span style={{marginLeft: '15px', opacity: 0.5}}>
          <Link to="/admin" style={{color: 'inherit', textDecoration: 'none'}}>Admin</Link>
        </span>
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

function NotFound({ t }) {
  return (
    <div className="nf">
      <h2>{t.notFound.h2}</h2>
      <p><Link className="back" to="/">{t.notFound.back}</Link></p>
    </div>
  )
}