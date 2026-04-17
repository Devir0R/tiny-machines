import { Machine } from "./Machine";

/**
 * Train machine:
 * - Icon: 🚆
 * - Description: "6 points if adjacent to exactly two 🚆"
 * - Scoring: Scores 6 points if it is adjacent to exactly two other Train machines (🚆) in the four cardinal directions (up, down, left, right)
 */
export class Train extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Train";
        this.description = "6 points if adjacent to exactly two 🚆";
        this.icon = "🚆";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const directions = [this.Up, this.Down, this.Right, this.Left];
        let connectedTrains = 0;

        for (const direction of directions) {
            let currentIndex = direction(this.index, machinesOnBoard);
            if (machinesOnBoard[currentIndex] && machinesOnBoard[currentIndex]!.icon === this.icon) {
                connectedTrains++;
            } 
        }

        if (connectedTrains === 2) {
            score = 6;
        }

        return score;
    }
}