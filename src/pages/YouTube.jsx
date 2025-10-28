import React from 'react'

export default function YouTube(){
  return (
    <div className="doc">
      <h1>YouTube — Restricted & Supervised</h1>
      <p className="lead">Restricted Mode, supervised experiences (Kids / supervised account), comments & watch history controls.</p>

      <div className="section">
        <h2>Privacy & Safety</h2>
        <span className="pill">Restricted Mode</span>
        <span className="pill">Watch/Search history</span>
        <ol className="steps">
          <li>右上角头像 → <b>Settings</b> → <b>General</b> → 开启 <b>Restricted Mode</b>（每台设备都要开）。</li>
          <li><b>History</b> → 暂停观看/搜索历史，或定期清除，减少个性化推荐。</li>
          <li>频道层面：关闭“订阅可见性”、隐藏喜欢的视频（YouTube Studio → Settings）。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Screen Time & Wellbeing</h2>
        <span className="pill">Remind me to take a break</span>
        <span className="pill">Bedtime reminder</span>
        <ol className="steps">
          <li>Settings → <b>General</b> → 打开 <b>Remind me to take a break</b>、<b>Bedtime reminder</b>。</li>
          <li>移动端还能统计观看时间：Profile → <b>Your data in YouTube</b> / <b>Time watched</b>。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Supervised Experiences</h2>
        <span className="pill">YouTube Kids</span>
        <span className="pill">Supervised Account</span>
        <ol className="steps">
          <li>年幼儿童：安装 <b>YouTube Kids</b>，家长设置内容等级与观看时间。</li>
          <li>学龄/青少年：Google Family Link 创建 <b>Supervised Account</b>，选择内容级别（Explore / Explore More / Most of YouTube），控制搜索与时长。</li>
        </ol>
      </div>
      <Video title="YouTube: Settings → Notifications" src="https://www.youtube.com/embed/ti-wvrGvnHc?si=FFpetD9uC2XPGEs6" />
      <Video title="YouTube: Settings → Time" src="https://www.youtube.com/embed/BOZNZ6z45ik?si=2L_YaxYX20ItHDEL" />

    </div>
  )
}
