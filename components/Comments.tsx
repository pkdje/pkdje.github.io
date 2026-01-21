'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current) return;
    
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'pkdje/pkdje.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsRef.current?.appendChild(script);
    isLoadedRef.current = true;

    return () => {
      isLoadedRef.current = false;
    };
  }, []);

  return <div ref={commentsRef} className="mt-8" />;
}