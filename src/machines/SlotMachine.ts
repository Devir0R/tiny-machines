import { Machine } from "./Machine";

export class SlotMachine extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "SlotMachine";
        this.description = "1 point for each different machine in a line coming out of it with most different machines";
        this.icon = "🎰";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
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
                    currentLength++;
                } else {
                    break;
                }

                currentIndex = direction(currentIndex, machinesOnBoard);
            }

            score = Math.max(score, currentLength);
        }

        return score+1;
    }

}