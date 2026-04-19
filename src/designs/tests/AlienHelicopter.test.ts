import { AlienHelicopter } from "../aliens/AlienHelicopter";
import { Helicopter } from "../../machines/Helicopter";
import { UFO } from "../../machines/UFO";
import { Train } from "../../machines/Train";
import { Ambulance } from "../../machines/Ambulance";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienHelicopter", () => {
  test("scores 4 points for an empty adjacent space surrounded by at least four machines when Helicopter is next to UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienHelicopter();
    board[4] = new Helicopter(4);
    board[1] = new UFO(1);
    board[0] = new Train(0);
    board[6] = new Ambulance(6);
    board[7] = new Jet(7);

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when the empty adjacent space is not surrounded by enough machines", () => {
    const board = createEmptyBoard();
    const design = new AlienHelicopter();
    board[4] = new Helicopter(4);
    board[1] = new UFO(1);
    board[0] = new Train(0);

    expect(design.score(board)).toBe(0);
  });
});