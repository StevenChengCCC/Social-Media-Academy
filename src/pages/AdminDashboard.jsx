import React, { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import { listContributions } from '../graphql/queries' // Amplify自动生成
import { updateContribution, createSlangTerm } from '../graphql/mutations' // Amplify自动生成
import { BackToHomeLink } from '../App.jsx'

const client = generateClient()

export default function AdminDashboard({ lang }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    try {
      const user = await getCurrentUser()
      // 这里简单判断，实际上建议检查 session token 里的 groups claim
      // 暂时假设能进入这个页面且能拉取数据就是 admin（因为 GraphQL 规则限制了）
      fetchRequests()
      setIsAdmin(true)
    } catch (e) {
      console.error(e)
    }
  }

  async function fetchRequests() {
    try {
      // 获取所有 PENDING 的请求
      const req = await client.graphql({
        query: listContributions,
        variables: { filter: { status: { eq: "PENDING" } } }
      })
      setRequests(req.data.listContributions.items)
    } catch (e) {
      console.log("Fetch error", e)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (item) => {
    try {
      // 1. 如果是添加新词，直接写入字典库
      if (item.type === 'ADD' || item.type === 'EDIT') {
        await client.graphql({
          query: createSlangTerm,
          variables: {
            input: {
              term: item.term,
              meaning: item.proposedMeaning,
              category: 'STANDARD', // 默认归类，后续可手动改
            }
          }
        })
      }

      // 2. 更新请求状态为 Approved
      await client.graphql({
        query: updateContribution,
        variables: { input: { id: item.id, status: 'APPROVED' } }
      })

      // 3. 刷新列表
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

  if (!isAdmin && !loading) return <div className="page"><p style={{textAlign:'center', marginTop: 100}}>Access Denied.</p></div>

  return (
    <div className="page">
      <BackToHomeLink lang={lang} />
      <div className="doc">
        <h1>🛡️ 管理员后台</h1>
        <p>待审核的用户贡献 ({requests.length})</p>

        <div style={{ display: 'grid', gap: '16px' }}>
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
      </div>
    </div>
  )
}