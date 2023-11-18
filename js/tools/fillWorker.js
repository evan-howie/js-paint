import Queue from "../queue.js";

function isValid(screen, x, y, w, h, source, threshold) {
  if (x < 0 || x >= w || y < 0 || y >= h) return false;
  if (Math.abs(screen[(y * w + x) * 4 + 0] - source[0]) / 255 >= threshold)
    return false;
  if (Math.abs(screen[(y * w + x) * 4 + 1] - source[1]) / 255 >= threshold)
    return false;
  if (Math.abs(screen[(y * w + x) * 4 + 2] - source[2]) / 255 >= threshold)
    return false;
  if (Math.abs(screen[(y * w + x) * 4 + 3] - source[3]) / 255 >= threshold)
    return false;
  return true;
}

function setPixel(screen, x, y, w, color) {
  screen[(y * w + x) * 4 + 0] = color[0];
  screen[(y * w + x) * 4 + 1] = color[1];
  screen[(y * w + x) * 4 + 2] = color[2];
  screen[(y * w + x) * 4 + 3] = color[3];
}

self.addEventListener("message", function (e) {
  const { screen, x, y, w, h, source, color, threshold } = e.data;

  let queue = new Queue();
  queue.enqueue([x, y]);
  let filled = new Array(screen.length >> 2).fill(false);

  while (!queue.isEmpty()) {
    const [currX, currY] = queue.dequeue();
    const pos = currY * w + currX;

    // Skip if the pixel is already filled or not valid
    if (
      filled[pos] ||
      !isValid(screen, currX, currY, w, h, source, threshold)
    ) {
      continue;
    }

    setPixel(screen, currX, currY, w, color);
    filled[pos] = true; // Mark the pixel as filled

    // Check and queue the neighboring pixels
    if (isValid(screen, currX + 1, currY, w, h, source, threshold)) {
      queue.enqueue([currX + 1, currY]);
    }

    if (isValid(screen, currX - 1, currY, w, h, source, threshold)) {
      queue.enqueue([currX - 1, currY]);
    }

    if (isValid(screen, currX, currY + 1, w, h, source, threshold)) {
      queue.enqueue([currX, currY + 1]);
    }

    if (isValid(screen, currX, currY - 1, w, h, source, threshold)) {
      queue.enqueue([currX, currY - 1]);
    }
  }

  // Post the modified screen data back to the main thread
  self.postMessage({ screen });
});
