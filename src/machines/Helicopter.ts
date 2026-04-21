import { Machine } from "./Machine";    

/**
 * Helicopter machine:
 * - Icon: 🚁
 * - Description: "3 points for each empty spot around it surrounded by at least 3 machines"
 * - Scoring: Scores 3 points for each adjacent empty space that is surrounded by at least 3 machines (including diagonals)
 */
export class Helicopter extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Helicopter";
        this.description = "3 points for each empty spot around it surrounded by at least 3 machines";
        this.icon = "🚁";
    }

    getBaseScore(machinesOnBoard: (Machine | null)[]): number {
        return this.scoringIndexes(machinesOnBoard).length * 3;
    }

    getHighlightedIndexes(machinesOnBoard: (Machine | null)[]): number[]{
        return this.scoringIndexes(machinesOnBoard);
    }

    scoringIndexes(machinesOnBoard: (Machine | null)[]) : number[]{
        return this.indexesAround(this.index, machinesOnBoard)
        .filter(index=>{
            if (index !== -1 && machinesOnBoard[index] === null) {
                const surroundingIndexes = this.indexesAround(index, machinesOnBoard);
                let surroundingMachinesCount = 0;
                for (const surroundingIndex of surroundingIndexes) {
                    if (surroundingIndex !== -1 && machinesOnBoard[surroundingIndex] !== null) {
                        surroundingMachinesCount++;
                    }
                }
                if (surroundingMachinesCount >= 3) return true;
            }
            return false;
        });
    }  
}