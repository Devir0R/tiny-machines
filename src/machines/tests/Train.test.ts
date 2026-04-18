import { Train } from "../Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Train", () => {
  test("scores 9 points when exactly two adjacent trains are connected", () => {
    const board = createEmptyBoard();
    board[4] = new Train(4);
    board[1] = new Train(1);
    board[7] = new Train(7);

    expect((board[4] as Train).score(board)).toBe(3);
  });

  test("returns zero unless at most two adjacent trains are present", () => {
    const board = createEmptyBoard();
    board[4] = new Train(4);
    board[1] = new Train(1);
    board[3] = new Train(3);
    board[7] = new Train(7);

    expect((board[4] as Train).score(board)).toBe(0);
  });
});
