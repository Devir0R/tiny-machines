import { useState } from "react"
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";
import { useSound } from 'react-sounds';
import trainSound from '../assets/train.mp3';
import ufoSound from '../assets/ufo.mp3';
import ambulanceSound from '../assets/ambulance.mp3';
import helicopterSound from '../assets/helicopter.mp3';
import jetSound from '../assets/jet.mp3';
import missileSound from '../assets/missile.mp3';
import slotMachineSound from '../assets/slotMachine.mp3';

interface BoardProps {
  machines: (Machine | null)[];
  currentMachine: MACHINE | null;
  setMachineAtIndexTentatively: (index: number, machine: MACHINE) => void;
  tentativelyPlacedMachines: ([number, Machine | null] | null)[];
  onBoardHoverChange: (hovered: boolean) => void;
  placingFromDesign: { designIndex: number, machineIcon: string } | null;
}

export const Board = ({ machines, currentMachine, setMachineAtIndexTentatively, tentativelyPlacedMachines ,onBoardHoverChange, placingFromDesign}: BoardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const {play : playTrain} = useSound(trainSound);
  const {play : playAmbulance} = useSound(ambulanceSound, {volume: .2});
  const {play : playUfo} = useSound(ufoSound, {volume: .2});
  const {play : playJet} = useSound(jetSound);
  const {play : playHelicopter} = useSound(helicopterSound);
  const {play : playMssile} = useSound(missileSound, {volume: .2});
  const {play : playSlotMachine} = useSound(slotMachineSound, {volume: .2});

  console.log("current machine", currentMachine);
  console.log("current design machine", placingFromDesign);
  
    function playMachineSounds(machine?: MACHINE | null) {
        if(!machine) return;

        switch(machine){
            case "✈️": playJet();
            break;
            case "🎰": playSlotMachine();
            break;
            case "🚀": playMssile();
            break;
            case "🚁": playHelicopter();
            break;
            case "🚆": playTrain();
            break;
            case "🚑": playAmbulance();
            break;
            case "🛸": playUfo();
            break;
        }
    }

    return (
        <div
          className="relative aspect-square w-full max-w-[30vw] mx-auto mt-10"
          onMouseEnter={() => onBoardHoverChange(true)}
          onMouseLeave={() => {
            onBoardHoverChange(false)
            setHoveredIndex(null)
          }}
        >
            <div className={`grid grid-cols-8 gap-2 p-4 bg-gray-200 rounded-lg text-center board`}>
                {machines.map((machine, index) =>
                    <div className={`cell`} key={`machine-div-${index}`}>
                        <button
                        key={`button-machine-${index}`} 
                        className={`w-full h-full flex items-center justify-center
                             p-2 border border-gray-400 rounded transition 
                             ${isTentativelyPicked(index) ? 'tentative-button' : ''} 
                             ${hoveredIndex === index && !machine ? 'bg-blue-100' : ''}
                             ${hoveredIndex && machines[hoveredIndex]?.getHighlightedIndexes(machines).includes(index) ? 'light-sp-purple': ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={()=>{
                            if(currentMachine)  {
                                setMachineAtIndexTentatively(index,currentMachine)
                            } else if (placingFromDesign) {
                                setMachineAtIndexTentatively(index, placingFromDesign.machineIcon as MACHINE)
                            }
                            playMachineSounds((currentMachine || placingFromDesign?.machineIcon) as MACHINE);
                        }}>
                            {machine?.icon ?? 
                            ((currentMachine && hoveredIndex === index)?
                                <span className="opacity-40">{currentMachine}</span> 
                                :
                                placingFromDesign && hoveredIndex === index ? 
                                    <span className="opacity-40">{placingFromDesign.machineIcon}</span> 
                                    :
                                    "󠀠")}
                        </button>
                    </div>
                )}
            </div>

        </div>
    )

    function isTentativelyPicked(index: number) {        
        const result = tentativelyPlacedMachines.some(placed => placed && placed[0] === index);
        return result;
    }
}
