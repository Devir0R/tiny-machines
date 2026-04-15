import { DesignTypes } from "../data/DesignTypes";
import type { DESIGN } from "../interfaces/Designs";
import { DesignCard } from "./Design";


interface DesignProps {
   designs: DESIGN[] ;
}

export const DesignsArea = ({designs} : DesignProps) => {
    return (
        <div className="col-span-1 bg-gray-200 p-4 text-center flex flex-col items-center max-w-2md max-h-96">
            <h2 className="text-xl font-bold mb-1">Designs</h2>
            <div className="grid grid-cols-5 gap-4 mb-4 items-center outline-2 outline-dashed outline-gray-400 p-4 rounded-lg max-w-2sm">
                <div className="grid grid-cols-5 gap-4 mb-4">
                    {designs.map((design, index) => {
                        const designInfo = DesignTypes[design];
                        return <DesignCard 
                            key={index} 
                            name={designInfo.name} 
                            description={designInfo.description} 
                            icon={designInfo.icon} 
                            rarity={designInfo.rarity} 
                        />
                    })}
                </div>
            </div>
        </div>
    )
}