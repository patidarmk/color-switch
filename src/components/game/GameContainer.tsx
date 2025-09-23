// src/components/game/GameContainer.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Ball from './Ball';
import Obstacle from './Obstacle';
import ColorSwitcher from './ColorSwitcher';
import GameOverScreen from './GameOverScreen';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GRAVITY,
  JUMP_STRENGTH,
  BALL_SIZE,
  OBSTACLE_HEIGHT,
  OBSTACLE_SPEED,
  COLOR_PALETTE,
  getRandomColor,
  COLOR_SWITCHER_SIZE,
} from '@/lib/game-constants';

type GameState = 'waiting' | 'playing' | 'gameOver';

interface ObstacleState {
  id: number;
  y: number;
  color: string;
  passed: boolean;
}

interface ColorSwitcherState {
  id: number;
  y: number;
}

const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [ballY, setBallY] = useState(GAME_HEIGHT / 4);
  const [ballVelocity, setBallVelocity] = useState(0);
  const [ballColor, setBallColor] = useState(COLOR_PALETTE[0]);
  const [obstacles, setObstacles] = useState<ObstacleState[]>([]);
  const [colorSwitchers, setColorSwitchers] = useState<ColorSwitcherState[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('highScore') || '0', 10));

  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const resetGame = useCallback(() => {
    const initialColor = getRandomColor();
    setBallY(GAME_HEIGHT / 4);
    setBallVelocity(0);
    setBallColor(initialColor);
    setScore(0);
    setObstacles([
      { id: 1, y: -200, color: getRandomColor(initialColor), passed: false },
    ]);
    setColorSwitchers([
      { id: 1, y: -350 },
    ]);
    setGameState('playing');
  }, []);

  const gameLoop = useCallback((time: number) => {
    if (lastTimeRef.current === undefined) {
      lastTimeRef.current = time;
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Update ball position
    const newVelocity = ballVelocity + GRAVITY;
    const newBallY = ballY - newVelocity;
    setBallVelocity(newVelocity);
    setBallY(newBallY);

    // Game over if ball hits top or bottom
    if (newBallY > GAME_HEIGHT - BALL_SIZE || newBallY < 0) {
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score.toString());
      }
      return;
    }

    // Update obstacles and check for collisions
    const newObstacles = obstacles.map(obs => ({ ...obs, y: obs.y + OBSTACLE_SPEED })).filter(obs => obs.y < GAME_HEIGHT + 50);
    
    let collisionDetected = false;
    newObstacles.forEach(obs => {
      const ballTop = GAME_HEIGHT - newBallY;
      const ballBottom = ballTop + BALL_SIZE;
      const obsTop = obs.y;
      const obsBottom = obs.y + OBSTACLE_HEIGHT;

      if (ballBottom > obsTop && ballTop < obsBottom) {
        if (obs.color !== ballColor) {
          collisionDetected = true;
        } else if (!obs.passed) {
          setScore(s => s + 1);
          obs.passed = true;
        }
      }
    });

    if (collisionDetected) {
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score.toString());
      }
      return;
    }

    // Add new obstacle if needed
    const lastObstacle = newObstacles[newObstacles.length - 1];
    if (lastObstacle && lastObstacle.y > 300) {
      newObstacles.push({
        id: Date.now(),
        y: -200,
        color: getRandomColor(ballColor),
        passed: false,
      });
    }
    setObstacles(newObstacles);

    // Update color switchers and check for collisions
    const newSwitchers = colorSwitchers.map(sw => ({ ...sw, y: sw.y + OBSTACLE_SPEED })).filter(sw => sw.y < GAME_HEIGHT + 50);
    let switcherHit = false;
    newSwitchers.forEach((sw, index) => {
        const ballTop = GAME_HEIGHT - newBallY;
        const ballBottom = ballTop + BALL_SIZE;
        const swTop = sw.y;
        const swBottom = sw.y + COLOR_SWITCHER_SIZE;

        if (ballBottom > swTop && ballTop < swBottom) {
            setBallColor(getRandomColor(ballColor));
            newSwitchers.splice(index, 1);
            switcherHit = true;
        }
    });

    // Add new switcher if needed
    const lastSwitcher = newSwitchers[newSwitchers.length - 1] || obstacles[obstacles.length - 1];
    if (lastSwitcher && lastSwitcher.y > 500) {
        newSwitchers.push({ id: Date.now(), y: -350 });
    }
    setColorSwitchers(newSwitchers);


    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [ballY, ballVelocity, ballColor, obstacles, colorSwitchers, score, highScore]);

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = undefined;
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  const handleJump = useCallback(() => {
    if (gameState === 'playing') {
      setBallVelocity(JUMP_STRENGTH);
    } else if (gameState === 'gameOver') {
      resetGame();
    } else if (gameState === 'waiting') {
      resetGame();
    }
  }, [gameState, resetGame]);

  return { gameState, ballY, ballColor, obstacles, colorSwitchers, score, highScore, handleJump, resetGame };
};

const GameContainer: React.FC = () => {
  const { gameState, ballY, ballColor, obstacles, colorSwitchers, score, highScore, handleJump, resetGame } = useGameLogic();

  return (
    <div
      className="relative overflow-hidden bg-gray-800 cursor-pointer rounded-2xl shadow-2xl"
      style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
      onClick={handleJump}
    >
      {gameState === 'gameOver' && <GameOverScreen score={score} highScore={highScore} onRestart={resetGame} />}
      {gameState === 'waiting' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold">Color Runner</h2>
          <p className="mt-4 text-lg">Tap to start playing</p>
        </div>
      )}
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white text-5xl font-bold opacity-50">
        {score}
      </div>

      <Ball y={ballY} color={ballColor} />
      {obstacles.map(obs => (
        <Obstacle key={obs.id} y={obs.y} color={obs.color} />
      ))}
      {colorSwitchers.map(sw => (
        <ColorSwitcher key={sw.id} y={sw.y} />
      ))}
    </div>
  );
};

export default GameContainer;