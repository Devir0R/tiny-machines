import { Machine } from "./Machine";

/**
 * UFO machine:
 * - Icon: 🛸
 * - Description: "1 point for each empty space around it"
 * - Scoring: Scores 1 point for each adjacent empty space (up, down, left, right)
 */
export class UFO extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "UFO";
        this.description = "1 point for each empty space around it";
        this.icon = "🛸";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        // Implementation for UFO scoring logic
        let score = 0;
        for (const index of this.indexesAround(this.index, machinesOnBoard)) {
            if (index !== -1 && machinesOnBoard[index] === null) {
                score++;
            }
        }
        return score;
    }
}