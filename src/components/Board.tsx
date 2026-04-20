import { useState } from "react"
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";

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

  console.log("current machine", currentMachine);
  console.log("current design machine", placingFromDesign);
  
    return (
        <div
          className="relative aspect-square w-full max-w-md mx-auto mt-10"
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
                        className={`w-full h-full flex items-center justify-center p-2 border border-gray-400 rounded transition ${isTentativelyPicked(index) ? 'tentative-button' : ''} ${hoveredIndex === index && !machine ? 'bg-blue-100' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={()=>{
                            if(currentMachine)  {
                                setMachineAtIndexTentatively(index,currentMachine)
                            } else if (placingFromDesign) {
                                setMachineAtIndexTentatively(index, placingFromDesign.machineIcon as MACHINE)
                            }
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
