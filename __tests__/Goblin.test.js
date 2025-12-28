/**
 * @jest-environment jsdom
 */

import Goblin from "../src/app/Goblin/Goblin";

describe("Goblin", () => {
  let goblin;
  let cell;

  beforeEach(() => {
    goblin = new Goblin("goblin.png");
    cell = document.createElement("div");
    cell.classList.add("cell");
  });

  test("должен корректно создаваться", () => {
    expect(goblin.imgPath).toBe("goblin.png");
    expect(goblin.currentCell).toBe(null);
  });

  test("appear должен поместить гоблина в клетку", () => {
    goblin.appear(cell);

    const img = cell.querySelector("img");

    expect(img).not.toBeNull();
    expect(img.src).toContain("goblin.png");
    expect(img.classList.contains("goblin")).toBe(true);
    expect(goblin.currentCell).toBe(cell);
  });

  test("appear должен скрывать предыдущего гоблина", () => {
    const first = document.createElement("div");
    first.classList.add("cell");

    const second = document.createElement("div");
    second.classList.add("cell");

    // Появился в первой клетке
    goblin.appear(first);

    // Появился во второй клетке — первая должна очиститься
    goblin.appear(second);

    expect(first.innerHTML).toBe("");
    expect(second.querySelector("img")).not.toBeNull();
    expect(goblin.currentCell).toBe(second);
  });

  test("hide должен удалять гоблина из клетки", () => {
    goblin.appear(cell);
    goblin.hide();

    expect(cell.innerHTML).toBe("");
    expect(goblin.currentCell).toBe(null);
  });

  test("hide ничего не должен делать, если гоблина нет", () => {
    // ничего не должно упасть
    expect(() => goblin.hide()).not.toThrow();
    expect(goblin.currentCell).toBe(null);
  });
});
