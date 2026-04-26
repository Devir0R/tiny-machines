import { AlienHelicopter } from "../aliens/AlienHelicopter";
import { Helicopter } from "../../machines/Helicopter";
import { UFO } from "../../machines/UFO";
import { Train } from "../../machines/Train";
import { Ambulance } from "../../machines/Ambulance";
import { Jet } from "../../machines/Jet";
import type { Machine } from "../../machines/Machine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienHelicopter", () => {
  test("scores 0 points for Helicopter with UFO but no repating machines", () => {
    const board = createEmptyBoard();
    const design = new AlienHelicopter();
    board[0] = new UFO(0);
    board[1] = new UFO(1);
    board[2] = new Helicopter(2);
    board[6] = new Ambulance(6);
    board[5] = new Ambulance(5);
    board[4] = new Ambulance(4);
    board[8] = new Ambulance(8);

    design.applyEffect(board);
    for(let i =0 ; i<board.length; i++){
      (board[i] as Machine)?.applyEffects(board);
    }
    expect(board[2].score(board)).toBe(36);
  });

  test("scores 0 points for Helicopter with UFO but no repating machines", () => {
    const board = createEmptyBoard();
    const design = new AlienHelicopter();
    board[4] = new Helicopter(4);
    board[1] = new UFO(1);
    board[0] = new Train(0);

    expect(design.score(board)).toBe(0);
  });
});