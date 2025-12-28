export default class Board {
  constructor(size = 4) {
    this.size = size;
    this.cells = [];
  }

  drawBoard() {
    const board = document.createElement("div");
    board.classList.add("board");

    const total = this.size * this.size;

    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
      this.cells.push(cell);
    }

    return board;
  }

  getRandomCell(prev = null) {
    let random;

    do {
      random = this.cells[Math.floor(Math.random() * this.cells.length)];
    } while (random === prev);

    return random;
  }
}
