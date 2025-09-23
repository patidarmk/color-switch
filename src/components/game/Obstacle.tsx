// src/components/game/Obstacle.tsx
import React from 'react';
import { OBSTACLE_HEIGHT, OBSTACLE_GAP_WIDTH, GAME_WIDTH } from '@/lib/game-constants';

interface ObstacleProps {
  y: number;
  color: string;
}

const Obstacle: React.FC<ObstacleProps> = ({ y, color }) => {
  const partWidth = (GAME_WIDTH - OBSTACLE_GAP_WIDTH) / 2;

  return (
    <div className="absolute" style={{ top: `${y}px`, left: 0, width: '100%', height: `${OBSTACLE_HEIGHT}px` }}>
      <div
        className="absolute"
        style={{
          left: 0,
          width: `${partWidth}px`,
          height: '100%',
          backgroundColor: color,
        }}
      />
      <div
        className="absolute"
        style={{
          right: 0,
          width: `${partWidth}px`,
          height: '100%',
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default Obstacle;