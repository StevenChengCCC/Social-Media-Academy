// src/pages/Slang.jsx
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * 说明：
 * - itemsRaw：汇总所有词条（含你提供的清单），用 key 不区分大小写去重
 * - 每个词可选字段：
 *    sensitive: true           // 需要点击确认后才显示释义
 *    category: 'explicit' | 'drugs' | 'safety' // 用于提示不同类型的敏感度
 */

const itemsRaw = [
  // —— 原有常用 & 你提供的新增（安全） ——
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
  { k: 'GLHF', v: 'Good Luck, Have Fun：祝好运玩得开心' },
  { k: 'NP', v: 'No Problem：没问题/不客气' },
  { k: 'NVM', v: 'Never Mind：算了/当我没说' },
  { k: 'BTW', v: 'By The Way：顺便一提' },
  { k: 'ETA', v: 'Estimated Time of Arrival：预计到达/完成时间' },
  { k: 'ASAP', v: 'As Soon As Possible：尽快' },
  { k: 'DIY', v: 'Do It Yourself：自己动手' },
  { k: 'FOMO', v: 'Fear Of Missing Out：错失恐惧' },
  { k: 'JOMO', v: 'Joy Of Missing Out：错过的快乐' },
  { k: 'YOLO', v: 'You Only Live Once：人生只有一次（常带讽刺/自嘲）' },
  { k: 'RIP', v: 'Rest In Peace：愿安息；也可戏称“完蛋了”' },
  { k: 'SMH', v: 'Shaking My Head：无语/摇头' },
  { k: 'ICYMI', v: 'In Case You Missed It：以防你错过' },
  { k: 'OOTD', v: 'Outfit Of The Day：今日穿搭' },
  { k: 'POV', v: 'Point Of View：视角（短视频常见）' },
  { k: 'BFF', v: 'Best Friends Forever：永远的好朋友' },
  { k: 'OTP', v: 'One True Pairing：最磕的一对（CP）' },
  { k: 'Stan', v: '痴迷粉/极力支持；动词：极力支持某人' },
  { k: 'Ship', v: '嗑 CP；动词：看好一对人物' },
  { k: 'W', v: 'Win：赢/很棒（发“W”表示赞同）' },
  { k: 'L', v: 'Loss：输/不好（发“L”表示不看好）' },
  { k: 'Cop', v: '买下/抢到（多指限量）' },
  { k: 'Drop', v: '新品发售/掉落；也可指“放弃”' },
  { k: 'Sus', v: 'Suspicious：可疑/有点怪' },
  { k: 'Salty', v: '生闷气/酸/不爽' },
  { k: 'Low-key', v: '低调/稍微（副词：有点儿）' },
  { k: 'Dead', v: '太好笑了/笑死（夸张说法）' },
  { k: 'Deets', v: '详情（details）' },
  { k: 'Dope', v: '很棒/高质量' },
  { k: 'DWBH', v: 'Don’t Worry, Be Happy：别担心，开心点' },
  { k: 'Extra', v: '夸张/戏很多' },
  { k: 'Fam', v: '朋友/家人/自己人' },
  { k: 'Fire', v: '超酷/很赞' },
  { k: 'GOAT', v: 'Greatest Of All Time：史上最佳' },
  { k: 'Gucci', v: '挺好/顺利/很酷' },
  { k: 'Hundo', v: '100%（十分肯定）' },
  { k: 'Lit', v: '很嗨/很棒' },
  { k: 'Mood', v: '太有共鸣了/我的心情写照' },
  { k: 'MYOB', v: 'Mind Your Own Business：管好你自己' },
  { k: 'OG', v: 'Original：最早的/元老；也引申“老派很酷”' },
  { k: 'OMG', v: 'Oh My God/Oh My Gosh：天哪' },
  { k: 'Tea', v: '八卦/内幕（spill the tea：爆料）' },
  { k: 'Shook', v: '被震撼/被影响很大' },
  { k: 'Skurt', v: '溜走/撤了' },
  { k: 'SKSKSKSK', v: '（网络拟声）表示激动/兴奋' },
  { k: 'Slay', v: '表现超强/状态拉满' },
  { k: 'Snatched', v: '很能打/状态好（造型很在线）' },
  { k: 'Yeet', v: '兴奋/赞同/用力丢（语气词）' },
  { k: 'WDYM', v: 'What Do You Mean：你啥意思' },
  { k: 'Woke', v: '对社会议题很敏感/觉醒（语境可褒可贬）' },

  // —— 英文通用补充 ——
  { k: 'LMK', v: 'Let Me Know：告诉我' },
  { k: 'LMAO', v: 'Laughing My A** Off：笑疯了', sensitive: true, category: 'explicit' },
  { k: 'NGL', v: 'Not Gonna Lie：不骗你/实话实说' },
  { k: 'TTYL', v: 'Talk To You Later：回头聊' },
  { k: 'HBU', v: 'How About You：你呢？' },
  { k: 'HMU', v: 'Hit Me Up：联系我' },
  { k: 'OMW', v: 'On My Way：在路上' },
  { k: 'OFC', v: 'Of Course：当然' },
  { k: 'RN', v: 'Right Now：现在' },
  { k: 'FTW', v: 'For The Win：太棒了/绝佳选择' },
  { k: 'TBF', v: 'To Be Fair：平心而论' },
  { k: 'TBA', v: 'To Be Announced：待公布' },
  { k: 'TBD', v: 'To Be Determined：待定' },
  { k: 'TBC', v: 'To Be Confirmed：待确认' },
  { k: 'EOD', v: 'End Of Day：工作日结束前' },
  { k: 'EOM', v: 'End Of Message：标题即完整信息' },
  { k: 'ELI5', v: 'Explain Like I’m 5：像对 5 岁解释那样说明' },
  { k: 'WYD', v: 'What You Doing：在干嘛' },
  { k: 'ICYDK', v: 'In Case You Didn’t Know：如果你不知道' },
  { k: 'OOMF', v: 'One Of My Followers/Friends：我某位粉/好友' },
  { k: 'FYP', v: 'For You Page：推荐页（TikTok）' },
  { k: 'SFW', v: 'Safe For Work：适合工作场合' },
  { k: 'IYKYK', v: 'If You Know, You Know：懂的都懂' },
  { k: 'GGWP', v: 'Good Game, Well Played：好游戏，打得好' },

  // —— 游戏/直播相关 ——
  { k: 'Noob', v: '新手（有时带戏谑）' },
  { k: 'NPC', v: '游戏里的“非玩家角色”；也调侃缺乏独立思考的人' },
  { k: 'RNG', v: '随机性（看脸）' },
  { k: 'Meta', v: '最优策略/主流打法' },
  { k: 'Nerf', v: '削弱（平衡）' },
  { k: 'Buff', v: '增强（平衡）' },
  { k: 'Carry', v: '带飞（关键人物扛起胜负）' },
  { k: 'Clutch', v: '关键时刻力挽狂澜' },
  { k: 'Smurf', v: '用小号虐菜' },
  { k: 'VOD', v: '录播/点播视频' },
  { k: 'Clip', v: '剪辑片段' },
  { k: 'Sub', v: '订阅（Twitch/YouTube）' },
  { k: 'Emote', v: '表情/表情码（直播平台）' },
  { k: 'Raid', v: '主播带观众冲进另一频道' },

  // —— 平台运营/社交安全 ——
  { k: 'Shadowban', v: '影子封禁：不给推流/降权但不明说' },
  { k: 'Alt', v: 'Alternate Account：小号/副账号' },
  { k: 'Lurk', v: '潜水（不发言只围观）' },
  { k: 'Ping', v: '在群里 @ 某人/或指网络延迟' },
  { k: '@everyone', v: 'Discord 群发提醒所有人' },
  { k: 'Mod', v: 'Moderator：版主/管理员' },
  { k: 'Ban', v: '封禁' },
  { k: 'Mute', v: '静音/禁言' },
  { k: 'TOS', v: '服务条款（Terms of Service）' },
  { k: 'DMCA', v: '版权下架通知（美国法）' },
  { k: 'Algo', v: '推荐算法（Algorithm）' },
  { k: 'Finsta', v: 'Fake Instagram：小号/分身' },
  { k: 'Catfishing', v: '用虚假身份骗感情/钱财的行为', sensitive: true, category: 'safety' },
  { k: 'Ghost', v: '故意不回/消失' },
  { k: 'Flaming', v: '网络辱骂/攻击', sensitive: true, category: 'safety' },
  { k: 'Throw shade', v: '挖苦/阴阳怪气', sensitive: true, category: 'safety' },

  // —— 可能含成年/脏话/约会暗示（点击后显示） ——
  { k: 'AF', v: 'As ****：非常、超级（脏话加强语气）', sensitive: true, category: 'explicit' },
  { k: 'Boujee', v: '显摆富有/装富（或写作 bouji）' },
  { k: 'Bruh', v: '兄弟/无语的语气词' },
  { k: 'Bae', v: '对象/另一半（baby 或 before anyone else）' },
  { k: 'Basic', v: '平庸/跟风' },
  { k: 'BF', v: 'Boyfriend：男朋友' },
  { k: 'GF', v: 'Girlfriend：女朋友' },
  { k: 'Cap', v: '谎话（No cap = 不是吹/我没骗你）' },
  { k: 'Down in the DM', v: '私信里聊暧昧/勾搭', sensitive: true, category: 'explicit' },
  { k: 'DTF', v: '愿意发生性关系（直白表达）', sensitive: true, category: 'explicit' },
  { k: 'FWB', v: '炮友关系（朋友加性关系）', sensitive: true, category: 'explicit' },
  { k: 'Netflix n chill', v: '名义看电影，实际约会/亲密', sensitive: true, category: 'explicit' },
  { k: 'Smash', v: '发生性行为（口语）', sensitive: true, category: 'explicit' },
  { k: 'Snack', v: '很有吸引力的人（“好看”）' },
  { k: 'Thicc', v: '身材有曲线/丰满' },
  { k: 'Thirsty', v: '很渴/很想要关注或亲密', sensitive: true, category: 'explicit' },
  { k: 'GFY', v: '脏话辱骂（Go f*** yourself）', sensitive: true, category: 'explicit' },
  { k: 'WTF', v: 'What the f***（脏话）', sensitive: true, category: 'explicit' },
  { k: 'WDYM', v: 'What Do You Mean：你啥意思' },

  // —— 药物/毒品（点击后显示） ——
  { k: '420', v: '大麻（marijuana）的代称', sensitive: true, category: 'drugs' },
  { k: 'X', v: '摇头丸（MDMA/ecstasy）的俗称', sensitive: true, category: 'drugs' },
  { k: 'Xan', v: 'Xanax（阿普唑仑，镇静药），有滥用风险', sensitive: true, category: 'drugs' },
  { k: 'Addy', v: 'Adderall（多动症处方药），有被滥用风险', sensitive: true, category: 'drugs' },

  // —— 家长在场/线下见面等安全暗示（点击后显示） ——
  { k: 'ASL', v: 'age/sex/location：年龄/性别/位置（陌生人套近乎）', sensitive: true, category: 'safety' },
  { k: 'CD9', v: 'Code 9：父母在附近（青少年提示码）', sensitive: true, category: 'safety' },
  { k: 'CU46', v: 'See you for sex：见面发生性行为的暗示', sensitive: true, category: 'explicit' },
  { k: 'LMIRL', v: 'Let’s Meet In Real Life：线下见面（需注意安全）', sensitive: true, category: 'safety' },
  { k: 'OC', v: 'Open Crib：家里没人/父母不在（风险提示）', sensitive: true, category: 'safety' },
  { k: 'PAW', v: 'Parents Are Watching：父母正在看', sensitive: true, category: 'safety' },
  { k: 'PRW', v: 'Parents Are Watching（同上）', sensitive: true, category: 'safety' },
  { k: 'PIR', v: 'Parent In Room：父母在房间', sensitive: true, category: 'safety' },
  { k: 'POS', v: 'Parent Over Shoulder：父母在旁边', sensitive: true, category: 'safety' },
  { k: 'P911', v: '父母在看（与“911”组合的提示码）', sensitive: true, category: 'safety' },
  { k: 'NP4NP', v: 'nude pic for nude pic：以裸照换裸照', sensitive: true, category: 'explicit' },
  { k: 'GNOC', v: 'Get Naked On Cam：在镜头前脱衣', sensitive: true, category: 'explicit' },
  { k: 'GYPO', v: 'Get Your Pants Off：把裤子脱了', sensitive: true, category: 'explicit' },
  { k: 'NIFOC', v: 'Naked In Front Of Computer：在电脑前裸露', sensitive: true, category: 'explicit' },
  { k: 'WTTP', v: 'Want To Trade Pictures：想互换照片（可能涉敏）', sensitive: true, category: 'explicit' },
  { k: 'Pron', v: '“Porn”的变体写法（为绕过拦截）', sensitive: true, category: 'explicit' },

  // —— 中文网络流行语（安全） ——
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
  { k: '摆拍', v: '刻意设计的“自然”画面' },
]

