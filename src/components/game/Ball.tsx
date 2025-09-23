// src/components/game/Ball.tsx
import React from 'react';
import { BALL_SIZE } from '@/lib/game-constants';

interface BallProps {
  y: number;
  color: string;
}

const Ball: React.FC<BallProps> = ({ y, color }) => {
  return (
    <div
      className="absolute rounded-full shadow-lg"
      style={{
        width: `${BALL_SIZE}px`,
        height: `${BALL_SIZE}px`,
        left: `calc(50% - ${BALL_SIZE / 2}px)`,
        bottom: `${y}px`,
        backgroundColor: color,
        transition: 'background-color 0.2s ease',
      }}
    />
  );
};

export default Ball;