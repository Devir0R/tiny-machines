interface EndGameSceneProps {
  score: number;
  onPlayAgain: () => void;
}

export const EndGameScene = ({ score, onPlayAgain }: EndGameSceneProps) => {
  return (
    <div className="end-game-container flex flex-col items-center justify-center h-full">
      <div className="end-game-card p-8 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-6">Game Over</h2>
        
        <div className="end-game-score-box p-6 rounded-lg mb-8">
          <p className="text-sm uppercase tracking-wider mb-2">Final Score</p>
          <p className="text-6xl font-bold">{score}</p>
        </div>

        <button
          onClick={onPlayAgain}
          className="end-game-button py-3 px-8 rounded-lg text-xl font-bold transition-all hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
