import { Machine } from "./Machine";

/**
 * UFO machine:
 * - Icon: 🛸
 * - Description: "double adjacent machines score"
 * - Scoring: Doubles the score of all adjacent machines (Train, Slot Machine, Ambulance, Jet, Helicopter, Missile).
 */
export class UFO extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "UFO";
        this.description = "Double the score of all adjacent machines";
        this.icon = "🛸";
    }

    myScore(machinesOnBoard: (Machine | null)[]): number {
        const adjacentIndexes = [this.Up(this.index, machinesOnBoard),
            this.Down(this.index, machinesOnBoard),
            this.Right(this.index, machinesOnBoard),
            this.Left(this.index, machinesOnBoard)];

        for (const adjacentIndex of adjacentIndexes) {
            if (adjacentIndex !== -1 && machinesOnBoard[adjacentIndex] ) {
                machinesOnBoard[adjacentIndex]!.addScoreEnhancer((s) => s * 2);
            }
        }
        return 0;
    }
}