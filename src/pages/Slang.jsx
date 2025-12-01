import React, { useMemo, useState } from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'

/**
 * Slang Dictionary
 */

// --- START: Localization Data for Slang Page ---
const locales = {
  'en': {
    title: 'Slang Dictionary',
    lead1: 'Meanings online can shift by culture, age group, community, and even gendered contexts. A word that sounds playful to one group may feel rude or explicit to another, and some acronyms carry completely different meanings across platforms or countries.',
    lead2: 'Use the search box below to look up unfamiliar slang quickly. Common terms are listed first (A–Z). Sensitive or mature terms are placed at the end and hidden by default—click to reveal only if you’re comfortable.',
    searchPlaceholder: 'Search a term (e.g., GOAT, NSFW, 420, YYDS)…',
    unknownTerm: 'Unknown term.',
    typeToSearch: 'Type to search a specific term.',
    commonH2: 'Common Slang (A–Z) & Chinese Slang',
    sensitiveH2: 'Sensitive / Mature Slang (click to reveal)',
    dangerNote: '⚠️ Contains sexual, abusive, drug-related, or self-harm references. Content may be disturbing.',
    maskWarning: 'Hidden due to sensitive content.',
    revealBtn: 'I understand — reveal',
    cnSlangH2: 'Chinese Internet Slang (中文网络俚语)',
    cnSlangLead: 'Chinese internet slang is often derived from Pinyin initials or specific cultural memes. We list some popular terms here for context.',
    ytTitles: {
      decoded: 'Teen Slang Guide for Parents',
    },
    // --- New Form Locales ---
    submitH2: 'Contribute to the Dictionary',
    submitLead: 'Know a slang term we missed? Submit it below for review. Once approved by an admin, it will appear in the list.',
    inputTerm: 'Slang Term (e.g., Riz)',
    inputMeaning: 'Meaning / Context',
    submitBtn: 'Submit for Review',
    submitSuccess: 'Thanks! Your term has been submitted for moderation.',
    fillError: 'Please fill in both fields.'
  },
  'zh-CN': {
    title: '俚语词典',
    lead1: '网络俚语的含义会随着文化、年龄段、社区甚至性别语境而变化。对一个群体来说听起来好玩的词，对另一个群体来说可能感觉粗鲁或露骨。有些缩写在不同平台或国家/地区也可能具有完全不同的含义。',
    lead2: '使用下方的搜索框快速查找不熟悉的俚语。常见词汇按字母顺序排列在前（A–Z）。敏感或成人内容词汇放在末尾，默认隐藏——请在您感到舒适的情况下点击以显示。',
    searchPlaceholder: '搜索词汇 (例如：GOAT, NSFW, 420, YYDS)…',
    unknownTerm: '未知词汇。',
    typeToSearch: '输入以搜索特定词汇。',
    commonH2: '常见俚语 (A–Z) 与中文俚语',
    sensitiveH2: '敏感 / 成人俚语 (点击显示)',
    dangerNote: '⚠️ 包含性、辱骂、毒品或自残相关内容。内容可能令人不安。',
    maskWarning: '因敏感内容被隐藏。',
    revealBtn: '我理解 — 显示',
    cnSlangH2: '中文网络俚语',
    cnSlangLead: '中文网络俚语通常来源于拼音首字母或特定的文化梗。我们在此列出一些热门词汇以供参考。',
    ytTitles: {
      decoded: '青少年短信暗语解读',
    },
    // --- New Form Locales ---
    submitH2: '贡献词条',
    submitLead: '知道我们遗漏的俚语吗？在下方提交以供审核。管理员批准后，它将出现在列表中。',
    inputTerm: '俚语词汇 (例如：Rizz)',
    inputMeaning: '含义 / 语境',
    submitBtn: '提交审核',
    submitSuccess: '谢谢！您的词条已提交，等待审核。',
    fillError: '请填写两个字段。'
  }
};
// --- END: Localization Data for Slang Page ---

