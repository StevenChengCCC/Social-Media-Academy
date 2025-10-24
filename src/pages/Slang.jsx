// src/pages/Slang.jsx
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  { k: 'LOL', v: 'Laughing Out Loud：大笑' },
  { k: 'ROFL', v: 'Rolling On the Floor Laughing：笑到打滚' },
  { k: 'BRB', v: 'Be Right Back：马上回来' },
  { k: 'AFK', v: 'Away From Keyboard：暂离键盘/离开' },
  { k: 'IMO', v: 'In My Opinion：依我看' },
  { k: 'IMHO', v: 'In My Humble Opinion：拙见' },
  { k: 'TBH', v: 'To Be Honest：说实话' },
  { k: 'IDK', v: 'I Don’t Know：我不知道' },
  { k: 'IDC', v: 'I Don’t Care：无所谓' },
  { k: 'IKR', v: 'I Know, Right?：我懂你意思/对吧' },
  { k: 'FYI', v: 'For Your Information：供你参考' },
  { k: 'FWIW', v: 'For What It’s Worth：不管值不值一提' },
  { k: 'TMI', v: 'Too Much Information：信息过量/不想知道那么多' },
  { k: 'NSFW', v: 'Not Safe For Work：不适合在工作场合观看' },
  { k: 'AMA', v: 'Ask Me Anything：来问我任何问题' },
  { k: 'IRL', v: 'In Real Life：现实生活中' },
  { k: 'DM', v: 'Direct Message：私信' },
  { k: 'PM', v: 'Private Message：私信（同 DM）' },
  { k: 'OP', v: 'Original Poster/Original Post：楼主/原帖；也可指过强（Overpowered）' },
  { k: 'TL;DR', v: 'Too Long; Didn’t Read：太长不看（后面常跟总结）' },
  { k: 'LFG', v: 'Looking For Group/Let’s Freaking Go：找队/冲啊（看语境）' },
  { k: 'GG', v: 'Good Game：好游戏/打得不错（也可表示认输）' },
  { k: 'GLHF', v: 'Good Luck, Have Fun：祝好运玩得开心（赛前礼貌）' },
  { k: 'NP', v: 'No Problem：没问题/不客气' },
  { k: 'NVM', v: 'Never Mind：算了/当我没说' },
  { k: 'BTW', v: 'By The Way：顺带一提' },
  { k: 'ETA', v: 'Estimated Time of Arrival：预计到达/完成时间' },
  { k: 'ASAP', v: 'As Soon As Possible：尽快' },
  { k: 'DIY', v: 'Do It Yourself：自己动手' },
  { k: 'FOMO', v: 'Fear Of Missing Out：错失恐惧' },
  { k: 'JOMO', v: 'Joy Of Missing Out：错过的快乐' },
  { k: 'YOLO', v: 'You Only Live Once：人生只有一次（鼓励尝试）' },
  { k: 'RIP', v: 'Rest In Peace：愿安息；也可戏称“完蛋了”' },
  { k: 'SMH', v: 'Shaking My Head：无语/摇头' },
  { k: 'ICYMI', v: 'In Case You Missed It：以防你错过' },
  { k: 'OOTD', v: 'Outfit Of The Day：今日穿搭' },
  { k: 'POV', v: 'Point Of View：视角（短视频常见）' },
  { k: 'BFF', v: 'Best Friends Forever：死党/闺蜜' },
  { k: 'OTP', v: 'One True Pairing：最磕的一对（CP）' },
  { k: 'Stan', v: '痴迷粉/极力支持；动词：极力支持某人' },
  { k: 'Ship', v: '嗑 CP；动词：看好一对人物' },
  { k: 'W', v: 'Win：赢/很棒（发“W”表示赞同）' },
  { k: 'L', v: 'Loss：输/不好（发“L”表示不看好）' },
  { k: 'Cop', v: '买下/抢到（多指限量发售）' },
  { k: 'Drop', v: '新品发售/掉落；也可指“放弃”' },
  { k: 'AF', v: 'As ****：非常、超级（加强语气，谨慎使用）' },
  { k: 'Sus', v: 'Suspicious：可疑/有点怪（Among Us 带火）' },
  { k: 'Salty', v: '生闷气/酸/不爽' },
  { k: 'Low-key', v: '低调/稍微（副词：有点儿）' },
  { k: 'Ratio', v: '在 X 等平台回复量碾压原帖，表示“被打脸”' },

  // —— 新增通用英文缩写 ——
  { k: 'LMK', v: 'Let Me Know：告诉我' },
  { k: 'LMAO', v: 'Laughing My A** Off：笑疯了（口语，谨慎使用）' },
  { k: 'NGL', v: 'Not Gonna Lie：不骗你/说实话' },
  { k: 'TTYL', v: 'Talk To You Later：回头聊' },
  { k: 'HBU', v: 'How About You：你呢？' },
  { k: 'HMU', v: 'Hit Me Up：联系我' },
  { k: 'OMW', v: 'On My Way：在路上' },
  { k: 'OFC', v: 'Of Course：当然' },
  { k: 'RN', v: 'Right Now：现在' },
  { k: 'FTW', v: 'For The Win：太棒了/绝佳选择' },
  { k: 'TTYL', v: 'Talk To You Later：回头聊' },
  { k: 'TBF', v: 'To Be Fair：平心而论' },
  { k: 'TBA', v: 'To Be Announced：待公布' },
  { k: 'TBD', v: 'To Be Determined：待定' },
  { k: 'TBC', v: 'To Be Confirmed：待确认' },
  { k: 'EOD', v: 'End Of Day：工作日结束前' },
  { k: 'EOM', v: 'End Of Message：邮件标题即完整信息' },
  { k: 'ELI5', v: 'Explain Like I’m 5：当我 5 岁，简单讲' },
  { k: 'WYD', v: 'What You Doing：在干嘛' },
  { k: 'ICYDK', v: 'In Case You Didn’t Know：如果你不知道' },
  { k: 'OOMF', v: 'One Of My Followers/Friends：我某位粉/好友' },
  { k: 'FYP', v: 'For You Page：推荐页（TikTok）' },
  { k: 'SFW', v: 'Safe For Work：适合工作场合' },
  { k: 'IYKYK', v: 'If You Know, You Know：懂的都懂' },
  { k: 'GGWP', v: 'Good Game, Well Played：好游戏，打得好' },
  { k: 'NPC', v: '游戏里的“非玩家角色”；也调侃缺乏独立思考的人' },
  { k: 'RNG', v: 'Random Number Generator：随机性（拼脸）' },
  { k: 'Meta', v: '最优策略/环境主流玩法' },
  { k: 'Nerf', v: '削弱（游戏平衡）' },
  { k: 'Buff', v: '增强（游戏平衡）' },
  { k: 'Carry', v: '带飞（关键人物扛起胜负）' },
  { k: 'Clutch', v: '关键时刻力挽狂澜' },
  { k: 'Noob/Newbie', v: '新手（有时带戏谑）' },
  { k: 'Smurf', v: '用小号虐菜' },
  { k: 'VOD', v: 'Video On Demand：点播视频/录播' },
  { k: 'Clip', v: '剪辑片段' },
  { k: 'Sub', v: '订阅（Twitch/YouTube 语境）' },
  { k: 'Emote', v: '表情/表情码（直播平台）' },
  { k: 'Raid', v: '主播下播前带观众冲进另一频道' },

  // —— 社媒/平台运营 ——
  { k: 'Shadowban', v: '影子封禁：不给推流/降权但不明说' },
  { k: 'Alt', v: 'Alternate Account：小号/副账号' },
  { k: 'Lurk', v: '潜水（不发言只围观）' },
  { k: 'Ping', v: '在群里 @ 某人/延迟时间（技术）' },
  { k: '@everyone', v: 'Discord 群发提醒所有人' },
  { k: 'Mod', v: 'Moderator：版主/管理员' },
  { k: 'Ban', v: '封禁' },
  { k: 'Mute', v: '静音/禁言' },
  { k: 'TOS', v: 'Terms of Service：服务条款' },
  { k: 'DMCA', v: '版权下架通知（美国法）' },
  { k: 'Algo', v: 'Algorithm：算法（推送/推荐）' },
  { k: 'Shadow Drop', v: '“影子发售”：无预热直接发布' },
  { k: 'Soft Launch', v: '软启动/小范围上线' },

  // —— 表达情绪/评价 ——
  { k: 'Based', v: '很自信/有主见；有时指“真性情”' },
  { k: 'Cringe', v: '尴尬/羞耻' },
  { k: 'Simp', v: '过度讨好他人（多指单恋）' },
  { k: 'Wholesome', v: '治愈/正能量' },
  { k: 'Vibes', v: '气氛/感觉' },
  { k: 'Mood', v: '代入我的心情/太有共鸣了' },
  { k: 'Aesthetic', v: '美学风格（审美取向）' },

  // —— 商务/效率 ——
  { k: 'WIP', v: 'Work In Progress：进行中' },
  { k: 'ETA EOD/COB', v: '预计在当天下班前完成（End of Day/Close of Business）' },
  { k: 'FYR', v: 'For Your Reference：供你参考' },
  { k: 'KPI', v: '关键绩效指标' },
  { k: 'OKR', v: '目标与关键结果' },

  // —— 中文网络流行语 ——
  { k: '吃瓜', v: '围观事件发展' },
  { k: 'YYDS', v: '永远的神（极度赞美）' },
  { k: '绝绝子', v: '非常厉害/夸张的好' },
  { k: '破防', v: '被戳到痛点/心理防线被击破' },
  { k: '摆烂', v: '破罐子破摔/不再努力' },
  { k: '冲浪', v: '上网浏览信息/玩梗' },
  { k: '双标', v: '双重标准' },
  { k: '杠精', v: '抬杠的人' },
  { k: '工具人', v: '只被当作工具使用的人' },
  { k: '云玩家', v: '只看不玩、道听途说的玩家' },
  { k: '打工人', v: '自嘲上班族' },
  { k: '小作文', v: '情绪化、很长的文字' },
  { k: '爷青回', v: '童年回忆回来了' },
  { k: '出圈', v: '从圈内火到大众' },
  { k: '整活', v: '玩花样、搞创意' },
  { k: '上大分', v: '冲高分/上分' },
  { k: '双厨狂喜', v: '两个喜欢的元素联动' },
  { k: '拉满', v: '效果/强度拉到最高' },
  { k: '社死', v: '社会性死亡（极度尴尬）' },
  { k: '电子榨菜', v: '下饭但不走心的内容（解压伴随）' },
  { k: '破圈', v: '打破圈层界限被更大范围看到' },
  { k: '摆拍', v: '刻意设计的“自然”画面' }
]

