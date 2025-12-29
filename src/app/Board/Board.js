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
      board.append(cell);
      this.cells.push(cell);
    }

    return board;
  }

  getRandomCell(excludeCell = null) {
    let cell;
    do {
      const index = Math.floor(Math.random() * this.cells.length);
      cell = this.cells[index];
    } while (cell === excludeCell);

    return cell;
  }
}
