import { Machine } from "./Machine";

/**
 * Missile machine:
 * - Icon: 🚀
 * - Description: "2 points for each non-air machine around it(🚆,🎰 and 🚑)"
 * - Scoring: Scores 2 points for each machine around it that is not an air unit (Train, Slot Machine, Ambulance)
 */
export class Missile extends Machine {
    static readonly nonAirMachines = new Set<string>(["🚆", "🎰", "🚑"]);

    constructor(index: number) {
        super(index);
        this.name = "Missile";
        this.description = "2 points for each non-air machine around it(🚆,🎰 and 🚑)";
        this.icon = "🚀";
    }

    
    getBaseScore(machinesOnBoard: (Machine | null)[]): number {
        return this.scoringIndexes(machinesOnBoard).length * 2;
    }

    getHighlightedIndexes(machinesOnBoard: (Machine | null)[]): number[]{
        return this.scoringIndexes(machinesOnBoard);
    }

    scoringIndexes(machinesOnBoard: (Machine | null)[]) : number[]{
        return this.indexesAround(this.index, machinesOnBoard).filter(index=>{
            return index !== -1 && machinesOnBoard[index] 
                && Missile.nonAirMachines.has(machinesOnBoard[index]!.icon);
        })
    }
}