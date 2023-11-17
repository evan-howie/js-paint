export default class Canvas {
  // stack, max length = 11
  MAX_STACK_LEN = 21;
  undoStack = [];
  curStackIndex = 0;

  constructor(id) {
    this.id = id;

    // canvas settings
    this.canvas = document.getElementById(id);

    // graphics context
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.pushState();
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.offsetHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  pushState() {
    const imageData = this.ctx.getImageData(0, 0, this.w, this.h);
    this.undoStack.splice(
      this.curStackIndex + 1,
      this.undoStack.length - this.curStackIndex
    );
    this.undoStack.push(imageData);
    if (this.undoStack.length == this.MAX_STACK_LEN) {
      this.undoStack.shift();
    }
    this.curStackIndex = this.undoStack.length - 1;
  }

  undo() {
    this.curStackIndex -= this.curStackIndex >= 1 ? 1 : 0;
    this.ctx.putImageData(this.undoStack[this.curStackIndex], 0, 0);
  }

  redo() {
    this.curStackIndex +=
      this.curStackIndex < this.undoStack.length - 1 ? 1 : 0;
    this.ctx.putImageData(this.undoStack[this.curStackIndex], 0, 0);
  }

  clear() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.pushState();
  }

  drawImage(img, x, y) {
    this.ctx.drawImage(img, x, y);
    this.pushState();
  }
}
