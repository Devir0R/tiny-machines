import { Helicopter } from "../Helicopter";
import { Train } from "../Train";
import { Jet } from "../Jet";
import { UFO } from "../UFO";
import { Ambulance } from "../Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Helicopter", () => {
  test("scores 3 points for one direction with 2 machines", () => {
    const board = createEmptyBoard();
    board[4] = new Ambulance(4);
    board[0] = new Jet(0);
    board[2] = new Train(2);
    board[3] = new Helicopter(3);
    board[5] = new Ambulance(5);
//board cinfiguration:
//✈️ X🚆
//🚁🚑🚑
// X X X
    expect((board[3] as Helicopter).getBaseScore(board)).toBe(3);
  });

    test("scores 6 points for diagonal with 2 machines with UFO", () => {
    const board = createEmptyBoard();
    board[4] = new Jet(4);
    board[8] = new Jet(8);
    board[0] = new Helicopter(0);
    board[2] = new Train(2);
    board[3] = new UFO(3);
    board[5] = new Ambulance(5);
//board cinfiguration:
//🚁 X🚆
//🛸✈️🚑
// X X ✈️
    // Apply effects
    for (let i = 0; i < board.length; i++) {
      if (board[i]) board[i]!.applyEffects(board);
    }
    expect((board[0] as Helicopter).score(board)).toBe(6); // Base 3 * 2 (doubled by UFO)
  });

  test("returns 0 no direction with two machines", () => {
    const board = createEmptyBoard();
    board[4] = new Helicopter(4);
    board[0] = new Jet(0);
    board[2] = new Train(2);

    expect((board[4] as Helicopter).getBaseScore(board)).toBe(0);
  });
});
