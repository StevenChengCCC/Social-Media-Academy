import React, { useEffect } from 'react'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'
import { BackToHomeLink } from '../App.jsx'

export default function AuthPage({ lang }) {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ display: 'grid', placeItems: 'center', alignContent: 'center', gap: '20px' }}>
      <BackToHomeLink lang={lang} />

      <Authenticator>
        {({ signOut, user }) => (
          <div className="doc" style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h1>👋 Hello, {user.username}</h1>
            <p>您已成功登录。</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button className="btn" onClick={() => navigate('/admin')}>前往管理员后台</button>
              <button className="btn" onClick={() => navigate('/slang')}>前往词典</button>
            </div>
            <button
              onClick={signOut}
              style={{ marginTop: '20px', background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              退出登录
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  )
}