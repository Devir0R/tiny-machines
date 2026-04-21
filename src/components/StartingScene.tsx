import { useState } from "react";

interface StartingSceneProps {
  onStartGame: () => void;
}

export const StartingScene = ({ onStartGame }: StartingSceneProps) => {
  const [activeTab, setActiveTab] = useState<"rules" | "machines" | "designs">(
    "rules"
  );

  return (
    <div className="starting-scene-container fixed inset-0 flex items-center justify-center p-4">
      <div className="starting-scene-wrapper max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="starting-scene-header p-8 text-center">
          <h1 className="text-5xl font-bold mb-2">Tiny Machines</h1>
          <p className="text-xl">
            A strategic tile-placement game of machines and points
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="starting-scene-tabs flex">
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
              activeTab === "rules"
                ? "starting-scene-tab-active"
                : "starting-scene-tab-inactive hover:bg-background"
            }`}
          >
            📋 Rules
          </button>
          <button
            onClick={() => setActiveTab("machines")}
            className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
              activeTab === "machines"
                ? "starting-scene-tab-active"
                : "starting-scene-tab-inactive hover:bg-background"
            }`}
          >
            🤖 Machines
          </button>
          <button
            onClick={() => setActiveTab("designs")}
            className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
              activeTab === "designs"
                ? "starting-scene-tab-active"
                : "starting-scene-tab-inactive hover:bg-background"
            }`}
          >
            ⚙️ Designs
          </button>
        </div>

        {/* Content Area */}
        <div className="starting-scene-content p-8 max-h-96 overflow-y-auto">
          {/* Rules Tab */}
          {activeTab === "rules" && (
            <div className="space-y-4">
              <div>
                <h2 className="starting-scene-section-title text-2xl font-bold mb-3">
                  Game Objective
                </h2>
                <p className="text-base leading-relaxed">
                  Place machines on an 8×8 grid for 20 turns to maximize your
                  score. Each machine type scores points based on its unique
                  scoring rules and adjacent machines. Designs provide bonus
                  points when specific machine combinations are placed
                  strategically.
                </p>
              </div>

              <div>
                <h2 className="starting-scene-section-title text-2xl font-bold mb-3">
                  How to Play
                </h2>
                <ul className="space-y-2 text-base">
                  <li className="flex gap-3">
                    <span className="starting-scene-section-title font-bold">1.</span>
                    <span>
                      Each turn, you receive 2 random machines to place on the
                      board
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="starting-scene-section-title font-bold">2.</span>
                    <span>
                      You also receive a Design that provides bonus points when
                      completed
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="starting-scene-section-title font-bold">3.</span>
                    <span>
                      Click on machines to select them, then click on the board
                      to place them
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="starting-scene-section-title font-bold">4.</span>
                    <span>
                      Right-click to deselect or place machines from a Design
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="starting-scene-section-title font-bold">5.</span>
                    <span>
                      Confirm your placement and watch your score increase!
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="starting-scene-section-title text-2xl font-bold mb-3">
                  Scoring Tips
                </h2>
                <p className="text-base leading-relaxed">
                  Think ahead! Plan where to place machines to create synergies.
                  Some machines score better when adjacent to specific types, so
                  build clusters strategically. Use Designs to earn bonus points
                  and climb the leaderboard!
                </p>
              </div>
            </div>
          )}

          {/* Machines Tab */}
          {activeTab === "machines" && (
            <div className="space-y-3">
              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🚑 Ambulance
                </h3>
                <p className="starting-scene-machine-desc text-sm">2 points for each air machine around it</p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🚁 Helicopter
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  3 points for each empty spot around it surrounded by at least
                  3 machines
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">✈️ Jet</h3>
                <p className="starting-scene-machine-desc text-sm">
                  Square of the number of different machine types in the longest
                  line from it
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🚆 Train
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  1 point if connected to 1 train, 3 points if connected to 2
                  trains, 0 otherwise
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🚀 Missile
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  2 points for each non-air machine around it (Train, Slot
                  Machine, Ambulance)
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🛸 UFO
                </h3>
                <p className="starting-scene-machine-desc text-sm">Double the score of all adjacent machines</p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-xl font-bold mb-1">
                  🎰 Slot Machine
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  For each machine type with 2+, gain squared points (4 for 2, 9
                  for 3, etc.)
                </p>
              </div>
            </div>
          )}

          {/* Designs Tab */}
          {activeTab === "designs" && (
            <div className="space-y-3">
              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-lg font-bold mb-1">
                  🚑🚁 Ambulance Helicopter
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  4 points for each Helicopter adjacent to an Ambulance
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-lg font-bold mb-1">
                  🚑🎰 Lottery Ambulance
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  4 points for each Slot Machine adjacent to an Ambulance
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-lg font-bold mb-1">
                  ✈️🚀 Jet Missile Barrage
                </h3>
                <p className="starting-scene-machine-desc text-sm">4 points for each Missile adjacent to a Jet</p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-lg font-bold mb-1">
                  🚆🚆 Sonic Rail
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  5 points for each horizontal or vertical line of 2+ Trains
                </p>
              </div>

              <div className="starting-scene-machine-card p-4 rounded-lg">
                <h3 className="starting-scene-machine-name text-lg font-bold mb-1">
                  🛸+others Alien Designs
                </h3>
                <p className="starting-scene-machine-desc text-sm">
                  Special bonus designs featuring alien variants of machines.
                  Each has unique bonus mechanics!
                </p>
              </div>

              <p className="text-center text-sm mt-6 italic" style={{ color: 'white' }}>
                ✨ Many more designs await discovery! Complete them strategically
                to maximize your score.
              </p>
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="starting-scene-footer p-6 text-center">
          <button
            onClick={onStartGame}
            className="starting-scene-button py-4 px-12 rounded-lg text-2xl transition-all shadow-lg"
          >
            🚀 Start Game
          </button>
        </div>
      </div>
    </div>
  );
};
