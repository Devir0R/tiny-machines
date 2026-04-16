import { Machine } from "./Machine";

export class Ship extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Ship";
        this.description = "1 point for each space in the longest continuous empty path from it";
        this.icon = "⛴";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const visited: Set<number> = new Set();
        visited.add(this.index);

        //DFS to find the longest path
        const dfsRecursive = (index: number,depth: number): void => {
            visited.add(index);
            const neighbors = [
                this.Up(index, machinesOnBoard), 
                this.Down(index, machinesOnBoard), 
                this.Right(index, machinesOnBoard), 
                this.Left(index, machinesOnBoard)
            ].filter(i => i !== -1 && machinesOnBoard[i] === null) as number[];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfsRecursive(neighbor, depth + 1);
                }
            }
            score = Math.max(score, depth);
        };
        dfsRecursive(this.index,0);


        return score;
    }
}