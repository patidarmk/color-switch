// src/components/game/GameOverScreen.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-[350px] text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Game Over</CardTitle>
          <CardDescription>Nice try! Let's go for another round.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-lg font-medium text-muted-foreground">Your Score</p>
            <p className="text-5xl font-bold tracking-tighter">{score}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">High Score</p>
            <p className="text-xl font-semibold">{highScore}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onRestart} className="w-full" size="lg">
            Restart Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverScreen;