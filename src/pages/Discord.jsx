import React from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'
import { usePageTracking } from '../hooks/usePageTracking'

const locales = {
  'en': {
    title: 'Discord — Privacy & Family Center',
    lead: 'DM scanning, friend request safety, server privacy, and Family Center supervision for teens.',
    sections: {
      privacy: {
        h2: 'Privacy & Safety', pill1: 'DM scan', pill2: 'Friend requests', pill3: 'Server privacy',
        steps: [
          'User Settings → Privacy & Safety → Turn on Keep me safe (scans DMs).',
          'Who can send you a friend request: Only Friends of friends or turn off Everyone.',
          'Server → Server Settings → Moderation: Enable age/phone verification level, anti-spam.',
          'Turn off "Allow direct messages from server members" (Server Privacy Settings).',
        ]
      },
      security: {
        h2: 'Security & Server Management', pill1: 'Two-Factor Auth (2FA)', pill2: 'Role Management',
        steps: [
          'Enable 2FA: User Settings → My Account → Enable Two-Factor Auth. This greatly protects your account from unauthorized logins.',
          'Server Role Permissions: In your server, carefully assign roles and limit dangerous permissions (like Kick/Ban, Manage Webhooks, or Administrator) only to trusted Moderators.',
          'Anti-Raid Setup: For public servers, enable higher Verification Levels (e.g., must have a phone verified account) to deter spam and raids.',
        ]
      },
      time: {
        h2: 'Time & Distraction', pill1: 'Do Not Disturb', pill2: 'Mute channels',
        steps: [
          'Set status to Do Not Disturb; Right-click channel/category → Mute for X hours / until I turn it back on.',
          'Mobile usage can be limited via iOS/Android\'s "Screen Time / Digital Wellbeing" to restrict total Discord usage.',
        ]
      },
      family: {
        h2: 'Family Center (Teens)', pill1: 'Activity view',
        steps: [
          'User Settings → Family Center: Parent and teen link after mutual consent.',
          'Parent can see: which servers were joined, who was added as a friend, shared time usage; cannot see message content.',
        ]
      }
    },
    ytTitles: {
      family: 'How to Use Discord Family Center With Your Teens',
    }
  },
  'zh-CN': {
    title: 'Discord — 隐私与家庭中心',
    lead: '私信扫描、好友请求安全、服务器隐私和针对青少年的家庭中心监督。',
    sections: {
      privacy: {
        h2: '隐私与安全', pill1: '私信扫描', pill2: '好友请求', pill3: '服务器隐私',
        steps: [
          '用户设置 → 隐私与安全 → 打开 保护我安全（扫描私信）。',
          '谁可以向您发送好友请求：仅 朋友的朋友 或关闭 所有人。',
          '服务器 → 服务器设置 → 审核：开启年龄/手机验证等级、反垃圾。',
          '关闭“允许来自服务器成员的私信”（服务器隐私设置）。',
        ]
      },
      security: {
        h2: '安全与服务器管理', pill1: '双重认证 (2FA)', pill2: '角色管理',
        steps: [
          '启用 2FA：用户设置 → 我的账户 → 启用双重认证。这能极大保护您的账户免受未经授权的登录。',
          '服务器角色权限：在您的服务器中，谨慎分配角色，并将危险权限（如踢出/封禁、管理 Webhook 或管理员）仅限于信任的版主。',
          '防突袭设置：对于公共服务器，启用更高的验证级别（例如，必须有手机验证账户）以阻止垃圾信息和突袭。',
        ]
      },
      time: {
        h2: '时间与专注', pill1: '请勿打扰', pill2: '频道静音',
        steps: [
          '状态设为 请勿打扰；右击频道/分类 → 静音 X 小时 / 直到我重新开启。',
          '移动端可结合 iOS/Android 的“屏幕使用时间/数字健康”限制 Discord 总时长。',
        ]
      },
      family: {
        h2: '家庭中心 (青少年)', pill1: '活动视图',
        steps: [
          '用户设置 → 家庭中心：家长与青少年互相同意后绑定。',
          '家长可看到：加了哪些服务器、加了谁为好友、共用时间段；看不到消息内容。',
        ]
      }
    },
    ytTitles: {
      family: 'Discord 家长控制设置（家庭中心与私信扫描）',
    }
  }
};

export default function Discord({ lang }){
    usePageTracking('Discord');
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc discord">
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
          <h2>{s.security.h2}</h2>
          <span className="pill">{s.security.pill1}</span>
          <span className="pill">{s.security.pill2}</span>
          <ol className="steps">
            <li>{s.security.steps[0]}</li>
            <li>{s.security.steps[1]}</li>
            <li>{s.security.steps[2]}</li>
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
          <h2>{s.family.h2}</h2>
          <span className="pill">{s.family.pill1}</span>
          <ol className="steps">
            <li>{s.family.steps[0]}</li>
            <li>{s.family.steps[1]}</li>
          </ol>
        </div>

        <YouTubeVideo videoId="jfY3BxsUyvc" title={t.ytTitles.family} lang={lang} />
      </div>
    </div>
  )
}