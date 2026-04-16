import { Ship } from "../Ship";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Ship", () => {
  test("scores the size of the longest connected empty path", () => {
    const board = createEmptyBoard();
    board[4] = new Ship(4);

    expect((board[4] as Ship).score(board)).toBe(8);
  });

  test("returns zero when no connected empty spaces exist", () => {
    const board = createEmptyBoard();
    board[4] = new Ship(4);
    board[1] = { icon: "🚆" };
    board[3] = { icon: "🚆" };
    board[5] = { icon: "🚆" };
    board[7] = { icon: "🚆" };

    expect((board[4] as Ship).score(board)).toBe(0);
  });
});
