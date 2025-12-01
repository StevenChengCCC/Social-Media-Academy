import React from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'

// --- START: Localization Data for LinkedIn Page ---
const locales = {
  // ... (locales data remains unchanged) ...
  'en': {
    title: 'LinkedIn — Career-Safe Setup',
    lead: 'Control your public profile, search visibility, data sharing, and notification hygiene.',
    sections: {
      privacy: {
        h2: 'Privacy', pill1: 'Public profile', pill2: 'Profile viewing options', pill3: 'Email/Phone visibility',
        steps: [
          'Me → Settings & Privacy → Visibility → Edit your public profile: Turn off unnecessary modules (Birthday, Activity, etc.).',
          'Profile viewing options: Set to Private browsing during job seeking; switch back to public when posting content.',
          'Who can see your email/phone: Set to Only you or 1st-degree.',
          'Turn off Share profile updates to avoid constantly notifying your network when updating your resume.',
        ]
      },
      usage: {
        h2: 'Usage & Focus', pill1: 'Notifications hygiene', pill2: 'Feed tuning',
        steps: [
          'Settings → Communications: Only keep core notifications like “Direct messages / Job alerts / Network”, turn others Off.',
          'In the feed, click Hide / I don’t want to see this on low-quality posts; click Follow on high-quality creators to purify your feed.',
        ]
      },
      networking: {
        h2: 'Early Career Networking', pill1: 'Profile Summary', pill2: 'Connection Requests',
        steps: [
          'Professional Summary: Write a brief, impactful summary focused on your skills, interests, and career goals. Avoid overly personal details.',
          'Connection Etiquette: When sending a connection request to someone you don\'t know, always include a personalized note explaining why you want to connect.',
          'Recognizing Scams: Be wary of unsolicited messages promising high-paying jobs with minimal effort, especially if they ask for personal bank details or upfront fees.',
        ]
      },
      teens: {
        h2: 'For Teens/Students', pill1: 'Visibility for minors',
        steps: [
          'Minor accounts have stricter default restrictions: lower search visibility, tighter messaging permissions. Recommended to keep the cover concise, avatar professional, and only publicly display necessary information.',
        ]
      }
    },
    ytTitles: {
      privacy: 'How to Update Your LinkedIn Profile Without Annoying Your Contacts',
      scams: 'Is LinkedIn becoming a playground for cybercriminals?',
    }
  },
  'zh-CN': {
    title: '领英 (LinkedIn) — 职场安全设置',
    lead: '控制您的公开资料、搜索可见性、数据共享和通知卫生。',
    sections: {
      privacy: {
        h2: '隐私', pill1: '公开资料', pill2: '资料查看选项', pill3: '电子邮件/电话可见性',
        steps: [
          '我 → 设置与隐私 → 可见性 → 编辑您的公开资料：关闭不必要的模块（生日、活动等）。',
          '资料查看选项：求职阶段可先设为 私人 浏览；发布内容时再切回公开。',
          '谁可以查看您的电子邮件/电话：设为 仅限您 或 一级联系人。',
          '关闭 分享资料更新，以避免在更新简历时频繁打扰您的网络。',
        ]
      },
      usage: {
        h2: '使用与专注', pill1: '通知卫生', pill2: '信息流调整',
        steps: [
          '设置 → 通信：只保留核心通知，如“私信 / 职位提醒 / 人脉”，其他一律关闭。',
          '在动态中，对低质量帖子点击 隐藏 / 我不想看这个；对高质量创作者点击 关注，以净化信息流。',
        ]
      },
      networking: {
        h2: '早期职业人脉拓展', pill1: '资料摘要', pill2: '连接请求',
        steps: [
          '专业摘要：撰写简洁、有影响力的摘要，重点关注您的技能、兴趣和职业目标。避免过于个人化的细节。',
          '连接礼仪：向不认识的人发送连接请求时，请务必附上个性化便条，解释您希望连接的原因。',
          '识别诈骗：警惕承诺高薪且工作量极小的未经请求的消息，特别是如果它们要求提供个人银行详细信息或预付费用。',
        ]
      },
      teens: {
        h2: '针对青少年/学生', pill1: '未成年人可见性',
        steps: [
          '未成年人账户默认限制更严格：搜索可见性降低、消息权限收紧。建议保持封面简洁、头像职业化，并仅公开必要的信心。',
        ]
      }
    },
    ytTitles: {
      privacy: 'LinkedIn 隐藏您的公开资料指南',
      scams: '警告：针对学生的招聘诈骗警示',
    }
  }
};
// --- END: Localization Data for LinkedIn Page ---

export default function LinkedIn({ lang }){
    usePageTracking('LinkedIn');
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc linkedin">
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
          <h2>{s.usage.h2}</h2>
          <span className="pill">{s.usage.pill1}</span>
          <span className="pill">{s.usage.pill2}</span>
          <ol className="steps">
            <li>{s.usage.steps[0]}</li>
            <li>{s.usage.steps[1]}</li>
          </ol>
        </div>

        <div className="section">
          <h2>{s.networking.h2}</h2>
          <span className="pill">{s.networking.pill1}</span>
          <span className="pill">{s.networking.pill2}</span>
          <ol className="steps">
            <li>{s.networking.steps[0]}</li>
            <li>{s.networking.steps[1]}</li>
            <li>{s.networking.steps[2]}</li>
          </ol>
        </div>

        <div className="section">
          <h2>{s.teens.h2}</h2>
          <span className="pill">{s.teens.pill1}</span>
          <ol className="steps">
            <li>{s.teens.steps[0]}</li>
          </ol>
        </div>

        <YouTubeVideo videoId="hSXJLiC-9VI" title={t.ytTitles.privacy} lang={lang} />
        <YouTubeVideo videoId="8SI5R5o37rw" title={t.ytTitles.scams} lang={lang} />
      </div>
    </div>
  )
}