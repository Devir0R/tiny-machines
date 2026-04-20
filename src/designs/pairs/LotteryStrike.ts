import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class LotteryStrike extends Design {
  name = "Lottery Strike";
  description = "for each pair of ✈️ adjacent to an 🚀, gain 4 points";
  icon = "✈️🚀";
  rarity: "common" | "legendary" = "common";
  machines = ['🚀', '🎰'];

  score(_machinesOnBoard: (Machine | null)[]): number {
    const machine1Icon = '🚀';
    const machine2Icon = '✈️';
    let score = 0;
    for (const machine of _machinesOnBoard) {
        if (machine && machine.icon == machine1Icon) {
            const adjacentIndexes = [
                machine.Up(machine.index, _machinesOnBoard), 
                machine.Down(machine.index, _machinesOnBoard), 
                machine.Right(machine.index, _machinesOnBoard), 
                machine.Left(machine.index, _machinesOnBoard)];
            for (const adjacentIndex of adjacentIndexes) {
                if (adjacentIndex !== -1 && 
                        _machinesOnBoard[adjacentIndex] && 
                        _machinesOnBoard[adjacentIndex].icon == machine2Icon) {
                    score+= 4;
                }
            }
        }
    }
    return score;
  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {
    return;
  }
}