// —— 去重：key 忽略大小写 —— //
const items = Array.from(
  itemsRaw.reduce((map, it) => {
    const key = String(it.k).toLowerCase()
    if (!map.has(key)) map.set(key, it)
    return map
  }, new Map()).values()
).sort((a, b) => a.k.localeCompare(b.k))

// 构建查找表（别名也可以放在 k 用斜杠分开，此处简化为单 key）
function buildLookup(list) {
  const m = new Map()
  for (const { k, v, sensitive, category } of list) {
    m.set(String(k).toLowerCase(), { v, sensitive: !!sensitive, category: category || null })
  }
  return m
}

export default function Slang() {
  const lookup = useMemo(() => buildLookup(items), [])
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  const [asked, setAsked] = useState(false)
  const [revealed, setRevealed] = useState(false) // 搜索命中敏感词时的显隐

  const onSearch = (e) => {
    e?.preventDefault?.()
    const key = q.trim().toLowerCase()
    if (!key) { setAsked(true); setResult(null); setRevealed(false); return }
    const hit = lookup.get(key) || null
    setAsked(true)
    setRevealed(false)
    setResult(hit)
  }

  return (
    <div style={container}>
      <header style={row}>
        <h1 style={{ margin: 0, fontSize: 24 }}>网络用语小词典（支持搜索 / 敏感词点击查看）</h1>
        <Link to="/" style={linkBtn}>返回首页</Link>
      </header>

      {/* 搜索框 */}
      <form onSubmit={onSearch} style={searchRow}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入缩写或词语，如 LOL / boujee / 420 ..."
          style={input}
          aria-label="搜索网络用语缩写"
        />
        <button type="submit" style={btn}>搜索</button>
      </form>

      {/* 搜索结果 */}
      {asked && (
        <div style={resultBox}>
          {result ? (
            result.sensitive && !revealed ? (
              <SensitiveGate category={result.category} onReveal={() => setRevealed(true)} />
            ) : (
              <div><b>解释：</b>{result.v}</div>
            )
          ) : (
            <div>不知道</div>
          )}
        </div>
      )}

      {/* 自伤/自杀等高风险提醒（不逐条列出暗语或话题，避免引导性信息） */}
      <div style={safetyBox}>
        <b>重要提示：</b>出于安全考虑，本页面<strong>不展示</strong>涉及自伤/自杀的具体暗语或话题标签。
        如果你或你认识的人正在经历这类想法，请寻求帮助。
        在美国可拨打/短信 <b>988</b>（Suicide & Crisis Lifeline），或联系当地紧急服务；
        如果不在美国，请联系所在国家/地区的危机干预热线。
      </div>

      {/* 词表 */}
      <div style={list}>
        {items.map(x => (
          <TermCard key={x.k} item={x} />
        ))}
      </div>
    </div>
  )
}

