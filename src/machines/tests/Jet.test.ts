import { Helicopter } from "../Helicopter";
import { Jet } from "../Jet";
import { Train } from "../Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Jet", () => {
  test("scores the longest straight empty line from it", () => {
    const board = createEmptyBoard();
    board[4] = new Jet(4);

    expect((board[4] as Jet).getBaseScore(board)).toBe(0);
  });

  test("stops scoring when the first adjacent space is occupied", () => {
    const board = createEmptyBoard();
    board[4] = new Jet(4);
    board[1] = new Train(1);
    board[7] = new Train(7);
    board[3] = new Train(3);
    board[5] = new Train(5);

    expect((board[4] as Jet).getBaseScore(board)).toBe(3);
  });

    test("stops scoring when the first adjacent space is occupied", () => {
    const board = createEmptyBoard();
    board[0] = new Jet(0);
    board[1] = new Jet(1);
    board[2] = new Helicopter(2);
    board[3] = new Helicopter(3);
    board[6] = new Helicopter(6);
//board configuration:
//✈️✈️🚁
//🚁 X X
//🚁 X X
    expect((board[0] as Jet).getBaseScore(board)).toBe(6);
  });
});
