import { DesignCard } from "./Design";
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";
import type { Design } from "../designs/Design";
import { useEffect, useState } from "react";
import { MachineFactory } from "../machines/MachineFactory";
import { useSound } from 'react-sounds';
import machineTouch from '../assets/touchMachine.mp3';

interface ChoiceAreaProps {
  pickableDesign: Design | null;
  pickableMachines: (MACHINE | null)[];
  addDesign: (design: Design) => boolean;
  setCurrentMachine: (index: number) => void;
  tentativelyPlacedMachines: ([number, Machine | null] | null)[];
  currentMachine: number;
  designPotentialScore?: number;
}

export const ChoiceArea = ({ pickableDesign, pickableMachines, addDesign, setCurrentMachine, tentativelyPlacedMachines, currentMachine, designPotentialScore }: ChoiceAreaProps) => {
    const [showsError, setShowError] = useState(false);
    const [showMachineDescription, setShowMachineDescription] = useState(false)
    const [hoveredDom, setHoveredDom] = useState<DOMRect | null>(null)
    const [hoveredMachine,setHoveredMachine] = useState<Machine|null>();
    const {play: playMachineTouch} = useSound(machineTouch, {volume: .3});
      
    useEffect(()=>{
        setShowError(false);
    },[pickableDesign,currentMachine,pickableMachines,tentativelyPlacedMachines])
    return (
    <div className="rounded-sm choice-area row-span-1 p-1 text-center flex flex-row items-center max-w-[30vw]">
        <div>
            <h2 className="text-xl font-bold mb-4">Choose 2 Machine or a Design</h2>
            {showsError && <p className="text-red-500">you can't have more than 5 designs.</p>}

        </div>
      <div className="interactable-area flex flex-row items-center m-10 outline-2 outline-dashed outline-gray-400 p-4 rounded-lg max-w-[20vw]">
        <div className="grid gap-4 mb-1">
          {pickableDesign && 
            <DesignCard 
                design={pickableDesign}
                potentialScore={designPotentialScore}
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

                onMouseEnter={(e)=>{
                  playMachineTouch();
                  setHoveredDom(e.currentTarget.getBoundingClientRect());
                  setShowMachineDescription(true);
                  setHoveredMachine(MachineFactory.create(machine,0))
                }}
                onMouseLeave={()=>{
                  setHoveredDom(null);
                  setShowMachineDescription(false);
                  setHoveredMachine(null)

                }}
              >
                {machine}
              </button>
            ) : null
          ))}
        </div>
      </div>

    {showMachineDescription && hoveredDom &&(
          <div
            className="text-white fixed z-50 pointer-events-none rounded-sm p-1 text-sm opacity-80 info-rec max-w-[8vw]"
            style={{ left: hoveredDom.x  , top: hoveredDom.bottom , translate: '-2rem'}}
          >
            {hoveredMachine?.description}
          </div>
        )}
    </div>
  );
};