function SensitiveGate({ category, onReveal }) {
  const label =
    category === 'drugs' ? '此词条涉及药物/毒品相关内容'
    : category === 'explicit' ? '此词条包含不当或成年向内容'
    : '此词条涉及可能引发风险或不当行为的内容'
  return (
    <div style={gate}>
      <div style={{ marginBottom: 8 }}>
        ⚠️ <b>注意：</b>{label}。点击“我已知晓，继续查看”以显示释义。
      </div>
      <button style={btn} onClick={onReveal}>我已知晓，继续查看</button>
    </div>
  )
}

function TermCard({ item }) {
  const [open, setOpen] = useState(!item.sensitive)
  return (
    <div style={card}>
      <div style={{ fontWeight: 700 }}>{item.k}</div>
      {!item.sensitive ? (
        <div style={{ opacity: .85 }}>{item.v}</div>
      ) : open ? (
        <div style={{ opacity: .85 }}>{item.v}</div>
      ) : (
        <div>
          <div style={{ marginBottom: 8 }}>
            ⚠️ <b>注意：</b>
            {item.category === 'drugs' && '此词条涉及药物/毒品相关内容。'}
            {item.category === 'explicit' && '此词条包含不当或成年向内容。'}
            {item.category === 'safety' && '此词条与线上安全/隐私风险有关。'}
          </div>
          <button style={btn} onClick={() => setOpen(true)}>我已知晓，点击查看释义</button>
        </div>
      )}
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

const safetyBox = { marginBottom: 16, padding: 12, border: '1px solid #fee2e2', borderRadius: 10, background: '#fff1f2', color: '#991b1b' }

const list = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }
const card = { border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff', padding: 12 }
const gate = { padding: 12, border: '1px dashed #f59e0b', background: '#fffbeb', borderRadius: 10 }
