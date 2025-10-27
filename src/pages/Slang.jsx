import React, { useMemo, useState } from 'react'

/**
 * Slang Dictionary
 * - Normal terms first (A–Z), then sensitive terms (A–Z)
 * - Sensitive terms are hidden by default with a strong warning; click to reveal
 * - Search (case-insensitive). If found, show meaning; otherwise say "Unknown term".
 */

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

const SENSITIVE_TERMS = [
  // strong profanity/sexual/drug/self-harm coded items
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

export default function Slang(){
  const [query, setQuery] = useState('')
  const [revealed, setRevealed] = useState(() => new Set()) // terms revealed by the user

  const sorted = useMemo(() => {
    const norm = [...NORMAL_TERMS].sort((a,b)=>a.term.localeCompare(b.term))
    const sens = [...SENSITIVE_TERMS].sort((a,b)=>a.term.localeCompare(b.term))
    return { norm, sens }
  }, [])

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

  return (
    <div className="doc">
      <h1>Slang Dictionary</h1>
      <p className="lead">
        Meanings online can shift by culture, age group, community, and even gendered contexts. A word that sounds
        playful to one group may feel rude or explicit to another, and some acronyms carry completely different
        meanings across platforms or countries.
      </p>
      <p className="lead">
        Use the search box below to look up unfamiliar slang quickly. Common terms are listed first (A–Z).
        Sensitive or mature terms are placed at the end and hidden by default—click to reveal only if you’re comfortable.
      </p>


      {/* Search */}
      <div className="slang-search">
        <input
          className="slang-input"
          placeholder="Search a term (e.g., GOAT, NSFW, 420)…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <div className="slang-result">
          {query.trim() ? (
            hit ? (
              isSensitive(hit) ? (
                <SensitiveRow item={hit} revealed={revealed.has(hit.term)} onReveal={()=>reveal(hit.term)} />
              ) : (
                <Row item={hit} />
              )
            ) : (
              <i>Unknown term.</i>
            )
          ) : <i>Type to search a specific term.</i>}
        </div>
      </div>

      {/* Normal list */}
      <div className="section">
        <h2>Common Slang (A–Z)</h2>
        <ul className="slang-list">
          {sorted.norm.map((item)=>(
            <li key={item.term}><Row item={item} /></li>
          ))}
        </ul>
      </div>

      {/* Sensitive list */}
      <div className="section">
        <h2 className="danger-title">Sensitive / Mature Slang (click to reveal)</h2>
        <div className="danger-note">
          ⚠️ Contains sexual, abusive, drug-related, or self-harm references. Content may be disturbing.
        </div>
        <ul className="slang-list">
          {sorted.sens.map((item)=>(
            <li key={item.term}>
              <SensitiveRow
                item={item}
                revealed={revealed.has(item.term)}
                onReveal={()=>reveal(item.term)}
              />
            </li>
          ))}
        </ul>
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

function SensitiveRow({ item, revealed, onReveal }) {
  if (revealed) return <Row item={item} />
  return (
    <div className="slang-row">
      <b className="slang-term">{item.term}</b>
      <span className="slang-meaning masked">
        <span className="mask-warning">
          Hidden due to sensitive content.
          <button className="reveal-btn" onClick={onReveal}>I understand — reveal</button>
        </span>
      </span>
    </div>
  )
}
