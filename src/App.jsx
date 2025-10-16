import React, { useState } from 'react'

const lessons = [
  {
    id: 'ig',
    platform: 'Instagram',
    title: '创建账号并设置双重验证',
    steps: [
      { t: '在应用商店搜索 Instagram，安装并注册。', imgText: '打开商店 → 搜索 Instagram → 安装 → 注册' },
      { t: '填写邮箱/手机并设置强密码（≥12位，含大小写与数字）。', imgText: '邮箱/手机号 + 强密码(≥12)' },
      { t: '设置 → Security → Two‑Factor Authentication（短信或验证器）。', imgText: 'Settings → Security → 2FA' }
    ]
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    title: '隐私与家长监护(青少年)设置',
    steps: [
      { t: 'Profile → 菜单 → Settings and privacy。', imgText: 'Profile → Menu → Settings & privacy' },
      { t: 'Privacy 中设为私密账号并限制陌生人评论/私信。', imgText: 'Privacy: Private + Restrict DMs/Comments' },
      { t: '开启 Family Pairing，设置使用时长和内容过滤。', imgText: 'Family Pairing: Screen Time + Filter' }
    ]
  },
  {
    id: 'x',
    platform: 'X (Twitter)',
    title: '登录安全与可见性',
    steps: [
      { t: 'Settings → Security → 2FA（App 验证优先）。', imgText: 'Settings → Security → 2FA (App)' },
      { t: 'Privacy and safety → Audience（Everyone/Followers）。', imgText: 'Privacy: Audience' }
    ]
  }
]

export default function App() {
  const [expanded, setExpanded] = useState(null)
  const [showImages, setShowImages] = useState(false)

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', padding: 24, maxWidth: 980, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Social Media Academy</h1>
          <p style={{ margin: '4px 0', opacity: .7 }}>文字优先教学 · 看不懂再看图解</p>
        </div>
        <button onClick={() => setShowImages(v => !v)} style={btnSecondary}>
          {showImages ? '隐藏图解' : '看不懂？看图解'}
        </button>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {lessons.map(lesson => (
          <div key={lesson.id} style={card}>
            <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 18 }}>{lesson.title}</h3>
              <div style={{ fontSize: 12, opacity: .7 }}>{lesson.platform}</div>
            </div>

            <div style={{ padding: 16 }}>
              <button
                style={btnPrimary}
                onClick={() => setExpanded(expanded === lesson.id ? null : lesson.id)}
              >
                {expanded === lesson.id ? '收起步骤' : '查看步骤'}
              </button>

              {expanded === lesson.id && (
                <div style={{ marginTop: 12 }}>
                  {lesson.steps.map((s, i) => (
                    <div key={i} style={stepBox}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>步骤 {i + 1}</div>
                      <div style={{ marginBottom: 8 }}>{s.t}</div>
                      {showImages && (
                        <div style={diagramBox}>
                          <div style={{ padding: 12, textAlign: 'center' }}>{s.imgText}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>统一集成（未来可接各平台 API）</h2>
        <p style={{ marginTop: 0, opacity: .8 }}>此处将来用于绑定 Instagram / TikTok / X / YouTube 等账号，做统一操作与教学。</p>
      </section>
    </div>
  )
}

const card = {
  border: '1px solid #e5e7eb',
  borderRadius: 14,
  overflow: 'hidden',
  background: '#fff',
  boxShadow: '0 1px 2px rgba(0,0,0,.04)'
}

const btnPrimary = {
  background: 'black',
  color: 'white',
  border: 'none',
  padding: '10px 14px',
  borderRadius: 10,
  cursor: 'pointer'
}

const btnSecondary = {
  background: 'white',
  color: 'black',
  border: '1px solid #e5e7eb',
  padding: '10px 14px',
  borderRadius: 10,
  cursor: 'pointer'
}

const stepBox = {
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
  background: '#fafafa'
}

const diagramBox = {
  border: '1px dashed #d1d5db',
  borderRadius: 12,
  background: 'white'
}