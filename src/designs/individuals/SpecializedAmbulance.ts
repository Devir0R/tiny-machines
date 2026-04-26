import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";
import { MACHINE } from "../../interfaces/Machines";

/**
 * 2 Points for each air machine on the board(✈️, 🛸 and 🚁).
 */
export class SpecializedAmbulance extends Design {
  name = "Specialized Ambulance";
  description = "2 Points for each air machine on the board(✈️, 🛸 and 🚁).";
  icon = "🚑";
  rarity: "common" | "legendary" = "common";
  machines = [MACHINE.HELICOPTER,MACHINE.JET,MACHINE.UFO] as MACHINE[];

  score(machinesOnBoard: (Machine | null)[]): number {
    return machinesOnBoard.filter(machine=>machine && this.machines.includes(machine?.icon)).length * 2;

  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {

  }
}
