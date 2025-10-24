import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Instagram() {
  const [showImages, setShowImages] = useState(false)
  return (
    <div style={container}>
      <header style={row}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Instagram 教程（入门）</h1>
        <div>
          <Link to="/" style={linkBtn}>返回首页</Link>
          <button onClick={() => setShowImages(v => !v)} style={btnSecondary}>
            {showImages ? '隐藏图解' : '看不懂？看图解'}
          </button>
        </div>
      </header>

      <section style={card}>
        <ul style={{ marginTop: 0 }}>
          <li><b>注册：</b>在商店搜索 Instagram，安装并注册账号</li>
          <li><b>强密码：</b>设置 ≥12 位强密码，含大小写与数字</li>
          <li><b>两步验证：</b>设置 → Security → Two-Factor Authentication（App 验证优先）</li>
        </ul>
        {showImages && (
          <div style={diagramBox}><div style={{ padding: 12, textAlign: 'center' }}>流程图占位（后续替换为真机截图）</div></div>
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
