export default class Goblin {
  constructor(imgPath) {
    this.imgPath = imgPath;
    this.currentCell = null;
    this.isVisible = false;

    this.element = document.createElement("img");
    this.element.src = this.imgPath;
    this.element.alt = "Goblin";
    this.element.classList.add("goblin");
  }

  appear(cell) {
    if (this.currentCell) this.hide();

    cell.append(this.element);
    this.currentCell = cell;
    this.isVisible = true;
  }

  hide() {
    if (this.currentCell) {
      if (this.element.parentNode === this.currentCell) {
        this.currentCell.removeChild(this.element);
      }
      this.currentCell = null;
    }
    this.isVisible = false;
  }
}
