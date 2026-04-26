import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";
import { MACHINE } from "../../interfaces/Machines";

/**
 * 2 Point for each non-air machine on the board(🚆,🎰 and 🚑).
 */
export class SpecializedMissile extends Design {
  name = "Specialized Missile";
  description = "2 Point for each non-air machine on the board(🚆,🎰 and 🚑).";
  icon = "🚀";
  rarity: "common" | "legendary" = "common";
  machines = ['🚀'];
  static NonAirMachines = [MACHINE.SLOT_MACHINE,MACHINE.TRAIN,MACHINE.AMBULANCE] as MACHINE[];

  score(machinesOnBoard: (Machine | null)[]): number {
    return machinesOnBoard.filter(machine=>machine && SpecializedMissile.NonAirMachines.includes(machine?.icon)).length * 2;

  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {

  }
}
