// src/lib/game-constants.ts

export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 700;

// Ball physics
export const GRAVITY = 0.5;
export const JUMP_STRENGTH = -10;
export const BALL_SIZE = 30;

// Obstacle properties
export const OBSTACLE_WIDTH = GAME_WIDTH;
export const OBSTACLE_GAP_WIDTH = 100;
export const OBSTACLE_HEIGHT = 25;
export const OBSTACLE_SPEED = 2.5;

// Color switcher properties
export const COLOR_SWITCHER_SIZE = 20;

// Game colors
export const COLORS = {
  RED: 'rgb(255, 99, 132)',    // #FF6384
  BLUE: 'rgb(54, 162, 235)',   // #36A2EB
  YELLOW: 'rgb(255, 205, 86)', // #FFCD56
  GREEN: 'rgb(75, 192, 192)',  // #4BC0C0
};

export const COLOR_PALETTE = Object.values(COLORS);

export const getRandomColor = (currentColor?: string): string => {
  let newColor;
  do {
    newColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
  } while (newColor === currentColor);
  return newColor;
};