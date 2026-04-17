import { Machine } from "./Machine";

/**
 * UFO machine:
 * - Icon: 🛸
 * - Description: "scores as much as the sum of all adjacent machines"
 * - Scoring: Scores as much as the sum of all adjacent machines (in the four cardinal directions: up, down, left, right)
 */
export class UFO extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "UFO";
        this.description = "Scores as much as the sum of all adjacent machines";
        this.icon = "🛸";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;

        const adjacentIndexes = [this.Up(this.index, machinesOnBoard),
            this.Down(this.index, machinesOnBoard),
            this.Right(this.index, machinesOnBoard),
            this.Left(this.index, machinesOnBoard)];

        for (const adjacentIndex of adjacentIndexes) {
            if (adjacentIndex !== -1 && machinesOnBoard[adjacentIndex]) {
                score += machinesOnBoard[adjacentIndex]!.score(machinesOnBoard);
            }
        }
        return score;
    }
}