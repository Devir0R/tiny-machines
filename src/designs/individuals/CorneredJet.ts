import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class CorneredJet extends Design {
  name = "Cornered Jet";
  description = "7 points for each ✈️ in the corner";
  icon = "✈️";
  rarity: "common" | "legendary" = "common";
  machines = [];

  score(machinesOnBoard: (Machine | null)[]): number {
    const boardLength = Math.round(Math.sqrt(machinesOnBoard.length));
    const indexes  = [0,boardLength-1,boardLength*boardLength-1, boardLength*(boardLength-1)];
    return indexes.filter(index=>machinesOnBoard[index]?.icon === '✈️').length * 7;

  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {

  }
}
