import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class HeliCenter extends Design {
  name = "Heli Center";
  description = "7 points for each 🚁 in 4 center cells";
  icon = "🚁";
  rarity: "common" | "legendary" = "common";
  machines = [];

  score(machinesOnBoard: (Machine | null)[]): number {
    let indexes = this.getScoringIndexes(machinesOnBoard);
    return indexes.filter(index=>machinesOnBoard[index]?.icon === '🚁').length * 7;      

  }

  private getScoringIndexes(machinesOnBoard: (Machine | null)[]) {
    if(machinesOnBoard.length == 1) return [0];
    const boardLength = Math.round(Math.sqrt(machinesOnBoard.length));
    let indexes;
    if (machinesOnBoard.length % 2 == 0) {
      const topRightOfMiddle = machinesOnBoard.length / 2 - boardLength / 2; //top right of the four corners
      indexes = [
        topRightOfMiddle,
        topRightOfMiddle - 1,
        topRightOfMiddle + boardLength,
        topRightOfMiddle + boardLength - 1
      ];
    }
    else {
      const exactMiddle = Math.floor(machinesOnBoard.length / 2);
      indexes = [
        exactMiddle,
        exactMiddle - 1,
        exactMiddle + 1,
        exactMiddle + boardLength,
        exactMiddle - 1 + boardLength,
        exactMiddle + 1 + boardLength,
        exactMiddle - boardLength,
        exactMiddle - 1 - boardLength,
        exactMiddle + 1 - boardLength,
      ];
    }
    return indexes;
  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {

  }
}
