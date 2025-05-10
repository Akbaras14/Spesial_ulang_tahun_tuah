'use client';
import React, { useEffect, useState, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';


export default function MessagePage(): JSX.Element {
  const [skipped, setSkipped] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const fullText: string = `Selamat ulang tahun ya!
Semoga hari spesialmu ini dipenuhi dengan kebahagiaan dan senyuman yang tulus.
Aku berharap di tahun baru usiamu, semua impian dan harapanmu bisa terwujud dengan indah.
Aku senang bisa mengenal kamu lebih dekat, dan semoga kita bisa terus berbagi cerita dan tawa bersama.
Jangan lupa untuk selalu jaga kesehatan dan tetap jadi diri sendiri yang keren itu, ya!
Semoga hari ini jadi awal dari banyak kebahagiaan yang datang menghampiri kamu.
Selamat ulang tahun, semoga hari-harimu selalu cerah dan penuh warna

LOVE YOU :3`;
  
  // useRef untuk menyimpan index karakter saat ini
  const indexRef = useRef<number>(0);
  // useRef untuk menyimpan ID timeout agar bisa dibersihkan
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (skipped) {
      const textArray: string[] = Array.from(fullText);
      indexRef.current = 0;
      setTypedText(''); // Reset typedText saat mulai animasi

      const typeCharacter = () => {
        if (indexRef.current < textArray.length) {
          const char = textArray[indexRef.current];
          // Debug log (bisa dihapus jika sudah yakin)
          console.log('Adding char:', char, 'at index:', indexRef.current);

          setTypedText(prev => prev + char);
          indexRef.current += 1;
          timeoutRef.current = setTimeout(typeCharacter, 50);
        }
      };

      typeCharacter();

      // Cleanup function untuk membersihkan timeout saat unmount atau skipped berubah
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [skipped, fullText]);

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-[400px] h-[520px]  bg-white rounded-xl shadow-xl p-4 border-4 border-gray-300 font-mono">
        {/* HEADER */}
        <h1 className="text-xl font-bold mb-4 text-center">
          Message
        </h1>

        {/* MESSAGE CONTENT */}
        <div className="bg-slate-900 top-10 w-full h-[250px] rounded-md py-5 ">
        <div
  className="bg-black  text-green-400 shadow-[inset_0_0_17px_#22c55e] px-4 font-gameboy py-7 rounded-md text-sm  mb-5  w-[320px] ml-5 h-[190px] overflow-y-auto"
>
  <AnimatePresence mode="wait">
    {!skipped ? (
      <motion.div
        key="before"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p>Hi Tuah,</p>
        <p className="mt-2">Happy Birthday!</p>
        <p className="mt-4">Selamat hari berbahagia</p>

        <div className="flex justify-center mt-2">
          <button
            className=" text-white font-gameboy font-bold rounded  hover:text-green-600 active:scale-95 active:translate-y-1 transition"
            onClick={() => setSkipped(true)}
            type="button"
          >
            SKIP
          </button>
        </div>
      </motion.div>
    ) : (
      <motion.p
        key="after"
        className="text-green-400 min-h-[60px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {typedText}
      </motion.p>
    )}
  </AnimatePresence>
</div>
<p className="text-gray-500 text-center text-[7px] font-noto-serif mb-4 ">BENGKEL CODING</p>
        </div>
        <div className="flex justify-between items-center ml-12 mt-6 ">
          {/* D-Pad */}
          <div className="grid grid-cols-3 gap-1 w-20 h-20">
            <div></div>
            <div className="bg-black w-7 h-7 mx-auto text-white text-center font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200 ">Y</div>
            <div></div>
            <div className="bg-black w-7 h-7 mx-auto text-white text-center font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">A</div>
            <div></div>
            <div className="bg-black w-7 h-7 mx-auto  text-white text-center font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">x</div>
            <div></div>
            <div className="bg-black w-7 h-7 mx-auto  text-white text-center  font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">D</div>
            <div></div>
          </div>

          {/* A/B Buttons */}
          <div className=" grid grid-cols-3 gap-5">
            <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">A</div>
            <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">B</div>
          </div>
        </div>


        {/* BUTTONS */}
        <div className="flex justify-center mt-8 space-x-4">
          <Link href="/galery">
          <button className="bg-red-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">BACK</button>
          </Link>
          <Link href="/music">
          <button className="bg-green-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200">NEXT</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
