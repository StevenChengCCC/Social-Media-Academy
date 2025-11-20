import React from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'

// --- START: Localization Data for Instagram Page ---
const locales = {
  // ... (locales data remains unchanged) ...
  'en': {
    title: 'Instagram — Safety & Setup',
    lead: 'Private accounts, Sensitive Content Control, Quiet Mode, and Supervision for teens.',
    sections: {
      privacy: {
        h2: 'Privacy', pill1: 'Private account', pill2: 'Story controls', pill3: 'Sensitive content',
        steps: [
          'Profile → <b>☰</b> → <b>Settings and privacy</b> → <b>Account privacy</b> → <b>Private</b>.',
          'Story: Settings and privacy → <b>Who can see your content</b> → <b>Story</b> → <b>Close Friends</b> / hide from specific people.',
          'Explore/Recommendations level: Settings and privacy → <b>Content preferences</b> → <b>Sensitive content</b> → Select <b>Limit even more</b>.',
          'Comments/Tags: Settings and privacy → <b>How others can interact</b> → Turn off comments/tags from strangers.',
        ],
        tip: 'Tip: You can also set “Hide like count, Turn off commenting” on individual Reels/posts (three dots menu).',
      },
      footprint: {
        h2: 'Digital Footprint & Branding', pill1: 'Personal Branding', pill2: 'Archiving',
        steps: [
          'Review Profile: Check bio, profile picture, and all grid posts. Ensure your overall presence reflects a positive and future-appropriate image.',
          '<b>Archive Old Posts</b>: Profile → <b>☰</b> → <b>Archive</b>. Use this to remove old content from public view without deleting it permanently.',
          '<b>Manage Close Friends</b>: Use the Close Friends list for Stories to limit sensitive, non-public content to a small, trusted group.',
        ]
      },
      usage: {
        h2: 'Usage & Focus', pill1: 'Daily time limit', pill2: 'Quiet Mode',
        steps: [
          'Settings and privacy → <b>Your activity</b> → <b>Time spent</b> → <b>Set daily time limit</b> (e.g., 30min).',
          'Settings and privacy → <b>Notifications</b> → <b>Quiet Mode</b> (Set time period for automatic muting and auto-reply).',
        ]
      },
      supervision: {
        h2: 'Supervision (Family Center)', pill1: 'For teens',
        steps: [
          'Settings and privacy → <b>Supervision</b> (Family Center). Parents can send an invitation using their Meta account.',
          'Viewable by parent: follow/follower changes, time management settings, reporting alerts; Parents cannot read DM content.',
        ]
      }
    },
    ytTitle: 'Instagram Privacy and Safety Setup Tutorial',
  },
  'zh-CN': {
    title: 'Instagram — 安全与设置',
    lead: '私人账户、敏感内容控制、安静模式和青少年监督。',
    sections: {
      privacy: {
        h2: '隐私', pill1: '私人账户', pill2: '故事控制', pill3: '敏感内容',
        steps: [
          '个人资料 → <b>☰</b> → <b>设置与隐私</b> → <b>账户隐私</b> → <b>私人</b>。',
          '故事：设置与隐私 → <b>谁可以查看您的内容</b> → <b>故事</b> → <b>亲密朋友</b> / 对特定人物隐藏。',
          '探索/推荐等级：设置与隐私 → <b>内容偏好</b> → <b>敏感内容</b> → 选择 <b>限制更多</b>。',
          '评论/标记：设置与隐私 → <b>其他人如何互动</b> → 关闭陌生人评论/标记。',
        ],
        tip: '提示：您也可以在单条 Reels/帖子右上角 … 设置“隐藏赞数、关闭评论”。',
      },
      footprint: {
        h2: '数字足迹与个人品牌', pill1: '个人品牌', pill2: '存档',
        steps: [
          '检查个人资料：查看个人简介、头像和所有网格帖子。确保您的整体形象积极且适合未来发展。',
          '<b>存档旧帖子</b>：个人资料 → <b>☰</b> → <b>存档</b>。使用此功能可以将旧内容从公众视野中移除，但不会永久删除。',
          '<b>管理亲密朋友</b>：对 Stories 使用亲密朋友列表，将敏感、非公开的内容限制给一小群信任的朋友。',
        ]
      },
      usage: {
        h2: '使用与专注', pill1: '每日时间限制', pill2: '安静模式',
        steps: [
          '设置与隐私 → <b>您的活动</b> → <b>花费的时间</b> → <b>设置每日时间限制</b>（如 30 分钟）。',
          '设置与隐私 → <b>通知</b> → <b>安静模式</b>（设置时间段，自动静音并自动回复）。',
        ]
      },
      supervision: {
        h2: '监督 (家庭中心)', pill1: '针对青少年',
        steps: [
          '设置与隐私 → <b>监督</b>（Family Center）。家长可用自己的 Meta 账户发起邀请。',
          '家长可查看：关注/被关注变化、时间管理设置、举报提醒；家长无法读取私信内容。',
        ]
      }
    },
    ytTitle: 'Instagram 隐私与安全设置教程',
  }
};
// --- END: Localization Data for Instagram Page ---

export default function Instagram({ lang }){
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="page">
      <BackToHomeLink lang={lang} /> {/* ADDED: Back to Home Link */}
      <div className="doc instagram">
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
          <div className="tip">{s.privacy.tip}</div>
        </div>

        <div className="section">
          <h2>{s.footprint.h2}</h2>
          <span className="pill">{s.footprint.pill1}</span>
          <span className="pill">{s.footprint.pill2}</span>
          <ol className="steps">
            <li>{s.footprint.steps[0]}</li>
            <li>{s.footprint.steps[1]}</li>
            <li>{s.footprint.steps[2]}</li>
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
          <h2>{s.supervision.h2}</h2>
          <span className="pill">{s.supervision.pill1}</span>
          <ol className="steps">
            <li>{s.supervision.steps[0]}</li>
            <li>{s.supervision.steps[1]}</li>
          </ol>
        </div>

        <YouTubeVideo
          videoId="n6H3_5eGv0c" // FIXED: New working ID
          title={t.ytTitle}
          lang={lang}
        />
      </div>
    </div>
  )
}