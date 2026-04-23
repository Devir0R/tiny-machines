import { useState } from "react";
import { MACHINE } from "../interfaces/Machines";

interface MachineTutorialProps {
  onClose: () => void;
}

interface MachineExample {
  icon: MACHINE;
  name: string;
  scoringRule: string;
  boardSetup: (MACHINE| null)[];
  exampleScore: string;
}

export const TutorialGuide = ({ onClose }: MachineTutorialProps) => {
  const [currentMachineIndex, setCurrentMachineIndex] = useState(0);

  const machineExamples: MachineExample[] = [
    {
      icon: MACHINE.AMBULANCE,
      name: "Ambulance",
      scoringRule: "Scores 2 points for each Air machine (Helicopter, Jet) around it",
      boardSetup: [
        null, MACHINE.HELICOPTER, null,
        MACHINE.AMBULANCE,  MACHINE.JET,null,
        null, null, null
      ],
      exampleScore: "Score: 4 points (2 air machines around it)"
    },
    {
      icon: MACHINE.HELICOPTER,
      name: "Helicopter",
      scoringRule: "Scores 3 points for each empty spot around it that is surrounded by at least 3 machines",
      boardSetup: [
        MACHINE.AMBULANCE, MACHINE.JET, MACHINE.MISSILE,
        MACHINE.TRAIN, MACHINE.HELICOPTER, null,
        MACHINE.UFO, null, MACHINE.SLOT_MACHINE
      ],
      exampleScore: "Score: 6 points (2 empty spots with 3+ adjacent machines)"
    },
    {
      icon: MACHINE.JET,
      name: "Jet",
      scoringRule: "Scores the square of the number of different machine types in the longest line from it",
      boardSetup: [
        MACHINE.JET, MACHINE.AMBULANCE, MACHINE.HELICOPTER,
        null, null, null,
        null, null, null
      ],
      exampleScore: "Score: 4 points (3 different types: Ambulance, Helicopter → 2² = 4)"
    },
    {
      icon: MACHINE.TRAIN,
      name: "Train",
      scoringRule: "Legal Train are the 🚆 adjacent to up to 2 🚆, and each 🚆 score for the 🚆 connected to it via legal trains",
      boardSetup: [
        MACHINE.TRAIN, MACHINE.TRAIN,MACHINE.TRAIN, 
        MACHINE.TRAIN, null, MACHINE.TRAIN, 
        null, null, null
      ],
      exampleScore: "Score: 5 points (5 connected Trains), also each other train gives 5 points!"
    },
    {
      icon: MACHINE.MISSILE,
      name: "Missile",
      scoringRule: "Scores 2 points for each non-Air machine (Train, Slot Machine, Ambulance, Missile) around it",
      boardSetup: [
        MACHINE.AMBULANCE, MACHINE.TRAIN, null,
        MACHINE.SLOT_MACHINE, MACHINE.MISSILE, null,
        null, null, null
      ],
      exampleScore: "Score: 6 points (3 non-air machines around it)"
    },
    {
      icon: MACHINE.SLOT_MACHINE,
      name: "Slot Machine",
      scoringRule: "For each machine type with 2+ on the board, gain squared points (4 for 2 types, 9 for 3 types, etc.)",
      boardSetup: [
        MACHINE.AMBULANCE, MACHINE.AMBULANCE, MACHINE.JET,
        MACHINE.TRAIN, MACHINE.SLOT_MACHINE, MACHINE.TRAIN,
        null, null, null
      ],
      exampleScore: "Score: 8 points (2 types with 2+ each: Ambulance, Train → 4 + 4 = 8)"
    },
    {
      icon: MACHINE.UFO,
      name: "UFO",
      scoringRule: "Doubles the score of all adjacent machines (they score, then their score is doubled)",
      boardSetup: [
        MACHINE.AMBULANCE,null, null,
        MACHINE.JET, MACHINE.UFO,  MACHINE.TRAIN,
        null, null, null
      ],
      exampleScore: "Score: Ambulance scores base 1, doubled → 2. Jet scores base 4 → 8. Train scores base 1 → 2. so it doubles 1+4+1=6 to 12."
    },
  ];

  const current = machineExamples[currentMachineIndex];

  const renderMiniBoard = (setup: (MACHINE | null)[]) => {
    return (
      <div className="grid grid-cols-3 gap-1 p-2 rounded" style={{ backgroundColor: 'var(--secondary-background)' }}>
        {setup.map((machine, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center justify-center rounded text-lg border border-gray-400"
            style={{ backgroundColor: 'var(--background)', borderColor: 'var(--card)' }}
          >
            {machine || ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tutorial-guide fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="tutorial-wrapper max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        {/* Header */}
        <div className="tutorial-header p-6 text-center" style={{ background: 'linear-gradient(to right, var(--steampunk-purple-18), var(--secondary-background))' }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--card)' }}>Machine Tutorial</h1>
          <p style={{ color: 'var(--background)' }}>Learn how each machine scores</p>
        </div>

        {/* Content */}
        <div className="tutorial-content p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Side - Machine Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{current.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--steampunk-purple-18)' }}>{current.name}</h2>
                  </div>
                </div>

                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--secondary-background)' }}>
                  <p className="font-semibold leading-relaxed" style={{ color: 'var(--card)' }}>
                    {current.scoringRule}
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                  <p className="font-bold text-lg" style={{ color: 'var(--steampunk-purple-18)' }}>{current.exampleScore}</p>
                </div>
              </div>

              {/* Machine Counter */}
              <div className="text-center mt-8" style={{ color: 'var(--steampunk-purple-18)' }}>
                <p className="text-sm">Machine {currentMachineIndex + 1} of {machineExamples.length}</p>
              </div>
            </div>

            {/* Right Side - Example Board */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--steampunk-purple-18)' }}>Example Board (3×3)</h3>
              {renderMiniBoard(current.boardSetup)}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="tutorial-footer p-6 flex justify-between items-center" style={{ backgroundColor: 'var(--secondary-foreground)' }}>
          <button
            onClick={() =>
              setCurrentMachineIndex((prev) =>
                prev === 0 ? machineExamples.length - 1 : prev - 1
              )
            }
            className="px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: 'var(--background)', color: 'var(--steampunk-purple-18)' }}
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {machineExamples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMachineIndex(index)}
                className="w-3 h-3 rounded-full transition-colors"
                style={{ 
                  backgroundColor: index === currentMachineIndex ? 'var(--card)' : 'var(--steampunk-gray)'
                }}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() =>
                setCurrentMachineIndex((prev) =>
                  prev === machineExamples.length - 1 ? 0 : prev + 1
                )
              }
              className="px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: 'var(--background)', color: 'var(--steampunk-purple-18)' }}
            >
              Next →
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: 'var(--steampunk-gray)', color: 'var(--card)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
