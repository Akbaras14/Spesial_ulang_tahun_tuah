'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 60); // 5 seconds total (100 * 60ms = 6000ms)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      router.push('/home');
    }
  }, [progress, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-green-400 font-mono">
      <div className="border-4 border-green-400 p-6 w-[400px] text-center">
        <h1 className="text-xl font-bold mb-2">SPESIAL FOR YOU</h1>
        <h1 className="text-2xl text-white font-bold mb-2">MAFTUKAH ^_^</h1>
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
