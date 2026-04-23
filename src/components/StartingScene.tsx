import { useState } from "react";
import { GameGuide } from "./GameGuide";
import { TutorialGuide } from "./TutorialGuide";

interface StartingSceneProps {
  onStartGame: () => void;
}

export const StartingScene = ({ onStartGame }: StartingSceneProps) => {
  const [showGuide, setShowGuide] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <div className="starting-scene-container fixed inset-0 flex items-center justify-center p-4">
        <div className="starting-scene-wrapper max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="starting-scene-header p-12 text-center bg-linear-to-r" style={{ background: 'linear-gradient(to right, var(--steampunk-purple-18), var(--secondary-background))' }}>
            <h1 className="text-6xl font-bold mb-4 text-white">Tiny Machines</h1>
            <p className="text-2xl text-blue-100">
              A strategic tile-placement game of machines and points
            </p>
          </div>

          {/* Content */}
          <div className="starting-scene-content p-12 text-center space-y-8">
            <div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Place machines on an 8×8 grid to maximize your score over 20 turns. 
                Each machine has unique scoring rules, and designs provide bonus points for strategic combinations.
              </p>
            </div>

            {/* Button Container */}
            <div className="flex flex-col gap-6 pt-8">
              <button
                onClick={onStartGame}
                className="starting-scene-button py-6 px-12 rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--background-darker) text-white hover:bg-(--background) hover:shadow-xl"
              >
                🚀 Play Game
              </button>

              <button
                onClick={() => setShowTutorial(true)}
                className="starting-scene-button py-6 px-12 rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--steampunk-purple-44) text-white hover:bg-(--steampunk-purple-56) hover:shadow-xl"
              >
                📚 Tutorial
              </button>

              <button
                onClick={() => setShowGuide(true)}
                className="starting-scene-button py-6 px-12 rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--steampunk-purple-18) text-white hover:bg-(--steampunk-purple-30) hover:shadow-xl"
              >
                📖 Full Guide
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="starting-scene-footer p-6 text-center bg-gray-100">
            <p className="text-gray-600 text-sm">
              💡 New to Tiny Machines? Start with the Tutorial to learn how each machine scores!
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showGuide && <GameGuide onClose={() => setShowGuide(false)} />}
      {showTutorial && <TutorialGuide onClose={() => setShowTutorial(false)} />}
    </>
  );
};
