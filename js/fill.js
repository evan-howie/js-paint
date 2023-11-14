import { hexToRGBA } from "./utils.js";
import Queue from "./queue.js";

export default class Fill {
  constructor(canvas, color) {
    this.c = canvas;
    this.color = color;

    // Bind event handlers to ensure they have the correct context
    this.mousedown = this.mousedown.bind(this);

    // Event listeners for mouse events
    this.c.canvas.addEventListener("mousedown", this.mousedown);
  }

  isValid(screen, x, y, w, h, source) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    if (screen[(y * this.c.w + x) * 4 + 0] !== source[0]) return false;
    if (screen[(y * this.c.w + x) * 4 + 1] !== source[1]) return false;
    if (screen[(y * this.c.w + x) * 4 + 2] !== source[2]) return false;
    if (screen[(y * this.c.w + x) * 4 + 3] !== source[3]) return false;
    return true;
  }

  setPixel(screen, x, y, color) {
    screen[(y * this.c.w + x) * 4 + 0] = color[0];
    screen[(y * this.c.w + x) * 4 + 1] = color[1];
    screen[(y * this.c.w + x) * 4 + 2] = color[2];
    screen[(y * this.c.w + x) * 4 + 3] = color[3];
  }

  fill(screen, x, y, w, h, source, color) {
    let queue = new Queue();
    queue.enqueue([x, y]);
    let filled = new Array(screen.length >> 2).fill(false);

    console.log(window.performance.now());
    while (!queue.isEmpty()) {
      const [currX, currY] = queue.dequeue();
      const pos = currY * this.c.w + currX;

      // Skip if the pixel is already filled or not valid
      if (filled[pos] || !this.isValid(screen, currX, currY, w, h, source)) {
        continue;
      }

      this.setPixel(screen, currX, currY, color);
      filled[pos] = true; // Mark the pixel as filled

      // Check and queue the neighboring pixels
      if (this.isValid(screen, currX + 1, currY, w, h, source)) {
        queue.enqueue([currX + 1, currY]);
      }

      if (this.isValid(screen, currX - 1, currY, w, h, source)) {
        queue.enqueue([currX - 1, currY]);
      }

      if (this.isValid(screen, currX, currY + 1, w, h, source)) {
        queue.enqueue([currX, currY + 1]);
      }

      if (this.isValid(screen, currX, currY - 1, w, h, source)) {
        queue.enqueue([currX, currY - 1]);
      }
    }
    console.log(window.performance.now());
  }

  mousedown(e) {
    const screen = this.c.ctx.getImageData(0, 0, this.c.w, this.c.h).data;
    const pos = (e.offsetY * this.c.w + e.offsetX) * 4;
    const source = screen.slice(pos, pos + 4);
    this.fill(
      screen,
      e.offsetX,
      e.offsetY,
      this.c.w,
      this.c.h,
      source,
      hexToRGBA(this.color)
    );
    this.c.ctx.putImageData(
      new ImageData(new Uint8ClampedArray(screen), this.c.w, this.c.h),
      0,
      0
    );
    this.c.pushState();
  }

  setFill(color) {
    this.color = color;
  }

  cleanup() {
    this.c.canvas.removeEventListener("mousedown", this.mousedown);
  }
}
