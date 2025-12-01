import React from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'
import { usePageTracking } from '../hooks/usePageTracking'

const locales = {
  'en': {
    title: 'Facebook — Privacy Checkup & Marketplace',
    lead: 'Privacy Checkup, audience selector, profile locking, face recognition off, and “Your Time on Facebook”.',
    sections: {
      privacy: {
        h2: 'Privacy',
        pill1: 'Privacy Checkup', pill2: 'Audience selector', pill3: 'Profile Lock',
        steps: [
          'Menu → Settings & privacy → Privacy Checkup: Review item by item who can see your information, login security, and data permissions.',
          'Post box select Audience (Friends/Only me/Custom), default to Friends.',
          'Profile three dots → Lock profile, restrict non-friends from viewing historical content and high-resolution photos.',
          'Settings → Face recognition → Off.',
        ]
      },
      marketplace: {
        h2: 'Marketplace Safety',
        pill1: 'In-person safety', pill2: 'Payment Scams',
        steps: [
          'Meet in Public: Always meet buyers/sellers in a public place (e.g., police station parking lot, busy cafe). Never meet at your home.',
          'Inspect and Pay Securely: Inspect the item thoroughly. Use secure, traceable payment methods (e.g., PayPal Goods and Services, bank transfer in person). Avoid peer-to-peer apps like Venmo or cash for expensive items.',
          'Report Suspicion: Report buyers or sellers who insist on using unusual payment methods, press for personal information, or seem overly aggressive.',
        ]
      },
      time: {
        h2: 'Time & Notifications',
        pill1: 'Your Time on Facebook', pill2: 'Quiet Mode',
        steps: [
          'Settings & privacy → Your time on Facebook: View usage time, set reminders; enable Quiet Mode to mute notifications.',
          'Turn off unnecessary push notifications in notification categories to reduce distraction.',
        ]
      },
      teens: {
        h2: 'Teens & Families',
        pill1: 'Supervision (Meta)',
        steps: [
          'Teens are recommended to use Meta Family Center (shares framework with Instagram). Facebook\'s own parental functions are limited, focus is on audience scope, friend approval, and time management.',
        ]
      }
    },
    ytTitle: 'How To Make Privacy On Facebook (2025 Tutorial)',
  },
  'zh-CN': {
    title: '脸书 (Facebook) — 隐私检查与市场安全',
    lead: '隐私检查、受众选择、资料锁定、面部识别关闭和“你在 Facebook 上的时间”。',
    sections: {
      privacy: {
        h2: '隐私',
        pill1: '隐私检查', pill2: '受众选择器', pill3: '资料锁定',
        steps: [
          '菜单 → 设置与隐私 → 隐私检查：逐项检查谁能看到您的信息、登录安全和数据权限。',
          '发帖框选择 受众（朋友/仅自己/自定义），默认设为朋友。',
          '个人主页三点 → 锁定个人资料，限制非好友查看历史内容与高清大图。',
          '设置 → 面部识别 → 关闭。',
        ]
      },
      marketplace: {
        h2: 'Marketplace 市场交易安全',
        pill1: '当面交易安全', pill2: '支付诈骗',
        steps: [
          '公共场所会面：务必在公共场所（如警察局停车场、繁忙咖啡馆）与买家/卖家会面。切勿在您家中会面。',
          '检查并安全支付：彻底检查物品。使用安全、可追踪的支付方式（例如 PayPal 交易服务、当面银行转账）。避免使用 Venmo 等点对点应用或现金进行昂贵交易。',
          '可疑举报：举报那些坚持使用不寻常支付方式、索要个人信息过多或态度过于咄咄逼人的买家或卖家。',
        ]
      },
      time: {
        h2: '时间与通知',
        pill1: '你在 Facebook 上的时间', pill2: '安静模式',
        steps: [
          '设置与隐私 → 你在 Facebook 上的时间：查看时长、设置提醒；开启 安静模式 静音通知。',
          '通知分类里关闭不必要推送，减少打扰。',
        ]
      },
      teens: {
        h2: '青少年与家庭',
        pill1: '监督 (Meta)',
        steps: [
          '青少年建议使用 Meta Family Center（与 Instagram 共享框架）。Facebook 自身家长功能有限，重点放在受众范围、好友批准与时间管理。',
        ]
      }
    },
    ytTitle: 'Facebook 隐私检查和安全设置教程',
  }
};


export default function Facebook({ lang }){
    usePageTracking('Facebook');
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc facebook">
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
          <h2>{s.marketplace.h2}</h2>
          <span className="pill">{s.marketplace.pill1}</span>
          <span className="pill">{s.marketplace.pill2}</span>
          <ol className="steps">
            <li>{s.marketplace.steps[0]}</li>
            <li>{s.marketplace.steps[1]}</li>
            <li>{s.marketplace.steps[2]}</li>
          </ol>
        </div>

        <div className="section">
          <h2>{s.time.h2}</h2>
          <span className="pill">{s.time.pill1}</span>
          <span className="pill">{s.time.pill2}</span>
          <ol className="steps">
            <li>{s.time.steps[0]}</li>
            <li>{s.time.steps[1]}</li>
          </ol>
        </div>

        <div className="section">
          <h2>{s.teens.h2}</h2>
          <span className="pill">{s.teens.pill1}</span>
          <ol className="steps">
            <li>{s.teens.steps[0]}</li>
          </ol>
        </div>

        <YouTubeVideo
          videoId="QeuUjV8MlAs"
          title={t.ytTitle}
          lang={lang}
        />
      </div>
    </div>
  )
}