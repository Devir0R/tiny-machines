
import { ExtraSlot } from "../individuals/ExtraSlot";
import { Train } from "../../machines/Train";
import { Helicopter } from "../../machines/Helicopter";
import { SlotMachine } from "../../machines/SlotMachine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Extra Slot", () => {
  test("scores 3 points for one 🚁 on the board", () => {
    const board = createEmptyBoard();
    const design = new ExtraSlot();
    board[2] = new Helicopter(2);

    expect(design.score(board)).toBe(3);
  });

  test("scores 6 points for three 🚁 on the board", () => {
    const board = createEmptyBoard();
    const design = new ExtraSlot();
    board[2] = new Helicopter(2);
    board[3] = new Helicopter(3);
    board[4] = new Helicopter(4);


    expect(design.score(board)).toBe(9);
  });

  test("scores 15 points 5 machines", () => {
    const board = createEmptyBoard();
    const design = new ExtraSlot();
    board[2] = new Helicopter(2);
    board[3] = new Train(3);
    board[4] = new Helicopter(4);
    board[0] = new Train(0);
    board[8] = new Helicopter(8);

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 points for no machines", () => {
    const board = createEmptyBoard();
    const design = new ExtraSlot();
    board[2] = new SlotMachine(2);
    board[6] = new SlotMachine(6);
    board[8] = new SlotMachine(8);

    expect(design.score(board)).toBe(0);
  });
});