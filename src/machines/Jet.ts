import { Machine } from "./Machine";

/**
 * Jet machine:
 * - Icon: ✈️
 * - Description: "1 point for each space in the longest straight empty line from it"
 * - Scoring: Scores 1 point for each space in the longest straight line of empty spaces from it (including diagonals), stopping at the first occupied space
 */
export class Jet extends Machine {
    constructor (index: number){
        super(index);
        this.name = "Jet";
        this.description = "1 point for each space in the longest straight empty line from it";
        this.icon = "✈️";
    }


    score(machinesOnBoard: (Machine | null)[]): number {
        let upLength = 1;
        let downLength = 1;
        let rightLength = 1;
        let leftLength = 1;

        // Check up
        let upIndex = this.Up(this.index, machinesOnBoard);
        while (upIndex !== -1 && machinesOnBoard[upIndex] === null) {
            upLength++;
            upIndex = this.Up(upIndex, machinesOnBoard);
        }

        // Check down
        let downIndex = this.Down(this.index, machinesOnBoard);
        while (downIndex !== -1 && machinesOnBoard[downIndex] === null) {
            downLength++;
            downIndex = this.Down(downIndex, machinesOnBoard);
        }

        // Check right
        let rightIndex = this.Right(this.index, machinesOnBoard);
        while (rightIndex !== -1 && machinesOnBoard[rightIndex] === null) {
            rightLength++;
            rightIndex = this.Right(rightIndex, machinesOnBoard);
        }

        // Check left
        let leftIndex = this.Left(this.index, machinesOnBoard);
        while (leftIndex !== -1 && machinesOnBoard[leftIndex] === null) {
            leftLength++;
            leftIndex = this.Left(leftIndex, machinesOnBoard);
        }

        // Calculate the longest line
        const longestLine = Math.max(upLength, downLength, rightLength, leftLength);

        return longestLine;
    }
}