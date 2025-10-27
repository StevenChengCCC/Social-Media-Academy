import React from 'react'

export default function LinkedIn(){
  return (
    <div className="doc">
      <h1>LinkedIn — Career-Safe Setup</h1>
      <p className="lead">Control your public profile, search visibility, data sharing, and notification hygiene.</p>

      <div className="section">
        <h2>Privacy</h2>
        <span className="pill">Public profile</span>
        <span className="pill">Profile viewing options</span>
        <span className="pill">Email/Phone visibility</span>
        <ol className="steps">
          <li>Me → <b>Settings & Privacy</b> → <b>Visibility</b> → <b>Edit your public profile</b>：关闭不必要模块（生日、活动等）。</li>
          <li><b>Profile viewing options</b>：求职阶段可先设为 <b>Private</b> 浏览；发布内容时再切回公开。</li>
          <li><b>Who can see your email/phone</b>：设为 <b>Only you</b> 或 <b>1st-degree</b>。</li>
          <li>关闭 <b>Share profile updates</b> 避免频繁改动简历打扰网络。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Usage & Focus</h2>
        <span className="pill">Notifications hygiene</span>
        <span className="pill">Feed tuning</span>
        <ol className="steps">
          <li>Settings → <b>Communications</b>：只保留“Direct messages / Job alerts / Network”核心通知，其他一律 Off。</li>
          <li>动态里对低质量帖子点 <b>Hide / I don’t want to see this</b>；对高质量创作者点 <b>Follow</b>，净化信息流。</li>
        </ol>
      </div>

      <div className="section">
        <h2>For Teens/Students</h2>
        <span className="pill">Visibility for minors</span>
        <ol className="steps">
          <li>未成年人账户默认限制更严：搜索可见性降低、消息权限收紧。建议保持封面简洁、头像职业化，仅公开必要信息。</li>
        </ol>
      </div>
    </div>
  )
}
