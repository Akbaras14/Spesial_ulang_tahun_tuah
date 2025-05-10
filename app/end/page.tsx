'use client';
import React, { useState } from 'react';

export default function Home() {
  // State untuk menyimpan teks hasil ketikan
  const [typedText, setTypedText] = useState('');

  // Susunan tombol keyboard QWERTY
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  // Fungsi untuk menambahkan karakter ke typedText
  const handleKeyClick = (key: string) => {
    setTypedText((prev) => prev + key);
  };

  // Fungsi untuk menghapus karakter terakhir (Backspace)
  const handleBackspace = () => {
    setTypedText((prev) => prev.slice(0, -1));
  };

  // Fungsi untuk menambahkan spasi
  const handleSpace = () => {
    setTypedText((prev) => prev + ' ');
  };

  // Fungsi untuk menambahkan enter (newline)
  const handleEnter = () => {
    setTypedText((prev) => prev + '\n');
  };

  // Fungsi untuk mengirim pesan ke WhatsApp tanpa encoding
  const handleSend = () => {
    if (!typedText.trim()) {
      alert('Teks kosong, silakan ketik pesan terlebih dahulu.');
      return;
    }

    // Nomor tujuan WhatsApp (format internasional tanpa +)
    const phoneNumber = '6285893802972';

    // Buat URL WhatsApp dengan pesan tanpa encoding
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${typedText}`;

    // Buka tab baru dengan URL WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="w-[400px] h-auto bg-white rounded-xl shadow-xl p-4 border-4 border-gray-300 font-mono">
        
        {/* Header dengan teks dinamis */}
        <div className="bg-gray-900 text-center rounded-md py-6 mb-5">
          <div className="bg-slate-900 h-[250px] text-center rounded-md py-5 mx-3 shadow-[inset_0_0_17px_#22c55e] min-h-[72px] whitespace-pre-wrap break-words overflow-y-auto">
            <h1 className="text-green-400 text-xl font-bold">
              {typedText || 'Kirim pesan buat aku dong ^_^'}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-500 text-left ml-4 text-[5px] font-noto-serif mt-4">
              DOT MATRIX WITH STEREO SOUND
            </p>
            <p className="text-gray-500 text-right mr-4 text-[7px] font-noto-serif mt-4">
              BENGKEL CODING
            </p>
          </div>
        </div>

        {/* Keyboard Layout */}
        <div className="space-y-2 select-none">
          {/* Baris 1 */}
          <div className="flex justify-center space-x-1">
            {row1.map((key) => (
              <button
                key={key}
                type="button"
                className="bg-gray-300 text-black rounded-md w-9 h-9 shadow-md active:translate-y-1 active:scale-95 hover:bg-gray-400 transition duration-150 font-bold"
                aria-label={`Key ${key}`}
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Baris 2 */}
          <div className="flex justify-center space-x-1 ml-5">
            {row2.map((key) => (
              <button
                key={key}
                type="button"
                className="bg-gray-300 text-black rounded-md w-9 h-9 shadow-md active:translate-y-1 active:scale-95 hover:bg-gray-400 transition duration-150 font-bold"
                aria-label={`Key ${key}`}
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Baris 3 */}
          <div className="flex justify-center space-x-1 ml-12">
            {row3.map((key) => (
              <button
                key={key}
                type="button"
                className="bg-gray-300 text-black rounded-md w-9 h-9 shadow-md active:translate-y-1 active:scale-95 hover:bg-gray-400 transition duration-150 font-bold"
                aria-label={`Key ${key}`}
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            ))}

            {/* Tombol Backspace */}
            <button
              type="button"
              className="bg-red-500 text-white rounded-md w-16 h-9 shadow-md active:translate-y-1 active:scale-95 hover:bg-red-600 transition duration-150 font-bold ml-2"
              aria-label="Backspace"
              onClick={handleBackspace}
            >
              Del
            </button>
          </div>

          {/* Baris Spasi, Enter, Kirim */}
          <div className="flex justify-center space-x-2 mt-3">
            <button
              type="button"
              className="bg-gray-900 text-white rounded-md w-30 h-10 shadow-md active:translate-y-1 active:scale-95 hover:bg-gray-400 transition duration-150 font-bold"
              aria-label="Space"
              onClick={handleSpace}
            >
              Space
            </button>
            <button
              type="button"
              className="bg-gray-900 text-white rounded-md w-30 h-10 shadow-md active:translate-y-1 active:scale-95 hover:bg-gray-400 transition duration-150 font-bold"
              aria-label="Enter"
              onClick={handleEnter}
            >
              Enter
            </button>
            <button
              type="button"
              className="bg-green-600 text-white rounded-md w-24 h-10 shadow-md active:translate-y-1 active:scale-95 hover:bg-green-700 transition duration-150 font-bold"
              aria-label="Send"
              onClick={handleSend}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
