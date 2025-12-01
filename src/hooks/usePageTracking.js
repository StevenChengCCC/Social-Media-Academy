import { useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import * as mutations from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

export function usePageTracking(pageName) {
  const startTime = useRef(Date.now());
  const clickCount = useRef(0);

  useEffect(() => {
    let client;
    try {
      client = generateClient();
    } catch (e) {
      return;
    }

    const createUserAnalytics = mutations?.createUserAnalytics;
    if (!createUserAnalytics) return;

    startTime.current = Date.now();
    clickCount.current = 0;

    const handleClick = () => { clickCount.current += 1; };
    try {
      document.addEventListener('click', handleClick);
    } catch (e) { /* ignore */ }

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
    return () => {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime.current) / 1000);
      const clicks = clickCount.current;

      try {
        document.removeEventListener('click', handleClick);
      } catch (e) { /* ignore */ }

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
          }).catch(err => console.log("Analytics error:", err));
        });
      }
    };
  }, [pageName]);
}