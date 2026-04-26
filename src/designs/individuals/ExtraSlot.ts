import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

/**
 * 3 points for each 🚆 or 🚁 on the board
 */
export class ExtraSlot extends Design {
  name = "Extra Slot";
  description = "3 points for each 🚆 or 🚁 on the board";
  icon = "🎰";
  rarity: "common" | "legendary" = "common";
  machines = ['🚆','🚁'];

  score(machinesOnBoard: (Machine | null)[]): number {
    return machinesOnBoard.filter(machine=>machine && this.machines.includes(machine?.icon)).length * 3;

  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {

  }
}
