import { Machine } from "./Machine";    

/**
 * Helicopter machine:
 * - Icon: 🚁
 * - Description: "3 points for each direction with two machines of the same type"
 * - Scoring: Scores 3 points for each direction (including diagonals) with two machines of the same type
 */
export class Helicopter extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Helicopter";
        this.description = "3 points for each direction with two machines of the same type";
        this.icon = "🚁";
    }

    getBaseScore(machinesOnBoard: (Machine | null)[]): number {
        return this.scoringIndexes(machinesOnBoard).length * 3;
    }

    getHighlightedIndexes(machinesOnBoard: (Machine | null)[]): number[]{
        return this.scoringIndexes(machinesOnBoard).reduce((acc,curr)=>[...acc,...curr],[] as number[]);
    }

    scoringIndexes(machinesOnBoard: (Machine | null)[]) : [number,number][]{
        const upIndex = this.Up(this.index, machinesOnBoard);
        const downIndex = this.Down(this.index, machinesOnBoard);
        const rightIndex = this.Right(this.index, machinesOnBoard);
        const leftIndex = this.Left(this.index, machinesOnBoard);
        const upLeftIndex = this.Left(upIndex, machinesOnBoard);
        const upRightIndex = this.Right(upIndex, machinesOnBoard);
        const downLeftIndex = this.Left(downIndex, machinesOnBoard);
        const downRightIndex = this.Right(downIndex, machinesOnBoard);
        const indexesAroundTwoconsecutive : [number,number][] = [
            [upIndex,this.Up(upIndex,machinesOnBoard)],
            [downIndex,this.Down(downIndex,machinesOnBoard)],
            [rightIndex,this.Right(rightIndex,machinesOnBoard)],
            [leftIndex,this.Left(leftIndex,machinesOnBoard)],
            [upLeftIndex,this.Up(this.Left(upLeftIndex,machinesOnBoard),machinesOnBoard)],
            [upRightIndex,this.Up(this.Right(upRightIndex,machinesOnBoard),machinesOnBoard)],
            [downLeftIndex,this.Down(this.Left(downLeftIndex,machinesOnBoard),machinesOnBoard)],
            [downRightIndex,this.Down(this.Right(downRightIndex,machinesOnBoard),machinesOnBoard)],
        ]
        return indexesAroundTwoconsecutive.filter(([index,nextIndex])=>{
            if (index !== -1 && nextIndex !== -1 
                    && machinesOnBoard[index] !== null && machinesOnBoard[nextIndex] !== null) {
                return machinesOnBoard[index]!.icon === machinesOnBoard[nextIndex]!.icon;
            }
            return false;
        });
    }  
}