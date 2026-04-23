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
      <div className="starting-scene-container fixed inset-0 flex items-center justify-center px-[1vw] py-[1vh]">
        <div className="starting-scene-wrapper max-w-[40vw] w-full rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="starting-scene-header px-[3vw] py-[3vh] text-center bg-linear-to-r" style={{ background: 'linear-gradient(to right, var(--steampunk-purple-18), var(--secondary-background))' }}>
            <h1 className="text-6xl font-bold mb-4 text-white">Tiny Machines</h1>
            <p className="text-2xl text-blue-100">
              A strategic tile-placement game of machines and points
            </p>
          </div>

          {/* Content */}
          <div className="starting-scene-content  px-[4.5vw] py-[4.5vh] text-center space-y-8">
            <div>
              <p className="text-lg text-white mb-8 leading-relaxed">
                Place machines on an 8x8 grid to maximize your score over 20 turns. 
                Each machine has unique scoring rules, and designs provide bonus points for strategic combinations.
              </p>
            </div>

            {/* Button Container */}
            <div className="flex flex-col  px-[2vw] py-[2vh] pt-8">
              <button
                onClick={onStartGame}
                className="starting-scene-button py-[2vh]  px-[4vh] rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--background-darker) text-white hover:bg-(--background) hover:shadow-xl"
              >
                🚀 Play Game
              </button>

              <button
                onClick={() => setShowTutorial(true)}
                className="starting-scene-button py-[2vh]  px-[4vh] rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--steampunk-purple-44) text-white hover:bg-(--steampunk-purple-56) hover:shadow-xl"
              >
                📚 Tutorial
              </button>

              <button
                onClick={() => setShowGuide(true)}
                className="starting-scene-button py-[2vh]  px-[4vh]  rounded-lg text-3xl font-bold transition-all shadow-lg bg-(--steampunk-purple-18) text-white hover:bg-(--steampunk-purple-30) hover:shadow-xl"
              >
                📖 Full Guide
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="starting-scene-footer px-[2vw] py-[2vh] text-center bg-gray-100">
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
