import { Machine } from "./Machine";

/**
 * Train machine:
 * - Icon: 🚆
 * - Description: "scores 0 unless connected to 1 or 2 🚆. for each 🚆 that is connected to 1 or 2 🚆 via 🚆 get that many points"
 * - Scoring: Scores points based on the number of connected Train machines. A Train scores 1 point if it is connected to exactly one other Train, and 3 points if it is connected to exactly two other Trains. If a Train is not connected to any other Trains or is connected to more than two Trains, it scores 0 points.
*/
export class Train extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Train";
        this.description = "scores 0 unless connected to 1 or 2 🚆. for each 🚆 that is connected to 1 or 2 🚆 via 🚆 get that many points";
        this.icon = "🚆";
    }

    myScore(machinesOnBoard: (Machine | null)[]): number {
        let connectedTrains = 0;

        const visited = new Set<number>();

        const dfs = (index: number) => {
            visited.add(index);
            const currentMachine = machinesOnBoard[index];
            if (!currentMachine || currentMachine.icon !== this.icon) {
                return;
            }
            const directionsWithTrains = 
                [currentMachine.Up, currentMachine.Down, currentMachine.Right, currentMachine.Left]
                .map(direction => direction(index, machinesOnBoard))
                .filter(adjacentIndex =>
                   adjacentIndex !== -1 && machinesOnBoard[adjacentIndex] && machinesOnBoard[adjacentIndex]!.icon === this.icon);
            if(directionsWithTrains.length > 2) {
                return;
                // If there are more than 2 adjacent Trains, this Train scores 0 points, and the search stops.
            }
            else {
                connectedTrains++;
            }        

            for (const adjacentIndex of directionsWithTrains) {
                if (!visited.has(adjacentIndex)) {
                    dfs(adjacentIndex);
                }
            }
        };
        dfs(this.index);
        

        return connectedTrains;
    }
}