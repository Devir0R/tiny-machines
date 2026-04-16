import { Jet } from "../Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Jet", () => {
  test("scores the longest straight empty line from it", () => {
    const board = createEmptyBoard();
    board[4] = new Jet(4);

    expect((board[4] as Jet).score(board)).toBe(2);
  });

  test("stops scoring when the first adjacent space is occupied", () => {
    const board = createEmptyBoard();
    board[4] = new Jet(4);
    board[1] = { icon: "🚆" };
    board[7] = { icon: "🚆" };
    board[3] = { icon: "🚆" };
    board[5] = { icon: "🚆" };
    
    expect((board[4] as Jet).score(board)).toBe(1);
  });
});
