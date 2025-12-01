// src/hooks/usePageTracking.js
import { useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
// 尝试导入 mutation，如果未生成可能会报错，我们下面会处理
import * as mutations from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export function usePageTracking(pageName) {
  const startTime = useRef(Date.now());
  const clickCount = useRef(0);

  useEffect(() => {
    // 【安全检查】如果后端代码没生成，直接跳过追踪，防止页面白屏
    const createUserAnalytics = mutations.createUserAnalytics;
    if (!createUserAnalytics) {
      console.warn('⚠️ 追踪功能未启用：找不到 createUserAnalytics。请确保已运行 amplify push 和 amplify codegen。');
      return;
    }

    // 1. 重置计时器
    startTime.current = Date.now();
    clickCount.current = 0;

    // 2. 点击监听
    const handleClick = () => { clickCount.current += 1; };
    try {
      document.addEventListener('click', handleClick);
    } catch (e) { console.warn(e); }

    // 3. 获取身份
    const getIdentity = async () => {
      try {
        const user = await getCurrentUser();
        return { userId: user.userId, isAnonymous: false };
      } catch (err) {
        let anonId = localStorage.getItem('social_academy_anon_id');
        if (!anonId) {
          anonId = uuidv4();
          localStorage.setItem('social_academy_anon_id', anonId);
        }
        return { userId: anonId, isAnonymous: true };
      }
    };

    // 4. 页面离开时上报
    return () => {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime.current) / 1000);
      const clicks = clickCount.current;

      document.removeEventListener('click', handleClick);

      if (duration > 1) {
        getIdentity().then(({ userId, isAnonymous }) => {
          client.graphql({
            query: createUserAnalytics,
            variables: {
              input: {
                userId,
                isAnonymous,
                page: pageName,
                durationSeconds: duration,
                clickCount: clicks,
                timestamp: new Date().toISOString()
              }
            },
            authMode: 'API_KEY'
          }).catch(err => console.log("Tracking error (ignored):", err));
        });
      }
    };
  }, [pageName]);
}