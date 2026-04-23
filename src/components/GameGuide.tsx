interface GameGuideProps {
  onClose: () => void;
}

export const GameGuide = ({ onClose }: GameGuideProps) => {
  return (
    <div className="game-guide fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="guide-wrapper max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="guide-header p-8 text-center bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-4xl font-bold text-white mb-2">Tiny Machines - Complete Game Guide</h1>
          <p className="text-purple-100">Master the strategy and maximize your score</p>
        </div>

        {/* Content */}
        <div className="guide-content p-8 space-y-8">
          {/* Game Objective */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">🎮 Game Objective</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Place machines on an 8×8 grid for 20 turns to maximize your score. Each machine type scores 
              points based on its unique scoring rules and adjacent machines. Designs provide bonus points 
              when specific machine combinations are placed strategically.
            </p>
          </section>

          {/* How to Play */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">📋 How to Play</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-purple-600 min-w-fit">1️⃣</span>
                <p className="text-lg text-gray-700">Each turn, you receive 2 random machines to place on the board</p>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-purple-600 min-w-fit">2️⃣</span>
                <p className="text-lg text-gray-700">You also receive a Design that provides bonus points when completed</p>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-purple-600 min-w-fit">3️⃣</span>
                <p className="text-lg text-gray-700">Click on machines to select them, then click on the board to place them</p>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-purple-600 min-w-fit">4️⃣</span>
                <p className="text-lg text-gray-700">Right-click to deselect or place machines from a Design</p>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-purple-600 min-w-fit">5️⃣</span>
                <p className="text-lg text-gray-700">Confirm your placement and watch your score increase!</p>
              </div>
            </div>
          </section>

          {/* Machines */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">🤖 Machines & Scoring</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-red-800 mb-2">🚑 Ambulance</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> 2 points for each Air machine (Helicopter, Jet) adjacent to it</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-2">🚁 Helicopter</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> 3 points for each empty spot around it that is surrounded by at least 3 machines</p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">✈️ Jet</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> Scores the square of the number of different machine types in the longest line from it</p>
              </div>

              <div className="bg-orange-50 border-2 border-orange-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-orange-800 mb-2">🚆 Train</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> 1 point if connected to 1 Train, 3 points if connected to 2 Trains, 0 otherwise</p>
              </div>

              <div className="bg-pink-50 border-2 border-pink-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-pink-800 mb-2">🚀 Missile</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> 2 points for each non-Air machine (Train, Slot Machine, Ambulance, Missile) adjacent to it</p>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-800 mb-2">🛸 UFO</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> Doubles the score of all adjacent machines</p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-2">🎰 Slot Machine</h3>
                <p className="text-gray-700"><strong>Scoring:</strong> For each machine type with 2+ on the board, gain squared points (4 for 2 types, 9 for 3 types, etc.)</p>
              </div>
            </div>
          </section>

          {/* Scoring Tips */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">💡 Scoring Tips</h2>
            <div className="space-y-3 text-lg text-gray-700">
              <p>✨ <strong>Think ahead!</strong> Plan where to place machines to create synergies between them.</p>
              <p>🎯 <strong>Build clusters:</strong> Some machines score better when adjacent to specific types, so group them strategically.</p>
              <p>📈 <strong>Use Designs:</strong> Complete Design objectives to earn bonus points and increase your total score.</p>
              <p>🛸 <strong>UFO multiplier:</strong> Placing a UFO next to high-scoring machines can double your gains!</p>
              <p>🎰 <strong>Slot machine diversity:</strong> Having many different machine types on the board helps Slot Machines score more.</p>
            </div>
          </section>

          {/* Designs */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">⚙️ Designs & Bonuses</h2>
            <p className="text-lg text-gray-700 mb-4">
              Designs are special combinations that provide bonus points when you have the right machines on the board. 
              Complete as many designs as possible to maximize your score!
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Some popular designs include:<br/>
                <strong>Ambulance Helicopter:</strong> 4 points for each Helicopter adjacent to an Ambulance<br/>
                <strong>Sonic Rail:</strong> 5 points for each horizontal or vertical line of 2+ Trains<br/>
                <strong>Jet Missile Barrage:</strong> 4 points for each Missile adjacent to a Jet<br/>
                <strong>...and many more alien variants!</strong>
              </p>
            </div>
          </section>

          {/* Strategy */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-purple-700">🏆 Advanced Strategy</h2>
            <div className="space-y-3 text-lg text-gray-700">
              <p>🎪 <strong>Synergy stacking:</strong> Combine multiple machines to create cascading point bonuses</p>
              <p>🗺️ <strong>Board positioning:</strong> Reserve space for future placements that will maximize scores</p>
              <p>⏰ <strong>Turn management:</strong> With 20 turns total, plan your placement strategy early</p>
              <p>🎲 <strong>Adapt quickly:</strong> Adjust your strategy based on the random machines and designs you receive</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="guide-footer p-6 text-center bg-gray-100">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors"
          >
            ✨ Close Guide & Play!
          </button>
        </div>
      </div>
    </div>
  );
};
