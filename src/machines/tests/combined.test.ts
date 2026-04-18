import { Ambulance } from "../Ambulance";
import { Helicopter } from "../Helicopter";
import { Jet } from "../Jet";
import { Missile } from "../Missile";
import { SlotMachine } from "../SlotMachine";
import { Train } from "../Train";
import { UFO } from "../UFO";

describe("Combined machines on a shared board", () => {
  test("each machine computes score correctly in a single board layout", () => {
    const board = Array(9).fill(null) as (any | null)[];
    board[0] = new Jet(0);
    board[1] = new Train(1);
    board[3] = new UFO(3);
    board[4] = new Ambulance(4);
    board[6] = new SlotMachine(6);
    board[7] = new Helicopter(7);
    board[8] = new Missile(8);
    // Board configuration:
    // ✈️ 🚆 X
    // 🛸 🚑 X
    // 🎰 🚁 🚀

    // Apply effects
    for (let i = 0; i < board.length; i++) {
      if (board[i]) board[i]!.applyEffects(board);
    }
    expect((board[0] as Jet).score(board)).toBe(8); // Base 4 * 2 (doubled by UFO)
    expect((board[1] as Train).score(board)).toBe(1); // Not adjacent to UFO
    expect((board[4] as Ambulance).score(board)).toBe(12); // Base 6 * 2 (doubled by UFO)
    expect((board[6] as SlotMachine).score(board)).toBe(0);
    expect((board[7] as Helicopter).score(board)).toBe(4); // Not adjacent to UFO
    expect((board[8] as Missile).score(board)).toBe(2); // Not adjacent to UFO
    expect((board[3] as UFO).score(board)).toBe(0);
  });
});
