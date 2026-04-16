import { Helicopter } from "../Helicopter";
import { Train } from "../Train";
import { Jet } from "../Jet";
import { UFO } from "../UFO";
import { Ambulance } from "../Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Helicopter", () => {
  test("scores 2 points for an empty adjacent space surrounded by at least three machines", () => {
    const board = createEmptyBoard();
    board[4] = new Helicopter(4);
    board[0] = new Jet(0);
    board[2] = new Train(2);
    board[3] = new UFO(3);
    board[5] = new Ambulance(5);
//board cinfiguration:
//✈️ X🚆
//🛸🚁🚑
// X X X
    expect((board[4] as Helicopter).score(board)).toBe(4);
  });

  test("returns zero when adjacent empty spots are not surrounded by enough machines", () => {
    const board = createEmptyBoard();
    board[4] = new Helicopter(4);
    board[0] = new Jet(0);
    board[2] = new Train(2);

    expect((board[4] as Helicopter).score(board)).toBe(2);
  });
});
