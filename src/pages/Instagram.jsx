import React from 'react'

export default function Instagram(){
  return (
    <div className="doc">
      <h1>Instagram — Safety & Setup</h1>
      <p className="lead">Private accounts, Sensitive Content Control, Quiet Mode, and Supervision for teens.</p>

      <div className="section">
        <h2>Privacy</h2>
        <span className="pill">Private account</span>
        <span className="pill">Story controls</span>
        <span className="pill">Sensitive content</span>
        <ol className="steps">
          <li>Profile → <b>☰</b> → <b>Settings and privacy</b> → <b>Account privacy</b> → <b>Private</b>.</li>
          <li>Story: Settings and privacy → <b>Who can see your content</b> → <b>Story</b> → <b>Close Friends</b> / hide from specific people.</li>
          <li>Explore/Recommendations等级：Settings and privacy → <b>Content preferences</b> → <b>Sensitive content</b> → 选择 <b>Limit even more</b>.</li>
          <li>Comments/Tags：Settings and privacy → <b>How others can interact</b> → 关闭陌生人评论/标记。</li>
        </ol>
        <div className="tip">Tip: 也可在单条 Reels/帖子右上角 … 设置“隐藏赞数、关闭评论”。</div>
      </div>

      <div className="section">
        <h2>Usage & Focus</h2>
        <span className="pill">Daily time limit</span>
        <span className="pill">Quiet Mode</span>
        <ol className="steps">
          <li>Settings and privacy → <b>Your activity</b> → <b>Time spent</b> → <b>Set daily time limit</b>（如 30min）。</li>
          <li>Settings and privacy → <b>Notifications</b> → <b>Quiet Mode</b>（设置时间段，自动静音并自动回复）。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Supervision (Family Center)</h2>
        <span className="pill">For teens</span>
        <ol className="steps">
          <li>Settings and privacy → <b>Supervision</b>（Family Center）。家长用自己的 Meta 账户发起邀请。</li>
          <li>可查看：关注/被关注变化、时间管理设置、举报提醒；家长无法读取私信内容。</li>
        </ol>
      </div>
    </div>
  )
}