const NORMAL_TERMS = [
  { term: 'AFK', meaning: 'Away from keyboard.' },
  { term: 'BFF', meaning: 'Best friends forever.' },
  { term: 'Boujee', meaning: 'Acting rich or high-class; fancy.' },
  { term: 'BRB', meaning: 'Be right back.' },
  { term: 'Bruh', meaning: "Casual 'bro'; an expression of disbelief." },
  { term: 'BTW', meaning: 'By the way.' },
  { term: 'Dead', meaning: 'Hilarious; “I’m dead” from laughing.' },
  { term: 'Deets', meaning: 'Details; more information.' },
  { term: 'Dope', meaning: 'Awesome; high quality.' },
  { term: 'DWBH', meaning: 'Don’t worry, be happy.' },
  { term: 'Extra', meaning: 'Overly dramatic or doing too much.' },
  { term: 'Fam', meaning: 'Close friends or family.' },
  { term: 'Fire', meaning: 'Cool; amazing.' },
  { term: 'FOMO', meaning: 'Fear of missing out.' },
  { term: 'GOAT', meaning: 'Greatest of all time.' },
  { term: 'Gucci', meaning: 'Good; going well; cool.' },
  { term: 'Hundo', meaning: 'One hundred percent; absolutely.' },
  { term: 'IRL', meaning: 'In real life.' },
  { term: 'LMAO', meaning: 'Laughing my ass off.' },
  { term: 'Lit', meaning: 'Exciting or excellent.' },
  { term: 'Mood', meaning: 'Relatable feeling or vibe.' },
  { term: 'MYOB', meaning: 'Mind your own business.' },
  { term: 'NGL', meaning: 'Not gonna lie.' },
  { term: 'Noob', meaning: 'Novice; new or bad at something.' },
  { term: 'OG', meaning: 'Original; classic; the first.' },
  { term: 'OMG', meaning: 'Oh my god / gosh.' },
  { term: 'Salty', meaning: 'Annoyed or bitter.' },
  { term: 'Shook', meaning: 'Shocked or strongly affected.' },
  { term: 'Skurt', meaning: 'Leave quickly; bounce.' },
  { term: 'SKSKSKSK', meaning: 'Excitement; often playful spam.' },
  { term: 'Slay', meaning: 'Do something exceptionally well.' },
  { term: 'Snatched', meaning: 'Looking great; on point.' },
  { term: 'Sus', meaning: 'Suspicious; sketchy.' },
  { term: 'Tea', meaning: 'Gossip; news. “Spill the tea.”' },
  { term: 'TBH', meaning: 'To be honest.' },
  { term: 'WDYM', meaning: 'What do you mean?' },
  { term: 'Woke', meaning: 'Socially aware (politics/race/gender contexts).' },
  { term: 'Yeet', meaning: 'Throw / exclaim with energy.' },
  { term: 'YOLO', meaning: 'You only live once (often ironically).' },
];

const CN_SLANG = [
  { term: 'YYDS (永远的神)', meaning: 'An acronym meaning "Forever God." Used to express extreme admiration or praise for something or someone.' },
  { term: '绝绝子 (Juejuezi)', meaning: 'Used to express something is "super awesome" or "absolutely amazing." A highly popular, often exaggerated, expression of praise.' },
  { term: '破防 (Pofang)', meaning: 'Literally "break defense." Means to be emotionally overwhelmed or deeply touched, often unexpectedly, by something positive or negative.' },
  { term: '打工人 (Dagongren)', meaning: 'Literally "worker." A self-deprecating term used by young white-collar workers to describe themselves as modern laborers, emphasizing the stress of work.' },
  { term: 'emo', meaning: 'Borrowing from the English word "emo," but in Chinese slang, it means suddenly feeling deeply sad, depressed, or moody.' },
];

