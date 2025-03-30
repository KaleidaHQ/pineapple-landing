const fs = require("fs-extra");
const path = require("path");
const { createCanvas, registerFont } = require("canvas");

// Register Noto Color Emoji font
const fontPath = path.join(
  __dirname,
  "src",
  "fonts",
  "NotoColorEmoji-Regular.ttf",
);
if (fs.existsSync(fontPath)) {
  registerFont(fontPath, { family: "Noto Color Emoji" });
  console.log("Noto Color Emoji font registered");
} else {
  console.error("Font file not found at:", fontPath);
}

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

// Clean and recreate dist folder
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

// Copy all files from src to dist (excluding fonts folder)
fs.copySync(srcDir, distDir, { filter: (src) => !src.includes("fonts") });

// Generate favicon.png
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext("2d");
ctx.font = '24px "Noto Color Emoji"';
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("🍍", 16, 16);

// Save the PNG
const faviconPath = path.join(distDir, "favicon.png");
fs.writeFileSync(faviconPath, canvas.toBuffer("image/png"));
console.log("favicon.png generated at:", faviconPath);

console.log("Build completed! Files copied to dist/");
