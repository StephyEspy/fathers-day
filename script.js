const image = document.getElementById("source-image");
const canvas = document.getElementById("source-canvas");
const output = document.getElementById("ascii-art");

const charset = " .'`^,:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const columns = 118;

function escapeHtml(character) {
  if (character === "&") return "&amp;";
  if (character === "<") return "&lt;";
  if (character === ">") return "&gt;";
  return character;
}

function renderAscii() {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const aspectRatio = image.naturalHeight / image.naturalWidth;
  const rows = Math.max(1, Math.round(columns * aspectRatio * 0.52));

  canvas.width = columns;
  canvas.height = rows;
  context.drawImage(image, 0, 0, columns, rows);

  const pixels = context.getImageData(0, 0, columns, rows).data;
  let html = "";

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const index = (y * columns + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const brightness = 0.299 * red + 0.587 * green + 0.114 * blue;
      const charIndex = Math.floor((brightness / 255) * (charset.length - 1));
      const character = charset[charIndex];
      const hue = Math.round((red * 0.8 + green * 1.4 + blue * 1.8) % 360);
      const lightness = Math.round(34 + (brightness / 255) * 44);

      html += `<span style="--hue:${hue};--lightness:${lightness}%">${escapeHtml(character)}</span>`;
    }
    html += "\n";
  }

  output.innerHTML = html;
}

if (image.complete) {
  renderAscii();
} else {
  image.addEventListener("load", renderAscii, { once: true });
  image.addEventListener("error", () => {
    output.textContent = "could not load image";
  }, { once: true });
}
