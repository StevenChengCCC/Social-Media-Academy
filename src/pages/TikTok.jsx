import React from 'react'
import { YouTubeVideo } from '../App.jsx'

// --- START: Localization Data for TikTok Page ---
const locales = {
  'en': {
    title: 'TikTok — Safety & Family Pairing',
    lead: 'Private account, comment/DM filters, Screen Time limits, Restricted Mode, and Family Pairing.',
    sections: {
      privacy: {
        h2: 'Privacy', pill1: 'Private account', pill2: 'Comments & DMs', pill3: 'Downloads/Duets',
        steps: [
          'Profile → <b>≡</b> → <b>Settings and privacy</b> → <b>Privacy</b> → Turn on <b>Private account</b>.',
          '<b>Comments</b>: Privacy → Comments → Only followers/Only friends or Off; Enable keyword filter.',
          '<b>Direct messages</b>: Privacy → Direct messages → Set to <b>Friends</b> or <b>No one</b>.',
          'Turn off video downloads, limit <b>Duet</b>/<b>Stitch</b> scope: Privacy → Downloads / Duet & Stitch.',
        ]
      },
      contentSafety: {
        h2: 'Content Creation Safety', pill1: 'Location Protection', pill2: 'Reporting',
        steps: [
          '<b>Avoid Location Leakage</b>: Do not post videos showing school logos, street signs, house interiors, or sensitive identifying features (like car license plates).',
          '<b>Check Tags and Sounds</b>: Be cautious of trending sounds/challenges, especially those linked to risky behavior. Do not tag your exact location.',
          '<b>Report Inappropriate Content</b>: If you encounter harmful content on your For You Page, tap the share icon → <b>Report</b> to remove it and tune recommendations.',
        ]
      },
      screenTime: {
        h2: 'Screen Time', pill1: 'Daily limit', pill2: 'Break reminders', pill3: 'Restricted Mode',
        steps: [
          'Settings and privacy → <b>Screen time</b> → <b>Daily screen time</b> Set minutes (customizable by day of the week).',
          'Enable <b>Screen time breaks</b> (Scheduled break reminders).',
          '<b>Restricted Mode</b>: Limits more mature content, requires PIN.',
        ]
      },
      pairing: {
        h2: 'Family Pairing', pill1: 'Parent–teen link',
        steps: [
          'Settings and privacy → <b>Family Pairing</b> → Scan QR code to link parent account.',
          'Remote management available for: screen time, restricted mode, DM permissions, search and suggested content, visibility, etc.',
        ]
      }
    },
    ytTitles: {
      pairing: 'How to Use TikTok Family Pairing (Tutorial)',
      safety: 'TikTok Content Creation Safety Tips for Teens'
    }
  },
  'zh-CN': {
    title: '抖音国际版 (TikTok) — 安全与家庭配对',
    lead: '私人账户、评论/私信过滤、屏幕时间限制、受限模式和家庭配对。',
    sections: {
      privacy: {
        h2: '隐私', pill1: '私人账户', pill2: '评论与私信', pill3: '下载/合拍',
        steps: [
          '个人资料 → <b>≡</b> → <b>设置与隐私</b> → <b>隐私</b> → 打开 <b>私人账户</b>。',
          '<b>评论</b>：隐私 → 评论 → 仅关注/仅好友或关闭；开启关键词过滤。',
          '<b>私信</b>：隐私 → 私信 → 设置为 <b>朋友</b> 或 <b>没有人</b>。',
          '关闭视频下载、限制 <b>合拍</b>/<b>拼接</b> 范围：隐私 → 下载 / 合拍与拼接。',
        ]
      },
      contentSafety: {
        h2: '内容创作安全', pill1: '位置保护', pill2: '举报',
        steps: [
          '<b>避免位置泄露</b>：不要发布展示学校标志、路标、房屋内部或敏感身份识别特征（如车牌）的视频。',
          '<b>检查标签和声音</b>：警惕热门声音/挑战，特别是那些与危险行为相关的。不要标记您的精确位置。',
          '<b>举报不当内容</b>：如果您在“为你推荐”页面遇到有害内容，请点击分享图标 → <b>举报</b> 以将其移除并调整推荐。',
        ]
      },
      screenTime: {
        h2: '屏幕时间', pill1: '每日限制', pill2: '休息提醒', pill3: '受限模式',
        steps: [
          '设置与隐私 → <b>屏幕时间</b> → <b>每日屏幕时间</b> 设置分钟数（可按星期定制）。',
          '开启 <b>屏幕时间休息</b>（定时休息提醒）。',
          '<b>受限模式</b>：限制更成熟内容，需要 PIN。',
        ]
      },
      pairing: {
        h2: '家庭配对', pill1: '家长–青少年关联',
        steps: [
          '设置与隐私 → <b>家庭配对</b> → 扫码绑定家长账号。',
          '可远程管理：屏幕时间、受限模式、私信权限、搜索与建议、可见度等。',
        ]
      }
    },
    ytTitles: {
      pairing: 'TikTok 家庭配对设置指南',
      safety: 'TikTok 青少年内容安全技巧'
    }
  }
};
// --- END: Localization Data for TikTok Page ---

export default function TikTok({ lang }){
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="doc tiktok">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>

      <div className="section">
        <h2>{s.privacy.h2}</h2>
        <span className="pill">{s.privacy.pill1}</span>
        <span className="pill">{s.privacy.pill2}</span>
        <span className="pill">{s.privacy.pill3}</span>
        <ol className="steps">
          <li>{s.privacy.steps[0]}</li>
          <li>{s.privacy.steps[1]}</li>
          <li>{s.privacy.steps[2]}</li>
          <li>{s.privacy.steps[3]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.contentSafety.h2}</h2>
        <span className="pill">{s.contentSafety.pill1}</span>
        <span className="pill">{s.contentSafety.pill2}</span>
        <ol className="steps">
          <li>{s.contentSafety.steps[0]}</li>
          <li>{s.contentSafety.steps[1]}</li>
          <li>{s.contentSafety.steps[2]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.screenTime.h2}</h2>
        <span className="pill">{s.screenTime.pill1}</span>
        <span className="pill">{s.screenTime.pill2}</span>
        <span className="pill">{s.screenTime.pill3}</span>
        <ol className="steps">
          <li>{s.screenTime.steps[0]}</li>
          <li>{s.screenTime.steps[1]}</li>
          <li>{s.screenTime.steps[2]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.pairing.h2}</h2>
        <span className="pill">{s.pairing.pill1}</span>
        <ol className="steps">
          <li>{s.pairing.steps[0]}</li>
          <li>{s.pairing.steps[1]}</li>
        </ol>
      </div>

      <YouTubeVideo videoId="19ndEUUe4Oc" title={t.ytTitles.pairing} lang={lang} />
      <YouTubeVideo videoId="HVvdw4njZZw" title={t.ytTitles.safety} lang={lang} />
    </div>
  )
}