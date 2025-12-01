import React, { useMemo, useState, useEffect } from 'react'
import { YouTubeVideo, BackToHomeLink } from '../App.jsx'
import { generateClient } from 'aws-amplify/api'
import { createContribution } from '../graphql/mutations'
import { listContributions, listSlangTerms } from '../graphql/queries'
import { usePageTracking } from '../hooks/usePageTracking' // 导入 Hook

const client = generateClient();

// ... Locales 数据保持不变 (为了节省篇幅，此处省略 Locales 变量，请保留您原文件中的定义) ...
// 请务必保留原文件中的 const locales = { ... } 和 const NORMAL_TERMS = [...], const SENSITIVE_TERMS = [...] 等定义

// 排行榜组件
function Leaderboard({ lang }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    try {
      const result = await client.graphql({
        query: listContributions,
        variables: { filter: { status: { eq: "APPROVED" } }, limit: 1000 },
        authMode: 'API_KEY'
      });
      const items = result.data.listContributions.items;
      const counts = {};
      items.forEach(item => {
        const user = item.owner || 'Anonymous';
        counts[user] = (counts[user] || 0) + 1;
      });
      const sorted = Object.entries(counts)
        .map(([user, count]) => ({ user, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      setLeaders(sorted);
    } catch (e) {
      console.error("Leaderboard error", e);
    }
  }

  const title = lang === 'en' ? '🏆 Top Contributors' : '🏆 贡献排行榜';
  const userLabel = lang === 'en' ? 'User' : '用户';
  const countLabel = lang === 'en' ? 'Terms Approved' : '通过词条数';

  if (leaders.length === 0) return null;

  return (
    <div className="section" style={{ borderColor: '#ffd700', background: 'rgba(255, 215, 0, 0.1)', marginTop: '20px' }}>
      <h2 style={{ color: '#ffd700' }}>{title}</h2>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <th style={{ padding: '8px' }}>#</th>
            <th style={{ padding: '8px' }}>{userLabel}</th>
            <th style={{ padding: '8px', textAlign: 'right' }}>{countLabel}</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, index) => (
            <tr key={l.user} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>{l.user}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{l.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Slang({ lang }){
  usePageTracking('Slang'); // 开启追踪

  const t = locales[lang];
  const [query, setQuery] = useState('')
  const [revealed, setRevealed] = useState(() => new Set())
  const [dbTerms, setDbTerms] = useState([])

  // Form State
  const [newTerm, setNewTerm] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [submitStatus, setSubmitStatus] = useState(null)

  // Fetch approved terms from DB
  useEffect(() => {
    fetchDbTerms();
  }, []);

  async function fetchDbTerms() {
    try {
      const res = await client.graphql({
        query: listSlangTerms,
        authMode: 'API_KEY'
      });
      setDbTerms(res.data.listSlangTerms.items);
    } catch (e) {
      console.log('Error fetching terms', e);
    }
  }

  const sorted = useMemo(() => {
    // Merge static terms with DB terms
    const combinedNormal = [...NORMAL_TERMS, ...CN_SLANG, ...dbTerms]
      .sort((a,b)=>a.term.localeCompare(b.term))

    const sens = [...SENSITIVE_TERMS].sort((a,b)=>a.term.localeCompare(b.term))
    return { norm: combinedNormal, sens }
  }, [dbTerms])

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newMeaning.trim()) {
      setSubmitStatus('error');
      return;
    }

    try {
      await client.graphql({
        query: createContribution,
        variables: {
          input: {
            type: 'ADD',
            term: newTerm,
            proposedMeaning: newMeaning,
            status: 'PENDING'
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS' // 假设提交需要登录，或者如果允许匿名提交改为 API_KEY
      });
      setNewTerm('');
      setNewMeaning('');
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      console.error(err);
      alert('提交失败，请先登录');
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

        {/* 排行榜 */}
        <Leaderboard lang={lang} />

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

function normalize(s) { return s.toLowerCase().trim() }

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