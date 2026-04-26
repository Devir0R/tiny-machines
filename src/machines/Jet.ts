import { MACHINE } from "../interfaces/Machines";
import { Machine } from "./Machine";

/**
 * Jet machine:
 * - Icon: ✈️
 * - Description: "the number of different machines in a line coming out of it with most different machines squared"
 * - Scoring: Scores the square of the number of different machines in the longest straight line of machines from it , stopping at the first empty space. Only counts different machine types, so multiple machines of the same type in the line only count as 1.
 */
export class Jet extends Machine {
    constructor (index: number){
        super(index);
        this.name = "Jet";
        this.description = "the number of different machines in a line coming out of it with most different machines times 3";
        this.icon = "✈️";
    }


    getBaseScore(machinesOnBoard: (Machine | null)[]): number {
        const scoringIndexes = this.scoringIndexes(machinesOnBoard);
        const distinctMachines = new Set<MACHINE|undefined>(scoringIndexes.map(index=>machinesOnBoard[index]?.icon))

        return distinctMachines.size * 3;
    }

    getHighlightedIndexes(machinesOnBoard: (Machine | null)[]): number[]{
        return this.scoringIndexes(machinesOnBoard);
    }

    scoringIndexes(machinesOnBoard: (Machine | null)[]) : number[]{
        const directions = [this.Up, this.Down, this.Right, this.Left];
        const indexesEachDirection : number[][] = directions.map(direction=>{
            let currentIndex = direction(this.index, machinesOnBoard);
            const indexesInDirection : number[] =[]
            while (currentIndex !== -1 && machinesOnBoard[currentIndex] !== null) {
                indexesInDirection.push(currentIndex)
                currentIndex = direction(currentIndex, machinesOnBoard);
            }
            return indexesInDirection;
        });
        return indexesEachDirection.reduce((acc,curr)=>{
            if(
                new Set(acc.map(i=>machinesOnBoard[i]?.icon)).size 
                < 
                new Set(curr.map(i=>machinesOnBoard[i]?.icon)).size)
                    return curr;
            else return acc;
        }, []);
    }
}