const SENSITIVE_TERMS = [
  { term: 'AF', meaning: 'As f*ck; strong emphasis.', sensitive: true },
  { term: 'Addy', meaning: "Adderall; ADHD medication sometimes misused.", sensitive: true },
  { term: 'ASL', meaning: 'Age / sex / location (often used by strangers).', sensitive: true },
  { term: 'Bae', meaning: 'Significant other (slang).', sensitive: true },
  { term: 'Basic', meaning: 'Unoriginal; conformist (can be insulting).', sensitive: true },
  { term: 'BF/GF', meaning: 'Boyfriend / Girlfriend.', sensitive: true },
  { term: 'Cap / No cap', meaning: 'Lie / Not a lie.', sensitive: true },
  { term: 'Catfishing', meaning: 'Pretending to be someone else online.', sensitive: true },
  { term: 'CD9', meaning: '“Code 9”: parents nearby.', sensitive: true },
  { term: 'CU46', meaning: '“See you for sex.”', sensitive: true },
  { term: 'D', meaning: 'Dick (vulgar).', sensitive: true },
  { term: 'Down in the DMs', meaning: 'Private messages, often flirting/hookups.', sensitive: true },
  { term: 'DTF', meaning: 'Down to f*ck (explicit).', sensitive: true },
  { term: 'Finsta', meaning: 'Fake/secondary Instagram account.', sensitive: true },
  { term: 'Flaming', meaning: 'Sending abusive or obscene messages.', sensitive: true },
  { term: 'FWB', meaning: 'Friends with benefits.', sensitive: true },
  { term: 'GFY', meaning: 'Go f*ck yourself (abusive).', sensitive: true },
  { term: 'Ghost', meaning: 'Cut contact / ignore on purpose.', sensitive: true },
  { term: 'GNOC', meaning: 'Get naked on cam (explicit).', sensitive: true },
  { term: 'GYPO', meaning: 'Get your pants off (explicit).', sensitive: true },
  { term: 'IWSN', meaning: 'I want sex now (explicit).', sensitive: true },
  { term: 'KMS', meaning: 'Kill myself (self-harm).', sensitive: true },
  { term: 'KPC', meaning: 'Keep parents clueless.', sensitive: true },
  { term: 'KYS', meaning: 'Kill yourself (abusive / self-harm).', sensitive: true },
  { term: 'LMIRL', meaning: 'Let’s meet in real life (safety risk).', sensitive: true },
  { term: 'Netflix and chill', meaning: 'Implied hookup while “watching.”', sensitive: true },
  { term: 'NIFOC', meaning: 'Naked in front of computer (explicit).', sensitive: true },
  { term: 'NP4NP', meaning: 'Nude pic for nude pic (explicit).', sensitive: true },
  { term: 'NSFW', meaning: 'Not safe for work (mature content).', sensitive: true },
  { term: 'OC (open crib)', meaning: 'Parents not home (risk cue).', sensitive: true },
  { term: 'PAW / PRW', meaning: 'Parents are watching / in room.', sensitive: true },
  { term: 'PIR', meaning: 'Parents in room.', sensitive: true },
  { term: 'POS', meaning: 'Parents over shoulder.', sensitive: true },
  { term: 'Pron', meaning: '“Porn” spelled to bypass filters.', sensitive: true },
  { term: 'P911', meaning: 'Parents watching; be careful.', sensitive: true },
  { term: 'Ship', meaning: 'Support a relationship (fandom slang).', sensitive: true },
  { term: 'Smash', meaning: 'Have casual sex (slang).', sensitive: true },
  { term: 'Snack', meaning: 'Attractive person (objectifying).', sensitive: true },
  { term: 'TDTM', meaning: 'Talk dirty to me (explicit).', sensitive: true },
  { term: 'Thicc', meaning: 'Curvy/sexualized compliment.', sensitive: true },
  { term: 'Thirsty', meaning: 'Attention/validation seeking (often sexual).', sensitive: true },
  { term: 'Throw shade', meaning: 'Subtle insult / dig at someone.', sensitive: true },
  { term: 'WAP', meaning: 'Explicit sexual slang (song title).', sensitive: true },
  { term: 'WTTP', meaning: 'Want to trade pictures (often sexual).', sensitive: true },
  { term: 'X', meaning: 'Ecstasy (drug).', sensitive: true },
  { term: 'Xan', meaning: 'Xanax (misuse/abuse context).', sensitive: true },
  { term: '53x', meaning: 'Leetspeak for “sex.”', sensitive: true },
  { term: '8', meaning: 'Oral sex (coded).', sensitive: true },
  { term: '9', meaning: 'A parent is watching (coded).', sensitive: true },
  { term: '420', meaning: 'Marijuana.', sensitive: true },
];

function normalize(s) { return s.toLowerCase().trim() }

