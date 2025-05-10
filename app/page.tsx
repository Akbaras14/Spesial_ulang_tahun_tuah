'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push('/home');
          return 100;
        }
        return prev + 1;
      });
    }, 60); // 5 seconds total

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-green-400 font-mono">
      <div className="border-4 border-green-400 p-6 w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-2">Bengkel Coding</h1>
        <h1 className="text-[11px] text-white font-bold mb-2">Technology Solutions For You</h1>
        <div className="text-left text-lg mb-2">&gt; READY!<span className="animate-pulse">_</span></div>
        <div className="w-full h-6 bg-gray-800 rounded overflow-hidden">
          <div
            className="h-full text-right pr-2 text-black font-bold"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff00, #88ff88)',
              transition: 'width 0.1s ease-in-out'
            }}
          >
            {progress}%
          </div>
        </div>
        <div className="mt-4 text-yellow-400 font-bold text-lg">SMILE!</div>
      </div>
    </div>
  );
}
