'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

type Cell = string | null;

const ROWS = 11;
const COLS = 10;
const BLOCK_SIZE = 24;

const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      ['cyan', 'cyan', 'cyan', 'cyan'],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'cyan',
  },
  J: {
    shape: [
      ['blue', 0, 0],
      ['blue', 'blue', 'blue'],
      [0, 0, 0],
    ],
    color: 'blue',
  },
  L: {
    shape: [
      [0, 0, 'orange'],
      ['orange', 'orange', 'orange'],
      [0, 0, 0],
    ],
    color: 'orange',
  },
  O: {
    shape: [
      ['yellow', 'yellow'],
      ['yellow', 'yellow'],
    ],
    color: 'yellow',
  },
  S: {
    shape: [
      [0, 'green', 'green'],
      ['green', 'green', 0],
      [0, 0, 0],
    ],
    color: 'green',
  },
  T: {
    shape: [
      [0, 'purple', 0],
      ['purple', 'purple', 'purple'],
      [0, 0, 0],
    ],
    color: 'purple',
  },
  Z: {
    shape: [
      ['red', 'red', 0],
      [0, 'red', 'red'],
      [0, 0, 0],
    ],
    color: 'red',
  },
};

type TetrominoKey = keyof typeof TETROMINOS;

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: (string | number)[][];
  color: string;
  position: Position;
}

function createEmptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotate(matrix: (string | number)[][]): (string | number)[][] {
  const N = matrix.length;
  const result = Array.from({ length: N }, () => Array(N).fill(0));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      result[x][N - 1 - y] = matrix[y][x];
    }
  }
  return result;
}

function canMove(
  grid: Cell[][],
  piece: Piece,
  moveX: number,
  moveY: number,
  newShape?: (string | number)[][]
): boolean {
  const shape = newShape || piece.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = piece.position.x + x + moveX;
        const newY = piece.position.y + y + moveY;
        if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
        if (newY >= 0 && grid[newY][newX]) return false;
      }
    }
  }
  return true;
}

function mergePiece(grid: Cell[][], piece: Piece): Cell[][] {
  const newGrid = grid.map(row => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && piece.position.y + y >= 0) {
        newGrid[piece.position.y + y][piece.position.x + x] = piece.color;
      }
    });
  });
  return newGrid;
}

function clearLines(grid: Cell[][]): { newGrid: Cell[][]; linesCleared: number } {
  const newGrid = grid.filter(row => row.some(cell => !cell));
  const linesCleared = ROWS - newGrid.length;
  while (newGrid.length < ROWS) {
    newGrid.unshift(Array(COLS).fill(null));
  }
  return { newGrid, linesCleared };
}

function randomTetromino(): Piece {
  const keys = Object.keys(TETROMINOS) as TetrominoKey[];
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  const tetro = TETROMINOS[randKey];
  return {
    shape: tetro.shape,
    color: tetro.color,
    position: { x: Math.floor(COLS / 2) - Math.floor(tetro.shape[0].length / 2), y: -2 },
  };
}

