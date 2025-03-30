const fs = require("fs-extra");
const path = require("path");
const { createCanvas } = require("canvas");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

// Clean and recreate dist folder
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

// Copy all files from src to dist
fs.copySync(srcDir, distDir);

// Generate favicon.png
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext("2d");
ctx.font = "24px serif"; // Use a basic font that supports emojis
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("🍍", 16, 16); // Center the emoji

// Save the PNG to dist
const faviconPath = path.join(distDir, "favicon.png");
fs.writeFileSync(faviconPath, canvas.toBuffer("image/png"));

console.log("Build completed! Files copied to dist/ with favicon.png");
