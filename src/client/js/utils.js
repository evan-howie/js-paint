export function hexToRGBA(color) {
  let r = parseInt(color.slice(1, 3), 16),
    g = parseInt(color.slice(3, 5), 16),
    b = parseInt(color.slice(5, 7), 16);
  return [r, g, b, 255];
}

export function getScaledMousePos(x, y, scaleX, scaleY) {
  return { x: x * scaleX, y: y * scaleY };
}
