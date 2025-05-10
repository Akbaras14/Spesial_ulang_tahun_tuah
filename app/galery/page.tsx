'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const photos = [
  '/images/image1.jpeg',
  '/images/image2.jpeg',
  '/images/image3.jpeg',
  '/images/image4.jpeg',
  '/images/image5.jpeg',
  '/images/image6.jpeg',
];

export default function PhotoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-[400px] h-[520px] bg-white rounded-xl shadow-xl p-4 border-4 border-gray-300 font-mono flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-center">Gallery</h1>
        <div className="bg-slate-900 text-center top-10 w-full h-[250px] rounded-md py-5 ml-3 mr-3 ">
          <div className="relative w-[320px] ml-5 h-[190px] bg-black rounded-md shadow-[inset_0_0_17px_#22c55e] overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={photos[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photos[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                  priority={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-gray-500 text-center text-[7px] font-noto-serif mt-4">BENGKEL CODING</p>
        </div>

        <p className="text-black-400 mt-6 text-center text-sm">
          Selamat ulang tahun, semoga harimu selalu menyenangkan!
        </p>
        <div className="flex justify-center mt-8 space-x-4">
          <Link href="/home">
          <button className="bg-red-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">BACK</button>
          </Link>
          <Link href="/message">
          <button className="bg-green-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200">NEXT</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
