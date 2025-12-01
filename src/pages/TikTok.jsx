import React from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'

// --- START: Localization Data for TikTok Page ---
const locales = {
  'en': {
    title: 'TikTok — Safety & Family Pairing',
    lead: 'Private account, comment/DM filters, Screen Time limits, Restricted Mode, and Family Pairing.',
    sections: {
      privacy: {
        h2: 'Privacy', pill1: 'Private account', pill2: 'Comments & DMs', pill3: 'Downloads/Duets',
        steps: [
          'Profile → ≡ → Settings and privacy → Privacy → Turn on Private account.',
          'Comments: Privacy → Comments → Only followers/Only friends or Off; Enable keyword filter.',
          'Direct messages: Privacy → Direct messages → Set to Friends or No one.',
          'Turn off video downloads, limit Duet/Stitch scope: Privacy → Downloads / Duet & Stitch.',
        ]
      },
      contentSafety: {
        h2: 'Content Creation Safety', pill1: 'Location Protection', pill2: 'Reporting',
        steps: [
          'Avoid Location Leakage: Do not post videos showing school logos, street signs, house interiors, or sensitive identifying features (like car license plates).',
          'Check Tags and Sounds: Be cautious of trending sounds/challenges, especially those linked to risky behavior. Do not tag your exact location.',
          'Report Inappropriate Content: If you encounter harmful content on your For You Page, tap the share icon → Report to remove it and tune recommendations.',
        ]
      },
      screenTime: {
        h2: 'Screen Time', pill1: 'Daily limit', pill2: 'Break reminders', pill3: 'Restricted Mode',
        steps: [
          'Settings and privacy → Screen time → Daily screen time Set minutes (customizable by day of the week).',
          'Enable Screen time breaks (Scheduled break reminders).',
          'Restricted Mode: Limits more mature content, requires PIN.',
        ]
      },
      pairing: {
        h2: 'Family Pairing', pill1: 'Parent–teen link',
        steps: [
          'Settings and privacy → Family Pairing → Scan QR code to link parent account.',
          'Remote management available for: screen time, restricted mode, DM permissions, search and suggested content, visibility, etc.',
        ]
      }
    },
    ytTitles: {
      pairing: 'How to Set Up TikTok Family Pairing (2025 Guide)',
      safety: 'TikTok Safety Features Explained for Parents'
    }
  },
  'zh-CN': {
    title: '抖音国际版 (TikTok) — 安全与家庭配对',
    lead: '私人账户、评论/私信过滤、屏幕时间限制、受限模式和家庭配对。',
    sections: {
      privacy: {
        h2: '隐私', pill1: '私人账户', pill2: '评论与私信', pill3: '下载/合拍',
        steps: [
          '个人资料 → ≡ → 设置与隐私 → 隐私 → 打开 私人账户。',
          '评论：隐私 → 评论 → 仅关注/仅好友或关闭；开启关键词过滤。',
          '私信：隐私 → 私信 → 设置为 朋友 或 没有人。',
          '关闭视频下载、限制 合拍/拼接 范围：隐私 → 下载 / 合拍与拼接。',
        ]
      },
      contentSafety: {
        h2: '内容创作安全', pill1: '位置保护', pill2: '举报',
        steps: [
          '避免位置泄露：不要发布展示学校标志、路标、房屋内部或敏感身份识别特征（如车牌）的视频。',
          '检查标签和声音：警惕热门声音/挑战，特别是那些与危险行为相关的。不要标记您的精确位置。',
          '举报不当内容：如果您在“为你推荐”页面遇到有害内容，请点击分享图标 → 举报 以将其移除并调整推荐。',
        ]
      },
      screenTime: {
        h2: '屏幕时间', pill1: '每日限制', pill2: '休息提醒', pill3: '受限模式',
        steps: [
          '设置与隐私 → 屏幕时间 → 每日屏幕时间 设置分钟数（可按星期定制）。',
          '开启 屏幕时间休息（定时休息提醒）。',
          '受限模式：限制更成熟内容，需要 PIN。',
        ]
      },
      pairing: {
        h2: '家庭配对', pill1: '家长–青少年关联',
        steps: [
          '设置与隐私 → 家庭配对 → 扫码绑定家长账号。',
          '可远程管理：屏幕时间、受限模式、私信权限、搜索与建议、可见度等。',
        ]
      }
    },
    ytTitles: {
      pairing: 'TikTok 家庭配对设置指南 (2025)',
      safety: 'TikTok 青少年内容安全技巧'
    }
  }
};

export default function TikTok({ lang }){
  usePageTracking('TikTok');

  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
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
        <YouTubeVideo videoId="j1x-kW3mWXk" title={t.ytTitles.pairing} lang={lang} />
        <YouTubeVideo videoId="vpKksQLxfaU" title={t.ytTitles.safety} lang={lang} />
      </div>
    </div>
  )
}