import { Machine } from "./Machine";    

/**
 * Helicopter machine:
 * - Icon: 🚁
 * - Description: "2 points for each empty spot around it surrounded by at least 3 machines"
 * - Scoring: Scores 2 points for each adjacent empty space that is surrounded by at least 3 machines (including diagonals)
 */
export class Helicopter extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Helicopter";
        this.description = "2 points for each empty spot around it surrounded by at least 3 machines";
        this.icon = "🚁";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const indexesAround = this.indexesAround(this.index, machinesOnBoard);

        for (const index of indexesAround) {
            if (index !== -1 && machinesOnBoard[index] === null) {
                const surroundingIndexes = this.indexesAround(index, machinesOnBoard);
                let surroundingMachinesCount = 0;
                for (const surroundingIndex of surroundingIndexes) {
                    if (surroundingIndex !== -1 && machinesOnBoard[surroundingIndex] !== null) {
                        surroundingMachinesCount++;
                    }
                }
                if (surroundingMachinesCount >= 3) {
                    score += 2;
                }
            }
        }

        return score;
    }
}