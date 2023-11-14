export function hexToRGBA(color) {
  let r = parseInt(color.slice(1, 3), 16),
    g = parseInt(color.slice(3, 5), 16),
    b = parseInt(color.slice(5, 7), 16);
  console.log(r, g, b);
  return [r, g, b, 255];
}
