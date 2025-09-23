// src/components/game/ColorSwitcher.tsx
import React from 'react';
import { COLOR_SWITCHER_SIZE, COLOR_PALETTE } from '@/lib/game-constants';
import { Palette } from 'lucide-react';

interface ColorSwitcherProps {
  y: number;
}

const ColorSwitcher: React.FC<ColorSwitcherProps> = ({ y }) => {
  return (
    <div
      className="absolute flex items-center justify-center rounded-full bg-white shadow-lg"
      style={{
        width: `${COLOR_SWITCHER_SIZE}px`,
        height: `${COLOR_SWITCHER_SIZE}px`,
        left: `calc(50% - ${COLOR_SWITCHER_SIZE / 2}px)`,
        top: `${y}px`,
      }}
    >
      <Palette className="h-4 w-4 text-gray-600" />
    </div>
  );
};

export default ColorSwitcher;