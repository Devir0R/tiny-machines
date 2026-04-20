import type { Design } from "../designs/Design";
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";

interface ChoiceAreaProps {
  pickableDesign: Design | null;
  pickableMachines: (MACHINE | null)[];
  addDesign: (design: Design) => void;
  setCurrentMachine: (index: number) => void;
  tentativelyPlacedMachines: ([number, Machine | null] | null)[];
  currentMachine: number;
}

export const ChoiceArea = ({ pickableDesign, pickableMachines, addDesign, setCurrentMachine, tentativelyPlacedMachines, currentMachine }: ChoiceAreaProps) => {
  return (
    <div className="rounded-sm choice-area col-span-1 p-4 text-center flex flex-col items-center max-w-md">
      <h2 className="text-xl font-bold mb-4">Choose 2 Machine or a Design</h2>
      <div className="interactable-area flex flex-col items-center m-10 outline-2 outline-dashed outline-gray-400 p-4 rounded-lg max-w-sm">
        <div className="grid gap-4 mb-4">
          <button
            className="light-sp-purple text-white py-2 px-4 rounded hover:bg-[#39344d]"
            onClick={() => pickableDesign && addDesign(pickableDesign)}
            disabled={!pickableDesign}
          >
            {pickableDesign ? pickableDesign.name : "No Design Chosen"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {pickableMachines.map((machine, index) => (
            machine ? (
              <button
                key={`machine-choose-${index}`}
                className={`${tentativelyPlacedMachines[index] ? 'dark-sp-purple' : 'light-sp-purple'} text-white py-2 px-4 rounded hover:bg-[#39344d] ${currentMachine === index ? 'ring-4 ring-black' : ''}`}
                onClick={() => {
                  setCurrentMachine(index);
                }}
              >
                {machine}
              </button>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};