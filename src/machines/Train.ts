import { Machine } from "./Machine";

export class Train extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Train";
        this.description = "4 points if adjacent to exactly two 🚆";
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
            score = 4;
        }

        return score;
    }
}