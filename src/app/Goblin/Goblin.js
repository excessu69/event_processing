export default class Goblin {
  constructor(imgPath) {
    this.imgPath = imgPath;
    this.currentCell = null;
  }

  appear(cell) {
    if (this.currentCell) this.hide();

    const img = document.createElement("img");
    img.src = this.imgPath;
    img.classList.add("goblin");

    cell.append(img);
    this.currentCell = cell;
  }

  hide() {
    if (this.currentCell) {
      this.currentCell.innerHTML = "";
      this.currentCell = null;
    }
  }
}
