import type { Machine } from "../machines/Machine";

export abstract class Design {
  abstract name: string;
  abstract description: string;
  abstract icon: string;
  abstract rarity: "common" | "legendary";

  abstract score(_machinesOnBoard: (Machine | null)[]): number;
  abstract applyEffect(_machinesOnBoard: (Machine | null)[]): void;
}
