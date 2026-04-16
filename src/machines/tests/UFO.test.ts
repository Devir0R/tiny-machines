import { UFO } from "../UFO";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("UFO", () => {
  test("scores one point for each empty adjacent space", () => {
    const board = createEmptyBoard();
    board[4] = new UFO(4);
    board[1] = { icon: "🚆" };

    expect((board[4] as UFO).score(board)).toBe(7);
  });

  test("scores zero when surrounded by machines", () => {
    const board = createEmptyBoard();
    board[4] = new UFO(4);
    board[1] = { icon: "🚆" };
    board[3] = { icon: "🚆" };
    board[5] = { icon: "🚆" };
    board[7] = { icon: "🚆" };
    board[0] = { icon: "🚆" };
    board[2] = { icon: "🚆" };
    board[6] = { icon: "🚆" };
    board[8] = { icon: "🚆" };

    expect((board[4] as UFO).score(board)).toBe(0);
  });
});
