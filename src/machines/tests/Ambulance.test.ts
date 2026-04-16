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
    board[3] = new UFO(3);
    board[5] = new Helicopter(5);
    board[7] = new Train(7);

    expect((board[4] as Ambulance).score(board)).toBe(3);
  });

  test("returns zero when no air units are nearby", () => {
    const board = createEmptyBoard();
    board[4] = new Ambulance(4);
    board[1] = new Train(1);
    board[3] = new Train(3);
    board[5] = new Train(5);

    expect((board[4] as Ambulance).score(board)).toBe(0);
  });
});
