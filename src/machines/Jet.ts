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
        this.description = "the number of different machines in a line coming out of it with most different machines squared";
        this.icon = "✈️";
    }


    myScore(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const directions = [this.Up, this.Down, this.Right, this.Left];
        for (const direction of directions) {
            let currentIndex = direction(this.index, machinesOnBoard);
            const seenMachines = new Set<string>();
            let currentLength = 0;

            while (currentIndex !== -1) {
                if (machinesOnBoard[currentIndex] === null) {
                    break;
                }

                const machine = machinesOnBoard[currentIndex];
                if (machine && !seenMachines.has(machine.icon)) {
                    seenMachines.add(machine.icon);
                    currentLength+=1;
                } else {
                    break;
                }

                currentIndex = direction(currentIndex, machinesOnBoard);
            }

            score = Math.max(score, currentLength);
        }

        return score * score;
    }
}