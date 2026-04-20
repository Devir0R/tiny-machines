import { AmbulanceHeliopter } from "../pairs/AmbulanceHeliopter";
import { Ambulance } from "../../machines/Ambulance";
import { Helicopter } from "../../machines/Helicopter";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AmbulancopterSync", () => {
  test("scores 4 points for each Helicopter adjacent to an Ambulance", () => {
    const board = createEmptyBoard();
    const design = new AmbulanceHeliopter();
    board[4] = new Ambulance(4);
    board[5] = new Helicopter(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Helicopter and Ambulance are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new AmbulanceHeliopter();
    board[0] = new Ambulance(0);
    board[8] = new Helicopter(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new AmbulanceHeliopter();
    board[0] = new Ambulance(0);
    board[1] = new Helicopter(1); // adjacent
    board[3] = new Ambulance(3);
    board[4] = new Helicopter(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new AmbulanceHeliopter();

    expect(design.score(board)).toBe(0);
  });
});