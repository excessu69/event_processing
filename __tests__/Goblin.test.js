/** @jest-environment jsdom */

import Goblin from "../src/app/Goblin/Goblin.js";

describe("Goblin", () => {
  let cell;
  let goblin;

  beforeEach(() => {
    document.body.innerHTML = `<div class="cell"></div>`;
    cell = document.querySelector(".cell");
    goblin = new Goblin("goblin.png");
  });

  test("появляется в ячейке", () => {
    goblin.appear(cell);

    const img = cell.querySelector("img");
    expect(img).not.toBeNull();
    expect(img.classList.contains("goblin")).toBe(true);
  });

  test("скрывается правильно", () => {
    goblin.appear(cell);

    goblin.hide();

    expect(cell.querySelector("img")).toBeNull();
  });
});