// 建索引（大小写不敏感；支持带斜杠的多别名，例如 IMO/IMHO）
function buildLookup(list) {
  const m = new Map()
  for (const { k, v } of list) {
    // 按 / 拆分别名，如 "IMO/IMHO"
    const aliases = String(k).split('/').map(s => s.trim())
    for (const a of aliases) {
      m.set(a.toLowerCase(), v)
    }
  }
  return m
}

export default function Slang() {
  const lookup = useMemo(() => buildLookup(items), [])
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  const [asked, setAsked] = useState(false)

  const onSearch = (e) => {
    e?.preventDefault?.()
    const key = q.trim().toLowerCase()
    if (!key) {
      setAsked(true)
      setResult(null)
      return
    }
    const hit = lookup.get(key)
    setAsked(true)
    setResult(hit || null)
  }

  return (
    <div style={container}>
      <header style={row}>
        <h1 style={{ margin: 0, fontSize: 24 }}>网络用语小词典（支持搜索）</h1>
        <Link to="/" style={linkBtn}>返回首页</Link>
      </header>

      {/* 搜索框 */}
      <form onSubmit={onSearch} style={searchRow}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入缩写，如 LOL / imo / ratio ..."
          style={input}
          aria-label="搜索网络用语缩写"
        />
        <button type="submit" style={btn}>搜索</button>
      </form>

      {/* 搜索结果 */}
      {asked && (
        <div style={resultBox}>
          {result ? (
            <div><b>解释：</b>{result}</div>
          ) : (
            <div>不知道</div>
          )}
        </div>
      )}

      {/* 完整词表（照常展示） */}
      <div style={list}>
        {items.map(x => (
          <div key={x.k} style={card}>
            <div style={{ fontWeight: 700 }}>{x.k}</div>
            <div style={{ opacity: .85 }}>{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const container = { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', padding: 24, maxWidth: 980, margin: '0 auto' }
const row = { display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }
const linkBtn = { border: '1px solid #e5e7eb', padding: '10px 14px', borderRadius: 10, textDecoration: 'none', color: 'black' }

const searchRow = { display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }
const input = { flex: '1 1 260px', minWidth: 200, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 10, outline: 'none' }
const btn = { padding: '10px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }
const resultBox = { marginBottom: 16, padding: 12, border: '1px solid #e5e7eb', borderRadius: 10, background: '#fafafa' }

const list = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }
const card = { border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff', padding: 12 }
