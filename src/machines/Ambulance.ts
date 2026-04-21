import { Machine } from "./Machine";

/**
 * Ambulance machine:
 * - Icon: 🚑
 * - Description: "2 point for each air machine around it"
 * - Scoring: Scores 2 point for each adjacent machine that is an air machine (Jet, UFO, Helicopter)
 */
export class Ambulance extends Machine {
    static readonly airMachines = new Set<string>(["✈️", "🛸","🚁"]);

    constructor(index: number) {
        super(index);
        this.name = "Ambulance";
        this.description = "2 point for each air unit around it";
        this.icon = "🚑";
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
                && Ambulance.airMachines.has(machinesOnBoard[index]!.icon);
        })
    }
}