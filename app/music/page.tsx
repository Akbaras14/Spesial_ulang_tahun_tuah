'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Song {
  title: string;
  artist: string;
  duration: string;
  src: string;
  cover: string;
}

const songs: Song[] = [
  { title: 'Like That', artist: 'Baby Monster', duration: '02:57', src: '/songs/BABYMONSTERLIKETHAT EXCLUSIVEPERFORMANCEVIDEO.mp3', cover: '/songs/image4.jpeg' },
  { title: 'Dont Wanna Cry', artist: 'Seventeen', duration: '03:26', src: '/songs/MVSEVENTEENDontWannaCry.mp3', cover: '/songs/image1.jpeg' },
  { title: 'HOT', artist: 'Seventeen', duration: '03:19', src: '/songs/SEVENTEENHOTOfficialMV.mp3', cover: '/songs/image2.jpeg' },
  { title: "LALALI", artist: 'Seventeen', duration: '03:18', src: '/songs/SEVENTEENLALALIOfficial MV.mp3', cover: '/songs/image3.jpeg' },
  { title: 'Rock with you', artist: 'Seventeen', duration: '03:03', src: '/songs/SEVENTEENRockwithyouOfficialMV.mp3', cover: '/songs/image5.jpeg' },
];

const MusicPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const getRandomIndex = (excludeIndex: number): number => {
    let randIndex = Math.floor(Math.random() * songs.length);
    while (randIndex === excludeIndex && songs.length > 1) {
      randIndex = Math.floor(Math.random() * songs.length);
    }
    return randIndex;
  };

  const playPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (shuffle) {
        return getRandomIndex(prevIndex);
      }
      return prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
    });
  };

  const playNext = () => {
    setCurrentIndex((prevIndex) => {
      if (shuffle) {
        return getRandomIndex(prevIndex);
      }
      return prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
    });
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = Number(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleEnded = () => {
    playNext();
  };

  const toggleShuffle = () => {
    setShuffle((prev) => !prev);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="w-[390px] bg-white rounded-xl shadow-xl p-6 border-4 border-gray-300 font-mono flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Music Player</h1>

        {/* Album Cover & Info */}
<div className="bg-black rounded-md shadow-[inset_0_0_17px_#22c55e] p-9 flex flex-col items-center mb-6 w-full h-80">
  {songs[currentIndex].cover ? (
    <img
      src={songs[currentIndex].cover}
      alt={`${songs[currentIndex].title} cover`}
      className="rounded w-full h-40 object-cover mb-4"
      style={{ flexShrink: 0 }}
    />
  ) : (
    <div className="w-full h-40 bg-gray-600 rounded flex items-center justify-center text-gray-300 mb-4" style={{ flexShrink: 0 }}>
      No Cover
    </div>
  )}
  <div className="text-center flex flex-col justify-center flex-grow">
    <div className="text-green-400 font-bold text-lg">{songs[currentIndex].title}</div>
    <div className="text-yellow-400 text-sm">{songs[currentIndex].artist}</div>
  </div>
  <audio
    ref={audioRef}
    src={songs[currentIndex].src}
    onEnded={handleEnded}
    onTimeUpdate={handleTimeUpdate}
    onLoadedMetadata={handleLoadedMetadata}
    className="w-full mt-4"
    controls={false}
  />
</div>

 {/* Progress Bar */}
        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full cursor-pointer"
            aria-label="Seek Bar"
            title="Seek"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono select-none ">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between mb-4 space-x-3">
          <button
            onClick={toggleShuffle}
            className={`px-3 py-2 rounded font-bold transition-colors active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200 ${
              shuffle ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700 '
            }`}
            aria-label="Toggle Shuffle"
            title="Shuffle"
          >
            🔀
          </button>
          <button
            onClick={playPrevious}
            className="bg-blue-500 px-4 py-2 text-white font-bold rounded active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200"
            aria-label="Previous Song"
          >
            ⏮
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 px-6 py-2 text-white font-bold rounded active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={playNext}
            className="bg-blue-500 px-4 py-2 text-white font-bold rounded active:translate-y-1  shadow-gray-800 shadow-md hover:bg-gray-600 transition duration-200"
            aria-label="Next Song"
          >
            ⏭
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-15 cursor-pointer  "
            aria-label="Volume Control"
            title="Volume"
          />
        </div>

       

        {/* Playlist */}
        <div className="overflow-y-auto max-h-48 border-t border-gray-300 pt-2">
          <h2 className="text-yellow-400 font-bold text-sm mb-2">PLAYLIST:</h2>
          <ul className="text-sm">
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
                className={`flex justify-between items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-700 transition-colors ${
                  currentIndex === index ? 'bg-green-700 text-white font-bold' : ''
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentIndex(index);
                    setIsPlaying(true);
                  }
                }}
              >
                <span>
                  {index + 1}. {song.title}
                </span>
                <span className="text-right">{song.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Link href="/message">
          <button className="bg-red-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-red-600 transition duration-200">BACK</button>
          </Link>
          <Link href="/tetris">
          <button className="bg-green-500 px-4 py-1 rounded active:scale-95 active:translate-y-1  shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200">NEXT</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MusicPage;
