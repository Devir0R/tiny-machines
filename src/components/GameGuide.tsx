interface GameGuideProps {
  onClose: () => void;
}

export const GameGuide = ({ onClose }: GameGuideProps) => {
  return (
    <div
      className="game-guide fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        backgroundColor: "rgb(34 31 46 / 0.72)",
      }}
    >
      <div
        className="guide-wrapper max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto border-2"
        style={{
          backgroundColor: "rgb(205 152 86)", // --background
          borderColor: "rgb(72, 52, 77)", // --steampunk-purple-30
          color: "rgb(58 62 81)", // --secondary-foreground
        }}
      >
        {/* Header */}
        <div
          className="guide-header p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgb(72, 52, 77), rgb(148 92 158))",
            color: "rgb(207 171 131)", // --card
            borderBottom: "2px solid rgb(110 72 107)",
          }}
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "rgb(207 171 131)" }} // --card
          >
            Tiny Machines - Complete Game Guide
          </h1>
          <p style={{ color: "rgb(205 152 86)" }}>Master the strategy and maximize your score</p>
        </div>

        {/* Content */}
        <div className="guide-content p-8 space-y-8">
          {/* Game Objective */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }} // --steampunk-purple-30
            >
              🎮 Game Objective
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgb(58 62 81)" }} // --secondary-foreground
            >
              Place machines on an 8×8 grid for 20 turns to maximize your score. Each machine type
              scores points based on its unique scoring rules and adjacent machines. Designs provide
              bonus points when specific machine combinations are placed strategically.
            </p>
          </section>

          {/* How to Play */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }}
            >
              📋 How to Play
            </h2>
            <div className="space-y-3">
              {[
                "Each turn, you receive 2 random machines to place on the board",
                "You also receive a Design that provides bonus points when completed",
                "Click on machines to select them, then click on the board to place them",
                "Right-click to deselect or place machines from a Design",
                "Confirm your placement and watch your score increase!",
              ].map((text, index) => (
                <div className="flex gap-4" key={index}>
                  <span
                    className="text-2xl font-bold min-w-fit"
                    style={{ color: "rgb(148 92 158)" }} // --steampunk-purple-56
                  >
                    {["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"][index]}
                  </span>
                  <p
                    className="text-lg"
                    style={{ color: "rgb(58 62 81)" }} // --secondary-foreground
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Machines */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }}
            >
              🤖 Machines & Scoring
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "🚑 Ambulance",
                  scoring:
                    "2 points for each Air machine (Helicopter, Jet, UFO) adjacent to it",
                },
                {
                  title: "🚁 Helicopter",
                  scoring:
                    "3 points for each direction with two machines of the same type",
                },
                {
                  title: "✈️ Jet",
                  scoring:
                    "Scores 3 points for each different machine type in the longest line from it with most different machine type",
                },
                {
                  title: "🚆 Train",
                  scoring:
                    "1 point if connected to 1 Train, 3 points if connected to 2 Trains, 0 otherwise",
                },
                {
                  title: "🚀 Missile",
                  scoring:
                    "2 points for each non-Air machine (Train, Slot Machine, Ambulance) adjacent to it",
                },
                {
                  title: "🛸 UFO",
                  scoring: "Doubles the score of all adjacent machines",
                },
                {
                  title: "🎰 Slot Machine",
                  scoring:
                    "For each machine type with 2+ on the board, gain squared points (4 for 2 types, 9 for 3 types, etc.)",
                },
              ].map((machine) => (
                <div
                  key={machine.title}
                  className="p-4 rounded-lg border-2"
                  style={{
                    backgroundColor: "rgb(207 171 131)", // --card
                    borderColor: "rgb(110 72 107)", // --steampunk-purple-44
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "rgb(72, 52, 77)" }} // --steampunk-purple-30
                  >
                    {machine.title}
                  </h3>
                  <p style={{ color: "rgb(58 62 81)" }}>
                    <strong style={{ color: "rgb(34 31 46)" }}>Scoring:</strong> {machine.scoring}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Scoring Tips */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }}
            >
              💡 Scoring Tips
            </h2>
            <div
              className="space-y-3 text-lg"
              style={{ color: "rgb(58 62 81)" }}
            >
              <p>
                ✨ <strong style={{ color: "rgb(34 31 46)" }}>Think ahead!</strong> Plan where to
                place machines to create synergies between them.
              </p>
              <p>
                🎯 <strong style={{ color: "rgb(34 31 46)" }}>Build clusters:</strong> Some
                machines score better when adjacent to specific types, so group them strategically.
              </p>
              <p>
                📈 <strong style={{ color: "rgb(34 31 46)" }}>Use Designs:</strong> Complete
                Design objectives to earn bonus points and increase your total score.
              </p>
              <p>
                🛸 <strong style={{ color: "rgb(34 31 46)" }}>UFO multiplier:</strong> Placing a
                UFO next to high-scoring machines can double your gains!
              </p>
              <p>
                🎰 <strong style={{ color: "rgb(34 31 46)" }}>Slot machine diversity:</strong>{" "}
                Having many different machine types on the board helps Slot Machines score more.
              </p>
            </div>
          </section>

          {/* Designs */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }}
            >
              ⚙️ Designs & Bonuses
            </h2>
            <p
              className="text-lg mb-4"
              style={{ color: "rgb(58 62 81)" }}
            >
              Designs are special combinations that provide bonus points when you have the right
              machines on the board. Complete as many designs as possible to maximize your score!
            </p>
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: "rgb(157 96 55)", // --secondary-background
                borderColor: "rgb(110 72 107)", // --steampunk-purple-44
              }}
            >
              <p style={{ color: "rgb(207 171 131)" }}>
                Some popular designs include:
                <br />
                <strong style={{ color: "rgb(205 152 86)" }}>Ambulance Helicopter:</strong> 4
                points for each Helicopter adjacent to an Ambulance
                <br />
                <strong style={{ color: "rgb(205 152 86)" }}>Sonic Rail:</strong> 5 points for
                each horizontal or vertical line of 2+ Trains
                <br />
                <strong style={{ color: "rgb(205 152 86)" }}>Jet Missile Barrage:</strong> 4
                points for each Missile adjacent to a Jet
                <br />
                <strong style={{ color: "rgb(205 152 86)" }}>...and many more alien variants!</strong>
              </p>
            </div>
          </section>

          {/* Strategy */}
          <section>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(72, 52, 77)" }}
            >
              🏆 Advanced Strategy
            </h2>
            <div
              className="space-y-3 text-lg"
              style={{ color: "rgb(58 62 81)" }}
            >
              <p>
                🎪 <strong style={{ color: "rgb(34 31 46)" }}>Synergy stacking:</strong> Combine
                multiple machines to create cascading point bonuses
              </p>
              <p>
                🗺️ <strong style={{ color: "rgb(34 31 46)" }}>Board positioning:</strong> Reserve
                space for future placements that will maximize scores
              </p>
              <p>
                ⏰ <strong style={{ color: "rgb(34 31 46)" }}>Turn management:</strong> With 20
                turns total, plan your placement strategy early
              </p>
              <p>
                🎲 <strong style={{ color: "rgb(34 31 46)" }}>Adapt quickly:</strong> Adjust your
                strategy based on the random machines and designs you receive
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div
          className="guide-footer p-6 text-center border-t"
          style={{
            backgroundColor: "rgb(164 122 69)", // --background-darker
            borderColor: "rgb(110 72 107)",
          }}
        >
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            style={{
              backgroundColor: "rgb(72, 52, 77)", // --steampunk-purple-30
              color: "rgb(207 171 131)", // --card
              border: "2px solid rgb(110 72 107)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(110 72 107)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(72, 52, 77)";
            }}
          >
            ✨ Close Guide & Play!
          </button>
        </div>
      </div>
    </div>
  );
};