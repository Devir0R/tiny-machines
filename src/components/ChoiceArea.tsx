import type { DESIGN } from "../interfaces/Designs";
import type { MACHINE } from "../interfaces/Machines";
import type { Machine } from "../machines/Machine";

interface ChoiceAreaProps {
    pickableDesign: DESIGN | null;
    pickableMachines: (MACHINE | null)[];
    addDesign: (design: DESIGN) => void;
    setCurrentMachine: (index: number) => void;
    tentativelyPlacedMachines: ([number, Machine | null] | null)[];
    currentMachine: number;
}

export const ChoiceArea = ({ pickableDesign, pickableMachines, addDesign, setCurrentMachine, tentativelyPlacedMachines , currentMachine }: ChoiceAreaProps) => {
    return (
        <div className="col-span-1 bg-gray-200 p-4 text-center flex flex-col items-center max-w-md">
            <h2 className="text-xl font-bold mb-4">Choose 2 Machine or a Design</h2>
            <div className="flex flex-col items-center m-10 outline-2 outline-dashed outline-gray-400 p-4 rounded-lg max-w-sm">
                <div className="grid  gap-4 mb-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={()=>addDesign(pickableDesign!)}>{pickableDesign ?? "No Design Chosen"}</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {pickableMachines.map((machine, index) => (
                        machine ? (
                            <button key={`machine-choose-${index}`} 
                            className={`${tentativelyPlacedMachines[index] ? 'bg-blue-700' : 'bg-blue-500'} text-white py-2 px-4 rounded hover:bg-blue-600 ${currentMachine === index ? 'ring-4 ring-black' : ''}`}                            onClick={() => {                                
                                setCurrentMachine(index)}}>
                                {machine}
                            </button>
                        ) : null
                    ))}
                </div>                
            </div>

        </div>
    )
}