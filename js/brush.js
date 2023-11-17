export default class Brush {
  // tool settings
  active = false;
  cursorPath = "../assets/brush.png";

  constructor(canvas, color, stroke) {
    this.c = canvas;
    this.color = color;
    this.stroke = stroke;

    // Bind event handlers to ensure they have the correct context
    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);

    // Event listeners for mouse events
    this.c.canvas.addEventListener("mousedown", this.mousedown);
    this.c.canvas.addEventListener("mousemove", this.mousemove);
    this.c.canvas.addEventListener("mouseup", this.mouseup);

    this.c.canvas.style.cursor = `url(${this.cursorPath}) 16 16, auto`;
  }

  brush(x, y, dx, dy) {
    this.c.ctx.fillStyle = this.color;
    this.c.ctx.strokeStyle = this.color;

    this.c.ctx.beginPath();
    this.c.ctx.arc(x, y, this.stroke, 0, Math.PI * 2, true);
    this.c.ctx.fill();

    this.c.ctx.beginPath();
    this.c.ctx.moveTo(x, y);
    this.c.ctx.lineTo(x - dx, y - dy);
    this.c.ctx.lineWidth = this.stroke * 2;
    this.c.ctx.stroke();

    return 0;
  }

  mousedown(e) {
    this.active = true;
    this.brush(e.offsetX, e.offsetY, e.movementX, e.movementY);
  }

  mousemove(e) {
    if (this.active) this.brush(e.offsetX, e.offsetY, e.movementX, e.movementY);
  }

  mouseup(e) {
    this.active = false;
    this.c.pushState();
  }

  setFill(color) {
    this.color = color;
  }

  setStroke(stroke) {
    this.stroke = Math.min(Math.max(0, stroke), 100);
  }

  cleanup() {
    this.c.canvas.removeEventListener("mousedown", this.mousedown);
    this.c.canvas.removeEventListener("mousemove", this.mousemove);
    this.c.canvas.removeEventListener("mouseup", this.mouseup);
  }
}
