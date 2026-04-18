import { Ambulance } from "../Ambulance";
import { Jet } from "../Jet";
import { UFO } from "../UFO";
import { Helicopter } from "../Helicopter";
import { Train } from "../Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Ambulance", () => {
  test("scores air units around it", () => {
    const board = createEmptyBoard();
    board[4] = new Ambulance(4);
    board[1] = new Jet(1);
    board[3] = new Helicopter(3);
    board[5] = new Helicopter(5);
    board[7] = new Train(7);

    expect((board[4] as Ambulance).getBaseScore(board)).toBe(6);
  });

  test("scores air units around it with 1 UFO", () => {
    const board = createEmptyBoard();
    board[4] = new Ambulance(4);
    board[1] = new Jet(1);
    board[3] = new UFO(3);
    board[5] = new Helicopter(5);
    board[7] = new Train(7);


    // Apply effects
    for (let i = 0; i < board.length; i++) {
      if (board[i]) board[i]!.applyEffects(board);
    }
    expect((board[4] as Ambulance).score(board)).toBe(12); // Base 6 * 2 (doubled by UFO)
  });

  test("returns zero when no air units are nearby", () => {
    const board = createEmptyBoard();
    board[4] = new Ambulance(4);
    board[1] = new Train(1);
    board[3] = new Train(3);
    board[5] = new Train(5);

    expect((board[4] as Ambulance).getBaseScore(board)).toBe(0);
  });
});
