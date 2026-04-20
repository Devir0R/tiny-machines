import { DesignCard } from "./Design";
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";
import type { Design } from "../designs/Design";
import { useEffect, useState } from "react";

interface ChoiceAreaProps {
  pickableDesign: Design | null;
  pickableMachines: (MACHINE | null)[];
  addDesign: (design: Design) => boolean;
  setCurrentMachine: (index: number) => void;
  tentativelyPlacedMachines: ([number, Machine | null] | null)[];
  currentMachine: number;
}

export const ChoiceArea = ({ pickableDesign, pickableMachines, addDesign, setCurrentMachine, tentativelyPlacedMachines, currentMachine }: ChoiceAreaProps) => {
    const [showsError, setShowError] = useState(false);
    
    useEffect(()=>{
        setShowError(false);
    },[pickableDesign,currentMachine,pickableMachines,tentativelyPlacedMachines])
    return (
    <div className="rounded-sm choice-area row-span-1 p-1 text-center flex flex-row items-center max-w-md">
        <div>
            <h2 className="text-xl font-bold mb-4">Choose 2 Machine or a Design</h2>
            {showsError && <p className="text-red-500">you can't have more than 5 designs.</p>}

        </div>
      <div className="interactable-area flex flex-row items-center m-10 outline-2 outline-dashed outline-gray-400 p-4 rounded-lg max-w-sm">
        <div className="grid gap-4 mb-1">
          {pickableDesign && 
            <DesignCard 
                design={pickableDesign}
                onClick={() => {
                    if(pickableDesign) setShowError(!addDesign(pickableDesign))
                }}/>}
        </div>
        <div className="grid grid-rows-2 m-2 gap-4">
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