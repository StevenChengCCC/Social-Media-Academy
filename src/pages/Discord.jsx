import React from 'react'

export default function Discord(){
  return (
    <div className="doc">
      <h1>Discord — Privacy & Family Center</h1>
      <p className="lead">DM scanning, friend request safety, server privacy, and Family Center supervision for teens.</p>

      <div className="section">
        <h2>Privacy & Safety</h2>
        <span className="pill">DM scan</span>
        <span className="pill">Friend requests</span>
        <span className="pill">Server privacy</span>
        <ol className="steps">
          <li>User Settings → <b>Privacy & Safety</b> → 打开 <b>Keep me safe</b>（扫描私信）。</li>
          <li><b>Who can send you a friend request</b>：仅 <b>Friends of friends</b> 或关闭 Everyone。</li>
          <li>服务器 → Server Settings → <b>Moderation</b>：开启年龄/手机验证等级、反垃圾。</li>
          <li>关闭“允许来自服务器成员的DM”（Server Privacy Settings）。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Time & Distraction</h2>
        <span className="pill">Do Not Disturb</span>
        <span className="pill">Mute channels</span>
        <ol className="steps">
          <li>状态设为 <b>Do Not Disturb</b>；右击频道/分类 → <b>Mute</b> for X hours / until I turn it back on。</li>
          <li>移动端可结合 iOS/Android 的“屏幕使用时间/数字健康”限制 Discord 总时长。</li>
        </ol>
      </div>

      <div className="section">
        <h2>Family Center (Teens)</h2>
        <span className="pill">Activity view</span>
        <ol className="steps">
          <li>User Settings → <b>Family Center</b>：家长与青少年互相同意后绑定。</li>
          <li>家长可看到：加了哪些服务器、加了谁为好友、共用时间段；<b>看不到</b>消息内容。</li>
        </ol>
      </div>
      <div className="section">
        <h2>Videos</h2>
        <Video
            title="Discord: Only Allow DMs From Friends (2025)"
            src="https://www.youtube.com/embed/vQq5qA5X-oA"
            />
        </div>

    </div>
  )
}