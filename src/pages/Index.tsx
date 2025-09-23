// src/pages/Index.tsx
import GameContainer from "@/components/game/GameContainer";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Color Runner
        </h1>
        <p className="text-gray-400 mt-2">Tap to jump and match the colors to score!</p>
      </header>
      <main>
        <GameContainer />
      </main>
      <footer className="mt-6">
        <MadeWithApplaa />
      </footer>
    </div>
  );
};

export default Index;