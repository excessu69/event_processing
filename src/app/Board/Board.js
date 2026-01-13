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
    let index;
    let duplicateOccurred = false;

    do {
      index = Math.floor(Math.random() * this.cells.length);
      cell = this.cells[index];

      if (cell === excludeCell) {
        duplicateOccurred = true;
      }
    } while (cell === excludeCell);

    console.log(
      "Board.getRandomCell ->",
      index,
      duplicateOccurred ? "(duplicate)" : "(unique)",
    );

    return cell;
  }
}
