import Link from 'next/link';

export default function Notfound() {
  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-[400px] h-[520px]  bg-white rounded-xl shadow-xl p-4 border-4 border-gray-300 font-mono">
        
        <div className="bg-gray-900 text-center rounded-md py-6  mb-5 ">
        <div className="bg-slate-900 text-center top-10 rounded-md py-5 ml-3 mr-3 shadow-[inset_0_0_17px_#22c55e]">
          <h1 className="text-red-700 text-xl font-bold">404<br/>System Not Found</h1>
          <p className="text-yellow-400 mt-2 text-sm">Press Start Button</p>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
        <p className="text-gray-500 text-left ml-4 text-[5px] font-noto-serif mt-4 ">DOT MATRIX WITH STREO SOUND</p>
        <p className="text-gray-500 text-right mr-4 text-[7px] font-noto-serif mt-4 ">BENGKEL CODING</p>
        </div>
        </div>
      
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
            <Link href="/message">
              <button className="bg-blue-500 text-white py-2 rounded active:scale-95 active:translate-y-1  shadow-gray-800 hover:bg-blue-700 transition duration-200  shadow-md w-full">MESSAGE</button>
            </Link>
            <Link href="/galery">
              <button className="bg-red-500 text-white py-2 rounded active:scale-95 active:translate-y-1  shadow-gray-800 hover:bg-red-600 transition duration-200 shadow-md w-full">GALLERY</button>
            </Link>
            <Link href="/music">
              <button className="bg-purple-500 text-white py-2 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-purple-600 transition duration-200 w-full">MUSIC</button>
            </Link>
            <Link href="/tetris">
            <button className="bg-green-500 text-white py-2 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200 w-full">TETRIS</button>
            </Link>
        </div>

        {/* D-Pad + A/B */}
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

        {/* Start / Select */}
        <div className="flex justify-center mt-8 space-x-4">
          <div className="bg-gray-300 px-4 py-1 rounded active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200">SELECT</div>
           <Link href="/galery">
          <div className="bg-gray-300 px-4 py-1 rounded active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200">START</div>
           </Link>
        </div>
      </div>
    </main>
  );
}
