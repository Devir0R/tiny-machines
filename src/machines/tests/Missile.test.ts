import { Missile } from "../Missile";
import { Train } from "../Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Missile", () => {
  test("scores the size of the longest connected empty path", () => {
    const board = createEmptyBoard();
    board[4] = new Missile(4);

    expect((board[4] as Missile).getBaseScore(board)).toBe(0);
  });

  test("returns zero when no connected empty spaces exist", () => {
    const board = createEmptyBoard();
    board[4] = new Missile(4);
    board[1] = new Train(1);
    board[3] = new Train(3);
    board[5] = new Train(5);
    board[7] = new Train(7);

    expect((board[4] as Missile).getBaseScore(board)).toBe(8);
  });
});