// Modified Component Signature to accept customList and onSubmitTerm
export default function Slang({ lang, customList = [], onSubmitTerm }){
  const t = locales[lang];
  const [query, setQuery] = useState('')
  const [revealed, setRevealed] = useState(() => new Set())

  // Form State
  const [newTerm, setNewTerm] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'

  const sorted = useMemo(() => {
    // Merge static terms with approved custom terms
    const combinedNormal = [...NORMAL_TERMS, ...CN_SLANG, ...customList]
      .sort((a,b)=>a.term.localeCompare(b.term))

    const sens = [...SENSITIVE_TERMS].sort((a,b)=>a.term.localeCompare(b.term))
    return { norm: combinedNormal, sens }
  }, [customList]) // dependency updated

  const allTerms = useMemo(() => [...sorted.norm, ...sorted.sens], [sorted])
  const map = useMemo(() => {
    const m = new Map()
    for (const item of allTerms) m.set(normalize(item.term), item)
    return m
  }, [allTerms])

  const hit = useMemo(() => {
    if (!query.trim()) return null
    return map.get(normalize(query)) || null
  }, [query, map])

  const isSensitive = (t) => !!t.sensitive

  const reveal = (term) => {
    const next = new Set(revealed); next.add(term); setRevealed(next)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newMeaning.trim()) {
      setSubmitStatus('error');
      return;
    }
    // Call the function passed from App.jsx
    if (onSubmitTerm) {
      onSubmitTerm(newTerm, newMeaning);
      setNewTerm('');
      setNewMeaning('');
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  }

  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc slang">
        <h1>{t.title}</h1>
        <p className="lead">{t.lead1}</p>
        <p className="lead">{t.lead2}</p>

        <div className="slang-search">
          <input
            className="slang-input"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
          <div className="slang-result">
            {query.trim() ? (
              hit ? (
                isSensitive(hit) ? (
                  <SensitiveRow item={hit} revealed={revealed.has(hit.term)} onReveal={()=>reveal(hit.term)} lang={lang} />
                ) : (
                  <Row item={hit} />
                )
              ) : (
                <i>{t.unknownTerm}</i>
              )
            ) : <i>{t.typeToSearch}</i>}
          </div>
        </div>

        <div className="section">
          <h2>{t.commonH2}</h2>
          <ul className="slang-list">
            {sorted.norm.map((item)=>(
              <li key={item.term + item.meaning}><Row item={item} /></li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2 className="danger-title">{t.sensitiveH2}</h2>
          <div className="danger-note">
            {t.dangerNote}
          </div>
          <ul className="slang-list">
            {sorted.sens.map((item)=>(
              <li key={item.term}>
                <SensitiveRow
                  item={item}
                  revealed={revealed.has(item.term)}
                  onReveal={()=>reveal(item.term)}
                  lang={lang}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>{t.cnSlangH2}</h2>
          <p className="tip">{t.cnSlangLead}</p>
        </div>

        {/* --- Submission Form Section --- */}
        <div className="section submit-section" style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2>{t.submitH2}</h2>
          <p>{t.submitLead}</p>
          <form onSubmit={handleFormSubmit} className="slang-form">
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
              <input
                className="slang-input"
                style={{ width: '100%' }}
                placeholder={t.inputTerm}
                value={newTerm}
                onChange={e => setNewTerm(e.target.value)}
              />
              <input
                className="slang-input"
                style={{ width: '100%' }}
                placeholder={t.inputMeaning}
                value={newMeaning}
                onChange={e => setNewMeaning(e.target.value)}
              />
            </div>
            <button type="submit" className="reveal-btn" style={{ padding: '0.6rem 1.2rem' }}>{t.submitBtn}</button>
            {submitStatus === 'success' && <p style={{ color: 'green', marginTop: '0.5rem' }}>{t.submitSuccess}</p>}
            {submitStatus === 'error' && <p style={{ color: 'red', marginTop: '0.5rem' }}>{t.fillError}</p>}
          </form>
        </div>

        <YouTubeVideo videoId="8_I2sg8Z7Yk" title={t.ytTitles.decoded} lang={lang} />
      </div>
    </div>
  )
}

function Row({ item }) {
  return (
    <div className="slang-row">
      <b className="slang-term">{item.term}</b>
      <span className="slang-meaning">{item.meaning}</span>
    </div>
  )
}

function SensitiveRow({ item, revealed, onReveal, lang }) {
  const t = locales[lang];
  if (revealed) return <Row item={item} />
  return (
    <div className="slang-row">
      <b className="slang-term">{item.term}</b>
      <span className="slang-meaning masked">
        <span className="mask-warning">
          {t.maskWarning}
          <button className="reveal-btn" onClick={onReveal}>{t.revealBtn}</button>
        </span>
      </span>
    </div>
  )
}