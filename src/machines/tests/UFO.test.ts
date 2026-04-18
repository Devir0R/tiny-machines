import { Train } from "../Train";
import { UFO } from "../UFO";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("UFO", () => {
  test("scores one point for each empty adjacent space", () => {
    const board = createEmptyBoard();
    board[4] = new UFO(4);
    board[1] = new Train(1);

    // Apply effects
    for (let i = 0; i < board.length; i++) {
      if (board[i]) board[i]!.applyEffects(board);
    }

    expect((board[4] as UFO).score(board)).toBe(0);
    expect((board[1] as Train).score(board)).toBe(2); // Base 1 * 2 (doubled by UFO)
  });

  test("scores zero when surrounded by machines", () => {
    const board = createEmptyBoard();
    board[4] = new UFO(4);
    board[1] = new Train(1);
    board[3] = new Train(3);
    board[5] = new Train(5);
    board[7] = new Train(7);
    board[0] = new Train(0);
    board[2] = new Train(2);
    board[6] = new Train(6);
    board[8] = new Train(8);

    // Apply effects
    for (let i = 0; i < board.length; i++) {
      if (board[i]) board[i]!.applyEffects(board);
    }

    expect((board[1] as Train).score(board)).toBe(16); // Base 8 * 2 (doubled by UFO)
    expect((board[0] as Train).score(board)).toBe(8); // Base 4 * 2 (doubled by UFO)
  });
});
