import { SlotMachine } from "../SlotMachine";
import { Jet } from "../Jet";
import { UFO } from "../UFO";
import { Helicopter } from "../Helicopter";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SlotMachine", () => {
  test("score 1 for each different machine", () => {
    const board = createEmptyBoard();
    board[0] = new SlotMachine(4);
    board[4] = new Jet(5);
    board[6] = new UFO(6);
    board[3] = new Helicopter(3);

    expect((board[6] as UFO).score(board)).toBe(0);
    expect((board[0] as SlotMachine).score(board)).toBe(0);
  });

  test("score 4 when 2 are the same", () => {
    const board = createEmptyBoard();
    board[0] = new SlotMachine(4);
    board[3] = new Jet(5);
    board[6] = new Jet(6);

    expect((board[0] as SlotMachine).score(board)).toBe(4);
  });

  test("score 9 when 3 are the same", () => {
    const board = createEmptyBoard();
    board[4] = new SlotMachine(4);
    board[3] = new Jet(5);
    board[6] = new Jet(6);
    board[7] = new Jet(7);

    expect((board[4] as SlotMachine).score(board)).toBe(9);
  });
});
