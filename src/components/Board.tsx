import { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";

interface BoardProps {
  machines: (Machine | null)[];
  currentMachine: MACHINE | null;
  setMachineAtIndexTentatively: (index: number, machine: MACHINE) => void;
    tentativelyPlacedMachines: ([number, Machine | null] | null)[];
}

const BOARD_LENGTH = 8;

export const Board = ({ machines, currentMachine, setMachineAtIndexTentatively, tentativelyPlacedMachines }: BoardProps) => {

    return (
        <div className="aspect-square w-full max-w-md mx-auto mt-10">
            <div className={`grid grid-cols-8 gap-2 p-4 bg-gray-200 rounded-lg text-center`}>
                {machines.map((machine, index) =>
                    <div className={`cell`} key={`machine-div-${index}`}>
                        <button
                        key={`button-machine-${index}`} 
                        className={`w-full h-full flex items-center justify-center p-2 hover:bg-gray-300 border border-gray-400 rounded ${isTentativelyPicked(index) ? 'bg-gray-500' : 'bg-white'}`}
                        onClick={()=>{
                            if(currentMachine)  {
                                setMachineAtIndexTentatively(index,currentMachine)
                            }
                        }}>
                            {machine?.icon ?? "󠀠"}
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
