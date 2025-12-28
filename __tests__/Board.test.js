/**
 * @jest-environment jsdom
 */

import Board from "../src/app/Board/Board";

describe("Board", () => {
  test("должен корректно создаваться", () => {
    const board = new Board(4);
    expect(board.size).toBe(4);
    expect(board.cells).toEqual([]);
  });

  test("drawBoard должен создать поле и 16 ячеек", () => {
    const board = new Board(4);
    const element = board.drawBoard();

    expect(element).toBeInstanceOf(HTMLDivElement);
    expect(element.classList.contains("board")).toBe(true);
    expect(board.cells.length).toBe(16);
    expect(element.children.length).toBe(16);
  });

  test("getRandomCell должен вернуть одну из ячеек", () => {
    const board = new Board(4);
    board.drawBoard();

    const cell = board.getRandomCell();

    expect(board.cells).toContain(cell);
  });

  test("getRandomCell не должен возвращать prev", () => {
    const board = new Board(4);
    board.drawBoard();

    const prev = board.cells[0];
    const newCell = board.getRandomCell(prev);

    expect(newCell).not.toBe(prev);
  });
});
