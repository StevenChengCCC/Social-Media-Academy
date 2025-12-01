import React, { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import { listContributions, listUserAnalytics } from '../graphql/queries'
import { updateContribution, createSlangTerm } from '../graphql/mutations'
import { BackToHomeLink } from '../App.jsx'


export default function AdminDashboard({ lang }) {
  const client = generateClient()
  const [isAdmin, setIsAdmin] = useState(false)
  const [requests, setRequests] = useState([])
  const [analyticsData, setAnalyticsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('requests') // 'requests' or 'analytics'

  useEffect(() => {
    checkAdmin()
  }, [])

  useEffect(() => {
    if (isAdmin && view === 'analytics') {
      fetchAnalytics();
    }
  }, [isAdmin, view])

  // ✅ 核心修复：检查用户组权限 (Admins)
  async function checkAdmin() {
    try {
      const session = await fetchAuthSession();
      const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];

      if (groups.includes('Admins')) {
        setIsAdmin(true);
        fetchRequests();
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.error("Admin check failed:", e);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRequests() {
    try {
      const req = await client.graphql({
        query: listContributions,
        variables: { filter: { status: { eq: "PENDING" } } }
      })
      setRequests(req.data.listContributions.items)
    } catch (e) {
      console.log("Fetch requests error", e)
    }
  }

  async function fetchAnalytics() {
    try {
      const res = await client.graphql({
        query: listUserAnalytics,
        variables: { limit: 100 }
      });
      setAnalyticsData(res.data.listUserAnalytics.items);
    } catch (e) {
      console.error("Fetch analytics error", e);
    }
  }

  const handleApprove = async (item) => {
    try {
      if (item.type === 'ADD' || item.type === 'EDIT') {
        await client.graphql({
          query: createSlangTerm,
          variables: {
            input: {
              term: item.term,
              meaning: item.proposedMeaning,
              category: 'STANDARD',
            }
          }
        })
      }
      await client.graphql({
        query: updateContribution,
        variables: { input: { id: item.id, status: 'APPROVED' } }
      })
      fetchRequests()
      alert("已通过并添加至词典！")
    } catch (e) {
      alert("操作失败: " + e.message)
    }
  }

  const handleReject = async (id) => {
    await client.graphql({
      query: updateContribution,
      variables: { input: { id, status: 'REJECTED' } }
    })
    fetchRequests()
  }

  if (loading) return <div className="page"><p style={{textAlign:'center', marginTop: 100}}>Loading...</p></div>
  if (!isAdmin) return <div className="page"><p style={{textAlign:'center', marginTop: 100}}>Access Denied. You must be an Admin to view this page.</p></div>

  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc">
        <h1>🛡️ 管理员后台</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn" onClick={() => setView('requests')} style={{opacity: view==='requests'?1:0.5}}>审核请求</button>
          <button className="btn" onClick={() => setView('analytics')} style={{opacity: view==='analytics'?1:0.5}}>用户数据分析</button>
        </div>

        {view === 'requests' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <p>待审核的用户贡献 ({requests.length})</p>
            {requests.map(req => (
              <div key={req.id} className="section" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`pill`}>{req.type}</span>
                  <span style={{ fontSize: 12, opacity: 0.6 }}>User: {req.owner}</span>
                </div>
                <h3 style={{ margin: '8px 0' }}>{req.term}</h3>
                <p><strong>建议释义:</strong> {req.proposedMeaning || '(无)'}</p>
                <p><strong>用户备注:</strong> {req.note || '(无)'}</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button className="btn" style={{ borderColor: '#10b981', color: '#10b981' }} onClick={() => handleApprove(req)}>
                    ✅ 通过并发布
                  </button>
                  <button className="btn" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleReject(req.id)}>
                    ❌ 拒绝
                  </button>
                </div>
              </div>
            ))}
            {requests.length === 0 && <p style={{ opacity: 0.5 }}>暂无待审核请求。</p>}
          </div>
        )}

        {view === 'analytics' && (
          <div>
            <h2>📊 用户行为数据 (最新 100 条)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <th style={{padding:8, textAlign:'left'}}>用户 ID</th>
                    <th style={{padding:8, textAlign:'left'}}>类型</th>
                    <th style={{padding:8, textAlign:'left'}}>页面</th>
                    <th style={{padding:8, textAlign:'right'}}>时长(秒)</th>
                    <th style={{padding:8, textAlign:'right'}}>点击数</th>
                    <th style={{padding:8, textAlign:'right'}}>时间</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{padding:8, fontFamily:'monospace', fontSize:12}}>
                        {item.userId.substring(0, 8)}...
                      </td>
                      <td style={{padding:8}}>
                        {item.isAnonymous ? <span style={{color:'#aaa'}}>匿名</span> : <span style={{color:'#4ade80'}}>登录用户</span>}
                      </td>
                      <td style={{padding:8}}>{item.page}</td>
                      <td style={{padding:8, textAlign:'right'}}>{item.durationSeconds}s</td>
                      <td style={{padding:8, textAlign:'right'}}>{item.clickCount}</td>
                      <td style={{padding:8, textAlign:'right', fontSize:12}}>
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}