export default function TetrisGameWithButtons() {
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid());
  const [piece, setPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // State untuk notifikasi modal
  const [showFirstAlert, setShowFirstAlert] = useState(false);
  const [showSecondAlert, setShowSecondAlert] = useState(false);

  const dropInterval = useRef<NodeJS.Timeout | null>(null);

  // Fungsi moveDown dibungkus useCallback agar referensinya stabil
  const moveDown = useCallback(() => {
    if (!piece) return;
    if (canMove(grid, piece, 0, 1)) {
      setPiece(prev => prev && ({ ...prev, position: { x: prev.position.x, y: prev.position.y + 1 } }));
    } else {
      if (piece.position.y < 0) {
        setGameOver(true);
        setIsRunning(false);
        setShowFirstAlert(true); // Tampilkan notifikasi pertama saat game over
        return;
      }
      const newGrid = mergePiece(grid, piece);
      const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
      if (linesCleared > 0) {
        setScore(prev => prev + linesCleared * 100);
      }
      setGrid(clearedGrid);
      setPiece(randomTetromino());
    }
  }, [piece, grid]);

  useEffect(() => {
    if (!isRunning || gameOver || !piece) return;

    dropInterval.current = setInterval(() => {
      moveDown();
    }, 800);

    return () => {
      if (dropInterval.current) clearInterval(dropInterval.current);
    };
  }, [isRunning, gameOver, piece, moveDown]);

  function moveHorizontal(dir: number) {
    if (!piece) return;
    if (canMove(grid, piece, dir, 0)) {
      setPiece(prev => prev && ({ ...prev, position: { x: prev.position.x + dir, y: prev.position.y } }));
    }
  }

  function rotatePiece() {
    if (!piece) return;
    const rotatedShape = rotate(piece.shape);
    if (canMove(grid, piece, 0, 0, rotatedShape)) {
      setPiece(prev => prev && ({ ...prev, shape: rotatedShape }));
    }
  }

  function startGame() {
    setGrid(createEmptyGrid());
    setPiece(randomTetromino());
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
    setShowFirstAlert(false);
    setShowSecondAlert(false);
  }

  function pauseResumeGame() {
    setIsRunning(prev => !prev);
  }

  // Handler tombol Next pada notifikasi pertama
  function handleNext() {
    setShowFirstAlert(false);
    setShowSecondAlert(true);
  }

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="w-[360px] bg-white rounded-xl shadow-xl p-6 border-4 border-gray-300 font-mono flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Tetris Game</h1>
        <div className="text-green-600 font-bold text-sm">Score: {score}</div>

        {/* Grid */}
        <div
          className="bg-black rounded-md shadow-[inset_0_0_17px_#22c55e] grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, ${BLOCK_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${BLOCK_SIZE}px)`,
            width: COLS * BLOCK_SIZE,
            height: ROWS * BLOCK_SIZE,
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => {
              let color = cell;
              if (piece) {
                const px = x - piece.position.x;
                const py = y - piece.position.y;
                if (
                  py >= 0 &&
                  py < piece.shape.length &&
                  px >= 0 &&
                  px < piece.shape[0].length &&
                  piece.shape[py][px]
                ) {
                  color = piece.color;
                }
              }
              return (
                <div
                  key={`${y}-${x}`}
                  className={`border border-gray-700`}
                  style={{
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                    backgroundColor: color || 'transparent',
                  }}
                />
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 w-full flex justify-center space-x-3">
          <button
            onClick={() => moveHorizontal(-1)}
            disabled={!isRunning || gameOver}
            className="bg-blue-500 disabled:bg-gray-400  text-white px-4 py-2 rounded active:scale-95 active:translate-y-1 shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200"
            aria-label="Move Left"
          >
            ◀
          </button>

          <button
            onClick={rotatePiece}
            disabled={!isRunning || gameOver}
            className="bg-blue-500 disabled:bg-gray-400  text-white px-4 py-2 rounded active:scale-95 active:translate-y-1 shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200"
            aria-label="Rotate"
          >
            ROTATE
          </button>

          <button
            onClick={() => moveHorizontal(1)}
            disabled={!isRunning || gameOver}
            className="bg-blue-500 disabled:bg-gray-400  text-white px-4 py-2 rounded active:scale-95 active:translate-y-1 shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200"
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>

        {/* Score and Game Control Buttons */}
        <div className="mt-4 w-full flex justify-center">
          {!isRunning && !gameOver && (
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Start Game
            </button>
          )}
          {isRunning && !gameOver && (
            <button
              onClick={pauseResumeGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Pause
            </button>
          )}
          {!isRunning && !gameOver && piece && (
            <button
              onClick={pauseResumeGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Resume
            </button>
          )}
          {gameOver && (
            <button
              onClick={startGame}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            >
              Restart
            </button>
          )}
        </div>

        {/* Notifikasi Modal Pertama */}
        {showFirstAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-50 z-50">
            <div className="bg-black rounded-lg p-6 max-w-xs text-center shadow-[inset_0_0_12px_#FFFF00] grid">
              <h2 className="text-2xl font-bold mb-4 text-red-600">GAMEOVER!</h2>
              <button
                onClick={handleNext}
                className="bg-blue-600 active:scale-95 active:translate-y-1 shadow-gray-800 shadow-md hover:bg-green-600 transition duration-200 text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Notifikasi Modal Kedua */}
        {showSecondAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-50 z-50">
            <div className="bg-black rounded-lg p-6 max-w-xs text-center shadow-[inset_0_0_12px_#FFFF00] grid gap-4">
              <p className="text-lg mb-4 text-yellow-400">INGET YA!</p>
              <p className="text-lg text-white mb-4">
                Walaupun kamu kalah tapi kamu selalu menang dihatiku<br />^_^
              </p>
              <p className="text-lg mb-4 text-pink-500">I LOVE YOU :3</p>
              <Link href="/end">
                <div className="bg-green-600 px-4 py-1 rounded active:translate-y-1 shadow-gray-800 shadow-md hover:bg-green-300 transition duration-200 cursor-pointer">
                  NEXT
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
