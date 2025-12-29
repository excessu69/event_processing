/** @jest-environment jsdom */

import Hammer from "../src/app/Hammer/Hammer.js";

describe("Hammer", () => {
  let root;
  let hammer;

  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
    root = document.getElementById("root");
    hammer = new Hammer("hammer.png");
  });

  test("инициализируется и добавляет элемент", () => {
    hammer.init(root);

    const hammerEl = root.querySelector(".hammer");
    expect(hammerEl).not.toBeNull();
    expect(hammer.element).toBe(hammerEl);
  });

  test("метод hit не падает, даже если элемент есть", () => {
    hammer.init(root);

    expect(() => hammer.hit()).not.toThrow();
  });
});
