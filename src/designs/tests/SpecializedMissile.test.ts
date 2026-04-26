
import { SpecializedMissile } from "../individuals/SpecializedMissile";
import { Jet } from "../../machines/Jet";
import { SlotMachine } from "../../machines/SlotMachine";
import { Ambulance } from "../../machines/Ambulance";
import { Train } from "../../machines/Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];


describe("Specialized Missile", () => {
  test("scores 2 points for one 🎰 in the board", () => {
    const board = createEmptyBoard();
    const design = new SpecializedMissile();
    board[2] = new SlotMachine(2);

    expect(design.score(board)).toBe(2);
  });

  test("scores 6 points for three 🎰 in the board", () => {
    const board = createEmptyBoard();
    const design = new SpecializedMissile();
    board[2] = new SlotMachine(2);
    board[3] = new SlotMachine(3);
    board[4] = new SlotMachine(4);


    expect(design.score(board)).toBe(6);
  });

  test("scores 10 points 5 machines", () => {
    const board = createEmptyBoard();
    const design = new SpecializedMissile();
    board[2] = new SlotMachine(2);
    board[3] = new Ambulance(3);
    board[4] = new SlotMachine(4);
    board[0] = new Train(0);
    board[8] = new SlotMachine(8);

    expect(design.score(board)).toBe(10);
  });

  test("scores 0 points for no machines", () => {
    const board = createEmptyBoard();
    const design = new SpecializedMissile();
    board[0] = new Jet(0);
    board[2] = new Jet(2);
    board[6] = new Jet(6);
    board[8] = new Jet(8);

    expect(design.score(board)).toBe(0);
  });
});