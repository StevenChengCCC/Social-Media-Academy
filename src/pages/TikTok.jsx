import React from 'react'

export default function TikTok(){
  return (
    <div className="doc">
      <h1>TikTok — Safety & Family Pairing</h1>
      <p className="lead">Private account, comment/DM filters, Screen Time limits, Restricted Mode, and Family Pairing.</p>

      <div className="section">
        <h2>Privacy</h2>
        <span className="pill">Private account</span>
        <span className="pill">Comments & DMs</span>
        <span className="pill">Downloads/Duets</span>
        <ol className="steps">
          <li>Profile → <b>≡</b> → <b>Settings and privacy</b> → <b>Privacy</b> → 打开 <b>Private account</b>.</li>
          <li><b>Comments</b>：Privacy → Comments → 仅关注/仅好友或关闭；开启关键词过滤。</li>
          <li><b>Direct messages</b>：Privacy → Direct messages → 设为 <b>Friends</b> 或 <b>No one</b>.</li>
          <li>关闭视频下载、限制 <b>Duet</b>/<b>Stitch</b> 范围：Privacy → Downloads / Duet & Stitch。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Screen Time</h2>
        <span className="pill">Daily limit</span>
        <span className="pill">Break reminders</span>
        <span className="pill">Restricted Mode</span>
        <ol className="steps">
          <li>Settings and privacy → <b>Screen time</b> → <b>Daily screen time</b> 设置分钟数（可按星期定制）。</li>
          <li>开启 <b>Screen time breaks</b>（定时休息提醒）。</li>
          <li><b>Restricted Mode</b>：限制更成熟内容，需要 PIN。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Family Pairing</h2>
        <span className="pill">Parent–teen link</span>
        <ol className="steps">
          <li>Settings and privacy → <b>Family Pairing</b> → 扫码绑定家长账号。</li>
          <li>可远程管理：屏幕时间、受限模式、私信权限、搜索与建议、可见度等。</li>
        </ol>
      </div>
    </div>
  )
}
