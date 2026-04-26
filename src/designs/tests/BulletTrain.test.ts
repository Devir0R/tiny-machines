
import { BulletTrain } from "../individuals/BulletTrain";
import { Jet } from "../../machines/Jet";
import { Missile } from "../../machines/Missile";
import { SlotMachine } from "../../machines/SlotMachine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];


describe("Bullet Train", () => {
  test("scores 3 points for one 🚁 on the board", () => {
    const board = createEmptyBoard();
    const design = new BulletTrain();
    board[2] = new Jet(2);

    expect(design.score(board)).toBe(3);
  });

  test("scores 6 points for three 🚁 on the board", () => {
    const board = createEmptyBoard();
    const design = new BulletTrain();
    board[2] = new Jet(2);
    board[3] = new Jet(3);
    board[4] = new Jet(4);


    expect(design.score(board)).toBe(9);
  });

  test("scores 15 points 5 machines", () => {
    const board = createEmptyBoard();
    const design = new BulletTrain();
    board[2] = new Jet(2);
    board[3] = new Missile(3);
    board[4] = new Jet(4);
    board[0] = new Missile(0);
    board[8] = new Jet(8);

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 points for no machines", () => {
    const board = createEmptyBoard();
    const design = new BulletTrain();
    board[2] = new SlotMachine(2);
    board[6] = new SlotMachine(6);
    board[8] = new SlotMachine(8);

    expect(design.score(board)).toBe(0);
  });
});