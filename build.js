const fs = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

// Clean and recreate dist folder
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

// Copy all files from src to dist (excluding fonts folder)
fs.copySync(srcDir, distDir, { filter: (src) => !src.includes("fonts") });

console.log("Build completed! Files copied to dist/");
