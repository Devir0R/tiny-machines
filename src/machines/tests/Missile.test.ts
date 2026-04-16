import { Missile } from "../Missile";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Missile", () => {
  test("scores the size of the longest connected empty path", () => {
    const board = createEmptyBoard();
    board[4] = new Missile(4);

    expect((board[4] as Missile).score(board)).toBe(0);
  });

  test("returns zero when no connected empty spaces exist", () => {
    const board = createEmptyBoard();
    board[4] = new Missile(4);
    board[1] = { icon: "🚆" };
    board[3] = { icon: "🚆" };
    board[5] = { icon: "🚆" };
    board[7] = { icon: "🚆" };

    expect((board[4] as Missile).score(board)).toBe(8);
  });
});
