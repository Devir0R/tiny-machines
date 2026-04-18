import type { MACHINE } from "../interfaces/Machines";

export abstract class Machine {
    public name: string;
    public description: string;
    public icon: MACHINE;
    public index: number;
    private scoreEnhancers: ((score:number) => number)[] = [];

    constructor(index: number) {
        this.index = index;
        this.name = "Machine";
        this.description = "not implemented machine";
        this.icon = "✈️";
        this.scoreEnhancers = [];
    }

    addScoreEnhancer(enhancer: (score: number) => number): void {
        this.scoreEnhancers.push(enhancer);
    }

    abstract myScore(machinesOnBoard: (Machine | null)[]): number;
    score(machinesOnBoard: (Machine | null)[]): number {
        let baseScore = this.myScore(machinesOnBoard);
        return this.scoreEnhancers.reduce((score, enhancer) => enhancer(score), baseScore);
    }

    Up(index: number, machinesOnBoard: (Machine | null)[]): number{
        const length = Math.round(Math.sqrt(machinesOnBoard.length));
        const x = index % length;
        const y = Math.floor(index / length);
        if (y > 0) {
            const upIndex = (y - 1) * length + x;
            return upIndex;
        }
        return -1;
        
    }

    Down(index: number, machinesOnBoard: (Machine | null)[]): number{
        const length = Math.round(Math.sqrt(machinesOnBoard.length));
        const x = index % length;
        const y = Math.floor(index / length);
        if (y < length - 1) {
            const downIndex = (y + 1) * length + x;
            return downIndex;
        }
        return -1;
    }

    Right(index: number, machinesOnBoard: (Machine | null)[]): number{
        const length = Math.round(Math.sqrt(machinesOnBoard.length));
        const x = index % length;
        const y = Math.floor(index / length);
        if (x < length - 1) {
            const rightIndex = y * length + x + 1;
            return rightIndex;
        }
        return -1;
        
    }

    Left(index: number, machinesOnBoard: (Machine | null)[]): number{
        const length = Math.round(Math.sqrt(machinesOnBoard.length));
        const x = index % length;
        const y = Math.floor(index / length);
        if (x > 0) {
            const leftIndex = y * length + x - 1;
            return leftIndex;
        }
        return -1;
    }

    indexesAround(index: number, machinesOnBoard: (Machine | null)[]): number[] {
        const upIndex = this.Up(index, machinesOnBoard);
        const downIndex = this.Down(index, machinesOnBoard);
        const rightIndex = this.Right(index, machinesOnBoard);
        const leftIndex = this.Left(index, machinesOnBoard);
        const upLeftIndex = this.Left(upIndex, machinesOnBoard);
        const upRightIndex = this.Right(upIndex, machinesOnBoard);
        const downLeftIndex = this.Left(downIndex, machinesOnBoard);
        const downRightIndex = this.Right(downIndex, machinesOnBoard);
        return [upIndex, downIndex, rightIndex, leftIndex, upLeftIndex, upRightIndex, downLeftIndex, downRightIndex]
            .filter(i => i >= 0);
    }
}