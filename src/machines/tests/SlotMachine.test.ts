import { SlotMachine } from "../SlotMachine";
import { Jet } from "../Jet";
import { UFO } from "../UFO";
import { Helicopter } from "../Helicopter";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SlotMachine", () => {
  test("scores the longest run of different machines in a line", () => {
    const board = createEmptyBoard();
    board[0] = new SlotMachine(4);
    board[4] = new Jet(5);
    board[6] = new UFO(6);
    board[3] = new Helicopter(3);

    expect((board[0] as SlotMachine).score(board)).toBe(2);
  });

  test("does not count repeated machine icons in the same line", () => {
    const board = createEmptyBoard();
    board[0] = new SlotMachine(4);
    board[3] = new Jet(5);
    board[6] = new Jet(6);

    expect((board[0] as SlotMachine).score(board)).toBe(2);
  });
});
