import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Discord() {
  const [showImages, setShowImages] = useState(false)
  return (
    <div style={container}>
      <header style={row}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Discord 教程（加入服务器 · 频道 · 语音与安全）</h1>
        <div>
          <Link to="/" style={linkBtn}>返回首页</Link>
          <button onClick={() => setShowImages(v => !v)} style={btnSecondary}>
            {showImages ? '隐藏图解' : '看不懂？看图解'}
          </button>
        </div>
      </header>

      <section style={card}>
        <ul style={{ marginTop: 0 }}>
          <li><b>注册与登录：</b>下载 Discord 应用或用网页，注册账号并验证邮箱。</li>
          <li><b>加入服务器：</b>点击左侧“+”→ Join a Server → 输入邀请链接。</li>
          <li><b>频道与角色：</b>熟悉 #text 文本频道、🔊 语音频道；阅读 <i>#rules</i>，选择/申请角色。</li>
          <li><b>语音设置：</b>Settings → Voice & Video → 选择麦克风/耳机，开启噪声抑制与按键说话（Push-to-Talk）可选。</li>
          <li><b>安全与隐私：</b>Settings → Privacy & Safety → 打开“安全过滤”；关闭陌生人私信；启用 2FA 双重验证。</li>
        </ul>
        {showImages && (
          <div style={diagramBox}>
            <div style={{ padding: 12, textAlign: 'center' }}>流程图占位（后续替换为真机截图）</div>
          </div>
        )}
      </section>
    </div>
  )
}

const container = { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', padding: 24, maxWidth: 980, margin: '0 auto' }
const row = { display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }
const btnSecondary = { background: 'white', color: 'black', border: '1px solid #e5e7eb', padding: '10px 14px', borderRadius: 10, cursor: 'pointer', marginLeft: 8 }
const linkBtn = { border: '1px solid #e5e7eb', padding: '10px 14px', borderRadius: 10, textDecoration: 'none', color: 'black', marginRight: 8 }
const card = { background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:16 }
const diagramBox = { border: '1px dashed #d1d5db', borderRadius: 12, background: 'white', marginTop: 12 }
