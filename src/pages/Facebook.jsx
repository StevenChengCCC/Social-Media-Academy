import React from 'react'

export default function Facebook(){
  return (
    <div className="doc">
      <h1>Facebook — Privacy Checkup</h1>
      <p className="lead">Privacy Checkup, audience selector, profile locking, face recognition off, and “Your Time on Facebook”.</p>

      <div className="section">
        <h2>Privacy</h2>
        <span className="pill">Privacy Checkup</span>
        <span className="pill">Audience selector</span>
        <span className="pill">Profile Lock</span>
        <ol className="steps">
          <li>Menu → <b>Settings & privacy</b> → <b>Privacy Checkup</b>：逐项检查谁能看到信息、登录安全、数据权限。</li>
          <li>发帖框选择 <b>Audience</b>（Friends/Only me/Custom），默认设为 Friends。</li>
          <li>个人主页三点 → <b>Lock profile</b>，限制非好友查看历史内容与高清大图。</li>
          <li>Settings → <b>Face recognition</b> → <b>Off</b>。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Time & Notifications</h2>
        <span className="pill">Your Time on Facebook</span>
        <span className="pill">Quiet Mode</span>
        <ol className="steps">
          <li>Settings & privacy → <b>Your time on Facebook</b>：查看时长、设置提醒；开启 <b>Quiet Mode</b> 静音通知。</li>
          <li>通知分类里关闭不必要推送，减少打扰。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Teens & Families</h2>
        <span className="pill">Supervision (Meta)</span>
        <ol className="steps">
          <li>青少年建议使用 Meta Family Center（与 Instagram 共享框架）。Facebook 自身家长功能有限，重点放在受众范围、好友批准与时间管理。</li>
        </ol>
      </div>

      <div className="section">
          <h2>Videos</h2>
          <Video
            title="Facebook: Privacy Settings / Privacy Checkup (2025)"
            src="https://www.youtube.com/embed/_9LcxMKWIE4"
          />
      </div>

    </div>
  )
}
